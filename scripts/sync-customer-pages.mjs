import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const source=fs.readFileSync(path.join(root,'dist/demo/index.html'),'utf8');
// หน้า /books/ และ /cart/ เป็นหน้าร้านแบบใหม่ (site.js) แล้ว ไม่ต้อง sync จาก demo อีก
const routes=[];
for(const [route,title] of routes){
 const dir=path.join(root,'dist',route);fs.mkdirSync(dir,{recursive:true});
 const metadata=`<meta name="description" content="เลือกดูหนังสือและไฟล์ดิจิทัลของ PAVNO ชำระเงินผ่าน PromptPay และบัตร รับไฟล์ทางอีเมล"><meta property="og:type" content="website"><meta property="og:title" content="${title} | PAVNO DIGITAL"><meta property="og:description" content="หนังสือและไฟล์ดิจิทัล สำหรับเด็ก ครอบครัว และร้านค้าออนไลน์"><meta property="og:url" content="https://pavnostudio.vercel.app/${route}/">`;
 const html=source.replace(/<title>[^<]*<\/title>/,`<title>${title} | PAVNO DIGITAL</title>${metadata}`);
 fs.writeFileSync(path.join(dir,'index.html'),html);
}
console.log('Synced customer pages from dist/demo/index.html');
