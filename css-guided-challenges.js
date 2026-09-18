// Shared content for the library cards and the interactive challenge player.
window.CSS_GUIDED_CHALLENGES = [
  [
    "DIV 1 · Centrar un DIV en toda la pantalla",
    "Practica una de las tareas más comunes de CSS: colocar un contenedor exactamente en el centro horizontal y vertical de la pantalla.",
    "<main class=\"pantalla-div\">\n  <div class=\"caja-div\">Centro</div>\n</main>",
    ".pantalla-div { min-height:100vh; display:flex; justify-content:center; align-items:center; }\n.caja-div { width:220px; padding:24px; text-align:center; background:#dbeafe; border-radius:14px; }",
    "El padre controla la posición del hijo. Para centrar en ambos ejes usa Flexbox en el contenedor.",
    [
      "Centra el DIV sin usar position:absolute.",
      "Cambia min-height:100vh por 100dvh y compara.",
      "Haz que la caja tenga un ancho máximo responsive.",
      "Repite el ejercicio usando Grid y place-items:center."
    ],
    "Después resuélvelo una tercera vez con position:absolute + transform."
  ],
  [
    "DIV 2 · Tres DIVs en una fila",
    "Organiza tres DIVs hermanos en una fila, con el mismo ancho y separación uniforme.",
    "<div class=\"fila-divs\">\n  <div>Uno</div><div>Dos</div><div>Tres</div>\n</div>",
    ".fila-divs { display:flex; gap:16px; }\n.fila-divs > div { flex:1; padding:20px; background:#e0f2fe; border-radius:12px; text-align:center; }",
    "flex:1 permite que los DIVs hermanos compartan el espacio disponible.",
    [
      "Pon los tres DIVs en una sola fila.",
      "Haz que ocupen el mismo ancho.",
      "Agrega 16px de separación con gap.",
      "Convierte la fila en columna sin cambiar el HTML."
    ],
    "Haz que en pantallas pequeñas se apilen verticalmente."
  ],
  [
    "DIV 3 · Sidebar y contenido",
    "Construye un layout de dos DIVs: un menú lateral fijo y una zona principal flexible.",
    "<div class=\"layout-div\">\n  <div class=\"sidebar-div\">Menú</div>\n  <div class=\"contenido-div\">Contenido</div>\n</div>",
    ".layout-div { display:grid; grid-template-columns:200px 1fr; gap:16px; }\n.sidebar-div,.contenido-div { padding:20px; border-radius:12px; background:#e2e8f0; }",
    "Grid es muy cómodo cuando conoces la estructura de columnas que quieres.",
    [
      "Crea una columna de 200px y otra flexible.",
      "Agrega separación entre los DIVs.",
      "Haz que el contenido principal ocupe el espacio restante.",
      "En móvil cambia el layout a una sola columna."
    ],
    "Prueba una versión equivalente usando Flexbox."
  ],
  [
    "DIV 4 · DIV dentro de otro DIV",
    "Practica contenedores anidados y centra un DIV interno dentro de su DIV padre.",
    "<div class=\"padre-div\">\n  <div class=\"hijo-div\">Hijo</div>\n</div>",
    ".padre-div { min-height:220px; display:grid; place-items:center; padding:20px; background:#f1f5f9; }\n.hijo-div { width:160px; padding:18px; background:#c4b5fd; border-radius:12px; text-align:center; }",
    "Un DIV puede ser contenedor y elemento al mismo tiempo. Cada nivel puede tener su propio sistema de layout.",
    [
      "Centra el hijo en ambos ejes.",
      "Cambia el tamaño del padre y verifica que siga centrado.",
      "Agrega padding al padre sin romper el centrado.",
      "Añade otro DIV hijo y distribuye ambos."
    ],
    "Convierte el padre a Flexbox manteniendo el mismo resultado."
  ],
  [
    "DIV 5 · Superponer DIVs",
    "Superpone dos DIVs y controla cuál aparece encima usando position y z-index.",
    "<div class=\"escena-div\">\n  <div class=\"tarjeta-a\">A</div>\n  <div class=\"tarjeta-b\">B</div>\n</div>",
    ".escena-div { position:relative; min-height:220px; }\n.tarjeta-a,.tarjeta-b { position:absolute; width:160px; height:110px; display:grid; place-items:center; border-radius:14px; }\n.tarjeta-a { left:40px; top:40px; background:#bfdbfe; z-index:1; }\n.tarjeta-b { left:120px; top:85px; background:#c4b5fd; z-index:2; }",
    "z-index define el orden de apilamiento, pero normalmente necesitas elementos posicionados para controlarlo.",
    [
      "Superpone B parcialmente sobre A.",
      "Haz que B quede por encima de A.",
      "Intercambia los z-index y observa el cambio.",
      "Mueve ambas tarjetas sin usar margin."
    ],
    "Agrega un tercer DIV y crea tres capas visibles."
  ],
  [
    "DIV 6 · Galería responsive de DIVs",
    "Construye una galería de DIVs que use tres columnas en escritorio y una sola en móvil.",
    "<div class=\"galeria-divs\">\n  <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div>\n</div>",
    ".galeria-divs { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }\n.galeria-divs > div { min-height:90px; display:grid; place-items:center; background:#dcfce7; border-radius:12px; }\n@media (max-width:600px) { .galeria-divs { grid-template-columns:1fr; } }",
    "Responsive consiste en cambiar la organización cuando cambia el espacio disponible, no en duplicar el HTML.",
    [
      "Crea tres columnas iguales.",
      "Añade 14px de gap.",
      "En móvil usa una sola columna.",
      "Prueba repeat(auto-fit,minmax(160px,1fr))."
    ],
    "Haz una versión que use dos columnas en tablet y una en móvil."
  ],
  [
    "Reto guiado 1 · Caza el selector correcto",
    "Solo una tarjeta debe quedar resaltada. Practica selectores por clase, descendientes y combinación de clases. El reto consiste en modificar únicamente el elemento correcto sin afectar sus hermanos.",
    "<section class=\"arena-selectores\">\n  <article class=\"carta\">HTML</article>\n  <article class=\"carta objetivo\">CSS</article>\n  <article class=\"carta\">JavaScript</article>\n</section>",
    ".arena-selectores { display:flex; gap:10px; }\n.carta { padding:16px; border:2px solid #64748b; border-radius:10px; }\n.carta.objetivo { border-color:#22c55e; background:#dcfce7; transform:translateY(-4px); }",
    "Lee el HTML antes de escribir CSS. Si una regla afecta más elementos de los necesarios, el selector es demasiado amplio.",
    [
      "Haz que solo la tarjeta CSS tenga fondo verde.",
      "No uses id ni estilos inline.",
      "Después intenta resolverlo con un selector descendiente."
    ],
    "Añade una cuarta tarjeta y consigue que la regla siga afectando únicamente a .objetivo."
  ],
  [
    "Reto guiado 2 · Repara la caja",
    "La tarjeta necesita espacio interior, separación exterior y un ancho predecible. Este nivel entrena box model y box-sizing.",
    "<article class=\"caja-reto\">\n  <h3>Inventario</h3>\n  <p>3 objetos encontrados</p>\n</article>",
    "* { box-sizing:border-box; }\n.caja-reto { width:280px; margin:24px auto; padding:24px; border:4px solid #38bdf8; border-radius:16px; background:#e0f2fe; }",
    "Recuerda: margin separa la caja de otras cajas; padding separa el contenido de su borde.",
    [
      "Consigue un ancho final de 280px.",
      "Deja 24px entre contenido y borde.",
      "Centra la caja horizontalmente con margin."
    ],
    "Quita temporalmente box-sizing:border-box y observa cómo cambia el ancho real."
  ],
  [
    "Reto guiado 3 · Alinea la tripulación con Flexbox",
    "Debes colocar tres controles en una sola fila, separados y centrados verticalmente. Practica display:flex, justify-content, align-items y gap.",
    "<nav class=\"barra-juego\">\n  <strong>Jugador 1</strong>\n  <div class=\"acciones\"><button>Mapa</button><button>Inventario</button></div>\n  <span>⭐ 250</span>\n</nav>",
    ".barra-juego { display:flex; justify-content:space-between; align-items:center; gap:16px; padding:14px; background:#0f172a; color:white; border-radius:12px; }\n.acciones { display:flex; gap:8px; }",
    "Flexbox es ideal cuando el problema principal ocurre en una sola dirección: fila o columna.",
    [
      "Mantén jugador, acciones y puntuación en la misma fila.",
      "Distribuye el espacio sobrante entre los grupos.",
      "Separa los botones sin usar margin individual."
    ],
    "Cambia flex-direction a column y adapta la barra para pantallas pequeñas."
  ],
  [
    "Reto guiado 4 · Construye el tablero con CSS Grid",
    "Crea un tablero de seis casillas y haz que la casilla jefe ocupe dos columnas. Practica grid-template-columns, gap y grid-column.",
    "<section class=\"tablero-css\">\n  <div>1</div><div>2</div><div>3</div>\n  <div>4</div><div class=\"jefe\">BOSS</div>\n</section>",
    ".tablero-css { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; max-width:480px; }\n.tablero-css div { min-height:80px; display:grid; place-items:center; border-radius:12px; background:#ede9fe; font-weight:800; }\n.tablero-css .jefe { grid-column:span 2; background:#fecaca; }",
    "Grid es mejor que Flexbox cuando necesitas controlar filas y columnas al mismo tiempo.",
    [
      "Crea tres columnas iguales.",
      "Mantén 10px entre casillas.",
      "Haz que BOSS ocupe dos columnas."
    ],
    "Haz que la primera casilla ocupe dos filas usando grid-row."
  ],
  [
    "Reto guiado 5 · Atrapa la insignia",
    "Una etiqueta “NUEVO” debe quedar pegada a la esquina de una tarjeta sin salir disparada hacia la página. Practica relative y absolute.",
    "<article class=\"producto-juego\">\n  <span class=\"insignia-juego\">NUEVO</span>\n  <h3>Curso CSS</h3>\n  <p>Nivel intermedio</p>\n</article>",
    ".producto-juego { position:relative; padding:28px 18px 18px; border:1px solid #cbd5e1; border-radius:14px; }\n.insignia-juego { position:absolute; top:8px; right:8px; padding:4px 8px; border-radius:999px; background:#f97316; color:white; font-size:12px; }",
    "El elemento absolute busca el ancestro posicionado más cercano. Por eso el padre necesita position:relative.",
    [
      "Ubica NUEVO a 8px de arriba y derecha.",
      "No uses márgenes para empujarlo.",
      "Comprueba qué pasa al quitar position:relative del padre."
    ],
    "Añade otra insignia en la esquina inferior izquierda."
  ],
  [
    "Reto guiado 6 · Duelo de especificidad",
    "Predice qué color gana antes de abrir el navegador. Después simplifica las reglas para depender de clases y no de !important.",
    "<p id=\"mensaje-boss\" class=\"mensaje-boss alerta-boss\">Peligro detectado</p>",
    "p { color:#475569; }\n.mensaje-boss { color:#2563eb; }\n.alerta-boss { color:#f97316; }\n#mensaje-boss { color:#dc2626; }",
    "Cuando varias reglas coinciden, no gana “la última” siempre: primero importa la especificidad y después el orden cuando empatan.",
    [
      "Adivina el color final sin ejecutar el código.",
      "Elimina el selector por id y consigue el color deseado con clases.",
      "No uses !important."
    ],
    "Crea dos clases con la misma especificidad e intercambia su orden para observar la cascada."
  ],
  [
    "Reto guiado 7 · Botón con estados",
    "Haz que el botón responda visualmente a puntero, teclado y clic. Practica :hover, :focus-visible y :active.",
    "<button class=\"boton-mision\">Completar misión</button>",
    ".boton-mision { padding:12px 18px; border:0; border-radius:10px; background:#7c3aed; color:white; font-weight:700; cursor:pointer; transition:transform .15s, background .15s; }\n.boton-mision:hover { background:#6d28d9; }\n.boton-mision:focus-visible { outline:4px solid #c4b5fd; outline-offset:3px; }\n.boton-mision:active { transform:scale(.96); }",
    "No elimines el foco sin reemplazarlo. El usuario de teclado necesita saber qué control está activo.",
    [
      "Cambia el color al pasar el puntero.",
      "Muestra un foco visible con teclado.",
      "Reduce ligeramente el botón mientras se pulsa."
    ],
    "Añade un estado :disabled que comunique claramente que el botón no se puede usar."
  ],
  [
    "Reto guiado 8 · Rescate responsive",
    "El panel funciona en escritorio pero debe transformarse en una columna en pantallas pequeñas. Practica unidades fluidas y @media.",
    "<section class=\"panel-responsive\">\n  <aside>Menú</aside>\n  <main>Contenido principal</main>\n</section>",
    ".panel-responsive { display:grid; grid-template-columns:minmax(160px,220px) 1fr; gap:16px; width:min(900px,94%); margin:auto; }\n.panel-responsive > * { padding:20px; border-radius:12px; background:#e2e8f0; }\n@media (max-width:640px) { .panel-responsive { grid-template-columns:1fr; } }",
    "Responsive no significa crear otra página: significa permitir que el mismo layout cambie cuando el espacio disponible lo exige.",
    [
      "Usa dos columnas en escritorio.",
      "Convierte el layout en una sola columna por debajo de 640px.",
      "Evita anchos fijos que provoquen scroll horizontal."
    ],
    "Añade una tercera columna de estadísticas que desaparezca o se recolocque de forma útil en móvil."
  ],
  [
    "Reto guiado 9 · Cambia el tema con variables CSS",
    "Centraliza colores, radios y espacios para poder transformar toda la interfaz cambiando pocas variables.",
    "<article class=\"panel-tema\">\n  <h3>Perfil</h3>\n  <button>Editar</button>\n</article>",
    ":root { --fondo-juego:#0f172a; --texto-juego:#f8fafc; --acento-juego:#22c55e; --radio-juego:16px; }\n.panel-tema { padding:22px; border-radius:var(--radio-juego); background:var(--fondo-juego); color:var(--texto-juego); }\n.panel-tema button { border:0; padding:9px 14px; border-radius:8px; background:var(--acento-juego); }",
    "Si repites el mismo color en muchas reglas, probablemente es candidato para una variable.",
    [
      "Define al menos cuatro variables en :root.",
      "Usa var() en el componente.",
      "Cambia el tema editando únicamente los valores de las variables."
    ],
    "Crea [data-theme=\"claro\"] con otros valores para las mismas variables."
  ],
  [
    "Reto guiado 10 · Animación sin marear",
    "Crea una recompensa animada y añade una alternativa para usuarios que prefieren menos movimiento.",
    "<div class=\"recompensa-css\" aria-label=\"Recompensa obtenida\">★</div>",
    ".recompensa-css { width:72px; height:72px; display:grid; place-items:center; border-radius:50%; background:#facc15; font-size:36px; animation:recompensa 900ms ease-in-out infinite alternate; }\n@keyframes recompensa { to { transform:translateY(-10px) rotate(8deg); } }\n@media (prefers-reduced-motion:reduce) { .recompensa-css { animation:none; } }",
    "Una animación útil debe comunicar algo o mejorar la experiencia; no debería impedir leer ni interactuar.",
    [
      "Crea una animación con @keyframes.",
      "Anima transform en lugar de propiedades costosas como top/left cuando sea posible.",
      "Desactívala con prefers-reduced-motion."
    ],
    "Haz que la animación ocurra solo al pasar el puntero en vez de repetirse infinitamente."
  ],
  [
    "Proyecto final guiado · HUD responsive de videojuego",
    "Combina varias habilidades en un único reto: variables, Grid, Flexbox, pseudoclases, barras de progreso y responsive. El objetivo es construir una interfaz completa sin frameworks CSS.",
    "<section class=\"hud-css\">\n  <header><strong>CSS QUEST</strong><span>Nivel 10</span></header>\n  <div class=\"hud-grid\">\n    <article><h3>Vida</h3><div class=\"barra\"><span class=\"vida\"></span></div></article>\n    <article><h3>XP</h3><div class=\"barra\"><span class=\"xp\"></span></div></article>\n    <article class=\"mision\"><h3>Misión</h3><p>Construye un layout responsive.</p><button>Completar</button></article>\n  </div>\n</section>",
    ":root { --hud:#0f172a; --card:#1e293b; --text:#f8fafc; --ok:#22c55e; --xp:#38bdf8; }\n.hud-css { max-width:760px; margin:auto; padding:20px; border-radius:18px; background:var(--hud); color:var(--text); }\n.hud-css header { display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; }\n.hud-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; }\n.hud-grid article { padding:16px; border-radius:12px; background:var(--card); }\n.mision { grid-column:1 / -1; }\n.barra { height:10px; overflow:hidden; border-radius:999px; background:#334155; }\n.barra span { display:block; height:100%; }\n.vida { width:78%; background:var(--ok); }\n.xp { width:54%; background:var(--xp); }\n.mision button { padding:9px 14px; border:0; border-radius:9px; cursor:pointer; }\n.mision button:hover { transform:translateY(-2px); }\n@media (max-width:560px) { .hud-grid { grid-template-columns:1fr; } .mision { grid-column:auto; } }",
    "El boss final no introduce una propiedad nueva: comprueba si sabes combinar las herramientas anteriores para resolver un diseño completo.",
    [
      "Reproduce el HUD sin copiar primero la solución.",
      "Usa Flexbox en el encabezado y Grid en las tarjetas.",
      "Crea dos barras de progreso solo con HTML y CSS.",
      "Adapta el diseño a móvil con @media."
    ],
    "Crea tu propia versión cambiando tema, espaciado y layout, pero conserva una jerarquía visual clara."
  ]
];

