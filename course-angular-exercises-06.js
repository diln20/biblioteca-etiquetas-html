(()=>{
  if(window.__angularExercises06Added)return;
  window.__angularExercises06Added=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function'||!window.CourseVisuals)return;
  const V=window.CourseVisuals;
  const ex=(n,name,description,code,preview,tip)=>T(`Ejercicio ${n}`,name,description,code,preview,[],{kind:'Ejercicio Angular',tip});
  sections.push({title:'Frameworks frontend · Angular · 4C. Ejercicios de integración',navLabel:'Angular · Ejercicios 11–12',group:'Frameworks',primaryArea:'Frameworks',areaOrder:242,description:'Búsqueda cancelable y feature de inventario completa.',quote:'“Integra una capacidad a la vez y conserva estados observables.”',challenge:'Completa el inventario intermedio con pruebas y build en verde.',items:[
    ex(11,'Búsqueda RxJS','Conecta FormControl a una búsqueda remota. Espera 300 ms, ignora términos repetidos, no busca con menos de dos caracteres y cancela la petición anterior.','results$ = this.query.valueChanges.pipe(\n  debounceTime(300),\n  map(value => value.trim()),\n  distinctUntilChanged(),\n  switchMap(value => value.length >= 2 ? this.api.search(value) : of([]))\n);',V.diagram('escribe “te” → espera → petición 1\nescribe “tecl” antes de responder\n  → cancela petición 1\n  → petición 2'),'Extra: conserva la búsqueda en la URL para compartir el resultado.'),
    ex(12,'Feature de inventario','Integra rutas lazy, ProductsApi, store, páginas, UI, formulario y estados. Añade una prueba HTTP del listado.','features/products/\n├── data-access/products-api.ts\n├── models/product.ts\n├── pages/\n│   ├── products-page/\n│   ├── product-detail-page/\n│   └── product-form-page/\n├── state/products-store.ts\n├── ui/\n└── products.routes.ts',V.tree('features/products/\n├─ data-access/\n├─ models/\n├─ pages/\n├─ state/\n├─ ui/\n└─ products.routes.ts'),'Criterios: URL directa, API tipada, validación accesible, reintento, búsqueda cancelable, prueba HTTP y ng build en verde.')
  ]});
})();
