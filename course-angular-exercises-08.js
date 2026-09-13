(()=>{
  if(window.__angularExercises08Added)return;
  window.__angularExercises08Added=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function'||!window.CourseVisuals)return;
  const V=window.CourseVisuals;
  const ex=(n,name,description,code,preview,tip)=>T(`Ejercicio ${n}`,name,description,code,preview,[],{kind:'Ejercicio Angular',tip});
  sections.push({title:'Frameworks frontend · Angular · 6B. Ejercicios de rendimiento',navLabel:'Angular · Ejercicios 15–16',group:'Frameworks',primaryArea:'Frameworks',areaOrder:261,description:'Deferrable views y renderizado híbrido.',quote:'“Optimiza una hipótesis medible, no una intuición.”',challenge:'Mide carga inicial y elige el renderizado de cada ruta.',items:[
    ex(15,'Dashboard con @defer','Carga una gráfica cuando entra al viewport. Crea placeholder con altura, loading y error. Mide el impacto en la carga inicial.','@defer (on viewport; prefetch on idle) {\n  <app-sales-chart />\n} @placeholder {\n  <div class="chart-skeleton"></div>\n} @error {\n  <button (click)="retry()">Reintentar</button>\n}','<div style="height:120px;display:grid;place-items:center;border-radius:12px;background:#e2e8f0;font-family:system-ui">Espacio reservado para la gráfica</div>','Extra: anuncia el estado con aria-live sin mensajes repetitivos.'),
    ex(16,'Renderizado híbrido','Añade SSR. Prerenderiza la portada, usa SSR para el detalle público y CSR para admin. Verifica HTML inicial sin JavaScript.','ng add @angular/ssr\n\n{ path:"", renderMode:RenderMode.Prerender },\n{ path:"products/:id", renderMode:RenderMode.Server },\n{ path:"admin/**", renderMode:RenderMode.Client }',V.diagram('/ → prerender\n/products/:id → SSR\n/admin/** → CSR\n\nDespués: hidratación y eventos'),'Documenta por qué elegiste el modo de cada ruta y el costo operativo.')
  ]});
})();