window.CSS_GUIDED_CHALLENGES.push(
  ['Reto extra 1 · Texto largo sin romper la tarjeta',
    'Controla títulos largos con elipsis sin ocultar el resto de la tarjeta.',
    '<article class="tarjeta-texto"><h3 class="titulo-largo">Una misión extraordinariamente larga para practicar CSS</h3><p>El contenido inferior permanece visible.</p></article>',
    '.tarjeta-texto{width:280px;padding:20px;background:#e0f2fe;border-radius:14px}.titulo-largo{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
    'La elipsis necesita un ancho limitado, una sola línea y contenido recortado.',
    ['Limita el título a una línea.','Recorta el desbordamiento solo del título.','Muestra puntos suspensivos al final.'],
    'Prueba un título corto y confirma que no aparecen puntos innecesarios.',
    {mission:['Completa .titulo-largo con white-space:nowrap, overflow:hidden y text-overflow:ellipsis.', ['white-space:nowrap;','overflow:hidden;','text-overflow:ellipsis'], [['.titulo-largo',['white-space','overflow-x','text-overflow']]]],why:'white-space evita el salto de línea; overflow recorta; text-overflow indica cómo señalar el texto recortado.',mistake:'Poner overflow en toda la tarjeta también puede recortar botones, sombras o menús.',verify:'El título termina en puntos suspensivos y el párrafo inferior sigue visible.'}],
  ['Reto extra 2 · Panel con desplazamiento',
    'Construye una lista que pueda desplazarse dentro de una altura fija.',
    '<section class="registro"><p>Misión 1 completada</p><p>Misión 2 completada</p><p>Misión 3 completada</p><p>Misión 4 completada</p><p>Misión 5 completada</p><p>Misión 6 completada</p></section>',
    '.registro{height:140px;overflow-y:auto;padding:16px;border:2px solid #38bdf8;border-radius:12px;background:#e0f2fe}.registro p{margin:0;padding:12px;border-bottom:1px solid #94a3b8}',
    'Sin altura limitada, el contenedor crece y no necesita desplazamiento interno.',
    ['Fija la altura en 140px.','Activa el desplazamiento vertical cuando sea necesario.','Desplázate hasta la misión 6.'],
    'Compara overflow-y:auto con hidden: ¿en cuál puedes llegar al último elemento?',
    {mission:['Completa .registro con height:140px y overflow-y:auto.', ['height:140px;','overflow-y:auto;'], [['.registro',['height','overflow-y']]]],why:'La altura define la ventana visible; auto permite recorrer el contenido que excede ese espacio.',mistake:'overflow:hidden recorta la lista e impide recorrerla con la barra de desplazamiento.',verify:'Usa la rueda o el gesto de desplazamiento dentro del panel y llega a la misión 6.'}],
  ['Reto extra 3 · Portada con proporción estable',
    'Mantén una proporción 16:9 aunque cambie el ancho disponible.',
    '<div class="portada-ratio">16 : 9</div>',
    '.portada-ratio{width:100%;aspect-ratio:16 / 9;display:grid;place-items:center;background:#c4b5fd;border-radius:16px;font-size:28px}',
    'Con width definido y height automático, aspect-ratio calcula la altura.',
    ['Ocupa todo el ancho disponible.','Mantén la relación 16:9.','Comprueba el resultado a dos anchos.'],
    'Prueba 1 / 1 para construir una portada cuadrada.',
    {mission:['Añade aspect-ratio:16 / 9 a .portada-ratio. Conserva width:100% y deja la altura automática.', ['aspect-ratio:16 / 9;'], [['.portada-ratio',['aspect-ratio','height']]],800],why:'La proporción expresa ancho dividido por alto. Al reducir el ancho, el navegador recalcula el alto sin una media query.',mistake:'Una altura fija puede impedir que la caja cambie de alto según la proporción.',verify:'Comprobar revisa la proporción y la altura a 800px y 360px.'}],
  ['Reto extra 4 · Avatar sin deformación',
    'Recorta una imagen rectangular dentro de un avatar cuadrado sin estirarla.',
    '<img class="avatar-reto" alt="Paisaje de ejemplo" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'150\'%3E%3Crect width=\'300\' height=\'150\' fill=\'%2393c5fd\'/%3E%3Ccircle cx=\'150\' cy=\'75\' r=\'55\' fill=\'%23facc15\'/%3E%3C/svg%3E">',
    '.avatar-reto{width:140px;height:140px;object-fit:cover;object-position:center;border-radius:50%;border:4px solid #2563eb}',
    'cover conserva la proporción de la imagen, llena la caja y recorta el sobrante.',
    ['Mantén la caja de 140px por 140px.','Usa cover para evitar deformaciones.','Centra el recorte.'],
    'Cambia a contain y observa el espacio que queda libre.',
    {mission:['Completa .avatar-reto con object-fit:cover y object-position:center.', ['object-fit:cover;','object-position:center;'], [['.avatar-reto',['object-fit','object-position']]]],why:'El tamaño de la caja y la proporción del archivo son distintos. object-fit decide cómo encajar el archivo dentro de esa caja.',mistake:'Asignar width y height sin object-fit puede estirar la imagen: el círculo amarillo se vuelve una elipse.',verify:'El círculo amarillo conserva su forma y el avatar queda completamente lleno.'}],
  ['Reto extra 5 · Catálogo sin breakpoints',
    'Deja que Grid decida cuántas tarjetas caben según el espacio disponible.',
    '<section class="catalogo-auto"><article>HTML</article><article>CSS</article><article>JS</article><article>APIs</article></section>',
    '.catalogo-auto{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px}.catalogo-auto article{padding:24px;background:#bbf7d0;border-radius:12px}',
    'minmax establece el mínimo de cada columna; auto-fit calcula cuántas caben.',
    ['Define columnas con un mínimo de 140px.','Reparte el espacio sobrante con 1fr.','Deja 12px de separación.'],
    'Compara auto-fit con auto-fill al dejar solo dos tarjetas.',
    {mission:['Completa grid-template-columns:repeat(auto-fit,minmax(140px,1fr)) y gap:12px.', ['grid-template-columns:repeat(auto-fit,minmax(140px,1fr));','gap:12px'], [['.catalogo-auto',['grid-template-columns','gap']]],800],why:'Cada columna necesita al menos 140px; cuando deja de caber, Grid coloca la tarjeta en otra fila.',mistake:'repeat(4,1fr) obliga a conservar cuatro columnas incluso cuando las tarjetas quedan demasiado estrechas.',verify:'En 800px caben cuatro tarjetas en una fila; en 360px se distribuyen en dos columnas.'}],
  ['Reto extra 6 · Icono que no se encoge',
    'Protege el ancho de un icono dentro de una fila Flexbox con texto largo.',
    '<div class="aviso-flex"><span class="icono-flex">!</span><p>Esta explicación ocupa varias palabras y comparte una fila con un icono que debe conservar su tamaño.</p></div>',
    '.aviso-flex{display:flex;gap:16px;width:300px;padding:16px;background:#e0f2fe}.icono-flex{width:64px;height:64px;flex-shrink:0;display:grid;place-items:center;background:#38bdf8;border-radius:12px;font-size:28px}.aviso-flex p{margin:0}',
    'En un contenedor flex, width no garantiza por sí solo que el elemento conserve ese ancho.',
    ['Conserva el icono con 64px de ancho.','Desactiva su encogimiento.','Permite que el texto ocupe varias líneas.'],
    'Añade flex-shrink:0 también al texto y observa por qué puede aparecer desbordamiento.',
    {mission:['Añade flex-shrink:0 a .icono-flex para conservar sus 64px de ancho.', ['flex-shrink:0;'], [['.icono-flex',['flex-shrink','width']]]],why:'Flexbox reparte la falta de espacio encogiendo sus elementos. flex-shrink:0 excluye el icono de ese reparto.',mistake:'Aumentar width no resuelve la causa: Flexbox todavía puede reducir el ancho calculado.',verify:'El icono mantiene 64px y el texto se ajusta al espacio restante.'}],
  ['Reto extra 7 · Alinear una tarjeta diferente',
    'Usa align-self para cambiar la alineación de un solo elemento.',
    '<section class="equipo-self"><div>A</div><div class="especial-self">B</div><div>C</div></section>',
    '.equipo-self{display:flex;align-items:flex-start;gap:12px;height:220px;padding:16px;border:2px dashed #94a3b8}.equipo-self>div{padding:20px;background:#ddd6fe;border-radius:10px}.especial-self{align-self:flex-end}',
    'align-items define el valor del grupo; align-self lo sobrescribe para un hijo.',
    ['Conserva A y C arriba.','Alinea solo B abajo.','No cambies align-items del padre.'],
    'Cambia flex-direction a column y observa cómo cambia el eje transversal.',
    {mission:['Añade align-self:flex-end solo a .especial-self.', ['align-self:flex-end'], [['.especial-self',['align-self']],['.equipo-self',['align-items']]]],why:'En una fila, el eje transversal es vertical; flex-end coloca B en la parte inferior del espacio disponible.',mistake:'Cambiar align-items del padre mueve las tres tarjetas en lugar de una sola.',verify:'A y C permanecen arriba mientras B se sitúa abajo.'}],
  ['Reto extra 8 · Texto que cabe en una columna',
    'Evita que una palabra muy larga desborde una tarjeta estrecha.',
    '<article class="enlace-largo">https://ejemplo.test/una-ruta-extraordinariamente-larga-sin-espacios-para-probar-el-ajuste</article>',
    '.enlace-largo{width:240px;padding:20px;background:#fef3c7;border-radius:12px;overflow-wrap:anywhere}',
    'overflow-wrap permite romper una palabra cuando no cabe en el ancho disponible.',
    ['Conserva el ancho de 240px.','Permite cortar la ruta larga entre caracteres.','Mantén todo el texto visible.'],
    'Compara anywhere con break-word dentro de una columna Grid.',
    {mission:['Añade overflow-wrap:anywhere a .enlace-largo.', ['overflow-wrap:anywhere'], [['.enlace-largo',['overflow-wrap','width']]]],why:'El navegador suele partir líneas por espacios. Una URL larga puede no tener puntos de corte suficientes.',mistake:'overflow:hidden oculta parte del contenido; no lo ajusta en líneas nuevas.',verify:'La URL completa se distribuye en varias líneas sin salir de la tarjeta.'}],
  ['Reto extra 9 · Encabezado fijo dentro del panel',
    'Mantén un encabezado visible mientras se desplaza su lista.',
    '<section class="panel-sticky"><h3>Misiones pendientes</h3><p>Explorar</p><p>Construir</p><p>Revisar</p><p>Probar</p><p>Completar</p></section>',
    '.panel-sticky{height:180px;overflow:auto;border:2px solid #94a3b8}.panel-sticky h3{position:sticky;top:0;margin:0;padding:12px;background:#0f172a;color:white}.panel-sticky p{padding:14px;margin:0;border-bottom:1px solid #cbd5e1}',
    'sticky necesita un desplazamiento como top:0 y un contenedor que pueda desplazarse.',
    ['Activa position:sticky en el encabezado.','Fija su umbral superior a cero.','Desplaza el panel hasta el final.'],
    'Compara con fixed: observa a qué superficie queda vinculado el encabezado.',
    {mission:['Completa el h3 con position:sticky y top:0; conserva overflow:auto en el panel.', ['position:sticky;','top:0;'], [['.panel-sticky h3',['position','top']],['.panel-sticky',['overflow-y']]]],why:'sticky participa en el flujo normal hasta llegar al borde indicado; entonces permanece visible dentro de su contenedor.',mistake:'Sin top, el encabezado no tiene un umbral desde el que comenzar a fijarse.',verify:'Desplaza la lista: el título sigue visible y las misiones pasan por debajo.'}],
  ['Reto extra 10 · Dashboard con áreas de Grid',
    'Organiza encabezado, menú y contenido mediante nombres de áreas.',
    '<section class="areas-reto"><header>Dashboard</header><aside>Menú</aside><main>Contenido</main></section>',
    '.areas-reto{display:grid;grid-template-columns:140px 1fr;grid-template-areas:"cabecera cabecera" "menu contenido";gap:12px}.areas-reto>*{padding:24px;background:#dbeafe;border-radius:10px}.areas-reto header{grid-area:cabecera}.areas-reto aside{grid-area:menu}.areas-reto main{grid-area:contenido}',
    'Cada fila del mapa usa una cadena de texto; un nombre repetido une celdas en una misma área.',
    ['Haz que cabecera ocupe las dos columnas.','Coloca menu abajo a la izquierda.','Coloca contenido abajo a la derecha.'],
    'Añade una media query que use una sola columna y reordene las áreas.',
    {mission:['Asigna grid-area:cabecera al header, menu al aside y contenido al main.', ['grid-area:cabecera','grid-area:menu','grid-area:contenido'], [['.areas-reto header,.areas-reto aside,.areas-reto main',['grid-area']]]],why:'El padre define el mapa con grid-template-areas; cada hijo elige su región usando grid-area.',mistake:'Los nombres deben coincidir exactamente. Un nombre distinto puede crear colocaciones implícitas inesperadas.',verify:'El encabezado ocupa todo el ancho; debajo aparecen menú de 140px y contenido flexible.'}]
);



