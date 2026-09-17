(()=>{
  if(window.__httpStatusCodesSectionAdded)return;
  window.__httpStatusCodesSectionAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const panel=html=>`<div style="font-family:system-ui;padding:18px;border:1px solid #334155;border-radius:16px;background:#0b1220;color:#e5edf8">${html}</div>`;
  const cat=code=>`<div style="display:grid;grid-template-columns:minmax(150px,260px) 1fr;gap:16px;align-items:center"><img src="https://http.cat/${code}.jpg" alt="HTTP ${code}" loading="lazy" style="width:100%;border-radius:12px;display:block"><div><strong style="font-size:30px">${code}</strong><br><span style="color:#94a3b8">Imagen de apoyo: http.cat/${code}</span></div></div>`;
  const H=(tag,name,description,code,preview,tip,meta={})=>T(tag,name,description,code,preview,[],{
    kind:'APIs · HTTP',
    tip,
    guideTitle:'Dónde se aplica',
    codeLabel:'Ejemplo HTTP / JavaScript',
    ...meta
  });

  sections.push({
    title:'APIs · Códigos de estado HTTP con http.cat',
    navLabel:'Estados HTTP · http.cat',
    primaryArea:'APIs',
    areaOrder:72,
    description:'Aprende a interpretar correctamente los códigos de estado HTTP usando http.cat como apoyo visual. Se explican las cinco familias, los códigos más usados en APIs, diferencias que suelen confundirse y cómo manejarlos desde fetch().',
    quote:'“El código HTTP resume qué ocurrió con la petición; el cuerpo de la respuesta explica los detalles.”',
    challenge:'Construye un pequeño inspector que reciba un código HTTP, muestre su imagen de http.cat y explique qué debería hacer el cliente.',
    items:[
      H(
        'http status families',
        '1. Qué significa un código de estado HTTP',
        'El servidor responde con un número de tres dígitos. El primer dígito indica la familia: 1xx informa, 2xx confirma éxito, 3xx redirige o habla de caché, 4xx indica un problema relacionado con la petición del cliente y 5xx indica un problema del servidor o de un servidor intermedio. El status no sustituye al JSON de error: ambos se complementan.',
        `1xx  Informativo\n2xx  Éxito\n3xx  Redirección / caché\n4xx  Error de cliente\n5xx  Error de servidor\n\nHTTP/1.1 404 Not Found\n           │   └─ texto descriptivo\n           └──── código`,
        panel('<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;text-align:center"><div style="padding:12px;background:#172554;border-radius:10px">1xx<br><small>Info</small></div><div style="padding:12px;background:#14532d;border-radius:10px">2xx<br><small>Éxito</small></div><div style="padding:12px;background:#713f12;border-radius:10px">3xx<br><small>Redirección</small></div><div style="padding:12px;background:#7f1d1d;border-radius:10px">4xx<br><small>Cliente</small></div><div style="padding:12px;background:#4c1d95;border-radius:10px">5xx<br><small>Servidor</small></div></div>'),
        'No interpretes todos los 4xx como “la web está caída” ni todos los 5xx como “el usuario hizo algo mal”. La familia ya da una primera pista de dónde mirar.'
      ),
      H(
        'http.cat',
        '2. Cómo usar http.cat',
        'http.cat ofrece una imagen para muchos códigos HTTP. La URL se forma escribiendo el número al final. Puedes usarla como recurso didáctico para recordar los estados, pero la definición técnica debe venir del estándar o de documentación confiable. El sitio también muestra algunos códigos no estándar o propios de determinados proveedores, así que no todos deben usarse en tu API.',
        `https://http.cat/200\nhttps://http.cat/404\nhttps://http.cat/500\n\n// También acepta extensión:\nhttps://http.cat/404.jpg\n\n<img src="https://http.cat/404.jpg" alt="404 Not Found">`,
        cat(404),
        'Usa http.cat para recordar visualmente el código; para decidir su semántica en una API consulta la especificación HTTP o una referencia como MDN.'
      ),
      H(
        '1xx informational',
        '3. 1xx · Respuestas informativas',
        'Los 1xx son respuestas intermedias, no el resultado final normal de una API REST. 100 Continue indica que el cliente puede continuar enviando la petición. 101 Switching Protocols confirma un cambio de protocolo solicitado, por ejemplo al negociar una actualización. 103 Early Hints permite adelantar pistas para precargar recursos mientras se prepara la respuesta final.',
        `100 Continue\n→ Sigue enviando la petición.\n\n101 Switching Protocols\n→ El servidor acepta cambiar de protocolo.\n\n103 Early Hints\n→ Pistas tempranas para precarga.`,
        cat(100),
        'En un fetch() cotidiano casi siempre trabajarás con la respuesta final y no tendrás que programar lógica específica para 1xx.'
      ),
      H(
        '2xx success',
        '4. 2xx · 200, 201, 202, 204 y 206',
        'Los 2xx indican éxito, pero no todos significan lo mismo. 200 OK es éxito general y normalmente trae contenido. 201 Created indica que se creó un recurso nuevo. 202 Accepted significa que la petición fue aceptada para procesamiento, pero el trabajo puede no haber terminado. 204 No Content indica éxito sin cuerpo de respuesta. 206 Partial Content entrega solo una parte de un recurso, normalmente por una petición de rango.',
        `200 OK\nGET /usuarios/7       → recurso devuelto\n\n201 Created\nPOST /usuarios         → usuario creado\n\n202 Accepted\nPOST /reportes         → trabajo aceptado para procesarse\n\n204 No Content\nDELETE /usuarios/7     → eliminado, sin JSON de respuesta\n\n206 Partial Content\nGET archivo + Range    → parte del archivo`,
        cat(201),
        'No respondas siempre 200. Elegir 201 o 204 hace que el contrato de la API sea mucho más claro.'
      ),
      H(
        '3xx redirects cache',
        '5. 3xx · Redirecciones y caché',
        '301 Moved Permanently indica cambio permanente de URL. 302 Found es una redirección temporal histórica. 303 See Other dirige al cliente a consultar otra URL mediante GET. 304 Not Modified no es un error: indica que la copia en caché sigue siendo válida. 307 Temporary Redirect y 308 Permanent Redirect preservan el método original durante la redirección, algo importante si la petición era POST, PUT o PATCH.',
        `301 Moved Permanently  → URL nueva permanente\n302 Found              → URL temporal\n303 See Other          → consulta otra URL con GET\n304 Not Modified       → usa la caché existente\n307 Temporary Redirect → temporal, conserva método\n308 Permanent Redirect → permanente, conserva método`,
        cat(304),
        '304 puede aparecer en Network y no significa que la petición haya fallado. Normalmente significa que el navegador puede reutilizar una versión en caché.'
      ),
      H(
        '400 401 403 404',
        '6. 400 vs 401 vs 403 vs 404',
        '400 Bad Request significa que la petición no puede procesarse correctamente por datos o sintaxis inválidos. 401 Unauthorized, pese al nombre, se usa cuando falta autenticación válida. 403 Forbidden significa que el servidor entiende quién eres o entiende la solicitud, pero no te concede acceso. 404 Not Found significa que el recurso o ruta solicitada no fue encontrado.',
        `400 Bad Request\n→ “Lo que enviaste no tiene el formato o datos esperados.”\n\n401 Unauthorized\n→ “Debes autenticarte o tu credencial no es válida.”\n\n403 Forbidden\n→ “La petición se entiende, pero no tienes permiso.”\n\n404 Not Found\n→ “Ese recurso/ruta no existe aquí.”`,
        cat(401),
        'Regla rápida: 401 pregunta “¿quién eres?”; 403 responde “sé quién eres, pero no tienes permiso”.'
      ),
      H(
        '405 408 409 410',
        '7. 405, 408, 409 y 410 · errores con significado específico',
        '405 Method Not Allowed aparece cuando la ruta existe pero ese método HTTP no está permitido. 408 Request Timeout indica que el servidor agotó el tiempo esperando completar la petición. 409 Conflict representa un choque con el estado actual del recurso, por ejemplo una edición concurrente o un identificador que ya existe. 410 Gone comunica que el recurso existió pero fue retirado y no se espera que vuelva.',
        `405 Method Not Allowed\nPOST /solo-lectura  → la ruta existe, POST no\n\n408 Request Timeout\n→ el servidor agotó la espera\n\n409 Conflict\n→ conflicto con el estado actual\n\n410 Gone\n→ existía, fue retirado intencionalmente`,
        cat(409),
        '409 es útil cuando la petición es válida en forma, pero no puede aplicarse por el estado actual del sistema.'
      ),
      H(
        '413 415 422 429',
        '8. 413, 415, 422 y 429 · datos, validación y límites',
        '413 Content Too Large/Payload Too Large indica que el cuerpo excede el límite permitido. 415 Unsupported Media Type significa que el servidor no acepta el formato enviado, por ejemplo mandar texto donde espera application/json. 422 Unprocessable Content indica que la sintaxis puede ser correcta pero el contenido no cumple las reglas para procesarse. 429 Too Many Requests aparece cuando el cliente supera un límite de solicitudes y suele relacionarse con rate limiting.',
        `413  cuerpo demasiado grande\n415  Content-Type o formato no soportado\n422  JSON válido, datos semánticamente inválidos\n429  demasiadas peticiones en poco tiempo\n\nEjemplo 415:\nContent-Type: text/plain\ncuando la API exige:\nContent-Type: application/json`,
        cat(422),
        'En 429 revisa si la API devuelve Retry-After y evita reintentar en un bucle inmediato.'
      ),
      H(
        '5xx server errors',
        '9. 500 vs 501 vs 502 vs 503 vs 504',
        '500 Internal Server Error es el error genérico del servidor cuando no puede usar uno más específico. 501 Not Implemented indica que la capacidad o método solicitado no está implementado. 502 Bad Gateway ocurre cuando un servidor intermedio recibe una respuesta inválida del servidor que está detrás. 503 Service Unavailable significa que el servicio no está disponible temporalmente, por mantenimiento o sobrecarga. 504 Gateway Timeout significa que un gateway o proxy agotó el tiempo esperando al servidor de origen.',
        `500 Internal Server Error\ncliente → servidor 💥\n\n502 Bad Gateway\ncliente → proxy → respuesta inválida del servidor origen\n\n503 Service Unavailable\ncliente → servicio temporalmente no disponible\n\n504 Gateway Timeout\ncliente → proxy → ⏳ servidor origen no respondió a tiempo`,
        cat(500),
        'En un 5xx el frontend normalmente informa al usuario y registra el error; no debería pedirle que “corrija el formulario” salvo que la API entregue además información específica.'
      ),
      H(
        'status comparison',
        '10. Diferencias que debes memorizar',
        'Muchos errores de integración vienen de confundir estados parecidos. Esta tabla resume las parejas más importantes para diseñar y consumir APIs.',
        `200 vs 201\n200 = operación correcta\n201 = recurso nuevo creado\n\n200 vs 204\n200 = puede existir body\n204 = no hay body\n\n301 vs 308\nambos permanentes; 308 preserva el método\n\n302 vs 307\nambos temporales; 307 preserva el método\n\n400 vs 422\n400 = petición inválida/mal formada\n422 = estructura procesable, contenido no válido para la operación\n\n401 vs 403\n401 = autenticación requerida/inválida\n403 = acceso rechazado\n\n404 vs 410\n404 = no encontrado\n410 = retirado intencionalmente\n\n500 vs 502 vs 503 vs 504\n500 = fallo genérico\n502 = upstream respondió mal\n503 = servicio temporalmente no disponible\n504 = upstream tardó demasiado`,
        panel('<div style="display:grid;gap:8px"><div style="padding:10px;background:#111827;border-radius:8px"><b>401</b> autenticación · <b>403</b> permiso</div><div style="padding:10px;background:#111827;border-radius:8px"><b>200</b> éxito · <b>201</b> creado · <b>204</b> sin contenido</div><div style="padding:10px;background:#111827;border-radius:8px"><b>502</b> respuesta upstream inválida · <b>504</b> timeout upstream</div></div>'),
        'No memorices solo el número: asócialo a una situación concreta de una API.'
      ),
      H(
        'fetch response status ok',
        '11. Leer status y ok con fetch()',
        'fetch() no entra automáticamente al catch por recibir 404 o 500. La promesa normalmente se resuelve porque sí hubo una respuesta HTTP. Debes revisar response.ok o response.status. response.ok vale true para respuestas 2xx.',
        `async function cargarUsuario(id) {\n  const response = await fetch(\n    "https://jsonplaceholder.typicode.com/users/" + id\n  );\n\n  console.log("status:", response.status);\n  console.log("statusText:", response.statusText);\n  console.log("ok:", response.ok);\n\n  if (!response.ok) {\n    throw new Error("HTTP " + response.status);\n  }\n\n  return response.json();\n}\n\ncargarUsuario(1)\n  .then(console.log)\n  .catch(console.error);`,
        panel('<pre style="margin:0;color:#dbeafe">status: 200\nstatusText: OK\nok: true</pre>'),
        'catch también puede ejecutarse por errores de red o por un throw que tú hagas después de comprobar response.ok.'
      ),
      H(
        '204 no content json',
        '12. Error típico: intentar response.json() después de 204',
        '204 No Content significa que no debe esperarse un cuerpo de respuesta. Si llamas response.json() sobre una respuesta vacía puedes obtener un error de parseo. Por eso conviene manejar 204 antes de intentar convertir el cuerpo.',
        `async function eliminarUsuario(id) {\n  const response = await fetch("/api/usuarios/" + id, {\n    method: "DELETE"\n  });\n\n  if (!response.ok) {\n    throw new Error("HTTP " + response.status);\n  }\n\n  if (response.status === 204) {\n    return null;\n  }\n\n  return response.json();\n}`,
        cat(204),
        '204 y 304 requieren especial atención: no los trates como si siempre fueran a incluir un JSON utilizable.'
      ),
      H(
        'error body content-type',
        '13. Un error HTTP también puede traer JSON útil',
        'El status cuenta qué tipo de resultado ocurrió, mientras el body puede explicar por qué. Una API bien diseñada suele devolver un objeto de error con campos como message, code o errors. Aun así, no debes asumir que toda respuesta de error será JSON: revisa Content-Type o controla el parseo.',
        `async function leerRespuesta(response) {\n  const type = response.headers.get("content-type") || "";\n  const esJson = type.includes("application/json");\n\n  const body = esJson\n    ? await response.json()\n    : await response.text();\n\n  if (!response.ok) {\n    console.error("HTTP", response.status, body);\n    throw new Error(\n      body?.message || "Error HTTP " + response.status\n    );\n  }\n\n  return body;\n}`,
        panel('<pre style="margin:0;color:#dbeafe">HTTP 422\n{\n  "message": "Datos inválidos",\n  "errors": {\n    "email": "Formato incorrecto"\n  }\n}</pre>'),
        'No muestres al usuario errores internos sensibles del servidor. El backend debe devolver mensajes seguros y el frontend debe presentarlos de forma comprensible.'
      ),
      H(
        'status switch ui',
        '14. Qué debería hacer el frontend según el estado',
        'El frontend puede traducir determinados códigos a acciones de interfaz. No necesitas un switch para cada número existente; normalmente basta con los estados que realmente forman parte del contrato de tu API.',
        `function mensajeHttp(status) {\n  switch (status) {\n    case 400:\n      return "Revisa los datos enviados.";\n    case 401:\n      return "Inicia sesión nuevamente.";\n    case 403:\n      return "No tienes permiso para esta acción.";\n    case 404:\n      return "No encontramos el recurso.";\n    case 409:\n      return "Hay un conflicto con los datos actuales.";\n    case 422:\n      return "Corrige los campos indicados.";\n    case 429:\n      return "Demasiadas solicitudes. Intenta más tarde.";\n    case 503:\n      return "Servicio temporalmente no disponible.";\n    default:\n      return status >= 500\n        ? "Ocurrió un problema en el servidor."\n        : "No fue posible completar la operación.";\n  }\n}`,
        panel('<div style="display:grid;gap:8px"><div>401 → mostrar acceso / renovar sesión</div><div>404 → recurso no encontrado</div><div>422 → mostrar errores de campos</div><div>429 → esperar antes de reintentar</div><div>5xx → informar fallo temporal</div></div>'),
        'La lógica exacta depende del contrato de tu backend. Documenta los estados esperados en OpenAPI/Swagger/Scalar.'
      ),
      H(
        'http cat mini project',
        '15. Mini proyecto · inspector visual de estados con http.cat',
        'Esta práctica une HTML y JavaScript. El usuario escribe un código, JavaScript actualiza la imagen de http.cat y muestra una explicación breve. Puedes ampliar el objeto estados con todos los códigos que quieras estudiar.',
        `<!-- index.html -->\n<label for="codigo">Código HTTP</label>\n<input id="codigo" type="number" value="404" min="100" max="599">\n<button id="ver" type="button">Ver estado</button>\n<img id="gato" alt="Estado HTTP" width="420">\n<p id="explicacion"></p>\n\n<script src="app.js" defer><\/script>\n\n// app.js\nconst estados = {\n  200: "OK: la petición fue correcta.",\n  201: "Created: se creó un recurso.",\n  204: "No Content: éxito sin cuerpo.",\n  400: "Bad Request: revisa la petición.",\n  401: "Unauthorized: falta autenticación válida.",\n  403: "Forbidden: no tienes permiso.",\n  404: "Not Found: recurso no encontrado.",\n  409: "Conflict: conflicto con el estado actual.",\n  422: "Unprocessable Content: datos no válidos para procesar.",\n  429: "Too Many Requests: límite excedido.",\n  500: "Internal Server Error: error interno.",\n  502: "Bad Gateway: respuesta inválida del upstream.",\n  503: "Service Unavailable: servicio temporalmente no disponible.",\n  504: "Gateway Timeout: el upstream tardó demasiado."\n};\n\nconst input = document.querySelector("#codigo");\nconst button = document.querySelector("#ver");\nconst image = document.querySelector("#gato");\nconst text = document.querySelector("#explicacion");\n\nbutton.addEventListener("click", mostrarEstado);\n\nfunction mostrarEstado() {\n  const code = Number(input.value);\n\n  image.src = "https://http.cat/" + code + ".jpg";\n  image.alt = "HTTP " + code;\n  text.textContent = estados[code] ||\n    "Consulta la documentación para conocer este estado.";\n}\n\nmostrarEstado();`,
        panel('<div style="display:grid;gap:12px"><strong>Inspector HTTP</strong><div style="display:flex;gap:8px"><input value="404" disabled style="padding:8px;border-radius:8px;border:1px solid #475569;background:#111827;color:white"><button style="padding:8px 14px;border:0;border-radius:8px;background:#38bdf8">Ver estado</button></div><span style="color:#fca5a5">404 · Not Found</span></div>'),
        'Reto: agrega un select por familia 1xx–5xx y un filtro que muestre solo los códigos de la categoría seleccionada.',
        {
          guide:[['Crear','http-status/index.html','Interfaz del inspector.'],['Crear','http-status/app.js','Objeto de estados, evento y cambio de imagen.']],
          filesToCreate:[{path:'http-status/index.html',method:'MANUAL',detail:'HTML del inspector de estados.'},{path:'http-status/app.js',method:'MANUAL',detail:'Lógica JavaScript y URLs de http.cat.'}]
        }
      )
    ]
  });

  buildNav();
  render();
})();
