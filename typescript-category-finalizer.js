(()=>{
  if(window.__typescriptCategoryFinalized)return;
  window.__typescriptCategoryFinalized=true;
  if(!Array.isArray(window.sections))return;

  // Los ejemplos de configuración de VS Code cargados después usan este placeholder literal.
  if(typeof window.workspaceFolder==='undefined')window.workspaceFolder='${workspaceFolder}';

  const COURSE='TypeScript';
  const fallback=['HTML','CSS','JavaScript','Git','APIs','Angular','React','Vue','Svelte','Solid.js','Django Framework','FastAPI','Django REST','Frameworks','Base de datos','Backend'];
  const areas=Array.isArray(window.learningPath?.areas)&&window.learningPath.areas.length?[...window.learningPath.areas]:fallback;

  if(!areas.includes(COURSE)){
    const pos=areas.indexOf('JavaScript');
    areas.splice(pos>=0?pos+1:0,0,COURSE);
  }

  sections.forEach(section=>{
    if(section.primaryArea===COURSE||String(section.title||'').startsWith('TypeScript ·')){
      section.group=COURSE;
      section.primaryArea=COURSE;
      section.course=COURSE;
      if(!section.navLabel)section.navLabel=String(section.title||'').replace(/^TypeScript\s*·\s*/,'');
    }
  });

  const areaIndex=new Map(areas.map((area,index)=>[area,index]));
  const original=new Map(sections.map((section,index)=>[section,index]));
  sections.sort((a,b)=>{
    const aa=a.primaryArea||a.group||'HTML';
    const bb=b.primaryArea||b.group||'HTML';
    const ai=areaIndex.has(aa)?areaIndex.get(aa):areas.length;
    const bi=areaIndex.has(bb)?areaIndex.get(bb):areas.length;
    if(ai!==bi)return ai-bi;
    if(aa===COURSE&&bb===COURSE)return (a.areaOrder||0)-(b.areaOrder||0);
    return original.get(a)-original.get(b);
  });

  sections.forEach((section,index)=>section.routeOrder=index+1);
  window.learningPath={...(window.learningPath||{}),areas,areaOf:section=>section.primaryArea||section.group||'HTML'};
  if(typeof buildNav==='function')buildNav();
  if(typeof render==='function')render();
})();
