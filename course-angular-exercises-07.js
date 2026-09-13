(()=>{
  if(window.__angularExercises07Added)return;
  window.__angularExercises07Added=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;
  const ex=(n,name,description,code,preview,tip)=>T(`Ejercicio ${n}`,name,description,code,preview,[],{kind:'Ejercicio Angular',tip});
  sections.push({title:'Frameworks frontend · Angular · 6A. Ejercicios avanzados',navLabel:'Angular · Ejercicios 13–14',group:'Frameworks',primaryArea:'Frameworks',areaOrder:260,description:'Navegación con sesión y carga diferida por feature.',quote:'“Una frontera de carga debe corresponder a una frontera funcional.”',challenge:'Protege admin y reduce el bundle inicial.',items:[
    ex(13,'Sesión y permisos','Crea SessionStore, pantalla de acceso y guard. Protege /admin y distingue una sesión ausente de un permiso insuficiente. Documenta qué vuelve a validar el backend.','export const sessionGuard: CanActivateFn = () => {\n  const session = inject(SessionStore);\n  const router = inject(Router);\n  return session.isActive() ? true : router.createUrlTree(["/login"]);\n};','<p style="font-family:system-ui">Acceso → SessionStore → guard → ruta; backend valida la operación.</p>','Extra: conserva la URL solicitada y vuelve a ella después del acceso.'),
    ex(14,'Lazy loading por feature','Convierte admin y reports en rutas lazy. Verifica en Network que sus chunks no se descarguen en la portada.','{\n  path:"reports",\n  loadChildren: () => import("./features/reports/reports.routes")\n    .then(module => module.REPORT_ROUTES)\n}','<p style="font-family:system-ui">Bundle inicial → visita /reports → descarga chunk reports</p>','Entrega números del bundle antes y después; no basta con cambiar sintaxis.')
  ]});
})();
