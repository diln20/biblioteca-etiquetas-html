(()=>{
  if(window.__javascriptJsonFilesAdded)return;
  window.__javascriptJsonFilesAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const preview=(title,html)=>`<section style="font-family:system-ui;padding:16px;border:1px solid #334155;border-radius:12px;background:#07111f;color:#e5edf8"><strong style="display:block;margin-bottom:8px;color:#f59e0b">${title}</strong>${html}</section>`;
  const file=(path,detail)=>({path,method:'MANUAL',detail});
  const code=lines=>lines.join('\n');
  const J=(tag,name,description,snippet,previewHtml,tip,meta={})=>T(tag,name,description,snippet,previewHtml,[],{
    kind:'JavaScript · Archivos JSON',
    tip,
    guideTitle:'Dónde se hace cada modificación',
    codeLabel:'Código práctico · archivos JSON',
    filesToCreateTitle:'Archivos para practicar',
    filesToCreateStatus:'Ejecuta los ejemplos con un servidor local. Abrir index.html con file:// puede impedir que fetch() lea archivos JSON locales.',
    ...meta
  });

  sections.push({
    title:'JavaScript · 10D. Archivos JSON',
    navLabel:'Archivos JSON',
    group:'JavaScript',
    primaryArea:'JavaScript',
    course:'JavaScript',
    areaOrder:210,
    description:'Aprende a crear, leer, inspeccionar, transformar, importar y exportar archivos .json desde JavaScript. La sección diferencia claramente un archivo JSON, un objeto JavaScript y una respuesta JSON recibida con fetch().',
    quote:'“JSON guarda datos; JavaScript los convierte en objetos y arrays para poder trabajar con ellos.”',
    challenge:'Crea un catálogo que lea productos.json, permita buscar y filtrar productos, muestre el resultado en HTML y permita exportar la selección como un nuevo archivo JSON.',
    items:[
      J(
        'json archivo sintaxis',
        '1. Qué contiene un archivo .json',
        'Un archivo JSON contiene texto con una estructura válida de JSON. Puede empezar con un objeto {} o con un array []. Las claves deben usar comillas dobles y no se permiten comentarios, funciones ni undefined. Es distinto de un archivo .js: en JSON no escribes const, let ni export.',
        code([
          '{',
          '  "curso": "JavaScript",',
          '  "activo": true,',
          '  "temas": ["DOM", "Fetch", "JSON"],',
          '  "profesor": {',
          '    "nombre": "Ana",',
          '    "experiencia": 5',
          '  }',
          '}'
        ]),
        preview('Regla rápida','<p style="margin:0">archivo .json = texto JSON válido · objeto { } o array [ ]</p>'),
        'Si el archivo no es JSON válido, JSON.parse() y response.json() producirán un error.',
        {
          guide:[['Crear','javascript/json-archivos/datos.json','Escribe un objeto JSON válido y guárdalo con extensión .json.']],
          filesToCreate:[file('javascript/json-archivos/datos.json','Primer archivo JSON.')]
        }
      ),
      J(
        'json estructura proyecto',
        '2. Crear datos.json y conectarlo al proyecto',
        'Para practicar, deja index.html, app.js y datos.json en la misma carpeta. El HTML carga app.js con defer y JavaScript usa fetch("./datos.json") para pedir el archivo al servidor local.',
        code([
          'json-archivos/',
          '├── index.html',
          '├── app.js',
          '└── datos.json',
          '',
          '<!-- index.html -->',
          '<!doctype html>',
          '<html lang="es">',
          '<head>',
          '  <meta charset="UTF-8">',
          '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
          '  <title>Archivos JSON</title>',
          '</head>',
          '<body>',
          '  <pre id="salida">Esperando datos...</pre>',
          '  <script src="app.js" defer><\/script>',
          '</body>',
          '</html>'
        ]),
        preview('Estructura','<p style="margin:0">index.html → app.js → fetch("./datos.json")</p>'),
        'Mantener los tres archivos juntos facilita entender las rutas relativas antes de organizar proyectos más grandes.',
        {
          guide:[['Crear','javascript/json-archivos/index.html','Estructura de la página.'],['Crear','javascript/json-archivos/app.js','Código JavaScript.'],['Crear','javascript/json-archivos/datos.json','Datos de práctica.']],
          filesToCreate:[file('javascript/json-archivos/index.html','Página HTML.'),file('javascript/json-archivos/app.js','Lógica JavaScript.'),file('javascript/json-archivos/datos.json','Datos locales.')]
        }
      ),
      J(
        'json fetch local',
        '3. Leer un archivo JSON con fetch()',
        'fetch() también puede pedir un archivo del propio proyecto. response.json() lee el cuerpo y lo convierte en un objeto o array de JavaScript. Usa response.ok para detectar un archivo inexistente o una respuesta HTTP no exitosa.',
        code([
          'async function cargarJson() {',
          '  try {',
          '    const response = await fetch("./datos.json");',
          '',
          '    if (!response.ok) {',
          '      throw new Error("HTTP " + response.status);',
          '    }',
          '',
          '    const data = await response.json();',
          '',
          '    console.log(data);',
          '    console.log("¿Es array?", Array.isArray(data));',
          '    return data;',
          '  } catch (error) {',
          '    console.error("No se pudo leer datos.json", error);',
          '    return null;',
          '  }',
          '}',
          '',
          'cargarJson();'
        ]),
        preview('Conversión','<p style="margin:0">datos.json → fetch() → Response → response.json() → objeto/array JS</p>'),
        'response.json() ya convierte el JSON. No necesitas hacer JSON.parse() después.',
        {
          guide:[['Modificar','javascript/json-archivos/app.js','Crea cargarJson() y llama la función.'],['Abrir','DevTools · Network','Comprueba que datos.json responde 200.']],
          filesToCreate:[file('javascript/json-archivos/app.js','Lectura con fetch().')]
        }
      ),
      J(
        'json array objeto inspeccionar',
        '4. Saber si el JSON es un objeto o un array',
        'La estructura inicial define cómo trabajas con los datos. Si recibes un array puedes recorrerlo directamente. Si recibes un objeto, primero accedes a sus propiedades. Array.isArray(), Object.keys() y console.table() son útiles para explorar un archivo que no conoces.',
        code([
          'function inspeccionar(data) {',
          '  if (Array.isArray(data)) {',
          '    console.log("El JSON contiene un array");',
          '    console.log("Registros:", data.length);',
          '    console.table(data);',
          '    return;',
          '  }',
          '',
          '  if (data && typeof data === "object") {',
          '    console.log("El JSON contiene un objeto");',
          '    console.log("Claves:", Object.keys(data));',
          '    return;',
          '  }',
          '',
          '  console.log("Valor simple:", data);',
          '}'
        ]),
        preview('Pregunta inicial','<p style="margin:0">¿[]? → recorrer · ¿{}? → acceder a propiedad</p>'),
        'No llames .map() a ciegas. Primero confirma que la variable sea realmente un array.',
        {
          guide:[['Modificar','javascript/json-archivos/app.js','Llama inspeccionar(data) después de cargar el JSON.']],
          filesToCreate:[file('javascript/json-archivos/app.js','Inspección de la estructura.')]
        }
      ),
      J(
        'json map filter find',
        '5. Buscar, filtrar y transformar datos del archivo',
        'Una vez convertido el JSON, trabajas con métodos normales de arrays. filter() crea una selección, find() busca un registro y map() transforma cada elemento. Aquí productos es un array que podría venir directamente de productos.json.',
        code([
          'const productos = [',
          '  { id: 1, nombre: "Teclado", precio: 120000, activo: true },',
          '  { id: 2, nombre: "Mouse", precio: 70000, activo: true },',
          '  { id: 3, nombre: "Webcam", precio: 180000, activo: false }',
          '];',
          '',
          'const activos = productos.filter(function(producto) {',
          '  return producto.activo;',
          '});',
          '',
          'const mouse = productos.find(function(producto) {',
          '  return producto.id === 2;',
          '});',
          '',
          'const nombres = productos.map(function(producto) {',
          '  return producto.nombre;',
          '});',
          '',
          'console.table(activos);',
          'console.log(mouse);',
          'console.log(nombres);'
        ]),
        preview('Trabajo con datos','<p style="margin:0">JSON → array JS → filter / find / map → resultado</p>'),
        'El archivo JSON solo aporta los datos. La lógica de búsqueda y transformación pertenece a JavaScript.',
        {
          guide:[['Crear','javascript/json-archivos/productos.json','Guarda varios productos.'],['Modificar','javascript/json-archivos/app.js','Carga productos.json y aplica filter/find/map.']],
          filesToCreate:[file('javascript/json-archivos/productos.json','Array de productos.'),file('javascript/json-archivos/app.js','Transformación de datos.')]
        }
      ),
      J(
        'json render dom',
        '6. Mostrar un archivo JSON en HTML',
        'Después de cargar el archivo puedes crear elementos HTML por cada registro. Para datos provenientes de archivos o APIs usa textContent cuando sea posible; así el contenido se trata como texto y no como HTML ejecutable.',
        code([
          '// index.html:',
          '// <section id="lista"></section>',
          '',
          'const list = document.querySelector("#lista");',
          '',
          'function renderProductos(productos) {',
          '  list.replaceChildren();',
          '',
          '  for (const producto of productos) {',
          '    const article = document.createElement("article");',
          '    const title = document.createElement("h2");',
          '    const price = document.createElement("p");',
          '',
          '    title.textContent = producto.nombre;',
          '    price.textContent = "$" + producto.precio.toLocaleString("es-CO");',
          '',
          '    article.append(title, price);',
          '    list.append(article);',
          '  }',
          '}',
          '',
          'async function iniciar() {',
          '  const productos = await cargarJson();',
          '  if (Array.isArray(productos)) renderProductos(productos);',
          '}',
          '',
          'iniciar();'
        ]),
        preview('Resultado','<article style="border:1px solid #334155;border-radius:8px;padding:10px"><strong>Teclado</strong><p style="margin:5px 0 0">$120.000</p></article>'),
        'Separa cargarJson() de renderProductos(): una función obtiene datos y la otra se ocupa de la interfaz.',
        {
          guide:[['Modificar','javascript/json-archivos/index.html','Agrega #lista.'],['Modificar','javascript/json-archivos/app.js','Agrega renderProductos() e iniciar().']],
          filesToCreate:[file('javascript/json-archivos/index.html','Contenedor HTML.'),file('javascript/json-archivos/app.js','Render del JSON.')]
        }
      ),
      J(
        'json importar file input',
        '7. Importar un archivo .json elegido por el usuario',
        'No siempre necesitas fetch(). Con un input type="file" el usuario puede seleccionar un JSON de su equipo. file.text() lee el archivo como texto y JSON.parse() lo convierte en datos JavaScript. Esta técnica no modifica el archivo original.',
        code([
          '<!-- index.html -->',
          '<input id="archivo" type="file" accept="application/json,.json">',
          '<pre id="resultado"></pre>',
          '<script src="app.js" defer><\/script>',
          '',
          '// app.js',
          'const input = document.querySelector("#archivo");',
          'const output = document.querySelector("#resultado");',
          '',
          'input.addEventListener("change", async function() {',
          '  const file = input.files[0];',
          '  if (!file) return;',
          '',
          '  try {',
          '    const text = await file.text();',
          '    const data = JSON.parse(text);',
          '',
          '    output.textContent = JSON.stringify(data, null, 2);',
          '    console.log(data);',
          '  } catch (error) {',
          '    output.textContent = "El archivo no contiene JSON válido";',
          '    console.error(error);',
          '  }',
          '});'
        ]),
        preview('Importar','<p style="margin:0">input file → file.text() → JSON.parse() → objeto/array JS</p>'),
        'Aquí sí usas JSON.parse() porque file.text() entrega texto; response.json() no participa.',
        {
          guide:[['Crear','javascript/json-importar/index.html','Input de archivo y salida.'],['Crear','javascript/json-importar/app.js','Lectura con file.text() y JSON.parse().']],
          filesToCreate:[file('javascript/json-importar/index.html','Selector de archivo.'),file('javascript/json-importar/app.js','Importación de JSON.')]
        }
      ),
      J(
        'json exportar blob',
        '8. Exportar datos JavaScript como un archivo JSON',
        'El navegador no puede sobrescribir silenciosamente un archivo del proyecto, pero sí puede generar un archivo nuevo para descargar. JSON.stringify(data, null, 2) produce texto JSON legible y Blob permite convertirlo en un archivo descargable.',
        code([
          'function descargarJson(data, nombre) {',
          '  const text = JSON.stringify(data, null, 2);',
          '  const blob = new Blob([text], { type: "application/json" });',
          '  const url = URL.createObjectURL(blob);',
          '',
          '  const link = document.createElement("a");',
          '  link.href = url;',
          '  link.download = nombre;',
          '  link.click();',
          '',
          '  URL.revokeObjectURL(url);',
          '}',
          '',
          'const datos = [',
          '  { id: 1, nombre: "Teclado" },',
          '  { id: 2, nombre: "Mouse" }',
          '];',
          '',
          'descargarJson(datos, "productos.json");'
        ]),
        preview('Exportar','<p style="margin:0">objeto/array JS → JSON.stringify() → Blob → archivo .json</p>'),
        'Generar una descarga es diferente de persistir cambios en el datos.json original. Para persistencia real necesitas un backend o una base de datos.',
        {
          guide:[['Modificar','javascript/json-archivos/app.js','Agrega descargarJson().']],
          filesToCreate:[file('javascript/json-archivos/app.js','Exportación a JSON.')]
        }
      ),
      J(
        'json validar errores',
        '9. Validar datos antes de utilizarlos',
        'Que un archivo sea JSON válido no significa que tenga la estructura que tu aplicación espera. Antes de renderizar, valida que exista el array, que cada registro tenga los campos mínimos y que los tipos sean razonables.',
        code([
          'function esProducto(value) {',
          '  return Boolean(',
          '    value &&',
          '    typeof value === "object" &&',
          '    Number.isInteger(value.id) &&',
          '    typeof value.nombre === "string" &&',
          '    typeof value.precio === "number"',
          '  );',
          '}',
          '',
          'function validarProductos(data) {',
          '  if (!Array.isArray(data)) {',
          '    throw new Error("El JSON debe contener un array");',
          '  }',
          '',
          '  const invalidos = data.filter(function(item) {',
          '    return !esProducto(item);',
          '  });',
          '',
          '  if (invalidos.length) {',
          '    throw new Error("Hay productos con estructura inválida");',
          '  }',
          '',
          '  return data;',
          '}'
        ]),
        preview('Validación','<p style="margin:0">JSON válido ≠ datos válidos para tu aplicación</p>'),
        'Valida en el frontend para mejorar la experiencia, pero si guardas datos en un servidor también debes validarlos en el backend.',
        {
          guide:[['Modificar','javascript/json-archivos/app.js','Valida el resultado después de response.json().']],
          filesToCreate:[file('javascript/json-archivos/app.js','Validación de registros.')]
        }
      ),
      J(
        'json proyecto catalogo',
        '10. Proyecto · catálogo basado en productos.json',
        'Integra lectura, validación, búsqueda, filtro y render. productos.json actúa como fuente de datos de solo lectura. El estudiante puede buscar por nombre, filtrar por activos y exportar el resultado filtrado a un archivo nuevo.',
        code([
          'const searchInput = document.querySelector("#buscar");',
          'const activeOnly = document.querySelector("#solo-activos");',
          'let products = [];',
          '',
          'function aplicarFiltros() {',
          '  const term = searchInput.value.trim().toLowerCase();',
          '',
          '  const visible = products.filter(function(product) {',
          '    const matchesName = product.nombre.toLowerCase().includes(term);',
          '    const matchesState = !activeOnly.checked || product.activo;',
          '    return matchesName && matchesState;',
          '  });',
          '',
          '  renderProductos(visible);',
          '}',
          '',
          'async function iniciarCatalogo() {',
          '  const response = await fetch("./productos.json");',
          '  if (!response.ok) throw new Error("HTTP " + response.status);',
          '',
          '  products = validarProductos(await response.json());',
          '  aplicarFiltros();',
          '}',
          '',
          'searchInput.addEventListener("input", aplicarFiltros);',
          'activeOnly.addEventListener("change", aplicarFiltros);',
          '',
          'iniciarCatalogo().catch(console.error);'
        ]),
        preview('Proyecto','<p style="margin:0">productos.json → cargar → validar → buscar/filtrar → render → exportar</p>'),
        'Este proyecto sigue siendo de solo lectura. La siguiente sección añade un servidor para convertir db.json en una mini base de datos modificable.',
        {
          guide:[['Crear','javascript/catalogo-json/index.html','Buscador, checkbox y lista.'],['Crear','javascript/catalogo-json/productos.json','Datos iniciales.'],['Crear','javascript/catalogo-json/app.js','Carga, validación, filtros y render.']],
          filesToCreate:[file('javascript/catalogo-json/index.html','Interfaz del catálogo.'),file('javascript/catalogo-json/productos.json','Fuente de datos.'),file('javascript/catalogo-json/app.js','Lógica completa.')],
          exerciseTitle:'Reto · amplía el catálogo',
          exerciseTasks:['Agrega categoría a cada producto.','Crea un select para filtrar por categoría.','Muestra cuántos productos quedaron visibles.','Agrega un botón para exportar solo los resultados visibles.'],
          exerciseExtra:'Importa un JSON elegido por el usuario y reutiliza el mismo renderProductos() para mostrarlo.'
        }
      )
    ]
  });
})();
