(async()=>{
  try{
    const encoded=window.__HTML5_BUNDLE||'';
    if(!encoded) throw new Error('Bundle HTML vacío');

    const b=Uint8Array.from(atob(encoded),c=>c.charCodeAt(0));
    const ds=new DecompressionStream('gzip');
    let html=await new Response(new Blob([b]).stream().pipeThrough(ds)).text();

    // Protege cierres </script> escritos dentro de ejemplos del JavaScript principal
    // sin modificar el cierre real del script que inicializa la biblioteca.
    const open=html.indexOf('<script>');
    const close=html.lastIndexOf('</script>');
    if(open>=0&&close>open){
      const start=open+8;
      const js=html.slice(start,close).replaceAll('</script>','<\\/script>');
      html=html.slice(0,start)+js+html.slice(close);
    }

    const styles='<link rel="stylesheet" href="screen-fit.css"><link rel="stylesheet" href="theme-modern.css?v=3">';
    html=html.replace('</head>',styles+'</head>');

    const editor='<button class="ghost-btn" id="editorBtn" type="button">Editor en vivo</button>';
    const example='<a class="ghost-btn" href="ejemplo.html" style="display:inline-flex;align-items:center;justify-content:center;min-height:40px;text-decoration:none;white-space:nowrap" title="Abrir ejemplo completo de HTML5">HTML de ejemplo</a>';
    html=html.replace(editor,example+editor);

    const extraScripts='<scr'+'ipt src="attribute-examples.js?v=6"></scr'+'ipt><scr'+'ipt src="web-foundations-section.js?v=2"></scr'+'ipt><scr'+'ipt src="css-section.js?v=4"></scr'+'ipt><scr'+'ipt src="javascript-section.js?v=2"></scr'+'ipt><scr'+'ipt src="dom-section.js?v=1"></scr'+'ipt><scr'+'ipt src="html-css-section.js?v=1"></scr'+'ipt><scr'+'ipt src="integration-sections.js?v=1"></scr'+'ipt><scr'+'ipt src="git-section.js?v=1"></scr'+'ipt><scr'+'ipt src="css-property-explanations.js?v=1"></scr'+'ipt><scr'+'ipt src="example-code-formatter.js?v=1"></scr'+'ipt><scr'+'ipt src="explanation-enhancer.js?v=3"></scr'+'ipt><scr'+'ipt src="course-ui.js?v=7"></scr'+'ipt>';
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
