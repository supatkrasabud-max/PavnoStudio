import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const files=['scripts/pavno-pearl-home.css','scripts/pavno-pearl-app.css'];
for(const name of files){
 const file=path.join(root,name);
 const css=fs.readFileSync(file,'utf8')
  .replaceAll('.brand.logo-image{background:#080b0d;border-radius:10px}', '.brand.logo-image{background:transparent;border-radius:0}')
  .replaceAll('footer .brand.logo-image{background:#080b0d}', 'footer .brand.logo-image{background:transparent}')
  .replaceAll('.logo.logo-image{background:#080b0d;border-radius:10px}', '.logo.logo-image{background:transparent;border-radius:0}')
  .replaceAll('.book-logo{background:#080b0d!important}', '.book-logo{background:transparent!important}');
 fs.writeFileSync(file,css);
}
console.log('Removed logo background fills from source theme styles.');
