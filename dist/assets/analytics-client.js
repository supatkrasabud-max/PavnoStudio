(() => {
  const CLIENT_KEY = 'pavno-anonymous-visitor-v1';
  const tracked = new Set();

  function source() {
    try {
      const host = new URL(document.referrer).hostname.replace(/^www\./, '');
      if (!host || host === location.hostname) return '';
      return host.slice(0, 80);
    } catch { return ''; }
  }

  function visitorId() {
    let id = localStorage.getItem(CLIENT_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(CLIENT_KEY, id);
    }
    return id;
  }

  async function visitorHash() {
    const bytes = new TextEncoder().encode(visitorId());
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, '0')).join('');
  }

  async function track(eventType, detail = {}) {
    const key = `${eventType}:${detail.product_id || ''}:${location.pathname}${location.search}`;
    if (eventType === 'page_view' && tracked.has(key)) return;
    tracked.add(key);
    try {
      const payload = JSON.stringify({
        event_type: eventType,
        page_path: `${location.pathname}${location.search}`.slice(0, 160),
        visitor_hash: await visitorHash(),
        referrer_source: source(),
      });
      fetch('/api/analytics', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload, keepalive: true }).catch(() => {});
    } catch { /* Analytics must never interrupt browsing. */ }
  }

  window.PavnoAnalytics = { track };
  track('page_view');
  const originalPushState = history.pushState;
  history.pushState = function (...args) {
    const result = originalPushState.apply(this, args);
    track('page_view');
    return result;
  };
  window.addEventListener('popstate', () => track('page_view'));
  document.addEventListener('click', event => {
    const target = event.target.closest('[data-add],[data-buy],[data-detail],a[href*="/samples/"],a[href*="/books/"]');
    if (!target) return;
    if (target.matches('a[href*="/samples/"]')) return track('sample_open');
    if (target.dataset.add || target.dataset.buy) return track('cart_add', { product_id: target.dataset.add || target.dataset.buy });
    if (target.dataset.detail) return track('product_view', { product_id: target.dataset.detail });
    if (target.matches('a[href*="/books/"]')) return track('product_view');
  });
})();
