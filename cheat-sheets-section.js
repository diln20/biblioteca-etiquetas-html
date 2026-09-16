(()=>{
  if(window.__cheatSheetsAdded)return;
  window.__cheatSheetsAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const lines=(...items)=>items.join('\n');
  const preview=(title,body)=>`<section style="font-family:system-ui;padding:16px;border:1px solid #334155;border-radius:12px;background:#07111f;color:#e5edf8"><strong style="display:block;margin-bottom:8px;color:#facc15">${title}</strong>${body}</section>`;
  const C=(kind,tag,name,description,code,previewHtml,tip)=>T(tag,name,description,code,previewHtml,[],{
    kind:`Chuleta · ${kind}`,
    tip,
    guideTitle:'Cómo usar esta chuleta',
    guide:[['Consultar','Referencia rápida','Busca el bloque que necesitas, copia la sintaxis y adapta nombres, textos y valores a tu proyecto.']],
    codeLabel:`Sintaxis rápida · ${kind}`,
    filesToCreateTitle:'Archivos necesarios',
    filesToCreate:[],
    filesToCreateStatus:'Esta sección es una referencia rápida: no necesitas crear archivos adicionales para consultarla.'
  });

  sections.push({
    title:'HTML · Chuleta rápida',
    navLabel:'Chuleta HTML',
    group:'HTML',primaryArea:'HTML',course:'HTML',areaOrder:990,
    description:'Referencia rápida de las etiquetas, atributos y estructuras HTML que más se usan. Está pensada para consultar sintaxis en segundos mientras construyes una página.',
    quote:'“HTML define qué existe en la página y qué significado tiene cada parte.”',
    items:[
      C('HTML','html estructura','1. Documento HTML mínimo','La base de casi cualquier documento HTML: doctype, idioma, metadatos, título y contenido visible.',lines(
        '<!doctype html>',
        '<html lang="es">',
        '<head>',
        '  <meta charset="UTF-8">',
        '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
        '  <title>Mi página</title>',
        '</head>',
        '<body>',
        '  <h1>Hola mundo</h1>',
        '</body>',
        '</html>'
      ),preview('Estructura','<p style="margin:0">head = información del documento · body = contenido visible.</p>'),'Empieza por esta estructura cuando crees una página desde cero.'),
      C('HTML','texto semantica','2. Texto y jerarquía','Usa h1-h6 para títulos, p para párrafos y etiquetas semánticas para dar significado a fragmentos de texto.',lines(
        '<h1>Título principal</h1>',
        '<h2>Sección</h2>',
        '<p>Un párrafo con <strong>importancia</strong>.</p>',
        '<p>Un texto con <em>énfasis</em>.</p>',
        '<mark>Texto resaltado</mark>',
        '<small>Texto secundario</small>',
        '<br>',
        '<hr>'
      ),preview('Texto','<h3 style="margin:0 0 6px">Título</h3><p style="margin:0">Párrafo con <strong>importancia</strong>.</p>'),'Mantén una jerarquía lógica de títulos; no elijas h1-h6 solo por su tamaño visual.'),
      C('HTML','links images','3. Enlaces e imágenes','a crea enlaces e img muestra imágenes. Usa alt para describir imágenes relevantes y target con rel cuando abras otra pestaña.',lines(
        '<a href="https://example.com">Visitar sitio</a>',
        '<a href="contacto.html">Ir a contacto</a>',
        '<a href="#precios">Ir a precios</a>',
        '<a href="https://example.com" target="_blank" rel="noopener noreferrer">Abrir aparte</a>',
        '',
        '<img src="foto.jpg" alt="Descripción de la imagen" width="480">'
      ),preview('Enlace + imagen','<a href="#" style="color:#60a5fa">Abrir enlace</a><p style="margin:8px 0 0">img necesita src y normalmente alt.</p>'),'Si una imagen es puramente decorativa, usa alt="".'),
      C('HTML','listas','4. Listas','ul crea listas sin orden, ol listas ordenadas y dl pares de término y descripción.',lines(
        '<ul>',
        '  <li>HTML</li>',
        '  <li>CSS</li>',
        '</ul>',
        '',
        '<ol>',
        '  <li>Instalar</li>',
        '  <li>Configurar</li>',
        '</ol>',
        '',
        '<dl>',
        '  <dt>API</dt>',
        '  <dd>Interfaz para comunicar sistemas.</dd>',
        '</dl>'
      ),preview('Listas','<ul style="margin:0"><li>HTML</li><li>CSS</li><li>JavaScript</li></ul>'),'Usa listas cuando los elementos tengan relación entre sí; no uses br repetidos para simularlas.'),
      C('HTML','layout semantico','5. Estructura semántica','Estas etiquetas organizan las zonas principales de una página y ayudan a lectores, buscadores y mantenibilidad.',lines(
        '<header>Cabecera</header>',
        '<nav>Navegación</nav>',
        '<main>',
        '  <section>',
        '    <h2>Productos</h2>',
        '    <article>Producto independiente</article>',
        '  </section>',
        '  <aside>Contenido relacionado</aside>',
        '</main>',
        '<footer>Pie de página</footer>',
        '',
        '<div>Contenedor genérico</div>',
        '<span>Contenedor en línea</span>'
      ),preview('Semántica','<p style="margin:0">header → nav → main → section/article → footer</p>'),'Prefiere etiquetas semánticas cuando describan correctamente la función del contenido; usa div cuando no exista una etiqueta más específica.'),
      C('HTML','tables','6. Tablas','table sirve para datos tabulares. thead, tbody, th y scope hacen la estructura más comprensible.',lines(
        '<table>',
        '  <thead>',
        '    <tr>',
        '      <th scope="col">Nombre</th>',
        '      <th scope="col">Edad</th>',
        '    </tr>',
        '  </thead>',
        '  <tbody>',
        '    <tr>',
        '      <td>Ana</td>',
        '      <td>24</td>',
        '    </tr>',
        '  </tbody>',
        '</table>'
      ),preview('Tabla','<table><tr><th>Nombre</th><th>Edad</th></tr><tr><td>Ana</td><td>24</td></tr></table>'),'Usa tablas para datos relacionados por filas y columnas, no para maquetar una página.'),
      C('HTML','forms inputs','7. Formularios e inputs','form agrupa controles. label debe asociarse al input con for/id, y name determina el nombre enviado al servidor.',lines(
        '<form action="/registro" method="post">',
        '  <label for="nombre">Nombre</label>',
        '  <input id="nombre" name="nombre" type="text" required>',
        '',
        '  <label for="correo">Correo</label>',
        '  <input id="correo" name="correo" type="email" autocomplete="email">',
        '',
        '  <select name="rol">',
        '    <option value="estudiante">Estudiante</option>',
        '    <option value="docente">Docente</option>',
        '  </select>',
        '',
        '  <textarea name="mensaje"></textarea>',
        '  <button type="submit">Enviar</button>',
        '</form>'
      ),preview('Formulario','<label>Correo <input type="email" placeholder="correo@ejemplo.com"></label> <button>Enviar</button>'),'En botones dentro de formularios especifica type="button" cuando no quieras enviar el formulario.'),
      C('HTML','attributes meta media','8. Atributos y recursos que conviene recordar','class agrupa estilos, id identifica un elemento, data-* guarda datos propios, aria-* aporta información accesible cuando hace falta y link/script conectan CSS y JavaScript.',lines(
        '<div id="perfil" class="card" data-user-id="42">...</div>',
        '<button aria-label="Cerrar ventana">×</button>',
        '',
        '<link rel="stylesheet" href="styles.css">',
        '<script src="app.js" defer></script>',
        '',
        '<video controls width="640">',
        '  <source src="video.mp4" type="video/mp4">',
        '</video>',
        '',
        '<audio controls src="audio.mp3"></audio>'
      ),preview('Recordatorio','<p style="margin:0">id · class · data-* · aria-* · link · script · video · audio</p>'),'No agregues ARIA para reemplazar HTML semántico que ya existe; úsalo cuando realmente aporte información que HTML por sí solo no expresa.')
    ]
  });

  sections.push({
    title:'CSS · Chuleta rápida',
    navLabel:'Chuleta CSS',
    group:'CSS',primaryArea:'CSS',course:'CSS',areaOrder:990,
    description:'Referencia rápida de selectores, propiedades y patrones CSS frecuentes para resolver diseño, espaciado, Flexbox, Grid, responsive y estados visuales.',
    quote:'“CSS decide cómo se presenta el HTML: tamaño, espacio, posición, color y adaptación.”',
    items:[
      C('CSS','selectors','1. Selectores esenciales','Selecciona elementos por etiqueta, clase, id, atributo, relación o combinación.',lines(
        'p { color: #334155; }',
        '.card { padding: 1rem; }',
        '#menu { position: sticky; }',
        'input[type="email"] { border-color: steelblue; }',
        '.card p { margin: 0; }',
        '.menu > a { text-decoration: none; }',
        '.btn.primary { font-weight: 700; }',
        'h2 + p { margin-top: 0; }'
      ),preview('Selector','<code>.card &gt; h2 { ... }</code>'),'Prefiere clases reutilizables para estilos de componentes y evita depender demasiado de selectores muy largos.'),
      C('CSS','box model sizing','2. Box model y tamaños','Todo elemento se representa como caja: contenido + padding + border + margin.',lines(
        '* { box-sizing: border-box; }',
        '',
        '.card {',
        '  width: min(100%, 420px);',
        '  min-height: 180px;',
        '  padding: 1rem 1.25rem;',
        '  border: 1px solid #cbd5e1;',
        '  margin: 1rem auto;',
        '  border-radius: 12px;',
        '}'
      ),preview('Caja','<div style="padding:12px;border:1px solid #64748b;border-radius:8px">contenido + padding + border + margin</div>'),'Usar box-sizing: border-box globalmente hace que width incluya padding y border y simplifica los cálculos.'),
      C('CSS','display','3. display y flujo','display define cómo participa un elemento en el flujo. block ocupa línea, inline fluye con texto, none lo elimina visualmente y Flex/Grid crean sistemas de layout.',lines(
        '.bloque { display: block; }',
        '.en-linea { display: inline; }',
        '.en-linea-con-tamano { display: inline-block; }',
        '.oculto { display: none; }',
        '.fila { display: flex; }',
        '.rejilla { display: grid; }'
      ),preview('Display','<p style="margin:0">block · inline · inline-block · none · flex · grid</p>'),'Si necesitas organizar hijos en una dimensión usa Flexbox; para filas y columnas simultáneas, Grid suele ser más natural.'),
      C('CSS','flexbox','4. Flexbox','Ideal para alinear elementos en una fila o columna y repartir espacio.',lines(
        '.toolbar {',
        '  display: flex;',
        '  flex-direction: row;',
        '  justify-content: space-between;',
        '  align-items: center;',
        '  gap: 1rem;',
        '  flex-wrap: wrap;',
        '}',
        '',
        '.toolbar__search {',
        '  flex: 1 1 280px;',
        '}'
      ),preview('Flexbox','<div style="display:flex;justify-content:space-between;gap:8px"><span>A</span><span>B</span><span>C</span></div>'),'justify-content trabaja sobre el eje principal y align-items sobre el eje transversal.'),
      C('CSS','grid','5. CSS Grid','Grid organiza contenido en columnas y filas. repeat, minmax y auto-fit permiten rejillas responsive con poco código.',lines(
        '.grid {',
        '  display: grid;',
        '  grid-template-columns:',
        '    repeat(auto-fit, minmax(220px, 1fr));',
        '  gap: 1rem;',
        '}',
        '',
        '.destacada {',
        '  grid-column: span 2;',
        '}'
      ),preview('Grid','<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px"><span>1</span><span>2</span><span>3</span></div>'),'auto-fit + minmax() es una combinación muy útil para tarjetas responsive.'),
      C('CSS','typography colors variables','6. Texto, colores y variables','Agrupa colores y tamaños repetidos en variables y usa unidades relativas cuando convenga.',lines(
        ':root {',
        '  --bg: #0f172a;',
        '  --text: #e2e8f0;',
        '  --accent: #38bdf8;',
        '}',
        '',
        'body {',
        '  color: var(--text);',
        '  background: var(--bg);',
        '  font-family: system-ui, sans-serif;',
        '  font-size: 1rem;',
        '  line-height: 1.6;',
        '}',
        '',
        'h1 { font-size: clamp(2rem, 5vw, 4rem); }'
      ),preview('Tipografía','<p style="margin:0;font-size:1.1rem;line-height:1.6">Texto legible con una altura de línea cómoda.</p>'),'clamp(mínimo, ideal, máximo) es útil para tamaños fluidos que no crecen sin límite.'),
      C('CSS','position pseudo','7. Posición, overflow y estados','position mueve elementos respecto al flujo o al viewport. Las pseudoclases expresan estados y los pseudoelementos crean partes visuales.',lines(
        '.header {',
        '  position: sticky;',
        '  top: 0;',
        '  z-index: 10;',
        '}',
        '',
        '.panel { overflow: auto; }',
        '.btn:hover { transform: translateY(-2px); }',
        '.btn:focus-visible { outline: 3px solid #38bdf8; }',
        'input:invalid { border-color: crimson; }',
        '.tag::before { content: "#"; }'
      ),preview('Estados','<button style="padding:8px 12px">:hover · :focus-visible</button>'),'No elimines el foco del teclado sin reemplazarlo por un indicador claramente visible.'),
      C('CSS','responsive animation','8. Responsive, transición y transformación','Media queries adaptan la interfaz; transition suaviza cambios; transform mueve, escala o rota sin rehacer todo el layout.',lines(
        '.card {',
        '  transition: transform .2s ease, box-shadow .2s ease;',
        '}',
        '',
        '.card:hover {',
        '  transform: translateY(-4px);',
        '}',
        '',
        '@media (max-width: 700px) {',
        '  .sidebar { display: none; }',
        '  .layout { grid-template-columns: 1fr; }',
        '}',
        '',
        '@media (prefers-reduced-motion: reduce) {',
        '  * { scroll-behavior: auto; }',
        '}'
      ),preview('Responsive','<p style="margin:0">Desktop ↔ tablet ↔ móvil mediante reglas que responden al espacio disponible.</p>'),'Diseña componentes que se adapten por espacio disponible; no dependas únicamente de tamaños de dispositivo concretos.')
    ]
  });

  sections.push({
    title:'JavaScript · Chuleta rápida',
    navLabel:'Chuleta JavaScript',
    group:'JavaScript',primaryArea:'JavaScript',course:'JavaScript',areaOrder:990,
    description:'Referencia rápida de sintaxis JavaScript: variables, condiciones, bucles, funciones, arrays, objetos, DOM, eventos, asincronía, Fetch, almacenamiento y módulos.',
    quote:'“JavaScript conecta datos, eventos y comportamiento.”',
    items:[
      C('JavaScript','variables types','1. Variables, tipos y plantillas','Usa const por defecto y let cuando el valor vaya a reasignarse. JavaScript tiene tipos primitivos y objetos.',lines(
        'const nombre = "Ana";',
        'let puntos = 10;',
        'const activo = true;',
        'const vacio = null;',
        'let pendiente;',
        '',
        'const usuario = { nombre: "Ana", edad: 24 };',
        'const tecnologias = ["HTML", "CSS", "JS"];',
        '',
        'console.log(typeof nombre); // string',
        'console.log(`Hola ${nombre}, tienes ${puntos} puntos`);'
      ),preview('Variables','<code>const</code> para referencia estable · <code>let</code> para reasignar.'),'Evita var en código nuevo salvo que estés estudiando su comportamiento histórico y su scope.'),
      C('JavaScript','operators conditions','2. Operadores y condiciones','=== compara valor y tipo; && y || combinan condiciones; ?? usa un valor alternativo solo ante null o undefined.',lines(
        'const edad = 20;',
        'const tieneCuenta = true;',
        '',
        'if (edad >= 18 && tieneCuenta) {',
        '  console.log("Puede entrar");',
        '} else {',
        '  console.log("No puede entrar");',
        '}',
        '',
        'const nombre = usuario.nombre ?? "Invitado";',
        'const mensaje = edad >= 18 ? "Adulto" : "Menor";',
        '',
        'console.log(10 === "10"); // false'
      ),preview('Condición','<code>if → else if → else</code> · ternario para decisiones pequeñas.'),'Prefiere === y !== para evitar conversiones implícitas inesperadas.'),
      C('JavaScript','loops functions','3. Bucles y funciones','for...of recorre valores iterables y las funciones encapsulan comportamiento reutilizable.',lines(
        'for (const tecnologia of tecnologias) {',
        '  console.log(tecnologia);',
        '}',
        '',
        'function sumar(a, b) {',
        '  return a + b;',
        '}',
        '',
        'const multiplicar = (a, b) => a * b;',
        '',
        'console.log(sumar(2, 3));',
        'console.log(multiplicar(4, 5));'
      ),preview('Funciones','<p style="margin:0">entrada → función → return → resultado</p>'),'Una función pequeña con un propósito claro suele ser más fácil de probar y reutilizar.'),
      C('JavaScript','arrays','4. Arrays y métodos frecuentes','map transforma, filter selecciona, find busca uno, some/every verifican y reduce acumula.',lines(
        'const nums = [1, 2, 3, 4, 5];',
        '',
        'nums.map(n => n * 2);',
        'nums.filter(n => n % 2 === 0);',
        'nums.find(n => n > 3);',
        'nums.some(n => n > 4);',
        'nums.every(n => n > 0);',
        'nums.reduce((total, n) => total + n, 0);',
        '',
        'nums.forEach(n => console.log(n));',
        'const copia = [...nums];'
      ),preview('Arrays','<p style="margin:0">map · filter · find · some · every · reduce · forEach</p>'),'map debe devolver un valor nuevo; si solo quieres ejecutar una acción por elemento, usa forEach o un bucle.'),
      C('JavaScript','objects destructuring','5. Objetos, destructuring y spread','Los objetos agrupan propiedades. Destructuring extrae valores y spread copia o combina estructuras.',lines(
        'const persona = {',
        '  nombre: "Ana",',
        '  edad: 24,',
        '  ciudad: "Bucaramanga"',
        '};',
        '',
        'const { nombre, edad } = persona;',
        'const actualizada = { ...persona, edad: 25 };',
        '',
        'console.log(persona?.direccion?.calle);',
        'console.log(Object.keys(persona));',
        'console.log(Object.values(persona));'
      ),preview('Objetos','<code>{ ...objeto, propiedad: nuevoValor }</code> crea una copia superficial modificada.'),'Optional chaining (?.) evita errores cuando una ruta puede no existir, pero no reemplaza una validación de datos cuando sea necesaria.'),
      C('JavaScript','dom events','6. DOM y eventos','Selecciona elementos, cambia propiedades y responde a eventos. Usa textContent para texto y classList para clases.',lines(
        'const title = document.querySelector("#titulo");',
        'const button = document.querySelector("#guardar");',
        '',
        'title.textContent = "Nuevo título";',
        'title.classList.add("activo");',
        '',
        'button.addEventListener("click", function(event) {',
        '  console.log("Clic", event);',
        '});',
        '',
        'const p = document.createElement("p");',
        'p.textContent = "Creado con JavaScript";',
        'document.body.append(p);'
      ),preview('DOM','<p style="margin:0">seleccionar → leer/cambiar → escuchar evento → actualizar interfaz</p>'),'Comprueba que el elemento exista antes de usarlo cuando el script pueda ejecutarse en páginas diferentes.'),
      C('JavaScript','async fetch','7. async, await y Fetch','await debe estar dentro de una función async en un script clásico. Valida response.ok antes de procesar el cuerpo.',lines(
        'async function cargarUsuario() {',
        '  try {',
        '    const response = await fetch(',
        '      "https://jsonplaceholder.typicode.com/users/1"',
        '    );',
        '',
        '    if (!response.ok) {',
        '      throw new Error(`HTTP ${response.status}`);',
        '    }',
        '',
        '    const data = await response.json();',
        '    console.log(data);',
        '  } catch (error) {',
        '    console.error(error);',
        '  }',
        '}',
        '',
        'cargarUsuario();'
      ),preview('Asincronía','<p style="margin:0">async → await fetch → validar Response → await json → usar datos → catch</p>'),'Un error HTTP como 404 no siempre rechaza fetch; por eso debes comprobar response.ok.'),
      C('JavaScript','json storage modules','8. JSON, almacenamiento y módulos','JSON convierte datos a texto y viceversa; localStorage guarda strings en el navegador; los módulos separan responsabilidades entre archivos.',lines(
        'const config = { tema: "oscuro", pagina: 2 };',
        '',
        'localStorage.setItem("config", JSON.stringify(config));',
        '',
        'const saved = localStorage.getItem("config");',
        'const parsed = saved ? JSON.parse(saved) : null;',
        '',
        '// utils.js',
        'export function sumar(a, b) { return a + b; }',
        '',
        '// app.js',
        'import { sumar } from "./utils.js";',
        'console.log(sumar(2, 3));',
        '',
        '// index.html',
        '<script type="module" src="app.js"></script>'
      ),preview('Persistencia y módulos','<p style="margin:0">objeto ↔ JSON ↔ localStorage · export ↔ import</p>'),'localStorage no es apropiado para secretos. Los módulos se cargan con type="module" y tienen su propio scope.')
    ]
  });
})();