window.CSS_GUIDED_CHALLENGES.push(
  ['DIV 7 · Contenedor centrado con ancho máximo',
    'Haz que un DIV aproveche el espacio disponible sin crecer demasiado en escritorio.',
    '<div class="div-limitado"><h3>Contenido principal</h3><p>Este contenedor se adapta al espacio disponible.</p></div>',
    '.div-limitado{width:100%;max-width:600px;margin:0 auto;padding:24px;background:#dbeafe;border-radius:14px}',
    'width:100% permite reducir el ancho; max-width lo limita y los márgenes automáticos reparten el espacio sobrante.',
    ['Ocupa el ancho disponible.','Limita el ancho a 600px.','Centra el contenedor con márgenes automáticos.'],
    'Cambia el límite a 480px y explica por qué el DIV sigue centrado.',
    {mission:['Completa .div-limitado con max-width:600px y margin:0 auto. Conserva width:100%.',['max-width:600px','margin:0 auto'],[['.div-limitado',['width','max-width','margin-left','margin-right']]],800],why:'El ancho fluido evita desbordamientos en móvil; el máximo mantiene líneas de texto cómodas en escritorio.',mistake:'width:600px fija el tamaño incluso cuando el espacio disponible es menor.',verify:'A 800px mide 600px y queda centrado; a 360px se reduce sin salir del escenario.'}],
  ['DIV 8 · Seleccionar hijos sin alterar nietos',
    'Da espacio interior solo a los DIVs hijos directos y conserva el contenido anidado.',
    '<div class="div-arbol"><div class="div-rama">Hijo A<div class="div-hoja">Nieto A</div></div><div class="div-rama">Hijo B<div class="div-hoja">Nieto B</div></div></div>',
    '.div-arbol{display:flex;gap:16px}.div-rama{flex:1;background:#dbeafe;border-radius:12px}.div-hoja{background:#c4b5fd;margin-top:12px}.div-arbol > div{padding:20px}',
    'El combinador > selecciona únicamente el primer nivel de hijos.',
    ['Aplica 20px de padding a los hijos directos.','No añadas padding a los nietos.','Compara el selector con .div-arbol div.'],
    'Añade un tercer nivel de DIVs y comprueba qué elementos selecciona cada combinador.',
    {mission:['Completa .div-arbol > div con padding:20px. Los DIVs .div-hoja deben conservar padding:0.',['padding:20px'],[['.div-rama,.div-hoja',['padding']]]],why:'Un espacio selecciona descendientes de cualquier profundidad; > permite controlar un nivel concreto del árbol HTML.',mistake:'Usar .div-arbol div también modifica los nietos y acumula espacio interior.',verify:'Los dos hijos tienen 20px de padding; los nietos morados no reciben ese espacio adicional.'}],
  ['DIV 9 · Ocultar conservando o quitando espacio',
    'Compara dos formas de ocultar un DIV y observa su efecto sobre los demás.',
    '<div class="div-visibilidad"><div>A</div><div class="div-reserva">B</div><div class="div-quitar">C</div><div>D</div></div>',
    '.div-visibilidad{display:flex;gap:12px}.div-visibilidad>div{width:60px;height:60px;display:grid;place-items:center;background:#bbf7d0;border-radius:10px}.div-visibilidad .div-reserva{visibility:hidden}.div-visibilidad .div-quitar{display:none}',
    'visibility:hidden conserva la caja; display:none elimina su participación en el layout.',
    ['Oculta B conservando su hueco.','Oculta C quitando su hueco.','Observa la nueva posición de D.'],
    'Prueba opacity:0 en B: a diferencia de estas opciones, puede seguir recibiendo interacciones.',
    {mission:['Usa visibility:hidden en .div-reserva y display:none en .div-quitar.',['visibility:hidden','display:none'],[['.div-reserva',['visibility','display']],['.div-quitar',['display']],['.div-visibilidad>div:first-child,.div-visibilidad>div:last-child',['visibility','display']]]],why:'Ocultar visualmente una caja no siempre cambia su espacio. La elección depende de si los demás elementos deben recolocarse.',mistake:'Usar opacity:0 para quitar espacio no funciona: la caja sigue ocupándolo y puede seguir interceptando clics.',verify:'Se ven A y D, con un hueco reservado para B y sin caja ni hueco propios para C.'}],
  ['DIV 10 · Tarjetas que saltan de fila',
    'Distribuye cuatro DIVs y permite que cambien de fila sin desbordar el contenedor.',
    '<div class="div-wrap"><div>HTML</div><div>CSS</div><div>JavaScript</div><div>APIs</div></div>',
    '.div-wrap{display:flex;flex-wrap:wrap;gap:16px}.div-wrap>div{flex:1 1 180px;padding:24px;background:#e0f2fe;border-radius:12px}',
    'El padre permite envolver; flex-basis propone el ancho inicial de cada hijo.',
    ['Activa flex-wrap en el padre.','Conserva la base de 180px de cada hijo.','Revisa el resultado en móvil y escritorio.'],
    'Cambia la base a 240px y observa cuántas tarjetas caben en una fila.',
    {mission:['Añade flex-wrap:wrap a .div-wrap. Conserva gap:16px y flex:1 1 180px en los hijos.',['flex-wrap:wrap'],[['.div-wrap',['flex-wrap','gap']],['.div-wrap>div',['flex-basis','width']]],800],why:'wrap crea otra línea cuando la suma de las bases y los espacios ya no cabe. flex-grow reparte el espacio sobrante de cada fila.',mistake:'Sin wrap, los hijos intentan encogerse en una única fila aunque su contenido quede demasiado estrecho.',verify:'En 800px caben cuatro tarjetas; en 360px se apilan sin desbordar horizontalmente.'}],
  ['DIV 11 · Centrar un hijo sin mover a los demás',
    'Usa Grid para centrar solo uno de los DIVs dentro de su propia celda.',
    '<div class="div-celdas"><div>A</div><div class="div-elegido">B</div><div>C</div></div>',
    '.div-celdas{display:grid;grid-template-columns:repeat(3,1fr);min-height:180px;gap:12px;border:2px dashed #94a3b8}.div-celdas>div{padding:20px;background:#ddd6fe;border-radius:10px}.div-elegido{place-self:center}',
    'place-self combina align-self y justify-self para un único elemento de Grid.',
    ['Centra B en ambos ejes de su celda.','Conserva el estiramiento de A y C.','No cambies la alineación global del padre.'],
    'Prueba place-self:end y observa qué esquina ocupa B.',
    {mission:['Añade place-self:center a .div-elegido sin cambiar la alineación del contenedor.',['place-self:center'],[['.div-elegido',['align-self','justify-self']],['.div-celdas>div:first-child,.div-celdas>div:last-child',['align-self','justify-self']],['.div-celdas',['align-items','justify-items']]]],why:'Las propiedades self afectan a un hijo; las propiedades items del padre afectan a todos sus elementos.',mistake:'place-items:center en el padre también centra A y C, por lo que no cumple esta misión.',verify:'B queda centrado y ajustado a su contenido; A y C siguen llenando sus celdas.'}],
  ['DIV 12 · Panel anidado con Grid y Flexbox',
    'Combina dos sistemas de distribución: Grid para el panel y Flexbox para su barra de acciones.',
    '<div class="div-panel"><div class="div-menu">Menú</div><div class="div-contenido"><h3>Proyecto</h3><p>Cada contenedor organiza a sus hijos.</p><div class="div-acciones"><button>Guardar</button><button>Vista previa</button></div></div></div>',
    '.div-panel{display:grid;grid-template-columns:160px 1fr;gap:16px}.div-menu,.div-contenido{padding:20px;background:#dbeafe;border-radius:12px}.div-acciones{display:flex;justify-content:flex-end;gap:8px}.div-acciones button{padding:8px;border:0;border-radius:6px;background:#1d4ed8;color:white}@media(max-width:600px){.div-panel{grid-template-columns:1fr}}',
    'El padre principal controla menú y contenido; la barra interior controla únicamente sus botones.',
    ['Crea columnas de 160px y 1fr.','Alinea los botones a la derecha con 8px de separación.','Usa una columna hasta 600px.'],
    'Añade una barra superior que abarque ambas columnas usando grid-column:1 / -1.',
    {mission:['Completa las columnas 160px 1fr del panel y justify-content:flex-end en la barra. Conserva la media query móvil.',['grid-template-columns:160px 1fr','justify-content:flex-end'],[['.div-panel',['grid-template-columns']],['.div-acciones',['display','justify-content','gap']]],800],why:'Grid y Flexbox pueden convivir en niveles distintos: uno resuelve la estructura y el otro la alineación local.',mistake:'Aplicar justify-content al panel principal no alinea los botones internos; no son sus hijos directos.',verify:'En escritorio aparece el menú lateral y los botones a la derecha; en móvil el panel cambia a una columna.'}]
);

