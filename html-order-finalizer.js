(()=>{
  if(window.__htmlOrderFinalized||!Array.isArray(window.sections))return;
  window.__htmlOrderFinalized=true;

  const normalize=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const topic=section=>normalize(section?.title||'').replace(/^html\s*·\s*/,'').trim();
  const core=[
    'fundamentos web',
    'introduccion',
    'metadatos',
    'texto',
    'semantica html',
    'semantica y secciones',
    'listas',
    'enlaces e imagenes',
    'tablas',
    'formularios',
    'multimedia',
    'interactividad',
    'citas y datos',
    'scripts y plantillas'
  ];
  const coreRank=new Map(core.map((name,index)=>[name,index*100]));
  const sourceIndex=new Map(sections.map((section,index)=>[section,index]));
  const areaOf=section=>section?.primaryArea||section?.group||'HTML';

  const fallbackRank=section=>{
    const title=String(section?.title||'');
    const normalized=topic(section);
    if(coreRank.has(normalized))return coreRank.get(normalized);
    if(title==='HTML · Imágenes · Atributos de img')return coreRank.get('enlaces e imagenes')+50;
    if(title==='HTML · Formularios · Tipos de input')return coreRank.get('formularios')+50;
    if(title==='HTML · Formularios · Tipos de button')return coreRank.get('formularios')+60;
    if(Number.isFinite(section?.learningLessonOrder))return section.learningLessonOrder;
    if(title==='Práctica HTML paso a paso')return 3000;
    if(title==='HTML · Manipulación de DIV')return 3100;
    if(title==='HTML + CSS')return 3200;
    if(title.startsWith('HTML + JavaScript'))return 3300+(sourceIndex.get(section)||0);
    if(title.startsWith('HTML + CSS + JavaScript'))return 3400+(sourceIndex.get(section)||0);
    return 2000+(Number.isFinite(section?.areaOrder)?section.areaOrder:(sourceIndex.get(section)||0));
  };

  const htmlPositions=[];
  const htmlSections=[];
  sections.forEach((section,index)=>{
    if(areaOf(section)==='HTML'){
      htmlPositions.push(index);
      htmlSections.push(section);
    }
  });

  htmlSections.sort((a,b)=>fallbackRank(a)-fallbackRank(b)||(sourceIndex.get(a)||0)-(sourceIndex.get(b)||0));
  htmlPositions.forEach((position,index)=>{sections[position]=htmlSections[index];});

  htmlSections.forEach((section,index)=>{
    section.learningLessonOrder=fallbackRank(section);
    section.routeAreaPosition=index+1;
    section.routeAreaTotal=htmlSections.length;
  });
  sections.forEach((section,index)=>section.routeOrder=index+1);

  if(typeof buildNav==='function')buildNav();
  if(typeof render==='function')render();
})();