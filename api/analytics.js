const MAX_BODY_BYTES = 10_000;
const EVENT_TYPES = new Set(['page_view', 'product_view', 'cart_add', 'sample_open']);

function json(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  return res.end(JSON.stringify(body));
}

function cleanText(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function requireEnvironment(res) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    json(res, 503, { error: 'analytics_not_configured' });
    return false;
  }
  return true;
}

async function supabase(path, options = {}) {
  const base = process.env.SUPABASE_URL.replace(/\/$/, '');
  return fetch(`${base}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      ...options.headers,
    },
  });
}

function aggregate(events) {
  const visitors = new Set();
  const pages = new Map();
  const sources = new Map();
  const days = new Map();
  let productViews = 0;
  let cartAdds = 0;

  for (const event of events) {
    visitors.add(event.visitor_hash);
    if (event.event_type === 'product_view') productViews += 1;
    if (event.event_type === 'cart_add') cartAdds += 1;
    if (event.event_type === 'page_view') {
      pages.set(event.page_path, (pages.get(event.page_path) || 0) + 1);
      const day = event.event_at.slice(0, 10);
      days.set(day, (days.get(day) || 0) + 1);
    }
    if (event.referrer_source) {
      sources.set(event.referrer_source, (sources.get(event.referrer_source) || 0) + 1);
    }
  }

  const ranked = map => [...map.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'th'))
    .slice(0, 8);

  return {
    pageViews: events.filter(event => event.event_type === 'page_view').length,
    uniqueVisitors: visitors.size,
    productViews,
    cartAdds,
    topPages: ranked(pages),
    topSources: ranked(sources),
    dailyViews: [...days.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([date, count]) => ({ date, count })),
  };
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(204).setHeader('Allow', 'GET, POST, OPTIONS').end();
    return;
  }
  if (!requireEnvironment(res)) return;

  try {
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
      const eventType = cleanText(body.event_type, 30);
      const pagePath = cleanText(body.page_path, 160);
      const visitorHash = cleanText(body.visitor_hash, 64);
      const source = cleanText(body.referrer_source, 80);

      if (!EVENT_TYPES.has(eventType) || !/^\/[a-zA-Z0-9_/?=&.-]*$/.test(pagePath) || !/^[a-f0-9]{64}$/.test(visitorHash)) {
        return json(res, 400, { error: 'invalid_analytics_event' });
      }
      const requestSize = Number(req.headers['content-length'] || 0);
      if (requestSize > MAX_BODY_BYTES) return json(res, 413, { error: 'event_too_large' });

      const result = await supabase('analytics_events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Prefer: 'return=minimal' },
        body: JSON.stringify({ event_type: eventType, page_path: pagePath, visitor_hash: visitorHash, referrer_source: source || null }),
      });
      if (!result.ok) throw new Error(`Supabase insert failed: ${result.status}`);
      return json(res, 202, { accepted: true });
    }

    if (req.method === 'GET') {
      const accessKey = req.headers['x-pavno-admin-key'];
      if (!process.env.PAVNO_ANALYTICS_DASHBOARD_KEY || accessKey !== process.env.PAVNO_ANALYTICS_DASHBOARD_KEY) {
        return json(res, 401, { error: 'admin_key_required' });
      }
      const rawDays = Number(new URL(req.url, 'https://pavno.local').searchParams.get('days') || 7);
      const days = Math.max(1, Math.min(90, Number.isFinite(rawDays) ? Math.floor(rawDays) : 7));
      const since = new Date(Date.now() - days * 86_400_000).toISOString();
      const result = await supabase(`analytics_events?select=event_type,page_path,visitor_hash,referrer_source,event_at&event_at=gte.${encodeURIComponent(since)}&order=event_at.asc`);
      if (!result.ok) throw new Error(`Supabase query failed: ${result.status}`);
      return json(res, 200, { days, ...aggregate(await result.json()) });
    }

    res.setHeader('Allow', 'GET, POST, OPTIONS');
    return json(res, 405, { error: 'method_not_allowed' });
  } catch (error) {
    console.error('Analytics API error', error);
    return json(res, 500, { error: 'analytics_unavailable' });
  }
}
