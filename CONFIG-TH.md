# ตั้งค่า PavnoStudio ใน VS Code

## สถานะ
Repository: https://github.com/supatkrasabud-max/PavnoStudio
ไฟล์เว็บอยู่ใน dist/ หน้าเดโมใช้ localStorage ยังไม่มี Supabase Auth หรือฐานข้อมูลจริง
โครงนี้เป็นเว็บบน Vercel ไม่ใช่ WordPress และไม่ต้องเชื่อม WordPress เพิ่มถ้าเลือกพัฒนาระบบ Supabase ต่อ

## เปิดและทดลองใน VS Code
1. เปิดโฟลเดอร์ `D:\TNC Test_Code\E-Book Project\PavnoStudio`
2. เปิด Terminal แล้วรัน `npm run dev` (ต้องมี Node.js 20 ขึ้นไป; ไม่ต้อง npm install เพราะไม่มี dependencies)
3. เปิด http://127.0.0.1:3000 และ http://127.0.0.1:3000/demo/
4. หรือ Terminal > Run Task > PAVNO: เปิดเว็บในเครื่อง

## ส่งขึ้น GitHub
ไฟล์ถูกจัดเตรียมไว้ในเครื่อง ยังไม่ได้ commit/push
Source Control ใน VS Code > Stage > ใส่ข้อความ commit เช่น `Add PAVNO storefront and demo` > Commit > Sync/Push
หาก Git ขอชื่อผู้เขียน ให้ใช้ชื่อและอีเมล GitHub ของคุณเอง หรืออีเมล noreply จากบัญชี GitHub
เข้าสู่ GitHub ผ่าน VS Code ด้วยบัญชีที่มีสิทธิ์เขียน repository นี้
ไม่ใช้ force push และไม่ใส่ .env.local หรือคีย์ลับใน commit

## เชื่อม Vercel เดิมกับ GitHub
Vercel > โปรเจกต์ pavno-digital > Settings > Git > Connect Git Repository > supatkrasabud-max/PavnoStudio
Production Branch: main / Framework: Other / Root Directory: ราก repository / Output Directory: dist / Build Command: ไม่มี
หลังเชื่อม การ push main จะอัปเดต production ตามการตั้งค่าของ Vercel

## Supabase สำหรับระบบจริง
1. สร้างโปรเจกต์ใน https://supabase.com/dashboard โดยเก็บรหัสฐานข้อมูลไว้กับคุณ ไม่ใส่ในแชท
2. คัดลอก Project URL และ Publishable key จาก Connect/การตั้งค่า API ของโปรเจกต์
3. คัดลอก .env.example เป็น .env.local แล้วใส่ SUPABASE_URL และ SUPABASE_PUBLISHABLE_KEY
4. เพิ่มชื่อและค่าเดียวกันใน Vercel > Settings > Environment Variables เลือก environment ที่ใช้ แล้ว redeploy เมื่อโค้ดเชื่อมต่อพร้อม
5. สำหรับ static HTML ค่า environment ของ Vercel จะไม่ถูกฉีดเข้า JavaScript อัตโนมัติ ต้องเพิ่ม API/config endpoint หรือ build step สำหรับ publishable config ก่อน
6. ห้ามส่ง SUPABASE_SECRET_KEY หรือ service_role key ไปเบราว์เซอร์/ไฟล์ใน dist/ หรือ GitHub เพราะข้าม RLS ได้
7. ตั้ง Auth Site URL เป็น https://pavno-digital.vercel.app และเพิ่ม redirect URLs เฉพาะเส้นทางล็อกอินที่พัฒนาจริง รวม localhost สำหรับทดสอบ

## ข้อมูลที่ต้องออกแบบและเชื่อมต่อ
- Supabase Auth: ผู้ดูแลร้าน และสิทธิ์แอดมินที่ผู้ใช้ทั่วไปแก้ให้ตัวเองไม่ได้
- products: ชื่อ slug คำอธิบาย หมวด ราคา สถานะ และภาพปก; สาธารณะอ่านเฉพาะสินค้าเผยแพร่
- orders/order_items: คำนวณยอดฝั่งเซิร์ฟเวอร์และจำกัดการอ่านตามผู้ซื้อ/แอดมิน
- leads/consents: ฟอร์มผ่าน server validation และจำกัดการเข้าถึง ไม่เปิดให้สาธารณะอ่านรายชื่อ
- storage: ภาพปกอาจเป็น public; PDF ขายและสลิปต้อง private พร้อม RLS และลิงก์ชั่วคราวหลังตรวจสิทธิ์
- เปิด RLS ทุกตารางที่เปิดผ่าน API และทดสอบทั้งคนทั่วไป ผู้ซื้อ และแอดมิน
- QR แสดงยอดไม่เท่ากับยืนยันการชำระเงิน ต้องตรวจเงินจริงก่อนเปิดดาวน์โหลด

ชุดนี้เตรียม config เท่านั้น ยังไม่ได้สร้างตาราง นโยบาย Auth หรือเชื่อมเดโมกับ Supabase และยังไม่รับเงินจริง
เมื่อมี Project URL ให้ส่ง URL เพื่อระบุโปรเจกต์ได้ โดยไม่ส่งรหัสผ่านหรือคีย์ลับ

เอกสาร: https://supabase.com/docs/guides/getting-started/api-keys
RLS: https://supabase.com/docs/guides/database/postgres/row-level-security
