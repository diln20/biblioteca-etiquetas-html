(()=>{
  if(window.__webSecurityStateDataAdded)return;
  window.__webSecurityStateDataAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const card=(title,color,body)=>`<section style="font-family:system-ui;border:1px solid ${color};border-radius:14px;background:#08111f;color:#e5edf8;overflow:hidden"><header style="padding:10px 14px;background:#0f1b2d;color:${color};font-weight:900">${title}</header><div style="padding:16px;line-height:1.55">${body}</div></section>`;
  const grid=(items)=>`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:10px">${items.join('')}</div>`;
  const panel=(title,color,text)=>`<div style="padding:12px;border:1px solid ${color};border-radius:11px"><strong style="color:${color}">${title}</strong><p style="margin:6px 0 0;color:#cbd5e1">${text}</p></div>`;
  const file=(path,method,detail,command='')=>({path,method,detail,command});
  const L=(topic,name,description,code,preview,meta={})=>T(topic,name,description,code,preview,[],{
    kind:meta.kind||'Desarrollo web moderno',
    tip:meta.tip||'Relaciona la herramienta con el problema que resuelve antes de añadir una dependencia.',
    guide:meta.guide||[],
    guideTitle:'Dónde se hace cada modificación',
    codeLabel:meta.codeLabel||'Código',
    filesToCreate:meta.files||[],
    filesToCreateTitle:'Archivos que se crean en esta lección',
    filesToCreateStatus:(meta.files||[]).length?'Crea estos archivos para repetir la práctica desde cero.':'No debes crear archivos nuevos en esta lección; revisa o modifica los indicados abajo.'
  });

  sections.push({
    title:'APIs · 7. Seguridad web · CORS, CSP y HTTPS',
    navLabel:'7. CORS, CSP y HTTPS',
    group:'APIs',primaryArea:'APIs',course:'APIs',areaOrder:70,
    description:'Diferencia tres capas que suelen confundirse: CORS controla qué orígenes puede leer el navegador, CSP limita qué recursos puede cargar o ejecutar una página y HTTPS protege el transporte mediante TLS. Se estudian por separado y luego se combinan en una aplicación real.',
    quote:'“CORS, CSP y HTTPS no compiten entre sí: protegen problemas distintos.”',
    challenge:'Configura una API para un frontend separado, añade una CSP mínima y comprueba que todo el tráfico use HTTPS sin romper recursos legítimos.',
    items:[
      L('Comparación','Qué protege realmente cada mecanismo',
        'CORS es una política aplicada principalmente por el navegador para decidir si JavaScript de un origen puede leer una respuesta de otro origen. CSP es una política enviada por el servidor que limita scripts, estilos, imágenes, frames y otros recursos permitidos. HTTPS usa TLS para cifrar el tráfico, proteger su integridad y autenticar al servidor mediante certificados. Ninguno reemplaza a los otros.',
        `CORS  → controla acceso entre orígenes desde el navegador\nCSP   → controla qué recursos puede cargar/ejecutar la página\nHTTPS → cifra y autentica la comunicación por red`,
        card('CORS vs CSP vs HTTPS','#38bdf8',grid([
          panel('CORS','#4ade80','Origen A intenta leer una respuesta del origen B.'),
          panel('CSP','#38bdf8','La página solo puede cargar recursos autorizados por su política.'),
          panel('HTTPS','#c084fc','Los datos viajan cifrados entre cliente y servidor.')
        ])),
        {kind:'Seguridad web',codeLabel:'Modelo de seguridad',guide:[['Revisar','DevTools · Network','Compara Access-Control-Allow-Origin, Content-Security-Policy y el uso de https://.']]}
      ),
      L('CORS','Origen, same-origin policy y respuestas permitidas',
        'Un origen está formado por esquema, host y puerto. https://app.ejemplo.com y https://api.ejemplo.com son orígenes diferentes aunque compartan dominio base. La same-origin policy limita el acceso de JavaScript a respuestas cross-origin. CORS permite al servidor declarar orígenes autorizados mediante cabeceras HTTP. Importante: CORS no autentica usuarios, no es un firewall y no impide que herramientas fuera del navegador llamen a tu API.',
        `Origin: https://app.ejemplo.com\n\nAccess-Control-Allow-Origin: https://app.ejemplo.com\nVary: Origin`,
        card('CORS','#4ade80','<div>🌐 <strong>app.ejemplo.com</strong> → API</div><div style="margin-top:8px;color:#4ade80">✓ El servidor permite ese Origin</div><div style="margin-top:8px;color:#94a3b8">El navegador decide si entrega la respuesta a JavaScript.</div>'),
        {kind:'Seguridad web',codeLabel:'HTTP / CORS',guide:[['Modificar','backend/config/cors.js','Centraliza aquí la lista de orígenes confiables.'],['Revisar','DevTools · Network · Response Headers','Comprueba Access-Control-Allow-Origin y Vary.']],files:[file('backend/config/cors.js','MANUAL','Configuración CORS del backend.')]}
      ),
      L('Preflight','OPTIONS, métodos y credenciales',
        'Algunas solicitudes cross-origin requieren una petición previa OPTIONS llamada preflight. El navegador pregunta qué métodos y cabeceras acepta el servidor. Si usas credenciales con cookies, el frontend suele necesitar credentials: include y el servidor Access-Control-Allow-Credentials: true. En ese caso no puedes responder Access-Control-Allow-Origin: * para una solicitud con credenciales.',
        `OPTIONS /api/perfil\nOrigin: https://app.ejemplo.com\nAccess-Control-Request-Method: PATCH\nAccess-Control-Request-Headers: content-type\n\nHTTP/1.1 204 No Content\nAccess-Control-Allow-Origin: https://app.ejemplo.com\nAccess-Control-Allow-Methods: GET,POST,PATCH\nAccess-Control-Allow-Headers: Content-Type\nAccess-Control-Allow-Credentials: true`,
        card('Preflight CORS','#22c55e','<div style="display:grid;gap:7px"><div>1. Navegador → OPTIONS</div><div>2. Servidor → permisos CORS</div><div>3. Navegador → PATCH real</div></div>'),
        {kind:'Seguridad web',codeLabel:'HTTP / CORS',guide:[['Modificar','backend/config/cors.js','Define métodos, headers y credenciales de forma explícita.'],['Modificar','frontend/src/api.js','Usa credentials: include solo cuando el diseño de autenticación lo necesite.']],files:[file('frontend/src/api.js','MANUAL','Cliente HTTP centralizado del frontend.')]}
      ),
      L('CSP','Content-Security-Policy y fuentes permitidas',
        'CSP reduce el impacto de inyecciones como XSS al limitar desde dónde pueden cargarse y ejecutarse recursos. default-src define una política base; script-src controla JavaScript; style-src estilos; img-src imágenes; connect-src conexiones fetch/WebSocket. Una CSP fuerte debe adaptarse a los recursos reales de la aplicación y puede empezar en modo Report-Only para detectar bloqueos antes de aplicarla.',
        `Content-Security-Policy:\n  default-src 'self';\n  script-src 'self';\n  style-src 'self';\n  img-src 'self' data: https://images.examplecdn.com;\n  connect-src 'self' https://api.ejemplo.com;\n  object-src 'none';\n  frame-ancestors 'none';`,
        card('CSP','#38bdf8',grid([
          panel('script-src','#38bdf8','Controla scripts permitidos.'),
          panel('img-src','#38bdf8','Controla imágenes y data URLs.'),
          panel('connect-src','#38bdf8','Controla fetch, XHR y WebSocket.')
        ])),
        {kind:'Seguridad web',codeLabel:'Cabecera CSP',guide:[['Crear','backend/config/security-headers.js','Define aquí CSP y otras cabeceras de seguridad.'],['Revisar','DevTools · Console','Los bloqueos CSP aparecen como errores de política.']],files:[file('backend/config/security-headers.js','MANUAL','Configuración de CSP y cabeceras de seguridad.')]}
      ),
      L('CSP avanzada','Nonce, hashes y por qué unsafe-inline debilita la política',
        'Una política CSP puede autorizar scripts inline concretos mediante nonce o hashes en lugar de permitir cualquier inline. El nonce debe ser impredecible y diferente por respuesta. Evita enseñar unsafe-inline como solución permanente porque elimina gran parte del beneficio para scripts. CSP complementa, pero no reemplaza, escape de salida, sanitización y prevención de inyección.',
        `Content-Security-Policy: script-src 'self' 'nonce-R4nd0m123'\n\n<script nonce="R4nd0m123">\n  iniciarApp();\n<\/script>`,
        card('CSP con nonce','#0ea5e9','<div>Servidor genera nonce único → cabecera CSP + atributo nonce del script autorizado.</div>'),
        {kind:'Seguridad web',codeLabel:'HTML + cabecera CSP',guide:[['Modificar','backend/config/security-headers.js','Genera o aplica la política con nonce.'],['Modificar','templates/base.html','Si usas renderizado servidor, coloca el nonce solamente en scripts autorizados.']],files:[file('templates/base.html','MANUAL','Plantilla base de ejemplo para practicar CSP con nonce.')]}
      ),
      L('HTTPS','TLS, certificado e integridad del transporte',
        'HTTPS es HTTP sobre TLS. Durante el handshake, el cliente valida el certificado del servidor y negocia claves para cifrar la sesión. Después protege confidencialidad e integridad de los datos mientras viajan por la red. HTTPS no corrige XSS, SQL injection o autorización incorrecta: protege el canal, no toda la aplicación.',
        `Cliente\n  ↓ valida certificado\nServidor HTTPS\n  ↓ negocian claves TLS\nCanal cifrado\n  ↓\nGET /api/perfil`,
        card('HTTPS / TLS','#c084fc','<div style="display:flex;gap:12px;align-items:center;justify-content:center"><strong>🌐 Navegador</strong><span>🔒 TLS</span><strong>🖥️ Servidor</strong></div>'),
        {kind:'Seguridad web',codeLabel:'Infraestructura',guide:[['Modificar','nginx.conf','Redirige HTTP a HTTPS y termina TLS si usas Nginx.'],['Revisar','Navegador · Security','Comprueba certificado, protocolo TLS y mixed content.']],files:[file('nginx.conf','MANUAL','Ejemplo de proxy HTTPS y redirección desde HTTP.')]}
      ),
      L('HTTPS','HSTS y contenido mixto',
        'HTTP Strict Transport Security indica al navegador que vuelva a usar HTTPS durante un periodo determinado. Debe activarse cuando el sitio ya funciona correctamente por HTTPS. Mixed content ocurre cuando una página HTTPS intenta cargar recursos por HTTP; los navegadores pueden bloquearlos o degradar la seguridad.',
        `Strict-Transport-Security: max-age=31536000; includeSubDomains\n\n# Evita:\n<img src="http://cdn.ejemplo.com/foto.jpg">\n\n# Usa:\n<img src="https://cdn.ejemplo.com/foto.jpg">`,
        card('HSTS + HTTPS','#a855f7','<div>HTTPS estable → HSTS → navegador recuerda usar HTTPS.</div><div style="margin-top:8px;color:#fca5a5">Evita recursos HTTP dentro de páginas HTTPS.</div>'),
        {kind:'Seguridad web',codeLabel:'Cabeceras / HTML',guide:[['Modificar','nginx.conf','Añade HSTS cuando HTTPS ya esté validado.'],['Revisar','src/ o templates/','Busca URLs http:// en recursos de producción.']]}
      ),
      L('Proyecto','Usar CORS, CSP y HTTPS juntos',
        'En una aplicación real las tres capas trabajan simultáneamente. HTTPS protege el transporte. CORS permite únicamente los orígenes frontend autorizados a leer la API desde navegador. CSP limita recursos y conexiones del documento frontend. A eso todavía debes sumar autenticación, autorización, validación, manejo de secretos y protección frente a inyecciones.',
        `Usuario\n  ↓ HTTPS\nFrontend\n  ├─ CSP → recursos permitidos\n  └─ fetch https://api.ejemplo.com\n          ↓ CORS valida Origin para el navegador\n       API\n          ↓ autenticación + autorización\n       Datos`,
        card('Defensa por capas','#f59e0b','<div style="display:grid;gap:8px"><div>🔒 HTTPS → canal</div><div>🌍 CORS → orígenes</div><div>🛡️ CSP → recursos</div><div>🔑 Auth → identidad y permisos</div></div>'),
        {kind:'Seguridad web',codeLabel:'Arquitectura',guide:[['Modificar','backend/config/cors.js','Lista de orígenes confiables.'],['Modificar','backend/config/security-headers.js','CSP y cabeceras.'],['Modificar','nginx.conf','HTTPS, proxy y HSTS.'],['Modificar','frontend/src/api.js','URL HTTPS y configuración de credenciales.']]}
      )
    ]
  });

  sections.push({
    title:'React · Gestión de estado · Redux, Zustand y Jotai',
    navLabel:'Gestión de estado · Redux, Zustand y Jotai',
    group:'React',primaryArea:'React',course:'React',areaOrder:250,
    description:'Compara tres enfoques para estado compartido en React. Se parte de useState y Context para decidir cuándo realmente hace falta una librería, y después se implementan Redux Toolkit, Zustand y Jotai con archivos concretos.',
    quote:'“Primero distingue estado local, estado global del cliente y estado del servidor.”',
    challenge:'Implementa el mismo carrito pequeño con Redux Toolkit, Zustand y Jotai; compara cantidad de archivos, flujo de actualización y facilidad de depuración.',
    items:[
      L('Antes de instalar','Cuándo no necesitas una librería global',
        'Si el estado pertenece a un solo componente, useState suele ser suficiente. Si unos pocos componentes cercanos comparten datos, elevar el estado o usar Context puede bastar. Una librería global tiene sentido cuando el estado del cliente se comparte ampliamente, necesita reglas claras de actualización, persistencia, debugging o composición entre muchas pantallas.',
        `Estado local        → useState\nEstado compartido pequeño → Context + reducer\nEstado cliente global → Redux / Zustand / Jotai\nEstado del servidor → TanStack Query (otro problema)`,
        card('Elegir por tipo de estado','#087ea4',grid([
          panel('Local','#4ade80','Un componente o una rama pequeña.'),
          panel('Global cliente','#38bdf8','Tema, carrito, filtros, sesión visual.'),
          panel('Servidor','#c084fc','Datos remotos, caché, refetch y sincronización.')
        ])),
        {kind:'React',codeLabel:'Arquitectura React',guide:[['Revisar','src/App.jsx','Antes de instalar una librería identifica quién necesita realmente el estado.']]}
      ),
      L('Redux Toolkit','Store, slice y Provider',
        'Redux moderno se recomienda normalmente con Redux Toolkit. configureStore crea el store; createSlice agrupa estado inicial, reducers y actions; Provider expone el store a React. El flujo sigue siendo explícito: componente → dispatch(action) → reducer → nuevo estado → componentes suscritos.',
        `npm install @reduxjs/toolkit react-redux\n\n// src/store/redux/counterSlice.js\nimport { createSlice } from '@reduxjs/toolkit';\n\nconst counterSlice = createSlice({\n  name: 'counter',\n  initialState: { value: 0 },\n  reducers: {\n    increment: state => { state.value += 1; }\n  }\n});\n\nexport const { increment } = counterSlice.actions;\nexport default counterSlice.reducer;`,
        card('Redux Toolkit','#22c55e','<div>Componente → dispatch(increment()) → reducer → store → UI</div>'),
        {kind:'React',codeLabel:'Código React + Redux Toolkit',guide:[['Ejecutar','Terminal · raíz del proyecto React','Instala @reduxjs/toolkit y react-redux.'],['Crear','src/store/redux/counterSlice.js','Define estado, reducers y actions.'],['Crear','src/store/redux/store.js','Combina reducers y crea el store.'],['Modificar','src/main.jsx','Envuelve <App /> con <Provider store={store}>.']],files:[file('src/store/redux/counterSlice.js','MANUAL','Slice Redux del contador.'),file('src/store/redux/store.js','MANUAL','Store Redux principal.')]}
      ),
      L('Redux Toolkit','Leer y actualizar desde un componente',
        'useSelector lee una parte del store y vuelve a renderizar el componente cuando cambia el valor seleccionado. useDispatch entrega la función dispatch para enviar acciones. Conviene seleccionar solo lo necesario para evitar renderizados por cambios irrelevantes.',
        `import { useDispatch, useSelector } from 'react-redux';\nimport { increment } from '../store/redux/counterSlice';\n\nexport function CounterRedux() {\n  const value = useSelector(state => state.counter.value);\n  const dispatch = useDispatch();\n\n  return <button onClick={() => dispatch(increment())}>Redux: {value}</button>;\n}`,
        card('Resultado Redux','#22c55e','<button type="button" style="padding:10px 14px">Redux: 0</button>'),
        {kind:'React',codeLabel:'Código React',guide:[['Crear','src/components/CounterRedux.jsx','Consume el store con useSelector y useDispatch.']],files:[file('src/components/CounterRedux.jsx','MANUAL','Componente que consume Redux.')]}
      ),
      L('Zustand','Store pequeño basado en hooks',
        'Zustand permite crear un store con create y consumirlo directamente como hook, sin Provider en el caso básico. Es útil cuando quieres estado global con poca ceremonia. Aun así debes diseñar bien acciones, selectores y límites del store; menos archivos no significa ausencia de arquitectura.',
        `npm install zustand\n\n// src/store/useCounterStore.js\nimport { create } from 'zustand';\n\nexport const useCounterStore = create(set => ({\n  count: 0,\n  increment: () => set(state => ({ count: state.count + 1 }))\n}));\n\n// componente\nconst count = useCounterStore(state => state.count);\nconst increment = useCounterStore(state => state.increment);`,
        card('Zustand','#38bdf8','<div>useCounterStore(selector) → estado + acción sin Provider básico.</div>'),
        {kind:'React',codeLabel:'Código React + Zustand',guide:[['Ejecutar','Terminal · raíz del proyecto React','Instala zustand.'],['Crear','src/store/useCounterStore.js','Define estado y acciones.'],['Modificar','src/App.jsx','Consume el store mediante selectores.']],files:[file('src/store/useCounterStore.js','MANUAL','Store Zustand del ejemplo.')]}
      ),
      L('Jotai','Estado atómico y composición',
        'Jotai divide el estado en atoms. Un atom puede contener un valor o derivarse de otros atoms. useAtom lee y actualiza el atom; useAtomValue solo lee. Este enfoque es cómodo cuando la interfaz tiene muchas piezas de estado pequeñas e independientes que se combinan de forma declarativa.',
        `npm install jotai\n\n// src/state/counterAtoms.js\nimport { atom } from 'jotai';\n\nexport const countAtom = atom(0);\nexport const doubleAtom = atom(get => get(countAtom) * 2);\n\n// componente\nconst [count, setCount] = useAtom(countAtom);\nconst double = useAtomValue(doubleAtom);`,
        card('Jotai','#c084fc','<div>countAtom = 2</div><div style="margin-top:7px">doubleAtom = 4 (derivado)</div>'),
        {kind:'React',codeLabel:'Código React + Jotai',guide:[['Ejecutar','Terminal · raíz del proyecto React','Instala jotai.'],['Crear','src/state/counterAtoms.js','Define atoms base y derivados.'],['Modificar','src/App.jsx','Consume atoms con useAtom/useAtomValue.']],files:[file('src/state/counterAtoms.js','MANUAL','Atoms Jotai del ejemplo.')]}
      ),
      L('Comparación','Redux vs Zustand vs Jotai',
        'Redux Toolkit favorece un flujo explícito, convenciones fuertes, DevTools y equipos grandes. Zustand ofrece una API muy directa para stores globales y selectores. Jotai modela estado fino mediante atoms. No conviene decidir por una cifra fija de bundle porque cambia entre versiones, tree-shaking y configuración; compara API, restricciones, equipo y necesidades reales.',
        `Redux Toolkit → flujo explícito, slices, middleware, DevTools\nZustand       → store-hook directo y poca ceremonia\nJotai         → atoms pequeños y estado derivado\n\nNo reemplazan a TanStack Query para estado remoto.`,
        card('Comparación de estado','#0f172a',grid([
          panel('Redux Toolkit','#4ade80','Estructura fuerte y flujo predecible.'),
          panel('Zustand','#38bdf8','Store global simple con hooks.'),
          panel('Jotai','#c084fc','Atoms independientes y composición fina.')
        ])),
        {kind:'React',codeLabel:'Comparación React',guide:[['Revisar','src/store/','Mantén cada alternativa en carpetas separadas mientras comparas.']]}
      )
    ]
  });

  sections.push({
    title:'React · Consumo de APIs · TanStack Query, Axios y Fetch',
    navLabel:'Consumo de APIs · TanStack Query, Axios y Fetch',
    group:'React',primaryArea:'React',course:'React',areaOrder:260,
    description:'Diferencia un cliente HTTP de una herramienta de server state. Fetch y Axios realizan solicitudes; TanStack Query administra caché, estados, refetch, invalidación y sincronización usando una función que puede llamar a fetch o Axios.',
    quote:'“TanStack Query no reemplaza a fetch o Axios: administra el ciclo de vida de los datos remotos.”',
    challenge:'Construye una lista de usuarios primero con fetch, luego con Axios y finalmente añade TanStack Query para caché, estados e invalidación.',
    items:[
      L('Comparación','Primero: no hacen exactamente lo mismo',
        'fetch es una API nativa para solicitudes HTTP. Axios es una librería cliente HTTP con una API propia, configuración global e interceptores. TanStack Query es una librería de server state: necesita una queryFn que obtenga los datos, normalmente usando fetch, Axios u otro cliente. Por eso la comparación correcta separa transporte HTTP de gestión de caché y sincronización.',
        `fetch        → cliente HTTP nativo\nAxios        → cliente HTTP de librería\nTanStack Query → caché + estados + refetch + mutations\n\nTanStack Query + fetch\nTanStack Query + Axios`,
        card('Transporte vs server state','#f59e0b',grid([
          panel('Fetch','#c084fc','Realiza la solicitud HTTP.'),
          panel('Axios','#38bdf8','Realiza HTTP con helpers e interceptores.'),
          panel('TanStack Query','#4ade80','Gestiona el ciclo de vida del dato remoto.')
        ])),
        {kind:'React',codeLabel:'Arquitectura de datos',guide:[['Revisar','src/api/','Coloca funciones HTTP separadas de los componentes.'],['Revisar','src/query/','Coloca configuración de TanStack Query y políticas de caché.']]}
      ),
      L('Fetch','Petición nativa con validación de response.ok',
        'fetch viene en navegadores modernos. Una respuesta HTTP 404 o 500 no rechaza automáticamente la Promise: debes revisar response.ok o response.status. Después puedes convertir el cuerpo con json(), text(), blob(), etc. Para proyectos pequeños puede ser suficiente si creas funciones reutilizables para errores, base URL y autenticación.',
        `// src/api/users.js\nexport async function getUsers() {\n  const response = await fetch('https://jsonplaceholder.typicode.com/users');\n  if (!response.ok) {\n    throw new Error('HTTP ' + response.status);\n  }\n  return response.json();\n}`,
        card('Fetch','#c084fc','<div>GET /users → comprobar response.ok → response.json()</div>'),
        {kind:'React',codeLabel:'JavaScript / Fetch',guide:[['Crear','src/api/users.js','Encapsula aquí la llamada HTTP.'],['Modificar','src/features/users/UsersPage.jsx','Llama getUsers y representa loading/error/data.']],files:[file('src/api/users.js','MANUAL','Funciones HTTP de usuarios.'),file('src/features/users/UsersPage.jsx','MANUAL','Pantalla que consume usuarios.')]}
      ),
      L('Axios','Instancia, baseURL e interceptores',
        'Axios agrega una API de cliente HTTP con instancias, baseURL, interceptores y transformación automática de JSON. Una práctica común es crear una sola instancia para no repetir URL y cabeceras. Los interceptores son útiles para añadir credenciales o centralizar ciertos errores, pero deben evitar bucles de reintentos y lógica difícil de rastrear.',
        `npm install axios\n\n// src/api/http.js\nimport axios from 'axios';\n\nexport const http = axios.create({\n  baseURL: 'https://api.ejemplo.com',\n  timeout: 8000\n});\n\nhttp.interceptors.request.use(config => {\n  const token = sessionStorage.getItem('access_token');\n  if (token) config.headers.Authorization = 'Bearer ' + token;\n  return config;\n});`,
        card('Axios','#38bdf8','<div>Componente → función API → instancia Axios → interceptor → servidor</div>'),
        {kind:'React',codeLabel:'Código Axios',guide:[['Ejecutar','Terminal · raíz del proyecto React','Instala axios.'],['Crear','src/api/http.js','Configura instancia, baseURL, timeout e interceptores.'],['Modificar','src/api/users.js','Usa http.get/post en funciones de dominio.']],files:[file('src/api/http.js','MANUAL','Instancia Axios compartida.'),file('src/api/users.js','MANUAL','Funciones de acceso al recurso users.')]}
      ),
      L('TanStack Query','QueryClient, Provider y useQuery',
        'TanStack Query almacena el resultado asociado a una queryKey y expone estados como isPending, isError y data. queryFn es quien realiza la solicitud. staleTime define durante cuánto tiempo un dato se considera fresco. El QueryClientProvider debe envolver la aplicación para compartir el cliente de caché.',
        `npm install @tanstack/react-query\n\n// src/query/client.js\nimport { QueryClient } from '@tanstack/react-query';\nexport const queryClient = new QueryClient();\n\n// src/features/users/UsersPage.jsx\nconst usersQuery = useQuery({\n  queryKey: ['users'],\n  queryFn: getUsers,\n  staleTime: 60_000\n});`,
        card('TanStack Query','#4ade80','<div style="display:grid;gap:6px"><div>queryKey: [users]</div><div>cache → fresh / stale</div><div>UI → pending / error / data</div></div>'),
        {kind:'React',codeLabel:'Código React + TanStack Query',guide:[['Ejecutar','Terminal · raíz del proyecto React','Instala @tanstack/react-query.'],['Crear','src/query/client.js','Crea QueryClient.'],['Modificar','src/main.jsx','Añade QueryClientProvider.'],['Modificar','src/features/users/UsersPage.jsx','Usa useQuery para leer datos remotos.']],files:[file('src/query/client.js','MANUAL','QueryClient de la aplicación.'),file('src/features/users/UsersPage.jsx','MANUAL','Pantalla con useQuery.')]}
      ),
      L('TanStack Query','Mutations e invalidación',
        'useMutation representa operaciones que cambian datos en el servidor. Después de una creación o edición puedes invalidar queries relacionadas para que TanStack Query vuelva a consultarlas cuando corresponda. Esto evita mantener manualmente múltiples copias desincronizadas del mismo dato remoto.',
        `const queryClient = useQueryClient();\n\nconst createUser = useMutation({\n  mutationFn: postUser,\n  onSuccess: () => {\n    queryClient.invalidateQueries({ queryKey: ['users'] });\n  }\n});`,
        card('Mutation','#22c55e','<div>POST usuario → éxito → invalidateQueries([users]) → lista se refresca</div>'),
        {kind:'React',codeLabel:'Código React + TanStack Query',guide:[['Modificar','src/api/users.js','Crea postUser/patchUser/deleteUser.'],['Modificar','src/features/users/UsersPage.jsx','Añade useMutation e invalidación.']]}
      ),
      L('Comparación','Cuándo usar Fetch, Axios y TanStack Query',
        'Usa fetch cuando quieres cero dependencias y las necesidades HTTP son sencillas. Axios puede convenir si valoras instancias, interceptores y una API uniforme de cliente. TanStack Query se vuelve valioso cuando el problema principal es estado del servidor: caché, deduplicación, estados de carga, reintentos, invalidación, refetch y sincronización. Puedes usar TanStack Query encima de fetch o de Axios.',
        `Proyecto pequeño, pocas llamadas → fetch\nCliente HTTP centralizado/interceptores → Axios\nDatos remotos repetidos, caché y mutations → TanStack Query\n\nCombinación común:\nTanStack Query + fetch\nTanStack Query + Axios`,
        card('Elegir la herramienta','#0f172a',grid([
          panel('Fetch','#c084fc','Nativo y suficiente para muchas llamadas simples.'),
          panel('Axios','#38bdf8','Cliente HTTP con configuración e interceptores.'),
          panel('TanStack Query','#4ade80','Caché y sincronización de server state.')
        ])),
        {kind:'React',codeLabel:'Comparación',guide:[['Revisar','src/api/','Transporte HTTP y funciones de dominio.'],['Revisar','src/query/','Políticas de caché y QueryClient.']]}
      )
    ]
  });
})();
