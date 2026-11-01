from pathlib import Path
p=Path(__file__).parent.parent/'dist/demo/index.html'
s=p.read_text(encoding='utf-8')
if '/assets/launch-products.js' not in s:
 s=s.replace('<script>\nconst KEY=', '<script src="/assets/launch-products.js"></script>\n<script>\nconst KEY=',1)
 s=s.replace("products:[{id:'chatgpt'", "products:[...LAUNCH_PRODUCTS.map(p=>({...p})),{id:'chatgpt'",1)
 s=s.replace("let selectedProduct='chatgpt'", "for(const product of LAUNCH_PRODUCTS){if(!state.products.some(p=>p.id===product.id))state.products.push({...product});}\nlet selectedProduct='chatgpt'",1)
 s=s.replace("first?'ลิงก์หนังสือเล่มแรกเปิดดูได้ทุกเครื่อง'", "(first||LAUNCH_PRODUCTS.some(x=>x.id===p.id))?'ลิงก์สินค้าตัวอย่างนี้เปิดได้ทุกเครื่อง'",1)
 marker='<button data-view="shop">← ดูหนังสือเล่มอื่น</button>`;'
 assert marker in s
 s=s.replace(marker,marker+"\n$('#main').insertAdjacentHTML('beforeend',launchSample(p));",1)
 assert '<script src="/assets/launch-products.js">' in s
 p.write_text(s,encoding='utf-8')
print('Launch previews installed; existing browser products preserved.')
