from pathlib import Path
p=Path(__file__).parent.parent/'dist/assets/launch-products.js';s=p.read_text(encoding='utf-8')
s=s.replace('เริ่มจากภาพสัตว์หนึ่งภาพ แล้วชวนวาดหรือเล่าเรื่องต่อ ไม่มีคำตอบสวยหรือถูกเพียงแบบเดียว','อ่านเรื่องสั้น ชวนสังเกตหนึ่งอย่าง แล้วให้เด็กเลือกสีและเล่าตอนต่อเอง ไม่ต้องตอบครบหรือระบายอยู่ในเส้น')
s=s.replace('สองขนาดเป็นเนื้อหาซ้ำต่างกระดาษ ไม่ใช่จำนวนกิจกรรมเพิ่มสองเท่า','ภาษาไทยและอังกฤษแยกเล่ม แต่ละภาษามี A4/US Letter เป็นเนื้อหาซ้ำต่างรูปแบบ ไม่ใช่กิจกรรมใหม่เพิ่ม')
anchor='<h3>สิ่งที่ผู้ปกครองควรทราบ</h3>'
links='<p><a href="/samples/kids-color-story-en-3p.pdf" target="_blank" rel="noopener">English coloring sample (3 pages)</a></p><p><a href="/samples/kids-add-subtract-en-4p.pdf" target="_blank" rel="noopener">English math sample and answers (4 pages)</a></p>'
if 'English coloring sample' not in s:s=s.replace(anchor,links+anchor,1)
# Existing default records are upgraded only if they still have their original descriptions.
legacy={
'kids-color-story':'ต้นแบบ PDF ไทย-อังกฤษ 20 หน้า: 8 ภาพสัตว์ระบายสี + 8 หน้าวาดต่อ + ส่วนประกอบ 4 หน้า มี A4 และ US Letter เนื้อหาเดียวกัน แนวเริ่มต้นประมาณ 4-7 ปี เลือกตามความพร้อมเด็ก',
'kids-add-subtract':'ต้นแบบ PDF ไทย-อังกฤษ 48 หน้า: แบบฝึก 40 หน้า รวม 400 ข้อ พร้อมเฉลย 8 หน้า บวกและลบช่วง 0-10 และ 0-20 มี A4/US Letter เนื้อหาเดียวกัน โจทย์มีซ้ำข้ามหน้าเพื่อทบทวน',
'kids-color-numbers':'ต้นแบบชุดรวม 68 หน้า: ระบายสีและวาดต่อ 20 หน้า + แบบฝึกเลข 40 หน้า + เฉลย 8 หน้า เป็นการรวมสองชุดเดิม มี A4 และ US Letter เนื้อหาเดียวกัน'}
import json
if 'function refreshKidsReading' not in s:
 s+='\nfunction refreshKidsReading(products){const previous='+json.dumps(legacy,ensure_ascii=False)+';for(const product of products){if(product.description===previous[product.id]){const next=LAUNCH_PRODUCTS.find(x=>x.id===product.id);product.description=next.description;if(product.id===\'kids-color-story\'&&product.name===\'ระบายสี แล้วเล่าเรื่องของหนู\')product.name=next.name;}}}\n'
p.write_text(s,encoding='utf-8')
page=p.parent.parent/'demo/index.html';html=page.read_text(encoding='utf-8')
if 'refreshKidsReading(state.products);' not in html:html=html.replace("let selectedProduct='chatgpt'","refreshKidsReading(state.products);\nlet selectedProduct='chatgpt'",1)
html=html.replace('src="/assets/launch-products.js"','src="/assets/launch-products.js?v=3"')
page.write_text(html,encoding='utf-8')
print('Updated reading-edition copy, English samples and safe default-product refresh.')
