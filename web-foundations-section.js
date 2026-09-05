(()=>{
  if(window.__webFoundationsAdded)return;
  window.__webFoundationsAdded=true;

  const concept=(name,description,code,preview,tip)=>T(
    'Concepto',name,description,code,preview,[],{kind:'Fundamento web',flags:['semantic'],tip}
  );
  sections.push({
    title:'Fundamentos web',
    description:'Principios para planear, organizar, construir y mantener productos web de calidad.',
    quote:'“Una buena solución web empieza antes de escribir código.”',
    challenge:'Aplica estos fundamentos al análisis y estructura de un sitio web.',
    items:[
      concept(
        'Ingeniería web',
        'Disciplina que aplica procesos sistemáticos al análisis, diseño, construcción, prueba, publicación y mantenimiento de aplicaciones web.',
        '<ol>\n  <li>Analizar necesidades y usuarios</li>\n  <li>Definir requisitos y alcance</li>\n  <li>Diseñar arquitectura e interfaz</li>\n  <li>Implementar y probar</li>\n  <li>Publicar, medir y mantener</li>\n</ol>',
        '<div style="font-family:system-ui"><h3>Ciclo de ingeniería web</h3><ol><li>Análisis</li><li>Diseño</li><li>Desarrollo</li><li>Pruebas</li><li>Mantenimiento</li></ol></div>',
        'La ingeniería web considera también seguridad, accesibilidad, rendimiento, calidad y evolución del producto.'
      ),
      concept(
        'Arquitectura de la información',
        'Organiza y relaciona el contenido para que las personas puedan encontrarlo, comprenderlo y recorrerlo fácilmente.',
        '<header>\n  <a href="/">Inicio</a>\n  <nav aria-label="Principal">\n    <a href="/cursos">Cursos</a>\n    <a href="/recursos">Recursos</a>\n    <a href="/contacto">Contacto</a>\n  </nav>\n</header>\n<main>\n  <h1>Cursos</h1>\n  <nav aria-label="Migas de pan">Inicio / Cursos</nav>\n</main>',
        '<div style="font-family:system-ui"><strong>Inicio</strong><p>↳ Cursos<br>　↳ HTML<br>　↳ CSS<br>↳ Recursos<br>↳ Contacto</p></div>',
        'Una arquitectura clara utiliza categorías comprensibles, navegación consistente y rutas predecibles.'
      ),
      concept(
        'Fundamentos de la arquitectura de la información',
        'Se apoya en cuatro sistemas principales: organización, etiquetado, navegación y búsqueda.',
        '<section aria-labelledby="recursos">\n  <h2 id="recursos">Recursos de aprendizaje</h2>\n  <form role="search">\n    <label for="buscar-recurso">Buscar recursos</label>\n    <input id="buscar-recurso" type="search">\n    <button>Buscar</button>\n  </form>\n  <nav aria-label="Categorías">\n    <a href="#html">HTML</a>\n    <a href="#css">CSS</a>\n    <a href="#js">JavaScript</a>\n  </nav>\n</section>',
        '<div style="font-family:system-ui"><h3>Encontrar contenido</h3><input aria-label="Buscar" placeholder="Buscar recursos…" style="padding:8px;width:70%"><button style="padding:8px">Buscar</button><p>HTML　CSS　JavaScript</p></div>',
        'Las etiquetas deben usar el lenguaje de los usuarios y las pruebas de navegación deben confirmar que la estructura resulta comprensible.'
      ),
      concept(
        'Desarrollo web',
        'Proceso de crear sitios y aplicaciones mediante tecnologías de frontend, backend, bases de datos, servicios y herramientas de despliegue.',
        '<!-- Frontend: interfaz en el navegador -->\n<form id="registro">\n  <input name="correo" type="email" required>\n  <button>Registrar</button>\n</form>\n\n<script>\n  // JavaScript conecta la interfaz con el backend.\n  const respuesta = await fetch("/api/usuarios", {\n    method: "POST",\n    body: new FormData(registro)\n  });\n<\/script>',
        '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;font-family:system-ui;text-align:center"><div style="padding:15px;background:#dbeafe;border-radius:8px"><strong>Frontend</strong><br>Interfaz</div><div style="padding:15px;background:#dcfce7;border-radius:8px"><strong>Backend</strong><br>Lógica</div><div style="padding:15px;background:#fef3c7;border-radius:8px"><strong>Datos</strong><br>Información</div></div>',
        'Frontend, backend y datos se complementan; las necesidades del proyecto determinan qué tecnologías son necesarias.'
      ),
      concept(
        'Patrones de diseño',
        'Son soluciones reutilizables para problemas frecuentes de organización, comunicación y creación de componentes dentro del software.',
        '// Patrón Observer: varios elementos reaccionan a un cambio.\nclass Estado {\n  observadores = new Set();\n\n  suscribir(funcion) {\n    this.observadores.add(funcion);\n  }\n\n  notificar(valor) {\n    this.observadores.forEach(funcion => funcion(valor));\n  }\n}\n\nconst tema = new Estado();\ntema.suscribir(valor => console.log(`Tema: ${valor}`));\ntema.notificar("oscuro");',
        '<div style="display:flex;align-items:center;justify-content:center;gap:8px;font-family:system-ui;text-align:center"><div style="padding:14px;border-radius:9px;background:#dbeafe"><strong>Modelo</strong><br><small>Datos</small></div><span>→</span><div style="padding:14px;border-radius:9px;background:#dcfce7"><strong>Controlador</strong><br><small>Lógica</small></div><span>→</span><div style="padding:14px;border-radius:9px;background:#fef3c7"><strong>Vista</strong><br><small>Interfaz</small></div></div>',
        'En desarrollo web son comunes MVC, componentes, módulos, Observer, Factory y separación por capas. Utiliza un patrón cuando simplifique un problema real.'
      )
    ]
  });

  buildNav();
  render();
})();
