(()=>{
  if(window.__javascriptOrderFinalized||!Array.isArray(window.sections))return;
  window.__javascriptOrderFinalized=true;

  const desired=[
    ['JavaScript · 1. Primeros pasos','Básico'],
    ['JavaScript · 1A. Sintaxis, entrada y salida','Básico'],
    ['JavaScript · 2. Variables y tipos de datos','Básico'],
    ['JavaScript · 2A. Tipos especiales y memoria','Básico'],
    ['JavaScript · 3A. Conversión, coerción y valores booleanos','Básico'],
    ['JavaScript · 3. Operadores','Básico'],
    ['JavaScript · 4A. Strings y Numbers a fondo','Básico'],
    ['JavaScript · 4B. Objeto Math y aleatoriedad','Básico'],
    ['JavaScript · 4. Estructuras de datos','Básico'],
    ['JavaScript · 5. Estructuras condicionales','Básico'],
    ['JavaScript · 6. Estructuras repetitivas','Básico'],
    ['JavaScript · 7. Funciones','Intermedio'],
    ['JavaScript · 7A. Tipos de funciones','Intermedio'],
    ['JavaScript · 8. Métodos de arreglos','Intermedio'],
    ['JavaScript · 8A. map vs filter vs reduce','Intermedio'],
    ['JavaScript · 9. Objetos y manejo de datos','Intermedio'],
    ['Manejo del DOM','Intermedio'],
    ['JavaScript · DOM · Selectores','Intermedio'],
    ['JavaScript · 10. Errores, módulos y asincronía','Avanzado'],
    ['JavaScript · 10B. Fetch API a fondo','Avanzado'],
    ['JavaScript · 10C. APIs públicas de PublicAPIs.io','Avanzado'],
    ['JavaScript · 10D. Archivos JSON','Avanzado'],
    ['JavaScript · 10E. Mini base de datos con JSON','Avanzado'],
    ['JavaScript · 10A. Motor, navegador y Node.js','Avanzado'],
    ['JavaScript · 11A. Repaso y preguntas de entrevista','Avanzado']
  ];

  const rank=new Map(desired.map(([title],index)=>[title,(index+1)*10]));
  const level=new Map(desired);
  const sourceIndex=new Map(sections.map((section,index)=>[section,index]));
  const isJavaScript=section=>(section?.primaryArea||section?.group)==='JavaScript';
  const positions=[];
  const jsSections=[];

  sections.forEach((section,index)=>{
    if(isJavaScript(section)){
      positions.push(index);
      jsSections.push(section);
    }
  });

  const fallback=section=>{
    if(rank.has(section?.title))return rank.get(section.title);
    if(Number.isFinite(section?.areaOrder))return 1000+section.areaOrder;
    if(Number.isFinite(section?.learningLessonOrder))return 2000+section.learningLessonOrder;
    return 3000+(sourceIndex.get(section)||0);
  };

  jsSections.sort((a,b)=>fallback(a)-fallback(b)||(sourceIndex.get(a)||0)-(sourceIndex.get(b)||0));
  positions.forEach((position,index)=>{sections[position]=jsSections[index];});

  jsSections.forEach((section,index)=>{
    section.areaOrder=(index+1)*10;
    section.learningLessonOrder=section.areaOrder;
    section.learningLevel=level.get(section.title)||section.learningLevel||'Complementario';
    section.routeAreaPosition=index+1;
    section.routeAreaTotal=jsSections.length;
  });
  sections.forEach((section,index)=>section.routeOrder=index+1);

  window.javascriptLearningPath={
    levels:['Básico','Intermedio','Avanzado'],
    titles:jsSections.map(section=>section.title)
  };

  if(typeof buildNav==='function')buildNav();
  if(typeof render==='function')render();
})();
