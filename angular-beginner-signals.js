(()=>{
  if(window.__angularBeginnerSignalsAdded)return;
  window.__angularBeginnerSignalsAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function'||!window.CourseVisuals)return;
  const V=window.CourseVisuals;
  const item=(topic,name,description,code,preview,tip)=>T(topic,name,description,code,preview,[],{kind:'Angular principiante',tip});
  sections.push({title:'Frameworks frontend · Angular · 1D. Signals y listas',navLabel:'Angular · 1D. Signals y listas',group:'Frameworks',primaryArea:'Frameworks',areaOrder:214,description:'Estado reactivo y control de flujo moderno.',quote:'“Guarda el estado mínimo y deriva el resto.”',challenge:'Construye un contador y una lista con estado vacío.',items:[
    item('Signals','signal, set, update y computed','Una signal guarda un valor reactivo. Se lee como función. set reemplaza y update calcula desde el valor anterior. computed deriva información sin duplicarla.','count = signal(0);\ndouble = computed(() => this.count() * 2);\n\nincrement(){ this.count.update(value => value + 1); }\nreset(){ this.count.set(0); }\n\n<button (click)="increment()">{{ count() }}</button>\n<p>Doble: {{ double() }}</p>',V.diagram('count(0)\n  │ update\n  ▼\ncount(1) ──► computed double(2)\n  │                 │\n  └──── plantilla ◄─┘'),'No guardes double como otra signal editable.'),
    item('Plantilla','@if, @for y @empty','@if crea un bloque según una condición. @for recorre la colección y track identifica cada registro. @empty cubre el caso sin datos. Diseña también carga y error.','@if (loading()) {\n  <p>Cargando…</p>\n} @else {\n  <ul>\n    @for (product of products(); track product.id) {\n      <li>{{ product.name }}</li>\n    } @empty {\n      <li>No hay productos.</li>\n    }\n  </ul>\n}',V.diagram('loading → mensaje\nerror   → explicación\n[]      → vacío\ndatos   → lista con @for'),'Usa un id estable en track; evita $index si la lista cambia.')
  ]});
})();
