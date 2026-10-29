import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const logo='<img src="/assets/pavno-logo.png" alt="PAVNO DIGITAL" width="1254" height="1254" decoding="async">';
const css=`
/* PAVNO supplied logo — original artwork preserved */
.brand::before{display:none!important}.brand.logo-image,.logo.logo-image{display:inline-flex;align-items:center;justify-content:center;width:170px;height:112px;overflow:hidden;flex:0 0 auto;vertical-align:middle;text-decoration:none}.brand.logo-image img,.logo.logo-image img{width:186px;height:186px;max-width:none;object-fit:contain;flex:none;display:block}.book-top{height:40px;display:flex;align-items:center;gap:8px;letter-spacing:1px}.book-top img{display:block;width:40px;height:40px;object-fit:contain}.coverarea .book-top{height:30px}.coverarea .book-top img{width:30px;height:30px}.book .book-logo{display:block;width:48px;height:48px;object-fit:contain;margin:0 0 9px;background:transparent}.book-detail .book .book-logo{width:75px;height:75px;margin-bottom:15px}.book-label{font-size:8px!important;margin-bottom:10px!important}.foot-logo{display:block;width:100px;height:82px;overflow:hidden;margin:0 auto 10px}.foot-logo img{width:110px;height:110px;max-width:none;object-fit:contain;display:block;transform:translateY(-14px)}.reader-brand{display:block;width:48px;height:48px;object-fit:contain;margin-bottom:8px}nav .brand.logo-image{height:95px}footer .brand.logo-image{height:115px}
@media(max-width:760px){.brand.logo-image,.logo.logo-image{width:145px;height:92px}.brand.logo-image img,.logo.logo-image img{width:158px;height:158px}nav .brand.logo-image{height:86px}footer .brand.logo-image{height:100px}.book-detail .book .book-logo{width:56px;height:56px;margin-bottom:12px}.book-detail .book{height:275px}.reader-brand{width:37px;height:37px}}
`;
for(const file of ['dist/index.html','dist/demo/index.html']){
 let h=fs.readFileSync(root+file,'utf8');
 h=h.replace('<head>','<head><link rel="icon" type="image/png" href="/assets/pavno-logo.png">');
 h=h.replace('<a class="brand" href="#" aria-label="Pavno Digital หน้าแรก">PAVNO<span>DIGITAL</span></a>','<a class="brand logo-image" href="/" aria-label="Pavno Digital หน้าแรก">'+logo+'</a>');
 h=h.replace('<div class="brand">PAVNO<span>DIGITAL</span></div>','<a class="brand logo-image" href="/" aria-label="PAVNO DIGITAL หน้าแรก">'+logo+'</a>');
 h=h.replace('<div class="logo">▥ PAVNO <span>STUDIO DEMO</span></div>','<a class="logo logo-image" href="/" aria-label="PAVNO DIGITAL หน้าแรก">'+logo+'</a>');
 h=h.replaceAll('<div class="book-top">PAVNO DIGITAL</div>','<div class="book-top">'+logo+'</div>');
 h=h.replace('<div class="book-top">PAVNO DIGITAL / PRACTICAL GUIDES</div>','<div class="book-top">'+logo+'<span>PRACTICAL GUIDES</span></div>');
 h=h.replace('<b>PAVNO LIBRARY</b>','<img class="reader-brand" src="/assets/pavno-logo.png" alt="PAVNO DIGITAL" width="48" height="48">');
 h=h.replace('<small>PAVNO DIGITAL · DEMO</small>','<img class="book-logo" src="/assets/pavno-logo.png" alt="PAVNO DIGITAL" width="48" height="48"><small class="book-label">DEMO</small>');
 h=h.replace('<div class="foot">PAVNO DIGITAL ·','<div class="foot"><a class="foot-logo" href="/" aria-label="PAVNO DIGITAL หน้าแรก">'+logo+'</a>PAVNO DIGITAL ·');
 h=h.replace('</style>',css+'</style>');fs.writeFileSync(root+file,h);
}
console.log('Updated all storefront and demo logo placements.');
