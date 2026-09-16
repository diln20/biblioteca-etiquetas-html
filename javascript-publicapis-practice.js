(()=>{
  if(window.__javascriptPublicApisPracticeAdded)return;
  window.__javascriptPublicApisPracticeAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const preview=(title,html)=>`<section style="font-family:system-ui;padding:16px;border:1px solid #334155;border-radius:12px;background:#07111f;color:#e5edf8"><strong style="display:block;margin-bottom:8px;color:#38bdf8">${title}</strong>${html}</section>`;
  const file=(path,detail)=>({path,method:'MANUAL',detail});
  const L=(topic,name,description,code,previewHtml,tip,meta={})=>T(topic,name,description,code,previewHtml,[],{
    kind:'JavaScript · APIs públicas',
    tip,
    guideTitle:'Dónde se hace cada modificación',
    codeLabel:'Código del ejemplo',
    filesToCreateTitle:'Archivos que crea el estudiante',
    filesToCreateStatus:'Crea los archivos indicados. Estas prácticas usan APIs públicas que aparecen en PublicAPIs.io; verifica siempre la documentación y disponibilidad antes de un proyecto real.',
    ...meta
  });

  sections.push({
    title:'JavaScript · 10C. APIs públicas de PublicAPIs.io',
    navLabel:'APIs públicas · práctica',
    group:'JavaScript',
    primaryArea:'JavaScript',
    course:'JavaScript',
    areaOrder:205,
    description:'Practica consumo de APIs públicas encontradas en PublicAPIs.io en tres niveles: primero traer información solo con JavaScript, después mostrarla con HTML y finalmente construir una interfaz completa con HTML, CSS y JavaScript.',
    quote:'“Una API se aprende mejor cuando pasas de ver JSON en consola a convertir esos datos en una interfaz útil.”',
    challenge:'Completa las tres prácticas y después cambia una de las APIs por otra del directorio PublicAPIs.io manteniendo loading, error y resultado.',
    items:[
      L(
        'publicapis directorio',
        '1. Cómo elegir una API en PublicAPIs.io',
        'PublicAPIs.io funciona como un directorio de APIs públicas por categorías. Antes de copiar un endpoint revisa qué información ofrece, si requiere autenticación, si permite llamadas desde navegador, cuáles son sus límites y cuál es la documentación oficial. Para estas prácticas usamos Open-Meteo, REST Countries y Rick and Morty porque permiten aprender distintos tipos de respuestas: datos meteorológicos, datos geográficos y colecciones con imágenes.',
        'Flujo recomendado:\n\n1. Buscar una API en PublicAPIs.io\n2. Abrir su documentación\n3. Identificar el endpoint\n4. Probar la URL\n5. Revisar el JSON\n6. Consumir con fetch()\n7. Validar response.ok\n8. Mostrar loading / error / resultado',
        preview('Antes de programar','<p style="margin:0">Directorio → documentación → endpoint → JSON → fetch() → interfaz.</p>'),
        'No asumas que una API seguirá igual para siempre: endpoints, límites y requisitos pueden cambiar.',
        {
          guide:[['Consultar','publicapis.io','Busca una API por categoría y abre la ficha.'],['Revisar','Documentación oficial de la API','Confirma endpoint, parámetros, CORS, autenticación y límites.']],
          filesToCreate:[file('javascript/public-apis/README.md','Anota la API elegida, endpoint, campos usados y si necesita autenticación.')],
          exerciseTitle:'Ejercicio para ti · investiga una API',
          exerciseTasks:['Entra a PublicAPIs.io y elige una API distinta a las tres usadas aquí.','Escribe qué endpoint usarías y qué campos del JSON te interesan.','Indica si la consumirías directamente desde frontend o mediante backend.'],
          exerciseExtra:'Busca dos APIs de la misma categoría y compara cuál tiene una respuesta más fácil de usar para un principiante.'
        }
      ),
      L(
        'fetch open meteo consola',
        '2. Solo JavaScript · traer información con Open-Meteo',
        'Empieza sin HTML adicional: el objetivo es entender la petición. Open-Meteo permite consultar condiciones meteorológicas usando latitud y longitud. fetch() devuelve una Promise con Response; después validas response.ok, conviertes el cuerpo con response.json() y lees únicamente los campos que necesitas.',
        `async function consultarClima() {\n  const url = new URL(\n    "https://api.open-meteo.com/v1/forecast"\n  );\n\n  url.searchParams.set("latitude", "7.1254");\n  url.searchParams.set("longitude", "-73.1198");\n  url.searchParams.set(\n    "current",\n    "temperature_2m,relative_humidity_2m,wind_speed_10m"\n  );\n\n  const response = await fetch(url);\n\n  if (!response.ok) {\n    throw new Error(\`HTTP \${response.status}\`);\n  }\n\n  const data = await response.json();\n\n  console.log("Temperatura:", data.current.temperature_2m);\n  console.log("Humedad:", data.current.relative_humidity_2m);\n  console.log("Viento:", data.current.wind_speed_10m);\n}\n\nconsultarClima();`,
        preview('Resultado en consola','<pre style="margin:0;color:#dbeafe">Temperatura: …\nHumedad: …\nViento: …</pre>'),
        'Primero aprende a inspeccionar la respuesta en consola; después construye la interfaz.',
        {
          guide:[['Crear','javascript/public-apis/clima/app.js','Escribe la petición Fetch y revisa data.current.'],['Abrir','Navegador · DevTools · Console','Observa los valores recibidos.'],['Abrir','Navegador · DevTools · Network','Comprueba URL, status y respuesta JSON.']],
          filesToCreate:[file('javascript/public-apis/clima/app.js','Petición a Open-Meteo.')],
          exerciseTitle:'Ejercicio para ti · cambia las coordenadas',
          exerciseTasks:['Cambia latitude y longitude por otra ubicación.','Imprime también la unidad de temperatura usando current_units.','Provoca un error de URL y observa qué muestra Network.'],
          exerciseExtra:'Crea una función consultarClima(latitud, longitud) para reutilizar la petición.'
        }
      ),
      L(
        'rest countries html javascript',
        '3. HTML + JavaScript · buscador de países con REST Countries',
        'Ahora la API deja de vivir solo en la consola. El HTML aporta un input, un botón y una zona de resultado; JavaScript lee el nombre del país, consulta REST Countries y actualiza el DOM. Es una buena práctica para unir formularios, eventos, fetch(), objetos anidados y manejo de 404.',
        `<!-- index.html -->\n<label for="pais">País</label>\n<input id="pais" value="Colombia">\n<button id="buscar">Buscar</button>\n<div id="resultado">Escribe un país.</div>\n<script src="app.js" defer><\/script>\n\n// app.js\nconst input = document.querySelector("#pais");\nconst button = document.querySelector("#buscar");\nconst result = document.querySelector("#resultado");\n\nbutton.addEventListener("click", buscarPais);\n\nasync function buscarPais() {\n  const name = input.value.trim();\n  if (!name) return;\n\n  result.textContent = "Cargando...";\n\n  try {\n    const response = await fetch(\n      \`https://restcountries.com/v3.1/name/\${encodeURIComponent(name)}\`\n    );\n\n    if (!response.ok) throw new Error("País no encontrado");\n\n    const [country] = await response.json();\n    const capital = country.capital?.[0] ?? "Sin capital";\n\n    result.innerHTML = \`\n      <h2>\${country.name.common}</h2>\n      <p>Capital: \${capital}</p>\n      <p>Región: \${country.region}</p>\n      <p>Población: \${country.population.toLocaleString()}</p>\n    \`;\n  } catch (error) {\n    result.textContent = error.message;\n  }\n}`,
        preview('Resultado esperado','<div><strong>Colombia</strong><p style="margin:6px 0 0">Capital · región · población</p></div>'),
        'El HTML define dónde se muestra la información; JavaScript transforma el JSON en contenido visible.',
        {
          guide:[['Crear','javascript/public-apis/paises/index.html','Input, botón y contenedor #resultado.'],['Crear','javascript/public-apis/paises/app.js','Evento, fetch, validación y render del país.']],
          filesToCreate:[file('javascript/public-apis/paises/index.html','Interfaz HTML.'),file('javascript/public-apis/paises/app.js','Lógica Fetch y DOM.')],
          exerciseTitle:'Ejercicio para ti · mejora el buscador',
          exerciseTasks:['Agrega la bandera del país usando country.flags.png o svg.','Permite buscar pulsando Enter.','Muestra moneda e idioma principal si existen.','Prueba un país inexistente y conserva un mensaje de error claro.'],
          exerciseExtra:'En lugar de innerHTML, crea al menos dos elementos con document.createElement() y textContent.'
        }
      ),
      L(
        'rick morty html css javascript cards',
        '4. HTML + CSS + JavaScript · tarjetas con Rick and Morty API',
        'En esta práctica se unen las tres capas. HTML crea la estructura y los controles; CSS transforma los resultados en una cuadrícula responsive; JavaScript consulta personajes, crea tarjetas y actualiza estados de carga/error. La respuesta contiene results, y cada personaje incluye nombre, estado, especie e imagen.',
        `<!-- index.html -->\n<main class="app">\n  <h1>Personajes</h1>\n  <button id="cargar">Cargar personajes</button>\n  <p id="estado"></p>\n  <section id="grid" class="grid"></section>\n</main>\n<script src="app.js" defer><\/script>\n\n/* styles.css */\nbody {\n  font-family: system-ui, sans-serif;\n  margin: 0;\n  background: #08111f;\n  color: #e5edf8;\n}\n\n.app {\n  width: min(1100px, 92%);\n  margin: 40px auto;\n}\n\n.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));\n  gap: 16px;\n}\n\n.card {\n  overflow: hidden;\n  border: 1px solid #334155;\n  border-radius: 14px;\n  background: #0f172a;\n}\n\n.card img {\n  width: 100%;\n  display: block;\n}\n\n.card__body { padding: 14px; }\n\n// app.js\nconst grid = document.querySelector("#grid");\nconst statusText = document.querySelector("#estado");\n\ndocument.querySelector("#cargar").addEventListener("click", loadCharacters);\n\nasync function loadCharacters() {\n  statusText.textContent = "Cargando...";\n  grid.replaceChildren();\n\n  try {\n    const response = await fetch(\n      "https://rickandmortyapi.com/api/character?page=1"\n    );\n    if (!response.ok) throw new Error(\`HTTP \${response.status}\`);\n\n    const data = await response.json();\n\n    for (const character of data.results.slice(0, 8)) {\n      const article = document.createElement("article");\n      article.className = "card";\n      article.innerHTML = \`\n        <img src="\${character.image}" alt="\${character.name}">\n        <div class="card__body">\n          <h2>\${character.name}</h2>\n          <p>\${character.species} · \${character.status}</p>\n        </div>\n      \`;\n      grid.append(article);\n    }\n\n    statusText.textContent = \`\${data.results.length} resultados recibidos\`;\n  } catch (error) {\n    statusText.textContent = "No fue posible cargar los personajes";\n    console.error(error);\n  }\n}`,
        preview('Resultado esperado','<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px"><div style="border:1px solid #334155;border-radius:8px;padding:10px">Tarjeta · personaje 1</div><div style="border:1px solid #334155;border-radius:8px;padding:10px">Tarjeta · personaje 2</div></div>'),
        'HTML = estructura, CSS = presentación, JavaScript = datos y comportamiento.',
        {
          guide:[['Crear','javascript/public-apis/personajes/index.html','Título, botón, estado y grid.'],['Crear','javascript/public-apis/personajes/styles.css','Grid responsive y tarjetas.'],['Crear','javascript/public-apis/personajes/app.js','Fetch, creación de tarjetas y estados.']],
          filesToCreate:[file('javascript/public-apis/personajes/index.html','Estructura.'),file('javascript/public-apis/personajes/styles.css','Diseño responsive.'),file('javascript/public-apis/personajes/app.js','Consumo de API y DOM.')],
          exerciseTitle:'Ejercicio para ti · personaliza la galería',
          exerciseTasks:['Agrega un input con tu nombre y muéstralo como autor de la práctica.','Cambia la cantidad de personajes mostrados.','Agrega color distinto para Alive, Dead y unknown.','Añade un filtro por nombre usando el parámetro name de la API.'],
          exerciseExtra:'Agrega paginación con botones Anterior y Siguiente usando data.info.prev y data.info.next.'
        }
      ),
      L(
        'comparar practicas api',
        '5. De consola a interfaz completa · qué aprendiste',
        'Las tres prácticas representan una progresión real. En la primera solo verificas datos con JavaScript. En la segunda conectas API y DOM mediante HTML. En la tercera introduces CSS para convertir los datos remotos en una interfaz responsive. El patrón importante se mantiene: evento → loading → fetch → comprobar response.ok → response.json() → transformar datos → render → manejar error.',
        'NIVEL 1\nJavaScript + fetch + console\n\nNIVEL 2\nHTML + JavaScript + DOM + fetch\n\nNIVEL 3\nHTML + CSS + JavaScript + API + estados de UI\n\nPATRÓN\nacción → loading → fetch → validar → JSON → render → error',
        preview('Progresión','<p style="margin:0">Consola → DOM → interfaz responsive con datos externos.</p>'),
        'Si puedes cambiar la API sin rehacer toda la interfaz, estás empezando a separar correctamente datos, lógica y presentación.',
        {
          guide:[['Revisar','javascript/public-apis/','Compara las tres carpetas y explica qué responsabilidad aparece en cada nivel.']],
          filesToCreate:[file('javascript/public-apis/README.md','Resume qué aprendiste y qué API usarías para un proyecto propio.')],
          exerciseTitle:'Ejercicio final · usa otra API del directorio',
          exerciseTasks:['Elige otra API de PublicAPIs.io.','Crea una versión mínima que muestre datos en consola.','Después crea HTML para mostrarlos.','Finalmente agrega CSS y estados loading/error.','Documenta el endpoint y los campos usados.'],
          exerciseExtra:'Separa la petición en api.js y el render en ui.js para practicar módulos.'
        }
      )
    ]
  });
})();