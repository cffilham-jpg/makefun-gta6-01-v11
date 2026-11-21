import {chromium} from '/home/hatch/.npm/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
import {mkdirSync,readdirSync,unlinkSync,statSync,writeFileSync} from 'node:fs';
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--use-angle=swiftshader','--enable-unsafe-swiftshader'],executablePath:'/home/hatch/.cache/ms-playwright/chromium_headless_shell-1255/chrome-headless-shell-linux64/chrome-headless-shell'});
const page=await browser.newPage({viewport:{width:1280,height:800},deviceScaleFactor:1});
page.setDefaultTimeout(120000);
const errors=[],external=[];page.on('pageerror',e=>{errors.push(e.message);console.log('PAGE ERROR',e.message);});page.on('console',m=>console.log('BROWSER',m.type(),m.text()));page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:8080/'))external.push(r.url());});
const only=process.argv[2];mkdirSync('screenshots',{recursive:true});mkdirSync('.capture',{recursive:true});
if(!only)for(const file of readdirSync('screenshots'))if(/\.(jpg|png)$/.test(file))unlinkSync('screenshots/'+file);
for(const [i,name] of ['chase','shootout','night','progress'].entries()){
 if(only&&name!==only)continue;
 await page.goto('http://127.0.0.1:8080/?shot='+name);await page.waitForFunction(()=>window.CostaLuna?.state.elapsed>.16);console.log('READY',name,await page.evaluate(()=>({ready:!!window.CostaLuna,hud:document.querySelector('#hud').innerText.slice(0,50)})));
 const session=await page.context().newCDPSession(page);const shot=await session.send('Page.captureScreenshot',{format:'jpeg',quality:86,fromSurface:true});writeFileSync('screenshots/'+(i+1)+'-'+name+'.jpg',Buffer.from(shot.data,'base64'));await session.detach();
 console.log(name,await page.evaluate(()=>({car:window.CostaLuna.state.vehicle.name,wanted:window.CostaLuna.state.wanted})),statSync('screenshots/'+(i+1)+'-'+name+'.jpg').size);
}
if(only){await browser.close();process.exit(errors.length||external.length?1:0);}
await page.setViewportSize({width:768,height:480});await page.goto('http://127.0.0.1:8080/?shot=chase');await page.waitForFunction(()=>window.CostaLuna?.state.elapsed>.16);const previewSession=await page.context().newCDPSession(page),preview=await previewSession.send('Page.captureScreenshot',{format:'jpeg',quality:90,fromSurface:true});writeFileSync('.capture/cover-768.jpg',Buffer.from(preview.data,'base64'));await previewSession.detach();await page.setViewportSize({width:1280,height:800});
await page.goto('http://127.0.0.1:8080/');await page.waitForTimeout(500);await page.keyboard.press('Enter');await page.keyboard.down('w');await page.waitForTimeout(700);await page.keyboard.up('w');
const driving=await page.evaluate(()=>CostaLuna.state.z);await page.keyboard.press('e');await page.keyboard.down('w');await page.waitForTimeout(350);await page.keyboard.up('w');const walking=await page.evaluate(()=>({onFoot:!CostaLuna.state.inVehicle,z:CostaLuna.state.z}));
await page.keyboard.down('f');await page.waitForTimeout(700);await page.keyboard.up('f');await page.keyboard.press('z');await page.keyboard.press('Escape');
console.log('PLAY CHECK',driving,walking,await page.evaluate(()=>({ammo:CostaLuna.state.ammo[1],smoke:CostaLuna.state.smoke,saved:!!localStorage.getItem('costa-luna-save')})));
await page.keyboard.press('Escape');
await page.evaluate(()=>{const s=CostaLuna.state;s.x=5;s.z=35;s.inVehicle=false;s.condition=40;});await page.keyboard.press('e');
console.log('MOTORCYCLE',await page.evaluate(()=>({riding:CostaLuna.state.inVehicle,kind:CostaLuna.state.vehicle.kind})));
await page.keyboard.down('w');await page.waitForTimeout(700);await page.keyboard.up('w');await page.keyboard.press('x');
console.log('BIKE / CREW',await page.evaluate(()=>({speed:CostaLuna.state.speed,condition:CostaLuna.state.condition,cooldown:CostaLuna.state.crew[1]})));
await page.keyboard.press('m');await page.locator('[data-chapter="1"]').click();
console.log('MISSION',await page.evaluate(()=>({chapter:CostaLuna.state.chapter,stage:CostaLuna.state.stage,active:CostaLuna.state.mission})));
await page.keyboard.press('Escape');console.log('FINAL SAVE',await page.evaluate(()=>JSON.parse(localStorage.getItem('costa-luna-save')).chapter));
console.log('ERRORS',errors,'EXTERNAL',external);await browser.close();if(errors.length||external.length)process.exitCode=1;
