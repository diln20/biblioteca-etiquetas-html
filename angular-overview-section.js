(()=>{
  if(window.__angularOverviewAdded)return;
  window.__angularOverviewAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function'||!window.CourseVisuals)return;
  for(let index=sections.length-1;index>=0;index--){
    if(sections[index]?.title==='Frameworks frontend · Angular')sections.splice(index,1);
  }
  const V=window.CourseVisuals;
  const A=(topic,name,description,code,preview,tip)=>T(topic,name,description,code,preview,[],{kind:'Angular',tip});
  sections.push({
    title:'Frameworks frontend · Angular · 0. Cómo funciona',
    navLabel:'Angular · 0. Cómo funciona',
    group:'Frameworks',primaryArea:'Frameworks',areaOrder:200,
    description:'Introducción desde cero: qué resuelve Angular, cómo arranca la aplicación, cómo viajan los datos y cuál es el orden recomendado de aprendizaje.',
    quote:'“Angular se aprende siguiendo el recorrido de los datos, no memorizando decoradores.”',
    challenge:'Dibuja el flujo completo de una aplicación Angular y explica qué responsabilidad pertenece a la plantilla, al componente y al servicio.',
    items:[
      A('Definición','Qué es Angular y cuándo usarlo','Angular es una plataforma frontend basada en TypeScript. Proporciona componentes, plantillas, Router, formularios, cliente HTTP, inyección de dependencias y compilación. Es útil cuando una aplicación tiene varias pantallas, reglas y equipos que necesitan una estructura común. El navegador continúa ejecutando HTML, CSS y JavaScript; Angular organiza cómo se construyen y conectan esas piezas.','Usuario → plantilla → componente → servicio → API\nAPI → servicio → estado → plantilla actualizada',V.diagram('USUARIO\n  │ escribe, hace clic o cambia la URL\n  ▼\nPLANTILLA ANGULAR\n  │ llama métodos y lee estado\n  ▼\nCOMPONENTE TYPESCRIPT\n  │ delega acceso a datos\n  ▼\nSERVICIO / API\n\nLos datos regresan y Angular actualiza la vista dependiente.'),'Pregunta siempre: ¿dónde vive el dato?, ¿quién lo modifica? y ¿qué parte de la vista depende de él?'),
      A('Arranque','Cómo inicia una aplicación','index.html carga el bundle generado. main.ts llama bootstrapApplication con el componente raíz y app.config.ts. La configuración registra providers como Router o HttpClient. El componente raíz inicia el árbol visual. Comprender este recorrido permite localizar errores de configuración y saber dónde habilitar capacidades globales.','/* main.ts */\nbootstrapApplication(App, appConfig)\n  .catch(error => console.error(error));\n\n/* app.config.ts */\nexport const appConfig: ApplicationConfig = {\n  providers: [provideRouter(routes), provideHttpClient()]\n};',V.diagram('index.html\n   │ carga main.ts\n   ▼\nbootstrapApplication(App, appConfig)\n   ├─ crea componente raíz\n   └─ registra providers\n          ▼\n      aplicación lista'),'Cuando aparezca “No provider found”, revisa app.config.ts y los imports del componente.'),
      A('Ruta','Principiante, intermedio y avanzado','La ruta comienza con entorno, componentes y plantillas; continúa con servicios, Router, HTTP y RxJS; y termina con arquitectura, rendimiento, SSR, seguridad, pruebas y CI/CD. Cada nivel contiene ejercicios que reutilizan lo anterior. Avanza cuando puedas modificar el ejemplo y explicar por qué funciona.','PRINCIPIANTE\n  Hola Mundo → bindings → signals → listas → tareas\n\nINTERMEDIO\n  servicios → rutas → forms → HTTP → RxJS → store\n\nAVANZADO\n  auth → lazy → @defer → SSR → pruebas → CI/CD',V.steps(['Leer el objetivo.','Escribir el ejemplo sin copiar.','Cambiar datos y reglas.','Provocar un error y leerlo.','Resolver el ejercicio.','Crear un commit explicativo.']),'Mantén un laboratorio para experimentar y un proyecto final donde solo ingresen soluciones comprendidas.'),
      A('Requisitos','Qué debes saber antes','Necesitas HTML semántico, CSS adaptable, JavaScript moderno, módulos, promesas y fundamentos de TypeScript. No necesitas memorizar TypeScript completo: aprende cada tipo cuando aparezca en un caso real. También debes manejar terminal, npm y Git a nivel básico.','HTML: formularios y semántica\nCSS: Flexbox, Grid y responsive\nJavaScript: funciones, objetos, arreglos, módulos y async\nTypeScript: tipos, interfaces y clases\nHerramientas: terminal, npm, Git y editor',V.box('Prueba de preparación','<ol><li>Crea una página semántica.</li><li>Consume una API con fetch.</li><li>Usa map y filter.</li><li>Exporta e importa un módulo.</li><li>Crea una rama y un commit.</li></ol>','#b91c1c'),'Si un concepto de JavaScript todavía resulta confuso, repásalo y vuelve a la lección Angular relacionada.')
    ]
  });
})();
