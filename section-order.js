(()=>{
  if(window.__sectionOrderApplied||!Array.isArray(window.sections))return;
  window.__sectionOrderApplied=true;

  const areas=['HTML','CSS','JavaScript','Git','APIs','Angular','Frameworks','Backend'];
  const areaIndex=new Map(areas.map((area,index)=>[area,index]));
  const sourceIndex=new Map(sections.map((section,index)=>[section,index]));
  const normalize=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const detail=title=>title.includes(' · ')?title.split(' · ').slice(1).join(' · '):'';
  const number=title=>Number(title.match(/ ·\s*(\d+)/)?.[1]||0);
  const level=title=>({introduccion:10,principiante:20,intermedio:30,avanzado:40,produccion:90})[normalize(detail(title))]??0;
  const htmlInputTypesTitle='HTML · Formularios · Tipos de input';
  const htmlImageAttributesTitle='HTML · Imágenes · Atributos de img';
  const htmlCoreSequence=[
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
  const htmlCoreRank=new Map(htmlCoreSequence.map((title,index)=>[title,index*100]));
  const htmlTopic=title=>normalize(title).replace(/^html\s*·\s*/,'').trim();

  const areaOf=section=>{
    if(section?.primaryArea)return section.primaryArea;
    const title=String(section?.title||'');
    if(title.startsWith('Backend ')||title.startsWith('Django '))return 'Backend';
    if(/(?:^| · )Angular(?: ·|$)/i.test(title))return 'Angular';
    if(title.startsWith('Frameworks frontend')||title.startsWith('Proyectos con frameworks'))return 'Frameworks';
    if(title.startsWith('Git'))return 'Git';
    if(title.startsWith('API')||title.startsWith('Consumo de API')||title.startsWith('Proyecto básico · API'))return 'APIs';
    if(title.startsWith('JavaScript')||title==='Manejo del DOM')return 'JavaScript';
    if(title.startsWith('CSS')||title.startsWith('Frameworks CSS')||/^(UI\/UX|UI y UX|Herramientas UI\/UX)/i.test(title))return 'CSS';
    return 'HTML';
  };

  const htmlFormAnchor=sections.find(section=>{
    const title=String(section?.title||'');
    if(title===htmlInputTypesTitle||areaOf(section)!=='HTML')return false;
    return /(^|[ ·\-])formularios?([ ·\-]|$)/.test(normalize(title));
  });

  const htmlImageTitleAnchor=sections.find(section=>{
    const title=String(section?.title||'');
    if(title===htmlImageAttributesTitle||areaOf(section)!=='HTML')return false;
    return /(^|[ ·\-])imagenes?([ ·\-]|$)/.test(normalize(title));
  });
  const htmlImageItemAnchor=sections.find(section=>{
    const title=String(section?.title||'');
    if(title===htmlImageAttributesTitle||areaOf(section)!=='HTML')return false;
    return Array.isArray(section?.items)&&section.items.some(item=>{
      const tag=normalize(item?.tag||'').replace(/[<>]/g,'').trim();
      return tag==='img';
    });
  });
  const htmlImageAnchor=htmlImageTitleAnchor||htmlImageItemAnchor;

  const htmlOrder=section=>{
    const title=String(section?.title||'');
    const source=sourceIndex.get(section)||0;
    const topic=htmlTopic(title);
    if(htmlCoreRank.has(topic))return htmlCoreRank.get(topic);
    if(title==='Práctica HTML paso a paso')return 3000;
    if(title==='HTML · Manipulación de DIV')return 3100;
    if(title==='HTML + CSS')return 3200;
    if(title.startsWith('HTML + JavaScript'))return 3300+(level(title)||number(title)||source);
    if(title.startsWith('HTML + CSS + JavaScript'))return 3400+(level(title)||number(title)||source);
    if(Number.isFinite(section?.areaOrder))return 2000+section.areaOrder;
    return 1500+source;
  };

  const orderInArea=section=>{
    const title=String(section?.title||'');
    const area=areaOf(section);
    const source=sourceIndex.get(section)||0;
    if(area==='HTML'){
      if(title===htmlImageAttributesTitle&&htmlImageAnchor)return htmlOrder(htmlImageAnchor)+0.5;
      if(title===htmlInputTypesTitle&&htmlFormAnchor)return htmlOrder(htmlFormAnchor)+0.5;
      return htmlOrder(section);
    }
    if(Number.isFinite(section?.areaOrder))return section.areaOrder;
    if(area==='CSS'){
      if(title.startsWith('CSS · '))return level(title)||number(title)||100+source;
      if(/^(UI\/UX|UI y UX|Herramientas UI\/UX)/i.test(title))return 200+source;
      if(title.startsWith('Frameworks CSS'))return 300+source;
    }
    if(area==='JavaScript')return title==='Manejo del DOM'?900:(number(title)*10||level(title)||100+source);
    if(area==='Git')return level(title)||number(title)||100+source;
    if(area==='APIs')return title.startsWith('Proyecto básico · API')?900:(number(title)*10||100+source);
    if(area==='Angular')return number(title)*10||level(title)||100+source;
    if(area==='Frameworks')return title.startsWith('Proyectos con frameworks')?500+source:100+source;
    if(area==='Backend'){
      if(title.startsWith('Backend APIs'))return 0;
      if(title.startsWith('Backend FastAPI'))return 100+source;
      if(title.startsWith('Django REST'))return 500+(number(title)*10||source);
      return 800+source;
    }
    return 100+source;
  };

  sections.forEach(section=>{
    section.group=areaOf(section);
    section.primaryArea=section.group;
    section.learningAreaOrder=areaIndex.get(section.group);
    section.learningLessonOrder=orderInArea(section);
  });
  sections.sort((a,b)=>a.learningAreaOrder-b.learningAreaOrder||a.learningLessonOrder-b.learningLessonOrder);
  sections.forEach((section,index)=>section.routeOrder=index+1);
  window.learningPath={areas,areaOf};

  if(typeof buildNav==='function')buildNav();
  if(typeof render==='function')render();
})();