(async()=>{
  try{
    const b=Uint8Array.from(atob(window.__HTML5_BUNDLE||''),c=>c.charCodeAt(0));
    const ds=new DecompressionStream('gzip');
    let html=await new Response(new Blob([b]).stream().pipeThrough(ds)).text();

    // Protege cierres </script> que estén escritos dentro del JavaScript principal
    // del HTML empaquetado, sin tocar el cierre real del script principal.
    const open=html.indexOf('<script>');
    const close=html.lastIndexOf('</script>');
    if(open>=0&&close>open){
      const start=open+8;
      const js=html.slice(start,close).replaceAll('</script>','<\/script>');
      html=html.slice(0,start)+js+html.slice(close);
    }

    // Hojas de estilo externas de la versión actual.
    const styles='<link rel="stylesheet" href="screen-fit.css"><link rel="stylesheet" href="theme-modern.css">';
    html=html.replace('</head>',styles+'</head>');

    // Acceso al ejemplo HTML completo.
    const editor='<button class="ghost-btn" id="editorBtn" type="button">Editor en vivo</button>';
    const example='<a class="ghost-btn" href="ejemplo.html" style="display:inline-flex;align-items:center;justify-content:center;min-height:40px;text-decoration:none;white-space:nowrap" title="Abrir ejemplo completo de HTML5">HTML de ejemplo</a>';
    html=html.replace(editor,example+editor);

    // Ejemplos explicados de atributos. Se inserta antes del cierre real del body.
    const bodyClose=html.lastIndexOf('</body>');
    if(bodyClose>=0){
      const extra='<script src="attribute-examples.js?v=3"></script>';
      html=html.slice(0,bodyClose)+extra+html.slice(bodyClose);
    }

    document.open();
    document.write(html);
    document.close();
  }catch(e){
    document.body.innerHTML='<pre style="padding:24px;font-family:system-ui;color:#ef4444;background:#070b14;min-height:100vh;margin:0">No se pudo cargar la biblioteca HTML. Recarga la página.</pre>';
    console.error(e);
  }
})();
