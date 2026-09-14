(()=>{
  if(window.__htmlInputAttributeExplanationsAdded)return;
  window.__htmlInputAttributeExplanationsAdded=true;
  if(!Array.isArray(window.sections)||typeof window.createCard!=='function')return;

  const targetSections=new Set(
    window.sections.filter(section=>String(section?.title||'')==='HTML · Formularios · Tipos de input')
  );
  const inputItems=new Set([...targetSections].flatMap(section=>section.items||[]));
  if(!inputItems.size)return;

  const escapeHtml=value=>String(value??'')
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#039;');

  const parseAttributes=code=>{
    const found=new Map();
    const tagRx=/<([a-z][\w-]*)(\s[^<>]*?)?>/gi;
    let tagMatch;
    while((tagMatch=tagRx.exec(String(code||'')))){
      const tag=tagMatch[1].toLowerCase();
      const source=tagMatch[2]||'';
      const attrRx=/\b([a-zA-Z_:][\w:.-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
      let attrMatch;
      while((attrMatch=attrRx.exec(source))){
        const name=attrMatch[1].toLowerCase();
        const value=attrMatch[2]??attrMatch[3]??attrMatch[4]??null;
        if(!found.has(name))found.set(name,{name,values:[],tags:new Set(),samples:[]});
        const entry=found.get(name);
        entry.tags.add(tag);
        if(value!==null&&!entry.values.includes(value))entry.values.push(value);
        const sample=value===null?name:`${name}="${value}"`;
        if(!entry.samples.includes(sample))entry.samples.push(sample);
      }
    }
    return [...found.values()].map(entry=>({...entry,tags:[...entry.tags]}));
  };

  const baseDescriptions={
    for:'En un <label>, conecta el texto visible con el control cuyo id tenga exactamente el mismo valor. Al hacer clic en el label, el navegador enfoca o activa ese control.',
    id:'Identificador único del elemento dentro del documento. Sirve para relacionarlo con <label for>, seleccionarlo desde JavaScript o CSS y crear enlaces internos.',
    name:'Nombre con el que este dato se envía al servidor. En un formulario, el servidor recibe pares del tipo name=valor. En radio, compartir el mismo name forma un grupo de una sola elección.',
    type:'Define qué clase de control crea <input> y qué tipo de dato espera. Puede cambiar la interfaz, el teclado móvil y la validación nativa.',
    value:'Valor inicial del control o valor que se enviará al servidor. En checkbox y radio, se envía cuando la opción está seleccionada.',
    placeholder:'Muestra una pista temporal dentro del campo mientras está vacío. No sustituye al <label>, porque desaparece cuando el usuario escribe.',
    autocomplete:'Indica al navegador qué clase de dato puede autocompletar. Valores como email, name, tel o current-password ayudan a completar formularios de forma más rápida.',
    required:'Atributo booleano. Impide que el formulario se envíe si el control obligatorio no contiene un valor válido o, en ciertos controles, no está seleccionado.',
    inputmode:'Sugiere qué teclado virtual conviene mostrar en móviles. No cambia el tipo real del dato ni valida el contenido por sí mismo.',
    pattern:'Expresión regular que el valor debe cumplir para que la validación HTML sea correcta. Se aplica al valor completo del campo.',
    minlength:'Cantidad mínima de caracteres que debe tener el valor para considerarse válido cuando el usuario lo ha modificado.',
    maxlength:'Cantidad máxima de caracteres permitida. El navegador normalmente impide seguir escribiendo cuando se alcanza el límite.',
    min:'Valor mínimo permitido para tipos compatibles como number, range, date o time.',
    max:'Valor máximo permitido para tipos compatibles como number, range, date o time.',
    step:'Incremento válido entre valores. Por ejemplo, step="1" permite enteros consecutivos y step="0.5" permite saltos de medio punto.',
    checked:'Atributo booleano que deja un checkbox o radio seleccionado inicialmente.',
    multiple:'Permite seleccionar o introducir más de un valor cuando el tipo lo soporta, por ejemplo varios archivos o varios correos.',
    accept:'En un input de archivo, orienta el selector hacia tipos de archivo permitidos, por ejemplo image/*. No sustituye la validación del servidor.',
    action:'URL a la que el formulario enviará los datos cuando se confirme el envío.',
    method:'Método HTTP utilizado por el formulario. GET coloca los datos en la URL; POST los envía en el cuerpo de la solicitud.',
    enctype:'Forma en que se codifica el contenido del formulario. Para enviar archivos se necesita multipart/form-data.',
    src:'Ruta o URL del recurso que debe cargar el elemento, por ejemplo la imagen usada por input type="image".',
    alt:'Texto alternativo que describe la función o contenido de una imagen cuando no puede verse y para tecnologías de asistencia.',
    readonly:'Permite leer y enviar el valor, pero evita que el usuario lo modifique directamente.',
    disabled:'Deshabilita el control. No puede recibir interacción y normalmente su valor no se envía con el formulario.',
    form:'Permite asociar el control con un <form> mediante el id de ese formulario aunque el control esté colocado fuera de él.',
    title:'Añade información complementaria al elemento. No debe usarse como único medio para comunicar información esencial.',
    class:'Asigna una o varias clases, normalmente usadas por CSS o JavaScript para seleccionar y agrupar elementos.',
    style:'Aplica CSS directamente al elemento. Para proyectos grandes suele preferirse una hoja de estilos separada.'
  };

  const specificEffect=(attr,values)=>{
    const first=values[0];
    if(attr==='for'&&first)return `Aquí busca un elemento con id="${first}" y vincula el label con él.`;
    if(attr==='id'&&first)return `Aquí el identificador concreto es “${first}”. Debe ser único dentro de la página.`;
    if(attr==='name'&&values.length)return `La clave que llegará al servidor será ${values.map(v=>`“${v}”`).join(', ')} según el control usado.`;
    if(attr==='type'&&values.length)return `En este ejemplo se usan los tipos ${values.map(v=>`“${v}”`).join(', ')}. Cada uno cambia el comportamiento del input.`;
    if(attr==='inputmode'&&first==='numeric')return 'Aquí pide un teclado numérico en móviles, pero el valor sigue siendo texto porque type="text".';
    if(attr==='pattern'&&first==='[0-9]{4}')return 'Aquí solo es válido un valor formado por exactamente cuatro dígitos del 0 al 9.';
    if(attr==='minlength'&&first)return `Aquí se exigen al menos ${first} caracteres.`;
    if(attr==='maxlength'&&first)return `Aquí se permiten como máximo ${first} caracteres.`;
    if(attr==='autocomplete'&&first==='one-time-code')return 'Aquí indica que el campo espera un código temporal de verificación; algunos navegadores pueden sugerir códigos recibidos por SMS o aplicaciones compatibles.';
    if(attr==='autocomplete'&&first)return `Aquí la pista de autocompletado utilizada es “${first}”.`;
    if(attr==='placeholder'&&first)return `Mientras el campo esté vacío se verá la pista “${first}”.`;
    if(attr==='required')return 'Aquí el navegador no permitirá un envío válido si este control obligatorio está vacío o no cumple sus restricciones.';
    if(attr==='min'&&first)return `Aquí el menor valor aceptado es ${first}.`;
    if(attr==='max'&&first)return `Aquí el mayor valor aceptado es ${first}.`;
    if(attr==='step'&&first)return `Aquí los valores válidos avanzan en pasos de ${first}.`;
    if(attr==='accept'&&first)return `Aquí el selector de archivos prioriza “${first}”. El backend aún debe comprobar el archivo recibido.`;
    if(attr==='enctype'&&first==='multipart/form-data')return 'Aquí se usa la codificación necesaria para que un formulario pueda transferir archivos correctamente.';
    if(attr==='method'&&first)return `Aquí el formulario utiliza el método HTTP ${first.toUpperCase()}.`;
    if(attr==='action'&&first)return `Aquí los datos se enviarán a la ruta “${first}”.`;
    if(attr==='value'&&values.length)return `Los valores escritos en el ejemplo son ${values.map(v=>`“${v}”`).join(', ')}.`;
    if(attr==='checked')return 'Aquí la opción aparece seleccionada desde que la página carga.';
    if(attr==='multiple')return 'Aquí el control acepta más de un valor en una sola interacción.';
    if(first!==undefined)return `Valor usado en este código: “${first}”.`;
    return 'Este atributo se usa como atributo booleano: su presencia activa el comportamiento.';
  };

  const describe=entry=>{
    if(entry.name.startsWith('aria-'))return 'Atributo de accesibilidad ARIA. Añade información semántica para tecnologías de asistencia cuando el HTML nativo no es suficiente.';
    if(entry.name.startsWith('data-'))return 'Atributo de datos personalizado. Guarda información propia de la interfaz que JavaScript puede leer mediante dataset.';
    return baseDescriptions[entry.name]||'Configura una característica concreta del elemento HTML. Revisa su valor y el contexto del elemento para entender qué comportamiento activa.';
  };

  const renderDetails=item=>{
    const attrs=parseAttributes(item.code);
    if(!attrs.length)return '<p>No se detectaron atributos en este ejemplo.</p>';
    return attrs.map((entry,index)=>{
      const sample=entry.samples.join(' · ');
      return `<article class="input-attribute-card"><div class="input-attribute-title"><span>${index+1}</span><code>${escapeHtml(entry.name)}</code></div><p>${escapeHtml(describe(entry))}</p><div class="input-attribute-sample"><strong>En el código:</strong> <code>${escapeHtml(sample)}</code></div><p class="input-attribute-effect"><strong>Qué ocurre aquí:</strong> ${escapeHtml(specificEffect(entry.name,entry.values))}</p></article>`;
    }).join('');
  };

  inputItems.forEach(item=>{
    item.attrs=parseAttributes(item.code).map(entry=>entry.name);
  });

  const style=document.createElement('style');
  style.textContent=`
    .input-attribute-card{padding:12px 0;border-bottom:1px solid rgba(148,163,184,.16)}
    .input-attribute-card:last-child{border-bottom:0}
    .input-attribute-title{display:flex;align-items:center;gap:8px;margin-bottom:7px}
    .input-attribute-title>span{display:inline-grid;place-items:center;min-width:22px;height:22px;border-radius:999px;background:#14b8a6;color:#06241f;font-weight:900;font-size:11px}
    .input-attribute-title>code{font-weight:800;color:#93c5fd}
    .input-attribute-card p{margin:6px 0;line-height:1.55}
    .input-attribute-sample{margin-top:8px;padding:8px 10px;border-radius:8px;background:rgba(2,8,23,.54);border:1px solid rgba(96,165,250,.16);font-size:11px;line-height:1.5;word-break:break-word}
    .input-attribute-effect{color:#cbd5e1}
  `;
  document.head.appendChild(style);

  const previousCreateCard=window.createCard;
  window.createCard=createCard=function(item){
    const fragment=previousCreateCard(item);
    if(!inputItems.has(item))return fragment;
    const box=fragment.querySelector('.attributes-box');
    const toggle=fragment.querySelector('.attributes-toggle');
    const count=parseAttributes(item.code).length;
    if(toggle)toggle.textContent=`Explicar ${count} atributo${count===1?'':'s'}`;
    if(box){
      box.innerHTML=`<div style="margin-bottom:10px;font-size:12px;line-height:1.55"><strong>Qué significa cada atributo usado en este código</strong><br><span style="opacity:.82">Se explica su función general y el efecto concreto del valor utilizado en el ejemplo.</span></div>${renderDetails(item)}`;
    }
    return fragment;
  };

  if(typeof window.render==='function')window.render();
})();
