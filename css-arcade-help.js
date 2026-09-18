(()=>{
  const groups={
    flex:['Flexbox · distribuir y alinear',[
      ['display:flex; flex-direction:row;','Activa Flexbox. row forma una fila; column una columna. row-reverse y column-reverse invierten su sentido visual.'],
      ['justify-content:center;','Distribuye en el eje principal: flex-start, flex-end, center, space-between, space-around o space-evenly.'],
      ['align-items:center;','Alinea en el eje transversal: flex-start, flex-end, center, stretch o baseline. Al cambiar a column también cambian los ejes.'],
      ['flex-wrap:wrap; gap:16px;','Permite nuevas líneas. nowrap conserva una sola; wrap-reverse invierte cómo se apilan. gap separa sin añadir espacio en los bordes.'],
      ['align-content:space-between;','Distribuye líneas en el eje transversal cuando hay wrap y espacio libre. También acepta center, flex-start, flex-end, space-around, space-evenly y stretch.'],
      ['flex:1 1 180px;','En un hijo: crecimiento, encogimiento y tamaño base. flex-shrink:0 evita que se reduzca. align-self:flex-end alinea solo ese hijo.']
    ]],
    grid:['Grid · columnas, filas y celdas',[
      ['display:grid; grid-template-columns:repeat(3,1fr);','Crea tres columnas iguales. 200px 1fr combina una columna fija con otra flexible.'],
      ['grid-template-rows:repeat(2,90px); gap:14px;','Define dos filas de 90px. row-gap y column-gap permiten separar cada eje de forma independiente.'],
      ['grid-column:span 2; grid-row:span 2;','En un hijo, ocupa dos columnas o filas. grid-column:1 / -1 abarca todas las columnas explícitas.'],
      ['place-items:center;','Centra los hijos en sus celdas. justify-items controla el eje horizontal y align-items el vertical en la escritura habitual. place-self:center afecta solo a un hijo.'],
      ['grid-template-columns:repeat(auto-fit,minmax(140px,1fr));','Crea tantas columnas de al menos 140px como quepan y reparte el espacio sobrante.'],
      ['grid-template-areas:"cabecera cabecera" "menu contenido";','Nombra regiones en el padre y asigna grid-area:cabecera al hijo correspondiente. Las áreas deben formar rectángulos.']
    ]],
    selectors:['Selectores · elegir sin afectar a otros',[
      ['.card { color:#2563eb; }','Una clase selecciona todos los elementos que la tienen. #principal selecciona un id.'],
      ['.card.featured { background:#dcfce7; }','Sin espacio: ambas clases en el mismo elemento. Con espacio, .card .featured busca un descendiente.'],
      ['.card > button { padding:12px; }','> selecciona hijos directos. + selecciona al hermano inmediato; ~ a los hermanos posteriores que coincidan.'],
      ['[data-level="3"] { color:#7c3aed; }','Selecciona un atributo con un valor concreto. Usa el HTML de referencia para conocer clases y atributos disponibles.'],
      ['li:first-child { font-weight:700; }','Prueba :last-child, :nth-child(2), :nth-child(odd) y :nth-child(even). La posición se cuenta entre todos los hermanos.'],
      ['.card:not(.featured) { opacity:.45; }','Excluye la tarjeta destacada. Revisa que las demás tarjetas cambien y la excluida conserve su aspecto.']
    ]],
    box:['Modelo de caja · tamaño y espacio',[
      ['box-sizing:border-box; width:280px;','Incluye padding y borde en el ancho declarado. content-box los añade al ancho del contenido.'],
      ['padding:12px 24px; margin:20px auto;','Padding crea espacio interior; margin exterior. Dos valores significan vertical y horizontal. auto centra un bloque con ancho limitado.'],
      ['width:100%; max-width:600px;','Ocupa el ancho disponible sin superar 600px. min-height mantiene una altura mínima sin impedir que el contenido crezca.'],
      ['border:2px solid #38bdf8; border-radius:12px;','Controla ancho, estilo y color del borde. Prueba solid, dashed o dotted. El radio redondea las esquinas.'],
      ['box-shadow:0 8px 24px rgba(15,23,42,.2);','Desplazamiento horizontal, vertical, desenfoque y color. La sombra no aumenta el espacio reservado por la caja.'],
      ['height:140px; overflow-y:auto;','Permite desplazamiento vertical cuando el contenido supera la altura. hidden recorta; visible deja sobresalir.']
    ]],
    divs:['DIVs · anidar, mostrar y ocultar',[
      ['.padre > div { padding:20px; }','Afecta solo a los DIVs hijos directos. .padre div también afecta a los nietos y demás descendientes.'],
      ['display:none;','Oculta el DIV y elimina su espacio del layout. visibility:hidden lo oculta conservando su hueco.'],
      ['opacity:0;','Hace transparente el DIV pero conserva su espacio y puede mantener sus interacciones. No equivale a display:none.'],
      ['min-height:240px; display:grid; place-items:center;','El padre centra sus hijos. Para ver centrado vertical debe existir espacio libre en su altura.'],
      ['display:flex; flex-wrap:wrap;','Cada contenedor organiza a sus hijos directos. Puedes usar Grid en el DIV exterior y Flexbox en una barra interior.']
    ]],
    position:['Position · referencias y capas',[
      ['position:relative;','Conserva el espacio original y puede servir de referencia a hijos absolute. static es el posicionamiento normal.'],
      ['position:absolute; top:8px; right:8px;','Sale del flujo y se ubica respecto a su bloque contenedor, normalmente el ancestro posicionado más cercano.'],
      ['position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);','Centra usando la mitad del contenedor y descontando la mitad del tamaño del elemento.'],
      ['inset:16px auto auto 18px;','Atajo para top, right, bottom y left, en ese orden. auto deja ese lado sin una distancia fijada.'],
      ['position:relative; z-index:2;','Controla el apilamiento dentro de su contexto. Un valor alto no permite escapar de cualquier contexto de apilamiento.'],
      ['position:sticky; top:0;','Permanece visible al alcanzar el umbral dentro de su contenedor de desplazamiento. fixed suele fijarse respecto a la ventana.']
    ]],
    responsive:['Responsive · adaptarse al espacio',[
      ['@media(max-width:600px){ .layout{grid-template-columns:1fr;} }','Aplica hasta 600px incluidos. min-width aplica a partir del ancho indicado. Conserva las reglas de escritorio fuera de la condición.'],
      ['max-width:100%; height:auto;','Permite que una imagen se reduzca conservando su proporción.'],
      ['font-size:clamp(18px,5vw,32px);','Define mínimo, valor fluido y máximo. También sirve para padding y gap.'],
      ['width:min(600px,100%);','Elige el menor valor. % depende del contenedor, vw del ancho de la ventana y rem del tamaño de letra raíz.'],
      ['aspect-ratio:16 / 9;','Mantiene la proporción si al menos una dimensión es automática. Un ancho y alto fijos pueden impedir el ajuste.'],
      ['width:140px; height:140px; object-fit:cover;','Encaja una imagen sin deformarla, recortando el sobrante. contain conserva toda la imagen y puede dejar espacio libre.']
    ]],
    text:['Texto · recortar o ajustar líneas',[
      ['white-space:nowrap; overflow:hidden; text-overflow:ellipsis;','En una caja con ancho limitado, mantiene una línea y muestra puntos suspensivos al recortar.'],
      ['overflow-wrap:anywhere;','Permite partir palabras o URLs largas para evitar que sobresalgan sin ocultar el contenido.'],
      ['text-align:center; line-height:1.5;','Centra el texto y da separación entre líneas. text-align no centra la caja que contiene el texto.']
    ]],
    states:['Estados, variables y animaciones',[
      ['button:hover { background:#6d28d9; }','hover responde al puntero; :active al periodo de pulsación; :disabled a controles deshabilitados.'],
      ['button:focus-visible { outline:3px solid #38bdf8; outline-offset:3px; }','Mantiene visible el foco al navegar con teclado. No elimines outline sin una alternativa.'],
      [':root { --acento:#22c55e; } .card { background:var(--acento); }','Define un valor reutilizable y consúmelo con var(). El nombre debe coincidir exactamente.'],
      ['transition:transform .2s ease;','Suaviza un cambio de transform entre estados. No genera movimiento sin un cambio de valor.'],
      ['@keyframes subir { to { transform:translateY(-10px); } }','Define los pasos de la animación. Actívala con animation:subir 900ms ease-in-out infinite alternate.'],
      ['@media(prefers-reduced-motion:reduce){ .animada{animation:none;} }','Respeta la preferencia de reducir movimiento. Comprueba también el resultado sin animaciones.']
    ]]
  };
  const topics={grid:['grid','box'],selectors:['selectors','states'],box:['box','text'],divs:['divs','flex','grid','box','position','responsive'],position:['position','box'],responsive:['responsive','grid','flex','text']};
  const key=new URLSearchParams(location.search).get('game')||'grid';
  const host=document.querySelector('#propertyHelp');
  if(!host)return;
  for(const topic of topics[key]||Object.keys(groups)){
    const [title,entries]=groups[topic];
    const details=document.createElement('details'),summary=document.createElement('summary');
    summary.textContent=title;details.append(summary);
    for(const [example,explanation] of entries){
      const code=document.createElement('code'),paragraph=document.createElement('p');
      code.textContent=example;paragraph.textContent=explanation;
      details.append(code,paragraph);
    }
    host.append(details);
  }
})();
