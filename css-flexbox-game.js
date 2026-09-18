(()=>{
  const levels=[
    {
      title:'Centro horizontal',
      instruction:'Lleva los tres orbes al centro horizontal del tablero usando justify-content.',
      hint:'justify-content controla la distribución sobre el eje principal. Prueba con center.',
      solution:'justify-content: center;',
      expected:{'justify-content':'center'},
      count:3
    },
    {
      title:'Al final de la fila',
      instruction:'Mueve los orbes hasta el extremo derecho del tablero.',
      hint:'El valor flex-end coloca el contenido al final del eje principal.',
      solution:'justify-content: flex-end;',
      expected:{'justify-content':'flex-end'},
      count:3
    },
    {
      title:'Extremos separados',
      instruction:'Distribuye los tres orbes para que el primero quede al inicio, el último al final y el espacio quede entre ellos.',
      hint:'Busca un valor de justify-content que reparte el espacio entre los elementos.',
      solution:'justify-content: space-between;',
      expected:{'justify-content':'space-between'},
      count:3
    },
    {
      title:'Espacio alrededor',
      instruction:'Deja espacio alrededor de cada orbe a lo largo de la fila.',
      hint:'space-around reparte espacio a ambos lados de cada elemento.',
      solution:'justify-content: space-around;',
      expected:{'justify-content':'space-around'},
      count:4
    },
    {
      title:'Centro vertical',
      instruction:'Los orbes ya están en una fila. Ahora llévalos al centro vertical del tablero.',
      hint:'align-items trabaja sobre el eje transversal.',
      solution:'align-items: center;',
      expected:{'align-items':'center'},
      count:3
    },
    {
      title:'Aterrizaje inferior',
      instruction:'Haz que todos los orbes se apoyen en la parte inferior del tablero.',
      hint:'Usa align-items con el valor que representa el final del eje transversal.',
      solution:'align-items: flex-end;',
      expected:{'align-items':'flex-end'},
      count:4
    },
    {
      title:'Cambia el eje',
      instruction:'Convierte la fila en una columna y centra el grupo verticalmente.',
      hint:'Primero cambia flex-direction a column. Después recuerda que justify-content sigue el eje principal.',
      solution:'flex-direction: column;\njustify-content: center;',
      expected:{'flex-direction':'column','justify-content':'center'},
      count:4
    },
    {
      title:'Fila invertida',
      instruction:'Invierte el orden visual de los orbes manteniendo una fila.',
      hint:'Existe una variante de row que invierte inicio y final.',
      solution:'flex-direction: row-reverse;',
      expected:{'flex-direction':'row-reverse'},
      count:4
    },
    {
      title:'Columna invertida',
      instruction:'Coloca los orbes en una columna, pero con el orden visual invertido.',
      hint:'Combina column con reverse en flex-direction.',
      solution:'flex-direction: column-reverse;',
      expected:{'flex-direction':'column-reverse'},
      count:4
    },
    {
      title:'Salto de línea',
      instruction:'Hay demasiados orbes para una sola fila. Permite que pasen a nuevas líneas.',
      hint:'flex-wrap decide si los elementos pueden saltar a otra línea.',
      solution:'flex-wrap: wrap;',
      expected:{'flex-wrap':'wrap'},
      count:6,
      pieceSize:'38%'
    },
    {
      title:'Filas repartidas',
      instruction:'Permite varias líneas y reparte esas filas entre la parte superior e inferior del tablero.',
      hint:'align-content solo se aprecia cuando existen varias líneas. Necesitas wrap y después distribuir las líneas.',
      solution:'flex-wrap: wrap;\nalign-content: space-between;',
      expected:{'flex-wrap':'wrap','align-content':'space-between'},
      count:6,
      pieceSize:'38%'
    },
    {
      title:'Boss final · columna centrada',
      instruction:'Coloca los cuatro orbes formando una columna exactamente en el centro del tablero.',
      hint:'Necesitas cambiar el eje principal y centrar en ambos ejes.',
      solution:'flex-direction: column;\njustify-content: center;\nalign-items: center;',
      expected:{'flex-direction':'column','justify-content':'center','align-items':'center'},
      count:4
    }
  ];

  const allowed=new Set([
    'justify-content','align-items','flex-direction','flex-wrap','align-content',
    'gap','row-gap','column-gap'
  ]);
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
  const storageKey='css-flexbox-arena-progress-v1';

  let state=loadState();
  let current=Math.min(state.current,levels.length-1);

  function loadState(){
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

  function saveState(){
    localStorage.setItem(storageKey,JSON.stringify({current,completed:state.completed}));
  }

  function maxUnlocked(){
    if(!state.completed.length)return 0;
    let i=0;
    while(i<levels.length&&state.completed.includes(i))i++;
    return Math.min(i,levels.length-1);
  }

  function makeItems(container,count,type){
    container.replaceChildren();
    for(let i=0;i<count;i++){
      const el=document.createElement('div');
      el.className=type;
      el.textContent=String(i+1);
      container.append(el);
    }
  }

  function clearFlexStyles(element){
    for(const prop of allowed)element.style.removeProperty(prop);
  }

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
    for(const [prop,value] of parseDeclarations(text)){
      element.style.setProperty(prop,value);
    }
  }

  function applyExpected(element,expected){
    clearFlexStyles(element);
    for(const [prop,value] of Object.entries(expected)){
      element.style.setProperty(prop,value);
    }
  }

  function renderLevel(){
    const level=levels[current];
    title.textContent=level.title;
    counter.textContent=`Nivel ${current+1} de ${levels.length}`;
    instruction.textContent=level.instruction;
    editor.value='';
    editor.placeholder=current===0?'justify-content: ...;':'Escribe aquí las propiedades...';

    const pieceSize=level.pieceSize||'64px';
    player.style.setProperty('--piece-size',pieceSize);
    target.style.setProperty('--piece-size',pieceSize);
    makeItems(player,level.count,'piece');
    makeItems(target,level.count,'target');
    clearFlexStyles(player);
    applyExpected(target,level.expected);

    feedback.className='feedback';
    feedback.textContent='Escribe CSS y observa cómo se mueven los orbes.';
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

  function updateScore(){
    score.textContent=`${state.completed.length}/${levels.length}`;
  }

  function renderLevelButtons(){
    levelButtons.replaceChildren();
    const unlocked=maxUnlocked();
    levels.forEach((level,index)=>{
      const button=document.createElement('button');
      button.type='button';
      button.className='level-btn';
      button.textContent=String(index+1);
      button.title=`Nivel ${index+1}: ${level.title}`;
      if(index===current)button.classList.add('current');
      if(state.completed.includes(index))button.classList.add('done');
      if(index>unlocked&&!state.completed.includes(index)){
        button.classList.add('locked');
        button.disabled=true;
      }
      button.addEventListener('click',()=>{
        if(button.disabled)return;
        current=index;
        renderLevel();
      });
      levelButtons.append(button);
    });
  }

  function applyEditor(){
    applyDeclarations(player,editor.value);
    shell.classList.remove('solved');
    nextBtn.disabled=true;
    feedback.className='feedback';
    feedback.textContent='Vista actualizada. Pulsa Comprobar cuando creas que coincide.';
  }

  function normalized(value){
    return String(value).trim().replace(/\s+/g,' ');
  }

  function solved(){
    const computed=getComputedStyle(player);
    return Object.entries(levels[current].expected).every(([prop,expected])=>{
      return normalized(computed.getPropertyValue(prop))===normalized(expected);
    });
  }

  function check(){
    if(solved()){
      if(!state.completed.includes(current)){
        state.completed.push(current);
        state.completed.sort((a,b)=>a-b);
      }
      shell.classList.add('solved');
      feedback.className='feedback success';
      feedback.textContent=current===levels.length-1
        ? '¡Boss derrotado! Completaste Flexbox Arena.'
        : '¡Correcto! Los orbes coinciden con sus objetivos.';
      nextBtn.disabled=current===levels.length-1;
      updateScore();
      renderLevelButtons();
      saveState();
    }else{
      shell.classList.remove('solved');
      feedback.className='feedback error';
      feedback.textContent='Aún no coincide. Revisa la propiedad, el valor y el eje sobre el que estás trabajando.';
      nextBtn.disabled=true;
    }
  }

  editor.addEventListener('input',applyEditor);
  $('#checkBtn').addEventListener('click',check);
  $('#hintBtn').addEventListener('click',()=>{hintBox.hidden=!hintBox.hidden;});
  $('#solutionBtn').addEventListener('click',()=>{
    solutionBox.hidden=!solutionBox.hidden;
    if(!solutionBox.hidden)solutionBox.textContent=`Solución de referencia: ${levels[current].solution.replace(/\n/g,' ')}`;
  });
  nextBtn.addEventListener('click',()=>{
    if(current<levels.length-1){
      current++;
      renderLevel();
    }
  });
  $('#resetProgress').addEventListener('click',()=>{
    const ok=window.confirm('¿Reiniciar todos los niveles completados de Flexbox Arena?');
    if(!ok)return;
    state={current:0,completed:[]};
    current=0;
    localStorage.removeItem(storageKey);
    renderLevel();
  });

  renderLevel();
})();