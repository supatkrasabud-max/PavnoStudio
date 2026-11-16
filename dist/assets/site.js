/* PAVNO DIGITAL — shared site script: header, footer, product cards, catalog and product page */
(() => {
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const PRODUCTS = (typeof LAUNCH_PRODUCTS !== 'undefined' ? LAUNCH_PRODUCTS : []).filter(p => p.status === 'published' && p.line === 'learn');
  const buy = id => (typeof payLink === 'function' ? payLink(id) : '');
  const group = p => p.category === 'คณิตศาสตร์' ? 'math' : p.category === 'ระบายสี' ? 'color' : (['ภาษาญี่ปุ่น','ภาษาจีน'].includes(p.category) ? 'asia' : 'lang');
  const GROUPS = {all:'ทั้งหมด', lang:'ไทย · อังกฤษ', asia:'ญี่ปุ่น · จีน', math:'คณิตศาสตร์', color:'ระบายสี'};
  const HOT = ['math-bundle','thai-abc','coloring'];
  const PV = !!window.PAVNO_PREVIEW;
  const L = h => !PV ? h : h === '/' ? '#home' : h === '/books/' ? '#shop' : h.startsWith('/books/?cat=') ? '#shop-' + h.split('=')[1] : h.startsWith('/product/?id=') ? '#p-' + h.split('=')[1] : h.includes('#') ? '#' + h.split('#')[1] : '#faq';
  const url = p => L('/product/?id=' + encodeURIComponent(p.id));
  const short = p => (p.description.split(':').slice(1).join(':').trim() || p.description);
  const here = location.pathname;

  // ---------- header & footer ----------
  const nav = [['/', 'หน้าแรก'], ['/books/', 'สินค้าทั้งหมด'], ['/books/?cat=lang', 'ภาษา'], ['/books/?cat=math', 'คณิต'], ['/books/?cat=color', 'ระบายสี'], ['/learn/#club', 'สมาชิกรายปี']];
  const hdr = document.getElementById('site-header');
  if (hdr) {
    hdr.outerHTML = `<div class="bar">ใหม่! สมุดฝึก 11 เล่ม เริ่มต้น 79 บาท · พิมพ์ได้ไม่จำกัด · <a href="${L('/books/')}">เลือกเลย</a></div>
<header class="hdr"><div class="wrap"><a class="logo" href="${L('/')}"><img src="/assets/pavno-logo.png" alt="" width="36" height="36">PAVNO</a>
<button class="menu-btn" aria-expanded="false" aria-controls="nav" aria-label="เปิดเมนู">☰</button>
<nav class="nav" id="nav">${nav.map(([h, t]) => `<a href="${L(h)}"${(h === here || (h === '/books/' && here === '/books/' && !location.search)) ? ' aria-current="page"' : ''}>${t}</a>`).join('')}</nav>
<a class="btn sm" href="${L('/books/')}">ซื้อสมุด</a></div></header>`;
    const btn = document.querySelector('.menu-btn'), nv = document.getElementById('nav');
    btn.addEventListener('click', () => { const o = nv.classList.toggle('open'); btn.setAttribute('aria-expanded', o); btn.textContent = o ? '✕' : '☰'; });
    nv.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nv.classList.remove('open'); btn.textContent = '☰'; }));
  }
  const ftr = document.getElementById('site-footer');
  if (ftr) {
    ftr.outerHTML = `<footer class="ftr"><div class="wrap">
<div class="about"><a class="logo" href="/" style="color:#fff"><img src="/assets/pavno-logo.png" alt="" width="36" height="36">PAVNO DIGITAL</a>
<p style="margin-top:10px">สมุดฝึกอ่าน เขียน คิดเลข และระบายสี สำหรับเด็ก ไฟล์ PDF พิมพ์ได้ไม่จำกัดในบ้านและห้องเรียน ตัวการ์ตูนออกแบบใหม่ทั้งหมด</p>
<div class="pay"><span>PromptPay</span><span>Visa / Mastercard</span><span>Apple Pay</span><span>Google Pay</span></div></div>
<div><h4>สินค้า</h4><a href="${L('/books/?cat=lang')}">ภาษาไทย · อังกฤษ</a><a href="${L('/books/?cat=asia')}">ญี่ปุ่น · จีน</a><a href="${L('/books/?cat=math')}">คณิตศาสตร์</a><a href="${L('/books/?cat=color')}">ระบายสี</a></div>
<div><h4>ช่วยเหลือ</h4><a href="${L('/learn/#faq')}">คำถามที่พบบ่อย</a><a href="${L('/contact/')}">ติดต่อเรา · 098-914-7999</a><a href="${L('/refund/')}">นโยบายคืนเงิน</a><a href="${L('/terms/')}">เงื่อนไขการใช้งาน</a></div>
<div class="copy">© ${new Date().getFullYear()} PAVNO DIGITAL · ชำระเงินปลอดภัยผ่าน Stripe · รับไฟล์ทางอีเมลภายใน 24 ชั่วโมง</div></div></footer>`;
  }

  // ---------- product card ----------
  const card = p => {
    const link = buy(p.id);
    return `<article class="card" data-g="${group(p)}" data-q="${esc((p.name + ' ' + p.category + ' ' + p.description).toLowerCase())}">
<a class="img" href="${url(p)}" aria-label="${esc(p.name)}"><span class="badge">${esc(p.category)}</span>${HOT.includes(p.id) ? '<span class="badge hot">ขายดี</span>' : ''}
<img src="${esc(p.image)}" alt="ปก ${esc(p.name)}" loading="lazy" width="580" height="820"><img class="alt" src="${esc(p.page)}" alt="" loading="lazy" width="580" height="820"></a>
<div class="body"><h3><a href="${url(p)}">${esc(p.name)}</a></h3>
<div class="meta">${esc(p.pages ? p.pages + ' หน้า · ' : '')}${esc(p.age || '')}</div>
<div class="price">${p.price} บาท${p.id === 'math-bundle' ? '<s>316</s>' : ''}</div>
<div class="actions">${link ? `<a class="btn" href="${esc(link)}" target="_blank" rel="noopener" data-buy="${esc(p.id)}">ซื้อเลย</a>` : ''}<a class="btn ghost" href="${url(p)}">ดูตัวอย่าง</a></div></div></article>`;
  };
  window.PAVNO = { PRODUCTS, card, url, buy, esc };

  // home: featured grid
  const feat = document.getElementById('featured');
  if (feat) feat.innerHTML = PRODUCTS.map(card).join('');

  // ---------- catalog ----------
  function renderCatalog(initial) {
    const cat = document.getElementById('catalog'); if (!cat) return;
    let g = GROUPS[initial] ? initial : 'all', term = '', sort = 'pop';
    const fl = document.getElementById('filters');
    fl.innerHTML = Object.entries(GROUPS).map(([k, v]) => `<button data-g="${k}" aria-pressed="${k === g}">${v}</button>`).join('') +
      `<label class="search"><span aria-hidden="true">🔍</span><input type="search" placeholder="ค้นหาสมุด เช่น ก-ฮ, คูณ" aria-label="ค้นหาสินค้า"></label>
<select aria-label="เรียงลำดับ"><option value="pop">แนะนำ</option><option value="low">ราคาต่ำ → สูง</option><option value="high">ราคาสูง → ต่ำ</option></select>`;
    const draw = () => {
      let list = PRODUCTS.filter(p => (g === 'all' || group(p) === g) && (p.name + ' ' + p.category + ' ' + p.description).toLowerCase().includes(term));
      if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
      if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
      cat.innerHTML = list.length ? list.map(card).join('') : '<p class="empty">ไม่พบสมุดที่ค้นหา ลองคำอื่นดูนะคะ</p>';
      document.getElementById('count').textContent = `${list.length} รายการ`;
    };
    fl.addEventListener('click', e => { const b = e.target.closest('button[data-g]'); if (!b) return; g = b.dataset.g;
      fl.querySelectorAll('button[data-g]').forEach(x => x.setAttribute('aria-pressed', x === b));
      if (!PV) history.replaceState(null, '', g === 'all' ? '/books/' : '/books/?cat=' + g); draw(); });
    fl.querySelector('input').addEventListener('input', e => { term = e.target.value.trim().toLowerCase(); draw(); });
    fl.querySelector('select').addEventListener('change', e => { sort = e.target.value; draw(); });
    draw();
  }
  if (document.getElementById('catalog') && !PV) {
    const q = new URLSearchParams(location.search);
    if (q.get('product')) { location.replace('/product/?id=' + encodeURIComponent(q.get('product'))); return; }
    renderCatalog(q.get('cat'));
  }

  // ---------- product page ----------
  function renderProduct(id) {
    const pd = document.getElementById('product'); if (!pd) return;
    document.querySelectorAll('.sticky-buy').forEach(x => x.remove()); document.body.classList.remove('has-sticky');
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) { pd.innerHTML = `<div class="empty"><h2>ไม่พบสินค้านี้</h2><p>สินค้าอาจปิดการขายแล้ว</p><p style="margin-top:16px"><a class="btn" href="${L('/books/')}">ดูสินค้าทั้งหมด</a></p></div>`; return; }
    document.title = `${p.name} | PAVNO DIGITAL`;
    const md = document.querySelector('meta[name=description]'); if (md) md.content = short(p);
    const imgs = [p.image, ...(p.gimgs || Array.from({length: p.gallery || 0}, (_, i) => `/assets/products/${p.id}-g${i + 1}.jpg`))];
    const link = buy(p.id);
    const usd = {79:'2.99',89:'3.49',99:'3.79',109:'4.29',169:'6.79'}[p.price];
    pd.innerHTML = `<nav class="crumb"><a href="${L('/')}">หน้าแรก</a> / <a href="${L('/books/')}">สินค้าทั้งหมด</a> / ${esc(p.name)}</nav>
<div class="pd"><div class="gallery"><div class="main"><img id="gmain" src="${esc(imgs[0])}" alt="${esc(p.name)}" width="580" height="820"></div>
<div class="thumbs">${imgs.map((s, i) => `<button aria-current="${i === 0}" data-src="${esc(s)}" aria-label="ดูภาพที่ ${i + 1}"><img src="${esc(s)}" alt="" loading="lazy"></button>`).join('')}</div></div>
<div class="info"><span class="eyebrow">${esc(p.category)}</span><h1>${esc(p.name)}</h1><p class="muted">${esc(short(p))}</p>
<div class="price">${p.price} บาท</div>${usd ? `<div class="usd">ลูกค้าต่างประเทศ ประมาณ USD ${usd} (แสดงสกุลเงินท้องถิ่นตอนชำระเงิน)</div>` : ''}
<ul class="pts">${(p.points || []).map(t => `<li>${esc(t)}</li>`).join('')}</ul>
<div class="buybox">${link ? `<a class="btn block" href="${esc(link)}" target="_blank" rel="noopener" data-buy="${esc(p.id)}">ซื้อเลย ${p.price} บาท →</a>` : '<span class="btn block" aria-disabled="true">เร็ว ๆ นี้</span>'}
${p.sample ? `<a class="btn ghost block" href="${esc(p.sample)}" target="_blank" rel="noopener" download>ดาวน์โหลดตัวอย่างฟรี (PDF)</a>` : ''}
<p class="note">ชำระด้วย PromptPay บัตรเครดิต/เดบิต Apple Pay หรือ Google Pay ผ่าน Stripe · ลิงก์ดาวน์โหลดส่งทางอีเมลภายใน 24 ชั่วโมง · <a class="link" href="${L('/refund/')}">นโยบายคืนเงิน</a></p></div>
<table class="specs"><tr><th>จำนวนหน้า</th><td>${esc(p.pages)} หน้า</td></tr><tr><th>ขนาดกระดาษ</th><td>${esc(p.size)}</td></tr><tr><th>เหมาะกับ</th><td>${esc(p.age)}</td></tr><tr><th>ภาษา</th><td>${esc(p.lang)}</td></tr><tr><th>รูปแบบ</th><td>ไฟล์ PDF · พิมพ์ได้ไม่จำกัดในบ้านหรือห้องเรียนของผู้ซื้อ</td></tr></table></div></div>
<section class="s" style="padding-top:20px"><div class="s-head"><h2>สมุดเล่มอื่นที่น่าสนใจ</h2><a class="link" href="${L('/books/')}">ดูทั้งหมด →</a></div>
<div class="grid">${PRODUCTS.filter(x => x.id !== p.id && group(x) === group(p)).concat(PRODUCTS.filter(x => x.id !== p.id && group(x) !== group(p))).slice(0, 4).map(card).join('')}</div></section>`;
    const main = document.getElementById('gmain');
    pd.querySelector('.thumbs').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; main.src = b.dataset.src;
      pd.querySelectorAll('.thumbs button').forEach(x => x.setAttribute('aria-current', x === b)); });
    if (link) { const sb = document.createElement('div'); sb.className = 'sticky-buy';
      sb.innerHTML = `<span class="p">${p.price} บาท</span><a class="btn" href="${esc(link)}" target="_blank" rel="noopener" data-buy="${esc(p.id)}">ซื้อเลย</a>`;
      document.body.appendChild(sb); document.body.classList.add('has-sticky'); }
  }
  if (document.getElementById('product') && !PV) renderProduct(new URLSearchParams(location.search).get('id'));
  Object.assign(window.PAVNO, {renderCatalog, renderProduct, L});
})();