window.CSS_GUIDED_CHALLENGES.push(
  ['Proyecto · Tarjeta de presentación de Dilan',
    'Reproduce la tarjeta de la referencia: encabezado azul con nombre y ocupación, fotografía a la izquierda y presentación con hobbies a la derecha. Combina DIVs, Grid, espaciado y diseño responsive.',
    '<div class="perfil-dilan">\n  <header class="perfil-cabecera">\n    <h1>Hola, soy Dilan</h1>\n    <p>Estudiante de desarrollo web</p>\n  </header>\n  <div class="perfil-cuerpo">\n    <img class="perfil-foto" src="assets/perfil-montanas.jpg" alt="Lago rodeado de montañas">\n    <div class="perfil-info">\n      <section>\n        <h2>Sobre mí</h2>\n        <p>Me gusta la tecnología, aprender cosas nuevas y los autos.</p>\n      </section>\n      <section>\n        <h2>Mis hobbies</h2>\n        <ul>\n          <li>Videojuegos</li>\n          <li>Automóviles</li>\n          <li>Programación</li>\n          <li>Música</li>\n        </ul>\n      </section>\n    </div>\n  </div>\n</div>',
    '.perfil-dilan{width:100%;max-width:460px;margin:0 auto;padding:8px;background:#fff;border:1px solid #dbe3eb;border-radius:10px;box-shadow:0 4px 12px rgba(15,23,42,.12);color:#142334}\n.perfil-cabecera{background:#0e3051;color:#fff;text-align:center;padding:12px 8px;border-radius:7px}\n.perfil-cabecera h1{margin:0 0 4px;font-size:26px;line-height:1.2}\n.perfil-cabecera p{margin:0;font-size:14px}\n.perfil-cuerpo{display:grid;grid-template-columns:42% 1fr;gap:16px;padding:14px 6px 8px}\n.perfil-foto{display:block;width:100%;height:210px;object-fit:cover;border-radius:7px}\n.perfil-info{min-width:0;font-size:14px;line-height:1.5}\n.perfil-info h2{font-size:17px;margin:2px 0 8px}\n.perfil-info p{margin:0 0 18px}\n.perfil-info ul{margin:0;padding-left:20px}\n@media(max-width:380px){.perfil-cuerpo{grid-template-columns:1fr}.perfil-foto{height:180px}}',
    'Construye primero el encabezado; después distribuye los dos hijos de .perfil-cuerpo con Grid. El texto y la imagen pertenecen a columnas diferentes.',
    ['Centra el perfil con max-width:460px y margin:0 auto.','Da al encabezado fondo #0e3051, texto blanco y alineación centrada.','Distribuye foto y texto en columnas 42% y 1fr con gap:16px.','Recorta la imagen con object-fit:cover sin deformarla.','A 380px o menos, apila el contenido en una sola columna.'],
    'Personaliza nombre, presentación y hobbies; conserva la estructura y prueba a navegar con zoom del 200%.',
    {mission:['Completa el encabezado con background:#0e3051 y text-align:center. En .perfil-cuerpo usa display:grid, columnas 42% 1fr y gap:16px. En la foto añade object-fit:cover. Hasta 380px usa una columna.', ['background:#0e3051','text-align:center','display:grid','grid-template-columns:42% 1fr','gap:16px','object-fit:cover','grid-template-columns:1fr'], [['.perfil-cabecera',['background-color','color','text-align']],['.perfil-cuerpo',['display','grid-template-columns','gap']],['.perfil-foto',['object-fit','width','height']]],800],why:'El encabezado ocupa el ancho completo porque está fuera del Grid del cuerpo. Grid distribuye solo la foto y el bloque de información; object-fit conserva la proporción del paisaje al recortarlo.',mistake:'No apliques Grid a toda la tarjeta: el encabezado terminaría compartiendo columnas con el contenido. Evita fijar el ancho del texto, porque debe aprovechar el espacio restante.',verify:'A 800px verás el encabezado encima, foto a la izquierda y dos secciones a la derecha. A 360px se apilan foto y texto en una columna. Comprobar revisa ambos anchos.'}]
);
