(()=>{
  if(window.__apiJsonCheatSheetAdded)return;
  window.__apiJsonCheatSheetAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const preview=(title,html)=>`<section style="font-family:system-ui;padding:16px;border:1px solid #334155;border-radius:12px;background:#07111f;color:#e5edf8"><strong style="display:block;margin-bottom:8px;color:#22d3ee">${title}</strong>${html}</section>`;
  const file=(path,detail)=>({path,method:'MANUAL',detail});
  const Q=(tag,name,description,code,previewHtml,tip,meta={})=>T(tag,name,description,code,previewHtml,[],{
    kind:'Chuleta · APIs y JSON',
    tip,
    guideTitle:'Cómo usar esta chuleta',
    codeLabel:'Código rápido · APIs y JSON',
    filesToCreateTitle:'Archivos para practicar',
    filesToCreateStatus:'Puedes copiar cada ejemplo en un app.js cargado con defer. Los ejemplos que usan await lo hacen dentro de funciones async.',
    ...meta
  });

  sections.push({
    title:'APIs · Chuleta JSON y datos',
    navLabel:'Chuleta API + JSON',
    group:'APIs',
    primaryArea:'APIs',
    course:'APIs',
    areaOrder:120,
    description:'Referencia rápida para recibir JSON desde una API, entender su estructura, acceder a propiedades, recorrer arrays, transformar datos, mostrarlos en HTML, guardarlos y enviarlos de nuevo al servidor.',
    quote:'“La API entrega datos; JSON los representa; JavaScript los transforma en algo útil para la interfaz.”',
    challenge:'Consume una API pública, identifica si devuelve un objeto o un array, transforma sus datos y muéstralos en tarjetas sin insertar HTML no confiable.',
    items:[
      Q(
        'json sintaxis',
        '1. Qué es JSON y cómo reconocerlo',
        'JSON es un formato de texto para intercambiar datos. Sus objetos usan llaves, sus listas usan corchetes y los nombres de las propiedades deben ir entre comillas dobles. Puede contener string, number, boolean, null, objetos y arrays. JSON no admite funciones, comentarios ni undefined.',
        `{
  "id": 25,
  "nombre": "Pikachu",
  "activo": true,
  "imagen": null,
  "tipos": ["electric"],
  "estadisticas": {
    "ataque": 55,
    "defensa": 40
  }
}`,
        preview('Forma del JSON','<p style="margin:0">{ objeto } · [ array ] · "texto" · número · true/false · null</p>'),
        'JSON es texto. Después de convertirlo con response.json() o JSON.parse(), trabajas con objetos y arrays normales de JavaScript.',
        {
          guide:[['Observar','DevTools · Network · Response','Mira primero la forma real del JSON antes de escribir el código.']],
          filesToCreate:[file('javascript/api-json/app.js','Archivo para probar los ejemplos de la chuleta.')]
        }
      ),
      Q(
        'fetch response json',
        '2. De fetch() a un objeto JavaScript con response.json()',
        'fetch() entrega un Response. response.json() lee el cuerpo y convierte el texto JSON en valores de JavaScript. Antes de leerlo, valida response.ok para distinguir una respuesta HTTP exitosa de un 404 o 500.',
        `async function cargarUsuario() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1"
    );

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}\`);
    }

    const data = await response.json();

    console.log(data);
    console.log(data.name);
    console.log(data.email);
  } catch (error) {
    console.error("No se pudo leer la API", error);
  }
}

cargarUsuario();`,
        preview('Flujo','<p style="margin:0">fetch() → Response → response.ok → response.json() → objeto JavaScript</p>'),
        'No escribas await response.json() fuera de una función async si app.js se carga como script clásico.',
        {
          guide:[['Crear','javascript/api-json/index.html','Carga app.js con <script src="app.js" defer></script>.'],['Crear','javascript/api-json/app.js','Escribe la función async completa.']],
          filesToCreate:[file('javascript/api-json/index.html','HTML mínimo con app.js defer.'),file('javascript/api-json/app.js','Fetch y lectura del JSON.')]
        }
      ),
      Q(
        'json objeto array',
        '3. Saber si recibiste un objeto o un array',
        'Muchas APIs devuelven un objeto individual; otras devuelven una lista. Array.isArray() permite distinguirlos. Object.keys() ayuda a inspeccionar las propiedades disponibles cuando recibes un objeto.',
        `function inspeccionar(data) {
  if (Array.isArray(data)) {
    console.log("Es un array");
    console.log("Cantidad:", data.length);
    console.log("Primer elemento:", data[0]);
    return;
  }

  if (data && typeof data === "object") {
    console.log("Es un objeto");
    console.log("Propiedades:", Object.keys(data));
    return;
  }

  console.log("Valor simple:", data);
}

inspeccionar([{ id: 1 }, { id: 2 }]);
inspeccionar({ id: 1, nombre: "Ana" });`,
        preview('Pregunta inicial','<p style="margin:0">¿data es [] o {}? Esa respuesta cambia cómo debes recorrerlo.</p>'),
        'Antes de usar .map(), confirma que el valor realmente sea un array.',
        {
          guide:[['Abrir','DevTools · Console','Usa Array.isArray(data), Object.keys(data) y console.table().']],
          filesToCreate:[file('javascript/api-json/app.js','Función de inspección de datos.')]
        }
      ),
      Q(
        'json nested optional chaining',
        '4. Acceder a propiedades y datos anidados',
        'Usa punto para propiedades conocidas, corchetes cuando el nombre sea dinámico y [índice] para posiciones de arrays. Optional chaining ?. evita errores cuando un nivel puede no existir; ?? permite definir un valor alternativo solo cuando el resultado es null o undefined.',
        `const user = {
  id: 1,
  name: "Leanne",
  address: {
    city: "Gwenborough"
  },
  tags: ["admin", "active"]
};

console.log(user.name);
console.log(user["id"]);
console.log(user.address.city);
console.log(user.tags[0]);

const country = user.address?.country ?? "Sin país";
console.log(country);`,
        preview('Acceso','<p style="margin:0">objeto.propiedad · objeto[clave] · array[0] · objeto?.nivel?.campo ?? valor</p>'),
        'Optional chaining ayuda con campos opcionales, pero no reemplaza entender la estructura de la respuesta.',
        {
          guide:[['Revisar','Respuesta JSON de la API','Sigue la ruta desde el objeto principal hasta el campo que necesitas.']],
          filesToCreate:[file('javascript/api-json/app.js','Práctica de propiedades y datos anidados.')]
        }
      ),
      Q(
        'json arrays map filter find',
        '5. Recorrer y transformar arrays recibidos de una API',
        'forEach ejecuta una acción por elemento; map crea un nuevo array transformado; filter conserva los elementos que cumplen una condición; find devuelve el primer elemento que coincide. Estas operaciones son muy comunes después de response.json().',
        `const users = [
  { id: 1, name: "Ana", active: true },
  { id: 2, name: "Luis", active: false },
  { id: 3, name: "Sara", active: true }
];

users.forEach(function(user) {
  console.log(user.name);
});

const names = users.map(function(user) {
  return user.name;
});

const activeUsers = users.filter(function(user) {
  return user.active;
});

const selected = users.find(function(user) {
  return user.id === 2;
});

console.log(names);
console.log(activeUsers);
console.log(selected);`,
        preview('Transformación','<p style="margin:0">JSON array → filter() → map() → datos listos para mostrar</p>'),
        'map() no modifica el array original: produce otro array con el resultado de la transformación.',
        {
          guide:[['Modificar','javascript/api-json/app.js','Prueba cada método por separado y revisa el resultado en consola.']],
          filesToCreate:[file('javascript/api-json/app.js','Transformación de arrays JSON.')]
        }
      ),
      Q(
        'json dom render html',
        '6. Convertir datos JSON en HTML de forma segura',
        'Una API normalmente termina alimentando la interfaz. Crea elementos con document.createElement() y coloca datos externos con textContent. Así el navegador los trata como texto y no como HTML ejecutable.',
        `// index.html:
// <section id="usuarios"></section>

const container = document.querySelector("#usuarios");

function renderUsers(users) {
  container.replaceChildren();

  for (const user of users) {
    const card = document.createElement("article");
    const title = document.createElement("h2");
    const email = document.createElement("p");

    title.textContent = user.name ?? "Sin nombre";
    email.textContent = user.email ?? "Sin correo";

    card.append(title, email);
    container.append(card);
  }
}

renderUsers([
  { name: "Ana", email: "ana@example.com" },
  { name: "Luis", email: "luis@example.com" }
]);`,
        preview('JSON → DOM','<article style="border:1px solid #334155;border-radius:8px;padding:10px"><strong>Ana</strong><p style="margin:5px 0 0">ana@example.com</p></article>'),
        'Evita insertar datos externos directamente con innerHTML cuando no controlas completamente su contenido.',
        {
          guide:[['Crear','javascript/api-json/index.html','Agrega <section id="usuarios"></section>.'],['Modificar','javascript/api-json/app.js','Crea los nodos y usa textContent.']],
          filesToCreate:[file('javascript/api-json/index.html','Contenedor para los datos.'),file('javascript/api-json/app.js','Render seguro del JSON.')]
        }
      ),
      Q(
        'json stringify post api',
        '7. Enviar un objeto JavaScript como JSON',
        'Para enviar JSON con fetch(), convierte el objeto con JSON.stringify() y declara Content-Type: application/json. JSONPlaceholder permite practicar POST, aunque sus escrituras son simuladas y no se guardan de forma permanente.',
        `async function crearPost() {
  const post = {
    title: "Práctica JSON",
    body: "Datos enviados desde JavaScript",
    userId: 1
  };

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
    throw new Error(\`HTTP \${response.status}\`);
  }

  const created = await response.json();
  console.log(created);
}

crearPost().catch(console.error);`,
        preview('Envío','<p style="margin:0">objeto JS → JSON.stringify() → body HTTP → servidor → response.json()</p>'),
        'JSON.stringify() convierte un valor JavaScript en texto JSON; no es lo mismo que response.json().',
        {
          guide:[['Modificar','javascript/api-json/app.js','Crea un objeto, conviértelo con JSON.stringify() y envíalo con POST.'],['Abrir','DevTools · Network','Revisa Request Payload y Response.']],
          filesToCreate:[file('javascript/api-json/app.js','POST con JSON.')]
        }
      ),
      Q(
        'json parse stringify storage',
        '8. JSON.parse() y JSON.stringify()',
        'JSON.stringify() convierte un objeto o array de JavaScript a texto JSON. JSON.parse() hace el camino inverso. Esto es necesario, por ejemplo, para guardar objetos en localStorage, que almacena strings.',
        `const preferences = {
  theme: "dark",
  pageSize: 20
};

const jsonText = JSON.stringify(preferences);
console.log(jsonText);

const restored = JSON.parse(jsonText);
console.log(restored.theme);

localStorage.setItem(
  "preferences",
  JSON.stringify(preferences)
);

const saved = JSON.parse(
  localStorage.getItem("preferences") ?? "{}"
);

console.log(saved);`,
        preview('Conversión','<p style="margin:0">Objeto JS ⇄ texto JSON · stringify() → · ← parse()</p>'),
        'No uses JSON.parse() sobre un objeto que ya fue convertido por response.json(); response.json() ya hizo esa conversión.',
        {
          guide:[['Modificar','javascript/api-json/app.js','Prueba stringify, parse y localStorage con objetos sencillos.']],
          filesToCreate:[file('javascript/api-json/app.js','Conversión y almacenamiento JSON.')]
        }
      ),
      Q(
        'json errores content type',
        '9. Manejar JSON inválido, respuestas vacías y campos faltantes',
        'response.json() puede fallar si el cuerpo no contiene JSON válido. Algunas respuestas, como ciertos DELETE, pueden venir sin cuerpo. Para código robusto revisa status, Content-Type y usa try/catch cuando la respuesta pueda variar.',
        `async function leerRespuesta(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}\`);
  }

  if (response.status === 204) {
    return null;
  }

  const type = response.headers.get("content-type") || "";

  if (!type.includes("application/json")) {
    const text = await response.text();
    return { text };
  }

  return response.json();
}

async function probar() {
  try {
    const data = await leerRespuesta(
      "https://jsonplaceholder.typicode.com/users/1"
    );

    console.log(data?.name ?? "Sin nombre");
  } catch (error) {
    console.error("Respuesta no utilizable", error);
  }
}

probar();`,
        preview('Respuesta robusta','<p style="margin:0">status → content-type → JSON / texto / sin cuerpo → interfaz</p>'),
        'No asumas que toda respuesta HTTP contiene JSON, incluso si la mayoría de endpoints de una API sí lo hacen.',
        {
          guide:[['Abrir','DevTools · Network','Revisa Status, Response Headers y Response antes de depurar tu código.']],
          filesToCreate:[file('javascript/api-json/app.js','Lectura robusta de respuestas.')]
        }
      ),
      Q(
        'api json proyecto completo',
        '10. Flujo completo · API → JSON → filtrar → mostrar',
        'Este ejemplo reúne el flujo más habitual: pedir una lista, convertirla a JavaScript, filtrar los campos útiles y convertir cada registro en elementos visibles del DOM.',
        `// index.html:
// <button id="cargar" type="button">Cargar usuarios</button>
// <p id="estado" aria-live="polite"></p>
// <section id="lista"></section>

const loadButton = document.querySelector("#cargar");
const statusText = document.querySelector("#estado");
const list = document.querySelector("#lista");

loadButton.addEventListener("click", loadUsers);

async function loadUsers() {
  statusText.textContent = "Cargando...";
  loadButton.disabled = true;

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}\`);
    }

    const json = await response.json();

    const users = json.map(function(user) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        city: user.address?.city ?? "Sin ciudad"
      };
    });

    list.replaceChildren();

    for (const user of users) {
      const card = document.createElement("article");
      const title = document.createElement("h2");
      const detail = document.createElement("p");

      title.textContent = user.name;
      detail.textContent = user.email + " · " + user.city;

      card.append(title, detail);
      list.append(card);
    }

    statusText.textContent = users.length + " usuarios cargados";
  } catch (error) {
    statusText.textContent = "No se pudieron cargar los usuarios";
    console.error(error);
  } finally {
    loadButton.disabled = false;
  }
}`,
        preview('Patrón que debes recordar','<p style="margin:0">evento → loading → fetch → response.ok → response.json() → map/filter → DOM → error/finally</p>'),
        'Separa mentalmente dos tareas: primero preparar los datos y después renderizarlos. Esa división hace el código más fácil de entender.',
        {
          guide:[['Crear','javascript/api-json/index.html','Botón, estado y sección de resultados.'],['Crear','javascript/api-json/app.js','Fetch, transformación y render.'],['Abrir','DevTools · Network','Compara el JSON original con el objeto reducido que usa la interfaz.']],
          filesToCreate:[file('javascript/api-json/index.html','Interfaz mínima.'),file('javascript/api-json/app.js','Flujo completo de API y JSON.')]
        }
      )
    ]
  });
})();
