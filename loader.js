(async()=>{
  try{
    const encoded=window.__HTML5_BUNDLE||'';
    if(!encoded) throw new Error('Bundle HTML vacío');

    const b=Uint8Array.from(atob(encoded),c=>c.charCodeAt(0));
    const ds=new DecompressionStream('gzip');
    let html=await new Response(new Blob([b]).stream().pipeThrough(ds)).text();

    // El bundle contiene ejemplos con etiquetas <script> dentro de cadenas.
    // Localizamos el script principal mediante marcadores de su código y escapamos
    // únicamente sus cierres internos, preservando el cierre real del elemento.
    const sectionMarker=html.indexOf('const sections');
    const bootMarker='buildNav();saveFavs();resetEditor();render();';
    const bootEnd=html.indexOf(bootMarker,sectionMarker);
    const scriptOpen=html.lastIndexOf('<script',sectionMarker);
    const scriptStart=scriptOpen>=0?html.indexOf('>',scriptOpen)+1:-1;
    const scriptClose=bootEnd>=0?html.indexOf('</script>',bootEnd+bootMarker.length):-1;
    if(scriptStart<=0||scriptClose<=scriptStart){
      throw new Error('No se pudo localizar el script principal del bundle');
    }

    const mainSource=html.slice(scriptStart,scriptClose);
    const bootOffset=mainSource.indexOf(bootMarker);
    if(bootOffset<0)throw new Error('No se pudo localizar el arranque de la biblioteca');

    // `const sections`, T y las funciones base son bindings globales léxicos:
    // otros scripts clásicos pueden leerlos por nombre, pero no aparecen en window.
    // Las rutas externas validan window.sections/window.T antes de ejecutarse, así
    // que publicamos referencias explícitas justo antes del primer render.
    const globalBridge=`
window.sections=sections;
if(typeof T==='function')window.T=T;
if(typeof createCard==='function')window.createCard=createCard;
if(typeof render==='function')window.render=render;
if(typeof buildNav==='function')window.buildNav=buildNav;
if(typeof esc==='function')window.esc=esc;
`;
    const bridgedSource=mainSource.slice(0,bootOffset)+globalBridge+mainSource.slice(bootOffset);
    const mainScript=bridgedSource.replace(/<\/script\s*>/gi,'<\\/script>');
    html=html.slice(0,scriptStart)+mainScript+html.slice(scriptClose);

    const styles='<link rel="stylesheet" href="screen-fit.css?v=2"><link rel="stylesheet" href="theme-modern.css?v=6"><link rel="stylesheet" href="course-ui-enhancements.css?v=1"><link rel="stylesheet" href="primary-area-ui.css?v=4">';
    html=html.replace('</head>',styles+'</head>');
    const editor='<button class="ghost-btn" id="editorBtn" type="button">Editor en vivo</button>';
    const example='<a class="ghost-btn" href="ejemplo.html" style="display:inline-flex;align-items:center;justify-content:center;min-height:40px;text-decoration:none;white-space:nowrap" title="Abrir ejemplo completo de HTML5">HTML de ejemplo</a>';
    html=html.replace(editor,example+editor);
    const scripts=[
      'attribute-examples.js?v=6','learning-visuals.js?v=1','web-foundations-section.js?v=2','html-practice-section.js?v=1',
      'css-section.js?v=4','css-frameworks-section.js?v=4','ui-ux-tools-section.js?v=1','course-ux-form-keyboard.js?v=1','course-ux-form-errors.js?v=1','course-ux-form-project.js?v=1',
      'javascript-section.js?v=3','dom-section.js?v=1','free-apis-section.js?v=1','api-html-css-basic-section.js?v=1',
      'frontend-frameworks-section.js?v=4','angular-from-zero-section.js?v=1','angular-overview-section.js?v=1','angular-beginner-environment.js?v=1','course-angular-components.js?v=1','course-angular-bindings.js?v=1','angular-beginner-signals.js?v=1','course-angular-forms.js?v=1',
      'course-angular-exercises-01.js?v=1','course-angular-exercises-02.js?v=1','course-angular-exercises-03.js?v=1',
      'course-angular-intermediate-architecture.js?v=1','course-angular-intermediate-data.js?v=1','course-angular-intermediate-reactivity.js?v=1',
      'course-angular-exercises-04.js?v=1','course-angular-exercises-05.js?v=1','course-angular-exercises-06.js?v=1',
      'course-angular-advanced-architecture.js?v=1','course-angular-advanced-performance.js?v=1','course-angular-advanced-quality.js?v=1',
      'course-angular-exercises-07.js?v=1','course-angular-exercises-08.js?v=1','course-angular-exercises-09.js?v=1','angular-category-guide.js?v=1',
      'course-solid-introduction.js?v=1','course-solid-reactivity.js?v=1','course-solid-exercises-01.js?v=1','course-solid-exercises-02.js?v=1',
      'framework-projects-section.js?v=3','angular-category-finalizer.js?v=1','angular-file-guide-corrections.js?v=4','angular-required-files.js?v=1','course-backend-scaling-basics.js?v=1','course-backend-scaling-architecture.js?v=1','course-backend-scaling-resilience.js?v=1',
      'backend-fastapi-section.js?v=11','backend-django-rest-section.js?v=1','django-html-css-section.js?v=1','html-css-section.js?v=1','integration-sections.js?v=1','practice-expansion.js?v=2','git-section.js?v=1','content-corrections.js?v=1',
      'section-order.js?v=4','css-property-explanations.js?v=3','example-code-formatter.js?v=1','explanation-enhancer.js?v=9','exact-explanation-enhancer.js?v=1','course-ui.js?v=15','file-guide-ui.js?v=2','primary-area-ui.js?v=2'
    ];
    const extraScripts=scripts.map(src=>'<scr'+'ipt src="'+src+'"></scr'+'ipt>').join('');
    const bodyClose=html.lastIndexOf('</body>');
    html=html.slice(0,bodyClose)+extraScripts+html.slice(bodyClose);
    document.open();
    document.write(html);
    document.close();
  }catch(e){
    document.body.innerHTML='<pre style="padding:24px;font-family:system-ui;color:#ef4444;background:#070b14;min-height:100vh;margin:0">No se pudo cargar la biblioteca HTML. Recarga la página.\n\n'+String(e)+'</pre>';
    console.error(e);
  }
})();
