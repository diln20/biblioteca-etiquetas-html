const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const source=fs.readFileSync('css-arcade-game.js','utf8').replace(
  /  renderLevel\(\);\s*\}\)\(\);\s*$/,
  '  globalThis.test={games,load,propValue,differences,renderLevel,renderPlayer,check,get current(){return current},get state(){return state}};})();'
);

// A small DOM double tests validation and event ordering, not browser layout.
function styleDocument(values){
  return {querySelectorAll:()=>values,defaultView:{getComputedStyle:el=>({getPropertyValue:prop=>el[prop]||''})}};
}
function harness(game='grid',saved='{}'){
  const nodes=new Map(),frames=[],pending=[];
  function element(){
    const listeners=new Map();
    return {style:{},classList:{add(){},contains(){return false}},parentElement:{clientWidth:800,clientHeight:320},value:'',disabled:false,
      addEventListener(type,fn){if(!listeners.has(type))listeners.set(type,new Set());listeners.get(type).add(fn)},
      removeEventListener(type,fn){listeners.get(type)?.delete(fn)},
      setAttribute(){},append(){},replaceChildren(){},focus(){},remove(){this.removed=true},
      set srcdoc(value){this.source=value;pending.push(()=>{for(const fn of [...(listeners.get('load')||[])])fn()})},
      contentDocument:styleDocument([{}])};
  }
  const document={documentElement:element(),querySelector(id){if(!nodes.has(id))nodes.set(id,element());return nodes.get(id)},
    createElement(tag){const el=element();if(tag==='iframe')frames.push(el);return el},body:{classList:{add(){}},append(){}}};
  const context={URLSearchParams,location:{search:'?game='+game},document,ResizeObserver:class{observe(){}},MutationObserver:class{observe(){}},
    localStorage:{getItem:()=>saved,setItem(){},removeItem(){}},setTimeout:()=>1,clearTimeout(){},confirm:()=>true};
  context.window=context;
  vm.createContext(context);
  for(const file of ['css-guided-challenges.js','css-guided-game-levels.js'])vm.runInContext(fs.readFileSync(file,'utf8'),context);
  vm.runInContext(source,context);
  return {api:context.test,challenges:context.CSS_GUIDED_CHALLENGES,nodes,frames,flush(){while(pending.length)pending.shift()()}};
}

