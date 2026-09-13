import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';

const root=process.cwd();
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp'};
const server=http.createServer((req,res)=>{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const requested=pathname==='/'?'/index.html':pathname;
  const file=path.resolve(root,'.'+requested);
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end('forbidden');return;}
  fs.readFile(file,(error,data)=>{
    if(error){res.writeHead(404).end('not found: '+requested);return;}
    res.writeHead(200,{'content-type':mime[path.extname(file)]||'application/octet-stream','cache-control':'no-store'});
    res.end(data);
  });
});
await new Promise(resolve=>server.listen(4173,'127.0.0.1',resolve));

const candidates=['google-chrome','google-chrome-stable','chromium','chromium-browser'];
const chromePath=candidates.find(candidate=>spawnSync('which',[candidate],{encoding:'utf8'}).status===0);
if(!chromePath)throw new Error('No se encontró Chrome/Chromium en el runner');
console.log('chrome:',chromePath);

const chrome=spawn(chromePath,[
  '--headless=new','--no-sandbox','--disable-gpu','--disable-dev-shm-usage',
  '--remote-debugging-port=9222','--remote-allow-origins=*',
  '--user-data-dir=/tmp/biblioteca-chrome','about:blank'
],{stdio:['ignore','pipe','pipe']});
chrome.stderr.on('data',chunk=>process.stderr.write('[chrome] '+chunk));

const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));
let tabs;
for(let attempt=0;attempt<50;attempt++){
  try{
    tabs=await fetch('http://127.0.0.1:9222/json/list').then(response=>response.json());
    if(tabs?.[0]?.webSocketDebuggerUrl)break;
  }catch{}
  await sleep(200);
}
if(!tabs?.[0]?.webSocketDebuggerUrl)throw new Error('Chrome DevTools Protocol no respondió');

const socket=new WebSocket(tabs[0].webSocketDebuggerUrl);
await new Promise((resolve,reject)=>{socket.addEventListener('open',resolve,{once:true});socket.addEventListener('error',reject,{once:true});});
let id=0;
const pending=new Map();
const events=[];
socket.addEventListener('message',event=>{
  const message=JSON.parse(event.data);
  if(message.id){
    const waiter=pending.get(message.id);
    if(waiter){pending.delete(message.id);message.error?waiter.reject(new Error(JSON.stringify(message.error))):waiter.resolve(message.result);}
    return;
  }
  events.push(message);
  if(message.method==='Runtime.exceptionThrown'){
    const detail=message.params.exceptionDetails;
    console.log('BROWSER_EXCEPTION',JSON.stringify({text:detail.text,line:detail.lineNumber,column:detail.columnNumber,url:detail.url,description:detail.exception?.description},null,2));
  }
  if(message.method==='Runtime.consoleAPICalled'){
    console.log('BROWSER_CONSOLE',message.params.type,message.params.args.map(arg=>arg.value??arg.description).join(' '));
  }
  if(message.method==='Log.entryAdded')console.log('BROWSER_LOG',JSON.stringify(message.params.entry));
});
const send=(method,params={})=>new Promise((resolve,reject)=>{
  const messageId=++id;
  pending.set(messageId,{resolve,reject});
  socket.send(JSON.stringify({id:messageId,method,params}));
});
await send('Runtime.enable');
await send('Page.enable');
await send('Log.enable');
await send('Network.enable');
await send('Page.navigate',{url:'http://127.0.0.1:4173/index.html?runtime-diagnose=1'});
await sleep(8000);

const evaluate=async(expression)=>{
  const result=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});
  return result.result?.value??result.result?.description;
};
const checks={
  readyState:'document.readyState',
  title:'document.title',
  sections:'typeof sections!=="undefined"?sections.length:null',
  navChildren:'document.querySelector("#categoryNav")?.children.length',
  visibleCards:'document.querySelectorAll(".tag-card").length',
  mainText:'document.querySelector("main")?.innerText.slice(0,1200)',
  sidebarText:'document.querySelector(".sidebar")?.innerText.slice(0,1200)',
  flags:'Object.keys(window).filter(key=>key.startsWith("__angular")||key.startsWith("__course")||key.startsWith("__exact")||key.startsWith("__section")).sort()',
  scripts:'Array.from(document.scripts).map(script=>script.src||"[inline]")',
  resources:'performance.getEntriesByType("resource").map(entry=>({name:entry.name,duration:entry.duration,transferSize:entry.transferSize}))'
};
for(const [name,expression] of Object.entries(checks)){
  try{console.log('CHECK',name,JSON.stringify(await evaluate(expression),null,2));}
  catch(error){console.log('CHECK_ERROR',name,error.message);}
}
const screenshot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});
fs.writeFileSync('runtime-diagnose.png',Buffer.from(screenshot.data,'base64'));

socket.close();
chrome.kill('SIGTERM');
server.close();
await sleep(500);
