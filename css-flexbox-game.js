(()=>{
  const embedMode=new URLSearchParams(window.location.search).get('embed')==='1';
  if(embedMode)document.body.classList.add('embed-mode');

  const levels=[
    {title:'Centro horizontal',instruction:'Lleva los tres orbes al centro horizontal usando justify-content.',hint:'justify-content controla el eje principal. Prueba center.',solution:'justify-content: center;',expected:{'justify-content':'center'},count:3},
    {title:'Final de la fila',instruction:'Mueve los orbes al extremo derecho del tablero.',hint:'Usa el final del eje principal.',solution:'justify-content: flex-end;',expected:{'justify-content':'flex-end'},count:3},
    {title:'Extremos separados',instruction:'Primer orbe al inicio, último al final y espacio entre ellos.',hint:'Busca el valor que reparte el espacio entre elementos.',solution:'justify-content: space-between;',expected:{'justify-content':'space-between'},count:3},
    {title:'Espacio alrededor',instruction:'Deja espacio alrededor de cada orbe.',hint:'space-around reparte espacio a ambos lados.',solution:'justify-content: space-around;',expected:{'justify-content':'space-around'},count:4},
    {title:'Espacio totalmente uniforme',instruction:'Haz que los espacios antes, entre y después de los orbes sean iguales.',hint:'Existe un valor más uniforme que space-around.',solution:'justify-content: space-evenly;',expected:{'justify-content':'space-evenly'},count:4},
    {title:'Centro vertical',instruction:'Mantén la fila y lleva los orbes al centro vertical.',hint:'align-items controla el eje transversal.',solution:'align-items: center;',expected:{'align-items':'center'},count:3},
    {title:'Aterrizaje inferior',instruction:'Apoya todos los orbes en la parte inferior.',hint:'Usa align-items con el final del eje transversal.',solution:'align-items: flex-end;',expected:{'align-items':'flex-end'},count:4},
    {title:'Cambia el eje',instruction:'Convierte la fila en columna y centra el grupo sobre el eje principal.',hint:'Cambia flex-direction y después piensa qué hace justify-content.',solution:'flex-direction: column;\njustify-content: center;',expected:{'flex-direction':'column','justify-content':'center'},count:4},
    {title:'Fila invertida',instruction:'Invierte el orden visual manteniendo una fila.',hint:'Usa la variante reverse de row.',solution:'flex-direction: row-reverse;',expected:{'flex-direction':'row-reverse'},count:4},
    {title:'Columna invertida',instruction:'Coloca los orbes en columna y con orden invertido.',hint:'Combina column con reverse.',solution:'flex-direction: column-reverse;',expected:{'flex-direction':'column-reverse'},count:4},
    {title:'Salto de línea',instruction:'Hay demasiados orbes para una fila. Permite que salten a nuevas líneas.',hint:'flex-wrap decide si los elementos pueden saltar.',solution:'flex-wrap: wrap;',expected:{'flex-wrap':'wrap'},count:6,pieceSize:'38%'},
    {title:'Wrap invertido',instruction:'Permite varias líneas, pero invierte el sentido transversal de las filas.',hint:'flex-wrap también tiene una variante reverse.',solution:'flex-wrap: wrap-reverse;',expected:{'flex-wrap':'wrap-reverse'},count:6,pieceSize:'38%'},
    {title:'Filas centradas',instruction:'Crea varias líneas y centra el bloque de filas en el eje transversal.',hint:'align-content solo se aprecia cuando hay varias líneas.',solution:'flex-wrap: wrap;\nalign-content: center;',expected:{'flex-wrap':'wrap','align-content':'center'},count:6,pieceSize:'38%'},
    {title:'Separación con gap',instruction:'Mantén cuatro orbes al inicio pero deja exactamente 24px entre ellos.',hint:'gap evita añadir márgenes elemento por elemento.',solution:'gap: 24px;',expected:{'gap':'24px'},count:4},
    {title:'Combinación avanzada',instruction:'Permite wrap, separa columnas 18px y reparte las filas verticalmente.',hint:'Necesitas flex-wrap, gap y align-content.',solution:'flex-wrap: wrap;\ngap: 18px;\nalign-content: space-around;',expected:{'flex-wrap':'wrap','gap':'18px','align-content':'space-around'},count:6,pieceSize:'38%'},
    {title:'Boss final · columna perfecta',instruction:'Forma una columna centrada en ambos ejes con 16px entre cada orbe.',hint:'Combina flex-direction, justify-content, align-items y gap.',solution:'flex-direction: column;\njustify-content: center;\nalign-items: center;\ngap: 16px;',expected:{'flex-direction':'column','justify-content':'center','align-items':'center','gap':'16px'},count:4}
  ];

  const allowed=new Set(['justify-content','align-items','flex-direction','flex-wrap','align-content','gap','row-gap','column-gap']);
  const $=selector=>document.querySelector(selector);
  const player=$('#playerArena');
  const target=$('#targetArena');
  const editor=$('#cssEditor');
  const title=$('#levelTitle');
  const counter=$('#levelCounter');
  const instruction=$('#instruction');
  const feedback=$('#feedback');
  const nextBtn=$('#nextBtn');
  const hintBox=$('#hintBox');
  const solutionBox=$('#solutionBox');
  const levelButtons=$('#levelButtons');
  const score=$('#score');
  const shell=document.querySelector('.arena-shell');
  const storageKey='css-flexbox-arena-progress-v2';

  let state=loadState();
  let current=Math.min(state.current,levels.length-1);

  function loadState(){
    try{
      const saved=JSON.parse(localStorage.getItem(storageKey)||'{}');
      return {current:Number.isInteger(saved.current)?saved.current:0,completed:Array.isArray(saved.completed)?saved.completed:[]};
    }catch{return {current:0,completed:[]}}
  }
  function saveState(){try{localStorage.setItem(storageKey,JSON.stringify({current,completed:state.completed}))}catch{}}
  function maxUnlocked(){let i=0;while(i<levels.length&&state.completed.includes(i))i++;return Math.min(i,levels.length-1)}
  function makeItems(container,count,type){
    container.replaceChildren();
    for(let i=0;i<count;i++){
      const el=document.createElement('div');
      el.className=type;
      el.textContent=String(i+1);
      container.append(el);
    }
  }
  function clearFlexStyles(element){for(const prop of allowed)element.style.removeProperty(prop)}
  function parseDeclarations(text){
    const cleaned=String(text).replace(/\/\*[\s\S]*?\*\//g,'');
    const result=[];
    for(const chunk of cleaned.split(';')){
      const colon=chunk.indexOf(':');
      if(colon<0)continue;
      const prop=chunk.slice(0,colon).trim().toLowerCase();
      const value=chunk.slice(colon+1).trim();
      if(allowed.has(prop)&&value)result.push([prop,value]);
    }
    return result;
  }
  function applyDeclarations(element,text){
    clearFlexStyles(element);
    for(const [prop,value] of parseDeclarations(text))element.style.setProperty(prop,value);
  }
  function applyExpected(element,expected){
    clearFlexStyles(element);
    for(const [prop,value] of Object.entries(expected))element.style.setProperty(prop,value);
  }
  function renderLevel(){
    const level=levels[current];
    title.textContent=level.title;
    counter.textContent='Nivel '+(current+1)+' de '+levels.length;
    instruction.textContent=level.instruction;
    editor.value=Object.keys(level.expected).map(prop=>'/* '+prop+': ...; */').join('\n');
    editor.placeholder=Object.keys(level.expected).map(prop=>prop+': /* completa el valor */;').join('\n');
    const pieceSize=level.pieceSize||'64px';
    player.style.setProperty('--piece-size',pieceSize);
    target.style.setProperty('--piece-size',pieceSize);
    makeItems(player,level.count,'piece');
    makeItems(target,level.count,'target');
    clearFlexStyles(player);
    applyExpected(target,level.expected);
    feedback.className='feedback';
    feedback.textContent='Edita el CSS y observa el tablero en tiempo real.';
    shell.classList.remove('solved');
    nextBtn.disabled=true;
    hintBox.hidden=true;
    solutionBox.hidden=true;
    hintBox.textContent=level.hint;
    solutionBox.textContent=level.solution;
    renderLevelButtons();
    updateScore();
    saveState();
    editor.focus();
  }
  function updateScore(){score.textContent=state.completed.length+'/'+levels.length}
  function renderLevelButtons(){
    levelButtons.replaceChildren();
    const unlocked=maxUnlocked();
    levels.forEach((level,index)=>{
      const button=document.createElement('button');
      button.type='button';
      button.className='level-btn';
      button.textContent=String(index+1);
      button.title='Nivel '+(index+1)+': '+level.title;
      if(index===current)button.classList.add('current');
      if(state.completed.includes(index))button.classList.add('done');
      if(index>unlocked&&!state.completed.includes(index)){button.classList.add('locked');button.disabled=true}
      button.addEventListener('click',()=>{if(!button.disabled){current=index;renderLevel()}});
      levelButtons.append(button);
    });
  }
  function applyEditor(){
    applyDeclarations(player,editor.value);
    shell.classList.remove('solved');
    nextBtn.disabled=true;
    feedback.className='feedback';
    feedback.textContent='Vista actualizada. Pulsa Comprobar o Ctrl + Enter.';
  }
  function normalized(value){return String(value).trim().replace(/\s+/g,' ')}
  function differences(){
    const computed=getComputedStyle(player);
    const missing=[];
    for(const [prop,expected] of Object.entries(levels[current].expected)){
      const actual=normalized(computed.getPropertyValue(prop));
      if(actual!==normalized(expected))missing.push(prop);
    }
    return missing;
  }
  function check(){
    const missing=differences();
    if(!missing.length){
      if(!state.completed.includes(current)){state.completed.push(current);state.completed.sort((a,b)=>a-b)}
      shell.classList.add('solved');
      feedback.className='feedback success';
      feedback.textContent=current===levels.length-1?'¡Boss derrotado! Completaste los 16 niveles de Flexbox Arena.':'¡Correcto! Coincide con el objetivo.';
      nextBtn.disabled=current===levels.length-1;
      updateScore();renderLevelButtons();saveState();
    }else{
      shell.classList.remove('solved');
      feedback.className='feedback error';
      feedback.textContent='Aún falta ajustar: '+missing.join(', ')+'.';
      nextBtn.disabled=true;
    }
  }

  editor.addEventListener('input',applyEditor);
  editor.addEventListener('keydown',event=>{if(event.ctrlKey&&event.key==='Enter'){event.preventDefault();check()}});
  $('#checkBtn').addEventListener('click',check);
  $('#hintBtn').addEventListener('click',()=>{hintBox.hidden=!hintBox.hidden});
  $('#solutionBtn').addEventListener('click',()=>{
    solutionBox.hidden=!solutionBox.hidden;
    if(!solutionBox.hidden)solutionBox.textContent='Solución de referencia: '+levels[current].solution.replace(/\n/g,' ');
  });
  $('#resetLevelBtn').addEventListener('click',()=>{
    editor.value=Object.keys(levels[current].expected).map(prop=>'/* '+prop+': ...; */').join('\n');
    applyEditor();
    feedback.textContent='Nivel limpio. Inténtalo de nuevo.';
    editor.focus();
  });
  nextBtn.addEventListener('click',()=>{if(current<levels.length-1){current++;renderLevel()}});
  $('#resetProgress').addEventListener('click',()=>{
    if(!window.confirm('¿Reiniciar todos los niveles completados de Flexbox Arena?'))return;
    state={current:0,completed:[]};current=0;try{localStorage.removeItem(storageKey)}catch{}renderLevel();
  });

  renderLevel();
})();
