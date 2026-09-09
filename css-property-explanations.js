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
    opacity:'Controla la transparencia: 0 es invisible y 1 es completamente visible.',
    'box-sizing':'Define si width y height incluyen padding y border; border-box facilita conservar el tamaño total declarado.',
    'margin-top':'Separa la caja de su vecino superior sin modificar el espacio interior.',
    'padding-left':'Agrega espacio interior únicamente en el lado izquierdo del contenido.',
    'padding-inline':'Agrega espacio interior al inicio y al final del eje de escritura.',
    'padding-block':'Agrega espacio interior arriba y abajo en una escritura horizontal.',
    'border-left':'Dibuja solamente el borde izquierdo indicando grosor, estilo y color.',
    'text-decoration':'Configura las líneas decorativas del texto, incluido tipo, estilo, color y grosor.',
    'text-underline-offset':'Separa el subrayado de la línea base para mejorar su legibilidad.',
    'letter-spacing':'Aumenta o reduce el espacio horizontal entre caracteres.',
    'text-transform':'Cambia visualmente mayúsculas y minúsculas sin alterar el contenido original.',
    'background-color':'Define el color de fondo utilizado debajo de las demás capas.',
    'background-image':'Agrega una imagen o gradiente como una o varias capas de fondo.',
    'background-size':'Controla el tamaño de cada imagen de fondo dentro de la caja.',
    'background-position':'Ubica la imagen de fondo respecto al área disponible.',
    overflow:'Decide si el contenido que supera la caja se muestra, recorta o desplaza.',
    'overflow-x':'Controla específicamente el desbordamiento horizontal.',
    'overflow-wrap':'Permite dividir palabras largas para impedir que desborden su contenedor.',
    'white-space':'Controla cómo se procesan los espacios, saltos de línea y ajustes automáticos.',
    'text-overflow':'Indica cómo representar texto recortado, normalmente mediante puntos suspensivos.',
    'list-style':'Configura conjuntamente el tipo, posición e imagen de los marcadores de lista.',
    flex:'Resume crecimiento, reducción y tamaño base de un elemento flexible.',
    'flex-wrap':'Permite que los elementos flexibles continúen en nuevas filas o columnas.',
    'grid-template-areas':'Describe una distribución de Grid mediante nombres asignados a sus regiones.',
    'grid-area':'Asigna un elemento a un área nombrada o especifica sus líneas de inicio y final.',
    'aspect-ratio':'Mantiene una proporción preferida entre el ancho y la altura de la caja.',
    'object-fit':'Controla cómo una imagen o video llena sus dimensiones sin deformarse.',
    'object-position':'Elige qué parte de una imagen o video queda alineada dentro de su caja.',
    'z-index':'Ordena elementos superpuestos dentro del mismo contexto de apilamiento.',
    isolation:'Crea un nuevo contexto de apilamiento para contener el orden de sus capas.',
    'border-collapse':'Decide si los bordes de una tabla se separan o se combinan.',
    'table-layout':'Selecciona cómo se calculan los anchos de columnas de una tabla.',
    content:'Define el contenido generado por los pseudoelementos ::before y ::after.',
    inset:'Resume las distancias top, right, bottom y left de un elemento posicionado.',
    filter:'Aplica efectos gráficos como desenfoque, brillo, contraste o escala de grises.',
    'margin-inline':'Controla los márgenes inicial y final según la dirección de escritura.',
    'inset-block-start':'Posiciona desde el comienzo del eje de bloque, normalmente la parte superior.',
    'inset-inline-end':'Posiciona desde el extremo final del eje de escritura.',
    cursor:'Define la forma del puntero para comunicar la interacción disponible.'
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
    if(!properties.length){
      if(box)box.hidden=true;
      if(toggle)toggle.hidden=true;
      return fragment;
    }
    if(box)box.innerHTML=properties.map(({name,values})=>{
      const explanation=name.startsWith('--')
        ? 'Declara una variable CSS reutilizable; var() permite aplicar su valor en otras reglas.'
        : info[name]||'Configura una característica visual o de distribución del elemento seleccionado.';
      const examples=values.map(value=>`${name}: ${value};`).join('\n');
      return `<div class="attribute-item"><div class="attribute-head"><code>${esc(name)}</code><span>${esc(explanation)}</span></div><div class="attribute-example-label">Valor usado y efecto en este ejemplo</div><pre class="attribute-example"><code>${highlight(examples)}</code></pre></div>`;
    }).join('');
    if(toggle){
      const label=()=>toggle.textContent=box.hidden?`Ver propiedades (${properties.length})`:'Ocultar propiedades';
      label();
      toggle.onclick=()=>{box.hidden=!box.hidden;label()};
    }
    return fragment;
  };
  render();
})();
