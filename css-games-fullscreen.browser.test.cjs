// Requires Chrome and playwright-core (or PLAYWRIGHT_CORE_PATH pointing to it).
// Run: node css-games-fullscreen.browser.test.cjs
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const http=require('node:http');
const os=require('node:os');
const {chromium}=require(process.env.PLAYWRIGHT_CORE_PATH||'playwright-core');
const root=__dirname;
const server=http.createServer((req,res)=>{
  const file=path.resolve(root,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname.replace(/\/$/,'/index.html')));
  if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return}
  fs.readFile(file,(error,body)=>{
    if(error){res.writeHead(404).end();return}
    const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.jpg':'image/jpeg'};
    res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
    res.end(body);
  });
});

(async()=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const browser=await chromium.launch({channel:'chrome',headless:true});
  try{
    const page=await browser.newPage({viewport:{width:1920,height:1080}});
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto('http://127.0.0.1:'+server.address().port);
    await page.waitForFunction(()=>window.__cssInteractiveGameCardUi===true);
    await page.locator('#categoryNav button').filter({hasText:'Juegos CSS'}).click();
    const cards=page.locator('.css-interactive-game-card');
    assert.equal(await cards.count(),41);
    assert.equal(await cards.locator('iframe[srcdoc]').count(),0,'games must not be wrapped in a second iframe document');
    assert.equal(await cards.locator('iframe[sandbox]').count(),0,'trusted game pages need their own origin for validation and saving');

    async function exercise(index,css){
      const card=cards.nth(index),game=card.frameLocator('iframe'),button=card.locator('.css-game-screen-button');
      await card.scrollIntoViewIfNeeded();
      await game.locator('#cssEditor').waitFor();
      const placeholder=await game.locator('#cssEditor').getAttribute('placeholder');
      assert.ok(placeholder.includes(': /* completa el valor */;'),'every editor suggests a property without revealing the value');
      if(index===0)assert.equal(placeholder,'justify-content: /* completa el valor */;');
      await game.locator('#cssEditor').fill(css);
      await button.click();
      await page.waitForFunction(()=>!!document.fullscreenElement);
      await game.locator('html.game-fullscreen').waitFor();
      const size=await card.locator('.preview-panel').evaluate(panel=>{
        const frame=panel.querySelector('iframe').getBoundingClientRect();
        return {bottom:frame.bottom,height:innerHeight,overflow:panel.scrollHeight-panel.clientHeight};
      });
      assert.ok(Math.abs(size.bottom-size.height)<=1,'game must reach the bottom without a white strip');
      assert.ok(size.overflow<=1,'the outer panel must not scroll');
      assert.equal(await game.locator('#cssEditor').inputValue(),css);
      await game.locator('#checkBtn').click();
      await game.locator('#feedback.success').waitFor();
      assert.equal(await game.locator('#nextBtn').isEnabled(),index!==40,'only the final mission has no next level');
      return {card,game,button,css,nextEnabled:index!==40};
    }
    async function leave({game,button,css,nextEnabled}){
      await button.click();
      await page.waitForFunction(()=>!document.fullscreenElement);
      assert.equal(await game.locator('html.game-fullscreen').count(),0);
      assert.equal(await game.locator('#cssEditor').inputValue(),css,'leaving fullscreen preserves the editor');
      assert.equal(await game.locator('#nextBtn').isEnabled(),nextEnabled,'completion remains intact');
    }

    const flex=await exercise(0,'justify-content: center;');
    for(const size of [{width:1920,height:1080},{width:1366,height:768}]){
      await page.setViewportSize(size);
      const visible=await flex.game.locator('.levels').evaluate(el=>el.getBoundingClientRect().bottom<=innerHeight);
      assert.ok(visible,'level navigation stays visible on desktop');
      await page.screenshot({path:path.join(os.tmpdir(),'css-fullscreen-flex-'+size.width+'.png')});
    }
    await leave(flex);
    // Same mounted game survives another cycle and browser-initiated exit.
    await flex.button.click();
    await flex.game.locator('html.game-fullscreen').waitFor();
    await page.evaluate(()=>document.exitFullscreen());
    await page.waitForFunction(()=>!document.fullscreenElement);
    assert.equal(await flex.game.locator('#cssEditor').inputValue(),flex.css);
    assert.equal(await flex.button.getAttribute('aria-pressed'),'false');

    await page.setViewportSize({width:1920,height:1080});
    await leave(await exercise(1,'.board{display:grid;grid-template-columns:repeat(3,1fr)}'));
    const responsiveCard=cards.nth(6);
    await responsiveCard.scrollIntoViewIfNeeded();
    await leave(await exercise(6,'.hero{max-width:100%;height:auto}'));

    const profile=cards.last(),profileGame=profile.frameLocator('iframe');
    await profile.scrollIntoViewIfNeeded();
    await profileGame.locator('#solutionBtn').click();
    const solution=await profileGame.locator('#solutionBox').textContent();
    const expanded=await exercise(40,solution);
    const previewSize=await expanded.game.locator('#targetFrame').evaluate(frame=>({
      viewport:frame.contentWindow.innerWidth,width:frame.getBoundingClientRect().width,available:frame.parentElement.clientWidth
    }));
    assert.equal(previewSize.viewport,800,'scaling must preserve the viewport used by media queries');
    assert.ok(previewSize.width<=previewSize.available+1,'the entire reference preview must fit');
    await page.screenshot({path:path.join(os.tmpdir(),'css-fullscreen-profile.png')});
    await page.setViewportSize({width:390,height:844});
    const mobile=await expanded.game.locator('html').evaluate(el=>({width:el.clientWidth,scroll:el.scrollWidth}));
    assert.ok(mobile.scroll<=mobile.width+1,'small screens must not overflow horizontally');
    const mobilePreview=await expanded.game.locator('#targetFrame').evaluate(frame=>({viewport:frame.contentWindow.innerWidth,width:frame.getBoundingClientRect().width,available:frame.parentElement.clientWidth}));
    assert.equal(mobilePreview.viewport,800,'a small device must not alter the simulated desktop viewport');
    assert.ok(mobilePreview.width<=mobilePreview.available+1);
    await expanded.game.locator('#cssEditor').scrollIntoViewIfNeeded();
    await page.screenshot({path:path.join(os.tmpdir(),'css-fullscreen-mobile.png')});
    await leave(expanded);
    assert.deepEqual(errors,[],'no runtime errors in the library or game frames');
    console.log({status:'ok',directGames:41,fullscreen:['Flexbox','Grid','Responsive','Profile'],desktopSizes:2,mobile:true,statePreserved:true,screenshots:os.tmpdir()});
  }finally{await browser.close()}
})().catch(error=>{console.error(error);process.exitCode=1}).finally(()=>server.close());
