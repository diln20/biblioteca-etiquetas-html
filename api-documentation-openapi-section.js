(()=>{
  if(window.__apiDocumentationOpenApiAdded)return;
  window.__apiDocumentationOpenApiAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const panel=html=>`<div style="font-family:system-ui;padding:18px;border:1px solid #334155;border-radius:16px;background:#0b1220;color:#e5edf8">${html}</div>`;
  const file=(path,detail,method='MANUAL')=>({path,method,detail});
  const D=(tag,name,description,code,preview,tip,meta={})=>T(tag,name,description,code,preview,[],{
    kind:'APIs · Documentación',
    tip,
    guideTitle:'Dónde se crea o modifica',
    codeLabel:'Código de documentación API',
    filesToCreateTitle:'Archivos de esta práctica',
    filesToCreateStatus:'Swagger UI y Scalar pueden leer el mismo documento OpenAPI. La idea es mantener un solo contrato y cambiar únicamente la interfaz de documentación.',
    ...meta
  });

  sections.push({
    title:'APIs · Documentación con OpenAPI, Swagger UI y Scalar',
    navLabel:'Documentar APIs · OpenAPI, Swagger y Scalar',
    description:'Aprende a documentar una API con un contrato OpenAPI y a mostrarlo con dos interfaces distintas: Swagger UI y Scalar. Incluye YAML, esquemas reutilizables, parámetros, body, respuestas, autenticación, documentación estática y un ejemplo con FastAPI.',
    quote:'“OpenAPI describe la API; Swagger UI y Scalar convierten esa descripción en documentación navegable e interactiva.”',
    challenge:'Documenta una API de cursos con GET y POST, agrega autenticación Bearer y publica dos vistas del mismo openapi.yaml: una con Swagger UI y otra con Scalar.',
    primaryArea:'APIs',
    areaOrder:70,
    items:[
      D(
        'openapi swagger scalar',
        '1. OpenAPI, Swagger UI y Scalar no son lo mismo',
        'OpenAPI es el formato que describe endpoints, parámetros, cuerpos, respuestas, esquemas y seguridad. Swagger UI es una interfaz que lee ese documento y permite explorar y probar operaciones. Scalar también lee OpenAPI, pero ofrece otra experiencia visual. Por eso no necesitas mantener tres documentaciones: mantienes un solo contrato OpenAPI.',
        `OpenAPI\n  │\n  ├── openapi.yaml / openapi.json\n  │\n  ├── Swagger UI ──► documentación interactiva\n  │\n  └── Scalar ──────► documentación interactiva\n\nAPI real\n  └── debe respetar lo descrito en OpenAPI`,
        panel('<div style="display:grid;gap:12px"><div style="padding:14px;border-radius:12px;background:#172033"><strong>OpenAPI</strong><br><small>Contrato de la API</small></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><div style="padding:14px;border:1px solid #85ea2d;border-radius:12px"><strong>Swagger UI</strong><br><small>Lee OpenAPI</small></div><div style="padding:14px;border:1px solid #a78bfa;border-radius:12px"><strong>Scalar</strong><br><small>Lee OpenAPI</small></div></div></div>'),
        'Regla clave: si cambias un endpoint, actualiza el contrato OpenAPI. Swagger UI y Scalar deben consumir ese mismo documento.',
        {guide:[['Crear','docs/openapi.yaml','Será la fuente única de la documentación.']],filesToCreate:[file('docs/openapi.yaml','Contrato OpenAPI compartido por Swagger UI y Scalar.')]}
      ),
      D(
        'openapi yaml info servers',
        '2. Crear el primer openapi.yaml',
        'Un documento OpenAPI empieza indicando la versión del estándar, información de la API y los servidores disponibles. En OpenAPI 3.1 puedes usar openapi: 3.1.0. El bloque info define título y versión, mientras servers indica dónde vive la API.',
        `openapi: 3.1.0\ninfo:\n  title: API de Cursos\n  version: 1.0.0\n  description: API para consultar y crear cursos.\n\nservers:\n  - url: http://localhost:8000\n    description: Servidor local\n\npaths: {}`,
        panel('<div style="display:grid;gap:8px"><strong style="font-size:20px">API de Cursos</strong><span style="color:#94a3b8">Versión 1.0.0</span><code style="padding:10px;border-radius:8px;background:#111827">http://localhost:8000</code></div>'),
        'YAML usa espacios para la jerarquía. Evita mezclar tabulaciones y espacios.',
        {guide:[['Editar','docs/openapi.yaml','Agrega openapi, info, servers y paths.']],filesToCreate:[file('docs/openapi.yaml','Documento OpenAPI 3.1.')]}
      ),
      D(
        'get path response schema',
        '3. Documentar un GET',
        'Cada ruta se declara dentro de paths. Debajo escribes el método HTTP. summary resume la operación y responses describe cada respuesta posible. El ejemplo siguiente indica que GET /cursos devuelve un arreglo de objetos Curso.',
        `paths:\n  /cursos:\n    get:\n      summary: Listar cursos\n      tags:\n        - Cursos\n      responses:\n        "200":\n          description: Lista de cursos\n          content:\n            application/json:\n              schema:\n                type: array\n                items:\n                  $ref: "#/components/schemas/Curso"`,
        panel('<div style="display:flex;gap:10px;align-items:center"><span style="padding:6px 10px;border-radius:8px;background:#2563eb;font-weight:800">GET</span><code>/cursos</code><span style="margin-left:auto;color:#86efac">200 OK</span></div>'),
        'Documenta también 404, 401 o 500 cuando realmente puedan ocurrir. No describas únicamente el caso feliz.',
        {guide:[['Editar','docs/openapi.yaml','Dentro de paths agrega /cursos y get.']],filesToCreate:[file('docs/openapi.yaml','Ruta GET /cursos.')]}
      ),
      D(
        'post requestBody responses',
        '4. Documentar un POST y su requestBody',
        'POST normalmente recibe datos. requestBody explica qué debe enviar el cliente y required indica si el cuerpo es obligatorio. En responses puedes describir el recurso creado y el código 201.',
        `paths:\n  /cursos:\n    post:\n      summary: Crear un curso\n      tags:\n        - Cursos\n      requestBody:\n        required: true\n        content:\n          application/json:\n            schema:\n              $ref: "#/components/schemas/CursoEntrada"\n      responses:\n        "201":\n          description: Curso creado\n          content:\n            application/json:\n              schema:\n                $ref: "#/components/schemas/Curso"\n        "400":\n          description: Datos inválidos`,
        panel('<div style="display:grid;gap:10px"><div><span style="padding:6px 10px;border-radius:8px;background:#16a34a;font-weight:800">POST</span> <code>/cursos</code></div><pre style="margin:0;padding:12px;background:#111827;border-radius:10px;color:#cbd5e1">{\n  "nombre": "JavaScript",\n  "duracion": 20\n}</pre></div>'),
        'Usa códigos HTTP coherentes: 200 para una respuesta correcta general y 201 cuando realmente se crea un recurso.',
        {guide:[['Editar','docs/openapi.yaml','Añade post debajo de /cursos.']],filesToCreate:[file('docs/openapi.yaml','POST, requestBody y respuestas.')]}
      ),
      D(
        'components schemas ref',
        '5. Reutilizar modelos con components y $ref',
        'Si repites la estructura de Curso en muchas operaciones, no la copies. components.schemas permite definirla una sola vez y $ref la reutiliza. Esto reduce errores y mantiene el contrato consistente.',
        `components:\n  schemas:\n    CursoEntrada:\n      type: object\n      required:\n        - nombre\n        - duracion\n      properties:\n        nombre:\n          type: string\n          examples: [JavaScript básico]\n        duracion:\n          type: integer\n          minimum: 1\n          examples: [20]\n\n    Curso:\n      allOf:\n        - $ref: "#/components/schemas/CursoEntrada"\n        - type: object\n          required: [id]\n          properties:\n            id:\n              type: integer\n              examples: [1]`,
        panel('<div style="display:grid;gap:8px"><strong>components.schemas</strong><div style="padding:10px;border-left:3px solid #38bdf8;background:#111827">CursoEntrada → nombre + duración</div><div style="padding:10px;border-left:3px solid #a78bfa;background:#111827">Curso → CursoEntrada + id</div></div>'),
        '$ref evita duplicación. Si cambias el modelo central, las operaciones que lo referencian se actualizan automáticamente.',
        {guide:[['Editar','docs/openapi.yaml','Agrega components.schemas al final del documento.']],filesToCreate:[file('docs/openapi.yaml','Modelos reutilizables.')]}
      ),
      D(
        'bearer jwt securitySchemes',
        '6. Documentar autenticación Bearer / JWT',
        'OpenAPI puede describir cómo se autentica el cliente. Para un token Bearer se define un securityScheme y luego se aplica globalmente o por operación. La documentación podrá mostrar un botón de autorización, pero nunca debes incrustar tokens reales dentro del archivo publicado.',
        `components:\n  securitySchemes:\n    bearerAuth:\n      type: http\n      scheme: bearer\n      bearerFormat: JWT\n\nsecurity:\n  - bearerAuth: []\n\npaths:\n  /perfil:\n    get:\n      summary: Ver perfil\n      responses:\n        "200":\n          description: Perfil del usuario\n        "401":\n          description: Token ausente o inválido`,
        panel('<div style="display:flex;align-items:center;gap:10px"><span style="font-size:24px">🔐</span><div><strong>Bearer JWT</strong><br><small style="color:#94a3b8">Authorization: Bearer &lt;token&gt;</small></div></div>'),
        'En la documentación usa datos ficticios. Nunca publiques secretos, access tokens, client secrets ni credenciales reales.',
        {guide:[['Editar','docs/openapi.yaml','Añade securitySchemes y security.']],filesToCreate:[file('docs/openapi.yaml','Esquema de seguridad Bearer.')]}
      ),
      D(
        'swagger ui cdn html',
        '7. Mostrar OpenAPI con Swagger UI',
        'Swagger UI puede funcionar en una página HTML sin Node.js. Cargas su CSS y JavaScript desde un CDN, creas un contenedor y le indicas la URL de tu openapi.yaml. Abre la carpeta mediante un servidor local para que el navegador pueda solicitar el YAML correctamente.',
        `<!doctype html>\n<html lang="es">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>API · Swagger UI</title>\n  <link\n    rel="stylesheet"\n    href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css"\n  >\n</head>\n<body>\n  <div id="swagger-ui"></div>\n\n  <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>\n  <script>\n    SwaggerUIBundle({\n      url: "./openapi.yaml",\n      dom_id: "#swagger-ui"\n    });\n  <\/script>\n</body>\n</html>`,
        panel('<div style="display:grid;gap:12px"><div style="font-size:22px;font-weight:800;color:#85ea2d">Swagger UI</div><div style="padding:12px;border-radius:10px;background:#111827"><b style="color:#60a5fa">GET</b> /cursos</div><div style="padding:12px;border-radius:10px;background:#111827"><b style="color:#4ade80">POST</b> /cursos</div><button style="min-height:40px;border:0;border-radius:9px;background:#85ea2d;color:#102000;font-weight:800">Try it out</button></div>'),
        'Swagger UI es la interfaz; tu información sigue viviendo en openapi.yaml.',
        {guide:[['Crear','docs/swagger.html','Página de Swagger UI.'],['Copiar','docs/openapi.yaml','Deja el contrato al lado del HTML o ajusta la URL.'],['Ejecutar','docs/','Inicia un servidor local, por ejemplo: python -m http.server 5500.']],filesToCreate:[file('docs/swagger.html','Interfaz Swagger UI.'),file('docs/openapi.yaml','Contrato que Swagger UI consume.')]}
      ),
      D(
        'scalar api reference cdn html',
        '8. Mostrar el mismo OpenAPI con Scalar',
        'Scalar también puede montarse con HTML y JavaScript. Carga @scalar/api-reference desde jsDelivr y usa Scalar.createApiReference para señalar el mismo openapi.yaml. Así puedes comparar dos interfaces sin cambiar el contrato.',
        `<!doctype html>\n<html lang="es">\n<head>\n  <meta charset="utf-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>API · Scalar</title>\n</head>\n<body>\n  <div id="app"></div>\n\n  <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>\n  <script>\n    Scalar.createApiReference("#app", {\n      url: "./openapi.yaml"\n    });\n  <\/script>\n</body>\n</html>`,
        panel('<div style="display:grid;grid-template-columns:150px 1fr;min-height:190px;border:1px solid #334155;border-radius:12px;overflow:hidden"><aside style="padding:14px;background:#111827"><strong>API de Cursos</strong><div style="margin-top:14px;color:#94a3b8">Cursos</div><div style="margin-top:8px">GET /cursos</div><div style="margin-top:8px">POST /cursos</div></aside><main style="padding:18px"><small style="color:#94a3b8">GET</small><h3 style="margin:5px 0 12px">Listar cursos</h3><p style="color:#cbd5e1">Documentación generada desde el mismo OpenAPI.</p></main></div>'),
        'Scalar acepta una URL relativa o absoluta a un documento OpenAPI en JSON o YAML.',
        {guide:[['Crear','docs/scalar.html','Página de Scalar.'],['Reutilizar','docs/openapi.yaml','No crees otro contrato: usa el mismo.'],['Ejecutar','docs/','Sirve la carpeta por HTTP.']],filesToCreate:[file('docs/scalar.html','Interfaz Scalar.'),file('docs/openapi.yaml','Contrato compartido.')]}
      ),
      D(
        'cors hosting openapi json yaml',
        '9. Dónde publicar openapi.json u openapi.yaml',
        'La interfaz necesita poder descargar el documento OpenAPI. Lo más sencillo es servirlo desde el mismo dominio que la API o la documentación. Si el contrato vive en otro dominio, ese servidor debe permitir la lectura mediante CORS. En producción también conviene versionar el contrato y mantenerlo sincronizado con el backend.',
        `Proyecto recomendado\n\napi-cursos/\n├── docs/\n│   ├── openapi.yaml\n│   ├── swagger.html\n│   └── scalar.html\n└── backend/\n    └── ...\n\nURLs posibles:\n/api/openapi.yaml\n/docs/swagger\n/docs/scalar`,
        panel('<div style="display:grid;gap:10px"><code style="padding:10px;background:#111827;border-radius:9px">/api/openapi.yaml</code><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><div style="padding:12px;border:1px solid #85ea2d;border-radius:10px">/docs/swagger</div><div style="padding:12px;border:1px solid #a78bfa;border-radius:10px">/docs/scalar</div></div></div>'),
        'Si Swagger o Scalar muestran “Failed to fetch”, revisa primero la URL del OpenAPI, el servidor HTTP y CORS.',
        {guide:[['Organizar','docs/','Mantén juntas las vistas de documentación y el contrato.']],filesToCreate:[file('docs/openapi.yaml','Contrato.'),file('docs/swagger.html','Swagger UI.'),file('docs/scalar.html','Scalar.')]}
      ),
      D(
        'fastapi openapi swagger scalar',
        '10. FastAPI: Swagger incluido y Scalar sobre el mismo esquema',
        'FastAPI genera automáticamente OpenAPI. Por defecto expone el esquema en /openapi.json y Swagger UI en /docs. Puedes agregar Scalar instalando scalar-fastapi y registrando su referencia. Ambas vistas consumen el mismo esquema generado por FastAPI.',
        `# instalar\npip install fastapi uvicorn scalar-fastapi\n\n# main.py\nfrom fastapi import FastAPI\nfrom scalar_fastapi import add_scalar_reference\n\napp = FastAPI(\n    title="API de Cursos",\n    version="1.0.0"\n)\n\nadd_scalar_reference(app)\n\n@app.get("/cursos", tags=["Cursos"])\ndef listar_cursos():\n    return [\n        {"id": 1, "nombre": "JavaScript", "duracion": 20}\n    ]\n\n# ejecutar:\n# uvicorn main:app --reload\n\n# OpenAPI:   http://127.0.0.1:8000/openapi.json\n# Swagger:   http://127.0.0.1:8000/docs\n# Scalar:    http://127.0.0.1:8000/scalar`,
        panel('<div style="display:grid;gap:8px"><div style="padding:10px;border-radius:9px;background:#111827"><b>Contrato</b> → /openapi.json</div><div style="padding:10px;border-radius:9px;border-left:3px solid #85ea2d"><b>Swagger UI</b> → /docs</div><div style="padding:10px;border-radius:9px;border-left:3px solid #a78bfa"><b>Scalar</b> → /scalar</div></div>'),
        'FastAPI ya genera el contrato. No mantengas a mano un segundo YAML si el framework puede generar OpenAPI desde tus rutas y modelos.',
        {guide:[['Crear','api-docs-fastapi/main.py','Define la API y registra Scalar.'],['Ejecutar','api-docs-fastapi/','uvicorn main:app --reload.']],filesToCreate:[file('api-docs-fastapi/main.py','API FastAPI documentada.')]}
      ),
      D(
        'proyecto swagger scalar openapi',
        '11. Proyecto final · una API, un contrato, dos documentaciones',
        'El proyecto final une todo: un openapi.yaml describe la API, swagger.html lo representa con Swagger UI y scalar.html representa exactamente el mismo contrato con Scalar. Si cambias GET /cursos o agregas DELETE /cursos/{id}, haces el cambio una sola vez en OpenAPI.',
        `api-docs/\n├── openapi.yaml\n├── swagger.html\n└── scalar.html\n\n# servir la carpeta\npython -m http.server 5500\n\n# abrir\nhttp://localhost:5500/swagger.html\nhttp://localhost:5500/scalar.html\n\n# reto\n1. GET /cursos\n2. GET /cursos/{id}\n3. POST /cursos\n4. DELETE /cursos/{id}\n5. Bearer JWT\n6. respuestas 200, 201, 400, 401 y 404`,
        panel('<div style="display:grid;gap:12px"><strong style="font-size:20px">Proyecto final</strong><div style="padding:12px;border-radius:10px;background:#111827">openapi.yaml = fuente única</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><div style="padding:14px;border-radius:10px;background:#18310d;color:#d9f99d">Swagger UI</div><div style="padding:14px;border-radius:10px;background:#2e1d4d;color:#ddd6fe">Scalar</div></div></div>'),
        'Comprueba que las dos interfaces muestran las mismas rutas, modelos, respuestas y seguridad. Si una difiere, revisa qué documento está cargando.',
        {guide:[['Crear','api-docs/openapi.yaml','Contrato completo.'],['Crear','api-docs/swagger.html','Vista Swagger UI.'],['Crear','api-docs/scalar.html','Vista Scalar.'],['Ejecutar','api-docs/','python -m http.server 5500.']],filesToCreate:[file('api-docs/openapi.yaml','Contrato final.'),file('api-docs/swagger.html','Documentación Swagger UI.'),file('api-docs/scalar.html','Documentación Scalar.')]}
      )
    ]
  });

  if(typeof buildNav==='function')buildNav();
  if(typeof render==='function')render();
})();
