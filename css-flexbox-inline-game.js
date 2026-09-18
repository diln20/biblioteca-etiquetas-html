(()=>{
  if(window.__flexboxInlineGameLoaded)return;
  window.__flexboxInlineGameLoaded=true;

  const levels=[
    {title:'Centro horizontal',instruction:'Lleva los tres orbes al centro horizontal usando justify-content.',hint:'El eje principal es horizontal. Prueba con center.',solution:'justify-content: center;',expected:{'justify-content':'center'},count:3},
    {title:'Final de la fila',instruction:'Mueve los orbes al extremo derecho del tablero.',hint:'Usa el final del eje principal.',solution:'justify-content: flex-end;',expected:{'justify-content':'flex-end'},count:3},
    {title:'Espacio entre ellos',instruction:'Deja el primer orbe al inicio, el último al final y reparte el espacio entre ellos.',hint:'Existe un valor de justify-content llamado space-between.',solution:'justify-content: space-between;',expected:{'justify-content':'space-between'},count:3},
    {title:'Espacio alrededor',instruction:'Distribuye espacio alrededor de cada orbe.',hint:'Prueba con space-around.',solution:'justify-content: space-around;',expected:{'justify-content':'space-around'},count:4},
    {title:'Centro vertical',instruction:'Lleva los orbes al centro vertical del tablero.',hint:'Para el eje transversal utiliza align-items.',solution:'align-items: center;',expected:{'align-items':'center'},count:3},
    {title:'Parte inferior',instruction:'Apoya todos los orbes en la parte inferior.',hint:'Usa align-items y el final del eje transversal.',solution:'align-items: flex-end;',expected:{'align-items':'flex-end'},count:4},
    {title:'Cambia a columna',instruction:'Convierte la fila en columna y centra el grupo sobre su eje principal.',hint:'Necesitas flex-direction y justify-content.',solution:'flex-direction: column;\njustify-content: center;',expected:{'flex-direction':'column','justify-content':'center'},count:4},
    {title:'Fila invertida',instruction:'Invierte el orden visual de los orbes manteniendo una fila.',hint:'Busca la variante reverse de row.',solution:'flex-direction: row-reverse;',expected:{'flex-direction':'row-reverse'},count:4},
    {title:'Columna invertida',instruction:'Coloca los orbes en columna con el orden invertido.',hint:'Combina column con reverse.',solution:'flex-direction: column-reverse;',expected:{'flex-direction':'column-reverse'},count:4},
    {title:'Salto de línea',instruction:'Permite que seis orbes pasen a una nueva línea.',hint:'flex-wrap controla si los elementos pueden saltar de línea.',solution:'flex-wrap: wrap;',expected:{'flex-wrap':'wrap'},count:6,pieceSize:'38%'},
    {title:'Filas repartidas',instruction:'Crea varias líneas y repártelas entre arriba y abajo.',hint:'Necesitas wrap y align-content.',solution:'flex-wrap: wrap;\nalign-content: space-between;',expected:{'flex-wrap':'wrap','align-content':'space-between'},count:6,pieceSize:'38%'},
    {title:'Boss final',instruction:'Forma una columna exactamente centrada en ambos ejes.',hint:'Combina flex-direction, justify-content y align-items.',solution:'flex-direction: column;\njustify-content: center;\nalign-items: center;',expected:{'flex-direction':'column','justify-content':'center','align-items':'center'},count:4}
  ];

  const allowed=new Set(['justify-content','align-items','flex-direction','flex-wrap','align-content','gap','row-gap','column-gap']);
  const storageKey='css-flexbox-inline-progress-v1';

  function parse(text){
    const out=[];
    for(const part of String(text).replace(/\/\*[\s\S]*?\*\//g,'').split(';')){
      const i=part.indexOf(':');
      if(i<0)continue;
      const prop=part.slice(0,i).trim().toLowerCase();
      const value=part.slice(i+1).trim();
      if(allowed.has(prop)&&value)out.push([prop,value]);
    }
    return out;
  }

  function clearStyles(el){
    for(const prop of allowed)el.style.removeProperty(prop);
  }

  function apply(el,declarations){
    clearStyles(el);
    for(const [prop,value] of declarations)el.style.setProperty(prop,value);
  }

  function applyExpected(el,expected){
    apply(el,Object.entries(expected));
  }

  function loadProgress(){
    try{
      const saved=JSON.parse(localStorage.getItem(storageKey)||'{}');
      return {
        current:Number.isInteger(saved.current)?saved.current:0,
        completed:Array.isArray(saved.completed)?saved.completed:[]
      };
    }catch{
      return {current:0,completed:[]};
    }
  }

  function saveProgress(state){
    try{
      localStorage.setItem(storageKey,JSON.stringify(state));
    }catch{}
  }

  function maxUnlocked(completed){
    let i=0;
    while(i<levels.length&&completed.includes(i))i++;
    return Math.min(i,levels.length-1);
  }

  function makePieces(container,count,className){
    container.replaceChildren();
    for(let i=0;i<count;i++){
      const piece=document.createElement('span');
      piece.className=className;
      piece.textContent=String(i+1);
      container.append(piece);
    }
  }

  function normalized(value){
    return String(value).trim().replace(/\s+/g,' ');
  }

  function init(root){
    if(root.dataset.flexboxReady==='true')return;
    root.dataset.flexboxReady='true';

    const q=selector=>root.querySelector(selector);
    const player=q('.fx-inline-player');
    const target=q('.fx-inline-target');
    const editor=q('.fx-inline-editor');
    const title=q('.fx-inline-title');
    const counter=q('.fx-inline-counter');
    const instruction=q('.fx-inline-instruction');
    const status=q('.fx-inline-status');
    const hint=q('.fx-inline-hint');
    const solution=q('.fx-inline-solution');
    const levelsBox=q('.fx-inline-levels');
    const next=q('[data-action="next"]');
    const score=q('.fx-inline-score');

    let progress=loadProgress();
    let current=Math.max(0,Math.min(progress.current,levels.length-1));

    function renderButtons(){
      levelsBox.replaceChildren();
      const unlocked=maxUnlocked(progress.completed);
      levels.forEach((level,index)=>{
        const button=document.createElement('button');
        button.type='button';
        button.className='fx-inline-level';
        button.textContent=String(index+1);
        button.title='Nivel '+(index+1)+': '+level.title;
        if(index===current)button.classList.add('is-current');
        if(progress.completed.includes(index))button.classList.add('is-done');
        if(index>unlocked&&!progress.completed.includes(index)){
          button.disabled=true;
          button.classList.add('is-locked');
        }
        button.addEventListener('click',()=>{
          if(button.disabled)return;
          current=index;
          renderLevel();
        });
        levelsBox.append(button);
      });
    }

    function renderLevel(){
      const level=levels[current];
      progress.current=current;
      saveProgress(progress);
      root.classList.remove('is-solved');
      title.textContent=level.title;
      counter.textContent='Nivel '+(current+1)+' de '+levels.length;
      instruction.textContent=level.instruction;
      score.textContent=progress.completed.length+'/'+levels.length;
      editor.value='';
      editor.placeholder=current===0?'justify-content: center;':'Escribe las propiedades CSS aquí...';
      player.style.setProperty('--fx-piece-size',level.pieceSize||'58px');
      target.style.setProperty('--fx-piece-size',level.pieceSize||'58px');
      makePieces(player,level.count,'fx-inline-piece');
      makePieces(target,level.count,'fx-inline-target-piece');
      clearStyles(player);
      applyExpected(target,level.expected);
      status.className='fx-inline-status';
      status.textContent='Edita el CSS y mira el resultado en tiempo real.';
      hint.hidden=true;
      solution.hidden=true;
      hint.textContent=level.hint;
      solution.textContent='Solución: '+level.solution.replace(/\n/g,' ');
      next.disabled=true;
      renderButtons();
    }

    function applyEditor(){
      apply(player,parse(editor.value));
      root.classList.remove('is-solved');
      next.disabled=true;
      status.className='fx-inline-status';
      status.textContent='Cambios aplicados. Pulsa Comprobar cuando coincida con el objetivo.';
    }

    function isSolved(){
      const computed=getComputedStyle(player);
      return Object.entries(levels[current].expected).every(([prop,value])=>
        normalized(computed.getPropertyValue(prop))===normalized(value)
      );
    }

    function check(){
      if(isSolved()){
        if(!progress.completed.includes(current)){
          progress.completed.push(current);
          progress.completed.sort((a,b)=>a-b);
        }
        root.classList.add('is-solved');
        score.textContent=progress.completed.length+'/'+levels.length;
        status.className='fx-inline-status is-success';
        status.textContent=current===levels.length-1
          ? '¡Boss derrotado! Completaste Flexbox Arena.'
          : '¡Correcto! Ya puedes pasar al siguiente nivel.';
        next.disabled=current===levels.length-1;
        saveProgress(progress);
        renderButtons();
      }else{
        root.classList.remove('is-solved');
        status.className='fx-inline-status is-error';
        status.textContent='Todavía no coincide. Revisa propiedad, valor y eje.';
        next.disabled=true;
      }
    }

    editor.addEventListener('input',applyEditor);
    editor.addEventListener('keydown',event=>{
      if(event.ctrlKey&&event.key==='Enter'){
        event.preventDefault();
        check();
      }
    });
    q('[data-action="check"]').addEventListener('click',check);
    q('[data-action="hint"]').addEventListener('click',()=>{hint.hidden=!hint.hidden;});
    q('[data-action="solution"]').addEventListener('click',()=>{solution.hidden=!solution.hidden;});
    q('[data-action="next"]').addEventListener('click',()=>{
      if(current<levels.length-1){
        current++;
        renderLevel();
        editor.focus();
      }
    });
    q('[data-action="reset"]').addEventListener('click',()=>{
      progress={current:0,completed:[]};
      current=0;
      try{localStorage.removeItem(storageKey);}catch{}
      renderLevel();
      editor.focus();
    });

    renderLevel();
  }

  function scan(node=document){
    if(node.nodeType!==1&&node!==document)return;
    if(node.matches?.('[data-flexbox-inline-game]'))init(node);
    node.querySelectorAll?.('[data-flexbox-inline-game]').forEach(init);
  }

  scan(document);
  const observer=new MutationObserver(records=>{
    for(const record of records){
      for(const node of record.addedNodes)scan(node);
    }
  });
  observer.observe(document.documentElement,{childList:true,subtree:true});
})();