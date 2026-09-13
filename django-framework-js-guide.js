(()=>{
  if(window.__djangoFrameworkJsGuideAdded)return;
  window.__djangoFrameworkJsGuideAdded=true;
  if(!Array.isArray(window.sections))return;

  const normalize=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const appOf=text=>{
    if(/producto|catalogo|catálogo|inventario|tienda/.test(text))return 'productos';
    if(/usuario|perfil|login|registro/.test(text))return 'usuarios';
    if(/blog|post|articulo|artículo/.test(text))return 'blog';
    return 'inicio';
  };

  sections.filter(section=>(section.primaryArea||section.group)==='Django Framework').forEach(section=>{
    section.items?.forEach(item=>{
      const code=String(item.code||'');
      const text=normalize(`${section.title||''} ${item.topic||item.tag||''} ${item.name||''} ${item.description||''} ${code}`);
      const usesJs=/querySelector|querySelectorAll|addEventListener|dataset\.|localStorage|JSON\.parse|JSON\.stringify|fetch\(|async function|textContent|\.hidden\s*=|data-[\w-]+|static ["'][^"']+\/js\//.test(code);
      if(!usesJs)return;

      const app=appOf(text);
      const jsPath=`${app}/static/${app}/js/main.js`;
      item.guide=Array.isArray(item.guide)?item.guide:[];
      item.filesToCreate=Array.isArray(item.filesToCreate)?item.filesToCreate:[];

      if(!item.guide.some(entry=>Array.isArray(entry)&&entry[1]===jsPath)){
        item.guide.push(['Crear',jsPath,'Coloca aquí el comportamiento JavaScript de esta app. El archivo se carga desde el template mediante {% static %} y se ejecuta en el navegador.']);
      }
      if(!item.filesToCreate.some(file=>file?.path===jsPath)){
        item.filesToCreate.push({
          path:jsPath,
          method:'MANUAL',
          detail:'Crea el archivo JavaScript dentro del namespace static de la app y enlázalo con defer desde base.html.'
        });
      }

      if(/json_script/.test(code)&&!item.guide.some(entry=>Array.isArray(entry)&&String(entry[1]).includes('/templates/'))){
        item.guide.push(['Modificar',`${app}/templates/${app}/index.html`,'Inserta aquí json_script para serializar datos de Django y que main.js pueda leerlos de forma segura.']);
      }
      if(/JsonResponse/.test(code)&&!item.guide.some(entry=>Array.isArray(entry)&&entry[1]===`${app}/views.py`)){
        item.guide.push(['Modificar',`${app}/views.py`,'La view Django normal puede devolver JsonResponse cuando una interacción JavaScript necesita datos puntuales sin crear una API DRF completa.']);
      }

      item.guideTitle='Dónde se hace cada modificación';
      item.filesToCreateTitle='Archivos que se crean en esta lección';
      item.filesToCreateStatus=item.filesToCreate.length?'Estos archivos se crean o aparecen durante esta lección.':'No debes crear archivos nuevos en esta lección.';
      item.codeLabel='Código Django Framework';
    });
  });

  if(typeof render==='function')render();
})();
