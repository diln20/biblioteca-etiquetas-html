(()=>{
  if(window.__htmlCssSectionAdded)return;
  window.__htmlCssSectionAdded=true;

  const example=(html,css)=>`<style>${css}</style>${html}`;
  const item=(name,description,html,css,kind='Componente')=>T(
    'HTML + CSS',
    name,
    description,
    `${html}\n\n<style>\n${css}\n</style>`,
    example(html,css),
    [],
    {kind}
  );

  sections.push({
    title:'HTML + CSS',
    description:'Ejemplos completos que combinan estructura HTML y presentación CSS.',
    quote:'“La estructura y el diseño funcionan mejor cuando se construyen juntos.”',
    challenge:'Crea una página personal con encabezado, presentación, proyectos y formulario de contacto.',
    items:[
      item('Botón moderno','Combina un botón semántico con estados visuales y una transición.',
        '<button class="boton">Guardar cambios</button>',
        '.boton {\n  padding: 12px 20px;\n  border: 0;\n  border-radius: 10px;\n  color: white;\n  background: #2563eb;\n  cursor: pointer;\n  transition: .2s;\n}\n.boton:hover {\n  background: #1d4ed8;\n  transform: translateY(-2px);\n}'),
      item('Tarjeta de contenido','Presenta información dentro de un contenedor con borde, espacio y sombra.',
        '<article class="tarjeta">\n  <span class="etiqueta">HTML + CSS</span>\n  <h2>Diseño web</h2>\n  <p>Una tarjeta agrupa contenido relacionado.</p>\n  <a href="#">Aprender más</a>\n</article>',
        '.tarjeta {\n  max-width: 360px;\n  padding: 22px;\n  border: 1px solid #dbeafe;\n  border-radius: 16px;\n  box-shadow: 0 12px 30px #cbd5e1;\n  font-family: system-ui;\n}\n.tarjeta h2 { margin: 10px 0; }\n.tarjeta p { color: #475569; }\n.tarjeta a { color: #2563eb; font-weight: 700; }\n.etiqueta {\n  padding: 4px 8px;\n  border-radius: 999px;\n  color: #1d4ed8;\n  background: #dbeafe;\n  font-size: 12px;\n}'),
      item('Menú de navegación','Utiliza nav, una lista y Flexbox para construir un menú horizontal.',
        '<nav class="menu" aria-label="Principal">\n  <a class="marca" href="#">Mi sitio</a>\n  <ul>\n    <li><a href="#inicio">Inicio</a></li>\n    <li><a href="#servicios">Servicios</a></li>\n    <li><a href="#contacto">Contacto</a></li>\n  </ul>\n</nav>',
        '.menu {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 20px;\n  padding: 14px 18px;\n  border-radius: 12px;\n  background: #0f172a;\n  font-family: system-ui;\n}\n.menu ul { display: flex; gap: 16px; margin: 0; padding: 0; list-style: none; }\n.menu a { color: #e2e8f0; text-decoration: none; }\n.menu .marca { color: #38bdf8; font-weight: 800; }'),
      item('Sección principal Hero','Crea una presentación destacada con título, texto y llamada a la acción.',
        '<section class="hero-demo">\n  <p class="sobrelinea">Curso práctico</p>\n  <h1>Aprende desarrollo web</h1>\n  <p>Construye páginas modernas con HTML, CSS y JavaScript.</p>\n  <a href="#curso">Comenzar ahora</a>\n</section>',
        '.hero-demo {\n  padding: 42px 28px;\n  border-radius: 18px;\n  color: white;\n  background: linear-gradient(135deg, #0f172a, #1d4ed8);\n  font-family: system-ui;\n}\n.hero-demo h1 { margin: 6px 0; font-size: 34px; }\n.hero-demo p { max-width: 520px; }\n.hero-demo .sobrelinea { color: #7dd3fc; font-weight: 700; }\n.hero-demo a {\n  display: inline-block;\n  margin-top: 10px;\n  padding: 10px 16px;\n  border-radius: 9px;\n  color: #0f172a;\n  background: white;\n  text-decoration: none;\n  font-weight: 700;\n}', 'Sección'),
      item('Formulario de contacto','Organiza controles accesibles y mejora sus estados de enfoque.',
        '<form class="formulario">\n  <label for="nombre-demo">Nombre</label>\n  <input id="nombre-demo" name="nombre" required>\n  <label for="correo-demo">Correo</label>\n  <input id="correo-demo" name="correo" type="email" required>\n  <label for="mensaje-demo">Mensaje</label>\n  <textarea id="mensaje-demo" name="mensaje" rows="3"></textarea>\n  <button>Enviar</button>\n</form>',
        '.formulario {\n  display: grid;\n  gap: 8px;\n  max-width: 420px;\n  font-family: system-ui;\n}\n.formulario input,\n.formulario textarea {\n  padding: 10px 12px;\n  border: 1px solid #94a3b8;\n  border-radius: 8px;\n}\n.formulario input:focus,\n.formulario textarea:focus {\n  outline: 3px solid #bfdbfe;\n  border-color: #2563eb;\n}\n.formulario button {\n  margin-top: 6px;\n  padding: 11px;\n  border: 0;\n  border-radius: 8px;\n  color: white;\n  background: #2563eb;\n}', 'Formulario'),
      item('Tabla estilizada','Presenta datos tabulares con encabezados claros y filas fáciles de leer.',
        '<div class="tabla-wrap">\n  <table class="tabla">\n    <thead><tr><th>Curso</th><th>Nivel</th></tr></thead>\n    <tbody>\n      <tr><td>HTML</td><td>Básico</td></tr>\n      <tr><td>CSS</td><td>Intermedio</td></tr>\n    </tbody>\n  </table>\n</div>',
        '.tabla-wrap { overflow-x: auto; }\n.tabla {\n  width: 100%;\n  border-collapse: collapse;\n  font-family: system-ui;\n}\n.tabla th, .tabla td {\n  padding: 11px 14px;\n  border-bottom: 1px solid #cbd5e1;\n  text-align: left;\n}\n.tabla th { color: white; background: #334155; }\n.tabla tbody tr:nth-child(even) { background: #f1f5f9; }', 'Datos'),
      item('Galería con Grid','Distribuye elementos automáticamente en columnas adaptables.',
        '<section class="galeria">\n  <div>Proyecto 1</div>\n  <div>Proyecto 2</div>\n  <div>Proyecto 3</div>\n  <div>Proyecto 4</div>\n</section>',
        '.galeria {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\n  gap: 12px;\n}\n.galeria div {\n  min-height: 90px;\n  display: grid;\n  place-items: center;\n  border-radius: 12px;\n  color: #164e63;\n  background: #cffafe;\n  font-weight: 700;\n}', 'Diseño'),
      item('Perfil de usuario','Combina una imagen, contenido textual y acciones mediante Flexbox.',
        '<article class="perfil">\n  <div class="avatar" aria-hidden="true">AM</div>\n  <div>\n    <h2>Ana Martínez</h2>\n    <p>Desarrolladora frontend</p>\n  </div>\n  <button>Seguir</button>\n</article>',
        '.perfil {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 18px;\n  border: 1px solid #e2e8f0;\n  border-radius: 14px;\n  font-family: system-ui;\n}\n.avatar {\n  width: 52px; height: 52px;\n  display: grid; place-items: center;\n  border-radius: 50%;\n  color: white; background: #7c3aed;\n  font-weight: 800;\n}\n.perfil h2, .perfil p { margin: 2px 0; }\n.perfil p { color: #64748b; }\n.perfil button { margin-left: auto; padding: 8px 13px; }'),
      item('Alerta informativa','Usa roles semánticos y color para comunicar un mensaje importante.',
        '<div class="alerta" role="status">\n  <strong>Información:</strong> Tus cambios se guardaron correctamente.\n</div>',
        '.alerta {\n  padding: 14px 16px;\n  border: 1px solid #38bdf8;\n  border-left-width: 5px;\n  border-radius: 10px;\n  color: #0c4a6e;\n  background: #e0f2fe;\n  font-family: system-ui;\n}', 'Mensaje'),
      item('Tarjetas de precios','Utiliza Grid para comparar opciones de forma ordenada.',
        '<section class="precios">\n  <article><h3>Básico</h3><strong>$10</strong><p>Para comenzar.</p><button>Elegir</button></article>\n  <article class="destacado"><h3>Pro</h3><strong>$25</strong><p>Para proyectos.</p><button>Elegir</button></article>\n</section>',
        '.precios { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; font-family: system-ui; }\n.precios article { padding: 20px; border: 1px solid #cbd5e1; border-radius: 14px; text-align: center; }\n.precios .destacado { border: 2px solid #2563eb; background: #eff6ff; }\n.precios strong { font-size: 28px; color: #1d4ed8; }\n.precios button { padding: 8px 14px; border: 0; border-radius: 8px; color: white; background: #2563eb; }', 'Diseño'),
      item('Diseño responsive','Adapta una estructura de dos columnas a pantallas pequeñas.',
        '<main class="pagina-demo">\n  <article><h2>Contenido principal</h2><p>Esta zona ocupa más espacio.</p></article>\n  <aside><h3>Relacionado</h3><p>Información complementaria.</p></aside>\n</main>',
        '.pagina-demo {\n  display: grid;\n  grid-template-columns: 2fr 1fr;\n  gap: 16px;\n  font-family: system-ui;\n}\n.pagina-demo article, .pagina-demo aside { padding: 18px; border-radius: 12px; background: #f1f5f9; }\n@media (max-width: 600px) {\n  .pagina-demo { grid-template-columns: 1fr; }\n}', 'Responsive'),
      item('Animación de carga','Combina una estructura sencilla con una animación CSS.',
        '<div class="cargando" role="status" aria-label="Cargando"></div>',
        '.cargando {\n  width: 46px;\n  height: 46px;\n  margin: 20px auto;\n  border: 5px solid #dbeafe;\n  border-top-color: #2563eb;\n  border-radius: 50%;\n  animation: girar .8s linear infinite;\n}\n@keyframes girar {\n  to { transform: rotate(360deg); }\n}', 'Animación')
    ]
  });

  buildNav();
  render();
})();
