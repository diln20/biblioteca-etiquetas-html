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
    filesToCreateStatus:'Crea los archivos indicados. Estas prácticas usan APIs públicas; verifica siempre la documentación, disponibilidad, CORS y requisitos antes de un proyecto real.',
    ...meta
  });

  sections.push({
    title:'JavaScript · 10C. APIs públicas de PublicAPIs.io',
    navLabel:'APIs públicas · práctica',
    group:'JavaScript',
    primaryArea:'JavaScript',
    course:'JavaScript',
    areaOrder:205,
    description:'Practica consumo de APIs públicas en tres niveles: primero traer información solo con JavaScript, después mostrarla con HTML y finalmente construir una interfaz completa con HTML, CSS y JavaScript. Todos los ejemplos con await lo usan dentro de funciones async para que funcionen en un app.js tradicional cargado con defer.',
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
        'Empieza sin HTML adicional: el objetivo es entender la petición. Open-Meteo permite consultar condiciones meteorológicas usando latitud y longitud. fetch() devuelve una Promise con Response; después validas response.ok, conviertes el cuerpo con response.json() y lees únicamente los campos que necesitas. Importante: await está dentro de una función async, por lo que este código funciona en un app.js cargado con defer.',
        `async function consultarClima() {\n  try {\n    const url = new URL(\n      "https://api.open-meteo.com/v1/forecast"\n    );\n\n    url.searchParams.set("latitude", "7.1254");\n    url.searchParams.set("longitude", "-73.1198");\n    url.searchParams.set(\n      "current",\n      "temperature_2m,relative_humidity_2m,wind_speed_10m"\n    );\n\n    const response = await fetch(url);\n\n    if (!response.ok) {\n      throw new Error(\`HTTP \${response.status}\`);\n    }\n\n    const data = await response.json();\n\n    console.log(\n      "Temperatura:",\n      data.current.temperature_2m,\n      data.current_units.temperature_2m\n    );\n    console.log(\n      "Humedad:",\n      data.current.relative_humidity_2m,\n      data.current_units.relative_humidity_2m\n    );\n    console.log(\n      "Viento:",\n      data.current.wind_speed_10m,\n      data.current_units.wind_speed_10m\n    );\n  } catch (error) {\n    console.error("No se pudo consultar el clima", error);\n  }\n}\n\nconsultarClima();`,
        preview('Resultado en consola','<pre style="margin:0;color:#dbeafe">Temperatura: … °C\nHumedad: … %\nViento: … km/h</pre>'),
        'Si aparece “await is only valid in async functions”, revisa que no hayas copiado solo las líneas con await fuera de consultarClima().',
        {
          guide:[['Crear','javascript/public-apis/clima/index.html','Carga app.js con <script src="app.js" defer></script>.'],['Crear','javascript/public-apis/clima/app.js','Copia la función completa consultarClima(), incluida la palabra async.'],['Abrir','Navegador · DevTools · Console','Observa los valores recibidos.'],['Abrir','Navegador · DevTools · Network','Comprueba URL, status y respuesta JSON.']],
          filesToCreate:[file('javascript/public-apis/clima/index.html','HTML mínimo que carga app.js con defer.'),file('javascript/public-apis/clima/app.js','Petición completa a Open-Meteo dentro de async function.')],
          exerciseTitle:'Ejercicio para ti · cambia las coordenadas',
          exerciseTasks:['Cambia latitude y longitude por otra ubicación.','Imprime también las unidades desde current_units.','Provoca un error de URL y observa qué muestra Network.'],
          exerciseExtra:'Crea una función consultarClima(latitud, longitud) para reutilizar la petición.'
        }
      ),
      L(
        'rest countries html javascript',
        '3. HTML + JavaScript · buscador de países con REST Countries',
        'Ahora la API deja de vivir solo en la consola. El HTML aporta un input, un botón y una zona de resultado; JavaScript lee el nombre del país, consulta REST Countries y actualiza el DOM. El ejemplo valida el texto, maneja loading, 404 y errores de red, y evita ejecutar await fuera de una función async.',
        `<!-- index.html -->\n<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Buscador de países</title>\n</head>\n<body>\n  <label for="pais">País</label>\n  <input id="pais" value="Colombia">\n  <button id="buscar" type="button">Buscar</button>\n  <div id="resultado">Escribe un país.</div>\n\n  <script src="app.js" defer><\/script>\n</body>\n</html>\n\n// app.js\nconst input = document.querySelector("#pais");\nconst button = document.querySelector("#buscar");\nconst result = document.querySelector("#resultado");\n\nbutton.addEventListener("click", buscarPais);\ninput.addEventListener("keydown", function(event) {\n  if (event.key === "Enter") buscarPais();\n});\n\nasync function buscarPais() {\n  const name = input.value.trim();\n\n  if (!name) {\n    result.textContent = "Escribe el nombre de un país.";\n    return;\n  }\n\n  result.textContent = "Cargando...";\n\n  try {\n    const response = await fetch(\n      \`https://restcountries.com/v3.1/name/\${encodeURIComponent(name)}\`\n    );\n\n    if (!response.ok) {\n      throw new Error("País no encontrado");\n    }\n\n    const countries = await response.json();\n    const country = countries[0];\n    const capital = country.capital?.[0] ?? "Sin capital";\n\n    result.replaceChildren();\n\n    const title = document.createElement("h2");\n    title.textContent = country.name.common;\n\n    const capitalP = document.createElement("p");\n    capitalP.textContent = \`Capital: \${capital}\`;\n\n    const regionP = document.createElement("p");\n    regionP.textContent = \`Región: \${country.region}\`;\n\n    const populationP = document.createElement("p");\n    populationP.textContent =\n      \`Población: \${country.population.toLocaleString()}\`;\n\n    result.append(title, capitalP, regionP, populationP);\n  } catch (error) {\n    result.textContent = error.message;\n    console.error(error);\n  }\n}`,
        preview('Resultado esperado','<div><strong>Colombia</strong><p style="margin:6px 0 0">Capital · región · población</p></div>'),
        'El HTML define dónde se muestra la información; JavaScript transforma el JSON en contenido visible.',
        {
          guide:[['Crear','javascript/public-apis/paises/index.html','Crea el input, botón, resultado y carga app.js con defer.'],['Crear','javascript/public-apis/paises/app.js','Evento, función async, fetch, validación y render del país.']],
          filesToCreate:[file('javascript/public-apis/paises/index.html','Interfaz HTML completa.'),file('javascript/public-apis/paises/app.js','Lógica Fetch y DOM.')],
          exerciseTitle:'Ejercicio para ti · mejora el buscador',
          exerciseTasks:['Agrega la bandera del país usando country.flags.png o svg.','Prueba la búsqueda pulsando Enter.','Muestra moneda e idioma principal si existen.','Prueba un país inexistente y conserva un mensaje de error claro.'],
          exerciseExtra:'Agrega un botón Limpiar que borre el input y el resultado.'
        }
      ),
      L(
        'rick morty html css javascript cards',
        '4. HTML + CSS + JavaScript · tarjetas con Rick and Morty API',
        'En esta práctica se unen las tres capas. HTML crea la estructura y los controles; CSS transforma los resultados en una cuadrícula responsive; JavaScript consulta personajes, crea tarjetas y actualiza estados de carga/error. La respuesta contiene results, y cada personaje incluye nombre, estado, especie e imagen.',
        `<!-- index.html -->\n<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Personajes</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <main class="app">\n    <h1>Personajes</h1>\n    <button id="cargar" type="button">Cargar personajes</button>\n    <p id="estado" aria-live="polite"></p>\n    <section id="grid" class="grid"></section>\n  </main>\n\n  <script src="app.js" defer><\/script>\n</body>\n</html>\n\n/* styles.css */\n* { box-sizing: border-box; }\n\nbody {\n  font-family: system-ui, sans-serif;\n  margin: 0;\n  background: #08111f;\n  color: #e5edf8;\n}\n\n.app {\n  width: min(1100px, 92%);\n  margin: 40px auto;\n}\n\nbutton {\n  padding: 10px 16px;\n  border: 0;\n  border-radius: 10px;\n  cursor: pointer;\n}\n\n.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));\n  gap: 16px;\n  margin-top: 18px;\n}\n\n.card {\n  overflow: hidden;\n  border: 1px solid #334155;\n  border-radius: 14px;\n  background: #0f172a;\n}\n\n.card img {\n  width: 100%;\n  aspect-ratio: 1;\n  object-fit: cover;\n  display: block;\n}\n\n.card__body { padding: 14px; }\n.card__body h2 { margin-top: 0; }\n\n// app.js\nconst grid = document.querySelector("#grid");\nconst statusText = document.querySelector("#estado");\nconst loadButton = document.querySelector("#cargar");\n\nloadButton.addEventListener("click", loadCharacters);\n\nasync function loadCharacters() {\n  statusText.textContent = "Cargando...";\n  loadButton.disabled = true;\n  grid.replaceChildren();\n\n  try {\n    const response = await fetch(\n      "https://rickandmortyapi.com/api/character?page=1"\n    );\n\n    if (!response.ok) {\n      throw new Error(\`HTTP \${response.status}\`);\n    }\n\n    const data = await response.json();\n    const characters = data.results.slice(0, 8);\n\n    for (const character of characters) {\n      const article = document.createElement("article");\n      article.className = "card";\n\n      const img = document.createElement("img");\n      img.src = character.image;\n      img.alt = character.name;\n\n      const body = document.createElement("div");\n      body.className = "card__body";\n\n      const title = document.createElement("h2");\n      title.textContent = character.name;\n\n      const description = document.createElement("p");\n      description.textContent =\n        \`\${character.species} · \${character.status}\`;\n\n      body.append(title, description);\n      article.append(img, body);\n      grid.append(article);\n    }\n\n    statusText.textContent =\n      \`\${characters.length} personajes mostrados\`;\n  } catch (error) {\n    statusText.textContent =\n      "No fue posible cargar los personajes";\n    console.error(error);\n  } finally {\n    loadButton.disabled = false;\n  }\n}`,
        preview('Resultado esperado','<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px"><div style="border:1px solid #334155;border-radius:8px;padding:10px">Tarjeta · personaje 1</div><div style="border:1px solid #334155;border-radius:8px;padding:10px">Tarjeta · personaje 2</div></div>'),
        'HTML = estructura, CSS = presentación, JavaScript = datos y comportamiento.',
        {
          guide:[['Crear','javascript/public-apis/personajes/index.html','Título, botón, estado, grid y enlace a styles.css.'],['Crear','javascript/public-apis/personajes/styles.css','Grid responsive y tarjetas.'],['Crear','javascript/public-apis/personajes/app.js','Función async, fetch, creación segura de tarjetas y estados.']],
          filesToCreate:[file('javascript/public-apis/personajes/index.html','Estructura completa.'),file('javascript/public-apis/personajes/styles.css','Diseño responsive.'),file('javascript/public-apis/personajes/app.js','Consumo de API y DOM.')],
          exerciseTitle:'Ejercicio para ti · personaliza la galería',
          exerciseTasks:['Agrega un input con tu nombre y muéstralo como autor de la práctica.','Cambia la cantidad de personajes mostrados.','Agrega color distinto para Alive, Dead y unknown.','Añade un filtro por nombre usando el parámetro name de la API.'],
          exerciseExtra:'Agrega paginación con botones Anterior y Siguiente usando data.info.prev y data.info.next.'
        }
      ),
      L(
        'comparar practicas api',
        '5. De consola a interfaz completa · qué aprendiste',
        'Las tres prácticas representan una progresión real. En la primera solo verificas datos con JavaScript. En la segunda conectas API y DOM mediante HTML. En la tercera introduces CSS para convertir los datos remotos en una interfaz responsive. El patrón importante se mantiene: evento → loading → función async → fetch → comprobar response.ok → response.json() → transformar datos → render → manejar error.',
        'NIVEL 1\nJavaScript + fetch + console\n\nNIVEL 2\nHTML + JavaScript + DOM + fetch\n\nNIVEL 3\nHTML + CSS + JavaScript + API + estados de UI\n\nPATRÓN\nacción → loading → async → fetch → validar → JSON → render → error',
        preview('Progresión','<p style="margin:0">Consola → DOM → interfaz responsive con datos externos.</p>'),
        'Regla práctica: en app.js tradicional, coloca cada await dentro de una función async. Si usas await en el nivel superior, entonces el script debe ser type="module".',
        {
          guide:[['Revisar','javascript/public-apis/','Compara las tres carpetas y explica qué responsabilidad aparece en cada nivel.']],
          filesToCreate:[file('javascript/public-apis/README.md','Resume qué aprendiste y qué API usarías para un proyecto propio.')],
          exerciseTitle:'Ejercicio final · usa otra API del directorio',
          exerciseTasks:['Elige otra API de PublicAPIs.io.','Crea una versión mínima que muestre datos en consola.','Después crea HTML para mostrarlos.','Finalmente agrega CSS y estados loading/error.','Documenta el endpoint y los campos usados.'],
          exerciseExtra:'Separa la petición en api.js y el render en ui.js usando módulos cuando ya domines esta versión.'
        }
      )
    ]
  });
})();
