(()=>{
  if(window.__devToolsCategoryFinalized)return;
  window.__devToolsCategoryFinalized=true;
  if(!Array.isArray(window.sections))return;

  const COURSE='Herramientas';
  const fallback=['HTML','CSS','JavaScript','TypeScript','Git','APIs','Angular','React','Vue','Svelte','Solid.js','Django Framework','FastAPI','Django REST','Frameworks','Base de datos','Backend'];
  const areas=Array.isArray(window.learningPath?.areas)&&window.learningPath.areas.length?[...window.learningPath.areas]:[...fallback];

  if(!areas.includes(COURSE)){
    const ts=areas.indexOf('TypeScript');
    const js=areas.indexOf('JavaScript');
    const insertAt=ts>=0?ts+1:(js>=0?js+1:Math.min(3,areas.length));
    areas.splice(insertAt,0,COURSE);
  }

  sections.forEach(section=>{
    if(section.primaryArea===COURSE||String(section.title||'').startsWith('Herramientas ·')){
      section.group=COURSE;
      section.primaryArea=COURSE;
      section.course=COURSE;
      if(!section.navLabel)section.navLabel=String(section.title||'').replace(/^Herramientas\s*·\s*/,'');
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
    if(aa===COURSE&&bb===COURSE){
      const ao=Number.isFinite(a.areaOrder)?a.areaOrder:1000+original.get(a);
      const bo=Number.isFinite(b.areaOrder)?b.areaOrder:1000+original.get(b);
      return ao-bo;
    }
    return original.get(a)-original.get(b);
  });

  sections.forEach((section,index)=>section.routeOrder=index+1);
  window.learningPath={...(window.learningPath||{}),areas,areaOf:section=>section.primaryArea||section.group||'HTML'};
  window.devToolsCourse=COURSE;
  if(typeof buildNav==='function')buildNav();
  if(typeof render==='function')render();
})();
