(()=>{
  if(window.__cssPropertiesExplained)return;
  window.__cssPropertiesExplained=true;

  const info={
    color:'Define el color del texto y de decoraciones que heredan ese color.',
    background:'Establece el fondo del elemento; puede incluir color, imagen y otras capas.',
    'font-family':'Selecciona la familia tipográfica y sus alternativas disponibles.',
    'font-size':'Controla el tamaño de los caracteres.',
    'font-weight':'Define el grosor de la tipografía, por ejemplo normal o negrita.',
    'line-height':'Ajusta la altura de cada línea y mejora la separación vertical del texto.',
    'text-align':'Alinea el contenido en línea dentro de su contenedor.',
    width:'Define el ancho de la caja.',
    height:'Define la altura de la caja.',
    'max-width':'Impide que el ancho supere el límite indicado.',
    'min-height':'Garantiza una altura mínima aunque haya poco contenido.',
    margin:'Crea separación exterior entre la caja y los elementos vecinos.',
    padding:'Crea espacio interior entre el contenido y el borde.',
    border:'Dibuja el contorno indicando grosor, estilo y color.',
    'border-radius':'Redondea las esquinas de la caja.',
    'box-shadow':'Añade una sombra visual sin modificar el espacio ocupado por la caja.',
    display:'Determina cómo participa el elemento en el flujo y qué modelo de diseño utiliza.',
    gap:'Crea una separación uniforme entre elementos de Flexbox o Grid.',
    'justify-content':'Distribuye los elementos sobre el eje principal del contenedor flexible.',
    'align-items':'Alinea los elementos sobre el eje transversal del contenedor.',
    'grid-template-columns':'Define la cantidad y el tamaño de las columnas de una rejilla.',
    position:'Elige el sistema utilizado para ubicar el elemento.',
    top:'Indica la distancia desde el borde superior de referencia.',
    right:'Indica la distancia desde el borde derecho de referencia.',
    outline:'Dibuja un contorno exterior, útil para mostrar el foco sin alterar el tamaño.',
    transform:'Desplaza, gira, inclina o escala visualmente un elemento.',
    transition:'Suaviza el cambio entre el valor anterior y el nuevo valor de una propiedad.',
    animation:'Aplica una secuencia definida con @keyframes y controla su duración y repetición.',
    opacity:'Controla la transparencia: 0 es invisible y 1 es completamente visible.'
  };

  const cssItems=new WeakSet(sections.filter(section=>section.title.startsWith('CSS')).flatMap(section=>section.items));
  const propertiesOf=item=>{
    const code=item.code||'';
    const sources=[
      ...[...code.matchAll(/<style>([\s\S]*?)<\/style>/gi)].map(match=>match[1]),
      ...[...code.matchAll(/style="([^"]*)"/gi)].map(match=>match[1]),
      code.split('/* estilos.css */')[1]||''
    ];
    const properties=new Map();
    sources.forEach(source=>{
      for(const match of source.matchAll(/(?:^|[;{]\s*)(--[\w-]+|[a-z-]+)\s*:\s*([^;}\n]+)/gmi)){
        const name=match[1].toLowerCase();
        const value=match[2].trim();
        if(!properties.has(name))properties.set(name,new Set());
        properties.get(name).add(value);
      }
    });
    return [...properties].map(([name,values])=>({name,values:[...values]}));
  };

  const originalCreateCard=createCard;
  createCard=function(item){
    const fragment=originalCreateCard(item);
    if(!cssItems.has(item))return fragment;
    const box=fragment.querySelector('.attributes-box');
    const toggle=fragment.querySelector('.attributes-toggle');
    const properties=propertiesOf(item);
    if(box)box.innerHTML=properties.map(({name,values})=>{
      const explanation=name.startsWith('--')
        ? 'Declara una variable CSS reutilizable; var() permite aplicar su valor en otras reglas.'
        : info[name]||'Configura una característica visual o de distribución del elemento seleccionado.';
      const examples=values.map(value=>`${name}: ${value};`).join('\n');
      return `<div class="attribute-item"><div class="attribute-head"><code>${esc(name)}</code><span>${esc(explanation)}</span></div><div class="attribute-example-label">Valor usado y efecto en este ejemplo</div><pre class="attribute-example"><code>${highlight(examples)}</code></pre></div>`;
    }).join('')||'<span>Este ejemplo explica una forma de aplicar CSS; no contiene declaraciones adicionales para analizar.</span>';
    if(toggle){
      const label=()=>toggle.textContent=box.hidden?`Ver propiedades (${properties.length})`:'Ocultar propiedades';
      label();
      toggle.onclick=()=>{box.hidden=!box.hidden;label()};
    }
    return fragment;
  };
  render();
})();
