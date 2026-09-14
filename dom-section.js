(()=>{
  if(window.__domSectionAdded)return;
  window.__domSectionAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const interactive=(html,js='')=>html+(js?'<script>'+js+'</scr'+'ipt>':'');
  const file=(path,method,detail,command='')=>({path,method,detail,command});
  const guideBase=[
    ['Modificar','dom/index.html','Aquí va la estructura HTML que el navegador convierte en nodos del DOM.'],
    ['Modificar','dom/app.js','Aquí va el JavaScript que selecciona, modifica, crea o elimina nodos y escucha eventos.'],
    ['Modificar','dom/styles.css','Aquí van los estilos y las clases CSS que JavaScript puede activar con classList.']
  ];
  const D=(topic,name,description,html,js='',meta={})=>T(
    topic,
    name,
    description,
    js?`${html}\n\n<script src="app.js" defer></script>\n\n// app.js\n${js}`:html,
    meta.preview||interactive(html,js),
    [],
    {
      kind:meta.kind||'DOM',
      tip:meta.tip||'Abre DevTools, inspecciona el árbol Elements y compara el HTML original con los cambios que JavaScript hace en tiempo real.',
      guide:meta.guide||guideBase,
      guideTitle:'Dónde se hace cada modificación',
      codeLabel:meta.codeLabel||'Código HTML + JavaScript',
      filesToCreate:meta.files||[],
      filesToCreateTitle:'Archivos que se crean en esta lección',
      filesToCreateStatus:(meta.files||[]).length?'Crea estos archivos una sola vez para practicar toda la sección del DOM.':'Continúa usando los archivos dom/index.html, dom/app.js y dom/styles.css.'
    }
  );

  const treePreview=`<section style="font-family:system-ui;padding:16px;border:1px solid #7c3aed;border-radius:14px;background:#07111f;color:#e5edf8">
    <strong style="display:block;color:#a78bfa;margin-bottom:12px">Árbol DOM generado por el navegador</strong>
    <div style="display:grid;gap:8px;text-align:center">
      <div style="margin:auto;padding:8px 14px;border-radius:8px;background:#6d28d9">document</div>
      <div>↓</div>
      <div style="margin:auto;padding:8px 14px;border-radius:8px;background:#2563eb">html</div>
      <div>↙ head &nbsp;&nbsp;&nbsp;&nbsp; body ↘</div>
      <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap"><span style="padding:7px 12px;border:1px solid #22c55e;border-radius:8px">h1</span><span style="padding:7px 12px;border:1px solid #22c55e;border-radius:8px">p</span><span style="padding:7px 12px;border:1px solid #22c55e;border-radius:8px">button</span></div>
      <small style="color:#94a3b8">Cada etiqueta se convierte en un nodo que JavaScript puede consultar y modificar.</small>
    </div>
  </section>`;

  sections.push({
    title:'Manejo del DOM',
    navLabel:'DOM · árbol y manipulación',
    description:'Aprende el DOM desde cero y de forma práctica: cómo el navegador convierte HTML en un árbol de objetos, cómo JavaScript accede a esos nodos y cómo modificar contenido, atributos, clases, estilos, crear o eliminar elementos y reaccionar a eventos. HTML construye la estructura, CSS define la apariencia y el DOM es la interfaz que permite a JavaScript controlar la página mientras está abierta.',
    quote:'“El DOM es el puente entre el documento HTML y el JavaScript que lo hace interactivo.”',
    challenge:'Construye una lista dinámica donde el usuario pueda agregar tareas, marcarlas como completadas y eliminarlas sin recargar la página.',
    group:'JavaScript',
    primaryArea:'JavaScript',
    course:'JavaScript',
    items:[
      D(
        'DOM tree',
        '1. ¿Qué es el DOM y cómo se forma el árbol?',
        'DOM significa Document Object Model. Cuando el navegador recibe HTML no trabaja directamente con el texto del archivo: lo analiza y crea una estructura de objetos conectados en forma de árbol. document representa el documento completo; html es el elemento raíz y dentro aparecen head, body y todos sus descendientes. Cada etiqueta se convierte en un nodo Element, el texto crea nodos de texto y las relaciones padre/hijo reflejan la anidación del HTML. JavaScript utiliza document para entrar a este árbol. Cambiar un objeto del DOM cambia lo que el usuario ve, pero no modifica automáticamente el archivo index.html guardado en disco.',
        `<!doctype html>
<html lang="es">
<head>
  <title>Mi página</title>
</head>
<body>
  <h1>Hola mundo</h1>
  <p>Bienvenido al DOM</p>
  <button>Haz clic</button>
</body>
</html>`,
        '',
        {
          preview:treePreview,
          files:[
            file('dom/index.html','MANUAL','Estructura HTML que originará el árbol DOM.'),
            file('dom/app.js','MANUAL','JavaScript que manipulará el DOM.'),
            file('dom/styles.css','MANUAL','Estilos usados por la práctica.')
          ],
          guide:[['Crear','dom/index.html','Escribe la estructura base de la práctica.'],['Crear','dom/app.js','Déjalo inicialmente vacío y enlázalo con defer.'],['Crear','dom/styles.css','Crea aquí los estilos de los estados visuales.']]
        }
      ),
      D(
        'document',
        '2. Cómo funciona: HTML → navegador → DOM → JavaScript → página actualizada',
        'El flujo completo es importante. Primero el navegador analiza el HTML y crea el DOM. Después JavaScript obtiene referencias a los nodos mediante document. Al modificar una propiedad como textContent o una clase CSS, el navegador actualiza la representación de la página. El usuario ve el resultado inmediatamente. Por eso el DOM no es un archivo adicional: es una representación viva en memoria del documento abierto.',
        `<main id="app">
  <h1 id="titulo">Página original</h1>
</main>`,
        `const titulo = document.querySelector('#titulo');
titulo.textContent = 'Página actualizada por JavaScript';`,
        {preview:`<section style="font-family:system-ui;padding:18px;border:1px solid #2563eb;border-radius:14px;background:#07111f;color:white"><div style="display:flex;align-items:center;gap:9px;flex-wrap:wrap;justify-content:center"><span>HTML</span><b>→</b><span>Navegador</span><b>→</b><span style="color:#a78bfa">DOM</span><b>→</b><span style="color:#facc15">JavaScript</span><b>→</b><span style="color:#4ade80">Página actualizada</span></div></section>`}
      ),
      D(
        'querySelector',
        '3. ACCESS · seleccionar y obtener elementos',
        'Antes de modificar un elemento necesitas una referencia. getElementById busca por id. querySelector acepta cualquier selector CSS y devuelve la primera coincidencia. querySelectorAll devuelve una NodeList con todas las coincidencias. Si querySelector no encuentra nada devuelve null, por eso en proyectos reales conviene comprobar la referencia antes de usarla. Un selector puede apuntar a una etiqueta, una clase, un id, un atributo o una combinación de selectores CSS.',
        `<h2 id="titulo-dom">Curso DOM</h2>
<p class="tema">HTML</p>
<p class="tema">CSS</p>
<p class="tema">JavaScript</p>`,
        `const titulo = document.querySelector('#titulo-dom');
const temas = document.querySelectorAll('.tema');

console.log(titulo.textContent);
console.log(temas.length);

temas.forEach(tema => console.log(tema.textContent));`
      ),
      D(
        'textContent',
        '4. CHANGE · modificar texto y contenido',
        'textContent reemplaza o lee texto sin interpretar etiquetas HTML y suele ser la opción más segura cuando el contenido proviene de datos. innerHTML interpreta una cadena como HTML y por eso debe evitarse con contenido no confiable. También existen innerText y replaceChildren para casos específicos. La idea principal es que JavaScript cambia propiedades del nodo que ya existe en el DOM.',
        `<h2 id="mensaje">Texto original</h2>
<button id="cambiar-texto">Cambiar texto</button>`,
        `const mensaje = document.querySelector('#mensaje');
const boton = document.querySelector('#cambiar-texto');

boton.addEventListener('click', () => {
  mensaje.textContent = 'Bienvenido a JavaScript y al DOM';
});`
      ),
      D(
        'classList',
        '5. CHANGE · cambiar clases y estilos CSS',
        'Aunque existe elemento.style para asignar estilos inline, normalmente es mejor definir el diseño en CSS y usar JavaScript solamente para activar o quitar clases. classList.add agrega una clase, remove la elimina, toggle alterna su presencia y contains pregunta si existe. De esta forma HTML conserva estructura, CSS conserva apariencia y JavaScript controla el estado.',
        `<div id="panel" class="panel">Panel de ejemplo</div>
<button id="activar">Activar / desactivar</button>
<style>
.panel{padding:16px;border-radius:10px;background:#e2e8f0;color:#0f172a}
.panel.activo{background:#2563eb;color:white;transform:scale(1.02)}
</style>`,
        `const panel = document.querySelector('#panel');

document.querySelector('#activar').addEventListener('click', () => {
  panel.classList.toggle('activo');
});`
      ),
      D(
        'attributes',
        '6. CHANGE · leer y modificar atributos',
        'Los atributos también forman parte del estado de un elemento. getAttribute lee el valor escrito, setAttribute crea o cambia un atributo, removeAttribute lo elimina y hasAttribute comprueba si existe. Algunas propiedades tienen acceso directo como input.disabled, enlace.href o imagen.src. Para atributos booleanos como disabled suele ser más claro trabajar con la propiedad correspondiente.',
        `<button id="guardar" aria-pressed="false">Guardar</button>
<p id="estado">Estado: inactivo</p>`,
        `const guardar = document.querySelector('#guardar');
const estado = document.querySelector('#estado');

guardar.addEventListener('click', () => {
  const activo = guardar.getAttribute('aria-pressed') === 'true';
  guardar.setAttribute('aria-pressed', String(!activo));
  estado.textContent = 'Estado: ' + (!activo ? 'activo' : 'inactivo');
});`
      ),
      D(
        'addEventListener',
        '7. EVENT HANDLING · responder a clics y otros eventos',
        'addEventListener conecta un evento con una función. click responde a un clic, input a cambios mientras se escribe, change a cambios confirmados, submit al envío de formularios y keydown al teclado. El navegador crea un objeto Event y lo entrega al callback. event.target indica dónde comenzó el evento y event.currentTarget indica el elemento que posee el listener. addEventListener permite registrar más de un listener y es preferible a sobrescribir onclick en aplicaciones medianas o grandes.',
        `<button id="boton-evento">Haz clic</button>
<p id="contador-evento">Clics: 0</p>`,
        `let clics = 0;
const boton = document.querySelector('#boton-evento');
const contador = document.querySelector('#contador-evento');

boton.addEventListener('click', event => {
  clics += 1;
  contador.textContent = 'Clics: ' + clics;
  console.log(event.type, event.target);
});`
      ),
      D(
        'createElement',
        '8. ADD · crear y añadir nuevos elementos',
        'document.createElement crea un elemento que todavía no está colocado en la página. Después puedes configurar su textContent, clases, atributos o eventos. append y appendChild lo insertan dentro de otro nodo; prepend lo coloca al inicio y before/after permiten insertarlo junto a un nodo existente. Separar creación e inserción ayuda a entender que primero existe el objeto y después se conecta al árbol.',
        `<button id="agregar">Agregar párrafo</button>
<section id="salida"></section>`,
        `const salida = document.querySelector('#salida');

document.querySelector('#agregar').addEventListener('click', () => {
  const parrafo = document.createElement('p');
  parrafo.textContent = 'Nuevo párrafo agregado';
  parrafo.classList.add('mensaje');
  salida.appendChild(parrafo);
});`
      ),
      D(
        'remove',
        '9. REMOVE · eliminar o reemplazar elementos',
        'remove elimina el propio nodo del árbol. También puede usarse parent.removeChild(hijo), aunque remove suele ser más directo. replaceWith sustituye un nodo completo por otro y replaceChildren reemplaza todos los hijos de un contenedor. Eliminar un elemento del DOM hace que deje de mostrarse y de participar en el layout de la página.',
        `<ul id="lista-eliminar">
  <li>HTML <button class="eliminar">Eliminar</button></li>
  <li>CSS <button class="eliminar">Eliminar</button></li>
  <li>JavaScript <button class="eliminar">Eliminar</button></li>
</ul>`,
        `document.querySelectorAll('.eliminar').forEach(boton => {
  boton.addEventListener('click', event => {
    event.currentTarget.closest('li').remove();
  });
});`
      ),
      D(
        'traversal',
        '10. Recorrer el árbol DOM: padre, hijos y elementos cercanos',
        'Los nodos están relacionados. parentElement lleva al padre; children devuelve los elementos hijos; firstElementChild y lastElementChild acceden a los extremos; nextElementSibling y previousElementSibling recorren hermanos. closest busca hacia arriba el ancestro más cercano que coincide con un selector y matches comprueba si un elemento coincide con un selector. Estas herramientas evitan repetir ids para cada elemento.',
        `<article class="tarjeta-dom">
  <h3>Artículo DOM</h3>
  <button class="detalles-dom">Ver contenedor</button>
  <p class="salida-dom"></p>
</article>`,
        `document.querySelector('.detalles-dom').addEventListener('click', event => {
  const tarjeta = event.target.closest('.tarjeta-dom');
  const titulo = tarjeta.querySelector('h3');
  tarjeta.querySelector('.salida-dom').textContent =
    'Estoy dentro de: ' + titulo.textContent;
});`
      ),
      D(
        'dataset',
        '11. data-* y dataset · guardar información en el HTML',
        'Los atributos data-* permiten asociar información personalizada a un elemento sin inventar atributos HTML no estándar. data-curso se lee como elemento.dataset.curso y data-product-id se convierte en dataset.productId. Los valores de dataset son texto, por lo que debes convertirlos cuando necesites números o booleanos. Son muy útiles para identificar acciones, ids y opciones en interfaces dinámicas.',
        `<button class="curso-dom" data-curso="HTML" data-id="1">HTML</button>
<button class="curso-dom" data-curso="CSS" data-id="2">CSS</button>
<p id="curso-elegido">Sin selección</p>`,
        `document.querySelectorAll('.curso-dom').forEach(boton => {
  boton.addEventListener('click', () => {
    const { curso, id } = boton.dataset;
    document.querySelector('#curso-elegido').textContent =
      'Curso ' + id + ': ' + curso;
  });
});`
      ),
      D(
        'event delegation',
        '12. Delegación de eventos · un listener para muchos elementos',
        'En lugar de registrar un listener por cada botón, puedes escuchar el evento en un contenedor común. Como muchos eventos se propagan desde el elemento interno hacia sus ancestros, el contenedor recibe el evento y event.target indica dónde comenzó. Con matches y closest puedes decidir qué acción realizar. Este patrón funciona también con elementos creados después de registrar el listener.',
        `<ul id="acciones-dom">
  <li>HTML <button data-accion="eliminar">Eliminar</button></li>
  <li>CSS <button data-accion="eliminar">Eliminar</button></li>
</ul>
<button id="nuevo">Agregar JavaScript</button>`,
        `const lista = document.querySelector('#acciones-dom');

lista.addEventListener('click', event => {
  if (!event.target.matches('[data-accion="eliminar"]')) return;
  event.target.closest('li').remove();
});

document.querySelector('#nuevo').addEventListener('click', () => {
  const li = document.createElement('li');
  li.innerHTML = 'JavaScript <button data-accion="eliminar">Eliminar</button>';
  lista.append(li);
});`
      ),
      D(
        'forms',
        '13. DOM con formularios: value, submit y preventDefault',
        'Los inputs exponen su valor mediante value. El evento submit debe escucharse en el formulario, no solo en el botón, porque el usuario también puede enviar con Enter. preventDefault evita el envío tradicional cuando quieres procesar el formulario con JavaScript. Después puedes validar, crear un objeto y actualizar el DOM con el resultado.',
        `<form id="form-nombre">
  <label>Nombre <input id="nombre-dom" required></label>
  <button>Mostrar</button>
</form>
<p id="saludo-dom"></p>`,
        `document.querySelector('#form-nombre').addEventListener('submit', event => {
  event.preventDefault();
  const nombre = document.querySelector('#nombre-dom').value.trim();
  document.querySelector('#saludo-dom').textContent =
    nombre ? 'Hola, ' + nombre : 'Escribe un nombre';
});`
      ),
      D(
        'defer',
        '14. Cuándo ejecutar JavaScript: defer y DOMContentLoaded',
        'Si app.js intenta seleccionar un elemento antes de que el navegador haya creado ese nodo, querySelector devolverá null. La forma más sencilla para scripts externos es cargar <script src="app.js" defer></script> en head: el archivo se descarga en paralelo y se ejecuta después de analizar el HTML. DOMContentLoaded es útil cuando necesitas ejecutar una inicialización justo después de que el documento haya terminado de parsearse. Con módulos type="module", el comportamiento ya es diferido por defecto.',
        `<head>
  <script src="app.js" defer></script>
</head>
<body>
  <h1 id="titulo-listo">DOM listo</h1>
</body>`,
        `const titulo = document.querySelector('#titulo-listo');
titulo.textContent = 'JavaScript encontró el elemento';

// Alternativa:
document.addEventListener('DOMContentLoaded', () => {
  console.log('El DOM terminó de construirse');
});`
      ),
      D(
        'project',
        '15. Proyecto de repaso · lista dinámica completa',
        'Este ejercicio reúne las cuatro operaciones de la imagen: ACCESS para obtener elementos, CHANGE para cambiar estados, ADD para crear tareas y REMOVE para eliminarlas. También utiliza submit, event delegation, dataset implícito mediante selectores y classList. Construirlo desde cero ayuda a ver el DOM como un sistema completo en lugar de memorizar métodos aislados.',
        `<form id="tareas-form">
  <input id="tarea-input" placeholder="Nueva tarea" required>
  <button>Agregar</button>
</form>
<ul id="tareas-lista"></ul>
<style>
.completada{text-decoration:line-through;opacity:.6}
</style>`,
        `const form = document.querySelector('#tareas-form');
const input = document.querySelector('#tarea-input');
const lista = document.querySelector('#tareas-lista');

form.addEventListener('submit', event => {
  event.preventDefault();

  const texto = input.value.trim();
  if (!texto) return;

  const li = document.createElement('li');
  li.innerHTML =
    '<span class="texto"></span> ' +
    '<button data-completar>Completar</button> ' +
    '<button data-eliminar>Eliminar</button>';
  li.querySelector('.texto').textContent = texto;
  lista.append(li);

  input.value = '';
  input.focus();
});

lista.addEventListener('click', event => {
  const li = event.target.closest('li');
  if (!li) return;

  if (event.target.matches('[data-completar]')) {
    li.classList.toggle('completada');
  }

  if (event.target.matches('[data-eliminar]')) {
    li.remove();
  }
});`,
        {
          guide:[['Modificar','dom/index.html','Construye el formulario, el input y la lista vacía.'],['Modificar','dom/app.js','Implementa creación, cambio de estado y eliminación de tareas.'],['Modificar','dom/styles.css','Diseña la lista y la clase .completada.']],
          tip:'Haz primero ACCESS, luego ADD, después CHANGE y finalmente REMOVE. Prueba cada paso antes de continuar.'
        }
      )
    ]
  });

  if(typeof buildNav==='function')buildNav();
  if(typeof render==='function')render();
})();
