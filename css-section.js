(()=>{
  if(window.__cssSectionAdded)return;
  window.__cssSectionAdded=true;

  const preview=(css,html)=>`<style>${css}</style>${html}`;
  const C=(topic,name,description,code,html,meta={})=>T(
    topic,
    name,
    description,
    `${html}\n\n<style>\n${code}\n</style>`,
    preview(code,html),
    [],
    {kind:meta.kind||'CSS',tip:meta.tip||''}
  );

  sections.push(
    {
      title:'CSS · Principiante',
      description:'Empieza desde cero: conecta CSS, selecciona elementos y domina sus estilos básicos.',
      quote:'“Primero comprende la caja; después construye el diseño.”',
      challenge:'Crea una tarjeta con título, párrafo, colores, espacios, borde y ancho máximo.',
      items:[
        T('style=""','Estilos en línea','El atributo style aplica reglas directamente a un único elemento.','<p style="color: #2563eb; font-weight: 700;">\n  Texto con estilo en línea\n</p>','<p style="color:#2563eb;font-weight:700">Texto con estilo en línea</p>',['style'],{kind:'Forma de aplicación',tip:'Úsalo solo para pruebas o casos aislados; se vuelve difícil de mantener cuando se repite.'}),
        T('<style>','Estilos internos','La etiqueta style reúne las reglas CSS dentro del head del mismo documento.','<head>\n  <style>\n    .interno {\n      color: white;\n      background: #7c3aed;\n      padding: 12px;\n    }\n  </style>\n</head>\n<body>\n  <p class="interno">Estilo interno</p>\n</body>','<style>.interno{color:white;background:#7c3aed;padding:12px}</style><p class="interno">Estilo interno</p>',[],{kind:'Forma de aplicación',tip:'Es práctico para una página pequeña, aunque mezcla los estilos con el documento HTML.'}),
        T('<link>','Hoja de estilos externa','link conecta el HTML con un archivo CSS separado y reutilizable.','<!-- index.html -->\n<head>\n  <link rel="stylesheet" href="estilos.css">\n</head>\n<body>\n  <p class="externo">Estilo desde otra hoja</p>\n</body>\n\n/* estilos.css */\n.externo {\n  color: white;\n  background: #059669;\n  padding: 12px;\n}','<style>.externo{color:white;background:#059669;padding:12px}</style><p class="externo">Estilo desde otra hoja</p>',['rel','href'],{kind:'Forma de aplicación',tip:'Es la opción recomendada para reutilizar estilos y mantener el proyecto ordenado.'}),
        C('selector','Selectores básicos','Seleccionan elementos por etiqueta, clase o identificador.','p { color: #334155; }\n.destacado { color: #2563eb; }\n#titulo { font-weight: 800; }','<h2 id="titulo">Título</h2><p>Texto normal</p><p class="destacado">Texto destacado</p>',{kind:'Fundamento'}),
        C('color','Color y fondo','color modifica el texto y background cambia el fondo.','.mensaje {\n  color: white;\n  background: #2563eb;\n  padding: 12px;\n}','<p class="mensaje">Mensaje con color y fondo</p>',{kind:'Propiedad'}),
        C('font','Tipografía','Controla familia, tamaño, peso, alineación y altura de línea.','.texto {\n  font-family: system-ui;\n  font-size: 20px;\n  font-weight: 700;\n  line-height: 1.5;\n  text-align: center;\n}','<p class="texto">Una tipografía clara mejora la lectura.</p>',{kind:'Propiedad'}),
        C('box model','Modelo de caja','Todo elemento se compone de contenido, padding, border y margin.','.caja {\n  margin: 12px;\n  padding: 20px;\n  border: 2px solid #14b8a6;\n  background: #f0fdfa;\n}','<div class="caja">Contenido de la caja</div>',{kind:'Fundamento',tip:'Usa box-sizing: border-box para que padding y border formen parte del ancho declarado.'}),
        C('width / height','Tamaños y unidades','Define dimensiones con px, porcentajes, rem, vw y otras unidades.','.panel {\n  width: 80%;\n  max-width: 420px;\n  min-height: 80px;\n  padding: 1rem;\n  background: #e0f2fe;\n}','<div class="panel">Ancho flexible con un límite máximo.</div>',{kind:'Propiedad'}),
        C('border','Bordes y esquinas','Los bordes delimitan elementos y border-radius redondea sus esquinas.','.tarjeta {\n  padding: 18px;\n  border: 1px solid #94a3b8;\n  border-radius: 14px;\n  box-shadow: 0 8px 20px #cbd5e1;\n}','<article class="tarjeta"><strong>Tarjeta básica</strong><p>Borde, radio y sombra.</p></article>',{kind:'Propiedad'}),
        C('HTML + CSS','Ejemplo integrador · Principiante','Una tarjeta reúne selector, tipografía, colores, modelo de caja, tamaño y bordes. Cada clase conecta una parte del HTML con sus reglas CSS.','.tarjeta-inicial {\n  max-width: 360px;\n  margin: 12px auto;\n  padding: 20px;\n  border: 2px solid #60a5fa;\n  border-radius: 14px;\n  background: #eff6ff;\n  font-family: system-ui;\n}\n.tarjeta-inicial h3 { color: #1d4ed8; }\n.tarjeta-inicial p { color: #334155; line-height: 1.5; }','<article class="tarjeta-inicial">\n  <h3>Mi primera tarjeta</h3>\n  <p>El HTML aporta la estructura y CSS controla su apariencia.</p>\n</article>',{kind:'Ejemplo integrador',tip:'Observa el recorrido: la clase selecciona el article; después cada propiedad modifica una parte de su caja o de su texto.'})
      ]
    },
    {
      title:'CSS · Intermedio',
      description:'Construye layouts flexibles, controla posiciones y adapta la interfaz a cada pantalla.',
      quote:'“Un buen layout se adapta al contenido y al espacio disponible.”',
      challenge:'Construye una galería adaptable con Grid y una barra de navegación con Flexbox.',
      items:[
        C('display','Flujo y display','display controla cómo participa un elemento en el diseño: block, inline, inline-block o none.','.linea {\n  display: inline-block;\n  margin: 4px;\n  padding: 10px;\n  background: #dbeafe;\n}\n.oculto { display: none; }','<span class="linea">Uno</span><span class="linea">Dos</span><span class="oculto">Oculto</span>',{kind:'Diseño'}),
        C('flex','Flexbox','Distribuye elementos en una dimensión y facilita alineación, orden y espacio.','.fila {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n}\n.fila span {\n  padding: 12px;\n  background: #dcfce7;\n}','<div class="fila"><span>Uno</span><span>Dos</span><span>Tres</span></div>',{kind:'Diseño'}),
        C('grid','CSS Grid','Organiza contenido en filas y columnas para crear layouts bidimensionales.','.rejilla {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 10px;\n}\n.rejilla span {\n  padding: 14px;\n  text-align: center;\n  background: #fef3c7;\n}','<div class="rejilla"><span>1</span><span>2</span><span>3</span></div>',{kind:'Diseño'}),
        C('position','Posicionamiento','position permite desplazar elementos o mantenerlos respecto a un contenedor.','.contenedor {\n  position: relative;\n  height: 100px;\n  background: #f1f5f9;\n}\n.insignia {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  padding: 5px 9px;\n  background: #ef4444;\n  color: white;\n}','<div class="contenedor"><span class="insignia">Nuevo</span></div>',{kind:'Diseño'}),
        C(':hover / :focus','Estados y pseudoclases','Las pseudoclases aplican reglas cuando cambia el estado de un elemento.','.boton {\n  padding: 10px 16px;\n  border: 0;\n  border-radius: 8px;\n  color: white;\n  background: #14b8a6;\n}\n.boton:hover,\n.boton:focus {\n  background: #0f766e;\n  outline: 3px solid #99f6e4;\n}','<button class="boton">Interactúa conmigo</button>',{kind:'Interacción'}),
        C('@media','Diseño responsive','Las media queries cambian el layout según el ancho o las características del dispositivo.','.columnas {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n.columnas div { padding: 14px; background: #ede9fe; }\n@media (max-width: 600px) {\n  .columnas { grid-template-columns: 1fr; }\n}','<div class="columnas"><div>Columna A</div><div>Columna B</div></div>',{kind:'Responsive'}),
        C('layout responsive','Ejemplo integrador · Intermedio','Este catálogo combina Flexbox para el encabezado, Grid para las tarjetas, posición absoluta para la insignia y estados interactivos.','.catalogo-cabecera {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n}\n.catalogo-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 12px;\n}\n.producto { position: relative; padding: 18px; background: #ecfeff; }\n.producto:hover { background: #cffafe; transform: translateY(-2px); }\n.insignia-producto { position: absolute; top: 6px; right: 6px; color: #be123c; }\n@media (max-width: 600px) {\n  .catalogo-grid { grid-template-columns: 1fr; }\n}','<section>\n  <header class="catalogo-cabecera"><h3>Catálogo</h3><a href="#">Ver todos</a></header>\n  <div class="catalogo-grid">\n    <article class="producto"><span class="insignia-producto">Nuevo</span><strong>Curso HTML</strong></article>\n    <article class="producto"><strong>Curso CSS</strong></article>\n  </div>\n</section>',{kind:'Ejemplo integrador',tip:'Flex alinea una fila; Grid organiza filas y columnas; la media query convierte la rejilla en una sola columna.'})
      ]
    },
    {
      title:'CSS · Avanzado',
      description:'Crea sistemas reutilizables, estilos fluidos y efectos visuales eficientes.',
      quote:'“CSS avanzado consiste en controlar la complejidad, no en añadir más reglas.”',
      challenge:'Crea un componente reutilizable con variables, tamaño fluido, transición y animación accesible.',
      items:[
        C('--variable','Variables CSS','Las propiedades personalizadas centralizan valores y facilitan temas consistentes.',':root {\n  --principal: #7c3aed;\n  --radio: 12px;\n}\n.componente {\n  padding: 16px;\n  border-radius: var(--radio);\n  color: white;\n  background: var(--principal);\n}','<div class="componente">Componente con variables</div>',{kind:'Arquitectura'}),
        C('clamp()','Valores fluidos','clamp define un mínimo, un valor adaptable y un máximo sin múltiples media queries.','.titulo {\n  font-size: clamp(24px, 5vw, 52px);\n  margin: 0;\n  color: #172554;\n}','<h2 class="titulo">Título fluido</h2>',{kind:'Responsive'}),
        C('transform','Transformaciones y transiciones','transform modifica posición, escala o rotación; transition suaviza el cambio.','.elemento {\n  width: 90px;\n  padding: 16px;\n  color: white;\n  background: #2563eb;\n  transition: transform .25s, background .25s;\n}\n.elemento:hover {\n  transform: translateX(20px) scale(1.05);\n  background: #7c3aed;\n}','<div class="elemento">Hover</div>',{kind:'Efecto'}),
        C('@keyframes','Animaciones','@keyframes define etapas que animation reproduce durante un tiempo.','.pulso {\n  width: 60px;\n  height: 60px;\n  margin: 18px auto;\n  border-radius: 50%;\n  background: #06b6d4;\n  animation: pulso 1.2s infinite alternate;\n}\n@keyframes pulso {\n  to { transform: scale(1.25); opacity: .55; }\n}','<div class="pulso" aria-label="Animación de pulso"></div>',{kind:'Animación'}),
        C('cascade','Cascada y especificidad','La cascada decide qué regla gana según origen, importancia, especificidad y orden.','p { color: #475569; }\n.aviso { color: #d97706; }\n#urgente { color: #dc2626; }','<p>Regla de etiqueta</p><p class="aviso">Regla de clase</p><p class="aviso" id="urgente">Regla de identificador</p>',{kind:'Arquitectura',tip:'Prefiere clases reutilizables y evita !important salvo casos excepcionales.'}),
        C('prefers-reduced-motion','Movimiento accesible','Esta media query reduce animaciones cuando el usuario así lo solicita.','.entrada {\n  animation: aparecer .6s ease-out;\n}\n@keyframes aparecer {\n  from { opacity: 0; transform: translateY(12px); }\n}\n@media (prefers-reduced-motion: reduce) {\n  .entrada { animation: none; }\n}','<p class="entrada">Animación respetuosa con las preferencias.</p>',{kind:'Accesibilidad'}),
        C('sistema CSS','Ejemplo integrador · Avanzado','Un componente reutilizable combina variables, tamaño fluido, cascada controlada, transición, animación y una alternativa accesible.',' :root {\n  --acento: #7c3aed;\n  --radio: 16px;\n}\n.perfil-avanzado {\n  padding: clamp(16px, 4vw, 28px);\n  border-radius: var(--radio);\n  color: white;\n  background: var(--acento);\n  transition: transform .25s;\n  animation: entrada-perfil .5s ease-out;\n}\n.perfil-avanzado:hover { transform: translateY(-5px); }\n.perfil-avanzado h3 { font-size: clamp(22px, 5vw, 36px); }\n@keyframes entrada-perfil {\n  from { opacity: 0; transform: translateY(14px); }\n}\n@media (prefers-reduced-motion: reduce) {\n  .perfil-avanzado { animation: none; transition: none; }\n}','<article class="perfil-avanzado">\n  <h3>Perfil avanzado</h3>\n  <p>Un componente adaptable, reutilizable y accesible.</p>\n</article>',{kind:'Ejemplo integrador',tip:'Las variables centralizan el tema, clamp adapta tamaños y prefers-reduced-motion evita imponer movimiento.'})
      ]
    }
  );

  buildNav();
  render();
})();
