(()=>{
  if(window.__angularCategoryFinalized)return;
  window.__angularCategoryFinalized=true;
  if(!Array.isArray(window.sections))return;

  const angularCourse=window.AngularCourse;
  const known=new Set(Array.isArray(angularCourse?.sections)?angularCourse.sections:[]);
  const missed=sections.filter(section=>/\bAngular\b/i.test(String(section?.title||''))&&!known.has(section));

  missed.forEach((section,index)=>{
    section.group='Angular';
    section.primaryArea='Angular';
    section.course='Angular';
    section.areaOrder=Number.isFinite(section.areaOrder)?section.areaOrder:900+index;

    if(section.title.startsWith('Proyectos con frameworks · Angular')){
      const projectName=section.title.split(' · ').at(-1);
      section.navLabel=`Proyecto · ${projectName}`;
    }else if(!section.navLabel){
      section.navLabel=section.title.replace(/^Frameworks frontend · Angular\s*·?\s*/i,'')||'Angular';
    }

    if(!String(section.description||'').includes('Convención de archivos:')){
      section.description=`${section.description||''} Convención de archivos: la ruta muestra la ubicación exacta para cada bloque; los nombres modernos del CLI pueden omitir el sufijo .component.`.trim();
    }

    section.items?.forEach(item=>{
      const inferred=typeof angularCourse?.fileGuideFor==='function'
        ? angularCourse.fileGuideFor(section,item)
        : [['Modificar','src/app/','Ubica el código dentro de la funcionalidad Angular correspondiente y conserva separadas clase, plantilla y estilos.']];
      const current=Array.isArray(item.guide)?item.guide:[];
      const keys=new Set(current.map(entry=>`${entry?.[0]}|${entry?.[1]}`));
      inferred.forEach(entry=>{
        const key=`${entry?.[0]}|${entry?.[1]}`;
        if(!keys.has(key)){keys.add(key);current.push(entry);}
      });
      item.guide=current;
      item.guideTitle='Dónde se hace cada modificación';
      item.codeLabel='Código Angular';
      if(item.kind==='Framework frontend'||item.kind==='Proyecto con frameworks')item.kind='Angular';
    });

    angularCourse?.sections?.push(section);
  });
})();
