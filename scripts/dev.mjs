import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('../dist/',import.meta.url));
const server=http.createServer(async(req,res)=>{
 try {
  let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(name.endsWith('/'))name+='index.html';
  const target=path.resolve(root,'.'+name);
  if(!target.startsWith(root)){res.writeHead(403);res.end();return;}
  const data=await readFile(target);
  const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.svg':'image/svg+xml'};
  res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream'});res.end(data);
 }catch{res.writeHead(404);res.end('Not found');}
});
server.on('error',error=>{
 if(error.code==='EADDRINUSE'){
  console.error('Port 3000 is already in use. If PAVNO is already running, open http://127.0.0.1:3000/demo/');
 }else console.error(error.message);
 process.exitCode=1;
});
server.listen(3000,'127.0.0.1',()=>console.log('PAVNO: http://127.0.0.1:3000 | Demo: http://127.0.0.1:3000/demo/'));
