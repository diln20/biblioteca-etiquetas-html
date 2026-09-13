(()=>{
  if(window.__angularExercises09Added)return;
  window.__angularExercises09Added=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function'||!window.CourseVisuals)return;
  const V=window.CourseVisuals;
  const ex=(n,name,description,code,preview,tip)=>T(`Ejercicio ${n}`,name,description,code,preview,[],{kind:'Ejercicio Angular',tip});
  sections.push({title:'Frameworks frontend · Angular · 6C. Proyecto final',navLabel:'Angular · Ejercicios 17–18',group:'Frameworks',primaryArea:'Frameworks',areaOrder:262,description:'Suite de pruebas, pipeline y proyecto final desplegable.',quote:'“Un proyecto termina cuando otra persona puede ejecutarlo y verificarlo.”',challenge:'Publica el panel de inventario con calidad automatizada.',items:[
    ex(17,'Suite de pruebas','Escribe pruebas para guard, store, formulario y ProductsApi. Añade una integración del flujo crear producto.','npm test -- --watch=false\n\nCasos:\n- guard redirige\n- store conserva invariantes\n- formulario muestra errores\n- API maneja respuesta y fallo\n- flujo crear producto funciona','<p style="font-family:system-ui">Unitarias muchas → integraciones algunas → E2E críticas</p>','Cada prueba debe proteger una regla, no repetir la implementación.'),
    ex(18,'Proyecto final y CI/CD','Publica el panel con acceso, CRUD, filtros, rutas lazy, pruebas y pipeline. El README debe permitir clonar, configurar, ejecutar, probar y desplegar.','Entrega mínima:\n1. Acceso y cierre de sesión.\n2. Guards y permisos.\n3. CRUD con Reactive Forms.\n4. Búsqueda RxJS.\n5. Estados carga/error/vacío.\n6. Lazy routes y @defer.\n7. SSR/SSG o decisión documentada.\n8. Pruebas de store y API.\n9. Accesibilidad.\n10. Pipeline en verde.',V.tree('proyecto-final/\n├─ src/app/core/\n├─ src/app/shared/\n├─ src/app/features/\n├─ tests/\n├─ .github/workflows/quality.yml\n└─ README.md'),'Criterio final: otra persona puede clonar, ejecutar y comprender la arquitectura siguiendo el README.')
  ]});
})();
