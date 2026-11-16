// Stripe Payment Links (สร้างเมื่อ 16 พ.ย. 2026) — ลิงก์สาธารณะสำหรับลูกค้า ไม่ใช่คีย์ลับ
// เพิ่ม/แก้ลิงก์ได้ที่นี่ที่เดียว สินค้าที่ไม่มีลิงก์จะยังแสดงปุ่มตะกร้าแบบเดิม
const PAY_LINKS = {
 'thai-abc': 'https://buy.stripe.com/5kQ3cu87dcVD2cg3RB5os07',
 'abc-tracing': 'https://buy.stripe.com/8x23cufzFg7PaIM5ZJ5os08',
 'hiragana': 'https://buy.stripe.com/aFa5kC87ddZH2cg87R5os09',
 'kanji-g1': 'https://buy.stripe.com/4gMcN4gDJaNv6swafZ5os0a',
 'chinese-60': 'https://buy.stripe.com/bJeaEW0ELaNvbMQ73N5os0b',
 'math-add': 'https://buy.stripe.com/14A28qfzFf3L18c3RB5os0c',
 'math-sub': 'https://buy.stripe.com/6oU7sKbjpg7Pg36fAj5os0d',
 'math-mul': 'https://buy.stripe.com/dRmaEWbjp6xf6sw9bV5os0e',
 'math-div': 'https://buy.stripe.com/3cI9AS739aNv2cgbk35os0f',
 'math-bundle': 'https://buy.stripe.com/cNi00ibjp8Fn0481Jt5os0g',
 'coloring': 'https://buy.stripe.com/cNidR8bjp5tb4ko2Nx5os0h'
};
function payLink(id){return Object.prototype.hasOwnProperty.call(PAY_LINKS,id)?PAY_LINKS[id]:''}
