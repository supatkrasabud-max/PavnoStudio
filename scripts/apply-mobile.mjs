import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
for(const [file,css] of [['dist/demo/index.html','scripts/mobile.css'],['dist/index.html','scripts/mobile-home.css']]){
 const target=root+file;let html=fs.readFileSync(target,'utf8');
 if(html.includes('/* MOBILE UPGRADE START */'))html=html.replace(/\/\* MOBILE UPGRADE START \*\/[\s\S]*?\/\* MOBILE UPGRADE END \*\//,'');
 html=html.replace('</style>','/* MOBILE UPGRADE START */\n'+fs.readFileSync(root+css,'utf8')+'\n/* MOBILE UPGRADE END */</style>');
 if(file.includes('/demo/')&&!html.includes('function labelMobileTables()')){
  html=html.replace('function bind(){',`function labelMobileTables(){document.querySelectorAll('table').forEach(table=>{const headers=Array.from(table.querySelectorAll('th')).map(x=>x.textContent.trim());table.querySelectorAll('tr').forEach(row=>{Array.from(row.querySelectorAll('td')).forEach((cell,i)=>cell.dataset.label=headers[i]||'')})})}\nfunction bind(){labelMobileTables();`);
 }
 fs.writeFileSync(target,html);
}
console.log('Applied mobile styles; sync customer pages next.');
