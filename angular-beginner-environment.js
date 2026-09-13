(()=>{
  if(window.__angularBeginnerEnvironmentAdded)return;
  window.__angularBeginnerEnvironmentAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function'||!window.CourseVisuals)return;
  const V=window.CourseVisuals;
  const A=(topic,name,description,code,preview,tip)=>T(topic,name,description,code,preview,[],{kind:'Angular principiante',tip});
  sections.push({
    title:'Frameworks frontend · Angular · 1A. Entorno y carpetas',
    navLabel:'Angular · 1A. Entorno y carpetas',group:'Frameworks',primaryArea:'Frameworks',areaOrder:210,
    description:'Instalación, Angular CLI, primer proyecto y estructura del workspace.',
    quote:'“Primero entiende qué archivo cumple cada responsabilidad.”',
    challenge:'Crea tienda-angular, ejecútala y explica la función de cada archivo principal.',
    items:[
      A('Instalación','Node.js, npm y Angular CLI','Node.js ejecuta las herramientas; npm instala dependencias; Angular CLI crea, sirve, prueba y compila. Comprueba las versiones antes de empezar. ng version ayuda a detectar incompatibilidades.','node --version\nnpm --version\nnpm install -g @angular/cli\nng version\n\nng new tienda-angular --routing --style=scss --strict\ncd tienda-angular\nng serve --open',V.terminal('node --version\nnpm --version\nng version\n\nng new tienda-angular --routing --style=scss --strict\ncd tienda-angular\nng serve --open\n\nLocal: http://localhost:4200/'),'Ejecuta ng new fuera de otro proyecto y conserva package-lock.json.'),
      A('Carpetas','Estructura inicial','La raíz contiene configuración y dependencias; src contiene el código que llega al navegador. Dentro de app viven el componente raíz, rutas y configuración global. Organiza por funcionalidades cuando crezca. Los nombres pueden variar entre versiones, pero las responsabilidades permanecen.','tienda-angular/\n├── angular.json\n├── package.json\n├── tsconfig.json\n├── public/\n└── src/\n    ├── index.html\n    ├── main.ts\n    ├── styles.scss\n    └── app/\n        ├── app.ts\n        ├── app.html\n        ├── app.config.ts\n        └── app.routes.ts',V.tree('tienda-angular/\n├─ package.json       scripts y dependencias\n├─ angular.json       configuración\n└─ src/\n   ├─ main.ts         arranque\n   ├─ styles.scss     estilos globales\n   └─ app/\n      ├─ app.ts       componente raíz\n      ├─ app.html     plantilla raíz\n      ├─ app.config.ts providers\n      └─ app.routes.ts rutas'),'Si un archivo solo pertenece a productos, colócalo dentro de la feature products.'),
      A('Arranque','Qué ocurre con ng serve','ng serve compila, inicia un servidor local y observa cambios. Cuando guardas, recompila y actualiza el navegador. main.ts inicia la aplicación; app.config.ts registra providers y App es la raíz visual. Esta secuencia explica por qué un error de provider no se arregla cambiando CSS o la plantilla.','index.html\n  ↓ carga bundle\nmain.ts\n  ↓ bootstrapApplication\napp.config.ts + App\n  ↓\nárbol de componentes',V.diagram('ng serve\n  ├─ compila TypeScript y plantillas\n  ├─ inicia servidor local\n  ├─ observa cambios\n  └─ actualiza navegador\n\nmain.ts → bootstrapApplication → App'),'Provoca un error de import intencional, léelo y restaura el archivo.')
    ]
  });
})();
