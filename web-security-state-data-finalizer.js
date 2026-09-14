(()=>{
  if(window.__webSecurityStateDataFinalized)return;
  window.__webSecurityStateDataFinalized=true;
  if(!Array.isArray(window.sections))return;

  const titles=new Set([
    'React · Gestión de estado · Redux, Zustand y Jotai',
    'React · Consumo de APIs · TanStack Query, Axios y Fetch'
  ]);

  sections.filter(section=>titles.has(section.title)).forEach(section=>{
    section.group='React';
    section.primaryArea='React';
    section.course='React';
    section.items?.forEach(item=>{
      const files=[];
      (item.guide||[]).forEach(([action,path,detail])=>{
        if(!/crear/i.test(String(action||'')))return;
        if(!path||/Terminal|DevTools|Navegador/i.test(path))return;
        if(files.some(file=>file.path===path))return;
        files.push({path,method:'MANUAL',detail:detail||'Archivo creado para esta práctica.'});
      });
      if(files.length)item.filesToCreate=files;
      item.filesToCreateTitle='Archivos que se crean en esta lección';
      item.filesToCreateStatus=files.length?'Crea estos archivos antes de continuar con el ejemplo.':'No debes crear archivos nuevos en esta lección; modifica o revisa los indicados abajo.';
      item.guideTitle='Dónde se hace cada modificación';
      item.codeLabel=item.codeLabel||'Código React';
    });
  });
})();
