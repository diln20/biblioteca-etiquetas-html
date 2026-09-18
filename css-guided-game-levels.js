(()=>{
  // Each mission keeps the decorative CSS and leaves the concept to solve blank.
  const missions=[
    ['Centra la caja en ambos ejes con justify-content y align-items.', ['justify-content:center;','align-items:center;'], [['.pantalla-div',['justify-content','align-items']]]],
    ['Reparte el ancho por igual con flex:1 y separa los DIVs con gap:16px.', ['gap:16px;','flex:1;'], [['.fila-divs',['gap']],['.fila-divs > div',['flex-grow','width']]]],
    ['Crea dos columnas: 200px para el menú y 1fr para el contenido.', ['grid-template-columns:200px 1fr;'], [['.layout-div',['grid-template-columns']]]],
    ['Centra el hijo en su padre usando place-items:center.', ['place-items:center;'], [['.padre-div',['align-items','justify-items']]]],
    ['Coloca B a 120px de la izquierda y 85px de arriba, por encima de A con z-index:2.', ['left:120px;','top:85px;','z-index:2;'], [['.tarjeta-b',['left','top','z-index']]]],
    ['Usa tres columnas iguales y gap:14px; hasta 600px, cambia a una columna.', ['grid-template-columns:repeat(3,1fr);','gap:14px;','grid-template-columns:1fr;'], [['.galeria-divs',['grid-template-columns','gap']]], 800],
    ['Resalta solo .carta.objetivo: borde #22c55e, fondo #dcfce7 y translateY(-4px).', ['border-color:#22c55e;','background:#dcfce7;','transform:translateY(-4px);'], [['.carta',['border-color','background-color','transform']]]],
    ['Completa la caja: width:280px, padding:24px y margin:24px auto.', ['width:280px;','padding:24px;','margin:24px auto;'], [['.caja-reto',['width','padding','margin-top','margin-left','margin-right']]]],
    ['Distribuye los grupos con space-between, céntralos verticalmente y separa los botones 8px.', ['justify-content:space-between;','align-items:center;','gap:8px;'], [['.barra-juego',['justify-content','align-items']],['.acciones',['gap']]]],
    ['Crea tres columnas iguales, gap:10px y haz que BOSS ocupe dos columnas.', ['grid-template-columns:repeat(3,1fr);','gap:10px;','grid-column:span 2;'], [['.tablero-css',['grid-template-columns','gap']],['.jefe',['grid-column-start','grid-column-end']]]],
    ['Haz que la tarjeta sea relative y su insignia absolute, a 8px de arriba y derecha.', ['position:relative;','position:absolute;','top:8px;','right:8px;'], [['.producto-juego',['position']],['.insignia-juego',['position','top','right']]]],
    ['Completa la regla #mensaje-boss con color:#dc2626 y observa cómo gana a las clases.', ['color:#dc2626;'], [['#mensaje-boss',['color']]]],
    ['Completa :hover con fondo #6d28d9, :focus-visible con outline:4px solid #c4b5fd y :active con transform:scale(.96). Pruébalos con ratón y teclado.', ['background:#6d28d9;','outline:4px solid #c4b5fd;','transform:scale(.96);'], [], 0, [['.boton-mision:hover',['background-color']],['.boton-mision:focus-visible',['outline']],['.boton-mision:active',['transform']]]],
    ['Hasta 640px, convierte el panel en una columna. Conserva sus dos columnas en escritorio.', ['grid-template-columns:1fr;'], [['.panel-responsive',['grid-template-columns']]], 800],
    ['Define en :root --acento-juego:#22c55e y --radio-juego:16px para completar el tema.', ['--acento-juego:#22c55e;','--radio-juego:16px;'], [['.panel-tema',['border-radius']],['.panel-tema button',['background-color']]]],
    ['Añade animation:recompensa 900ms ease-in-out infinite alternate a la estrella. Conserva @keyframes y la alternativa de movimiento reducido.', ['animation:recompensa 900ms ease-in-out infinite alternate;'], [], 0, [['.recompensa-css',['animation-name','animation-duration','animation-timing-function','animation-iteration-count','animation-direction']]]],
    ['Completa el HUD: dos columnas, Vida al 78%, XP al 54% y una columna hasta 560px.', ['grid-template-columns:repeat(2,1fr);','width:78%;','width:54%;','grid-template-columns:1fr;'], [['.hud-grid',['grid-template-columns']],['.vida,.xp',['width']]], 800]
  ];
  const explanations=[
    ['Con flex-direction:row, justify-content centra horizontalmente y align-items verticalmente. El padre necesita altura libre para que se vea el centrado vertical.','Aplicar estas propiedades al hijo no mueve el hijo dentro del padre; deben ir en .pantalla-div.','La caja queda a igual distancia de los lados y del borde superior e inferior del escenario.'],
    ['flex:1 reparte el espacio entre los hijos; gap reserva espacio entre ellos sin añadir márgenes externos.','Dar width:33.33% a cada hijo y añadir gap puede superar el ancho disponible.','Las tres cajas miden lo mismo y hay 16px entre cada par.'],
    ['200px reserva el ancho del menú; 1fr recibe el espacio restante después de descontar el gap.','Usar 100% para la segunda columna añade el ancho del menú al total y puede desbordar.','El menú conserva 200px y el contenido ocupa el resto.'],
    ['place-items combina align-items y justify-items. En Grid centra el hijo dentro de su celda en ambos ejes.','place-content mueve el conjunto de pistas; no siempre produce el mismo resultado que alinear cada hijo.','El hijo queda centrado incluso si aumentas la altura del padre.'],
    ['Los hijos absolute toman como referencia el ancestro relative. left y top fijan su posición; z-index decide qué capa tapa a la otra.','Un z-index grande no corrige una posición incorrecta ni atraviesa cualquier contexto de apilamiento.','B comienza en (120px,85px) y cubre parte de A.'],
    ['repeat(3,1fr) divide el ancho en tres partes iguales. La media query reemplaza esa distribución por una columna a 600px o menos.','Cambiar solo el número de columnas fuera de @media deja el mismo diseño en móvil y escritorio.','Comprobar revisa 800px y 360px: tres columnas en el primero, una en el segundo, con gap de 14px.'],
    ['.carta.objetivo exige ambas clases en el mismo elemento. El borde y el fondo destacan CSS; transform la desplaza visualmente sin mover a sus hermanos.','Separar las clases con un espacio busca un descendiente, no un elemento con ambas clases.','Solo CSS cambia de color y sube 4px; HTML y JavaScript mantienen su aspecto.'],
    ['border-box incluye padding y borde dentro de width. Los márgenes automáticos reparten el espacio horizontal sobrante.','Confundir padding con margin cambia el espacio interior por exterior; quitar border-box aumenta el ancho final.','La caja mide 280px, tiene padding de 24px y margen vertical de 24px.'],
    ['space-between reparte el espacio libre entre los grupos. align-items los centra verticalmente; el gap de .acciones separa únicamente sus botones.','Usar justify-content en los botones no distribuye los grupos del encabezado: cada contenedor controla a sus hijos directos.','Jugador, botones y puntuación comparten fila y centro vertical; los botones tienen 8px entre sí.'],
    ['El contenedor define tres pistas; grid-column:span 2 hace que BOSS consuma dos celdas contiguas.','Cambiar el ancho de BOSS manualmente no reserva dos celdas y puede solaparlo con otros elementos.','Las columnas son iguales, el gap es 10px y BOSS ocupa dos columnas.'],
    ['relative conserva la tarjeta en el flujo y la convierte en referencia. absolute saca la insignia del flujo y permite ubicarla respecto a esa tarjeta.','Si falta relative en la tarjeta, la insignia puede usar otro ancestro como referencia.','NUEVO permanece a 8px del borde superior y derecho de la tarjeta.'],
    ['Entre estas reglas, el selector por id tiene más especificidad que las clases y el selector de tipo, aunque estos aparezcan después.','Pensar que siempre gana la última regla ignora la especificidad; !important no hace falta para este ejercicio.','El texto termina rojo #dc2626. Como variación, elimina el id y observa qué clase gana.'],
    ['hover representa el puntero sobre el botón, focus-visible destaca el foco de teclado y active actúa mientras se pulsa.','Eliminar outline sin reemplazo deja a quien navega con teclado sin una señal clara de dónde está.','Prueba puntero, Tab y pulsación. La comprobación compara las declaraciones de las tres reglas indicadas.'],
    ['La regla de escritorio crea menú y contenido. Dentro de @media se sustituye la lista de columnas por 1fr.','Una media query con min-width en vez de max-width aplicaría la versión móvil al rango contrario.','A 800px hay dos columnas; a 360px, una. Conserva el ancho fluido y el gap.'],
    ['Las propiedades personalizadas se heredan desde :root; var() permite reutilizarlas en distintos componentes.','Definir --acento y usar --acento-juego son nombres distintos; revisa también los dos guiones iniciales.','El botón queda verde #22c55e y el panel tiene radio de 16px sin repetir esos valores en sus reglas.'],
    ['La animación enlaza el nombre recompensa con @keyframes. 900ms fija el ciclo; alternate invierte el recorrido y la media query respeta movimiento reducido.','Animar sin límite puede distraer. Mantén la alternativa animation:none para quien la solicita.','La estrella sube y gira. La comprobación revisa la regla animation; comprueba manualmente la preferencia de movimiento reducido.'],
    ['Grid organiza las tarjetas, Flexbox alinea el encabezado y los porcentajes expresan el llenado de las barras respecto a su contenedor.','Asignar 78px en lugar de 78% deja una barra fija que no se adapta al ancho del panel.','Vida ocupa 78%, XP 54%; el HUD pasa de dos columnas a una hasta 560px.']
  ];
  window.CSS_GUIDED_GAME={
    title:'CSS Quest · retos guiados',subtitle:'Completa el CSS y supera las '+window.CSS_GUIDED_CHALLENGES.length+' misiones',concepts:'HTML de referencia · CSS editable · Ctrl + Enter',
    baseCss:'*{box-sizing:border-box}html,body{margin:0;min-height:100%;font-family:Inter,system-ui,sans-serif;background:#f8fafc;color:#0f172a}body{padding:18px}body> *{max-width:100%}',
    levels:window.CSS_GUIDED_CHALLENGES.map((data,index)=>{
      const metadata=data[7];
      const [instruction,remove,checks,previewWidth,ruleChecks]=missions[index]||metadata.mission;
      const [why,mistake,verify]=explanations[index]||[metadata.why,metadata.mistake,metadata.verify];
      let starter=data[3];
      remove.forEach(declaration=>{
        const property=declaration.slice(0,declaration.indexOf(':'));
        starter=starter.replace(declaration.replace(/;$/,''),'/* Completa aquí: '+property+': ... */');
      });
      const format=css=>css.replace(/\{\s*/g,'{\n  ').replace(/;\s*/g,';\n  ').replace(/\s*\}/g,'\n}').replace(/\}\s*/g,'}\n');
      return {title:data[0],html:data[2],instruction,hint:data[4],why,mistake,verify,extra:data[6],editorProperties:[...new Set(remove.map(declaration=>declaration.split(':')[0]))],solution:format(data[3]),starter:format(starter),checks,previewWidth,ruleChecks};
    })
  };
})();
