// Stripe Payment Links (สร้างเมื่อ 16 พ.ย. 2026) — ลิงก์สาธารณะสำหรับลูกค้า ไม่ใช่คีย์ลับ
// เพิ่ม/แก้ลิงก์ได้ที่นี่ที่เดียว สินค้าที่ไม่มีลิงก์จะยังแสดงปุ่มตะกร้าแบบเดิม
const PAY_LINKS = {
 'kids-color-story': 'https://buy.stripe.com/cNibJ0drx9Jr0480Fp5os00',
 'kids-add-subtract': 'https://buy.stripe.com/3cI4gy87d1cV6swfAj5os01',
 'kids-color-numbers': 'https://buy.stripe.com/6oU28q0EL4p77wA73N5os02',
 'content-planner': 'https://buy.stripe.com/cNi5kC4V108R8AEewf5os03',
 'shop-work-kit': 'https://buy.stripe.com/14AfZgevB5tb5os1Jt5os05'
 // 'chatgpt': 'https://buy.stripe.com/28E5kC9bh3l304887R5os04'  // เปิดเมื่อไฟล์ ChatGPT 200 หน้าพร้อมขาย
};
function payLink(id){return Object.prototype.hasOwnProperty.call(PAY_LINKS,id)?PAY_LINKS[id]:''}
