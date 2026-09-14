(()=>{
  if(window.__cssDivLayoutAdded)return;
  window.__cssDivLayoutAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const C=(topic,name,description,css,html,tip='')=>T(
    topic,
    name,
    description,
    `${html}\n\n<style>\n${css}\n</style>`,
    `<style>${css}</style>${html}`,
    [],
    {kind:'CSS · manejo de div',tip}
  );

  sections.push({
    title:'CSS · Manejo de DIV · Filas y columnas',
    description:'Aprende paso a paso cómo organizar varios div: uno debajo del otro, uno al lado del otro, en fila, en columna, centrados, separados, ajustables, con salto de línea y con Grid. Cada ejemplo muestra el HTML, el CSS y el resultado real.',
    quote:'“El HTML crea las cajas; CSS decide cómo se distribuyen en el espacio.”',
    challenge:'Construye una zona con tres tarjetas: en escritorio deben estar una al lado de la otra y en móvil deben pasar a una sola columna.',
    group:'CSS',
    primaryArea:'CSS',
    areaOrder:25,
    items:[
      C(
        'display: block',
        'DIV normal · uno debajo del otro',
        'Un div es block por defecto. Eso significa que intenta ocupar el ancho disponible y el siguiente div comienza en una línea nueva. No necesitas Flexbox para obtener una columna básica.',
        `.bloque {\n  padding: 14px;\n  margin-bottom: 8px;\n  border-radius: 10px;\n  background: #dbeafe;\n}\n.bloque:nth-child(2) { background: #dcfce7; }\n.bloque:nth-child(3) { background: #fef3c7; }`,
        `<div class="bloque">DIV 1</div>\n<div class="bloque">DIV 2</div>\n<div class="bloque">DIV 3</div>`,
        'Si solo quieres elementos uno debajo del otro, el flujo normal del documento suele ser suficiente.'
      ),
      C(
        'display: flex',
        'DIV uno al lado del otro · fila',
        'Cuando el contenedor usa display:flex, sus hijos directos se convierten en flex items. La dirección inicial es row, por eso los div aparecen uno al lado del otro.',
        `.fila {\n  display: flex;\n  gap: 12px;\n}\n.fila > div {\n  flex: 1;\n  padding: 18px;\n  border-radius: 10px;\n  background: #dbeafe;\n  text-align: center;\n}`,
        `<div class="fila">\n  <div>DIV 1</div>\n  <div>DIV 2</div>\n  <div>DIV 3</div>\n</div>`,
        'display:flex se coloca en el padre, no en cada hijo.'
      ),
      C(
        'flex-direction: row',
        'Fila horizontal con flex-direction: row',
        'row ordena los hijos de izquierda a derecha en idiomas con escritura LTR. Es el valor predeterminado de flex-direction, pero escribirlo ayuda a entender la intención.',
        `.contenedor-row {\n  display: flex;\n  flex-direction: row;\n  gap: 10px;\n}\n.contenedor-row div {\n  padding: 14px 18px;\n  background: #e0e7ff;\n  border-radius: 9px;\n}`,
        `<div class="contenedor-row">\n  <div>Primero</div>\n  <div>Segundo</div>\n  <div>Tercero</div>\n</div>`,
        'row controla el eje principal horizontal.'
      ),
      C(
        'flex-direction: column',
        'Columna vertical con flex-direction: column',
        'column cambia el eje principal de Flexbox: los hijos se apilan verticalmente. Sigue siendo Flexbox, así que gap, justify-content y align-items continúan disponibles.',
        `.contenedor-column {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  max-width: 360px;\n}\n.contenedor-column div {\n  padding: 14px;\n  background: #dcfce7;\n  border-radius: 9px;\n}`,
        `<div class="contenedor-column">\n  <div>Arriba</div>\n  <div>Centro</div>\n  <div>Abajo</div>\n</div>`,
        'Usa column cuando necesites las herramientas de Flexbox pero con disposición vertical.'
      ),
      C(
        'row-reverse / column-reverse',
        'Invertir visualmente el orden',
        'row-reverse invierte la fila y column-reverse invierte la columna. Cambian la presentación visual, pero no debes usarlos para corregir un HTML mal ordenado, especialmente si el orden semántico importa para teclado o lectores de pantalla.',
        `.invertida {\n  display: flex;\n  flex-direction: row-reverse;\n  gap: 10px;\n}\n.invertida div {\n  padding: 12px 16px;\n  background: #fee2e2;\n  border-radius: 9px;\n}`,
        `<div class="invertida">\n  <div>1</div>\n  <div>2</div>\n  <div>3</div>\n</div>`,
        'Mantén el orden lógico en HTML y usa reverse solo cuando la presentación realmente lo necesite.'
      ),
      C(
        'gap',
        'Separar los DIV con gap',
        'gap crea espacio uniforme entre los hijos de Flexbox o Grid sin tener que colocar margin manual en cada div. También puedes usar row-gap y column-gap por separado.',
        `.con-gap {\n  display: flex;\n  gap: 24px;\n}\n.con-gap div {\n  flex: 1;\n  padding: 16px;\n  background: #fef3c7;\n  border-radius: 10px;\n}`,
        `<div class="con-gap">\n  <div>A</div>\n  <div>B</div>\n  <div>C</div>\n</div>`,
        'Para separar elementos de un layout, gap suele ser más limpio que aplicar margin a todos los hijos.'
      ),
      C(
        'justify-content',
        'Distribuir elementos en la fila',
        'justify-content controla cómo se distribuyen los elementos sobre el eje principal. En una fila ese eje es horizontal. Valores habituales: flex-start, center, flex-end, space-between, space-around y space-evenly.',
        `.distribuir {\n  display: flex;\n  justify-content: space-between;\n  gap: 8px;\n  padding: 12px;\n  border: 2px dashed #93c5fd;\n}\n.distribuir div {\n  padding: 12px;\n  border-radius: 8px;\n  background: #dbeafe;\n}`,
        `<div class="distribuir">\n  <div>Izquierda</div>\n  <div>Centro</div>\n  <div>Derecha</div>\n</div>`,
        'space-between deja el primer elemento al inicio y el último al final; el espacio restante queda entre los elementos.'
      ),
      C(
        'align-items',
        'Alinear los DIV verticalmente en una fila',
        'align-items trabaja sobre el eje transversal. Si flex-direction es row, normalmente controla la alineación vertical. center es muy usado para centrar iconos, textos y botones de distinta altura.',
        `.alinear {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  min-height: 140px;\n  padding: 12px;\n  background: #f8fafc;\n}\n.alinear div {\n  padding: 12px;\n  background: #e0f2fe;\n  border-radius: 8px;\n}\n.alinear div:nth-child(2) { padding-block: 30px; }`,
        `<div class="alinear">\n  <div>Pequeño</div>\n  <div>Más alto</div>\n  <div>Pequeño</div>\n</div>`,
        'Recuerda: justify-content sigue el eje principal; align-items trabaja sobre el eje transversal.'
      ),
      C(
        'flex-wrap',
        'Permitir que los DIV bajen a otra fila',
        'Por defecto Flexbox intenta mantener todos los hijos en una sola línea. flex-wrap:wrap permite que los elementos pasen a la siguiente fila cuando ya no caben.',
        `.envolver {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n.envolver div {\n  flex: 1 1 180px;\n  padding: 16px;\n  background: #ede9fe;\n  border-radius: 9px;\n}`,
        `<div class="envolver">\n  <div>Tarjeta 1</div>\n  <div>Tarjeta 2</div>\n  <div>Tarjeta 3</div>\n  <div>Tarjeta 4</div>\n</div>`,
        'flex:1 1 180px significa que el elemento puede crecer, reducirse y parte de un tamaño base aproximado de 180px.'
      ),
      C(
        'flex-grow / basis',
        'Dar más espacio a un DIV que a los demás',
        'Los elementos no tienen que ocupar el mismo ancho. flex permite decidir cuánto crece cada hijo y cuál es su tamaño base.',
        `.columnas-flex {\n  display: flex;\n  gap: 12px;\n}\n.lateral {\n  flex: 0 0 180px;\n  padding: 16px;\n  background: #fef3c7;\n}\n.principal {\n  flex: 1;\n  padding: 16px;\n  background: #dbeafe;\n}`,
        `<div class="columnas-flex">\n  <div class="lateral">Sidebar 180px</div>\n  <div class="principal">Contenido que ocupa el espacio restante</div>\n</div>`,
        'Este patrón es común para sidebar + contenido principal.'
      ),
      C(
        'display: grid',
        'DIV en columnas con CSS Grid',
        'Grid es ideal cuando quieres controlar filas y columnas al mismo tiempo. grid-template-columns:repeat(3,1fr) crea tres columnas iguales.',
        `.rejilla-div {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n.rejilla-div div {\n  padding: 18px;\n  border-radius: 10px;\n  background: #cffafe;\n  text-align: center;\n}`,
        `<div class="rejilla-div">\n  <div>1</div>\n  <div>2</div>\n  <div>3</div>\n  <div>4</div>\n  <div>5</div>\n  <div>6</div>\n</div>`,
        'Flexbox suele ser mejor para una sola dirección; Grid destaca cuando necesitas una rejilla bidimensional.'
      ),
      C(
        'minmax() / auto-fit',
        'Columnas responsivas sin media query',
        'Con repeat(auto-fit, minmax(...)) Grid crea tantas columnas como quepan. Cuando el espacio disminuye, las tarjetas bajan automáticamente a otra fila.',
        `.grid-responsive {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 12px;\n}\n.grid-responsive div {\n  padding: 18px;\n  border-radius: 10px;\n  background: #dcfce7;\n}`,
        `<div class="grid-responsive">\n  <div>Producto 1</div>\n  <div>Producto 2</div>\n  <div>Producto 3</div>\n  <div>Producto 4</div>\n</div>`,
        'Este patrón es excelente para galerías y tarjetas responsivas.'
      ),
      C(
        '@media + flex-direction',
        'Fila en escritorio y columna en móvil',
        'Un layout puede cambiar según el ancho de pantalla. Aquí los div se muestran en fila en pantallas amplias y pasan a columna cuando el viewport mide 600px o menos.',
        `.responsive-flex {\n  display: flex;\n  gap: 12px;\n}\n.responsive-flex div {\n  flex: 1;\n  padding: 18px;\n  border-radius: 10px;\n  background: #dbeafe;\n}\n@media (max-width: 600px) {\n  .responsive-flex {\n    flex-direction: column;\n  }\n}`,
        `<div class="responsive-flex">\n  <div>Tarjeta A</div>\n  <div>Tarjeta B</div>\n  <div>Tarjeta C</div>\n</div>`,
        'Reduce el ancho del navegador para comprobar cómo la fila se convierte en columna.'
      ),
      C(
        'layout completo',
        'Ejemplo completo · header, sidebar y contenido',
        'Este ejemplo combina una fila exterior, una columna lateral y una rejilla interior. Es un patrón común para paneles administrativos y páginas de catálogo.',
        `.pagina-demo {\n  display: flex;\n  gap: 14px;\n}\n.sidebar-demo {\n  flex: 0 0 170px;\n  padding: 16px;\n  border-radius: 10px;\n  background: #0f172a;\n  color: white;\n}\n.contenido-demo {\n  flex: 1;\n  min-width: 0;\n}\n.tarjetas-demo {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n  gap: 10px;\n}\n.tarjetas-demo div {\n  padding: 18px;\n  border-radius: 10px;\n  background: #e0f2fe;\n}\n@media (max-width: 650px) {\n  .pagina-demo { flex-direction: column; }\n  .sidebar-demo { flex-basis: auto; }\n}`,
        `<div class="pagina-demo">\n  <aside class="sidebar-demo">Menú lateral</aside>\n  <main class="contenido-demo">\n    <h3>Contenido</h3>\n    <div class="tarjetas-demo">\n      <div>Tarjeta 1</div>\n      <div>Tarjeta 2</div>\n      <div>Tarjeta 3</div>\n    </div>\n  </main>\n</div>`,
        'Primero decide qué contenedor controla cada grupo de hijos. Un layout complejo suele construirse con varios contenedores Flex/Grid anidados.'
      )
    ]
  });
})();
