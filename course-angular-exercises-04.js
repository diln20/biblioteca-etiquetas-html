(()=>{
  if(window.__angularExercises04Added)return;
  window.__angularExercises04Added=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;
  const ex=(n,name,description,code,preview,tip)=>T(`Ejercicio ${n}`,name,description,code,preview,[],{kind:'Ejercicio Angular',tip});
  sections.push({title:'Frameworks frontend · Angular · 4A. Ejercicios de arquitectura',navLabel:'Angular · Ejercicios 7–8',group:'Frameworks',primaryArea:'Frameworks',areaOrder:240,description:'Servicios, store local y navegación con parámetros.',quote:'“La arquitectura aparece cuando separas responsabilidades reales.”',challenge:'Convierte la aplicación local en una feature navegable.',items:[
    ex(7,'Servicio y store local','Extrae la colección de productos desde la página hacia ProductsStore. Expón products readonly y comandos add/remove. La página deja de modificar arreglos directamente.','private readonly _products = signal<Product[]>([]);\nreadonly products = this._products.asReadonly();\n\nadd(command: CreateProduct){\n  const next = { id: crypto.randomUUID(), ...command };\n  this._products.update(items => [...items,next]);\n}', '<p style="font-family:system-ui">Página → Store → signal readonly → plantilla</p>','Extra: agrega computed para stock total y valor del inventario.'),
    ex(8,'Router con detalle','Crea /products, /products/:id y /products/:id/edit. Desde la lista navega al detalle. Una URL directa válida debe funcionar y un id inexistente debe mostrar 404.','export const PRODUCT_ROUTES: Routes = [\n  { path:"", component:ProductsPage },\n  { path:":id", component:ProductDetailPage },\n  { path:":id/edit", component:ProductFormPage }\n];','<nav style="font-family:system-ui"><a href="#">Productos</a> / <strong>Detalle 42</strong></nav>','Extra: reacciona cuando cambia el parámetro sin destruir el componente.')
  ]});
})();
