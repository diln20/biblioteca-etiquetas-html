(()=>{
  if(window.__apiJsonHtmlJsAdded)return;
  window.__apiJsonHtmlJsAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const preview=(title,html)=>`<section style="font-family:system-ui;padding:16px;border:1px solid #334155;border-radius:12px;background:#07111f;color:#e5edf8"><strong style="display:block;margin-bottom:8px;color:#a78bfa">${title}</strong>${html}</section>`;
  const file=(path,detail)=>({path,method:'MANUAL',detail});
  const P=(tag,name,description,code,previewHtml,tip,meta={})=>T(tag,name,description,code,previewHtml,[],{
    kind:'APIs · HTML + JavaScript',
    tip,
    guideTitle:'Archivos y pasos',
    codeLabel:'Ejemplo completo · HTML + JavaScript',
    filesToCreateTitle:'Archivos que crea el estudiante',
    filesToCreateStatus:'Crea los archivos indicados. Si usas fetch() con un archivo JSON local, abre el proyecto mediante un servidor local y no directamente con file://.',
    ...meta
  });

  sections.push({
    title:'APIs · JSON con HTML y JavaScript',
    navLabel:'JSON + HTML + JavaScript',
    group:'APIs',
    primaryArea:'APIs',
    course:'APIs',
    areaOrder:130,
    description:'Aprende a usar JSON dentro de una página real. Cada práctica muestra qué va en index.html, qué va en app.js y cómo los datos pasan de JSON a elementos visibles del DOM. También incluye un archivo datos.json local, filtros, tablas y envío de JSON con formularios.',
    quote:'“El JSON no se muestra solo: JavaScript lo lee y el DOM decide cómo aparece en el HTML.”',
    challenge:'Construye un pequeño directorio de usuarios que pueda cargar datos, buscarlos, mostrarlos en tarjetas y enviar un nuevo registro como JSON.',
    items:[
      P(
        'html javascript json basico',
        '1. Objeto JavaScript → HTML',
        'Antes de usar una API, practica el paso más importante: tomar un objeto con datos y colocarlo en elementos HTML. El HTML define los lugares donde aparecerán los datos y JavaScript usa textContent para rellenarlos.',
        `<!-- index.html -->
<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Perfil</title>
</head>
<body>
  <h1 id="nombre"></h1>
  <p id="correo"></p>
  <p id="ciudad"></p>

  <script src="app.js" defer><\/script>
</body>
</html>

// app.js
const user = {
  name: "Ana Torres",
  email: "ana@example.com",
  address: {
    city: "Bucaramanga"
  }
};

document.querySelector("#nombre").textContent = user.name;
document.querySelector("#correo").textContent = user.email;
document.querySelector("#ciudad").textContent =
  user.address?.city ?? "Sin ciudad";`,
        preview('Resultado esperado','<h3 style="margin:0">Ana Torres</h3><p style="margin:6px 0 0">ana@example.com · Bucaramanga</p>'),
        'Primero entiende esta relación: dato JavaScript → seleccionar elemento → textContent.',
        {
          guide:[['Crear','javascript/json-html/01-perfil/index.html','Estructura y elementos con id.'],['Crear','javascript/json-html/01-perfil/app.js','Objeto y asignación al DOM.']],
          filesToCreate:[file('javascript/json-html/01-perfil/index.html','HTML con #nombre, #correo y #ciudad.'),file('javascript/json-html/01-perfil/app.js','Datos y render.')]
        }
      ),
      P(
        'json archivo local fetch html',
        '2. datos.json local → fetch() → HTML',
        'También puedes guardar datos en un archivo .json separado. fetch("./datos.json") lee ese archivo, response.json() lo convierte a JavaScript y después puedes recorrerlo para crear elementos. Debes abrir el proyecto mediante un servidor local; muchos navegadores bloquean fetch() cuando abres index.html directamente con file://.',
        `// datos.json
[
  {
    "id": 1,
    "nombre": "Ana",
    "programa": "Ingeniería"
  },
  {
    "id": 2,
    "nombre": "Luis",
    "programa": "Diseño"
  }
]

<!-- index.html -->
<h1>Estudiantes</h1>
<ul id="lista"></ul>
<script src="app.js" defer><\/script>

// app.js
const list = document.querySelector("#lista");

async function cargarDatos() {
  try {
    const response = await fetch("./datos.json");

    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }

    const students = await response.json();

    list.replaceChildren();

    for (const student of students) {
      const item = document.createElement("li");
      item.textContent = student.nombre + " · " + student.programa;
      list.append(item);
    }
  } catch (error) {
    list.textContent = "No se pudieron cargar los datos";
    console.error(error);
  }
}

cargarDatos();`,
        preview('Archivo local','<p style="margin:0">datos.json → fetch → response.json() → for...of → &lt;li&gt;</p>'),
        'Si aparece Failed to fetch al usar datos.json, revisa primero si abriste el proyecto con un servidor local.',
        {
          guide:[['Crear','javascript/json-html/02-json-local/index.html','Contiene #lista y carga app.js.'],['Crear','javascript/json-html/02-json-local/datos.json','Array JSON válido.'],['Crear','javascript/json-html/02-json-local/app.js','Fetch del archivo y render.'],['Abrir','Servidor local','Abre la carpeta con Live Server u otro servidor HTTP local.']],
          filesToCreate:[file('javascript/json-html/02-json-local/index.html','Vista.'),file('javascript/json-html/02-json-local/datos.json','Datos locales.'),file('javascript/json-html/02-json-local/app.js','Lectura y render.')]
        }
      ),
      P(
        'api fetch lista html',
        '3. API externa → JSON → lista HTML',
        'Ahora reemplaza el archivo local por una API real. Este ejemplo consulta usuarios de JSONPlaceholder, valida la respuesta y crea una lista usando createElement() y textContent.',
        `<!-- index.html -->
<button id="cargar" type="button">Cargar usuarios</button>
<p id="estado" aria-live="polite"></p>
<ul id="usuarios"></ul>
<script src="app.js" defer><\/script>

// app.js
const button = document.querySelector("#cargar");
const statusText = document.querySelector("#estado");
const list = document.querySelector("#usuarios");

button.addEventListener("click", cargarUsuarios);

async function cargarUsuarios() {
  statusText.textContent = "Cargando...";
  button.disabled = true;

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }

    const users = await response.json();
    list.replaceChildren();

    for (const user of users) {
      const item = document.createElement("li");
      item.textContent = user.name + " · " + user.email;
      list.append(item);
    }

    statusText.textContent = users.length + " usuarios cargados";
  } catch (error) {
    statusText.textContent = "No se pudieron cargar los usuarios";
    console.error(error);
  } finally {
    button.disabled = false;
  }
}`,
        preview('API → HTML','<button type="button">Cargar usuarios</button><p style="margin:8px 0 0">Leanne Graham · Sincere@april.biz</p>'),
        'El patrón se repite en casi cualquier API: loading → fetch → validar → JSON → recorrer → DOM.',
        {
          guide:[['Crear','javascript/json-html/03-api-lista/index.html','Botón, estado y lista.'],['Crear','javascript/json-html/03-api-lista/app.js','Fetch y DOM.']],
          filesToCreate:[file('javascript/json-html/03-api-lista/index.html','Controles de la interfaz.'),file('javascript/json-html/03-api-lista/app.js','Consumo de API.')]
        }
      ),
      P(
        'api json buscar filtrar html',
        '4. Cargar una vez y buscar desde un input',
        'No necesitas llamar la API cada vez que el usuario escribe. Puedes cargar el JSON una vez, guardarlo en un array y filtrar ese array en memoria con filter(). Después vuelves a renderizar solo los resultados coincidentes.',
        `<!-- index.html -->
<label for="buscar">Buscar usuario</label>
<input id="buscar" type="search" placeholder="Escribe un nombre">
<p id="estado" aria-live="polite"></p>
<section id="resultados"></section>
<script src="app.js" defer><\/script>

// app.js
const input = document.querySelector("#buscar");
const statusText = document.querySelector("#estado");
const container = document.querySelector("#resultados");
let users = [];

input.addEventListener("input", function() {
  const term = input.value.trim().toLowerCase();

  const filtered = users.filter(function(user) {
    return user.name.toLowerCase().includes(term);
  });

  renderUsers(filtered);
});

function renderUsers(items) {
  container.replaceChildren();

  for (const user of items) {
    const p = document.createElement("p");
    p.textContent = user.name + " · " + user.email;
    container.append(p);
  }

  statusText.textContent = items.length + " resultados";
}

async function init() {
  try {
    statusText.textContent = "Cargando...";

    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }

    users = await response.json();
    renderUsers(users);
  } catch (error) {
    statusText.textContent = "No fue posible cargar los datos";
    console.error(error);
  }
}

init();`,
        preview('Buscar','<input placeholder="Escribe un nombre"><p style="margin:8px 0 0">El filtro trabaja sobre el JSON ya cargado.</p>'),
        'Carga remota y filtrado local son tareas diferentes. Separarlas evita hacer peticiones innecesarias.',
        {
          guide:[['Crear','javascript/json-html/04-buscador/index.html','Input, estado y resultados.'],['Crear','javascript/json-html/04-buscador/app.js','Carga inicial, filter() y render.']],
          filesToCreate:[file('javascript/json-html/04-buscador/index.html','Buscador.'),file('javascript/json-html/04-buscador/app.js','Datos y filtro.')]
        }
      ),
      P(
        'api json tabla html',
        '5. Array JSON → tabla HTML',
        'Cuando los datos tienen columnas claras, una tabla puede ser mejor que tarjetas. Crea un tr por registro y un td por campo. El ejemplo usa nombre, correo y ciudad.',
        `<!-- index.html -->
<table>
  <thead>
    <tr>
      <th>Nombre</th>
      <th>Correo</th>
      <th>Ciudad</th>
    </tr>
  </thead>
  <tbody id="tbody"></tbody>
</table>
<script src="app.js" defer><\/script>

// app.js
const tbody = document.querySelector("#tbody");

function addCell(row, value) {
  const cell = document.createElement("td");
  cell.textContent = value ?? "—";
  row.append(cell);
}

async function cargarTabla() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }

    const users = await response.json();
    tbody.replaceChildren();

    for (const user of users) {
      const row = document.createElement("tr");
      addCell(row, user.name);
      addCell(row, user.email);
      addCell(row, user.address?.city);
      tbody.append(row);
    }
  } catch (error) {
    console.error(error);
  }
}

cargarTabla();`,
        preview('Tabla','<table><tr><th>Nombre</th><th>Correo</th></tr><tr><td>Ana</td><td>ana@example.com</td></tr></table>'),
        'Usa tablas para datos tabulares; usa tarjetas cuando cada elemento tenga contenido más visual o de distinta estructura.',
        {
          guide:[['Crear','javascript/json-html/05-tabla/index.html','Tabla con tbody vacío.'],['Crear','javascript/json-html/05-tabla/app.js','Crea filas y celdas desde el JSON.']],
          filesToCreate:[file('javascript/json-html/05-tabla/index.html','Tabla.'),file('javascript/json-html/05-tabla/app.js','Render tabular.')]
        }
      ),
      P(
        'formulario json post html javascript',
        '6. Formulario HTML → objeto → JSON → POST',
        'El flujo también funciona al revés. El usuario escribe en un formulario, JavaScript crea un objeto, JSON.stringify() lo convierte a JSON y fetch() lo envía al servidor. Después puedes mostrar la respuesta del servidor en la misma página.',
        `<!-- index.html -->
<form id="formulario">
  <label>
    Título
    <input id="titulo" required>
  </label>

  <label>
    Contenido
    <textarea id="contenido" required></textarea>
  </label>

  <button type="submit">Enviar</button>
</form>

<pre id="respuesta"></pre>
<script src="app.js" defer><\/script>

// app.js
const form = document.querySelector("#formulario");
const output = document.querySelector("#respuesta");

form.addEventListener("submit", enviarPost);

async function enviarPost(event) {
  event.preventDefault();

  const post = {
    title: document.querySelector("#titulo").value.trim(),
    body: document.querySelector("#contenido").value.trim(),
    userId: 1
  };

  try {
    output.textContent = "Enviando...";

    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(post)
      }
    );

    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }

    const created = await response.json();
    output.textContent = JSON.stringify(created, null, 2);
  } catch (error) {
    output.textContent = "No se pudo enviar";
    console.error(error);
  }
}`,
        preview('Formulario → JSON','<p style="margin:0">HTML form → objeto JS → JSON.stringify() → POST → response.json() → &lt;pre&gt;</p>'),
        'JSONPlaceholder simula la creación. La respuesta sirve para practicar el flujo, pero no queda guardada de forma permanente.',
        {
          guide:[['Crear','javascript/json-html/06-form-post/index.html','Formulario y pre de respuesta.'],['Crear','javascript/json-html/06-form-post/app.js','Submit, objeto, stringify y POST.']],
          filesToCreate:[file('javascript/json-html/06-form-post/index.html','Formulario.'),file('javascript/json-html/06-form-post/app.js','Envío JSON.')]
        }
      ),
      P(
        'json detalles select html javascript',
        '7. select HTML → buscar un objeto JSON → mostrar detalle',
        'Un select puede usar el id como value. Cuando cambia, find() localiza el objeto correspondiente en el array y la interfaz muestra sus datos anidados. Este patrón es útil para catálogos, usuarios, productos y ciudades.',
        `<!-- index.html -->
<label for="usuario">Usuario</label>
<select id="usuario">
  <option value="">Selecciona uno</option>
</select>
<article id="detalle"></article>
<script src="app.js" defer><\/script>

// app.js
const select = document.querySelector("#usuario");
const detail = document.querySelector("#detalle");
let users = [];

select.addEventListener("change", function() {
  const id = Number(select.value);
  const user = users.find(function(item) {
    return item.id === id;
  });

  detail.replaceChildren();

  if (!user) return;

  const title = document.createElement("h2");
  const city = document.createElement("p");

  title.textContent = user.name;
  city.textContent = "Ciudad: " + (user.address?.city ?? "Sin ciudad");

  detail.append(title, city);
});

async function init() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (!response.ok) {
    throw new Error("HTTP " + response.status);
  }

  users = await response.json();

  for (const user of users) {
    const option = document.createElement("option");
    option.value = String(user.id);
    option.textContent = user.name;
    select.append(option);
  }
}

init().catch(function(error) {
  detail.textContent = "No se pudieron cargar los usuarios";
  console.error(error);
});`,
        preview('Seleccionar y mostrar','<select><option>Selecciona uno</option><option>Ana</option></select><p style="margin:8px 0 0">select.value → find() → objeto → DOM</p>'),
        'Convierte select.value a Number si tus ids del JSON son numéricos; los values de formularios llegan como strings.',
        {
          guide:[['Crear','javascript/json-html/07-detalle/index.html','Select y article de detalle.'],['Crear','javascript/json-html/07-detalle/app.js','Carga, options, find() y render.']],
          filesToCreate:[file('javascript/json-html/07-detalle/index.html','Selector.'),file('javascript/json-html/07-detalle/app.js','Detalle por id.')]
        }
      ),
      P(
        'api json mini proyecto html js',
        '8. Mini proyecto · directorio de usuarios',
        'Combina lo aprendido: HTML contiene buscador, estado y resultados; JavaScript carga el JSON una sola vez, reduce los campos que usará la interfaz, filtra por nombre o ciudad y genera tarjetas mediante DOM.',
        `<!-- index.html -->
<!doctype html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Directorio</title>
</head>
<body>
  <main>
    <h1>Directorio de usuarios</h1>

    <label for="buscar">Buscar</label>
    <input id="buscar" type="search" placeholder="Nombre o ciudad">

    <p id="estado" aria-live="polite"></p>
    <section id="cards"></section>
  </main>

  <script src="app.js" defer><\/script>
</body>
</html>

// app.js
const input = document.querySelector("#buscar");
const statusText = document.querySelector("#estado");
const cards = document.querySelector("#cards");
let users = [];

function render(items) {
  cards.replaceChildren();

  if (!items.length) {
    statusText.textContent = "Sin resultados";
    return;
  }

  for (const user of items) {
    const card = document.createElement("article");
    const name = document.createElement("h2");
    const email = document.createElement("p");
    const city = document.createElement("p");

    name.textContent = user.name;
    email.textContent = user.email;
    city.textContent = user.city;

    card.append(name, email, city);
    cards.append(card);
  }

  statusText.textContent = items.length + " usuarios";
}

input.addEventListener("input", function() {
  const term = input.value.trim().toLowerCase();

  const filtered = users.filter(function(user) {
    return (
      user.name.toLowerCase().includes(term) ||
      user.city.toLowerCase().includes(term)
    );
  });

  render(filtered);
});

async function init() {
  try {
    statusText.textContent = "Cargando...";

    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }

    const json = await response.json();

    users = json.map(function(user) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        city: user.address?.city ?? "Sin ciudad"
      };
    });

    render(users);
  } catch (error) {
    statusText.textContent = "No se pudieron cargar los datos";
    console.error(error);
  }
}

init();`,
        preview('Flujo completo','<p style="margin:0">HTML → evento → fetch → JSON → map → filter → createElement → pantalla</p>'),
        'Cuando el proyecto crezca, puedes separar la petición, la transformación de datos y el render en funciones o módulos distintos.',
        {
          guide:[['Crear','javascript/json-html/08-directorio/index.html','Interfaz completa.'],['Crear','javascript/json-html/08-directorio/app.js','Carga, transformación, búsqueda y render.']],
          filesToCreate:[file('javascript/json-html/08-directorio/index.html','Página del directorio.'),file('javascript/json-html/08-directorio/app.js','Lógica completa.')],
          exerciseTitle:'Ejercicio para ti · amplía el directorio',
          exerciseTasks:['Muestra también teléfono y empresa.','Agrega un select para filtrar por ciudad.','Agrega un botón Limpiar búsqueda.','Muestra el número total y el número filtrado.'],
          exerciseExtra:'Cambia JSONPlaceholder por otra API pública y adapta únicamente la transformación de datos.'
        }
      )
    ]
  });
})();
