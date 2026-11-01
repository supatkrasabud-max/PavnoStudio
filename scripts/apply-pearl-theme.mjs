import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
for(const [file,css] of [['dist/index.html','scripts/pavno-pearl-home.css'],['dist/demo/index.html','scripts/pavno-pearl-app.css']]){
 let h=fs.readFileSync(root+file,'utf8');
 h=h.replace(/\/\* PEARL THEME START \*\/[\s\S]*?\/\* PEARL THEME END \*\//,'');
 h=h.replace('</style>','/* PEARL THEME START */\n'+fs.readFileSync(root+css,'utf8')+'\n/* PEARL THEME END */</style>');
 fs.writeFileSync(root+file,h);
}
console.log('Applied PAVNO ink, pearl and champagne theme.');
