(()=>{
  if(window.__javascriptAuthenticatedApisIgdbAdded)return;
  window.__javascriptAuthenticatedApisIgdbAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const preview=(title,html)=>`<section style="font-family:system-ui;padding:16px;border:1px solid #334155;border-radius:12px;background:#07111f;color:#e5edf8"><strong style="display:block;margin-bottom:8px;color:#22d3ee">${title}</strong>${html}</section>`;
  const file=(path,detail)=>({path,method:'MANUAL',detail});
  const code=lines=>lines.join('\n');
  const I=(tag,name,description,snippet,previewHtml,tip,meta={})=>T(tag,name,description,snippet,previewHtml,[],{
    kind:'JavaScript · APIs autenticadas · Node.js',
    tip,
    guideTitle:'Dónde se hace cada modificación',
    codeLabel:'Código práctico · API autenticada',
    filesToCreateTitle:'Archivos para practicar',
    filesToCreateStatus:'Usa credenciales de prueba propias. Nunca publiques Client Secret ni Access Token en GitHub o en JavaScript que se ejecute directamente en el navegador.',
    ...meta
  });

  sections.push({
    title:'JavaScript · 10F. APIs autenticadas con Node.js · IGDB',
    navLabel:'APIs autenticadas · IGDB',
    group:'JavaScript',
    primaryArea:'JavaScript',
    course:'JavaScript',
    areaOrder:230,
    description:'Desarma y entiende una petición real a una API que exige autenticación. IGDB sirve como ejemplo para aprender Node.js, fetch, headers, Client-ID, Bearer tokens, POST, cuerpos de consulta, variables de entorno, OAuth2, errores HTTP y por qué algunas APIs deben consumirse desde un backend y no directamente desde el navegador.',
    quote:'“Una API autenticada no cambia cómo funciona fetch; añade credenciales, reglas de seguridad y un contrato más estricto para la petición.”',
    challenge:'Crea un pequeño backend Node.js que consulte IGDB sin exponer credenciales. Tu navegador debe pedir /api/games a tu servidor y tu servidor debe realizar la petición autenticada a IGDB.',
    items:[
      I(
        'igdb codigo original fetch node',
        '1. Qué intenta hacer este código',
        'El ejemplo realiza una petición desde Node.js al endpoint games de IGDB. Envía credenciales en headers, escribe una consulta en el body y recibe como respuesta un array JSON de videojuegos. El flujo es: cargar fetch → preparar URL → preparar headers → preparar consulta → POST → convertir respuesta a JSON → usar los datos.',
        code([
          'const fetch = require("node-fetch");',
          '',
          'const url = "https://api.igdb.com/v4/games";',
          '',
          'const headers = {',
          '  "Client-ID": "YOUR_CLIENT_ID",',
          '  "Authorization": "Bearer YOUR_ACCESS_TOKEN"',
          '};',
          '',
          'const query = `',
          '  fields name, release_dates.human, genres.name, platforms.name;',
          '  limit 10;',
          '`;',
          '',
          'fetch(url, {',
          '  method: "POST",',
          '  headers: headers,',
          '  body: query',
          '})',
          '  .then(function(response) {',
          '    if (!response.ok) {',
          '      throw new Error("HTTP " + response.status);',
          '    }',
          '    return response.json();',
          '  })',
          '  .then(function(data) {',
          '    console.log(data);',
          '  })',
          '  .catch(function(error) {',
          '    console.error("Error:", error);',
          '  });'
        ]),
        preview('Flujo completo','<p style="margin:0">Node.js → POST + headers + query → IGDB → Response → response.json() → array de juegos</p>'),
        'La versión de arriba corrige el enlace Markdown del ejemplo y valida response.ok antes de leer el JSON.',
        {
          guide:[['Crear','javascript/igdb/app.js','Petición autenticada.'],['Ejecutar','Terminal','node app.js']],
          filesToCreate:[file('javascript/igdb/app.js','Código de la consulta a IGDB.')]
        }
      ),
      I(
        'markdown url errores copiar pegar',
        '2. Primero corrige lo que viene de Markdown o HTML',
        'El texto copiado puede traer formato que no pertenece a JavaScript. Una URL escrita como [https://...](https://...) es sintaxis Markdown, no una URL válida dentro del programa. Del mismo modo, entidades como &#x20; representan espacios en HTML y una barra antes de un guion bajo puede venir del escape de Markdown.',
        code([
          '// INCORRECTO: Markdown dentro de la cadena',
          'const urlMal = "[https://api.igdb.com/v4/games](https://api.igdb.com/v4/games)";',
          '',
          '// CORRECTO',
          'const url = "https://api.igdb.com/v4/games";',
          '',
          '// INCORRECTO al copiar texto escapado',
          '// YOUR\\_CLIENT\\_ID',
          '',
          '// CORRECTO',
          'const clientId = "YOUR_CLIENT_ID";'
        ]),
        preview('Regla de copia','<p style="margin:0">Markdown/HTML visible ≠ código JavaScript. Limpia enlaces, entidades y escapes antes de ejecutar.</p>'),
        'Si aparece Invalid URL, revisa primero que la cadena contenga solamente https://... y no paréntesis o corchetes de Markdown.',
        {
          guide:[['Revisar','app.js','Elimina formato Markdown y entidades HTML antes de ejecutar.']],
          filesToCreate:[file('javascript/igdb/app.js','Debe contener URLs JavaScript normales.')]
        }
      ),
      I(
        'node fetch require node-fetch esm commonjs',
        '3. require("node-fetch") · qué significa y cuándo usarlo',
        'require("node-fetch") carga el paquete node-fetch usando CommonJS. Hay una diferencia importante: node-fetch 3 es ESM y no puede cargarse directamente con require(). Si mantienes CommonJS debes usar node-fetch 2. En Node.js moderno puedes evitar la dependencia porque fetch ya está disponible globalmente.',
        code([
          '// OPCIÓN A · Node.js moderno',
          '// No necesitas require ni npm install.',
          'const response = await fetch("https://example.com");',
          '',
          '// OPCIÓN B · CommonJS + node-fetch 2',
          '// npm install node-fetch@2',
          'const fetch = require("node-fetch");',
          '',
          '// OPCIÓN C · node-fetch 3 con ES Modules',
          '// npm install node-fetch',
          'import fetch from "node-fetch";'
        ]),
        preview('Tres escenarios','<p style="margin:0">Node moderno: fetch global · CommonJS: node-fetch@2 · ESM: node-fetch 3</p>'),
        'Para una práctica nueva con Node.js 22, usa fetch nativo y elimina const fetch = require("node-fetch").',
        {
          guide:[['Revisar','Terminal','node --version'],['Modificar','javascript/igdb/app.js','Elige una sola forma de disponer de fetch.']],
          filesToCreate:[file('javascript/igdb/app.js','Usa fetch nativo o la variante compatible con tu proyecto.')]
        }
      ),
      I(
        'igdb headers client id bearer token',
        '4. Headers · Client-ID y Authorization Bearer',
        'IGDB identifica tu aplicación mediante Client-ID y autoriza la petición mediante un Access Token enviado como Bearer. Son dos valores distintos. Client-ID identifica la aplicación; el token demuestra que la aplicación obtuvo autorización. El Client Secret no se envía al endpoint /games: se usa al solicitar el Access Token al servicio OAuth de Twitch.',
        code([
          'const headers = {',
          '  "Client-ID": process.env.IGDB_CLIENT_ID,',
          '  "Authorization": "Bearer " + process.env.IGDB_ACCESS_TOKEN,',
          '  "Accept": "application/json"',
          '};',
          '',
          '// Resultado conceptual:',
          '// Client-ID: abc123',
          '// Authorization: Bearer eyJ...'
        ]),
        preview('Qué viaja en la petición','<p style="margin:0">headers = metadatos y credenciales · body = consulta que quieres ejecutar</p>'),
        'No escribas tokens reales dentro del archivo que vas a subir al repositorio.',
        {
          guide:[['Crear','javascript/igdb/.env','Guarda credenciales localmente.'],['Crear','javascript/igdb/.gitignore','Ignora .env.']],
          filesToCreate:[file('javascript/igdb/.env','IGDB_CLIENT_ID e IGDB_ACCESS_TOKEN locales.'),file('javascript/igdb/.gitignore','Incluye .env.')]
        }
      ),
      I(
        'igdb body query apicalypse fields limit',
        '5. body no contiene JSON · contiene una consulta de IGDB',
        'En este ejemplo body: query no está enviando un objeto JSON. IGDB usa un lenguaje de consulta llamado APICalypse. fields indica qué campos devolver, limit limita resultados, where filtra, sort ordena y search permite búsquedas. Por esa razón no debes aplicar JSON.stringify(query). Tampoco necesitas declarar application/json para este body textual.',
        code([
          'const query = `',
          '  fields',
          '    name,',
          '    release_dates.human,',
          '    genres.name,',
          '    platforms.name;',
          '  where name != null;',
          '  sort name asc;',
          '  limit 10;',
          '`;',
          '',
          'const response = await fetch(',
          '  "https://api.igdb.com/v4/games",',
          '  {',
          '    method: "POST",',
          '    headers: headers,',
          '    body: query',
          '  }',
          ');'
        ]),
        preview('No confundir','<p style="margin:0">query es texto de consulta → IGDB lo interpreta → la respuesta sí llega como JSON.</p>'),
        'Content-Type: application/json tendría sentido si realmente enviaras JSON. Aquí el body es una consulta textual específica de IGDB.',
        {
          guide:[['Modificar','javascript/igdb/app.js','Cambia fields, where, sort y limit para practicar.']],
          filesToCreate:[file('javascript/igdb/app.js','Consulta APICalypse dentro de body.')]
        }
      ),
      I(
        'igdb oauth twitch access token env',
        '6. De dónde salen Client ID, Client Secret y Access Token',
        'Para usar IGDB debes registrar una aplicación en Twitch. Obtienes Client ID y Client Secret. Después haces un POST al endpoint OAuth de Twitch con grant_type=client_credentials y recibes un access_token con una duración determinada. El Client Secret debe permanecer en el servidor. Cuando el token expire debes solicitar otro.',
        code([
          '// .env',
          'IGDB_CLIENT_ID=tu_client_id',
          'IGDB_CLIENT_SECRET=tu_client_secret',
          '',
          '// token.js · Node.js moderno',
          'async function obtenerToken() {',
          '  const params = new URLSearchParams({',
          '    client_id: process.env.IGDB_CLIENT_ID,',
          '    client_secret: process.env.IGDB_CLIENT_SECRET,',
          '    grant_type: "client_credentials"',
          '  });',
          '',
          '  const response = await fetch(',
          '    "https://id.twitch.tv/oauth2/token?" + params,',
          '    { method: "POST" }',
          '  );',
          '',
          '  if (!response.ok) {',
          '    throw new Error("OAuth HTTP " + response.status);',
          '  }',
          '',
          '  return response.json();',
          '}',
          '',
          'obtenerToken()',
          '  .then(function(data) {',
          '    console.log("Token recibido. Expira en", data.expires_in, "segundos");',
          '  })',
          '  .catch(console.error);'
        ]),
        preview('OAuth2 Client Credentials','<p style="margin:0">Client ID + Client Secret → Twitch OAuth → Access Token → petición a IGDB</p>'),
        'No imprimas el access_token completo en capturas, tutoriales o repositorios.',
        {
          guide:[['Crear','javascript/igdb/token.js','Solicita el token desde Node.js.'],['Ejecutar','Terminal','node --env-file=.env token.js']],
          filesToCreate:[file('javascript/igdb/token.js','Solicitud OAuth2.'),file('javascript/igdb/.env','Credenciales locales.')]
        }
      ),
      I(
        'igdb async await response ok errors',
        '7. Versión recomendada con async/await y manejo de errores',
        'La cadena de .then() es válida, pero async/await hace más fácil seguir una petición con varias validaciones. Primero compruebas response.ok. Si falla, puedes leer response.text() para ver el mensaje del servidor. Solo conviertes a JSON cuando la respuesta fue correcta.',
        code([
          'async function obtenerJuegos() {',
          '  const url = "https://api.igdb.com/v4/games";',
          '  const query = "fields name, genres.name, platforms.name; limit 10;";',
          '',
          '  const response = await fetch(url, {',
          '    method: "POST",',
          '    headers: {',
          '      "Client-ID": process.env.IGDB_CLIENT_ID,',
          '      "Authorization": "Bearer " + process.env.IGDB_ACCESS_TOKEN,',
          '      "Accept": "application/json"',
          '    },',
          '    body: query',
          '  });',
          '',
          '  if (!response.ok) {',
          '    const detail = await response.text();',
          '    throw new Error(',
          '      "IGDB HTTP " + response.status + ": " + detail',
          '    );',
          '  }',
          '',
          '  return response.json();',
          '}',
          '',
          'obtenerJuegos()',
          '  .then(function(games) {',
          '    console.table(games);',
          '  })',
          '  .catch(function(error) {',
          '    console.error(error.message);',
          '  });'
        ]),
        preview('Orden mental','<p style="margin:0">await fetch → validar status → leer error o JSON → usar datos</p>'),
        'fetch no lanza automáticamente un error solo porque el servidor devuelva 401, 404 o 429; revisa response.ok.',
        {
          guide:[['Modificar','javascript/igdb/app.js','Usa obtenerJuegos() como función principal.']],
          filesToCreate:[file('javascript/igdb/app.js','Versión robusta con async/await.')]
        }
      ),
      I(
        'igdb cors backend proxy browser',
        '8. Por qué este código pertenece al backend y no al navegador',
        'IGDB no permite consumir su API directamente desde JavaScript del navegador debido a CORS. Además, colocar tokens o secretos en frontend permitiría que cualquier usuario los vea. La arquitectura correcta es navegador → tu backend → IGDB. Tu backend conserva las credenciales, consulta IGDB y devuelve al navegador solo los datos necesarios.',
        code([
          'NAVEGADOR',
          'fetch("/api/games")',
          '       |',
          '       v',
          'TU BACKEND NODE.JS',
          'Client-ID + Bearer token',
          '       |',
          '       v',
          'IGDB /v4/games',
          '       |',
          '       v',
          'JSON filtrado',
          '       |',
          '       v',
          'NAVEGADOR'
        ]),
        preview('Arquitectura segura','<p style="margin:0">Frontend → Backend propio → API autenticada. Las credenciales se quedan en el servidor.</p>'),
        'Esta misma arquitectura aplica a muchas APIs que utilizan claves privadas, OAuth o secretos de aplicación.',
        {
          guide:[['Crear','javascript/igdb/server.js','Expone /api/games y consulta IGDB desde Node.'],['Crear','javascript/igdb/public/app.js','El frontend consulta únicamente tu backend.']],
          filesToCreate:[file('javascript/igdb/server.js','Proxy/backend para IGDB.'),file('javascript/igdb/public/app.js','Frontend sin secretos.')]
        }
      ),
      I(
        'igdb status 400 401 403 429',
        '9. Errores comunes al trabajar con una API autenticada',
        'Los status HTTP ayudan a localizar el problema. Un 400 suele indicar una consulta o petición inválida. Un 401 normalmente apunta a autenticación ausente o no válida. Un 403 indica que el servidor entendió la petición pero no permite la operación. Un 429 significa que superaste el límite de peticiones y debes reducir la frecuencia o implementar espera/caché.',
        code([
          'if (response.status === 401) {',
          '  console.error("Revisa el Access Token");',
          '}',
          '',
          'if (response.status === 429) {',
          '  console.error("Demasiadas peticiones; espera antes de reintentar");',
          '}',
          '',
          'if (!response.ok) {',
          '  console.error("Status:", response.status);',
          '  console.error("Body:", await response.text());',
          '}'
        ]),
        preview('Diagnóstico','<p style="margin:0">Network/status + body de error + documentación = diagnóstico mucho más rápido.</p>'),
        'No respondas a un 429 enviando todavía más peticiones inmediatamente.',
        {
          guide:[['Abrir','Terminal','Observa status y body cuando falle una consulta.']],
          filesToCreate:[file('javascript/igdb/app.js','Incluye diagnóstico de errores HTTP.')]
        }
      ),
      I(
        'igdb proyecto node frontend',
        '10. Mini proyecto · buscador de juegos sin exponer credenciales',
        'El objetivo final es separar responsabilidades. server.js conoce IGDB y las credenciales. public/app.js solo conoce tu ruta /api/games. Cuando el usuario busca un juego, el frontend envía el texto al backend; el backend construye una consulta IGDB, recibe JSON y responde con una versión reducida.',
        code([
          '// public/app.js',
          'async function buscarJuegos(texto) {',
          '  const response = await fetch(',
          '    "/api/games?q=" + encodeURIComponent(texto)',
          '  );',
          '',
          '  if (!response.ok) {',
          '    throw new Error("No se pudo buscar");',
          '  }',
          '',
          '  return response.json();',
          '}',
          '',
          '// En server.js la idea es:',
          '// 1. recibir q',
          '// 2. construir: search "texto"; fields name,...;',
          '// 3. llamar a IGDB con Client-ID y Bearer',
          '// 4. devolver JSON al navegador',
          '',
          '// Nunca:',
          '// const token = "TOKEN_REAL"; // en public/app.js'
        ]),
        preview('Resultado esperado','<p style="margin:0">Input de búsqueda → /api/games → backend → IGDB → lista de nombres, géneros y plataformas</p>'),
        'Cuando entiendas esta separación ya puedes aplicar el mismo patrón a APIs de pagos, IA, mapas u otros servicios autenticados.',
        {
          guide:[['Crear','javascript/igdb/public/index.html','Formulario y resultados.'],['Crear','javascript/igdb/public/app.js','Fetch hacia /api/games.'],['Crear','javascript/igdb/server.js','Consulta segura a IGDB.'],['Crear','javascript/igdb/.env','Credenciales privadas.']],
          filesToCreate:[file('javascript/igdb/public/index.html','Interfaz del buscador.'),file('javascript/igdb/public/app.js','Cliente sin secretos.'),file('javascript/igdb/server.js','Backend/proxy.'),file('javascript/igdb/.env','Credenciales privadas.')],
          exerciseTitle:'Ejercicio para ti · amplía la consulta',
          exerciseTasks:['Cambia limit de 10 a 5 y después a 20.','Agrega rating a fields y muéstralo.','Usa search para buscar un título escrito por el usuario.','Muestra genres.name y platforms.name en HTML.','Provoca un token inválido y observa el status antes de corregirlo.'],
          exerciseExtra:'Agrega una caché sencilla en el backend para evitar repetir la misma consulta muchas veces.'
        }
      )
    ]
  });
})();
