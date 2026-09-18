(async()=>{
  try{
    const encoded=window.__HTML5_BUNDLE||'';
    if(!encoded) throw new Error('Bundle HTML vacío');

    const b=Uint8Array.from(atob(encoded),c=>c.charCodeAt(0));
    const ds=new DecompressionStream('gzip');
    let html=await new Response(new Blob([b]).stream().pipeThrough(ds)).text();

    const sectionMarker=html.indexOf('const sections');
    const bootMarker='buildNav();saveFavs();resetEditor();render();';
    const bootEnd=html.indexOf(bootMarker,sectionMarker);
    const scriptOpen=html.lastIndexOf('<script',sectionMarker);
    const scriptStart=scriptOpen>=0?html.indexOf('>',scriptOpen)+1:-1;
    const scriptClose=bootEnd>=0?html.indexOf('</script>',bootEnd+bootMarker.length):-1;
    if(scriptStart<=0||scriptClose<=scriptStart)throw new Error('No se pudo localizar el script principal del bundle');

    const mainSource=html.slice(scriptStart,scriptClose);
    const bootOffset=mainSource.indexOf(bootMarker);
    if(bootOffset<0)throw new Error('No se pudo localizar el arranque de la biblioteca');

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

    const styles='<link rel="stylesheet" href="screen-fit.css?v=2"><link rel="stylesheet" href="theme-modern.css?v=6"><link rel="stylesheet" href="course-ui-enhancements.css?v=1&django=1"><link rel="stylesheet" href="primary-area-ui.css?v=4&db=1&ts=1&tools=1">';
    html=html.replace('</head>',styles+'</head>');
    const editor='<button class="ghost-btn" id="editorBtn" type="button">Editor en vivo</button>';
    const example='<a class="ghost-btn" href="ejemplo.html" style="display:inline-flex;align-items:center;justify-content:center;min-height:40px;text-decoration:none;white-space:nowrap" title="Abrir ejemplo completo de HTML5">HTML de ejemplo</a>';
    html=html.replace(editor,example+editor);
    const scripts=[
      'attribute-examples.js?v=6','learning-visuals.js?v=1','web-foundations-section.js?v=2','html-practice-section.js?v=1','html-image-attributes-section.js?v=1','html-input-types-section.js?v=1','html-button-types-section.js?v=1','html-input-attribute-explanations.js?v=1','html-dom-element-properties-section.js?v=1',
      'css-section.js?v=4','css-div-layout-section.js?v=1','css-div-center-screen-enhancer.js?v=1','css-pseudo-classes-section.js?v=1','css-games-section.js?v=10','css-frameworks-section.js?v=4','ui-ux-tools-section.js?v=1','ui-ux-visual-styles-section.js?v=1','course-ux-form-keyboard.js?v=1','course-ux-form-errors.js?v=1','course-ux-form-project.js?v=1',
      'javascript-section.js?v=3','javascript-reduce-some-every-section.js?v=1','javascript-foundations-extra-1.js?v=1','javascript-script-loading-enhancer.js?v=1','javascript-foundations-extra-2.js?v=1','javascript-runtime-review.js?v=1','javascript-functions-detailed.js?v=1','dom-section.js?v=2','dom-selectors-section.js?v=1','javascript-fetch-api-detailed.js?v=3','javascript-publicapis-practice.js?v=3','javascript-json-files-section.js?v=1','javascript-json-database-section.js?v=1','javascript-authenticated-apis-igdb-section.js?v=1','javascript-browser-apis-no-node-section.js?v=1','cheat-sheets-section.js?v=1','api-json-cheat-sheet.js?v=1','api-json-html-js-section.js?v=1','public-api-json-practice.js?v=1','free-apis-section.js?v=1','api-auth-jwt-cookies-sessions.js?v=1','web-security-state-data-section.js?v=1','api-html-css-basic-section.js?v=1','api-documentation-openapi-section.js?v=1','http-status-codes-section.js?v=1',
      'frontend-frameworks-section.js?v=4','angular-from-zero-section.js?v=1&fix=2','angular-overview-section.js?v=1','angular-beginner-environment.js?v=1','course-angular-components.js?v=1','course-angular-bindings.js?v=1','angular-beginner-signals.js?v=1','course-angular-forms.js?v=1',
      'course-angular-exercises-01.js?v=1','course-angular-exercises-02.js?v=1','course-angular-exercises-03.js?v=1',
      'course-angular-intermediate-architecture.js?v=1','course-angular-intermediate-data.js?v=1','course-angular-intermediate-reactivity.js?v=1',
      'course-angular-exercises-04.js?v=1','course-angular-exercises-05.js?v=1','course-angular-exercises-06.js?v=1',
      'course-angular-advanced-architecture.js?v=1','course-angular-advanced-performance.js?v=1','course-angular-advanced-quality.js?v=1',
      'course-angular-exercises-07.js?v=1','course-angular-exercises-08.js?v=1','course-angular-exercises-09.js?v=1','angular-category-guide.js?v=1',
      'course-solid-introduction.js?v=1','course-solid-reactivity.js?v=1','course-solid-exercises-01.js?v=1','course-solid-exercises-02.js?v=1',
      'framework-projects-section.js?v=3','cdn-frameworks-libraries-section.js?v=1','framework-cdn-enhancer.js?v=1','angular-category-finalizer.js?v=1','angular-file-guide-corrections.js?v=4&fix=2','angular-required-files.js?v=1','backend-baas-section.js?v=1','backend-node-orms-section.js?v=1','backend-deployment-platforms-section.js?v=1','course-backend-scaling-basics.js?v=1','course-backend-scaling-architecture.js?v=1','course-backend-scaling-resilience.js?v=1',
      'fastapi-from-zero-section.js?v=1','backend-fastapi-section.js?v=11','django-rest-from-zero-section.js?v=1','backend-django-rest-section.js?v=1',
      'django-framework-from-zero-section.js?v=1','django-framework-html-detailed.js?v=1','django-framework-css-detailed.js?v=1','django-framework-js-detailed.js?v=1','django-framework-forms-detailed.js?v=1','django-framework-project-detailed.js?v=1','django-html-css-section.js?v=1',
      'html-css-section.js?v=1','integration-sections.js?v=1','html-python-section.js?v=1','practice-expansion.js?v=2','git-section.js?v=2','content-corrections.js?v=1',
      'section-order.js?v=7&htmlorder=2','framework-category-guide.js?v=1','web-security-state-data-finalizer.js?v=1','modern-frontend-tools-section.js?v=1','backend-category-guide.js?v=1','django-framework-category-guide.js?v=1','django-framework-js-guide.js?v=1','database-from-zero-section.js?v=1','database-category-guide.js?v=2','typescript-course-section.js?v=1','typescript-category-finalizer.js?v=1','vscode-snippet-placeholders.js?v=1','vscode-tools-section.js?v=1','dev-tools-category-finalizer.js?v=1','dev-tools-exercises.js?v=1','css-property-explanations.js?v=3','example-code-formatter.js?v=2','explanation-enhancer.js?v=10','exact-explanation-enhancer.js?v=2','javascript-order-finalizer.js?v=4&arrays=1','html-order-finalizer.js?v=1&buttons=1','course-ui.js?v=15','file-guide-ui.js?v=2&frameworks=3&db=1&tools=1','personalized-exercises.js?v=2','css-flexbox-card-ui.js?v=4','primary-area-ui.js?v=3&htmlorder=2&tools=1'
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