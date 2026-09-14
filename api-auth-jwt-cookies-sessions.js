(()=>{
  if(window.__apiAuthJwtCookiesSessionsAdded)return;
  window.__apiAuthJwtCookiesSessionsAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const shell=(title,color,body)=>`<div style="font-family:system-ui;padding:18px;border:1px solid ${color};border-radius:14px;background:#07111f;color:#e5edf8;box-shadow:0 10px 30px rgba(2,6,23,.25)"><div style="font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:${color};margin-bottom:8px">${title}</div>${body}</div>`;
  const chips=items=>`<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:12px">${items.map(item=>`<span style="padding:6px 9px;border:1px solid #334155;border-radius:999px;background:#0f1b2d;color:#cbd5e1;font-size:12px">${item}</span>`).join('')}</div>`;
  const file=(path,method,detail,command='')=>({path,method,detail,command});
  const A=(topic,name,description,code,preview,tip,guide=[],files=[])=>{
    const item=T(topic,name,description,code,preview,[],{kind:'Autenticación web',tip});
    item.guide=guide;
    item.guideTitle='Dónde se hace cada modificación';
    item.codeLabel='Código / HTTP';
    item.filesToCreate=files;
    item.filesToCreateTitle='Archivos que se crean en esta lección';
    item.filesToCreateStatus=files.length?'Estos archivos aparecen o se crean durante esta lección.':'No debes crear un archivo nuevo en esta lección; revisa o modifica las ubicaciones indicadas.';
    return item;
  };

  const overview=shell('JWT vs Cookies vs Sessions','#22c55e',`
    <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px">
      <div style="padding:12px;border:1px solid #22c55e;border-radius:12px"><strong style="color:#4ade80">JWT</strong><p style="margin:6px 0 0;color:#b6c2d2;font-size:13px">Formato de token firmado. Puede viajar en Authorization o dentro de una cookie.</p></div>
      <div style="padding:12px;border:1px solid #38bdf8;border-radius:12px"><strong style="color:#38bdf8">Cookie</strong><p style="margin:6px 0 0;color:#b6c2d2;font-size:13px">Mecanismo del navegador para almacenar y enviar pequeños valores HTTP.</p></div>
      <div style="padding:12px;border:1px solid #c084fc;border-radius:12px"><strong style="color:#c084fc">Session</strong><p style="margin:6px 0 0;color:#b6c2d2;font-size:13px">Estado guardado en servidor; el cliente suele llevar solo un identificador opaco.</p></div>
    </div>
    <div style="margin-top:12px;padding:10px;border-radius:10px;background:#0f1b2d;color:#dbeafe"><strong>Clave:</strong> no son tres alternativas equivalentes. Una sesión normalmente usa una cookie; un JWT también puede guardarse en una cookie.</div>`);

  const section={
    title:'APIs · 6. Autenticación web · JWT, Cookies y Sessions',
    navLabel:'6. JWT, Cookies y Sessions',
    group:'APIs',
    primaryArea:'APIs',
    description:'Diferencia correctamente token, transporte y estado. Aprende qué hace una cookie, cómo funciona una sesión del servidor, qué contiene un JWT, dónde viaja cada credencial y qué cambia frente a XSS, CSRF, revocación y escalabilidad.',
    quote:'“JWT, cookie y sesión describen capas distintas: formato, transporte y estado.”',
    challenge:'Explica dos diseños válidos: sesión con cookie HttpOnly y JWT enviado como Bearer. Después justifica cuál usarías en una aplicación web tradicional y en una API consumida por varios clientes.',
    items:[
      A(
        'modelo mental',
        'La comparación correcta: no son tres cosas del mismo nivel',
        'JWT describe un formato de token; Cookie describe almacenamiento y transporte automático del navegador; Session describe estado que el servidor conserva entre solicitudes. Por eso una sesión suele identificarse con una cookie y un JWT puede viajar como Bearer o dentro de una cookie. Cómo funciona exactamente: separa tres preguntas: qué dato representa la identidad, dónde se guarda el estado y cómo viaja la credencial. Cómo comprobarlo: observa las cabeceras Cookie, Set-Cookie y Authorization en DevTools y compáralas con lo que realmente guarda el servidor.',
        'JWT      → formato de token firmado\nCookie   → almacenamiento/transporte del navegador\nSession  → estado mantenido en el servidor\n\nCombinaciones válidas:\nSession + Cookie(session_id)\nJWT + Authorization: Bearer <token>\nJWT + Cookie(access_token)',
        overview,
        'Evita enseñar “JWT vs cookie” como si fueran excluyentes: una cookie puede transportar un JWT.',
        [['Revisar','DevTools · Network · Request Headers','Compara Authorization con Cookie y revisa Set-Cookie en la respuesta.']]
      ),
      A(
        'Cookies',
        'Cookie: almacenamiento y transporte HTTP del navegador',
        'El servidor puede crear una cookie mediante Set-Cookie. Después, si dominio, ruta, SameSite y demás reglas lo permiten, el navegador la envía automáticamente en Cookie. HttpOnly impide leerla desde JavaScript; Secure limita su envío a HTTPS; SameSite reduce envíos entre sitios. Cómo funciona exactamente: el navegador administra la cookie y decide cuándo adjuntarla a la solicitud. Cómo comprobarlo: abre DevTools → Application/Storage → Cookies y luego Network para ver Set-Cookie y Cookie.',
        'HTTP/1.1 200 OK\nSet-Cookie: session_id=abc123; Path=/; HttpOnly; Secure; SameSite=Lax\n\nGET /perfil HTTP/1.1\nCookie: session_id=abc123',
        shell('Cookie','#38bdf8','<div style="display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center;text-align:center"><div>🌐<br><strong>Navegador</strong></div><div style="color:#38bdf8">Cookie: session_id=...</div><div>🖥️<br><strong>Servidor</strong></div></div>'+chips(['HttpOnly','Secure','SameSite','Path'])),
        'Una cookie no implica que la sesión esté guardada en el navegador; puede contener solo un identificador.',
        [['Modificar','backend/routes/auth.js','Aquí el backend devuelve Set-Cookie al iniciar sesión.'],['Revisar','DevTools · Application/Storage · Cookies','Aquí compruebas flags, dominio, ruta y expiración.']],
        [file('backend/routes/auth.js','MANUAL','Ruta sugerida para emitir o eliminar la cookie de autenticación.')]
      ),
      A(
        'Sessions',
        'Session: estado guardado en el servidor',
        'En una sesión clásica, el servidor crea un identificador aleatorio e impredecible y guarda los datos asociados en memoria, base de datos o Redis. El navegador recibe normalmente solo session_id en una cookie. En cada solicitud el servidor usa ese ID para recuperar usuario, roles o estado. No coloques identificadores de sesión en la URL: pueden filtrarse en historial, logs y cabeceras Referer. Cómo funciona exactamente: session_id funciona como una llave opaca hacia un registro del servidor. Cómo comprobarlo: elimina la sesión del store y verifica que la misma cookie deja de autenticar.',
        'Navegador\n  Cookie: session_id=5f4e3a...\n        ↓\nServidor\n  session_id ─────────────┐\n                          ↓\nRedis / DB\n  5f4e3a... → { userId: 123, role: "student" }',
        shell('Session','#c084fc','<div style="display:grid;gap:8px"><div>🌐 Navegador → <code>session_id=5f4e3a...</code></div><div style="text-align:center;color:#c084fc">↓ busca el ID</div><div>🗄️ Redis / DB → <code>{ userId: 123, role: student }</code></div></div>'+chips(['revocación simple','estado servidor','session id opaco'])),
        'Para varias instancias, usa un store compartido como Redis o una estrategia equivalente; no dependas de la memoria de un solo proceso.',
        [['Crear','backend/session-store.js','Configura aquí el almacenamiento de sesiones.'],['Modificar','backend/routes/auth.js','Crea la sesión al validar usuario y contraseña.'],['Modificar','backend/middleware/auth.js','Recupera la sesión y protege rutas.']],
        [file('backend/session-store.js','MANUAL','Conecta el almacenamiento de sesiones; en producción suele ser Redis o una base compartida.'),file('backend/middleware/auth.js','MANUAL','Middleware que exige una sesión válida.')]
      ),
      A(
        'JWT',
        'JWT: token firmado, no una sesión cifrada',
        'Un JWT suele tener header.payload.signature. El payload puede leerse si alguien posee el token; la firma sirve para detectar modificaciones, no para ocultar datos. Por eso no debes poner contraseñas ni secretos dentro de los claims. Un access token normalmente incluye sub, roles/scopes y exp. Cómo funciona exactamente: el servidor firma los bytes de header y payload; al recibir el token verifica firma, expiración, issuer, audience y claims necesarios. Cómo comprobarlo: cambia un carácter del payload y comprueba que la verificación de firma falla.',
        'eyJhbGciOiJIUzI1NiJ9\n.eyJzdWIiOiIxMjMiLCJyb2xlIjoic3R1ZGVudCIsImV4cCI6MTc4MDAwMDAwMH0\n.firma...\n\nPayload visible:\n{\n  "sub": "123",\n  "role": "student",\n  "exp": 1780000000\n}',
        shell('JWT','#4ade80','<div style="display:grid;grid-template-columns:auto 1fr auto 1fr auto;gap:6px;align-items:center;font-family:monospace"><span style="color:#f472b6">header</span><span>.</span><span style="color:#38bdf8">payload</span><span>.</span><span style="color:#4ade80">signature</span></div><p style="margin:12px 0 0;color:#cbd5e1">Firmado ≠ cifrado. Los claims no son un lugar para secretos.</p>'),
        'Valida también iss y aud cuando tu arquitectura los use; no basta con “decodificar” el token.',
        [['Crear','backend/auth/jwt.js','Centraliza firma y verificación de access tokens.'],['Modificar','backend/middleware/auth.js','Verifica firma, exp y claims antes de aceptar la solicitud.'],['Guardar','backend/.env','Guarda claves/secretos fuera del código y fuera de Git.']],
        [file('backend/auth/jwt.js','MANUAL','Funciones para firmar y verificar JWT.'),file('backend/.env','MANUAL','Variables secretas; no se sube al repositorio.')]
      ),
      A(
        'Bearer',
        'JWT enviado en Authorization: Bearer',
        'Una API puede entregar un access token y el cliente enviarlo explícitamente en la cabecera Authorization. El navegador no lo adjunta por sí solo: el código cliente debe hacerlo. Esto reduce el riesgo CSRF típico de credenciales enviadas automáticamente, pero si guardas el token en localStorage, un XSS puede leerlo. Cómo funciona exactamente: el cliente obtiene el token, lo conserva según la estrategia elegida y lo añade a cada petición protegida. Cómo comprobarlo: quita Authorization en DevTools o en el código y verifica que la API responde 401.',
        'GET /api/perfil HTTP/1.1\nHost: api.ejemplo.com\nAuthorization: Bearer eyJhbGciOi...\n\nfetch("/api/perfil", {\n  headers: {\n    Authorization: `Bearer ${accessToken}`\n  }\n});',
        shell('Bearer token','#22c55e','<div style="display:grid;grid-template-columns:1fr auto 1fr;gap:10px;align-items:center;text-align:center"><div>💻 Cliente</div><div style="color:#4ade80;font-family:monospace">Authorization: Bearer … →</div><div>🖥️ API</div></div>'),
        'Para una SPA, evita presentar localStorage como “la opción segura por defecto”; la decisión depende del modelo de amenazas y del diseño de refresh.',
        [['Modificar','frontend/src/api.js','Añade Authorization a las llamadas protegidas.'],['Modificar','backend/middleware/auth.js','Lee Bearer y valida el token.']],
        [file('frontend/src/api.js','MANUAL','Cliente HTTP centralizado que adjunta el access token.')]
      ),
      A(
        'JWT en cookie',
        'Un JWT también puede viajar dentro de una cookie HttpOnly',
        'JWT y cookie pueden combinarse. El servidor puede colocar el token en una cookie HttpOnly para que JavaScript no pueda leerlo. El navegador la enviará automáticamente, por lo que debes considerar CSRF y configurar SameSite, origen y/o token CSRF según el caso. Cómo funciona exactamente: la cookie es el transporte; el valor transportado es un JWT. Cómo comprobarlo: verifica que document.cookie no exponga una cookie HttpOnly y que la petición sí la incluya en Network.',
        'Set-Cookie: access_token=<jwt>; Path=/; HttpOnly; Secure; SameSite=Lax\n\nfetch("https://api.ejemplo.com/perfil", {\n  credentials: "include"\n});',
        shell('JWT + Cookie','#38bdf8','<div style="display:grid;gap:8px"><div>JWT = contenido firmado</div><div>Cookie = mecanismo que lo transporta</div><div style="padding:9px;border-radius:9px;background:#0f1b2d;font-family:monospace">Set-Cookie: access_token=&lt;jwt&gt;; HttpOnly; Secure</div></div>'),
        'HttpOnly reduce el robo directo del token por JavaScript, pero no elimina XSS ni sustituye defensas CSRF.',
        [['Modificar','backend/routes/auth.js','Emite la cookie HttpOnly después del login.'],['Modificar','frontend/src/api.js','Usa credentials: include cuando corresponda.'],['Modificar','backend/config/cookies.js','Centraliza SameSite, Secure, Path y expiración.']],
        [file('backend/config/cookies.js','MANUAL','Política común de cookies de autenticación.')]
      ),
      A(
        'seguridad',
        'XSS, CSRF, HttpOnly, Secure y SameSite',
        'XSS ejecuta JavaScript dentro de tu origen; por eso puede leer tokens accesibles a JavaScript y también realizar acciones como el usuario. CSRF intenta hacer que el navegador autenticado envíe una petición no deseada cuando la credencial se adjunta automáticamente, como una cookie. HttpOnly, Secure y SameSite son defensas útiles, pero no sustituyen escape de salida, CSP, validación de origen ni tokens CSRF cuando sean necesarios. Cómo funciona exactamente: cada defensa corta una ruta distinta del ataque. Cómo comprobarlo: inspecciona flags de cookies, prueba peticiones cross-site controladas y verifica que las operaciones sensibles rechacen origen/token inválido.',
        'Riesgo          Bearer accesible a JS     Cookie HttpOnly\nXSS roba valor   alto si está en localStorage  reduce lectura directa\nXSS hace acciones sí                        sí\nCSRF automático  menor si header manual       considerar/mitigar\n\nCookie recomendada:\nHttpOnly; Secure; SameSite=Lax o Strict según flujo',
        shell('Seguridad','#f59e0b','<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px"><div style="padding:11px;border:1px solid #f59e0b;border-radius:10px"><strong>XSS</strong><p style="margin:5px 0 0;color:#cbd5e1">Inyección de script en tu origen.</p></div><div style="padding:11px;border:1px solid #f59e0b;border-radius:10px"><strong>CSRF</strong><p style="margin:5px 0 0;color:#cbd5e1">Petición forzada con credencial automática.</p></div></div>'+chips(['HttpOnly','Secure','SameSite','CSP','CSRF token/origin checks'])),
        'No guardes identificadores de sesión en URLs ni pongas información sensible en claims JWT.',
        [['Modificar','backend/config/cookies.js','Aplica flags seguros según entorno.'],['Modificar','backend/middleware/csrf.js','Valida origen o token CSRF cuando tu flujo lo requiera.'],['Modificar','frontend/index.html','Configura CSP desde cabeceras del servidor; el HTML solo ayuda a entender qué scripts cargas.']],
        [file('backend/middleware/csrf.js','MANUAL','Protección para operaciones que usan autenticación enviada automáticamente.')]
      ),
      A(
        'revocación',
        'Logout y revocación: la diferencia práctica',
        'Una sesión servidor es fácil de invalidar: elimina el registro asociado al session_id. Un JWT autocontenido válido puede seguir aceptándose hasta expirar salvo que implementes una denylist, versión de token, introspección u otro estado de revocación. Por eso los access tokens suelen ser cortos y, cuando hay refresh tokens, estos requieren una política de rotación y revocación. Cómo funciona exactamente: logout debe invalidar la credencial que podría seguir siendo aceptada después de cerrar la interfaz. Cómo comprobarlo: cierra sesión y reintenta la misma credencial capturada; debe fallar según la política definida.',
        'SESSION\nlogout → borrar session_id del store → acceso rechazado\n\nJWT\nlogout → borrar cliente no siempre invalida token ya emitido\n       → usar exp corto + refresh rotado / revocación cuando aplique',
        shell('Revocación','#c084fc','<div style="display:grid;gap:8px"><div><strong>Session:</strong> eliminar registro → revocación inmediata.</div><div><strong>JWT:</strong> exp corto; si necesitas revocación inmediata introduces estado adicional.</div></div>'),
        '“Stateless” no significa “sin decisiones de estado”: refresh tokens, revocación y rotación suelen necesitar persistencia.',
        [['Modificar','backend/routes/logout.js','Invalida sesión o refresh token y elimina cookies si existen.'],['Modificar','backend/auth/token-store.js','Opcional: registra refresh tokens, familias o revocaciones.']],
        [file('backend/routes/logout.js','MANUAL','Endpoint de cierre de sesión.'),file('backend/auth/token-store.js','OPCIONAL','Persistencia de refresh/revocación cuando el diseño JWT lo requiere.')]
      ),
      A(
        'comparativa',
        'Comparativa rápida: qué elegir y por qué',
        'Para una aplicación web tradicional del mismo dominio, una sesión con cookie HttpOnly suele ser simple y ofrece revocación directa. Para APIs consumidas por móviles, CLIs o múltiples servicios, Bearer tokens pueden encajar mejor. JWT ayuda cuando varios servicios necesitan verificar claims sin consultar una sesión central en cada request, pero añade complejidad de expiración, claves y revocación. Cómo funciona exactamente: elige primero el modelo de cliente y amenazas; después decide almacenamiento, transporte y validación. Cómo comprobarlo: documenta qué ocurre con login, request autenticado, expiración, logout, cambio de contraseña y compromiso de credencial.',
        'Caso                              Opción frecuente\nWeb mismo dominio                  Session + cookie HttpOnly\nSPA + API mismo dominio            Cookie HttpOnly o BFF\nMóvil / CLI → API                  Bearer token\nMicroservicios verificando claims  JWT de corta vida\nRevocación inmediata sencilla      Session servidor\n\nNo existe una opción universalmente mejor.',
        shell('Comparativa','#60a5fa','<table style="width:100%;border-collapse:collapse;font-size:13px"><tr><th style="text-align:left;padding:7px;border-bottom:1px solid #334155">Característica</th><th style="padding:7px;border-bottom:1px solid #334155">JWT Bearer</th><th style="padding:7px;border-bottom:1px solid #334155">Session + Cookie</th></tr><tr><td style="padding:7px">Estado principal</td><td style="padding:7px;text-align:center">token</td><td style="padding:7px;text-align:center">servidor</td></tr><tr><td style="padding:7px">Revocación</td><td style="padding:7px;text-align:center">requiere diseño</td><td style="padding:7px;text-align:center">directa</td></tr><tr><td style="padding:7px">Cliente no navegador</td><td style="padding:7px;text-align:center">muy cómodo</td><td style="padding:7px;text-align:center">posible</td></tr><tr><td style="padding:7px">CSRF</td><td style="padding:7px;text-align:center">menor con header manual</td><td style="padding:7px;text-align:center">mitigar</td></tr></table>'),
        'La arquitectura concreta manda: no elijas JWT solo porque “escala más”.',
        [['Documentar','docs/auth-decision.md','Anota clientes, amenazas, expiración, logout, revocación y transporte elegidos.']],
        [file('docs/auth-decision.md','MANUAL','Decisión de arquitectura y razones de seguridad.')]
      ),
      A(
        'práctica',
        'Mini proyecto: organiza los archivos antes de programar',
        'Para practicar sin mezclar responsabilidades, separa rutas de login/logout, utilidades JWT, almacenamiento de sesión, middleware y cliente HTTP. La estructura es una guía genérica: adáptala al framework que estés usando. Cómo funciona exactamente: cada archivo tiene una responsabilidad y ambos mecanismos comparten la validación del usuario, pero no el modo de conservar la autenticación. Cómo comprobarlo: localiza en qué archivo se crea la credencial, dónde se valida y qué archivo la adjunta desde el cliente.',
        'auth-demo/\n├── backend/\n│   ├── routes/\n│   │   ├── auth.js\n│   │   └── logout.js\n│   ├── auth/\n│   │   ├── jwt.js\n│   │   └── token-store.js\n│   ├── middleware/\n│   │   ├── auth.js\n│   │   └── csrf.js\n│   ├── config/\n│   │   └── cookies.js\n│   ├── session-store.js\n│   └── .env\n├── frontend/\n│   └── src/\n│       └── api.js\n└── docs/\n    └── auth-decision.md',
        shell('Estructura del proyecto','#38bdf8','<div style="font-family:ui-monospace,monospace;white-space:pre;line-height:1.55;color:#dbeafe">backend/routes/auth.js\nbackend/auth/jwt.js\nbackend/session-store.js\nbackend/middleware/auth.js\nfrontend/src/api.js\ndocs/auth-decision.md</div>'),
        'Primero implementa una sola estrategia completa; luego compara con la segunda para entender las diferencias.',
        [['Crear','auth-demo/','Carpeta raíz del ejercicio.'],['Crear','backend/routes/auth.js','Login y emisión de sesión o token.'],['Crear','backend/middleware/auth.js','Protección de endpoints.'],['Crear','frontend/src/api.js','Peticiones autenticadas desde el cliente.']],
        [file('backend/routes/auth.js','MANUAL','Login y emisión de credenciales.'),file('backend/auth/jwt.js','MANUAL','Firma/verificación JWT.'),file('backend/session-store.js','MANUAL','Persistencia de sesiones.'),file('backend/middleware/auth.js','MANUAL','Verificación de autenticación.'),file('frontend/src/api.js','MANUAL','Cliente HTTP.'),file('docs/auth-decision.md','MANUAL','Decisión y amenazas contempladas.')]
      ),
      A(
        'ejercicio final',
        'Ejercicio: dibuja dos flujos y detecta el error',
        'Construye dos diagramas: A) session_id en cookie HttpOnly y estado en Redis; B) JWT corto en Authorization Bearer. Después corrige tres errores comunes: guardar session_id en la URL, afirmar que un JWT está cifrado y afirmar que cookies y sessions son alternativas incompatibles. Cómo funciona exactamente: el ejercicio fuerza a separar formato, transporte y estado. Cómo comprobarlo: otra persona debe poder indicar en tu diagrama qué guarda el navegador, qué guarda el servidor y qué se envía en cada request.',
        'FLUJO A · SESSION\nLogin → servidor crea session_id → Set-Cookie HttpOnly\nRequest → Cookie: session_id → servidor consulta Redis\nLogout → servidor elimina session_id\n\nFLUJO B · JWT BEARER\nLogin → servidor firma access token corto\nRequest → Authorization: Bearer <jwt>\nAPI → verifica firma + exp + claims\n\nCorrige:\n❌ session_id en URL\n❌ JWT = datos cifrados\n❌ cookie y session no pueden combinarse',
        shell('Reto final','#22c55e','<ol style="margin:0;padding-left:20px;line-height:1.7"><li>Dibuja Session + Cookie.</li><li>Dibuja JWT + Bearer.</li><li>Marca dónde están XSS, CSRF y revocación.</li><li>Explica por qué una cookie puede transportar session_id o JWT.</li></ol>'),
        'Si puedes explicar esos dos flujos sin usar “cookie” como sinónimo de “session”, ya tienes el modelo correcto.',
        [['Crear','docs/auth-flows.md','Dibuja y explica los dos flujos del ejercicio final.']],
        [file('docs/auth-flows.md','MANUAL','Diagramas finales y explicación del modelo de autenticación.')]
      )
    ]
  };

  sections.push(section);
})();
