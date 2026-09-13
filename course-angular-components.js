(()=>{
  if(window.__angularComponentsGuideAdded)return;
  window.__angularComponentsGuideAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function'||!window.CourseVisuals)return;
  const V=window.CourseVisuals;
  sections.push({
    title:'Frameworks frontend · Angular · 1B. Componentes',
    navLabel:'Angular · 1B. Componentes',
    group:'Frameworks',primaryArea:'Frameworks',areaOrder:212,
    description:'Qué es un componente, qué archivos lo forman y cómo se relaciona con otros componentes.',
    quote:'“Un componente tiene una responsabilidad visual concreta.”',
    challenge:'Genera una tarjeta de producto y dibuja dónde vive el estado.',
    items:[
      T('Componente','Anatomía de una pieza visual','Un componente une TypeScript, una plantilla y estilos. La clase guarda datos y métodos; la plantilla decide qué se ve; los estilos controlan apariencia.','ng generate component features/products/product-card\n\nproduct-card.ts → estado\nproduct-card.html → estructura\nproduct-card.scss → apariencia',V.diagram('PRODUCT CARD\n├─ TypeScript: datos y eventos\n├─ HTML: estructura\n├─ SCSS: apariencia\n└─ SPEC: pruebas'),[],{kind:'Angular principiante',tip:'Mantén un solo propósito por componente.'})
    ]
  });
})();
