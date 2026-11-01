const {chromium}=require('C:/Users/HP/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const b=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 try{
 const p=await b.newPage({viewport:{width:390,height:844}});const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:3000/books/?product=content-planner',{timeout:15000});
 await p.getByRole('heading',{name:'Content Planner 30 วัน',exact:true}).waitFor();
 if(await p.locator('img[src="/assets/planner-sample-calendar.png"]').evaluate(x=>!x.complete||x.naturalWidth===0))throw Error('Sample image unavailable');
 await p.locator('[data-add="content-planner"]').click();
 await p.locator('[data-view="cart"]').click();
 await p.getByText('Content Planner 30 วัน',{exact:true}).first().waitFor();
 if(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1))throw Error('Mobile horizontal overflow');
 await p.goto('http://127.0.0.1:3000/books/?product=shop-work-kit');
 await p.getByRole('heading',{name:'Online Shop Work Kit',exact:true}).waitFor();
 await p.getByText('บรีฟสินค้าและข้อเสนอ',{exact:true}).waitFor();
 if(errors.length)throw Error(errors.join('\n'));
 console.log('PASS: direct product links, sample image, cart, work-kit contents, 390px mobile, no JS errors');
 }finally{await b.close();}
})().catch(e=>{console.error(e.message);process.exit(1)});
