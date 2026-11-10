function analyticsDashboard() {
  return `${title('สถิติผู้เข้าชมเว็บไซต์', 'ตัวเลขรวมจากระบบ Analytics ไม่เก็บ IP ชื่อ หรืออีเมลของผู้เข้าชม')}
    <div class="tour"><b>ยังไม่เห็นตัวเลขใช่ไหม?</b><p class="muted">ตั้งค่า Supabase และตัวแปรบน Vercel ตามไฟล์ SUPABASE-ANALYTICS-SETUP.md ก่อน จากนั้นใส่รหัสเข้าดูสถิติด้านล่าง รหัสจะใช้เพียงครั้งนี้และไม่ถูกบันทึกในเบราว์เซอร์</p></div>
    <form id="analyticsForm" class="panel formgrid"><div><label for="analyticsDays">ช่วงเวลา</label><select id="analyticsDays"><option value="7">7 วันล่าสุด</option><option value="30">30 วันล่าสุด</option><option value="90">90 วันล่าสุด</option></select></div><div><label for="analyticsKey">รหัสเข้าดูสถิติ</label><input id="analyticsKey" type="password" autocomplete="off" placeholder="ใส่ PAVNO_ANALYTICS_DASHBOARD_KEY" required></div><div class="wide"><button class="buy">ดูสถิติ</button></div></form><div id="analyticsResult"></div>`;
}

function analyticsEscape(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]);
}

function analyticsRows(rows, emptyText) {
  return rows.length ? rows.map(row => `<tr><td>${analyticsEscape(row.name)}</td><td>${row.count.toLocaleString('th-TH')}</td></tr>`).join('') : `<tr><td colspan="2">${emptyText}</td></tr>`;
}

async function loadAnalytics(form) {
  const result = document.querySelector('#analyticsResult');
  const days = document.querySelector('#analyticsDays').value;
  const key = document.querySelector('#analyticsKey').value;
  result.innerHTML = '<div class="panel muted">กำลังโหลดสถิติ…</div>';
  try {
    const response = await fetch(`/api/analytics?days=${encodeURIComponent(days)}`, { headers: { 'x-pavno-admin-key': key } });
    const data = await response.json();
    if (!response.ok) {
      const message = data.error === 'analytics_not_configured' ? 'ยังไม่ได้ตั้งค่า Supabase หรือ Vercel Environment Variables' : data.error === 'admin_key_required' ? 'รหัสเข้าดูสถิติไม่ถูกต้อง' : 'ยังโหลดสถิติไม่ได้ โปรดตรวจการตั้งค่าอีกครั้ง';
      result.innerHTML = `<div class="callout">${message}</div>`;
      return;
    }
    const peak = Math.max(1, ...data.dailyViews.map(item => item.count));
    const bars = data.dailyViews.length ? data.dailyViews.map(item => `<div class="analytics-bar" title="${item.date}: ${item.count}"><span style="height:${Math.max(8, Math.round(item.count / peak * 100))}%"></span><small>${item.date.slice(5)}</small></div>`).join('') : '<p class="muted">ยังไม่มีการเข้าชมในช่วงเวลานี้</p>';
    result.innerHTML = `<div class="stats analytics-stats"><div class="panel"><span class="muted">ผู้เข้าชมโดยประมาณ</span><b>${data.uniqueVisitors.toLocaleString('th-TH')}</b></div><div class="panel"><span class="muted">การเปิดหน้า</span><b>${data.pageViews.toLocaleString('th-TH')}</b></div><div class="panel"><span class="muted">กดดูสินค้า</span><b>${data.productViews.toLocaleString('th-TH')}</b></div><div class="panel"><span class="muted">เพิ่มตะกร้า</span><b>${data.cartAdds.toLocaleString('th-TH')}</b></div></div><div class="panel"><h2>การเปิดหน้าใน ${data.days} วัน</h2><div class="analytics-bars">${bars}</div></div><div class="split"><div class="panel tablewrap"><h2>หน้าที่มีผู้เปิดมากที่สุด</h2><table><tr><th>หน้า</th><th>การเปิด</th></tr>${analyticsRows(data.topPages, 'ยังไม่มีข้อมูล')}</table></div><div class="panel tablewrap"><h2>แหล่งที่มาของผู้เข้าชม</h2><table><tr><th>แหล่งที่มา</th><th>เหตุการณ์</th></tr>${analyticsRows(data.topSources, 'เข้าตรงหรือยังไม่มีแหล่งที่มา')}</table></div></div>`;
  } catch {
    result.innerHTML = '<div class="callout">เชื่อมต่อระบบสถิติไม่สำเร็จ โปรดตรวจว่าเว็บไซต์ Deploy เวอร์ชันล่าสุดแล้ว</div>';
  } finally {
    form.querySelector('button').disabled = false;
  }
}

document.addEventListener('submit', event => {
  if (event.target.id !== 'analyticsForm') return;
  event.preventDefault();
  event.target.querySelector('button').disabled = true;
  loadAnalytics(event.target);
});

const analyticsNavButton = document.createElement('button');
const analyticsStyles = document.createElement('link');
analyticsStyles.rel = 'stylesheet';
analyticsStyles.href = '/assets/analytics-admin.css?v=1';
document.head.append(analyticsStyles);
analyticsNavButton.type = 'button';
analyticsNavButton.textContent = 'สถิติผู้เข้าชมเว็บไซต์';
analyticsNavButton.addEventListener('click', () => {
  admin = 'analytics';
  view = 'admin';
  render();
});
document.querySelector('#sidebar')?.insertBefore(analyticsNavButton, document.querySelector('#reset'));
