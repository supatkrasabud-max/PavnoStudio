import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const source=fs.readFileSync(path.join(root,'dist/demo/index.html'),'utf8');
const routes=[['books','หนังสือและไฟล์ดิจิทัล'],['books/chatgpt','ChatGPT ทำงานจริง — คู่มือภาษาไทย 200 หน้า'],['cart','ตะกร้าหนังสือ']];
for(const [route,title] of routes){
 const dir=path.join(root,'dist',route);fs.mkdirSync(dir,{recursive:true});
 const metadata=`<meta name="description" content="เลือกดูหนังสือและไฟล์ดิจิทัลของ PAVNO พร้อมตะกร้าสาธิต ยังไม่เปิดรับชำระเงินจริง"><meta property="og:type" content="website"><meta property="og:title" content="${title} | PAVNO DIGITAL"><meta property="og:description" content="หนังสือและไฟล์ดิจิทัล พร้อมตัวอย่างการเลือกสินค้าและตะกร้าทดลอง"><meta property="og:url" content="https://pavnostudio.vercel.app/${route}/">`;
 const html=source.replace(/<title>[^<]*<\/title>/,`<title>${title} | PAVNO DIGITAL</title>${metadata}`);
 fs.writeFileSync(path.join(dir,'index.html'),html);
}
console.log('Synced customer pages from dist/demo/index.html');