(async()=>{
  const h=harness('grid',JSON.stringify({current:-5,completed:[0,0,-1,99,'2']}));
  assert.equal(h.api.current,0,'negative saved level must not crash rendering');
  assert.deepEqual(Array.from(h.api.state.completed),[0],'sanitize saved progress');
  const level={checks:[['.item',['width']]]};
  const target=styleDocument([{width:'70px'},{width:'70px'}]);
  assert.equal(h.api.differences(level,target,target).length,0);
  assert.equal(h.api.differences(level,target,styleDocument([{width:'70px'},{width:'90px'}])).length,1,
    'a wrong second item must fail even when the first item is correct');
  const selectors=harness('selectors');
  assert.equal(selectors.api.differences({checks:[['.featured',['color']]]},
    styleDocument([{color:'green'},{color:'black'},{color:'black'}]),
    styleDocument([{color:'green'},{color:'black'},{color:'green'}])).length,1,
    'selector exercises must catch unintended changes to the third card');

  h.api.renderLevel();h.flush();
  h.nodes.get('#nextBtn').disabled=false;
  h.api.renderPlayer();
  assert.equal(h.nodes.get('#nextBtn').disabled,true,'editing invalidates a previous success');
  const before=h.api.state.completed.length;
  const stale=h.api.check();
  h.api.renderPlayer();h.flush();await stale;
  assert.equal(h.api.state.completed.length,before,'an old check cannot award changed code');
  assert.equal(h.nodes.get('#nextBtn').disabled,true);

  const responsive=harness('responsive');responsive.api.renderLevel();responsive.flush();
  const checking=responsive.api.check();responsive.flush();
  await Promise.resolve();await Promise.resolve();
  assert.equal(responsive.frames.length,2,'responsive checks create a second pair of previews');
  assert.ok(responsive.frames.every(frame=>frame.style.cssText.includes('width:800px')));
  responsive.frames[0].contentDocument=styleDocument([{'max-width':'100%',height:'200px'}]);
  responsive.frames[1].contentDocument=styleDocument([{'max-width':'100%',height:'100px'}]);
  responsive.flush();await checking;
  assert.equal(responsive.api.state.completed.length,0,'a failure at the second width must block success');
  assert.ok(responsive.frames.every(frame=>frame.removed),'temporary previews must be removed');
  assert.match(responsive.nodes.get('#feedback').textContent,/800px/);
  for(let index=0;index<34;index++){
    const guided=harness('guided&level='+index);
    assert.equal(guided.api.current,index,'each card must open its own mission');
    guided.api.renderLevel();guided.flush();
    const starter=guided.nodes.get('#cssEditor').value;
    const solution=guided.nodes.get('#solutionBox').textContent;
    assert.notEqual(starter,solution,'no guided level starts solved');
    assert.ok(starter.includes('/* Completa aquí: '),'the editor must indicate the missing CSS');
    const mission=guided.challenges[index][7]?.mission;
    if(mission)assert.equal((starter.match(/Completa aquí/g)||[]).length,mission[1].length,'every requested declaration must be absent from the starter');
    assert.match(starter,/\/\* Completa aquí: [\w-]+: \.\.\. \*\//,'each blank names the property, not its value');
    assert.ok(guided.nodes.get('#cssEditor').placeholder.includes('/* completa el valor */'));
    assert.ok(guided.nodes.get('#editorClue').textContent.startsWith('Propiedades del reto: '));
    for(const id of ['#whyText','#mistakeText','#verifyText','#extraText'])assert.ok(guided.nodes.get(id).textContent.length>30,'each mission needs a concrete explanation: '+id);
    assert.equal(guided.nodes.get('#learningGuide').hidden,false);
    assert.ok(guided.nodes.get('#htmlSource').textContent.includes('<'),'show the HTML for this level');
    assert.ok(!guided.nodes.get('#targetFrame').source.includes('css-game-stage'),'no shrink-to-content stage');
  }
  const button=harness('guided&level=12');
  const ruleDoc=(background)=>({styleSheets:[{cssRules:[{selectorText:'.boton-mision:hover',style:{getPropertyValue:()=>background}}]}]});
  assert.equal(button.api.differences({checks:[],ruleChecks:[['.boton-mision:hover',['background-color']]]},
    ruleDoc('rgb(109, 40, 217)'),ruleDoc('rgb(255, 0, 0)')).length,1,'hover validation must catch a wrong declaration without requiring pointer placement');
  let arcadeLevels=0;
  for(const [key,game] of Object.entries(h.api.games)){
    game.levels.forEach((level,current)=>{
      const instance=harness(key,JSON.stringify({current}));
      instance.api.renderLevel();instance.flush();
      const value=instance.nodes.get('#cssEditor').value;
      for(const [,properties] of level.checks)for(const property of properties){
        assert.ok(value.includes(property+': ...;'),key+' '+current+' needs an inline property clue');
      }
      const withoutComments=css=>css.replace(/\/\*[\s\S]*?\*\//g,'').trim();
      assert.equal(withoutComments(value),withoutComments(level.starter),'hints must not change the starting CSS');
      arcadeLevels++;
    });
  }
  assert.equal(arcadeLevels,60);
  console.log({inlineHints:true,arcadeLevels,guidedLevels:34});
  console.log({status:'ok',allMatchedElements:true,selectorSideEffects:true,staleChecksIgnored:true,responsiveSecondWidth:true});
})().catch(error=>{console.error(error);process.exitCode=1});
