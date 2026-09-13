(()=>{
  if(window.__courseAngularBindingsAdded)return;
  window.__courseAngularBindingsAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function'||!window.CourseVisuals)return;
  const V=window.CourseVisuals;
  const item=(topic,name,description,code,preview,tip)=>T(topic,name,description,code,preview,[],{kind:'Angular principiante',tip});
  sections.push({
    title:'Frameworks frontend · Angular · 1C. Bindings y comunicación',
    navLabel:'Angular · 1C. Bindings y comunicación',
    group:'Frameworks',primaryArea:'Frameworks',areaOrder:213,
    description:'Cómo viajan los datos entre TypeScript, la plantilla, el componente padre y el componente hijo.',
    quote:'“Los datos bajan; los eventos suben.”',
    challenge:'Crea una tarjeta interactiva reutilizable sin manipular el DOM manualmente.',
    items:[
      item('Bindings','Interpolación, propiedades y eventos','La interpolación muestra texto; los corchetes asignan una expresión a una propiedad; los paréntesis escuchan una acción. Modifica el estado del componente y deja que Angular actualice la vista.','name = "Teclado";\navailable = true;\nselect(){ this.available = false; }\n\n<h3>{{ name }}</h3>\n<button [disabled]="!available" (click)="select()">Comprar</button>',V.box('Dirección del flujo','<p><code>{{ name }}</code> muestra.</p><p><code>[disabled]</code> asigna.</p><p><code>(click)</code> escucha.</p>','#b91c1c'),'Lee cada binding en voz alta para recordar su dirección.'),
      item('Comunicación','input y output','El padre conserva los datos. El hijo recibe lo necesario con input y avisa hechos con output. El hijo no modifica directamente una colección del padre.','product = input.required<Product>();\nselected = output<number>();\n\n<button (click)="selected.emit(product().id)">Elegir</button>\n\n<app-product-card [product]="item" (selected)="openProduct($event)" />',V.diagram('PADRE\n  │ [product] entrega datos\n  ▼\nHIJO ProductCard\n  │ selected.emit(id)\n  ▼\nPADRE recibe (selected)'),'Nombra outputs como hechos: selected, saved o removed.')
    ]
  });
})();
