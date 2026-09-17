(()=>{
  if(window.__uiUxVisualStylesAdded)return;
  window.__uiUxVisualStylesAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const panel=(html,background='#0b1220')=>`<div style="font-family:system-ui;padding:18px;border:1px solid #334155;border-radius:16px;background:${background};color:#e5edf8">${html}</div>`;
  const file=(path,detail)=>({path,method:'MANUAL',detail});
  const U=(tag,name,description,code,preview,tip,meta={})=>T(tag,name,description,code,preview,[],{
    kind:'UI/UX · estilos visuales',
    tip,
    guideTitle:'Dónde practicarlo',
    codeLabel:'HTML + CSS del estilo',
    filesToCreateTitle:'Archivos para practicar',
    filesToCreateStatus:'Recrea el principio visual con tu propio contenido. No necesitas copiar literalmente una referencia para aprender el estilo.',
    ...meta
  });

  sections.push({
    title:'UI/UX · Estilos de diseño web modernos',
    navLabel:'Estilos web modernos',
    description:'Aprende a reconocer y construir con CSS cuatro lenguajes visuales frecuentes: brutalismo, maximalismo, minimalismo y glassmorphism. Cada estilo incluye señales visuales, código reproducible, ventajas, riesgos y una práctica para transformar la misma página sin cambiar su HTML principal.',
    quote:'“Un estilo visual cambia la presentación; la jerarquía, legibilidad y accesibilidad siguen siendo obligatorias.”',
    challenge:'Construye una misma tarjeta de curso en cuatro versiones: brutalista, maximalista, minimalista y glassmorphism. Después compara cuál comunica mejor el contenido.',
    items:[
      U(
        'estilo visual jerarquia ux',
        '1. Antes del estilo: jerarquía, contraste y propósito',
        'Brutalismo, maximalismo, minimalismo y glassmorphism son formas de presentación, no sustitutos de una buena experiencia. Antes de decorar, define qué debe leer primero el usuario, cuál es la acción principal, qué información puede esperar y cómo se verá la interfaz en móvil. El mismo HTML puede recibir estilos completamente distintos.',
        `<!-- La estructura puede mantenerse -->\n<article class="tarjeta">\n  <span class="etiqueta">Diseño web</span>\n  <h2>Curso de CSS</h2>\n  <p>Aprende layouts, responsive y componentes.</p>\n  <a href="#">Ver curso</a>\n</article>\n\n/* Después cambia únicamente la clase del tema */\n<body class="tema-minimalista">`,
        panel('<div style="display:grid;gap:10px"><strong style="font-size:22px">Orden recomendado</strong><div>1. Contenido y jerarquía</div><div>2. Layout</div><div>3. Contraste y tipografía</div><div>4. Estilo visual</div><div>5. Responsive y accesibilidad</div></div>'),
        'No empieces por sombras o animaciones: primero asegúrate de que la página se entienda sin ellas.',
        {guide:[['Crear','ui-ux/estilos/index.html','Usa una tarjeta base que luego reutilizarás.'],['Crear','ui-ux/estilos/styles.css','Aquí construirás los cuatro temas.']],filesToCreate:[file('ui-ux/estilos/index.html','Estructura HTML común.'),file('ui-ux/estilos/styles.css','Variantes visuales con CSS.')]}
      ),
      U(
        'brutalismo neobrutalismo web',
        '2. Sitio web brutalista / neo-brutalista',
        'El brutalismo web suele usar contraste fuerte, tipografía grande, bordes evidentes, colores directos y composiciones que no intentan ocultar la estructura. En variantes neo-brutalistas aparecen bloques geométricos, sombras duras y colores intensos. La intención es que la interfaz se sienta directa y deliberadamente cruda.',
        `.brutal {\n  background: #f5f5f0;\n  color: #080808;\n  border: 4px solid #080808;\n  border-radius: 0;\n  padding: 24px;\n  box-shadow: 10px 10px 0 #080808;\n}\n\n.brutal h2 {\n  margin: 0 0 12px;\n  font-size: clamp(2rem, 7vw, 4.5rem);\n  line-height: .9;\n  text-transform: uppercase;\n}\n\n.brutal .etiqueta {\n  display: inline-block;\n  padding: 6px 10px;\n  border: 3px solid #080808;\n  background: #d9ff00;\n  font-weight: 900;\n}\n\n.brutal a {\n  display: inline-block;\n  margin-top: 14px;\n  padding: 10px 16px;\n  border: 3px solid #080808;\n  background: #080808;\n  color: white;\n  font-weight: 800;\n  text-decoration: none;\n}`,
        panel('<div style="padding:22px;background:#f5f5f0;color:#080808;border:4px solid #080808;box-shadow:9px 9px 0 #080808"><span style="display:inline-block;padding:5px 9px;border:3px solid #080808;background:#d9ff00;font-weight:900">CSS</span><div style="font-size:38px;line-height:.95;font-weight:1000;text-transform:uppercase;margin:14px 0">Diseño<br>sin disfraz</div><div style="font-weight:650">Bordes visibles, contraste duro y tipografía dominante.</div></div>','#e5e7eb'),
        'Evita sacrificar legibilidad solo para parecer “crudo”. Contraste fuerte no significa texto desordenado.',
        {guide:[['Modificar','ui-ux/estilos/styles.css','Crea la clase .brutal y aplícala a una tarjeta.']],filesToCreate:[file('ui-ux/estilos/styles.css','Estilos brutalistas reproducibles.')]}
      ),
      U(
        'maximalismo web color capas',
        '3. Sitio web maximalista',
        'El maximalismo utiliza más estímulos de forma intencional: tipografías grandes, colores fuertes, formas, capas, imágenes, gradientes y composiciones densas. La clave no es “poner de todo”, sino construir una jerarquía clara dentro de una interfaz visualmente abundante.',
        `.maximal {\n  position: relative;\n  overflow: hidden;\n  padding: 28px;\n  border-radius: 24px;\n  color: white;\n  background:\n    radial-gradient(circle at 85% 15%, #ff2bd6 0 12%, transparent 13%),\n    radial-gradient(circle at 12% 85%, #d7ff27 0 18%, transparent 19%),\n    linear-gradient(135deg, #2716d8, #7c21ff 48%, #ff5c00);\n}\n\n.maximal h2 {\n  max-width: 8ch;\n  margin: 12px 0;\n  font-size: clamp(2.5rem, 8vw, 6rem);\n  line-height: .82;\n  text-transform: uppercase;\n  text-shadow: 5px 5px 0 rgba(0,0,0,.35);\n}\n\n.maximal .decoracion {\n  position: absolute;\n  right: -30px;\n  bottom: -45px;\n  width: 150px;\n  aspect-ratio: 1;\n  border: 14px solid #ffe600;\n  border-radius: 50%;\n  transform: rotate(18deg);\n}`,
        panel('<div style="position:relative;overflow:hidden;padding:24px;border-radius:22px;background:linear-gradient(135deg,#2716d8,#7c21ff 50%,#ff5c00);color:white"><div style="position:absolute;right:-25px;top:-25px;width:100px;height:100px;border-radius:50%;background:#d7ff27"></div><strong style="position:relative;background:#111;padding:6px 10px">TENDENCIA</strong><div style="position:relative;font-size:44px;line-height:.86;font-weight:1000;text-transform:uppercase;margin:20px 0 12px;text-shadow:4px 4px 0 #111">Más color.<br>Más energía.</div><span style="position:relative">Muchos elementos, una jerarquía.</span></div>'),
        'Si todo grita al mismo volumen, nada destaca. Define un elemento principal y deja que el resto lo acompañe.',
        {guide:[['Modificar','ui-ux/estilos/styles.css','Combina gradientes, capas y tipografía de alto impacto.']],filesToCreate:[file('ui-ux/estilos/styles.css','Tema maximalista.')]}
      ),
      U(
        'minimalismo espacio blanco web',
        '4. Sitio web minimalista',
        'El minimalismo reduce elementos y aumenta el espacio disponible para que contenido, tipografía y acciones respiren. Usa una paleta limitada, alineaciones consistentes y pocos componentes simultáneos. Minimalista no significa vacío: significa que cada elemento debe justificar su presencia.',
        `.minimal {\n  max-width: 720px;\n  padding: clamp(28px, 6vw, 72px);\n  border: 1px solid #e5e7eb;\n  border-radius: 20px;\n  background: #fff;\n  color: #111827;\n}\n\n.minimal .etiqueta {\n  color: #64748b;\n  font-size: .82rem;\n  letter-spacing: .16em;\n  text-transform: uppercase;\n}\n\n.minimal h2 {\n  margin: 18px 0;\n  font-size: clamp(2.2rem, 6vw, 4.8rem);\n  font-weight: 600;\n  letter-spacing: -.04em;\n}\n\n.minimal a {\n  display: inline-block;\n  margin-top: 24px;\n  color: inherit;\n  text-underline-offset: 5px;\n}`,
        panel('<div style="padding:42px;border-radius:18px;background:#fff;color:#111827;border:1px solid #e5e7eb"><small style="letter-spacing:.18em;color:#64748b">DISEÑO WEB</small><div style="font-size:42px;line-height:1;font-weight:650;letter-spacing:-.04em;margin:18px 0">Menos ruido.<br>Más claridad.</div><p style="max-width:44ch;color:#64748b">Espacio amplio, paleta limitada y una jerarquía simple.</p></div>','#f8fafc'),
        'Eliminar elementos solo funciona si conservas información, contexto y acciones necesarias.',
        {guide:[['Modificar','ui-ux/estilos/styles.css','Practica espacio, ancho de lectura y paleta reducida.']],filesToCreate:[file('ui-ux/estilos/styles.css','Tema minimalista.')]}
      ),
      U(
        'glassmorphism blur transparencia',
        '5. Glassmorphism · efecto de vidrio',
        'Glassmorphism usa capas semitransparentes sobre un fondo visible. backdrop-filter crea el desenfoque, mientras un borde claro y una sombra suave separan la tarjeta del fondo. Para que funcione bien necesitas contraste suficiente y un fallback razonable si el navegador o dispositivo no aplica el blur.',
        `.fondo-glass {\n  min-height: 420px;\n  display: grid;\n  place-items: center;\n  padding: 28px;\n  background:\n    radial-gradient(circle at 15% 20%, #9aff73, transparent 30%),\n    radial-gradient(circle at 85% 70%, #5b5cff, transparent 32%),\n    #08120d;\n}\n\n.glass {\n  width: min(420px, 92%);\n  padding: 28px;\n  border: 1px solid rgba(255,255,255,.24);\n  border-radius: 24px;\n  background: rgba(10, 20, 16, .54);\n  -webkit-backdrop-filter: blur(18px);\n  backdrop-filter: blur(18px);\n  box-shadow: 0 24px 60px rgba(0,0,0,.35);\n  color: white;\n}\n\n@supports not (backdrop-filter: blur(1px)) {\n  .glass { background: rgba(10,20,16,.94); }\n}`,
        panel('<div style="padding:28px;border-radius:22px;background:radial-gradient(circle at 20% 20%,#8dff66,transparent 32%),radial-gradient(circle at 80% 80%,#6366f1,transparent 35%),#07110c"><div style="padding:26px;border-radius:20px;background:rgba(10,20,16,.55);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.25);box-shadow:0 20px 50px rgba(0,0,0,.35)"><strong style="font-size:28px">Panel de vidrio</strong><p style="margin-bottom:0;color:#d1fae5">Transparencia + blur + borde + profundidad.</p></div></div>'),
        'No uses texto gris claro sobre vidrio claro. Revisa siempre el contraste sobre el fondo real.',
        {guide:[['Modificar','ui-ux/estilos/styles.css','Combina un fondo visible con una capa translúcida.']],filesToCreate:[file('ui-ux/estilos/styles.css','Tema glassmorphism con fallback.')]}
      ),
      U(
        'comparar estilos misma tarjeta',
        '6. Comparar el mismo componente en cuatro estilos',
        'Una buena práctica es mantener exactamente el mismo contenido y cambiar solamente el tema visual. Esto permite comprobar si el estilo mejora o empeora jerarquía, legibilidad y foco. Puedes usar clases en body para alternar los temas.',
        `<button data-theme="brutal">Brutal</button>\n<button data-theme="maximal">Maximal</button>\n<button data-theme="minimal">Minimal</button>\n<button data-theme="glass">Glass</button>\n\n<article id="demo" class="tarjeta minimal">...</article>\n\n<script>\nconst demo = document.querySelector("#demo");\n\ndocument.querySelectorAll("[data-theme]")\n  .forEach(function(button) {\n    button.addEventListener("click", function() {\n      demo.className = "tarjeta " + button.dataset.theme;\n    });\n  });\n<\/script>`,
        panel('<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px"><div style="padding:14px;border:3px solid #fff;background:#d9ff00;color:#111;font-weight:900">BRUTAL</div><div style="padding:14px;background:linear-gradient(135deg,#7c21ff,#ff5c00);font-weight:900">MAXIMAL</div><div style="padding:14px;background:white;color:#111;border-radius:12px">Minimal</div><div style="padding:14px;background:rgba(255,255,255,.12);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.25);border-radius:12px">Glass</div></div>'),
        'Cambiar el estilo no debería obligarte a reescribir la estructura semántica de la página.',
        {guide:[['Crear','ui-ux/estilos/app.js','Alterna clases de tema con data-theme.']],filesToCreate:[file('ui-ux/estilos/app.js','Selector interactivo de temas.')]}
      ),
      U(
        'actividad estilos web proyecto',
        '7. Actividad progresiva · una landing, cuatro estilos',
        'Construye primero una landing semántica sin estilos. Después crea cuatro hojas visuales sobre la misma estructura. Finalmente agrega un selector con JavaScript para cambiar el tema en vivo. El objetivo es comprobar que HTML, CSS y JavaScript tienen responsabilidades diferentes.',
        `proyecto-estilos/\n├── index.html\n├── styles.css\n└── app.js\n\nETAPA 1 · HTML\nheader + main + article + button\n\nETAPA 2 · CSS\n.brutal / .maximal / .minimal / .glass\n\nETAPA 3 · JavaScript\ndata-theme + className/classList\n\nRETO\nGuarda el tema elegido en localStorage.`,
        panel('<div style="display:grid;gap:10px"><strong>Entrega 1 · HTML</strong><div>La página se entiende sin estilos.</div><strong>Entrega 2 · CSS</strong><div>La misma página tiene cuatro identidades.</div><strong>Entrega 3 · JavaScript</strong><div>El usuario cambia el tema sin recargar.</div></div>'),
        'Evalúa la actividad por claridad y coherencia, no por cuál estilo “se ve más bonito”.',
        {guide:[['Crear','ui-ux/proyecto-estilos/','Trabaja el mismo proyecto en tres etapas.']],filesToCreate:[file('ui-ux/proyecto-estilos/index.html','Estructura semántica.'),file('ui-ux/proyecto-estilos/styles.css','Cuatro estilos.'),file('ui-ux/proyecto-estilos/app.js','Cambio de tema.')]}
      )
    ]
  });

  sections.push({
    title:'UI/UX · Dashboards, loaders y microinteracciones',
    navLabel:'Dashboards y loaders',
    description:'Patrones visuales inspirados en interfaces de paneles, estados de carga y herramientas administrativas: tarjetas KPI, rejillas de datos, skeletons, spinners, animaciones controladas y paneles que representan endpoints de una API REST.',
    quote:'“Una interfaz también debe explicar qué está pasando mientras los datos todavía no llegan.”',
    challenge:'Crea un dashboard que muestre tres métricas, un estado de carga y una lista de endpoints GET/POST/PUT/DELETE. Haz que se adapte a móvil.',
    items:[
      U(
        'dashboard kpi grid data ui',
        '1. Dashboard de datos · tarjetas KPI y rejilla',
        'Los dashboards suelen repetir bloques de información: métricas, gráficos, tablas y filtros. CSS Grid permite construir una composición flexible, mientras cada KPI debe tener etiqueta, valor y contexto. Evita depender únicamente del color para comunicar estados.',
        `.dashboard {\n  display: grid;\n  grid-template-columns: repeat(12, 1fr);\n  gap: 16px;\n}\n\n.kpi {\n  grid-column: span 3;\n  padding: 18px;\n  border: 1px solid #e2e8f0;\n  border-radius: 16px;\n  background: white;\n}\n\n.grafico {\n  grid-column: span 8;\n  min-height: 260px;\n  padding: 20px;\n  border-radius: 16px;\n  background: #fff;\n}\n\n@media (max-width: 760px) {\n  .kpi, .grafico { grid-column: 1 / -1; }\n}`,
        panel('<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px"><div style="padding:14px;background:white;color:#111827;border-radius:12px"><small>Usuarios</small><strong style="display:block;font-size:26px">1,284</strong></div><div style="padding:14px;background:white;color:#111827;border-radius:12px"><small>Ventas</small><strong style="display:block;font-size:26px">$8.4M</strong></div><div style="padding:14px;background:white;color:#111827;border-radius:12px"><small>Conversión</small><strong style="display:block;font-size:26px">6.8%</strong></div></div><div style="height:110px;margin-top:10px;border-radius:12px;background:linear-gradient(180deg,#312e81,#111827);display:flex;align-items:flex-end;gap:8px;padding:14px"><i style="height:30%;flex:1;background:#818cf8"></i><i style="height:55%;flex:1;background:#818cf8"></i><i style="height:42%;flex:1;background:#818cf8"></i><i style="height:80%;flex:1;background:#818cf8"></i><i style="height:66%;flex:1;background:#818cf8"></i></div>'),
        'Un dashboard no es una colección de tarjetas bonitas: cada bloque debe responder una pregunta concreta.',
        {guide:[['Crear','ui-ux/dashboard/index.html','Estructura KPI, gráfico y tabla.'],['Crear','ui-ux/dashboard/styles.css','Grid responsive.']],filesToCreate:[file('ui-ux/dashboard/index.html','Estructura del panel.'),file('ui-ux/dashboard/styles.css','Layout del dashboard.')]}
      ),
      U(
        'loading spinner skeleton estado',
        '2. Estados de carga · spinner, skeleton y mensaje',
        'Cuando una consulta tarda, el usuario necesita saber que la interfaz sigue trabajando. Un spinner sirve para esperas cortas e indeterminadas; un skeleton funciona bien cuando conoces la forma del contenido; un mensaje aporta contexto cuando la operación puede tardar más.',
        `.spinner {\n  width: 34px;\n  height: 34px;\n  border: 4px solid #cbd5e1;\n  border-top-color: #4f46e5;\n  border-radius: 50%;\n  animation: girar .8s linear infinite;\n}\n\n.skeleton {\n  height: 18px;\n  border-radius: 8px;\n  background: linear-gradient(90deg,#e2e8f0 25%,#f8fafc 40%,#e2e8f0 65%);\n  background-size: 300% 100%;\n  animation: brillo 1.2s infinite;\n}\n\n@keyframes girar { to { transform: rotate(360deg); } }\n@keyframes brillo { to { background-position: -100% 0; } }\n\n@media (prefers-reduced-motion: reduce) {\n  .spinner, .skeleton { animation: none; }\n}`,
        panel('<div style="display:flex;gap:18px;align-items:center"><div style="width:34px;height:34px;border:4px solid #475569;border-top-color:#818cf8;border-radius:50%"></div><div style="flex:1;display:grid;gap:9px"><div style="height:14px;border-radius:8px;background:#334155"></div><div style="height:14px;width:70%;border-radius:8px;background:#334155"></div></div></div><p style="margin-bottom:0;color:#94a3b8">Cargando información…</p>'),
        'No animes indefinidamente si la petición ya falló: loading, success, empty y error son estados diferentes.',
        {guide:[['Crear','ui-ux/loading/styles.css','Spinner y skeleton.'],['Crear','ui-ux/loading/app.js','Cambia entre loading, success y error.']],filesToCreate:[file('ui-ux/loading/index.html','Contenedores de estado.'),file('ui-ux/loading/styles.css','Animaciones.'),file('ui-ux/loading/app.js','Control de estados.')]}
      ),
      U(
        'microinteraccion boton hover feedback',
        '3. Microinteracciones · feedback sin distraer',
        'Una microinteracción confirma una acción: un botón se comprime, una tarjeta cambia ligeramente o un icono responde. Deben ser cortas y funcionales. transform y opacity suelen producir animaciones más fluidas que modificar continuamente propiedades de layout.',
        `.accion {\n  transition: transform .16s ease, box-shadow .16s ease;\n}\n.accion:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 10px 24px rgba(15,23,42,.16);\n}\n.accion:active {\n  transform: scale(.97);\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .accion { transition: none; }\n}`,
        panel('<button style="min-height:44px;padding:0 18px;border:0;border-radius:12px;background:#4f46e5;color:white;font-weight:800;box-shadow:0 10px 24px rgba(79,70,229,.25)">Guardar cambios</button><span style="margin-left:12px;color:#94a3b8">Feedback breve y claro</span>'),
        'La animación debe confirmar una acción o guiar la atención; si compite con el contenido, sobra.',
        {guide:[['Modificar','ui-ux/loading/styles.css','Añade estados hover, active y reduced-motion.']],filesToCreate:[file('ui-ux/loading/styles.css','Microinteracciones de controles.')]}
      ),
      U(
        'api rest dashboard endpoints roles productos',
        '4. Panel visual para una API REST · endpoints y permisos',
        'Un panel administrativo puede representar recursos del backend como usuarios, roles, permisos, productos o categorías. Visualmente conviene distinguir el método HTTP con texto y color, pero mantener siempre visible la palabra GET, POST, PUT/PATCH o DELETE. Así el color refuerza el significado sin ser la única señal.',
        `<section class="endpoint">\n  <span class="metodo get">GET</span>\n  <code>/api/productos</code>\n  <span>Listar productos</span>\n</section>\n\n<section class="endpoint">\n  <span class="metodo post">POST</span>\n  <code>/api/productos</code>\n  <span>Crear producto</span>\n</section>\n\n<style>\n.endpoint {\n  display: grid;\n  grid-template-columns: 72px minmax(180px,1fr) 1fr;\n  gap: 12px;\n  align-items: center;\n  padding: 12px;\n  border-bottom: 1px solid #e2e8f0;\n}\n.metodo { font-weight: 900; }\n.get { color: #047857; }\n.post { color: #1d4ed8; }\n.put { color: #b45309; }\n.delete { color: #b91c1c; }\n</style>`,
        panel('<div style="display:grid;gap:8px"><div style="display:grid;grid-template-columns:62px 1fr;gap:10px;padding:10px;border-radius:10px;background:#0f172a"><strong style="color:#34d399">GET</strong><code>/api/productos</code></div><div style="display:grid;grid-template-columns:62px 1fr;gap:10px;padding:10px;border-radius:10px;background:#0f172a"><strong style="color:#60a5fa">POST</strong><code>/api/productos</code></div><div style="display:grid;grid-template-columns:62px 1fr;gap:10px;padding:10px;border-radius:10px;background:#0f172a"><strong style="color:#fbbf24">PUT</strong><code>/api/productos/7</code></div><div style="display:grid;grid-template-columns:62px 1fr;gap:10px;padding:10px;border-radius:10px;background:#0f172a"><strong style="color:#f87171">DELETE</strong><code>/api/productos/7</code></div></div>'),
        'El frontend representa el contrato de la API; las reglas reales de permisos siguen perteneciendo al backend.',
        {guide:[['Crear','ui-ux/api-panel/index.html','Lista visual de endpoints y permisos.']],filesToCreate:[file('ui-ux/api-panel/index.html','Panel estático de documentación/administración.'),file('ui-ux/api-panel/styles.css','Estilos por método HTTP.')]}
      ),
      U(
        'actividad dashboard loading api',
        '5. Mini proyecto · dashboard con carga y API',
        'Une los patrones de esta sección: primero construye el dashboard estático, después añade un skeleton y finalmente conecta una API pública. Mientras fetch() espera muestras loading; si llega un array vacío muestras empty; si response.ok es false muestras error; y si todo funciona pintas success.',
        `estado = "loading"\n       ↓\nfetch()\n  ├── error HTTP → "error"\n  ├── [] vacío   → "empty"\n  └── datos      → "success"\n\nArchivos:\ndashboard-api/\n├── index.html\n├── styles.css\n└── app.js\n\nReto:\nAgrega un selector para cambiar entre\nminimalismo y glassmorphism.`,
        panel('<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center"><div style="padding:12px;border-radius:10px;background:#334155">loading</div><div style="padding:12px;border-radius:10px;background:#7f1d1d">error</div><div style="padding:12px;border-radius:10px;background:#374151">empty</div><div style="padding:12px;border-radius:10px;background:#14532d">success</div></div>'),
        'Este proyecto conecta UI/UX con lo que ya viste en Fetch API y JSON.',
        {guide:[['Crear','ui-ux/dashboard-api/','Integra HTML, CSS, DOM, Fetch y JSON.']],filesToCreate:[file('ui-ux/dashboard-api/index.html','Dashboard.'),file('ui-ux/dashboard-api/styles.css','Layout, temas y loaders.'),file('ui-ux/dashboard-api/app.js','Fetch y estados de interfaz.')]}
      )
    ]
  });
})();
