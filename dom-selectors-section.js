(()=>{
  if(window.__domSelectorsSectionAdded)return;
  window.__domSelectorsSectionAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const interactive=(html,js='')=>html+(js?'<script>'+js+'</scr'+'ipt>':'');
  const file=(path,method,detail,command='')=>({path,method,detail,command});
  const baseFiles=[
    file('dom/selectores/index.html','MANUAL','HTML de práctica con ids, clases, etiquetas, atributos data-* y elementos anidados.'),
    file('dom/selectores/app.js','MANUAL','JavaScript donde se prueban todos los selectores del DOM.'),
    file('dom/selectores/styles.css','MANUAL','Estilos para distinguir visualmente los elementos seleccionados.')
  ];
  const baseGuide=[
    ['Modificar','dom/selectores/index.html','Crea aquí los elementos que JavaScript va a buscar: id, class, etiquetas, atributos y contenedores.'],
    ['Modificar','dom/selectores/app.js','Escribe aquí getElementById, getElementsByClassName, getElementsByTagName, querySelector y querySelectorAll.'],
    ['Modificar','dom/selectores/styles.css','Define clases como .seleccionado para comprobar visualmente qué elementos encontró JavaScript.']
  ];

  const cardPreview=(title,body)=>`<section style="font-family:system-ui;padding:16px;border:1px solid #8b5cf6;border-radius:14px;background:#07111f;color:#e5edf8"><strong style="display:block;margin-bottom:10px;color:#c4b5fd">${title}</strong>${body}</section>`;
  const D=(topic,name,description,html,js,meta={})=>window.T(
    topic,
    name,
    description,
    `${html}\n\n// dom/selectores/app.js\n${js}`,
    meta.preview||interactive(html,js),
    [],
    {
      kind:'DOM · Selectores',
      tip:meta.tip||'Abre DevTools y prueba el selector en la consola. Comprueba si devuelve un elemento, una colección, una NodeList o null.',
      guide:meta.guide||baseGuide,
      guideTitle:'Dónde se hace cada modificación',
      codeLabel:'Código HTML + JavaScript',
      filesToCreate:meta.files||[],
      filesToCreateTitle:'Archivos que se crean en esta lección',
      filesToCreateStatus:(meta.files||[]).length?'Crea estos archivos para hacer toda la práctica de selectores desde cero.':'Continúa usando dom/selectores/index.html, app.js y styles.css.'
    }
  );

  sections.push({
    title:'JavaScript · DOM · Selectores',
    navLabel:'DOM · Selectores',
    group:'JavaScript',
    primaryArea:'JavaScript',
    course:'JavaScript',
    areaOrder:905,
    description:'Aprende todas las formas principales de localizar elementos en el DOM: por id, por class, por etiqueta y mediante selectores CSS. La sección compara qué devuelve cada método, cuándo conviene usarlo, cómo buscar dentro de un contenedor, cómo subir con closest(), cómo usar matches() y cuál es la diferencia entre HTMLCollection y NodeList.',
    quote:'“Antes de modificar un elemento, JavaScript necesita encontrarlo dentro del árbol DOM.”',
    challenge:'Construye una cuadrícula de tarjetas y usa id, class, atributos data-* y selectores CSS para resaltar, filtrar y eliminar elementos.',
    items:[
      D(
        'selectors overview',
        '1. Qué es un selector del DOM y qué puede devolver',
        'Un selector es la forma de indicar qué elemento o grupo de elementos quieres obtener del DOM. Algunos métodos buscan usando una regla específica, como getElementById para un id. Otros aceptan la misma sintaxis que CSS, como querySelector y querySelectorAll. No todos devuelven lo mismo: puedes recibir un Element, null, una HTMLCollection o una NodeList. Saber qué devuelve cada método evita errores al intentar usar propiedades o recorrer resultados.',
        `<main id="app">
  <h1 class="titulo">Selectores DOM</h1>
  <p class="texto">HTML</p>
  <p class="texto">CSS</p>
  <button data-action="guardar">Guardar</button>
</main>`,
        `const app = document.getElementById('app');
const titulo = document.querySelector('.titulo');
const textos = document.querySelectorAll('.texto');

console.log(app);       // Element o null
console.log(titulo);    // primer Element o null
console.log(textos);    // NodeList`,
        {
          files:baseFiles,
          preview:cardPreview('Qué devuelve cada búsqueda',`<div style="display:grid;gap:8px"><div><code>getElementById()</code> → Element | null</div><div><code>getElementsByClassName()</code> → HTMLCollection</div><div><code>querySelector()</code> → primer Element | null</div><div><code>querySelectorAll()</code> → NodeList</div></div>`)
        }
      ),
      D(
        'getElementById',
        '2. Seleccionar por id con getElementById()',
        'getElementById recibe solamente el valor del id, sin escribir #. Devuelve un único elemento porque un id debe ser único dentro de la página. Si no existe, devuelve null. Es una opción directa y muy legible cuando ya sabes que el elemento tiene un id estable.',
        `<h2 id="titulo-principal">Título original</h2>
<button id="cambiar-titulo">Cambiar</button>`,
        `const titulo = document.getElementById('titulo-principal');
const boton = document.getElementById('cambiar-titulo');

boton.addEventListener('click', () => {
  titulo.textContent = 'Encontrado por id';
});`
      ),
      D(
        'getElementsByClassName',
        '3. Seleccionar por class con getElementsByClassName()',
        'getElementsByClassName busca todos los elementos que tengan una clase determinada. Se escribe el nombre sin punto. Devuelve una HTMLCollection viva: si posteriormente agregas o quitas elementos que coinciden con esa clase, la colección puede actualizarse automáticamente. Puedes acceder por índice o convertirla con Array.from para usar métodos de Array con comodidad.',
        `<article class="tarjeta">Tarjeta 1</article>
<article class="tarjeta">Tarjeta 2</article>
<article class="tarjeta">Tarjeta 3</article>`,
        `const tarjetas = document.getElementsByClassName('tarjeta');

console.log(tarjetas.length);

Array.from(tarjetas).forEach((tarjeta, indice) => {
  tarjeta.textContent += ' · índice ' + indice;
});`
      ),
      D(
        'getElementsByTagName',
        '4. Seleccionar por etiqueta con getElementsByTagName()',
        'getElementsByTagName busca por el nombre de la etiqueta HTML, por ejemplo p, li, button o article. También devuelve una HTMLCollection viva. Es útil cuando realmente quieres todos los elementos de un mismo tipo, aunque en interfaces grandes suele ser más específico combinar clases o atributos con querySelectorAll.',
        `<section>
  <p>Primer párrafo</p>
  <p>Segundo párrafo</p>
  <p>Tercer párrafo</p>
</section>`,
        `const parrafos = document.getElementsByTagName('p');

for (const parrafo of parrafos) {
  parrafo.classList.add('seleccionado');
}`
      ),
      D(
        'querySelector',
        '5. querySelector() · usar cualquier selector CSS y obtener el primero',
        'querySelector acepta selectores CSS. Puedes usar #id, .clase, etiquetas, atributos, descendientes, combinaciones y pseudoclases válidas para selección. Devuelve únicamente la primera coincidencia o null. Es muy práctico porque no necesitas memorizar un método diferente para cada tipo de selector.',
        `<section id="perfil">
  <h2 class="nombre">Ana</h2>
  <p class="dato">Frontend</p>
  <p class="dato destacado">JavaScript</p>
</section>`,
        `const porId = document.querySelector('#perfil');
const porClase = document.querySelector('.nombre');
const porEtiqueta = document.querySelector('p');
const combinado = document.querySelector('#perfil .dato.destacado');

combinado.textContent = 'Seleccionado con CSS';`
      ),
      D(
        'querySelectorAll',
        '6. querySelectorAll() · obtener todas las coincidencias',
        'querySelectorAll utiliza selectores CSS pero devuelve todas las coincidencias dentro de una NodeList estática. NodeList dispone de forEach en navegadores modernos. “Estática” significa que el resultado no se actualiza automáticamente si después aparecen elementos nuevos; para incluirlos debes ejecutar otra vez querySelectorAll.',
        `<ul id="lenguajes">
  <li class="lenguaje">HTML</li>
  <li class="lenguaje">CSS</li>
  <li class="lenguaje">JavaScript</li>
</ul>`,
        `const lenguajes = document.querySelectorAll('#lenguajes .lenguaje');

lenguajes.forEach((elemento, indice) => {
  elemento.textContent = (indice + 1) + '. ' + elemento.textContent;
});`
      ),
      D(
        'attribute selectors',
        '7. Seleccionar por atributos, data-* y estados CSS',
        'Como querySelector y querySelectorAll utilizan sintaxis CSS, puedes seleccionar elementos por atributos. [data-action] busca cualquier elemento con ese atributo; [data-action="eliminar"] exige un valor concreto; input[name="correo"] combina etiqueta y atributo. También puedes usar selectores como :checked, :disabled o :nth-child(). Esto permite localizar controles según su función o estado sin agregar un id a cada uno.',
        `<button data-action="editar">Editar</button>
<button data-action="eliminar">Eliminar</button>
<label><input type="checkbox" name="tema" checked> Tema oscuro</label>
<ul><li>Uno</li><li>Dos</li><li>Tres</li></ul>`,
        `const eliminar = document.querySelector('[data-action="eliminar"]');
const marcado = document.querySelector('input[name="tema"]:checked');
const segundo = document.querySelector('li:nth-child(2)');

eliminar.classList.add('seleccionado');
marcado.closest('label').classList.add('seleccionado');
segundo.classList.add('seleccionado');`
      ),
      D(
        'scoped selector',
        '8. Buscar solamente dentro de un contenedor',
        'querySelector y querySelectorAll no pertenecen únicamente a document. También puedes ejecutarlos sobre un elemento concreto. Esto limita la búsqueda al subárbol de ese elemento y evita seleccionar accidentalmente elementos iguales que están en otras partes de la página. Es especialmente útil en componentes, tarjetas, modales y filas de tablas.',
        `<article class="tarjeta" id="producto-1">
  <h3 class="nombre">Teclado</h3>
  <span class="precio">120000</span>
</article>
<article class="tarjeta" id="producto-2">
  <h3 class="nombre">Mouse</h3>
  <span class="precio">70000</span>
</article>`,
        `const producto = document.querySelector('#producto-2');
const nombre = producto.querySelector('.nombre');
const precio = producto.querySelector('.precio');

console.log(nombre.textContent);
console.log(precio.textContent);`
      ),
      D(
        'closest matches',
        '9. closest() y matches() · encontrar relaciones y validar selectores',
        'matches(selector) responde true o false según si un elemento coincide con el selector indicado. closest(selector) comienza en el elemento actual y sube por sus ancestros hasta encontrar la coincidencia más cercana. Son esenciales en delegación de eventos porque event.target puede ser un icono o span interno y necesitas localizar la tarjeta, fila o botón al que pertenece.',
        `<article class="tarjeta" data-id="42">
  <h3>Producto</h3>
  <button class="accion"><span>Eliminar</span></button>
</article>
<p id="salida-relacion"></p>`,
        `document.addEventListener('click', event => {
  if (!event.target.closest('.accion')) return;

  const tarjeta = event.target.closest('.tarjeta');
  const salida = document.querySelector('#salida-relacion');

  salida.textContent = 'Tarjeta encontrada: ' + tarjeta.dataset.id;
  console.log(tarjeta.matches('[data-id]'));
});`
      ),
      D(
        'HTMLCollection NodeList',
        '10. HTMLCollection vs NodeList · diferencia importante',
        'getElementsByClassName y getElementsByTagName normalmente devuelven HTMLCollection vivas. querySelectorAll devuelve una NodeList estática. Una colección viva refleja ciertos cambios del DOM automáticamente; una lista estática representa las coincidencias encontradas en el instante de la consulta. Ambas pueden recorrerse, pero NodeList tiene forEach directamente y HTMLCollection suele convertirse con Array.from o spread para usar métodos de Array.',
        `<div class="item">A</div>
<div class="item">B</div>
<button id="crear-item">Crear otro</button>
<p id="conteo"></p>`,
        `const viva = document.getElementsByClassName('item');
const estatica = document.querySelectorAll('.item');
const conteo = document.querySelector('#conteo');

function mostrarConteo() {
  conteo.textContent =
    'HTMLCollection: ' + viva.length +
    ' · NodeList inicial: ' + estatica.length;
}

mostrarConteo();

document.querySelector('#crear-item').addEventListener('click', () => {
  const item = document.createElement('div');
  item.className = 'item';
  item.textContent = 'Nuevo';
  document.body.append(item);
  mostrarConteo();
});`
      ),
      D(
        'null safety',
        '11. Qué pasa cuando un selector no encuentra nada',
        'getElementById y querySelector devuelven null cuando no existe una coincidencia. Intentar usar null.textContent produce un error. Puedes comprobar con if, usar optional chaining para una operación opcional o lanzar un error claro cuando el elemento es obligatorio para que la interfaz funcione. Esta comprobación es especialmente importante cuando app.js se comparte entre varias páginas.',
        `<p id="mensaje-existente">Existe</p>`,
        `const existe = document.querySelector('#mensaje-existente');
const noExiste = document.querySelector('#otro');

if (existe) {
  existe.textContent = 'Encontrado correctamente';
}

noExiste?.classList.add('seleccionado');

console.log(noExiste); // null`
      ),
      D(
        'selector exercise',
        '12. Ejercicio · usar id, class, etiqueta, atributos y selectores CSS juntos',
        'Este ejercicio reúne los selectores principales. El botón principal se obtiene por id, todas las tarjetas por class, los títulos por etiqueta dentro de cada tarjeta y la acción de eliminar mediante data-action. Después se utiliza closest para encontrar la tarjeta relacionada con el botón pulsado. El objetivo es que el estudiante elija el selector según la intención del código y no simplemente use querySelector para todo.',
        `<section id="catalogo">
  <button id="resaltar">Resaltar todas</button>
  <article class="producto" data-id="1">
    <h3>Teclado</h3>
    <button data-action="eliminar">Eliminar</button>
  </article>
  <article class="producto" data-id="2">
    <h3>Mouse</h3>
    <button data-action="eliminar">Eliminar</button>
  </article>
</section>`,
        `const resaltar = document.getElementById('resaltar');
const productos = document.getElementsByClassName('producto');
const titulos = document.querySelectorAll('#catalogo .producto h3');

resaltar.addEventListener('click', () => {
  Array.from(productos).forEach(producto => {
    producto.classList.toggle('seleccionado');
  });
});

document.querySelector('#catalogo').addEventListener('click', event => {
  if (!event.target.matches('[data-action="eliminar"]')) return;
  event.target.closest('.producto').remove();
});

console.log('Títulos encontrados:', titulos.length);`,
        {
          tip:'Repite el ejercicio reemplazando cada selector por otra alternativa válida y explica qué cambia en el tipo de resultado obtenido.'
        }
      )
    ]
  });
})();
