(()=>{
  if(window.__solidExercises02Added)return;
  window.__solidExercises02Added=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;
  const ex=(n,name,description,code,preview,tip)=>T(`Ejercicio ${n}`,name,description,code,preview,[],{kind:'Ejercicio Solid.js',tip});
  sections.push({title:'Frameworks frontend · Solid.js · 3B. Ejercicios integrados',navLabel:'Solid.js · Ejercicios 4–6',group:'Frameworks',primaryArea:'Frameworks',areaOrder:285,description:'Persistencia, stores y dashboard asíncrono.',quote:'“Usa effects para sincronizar, no para duplicar estado.”',challenge:'Construye un dashboard pequeño con estados completos.',items:[
    ex(4,'Effect y persistencia','Guarda las tareas en localStorage mediante createEffect y restaura el estado inicial. Maneja JSON inválido sin romper la aplicación.','const initial = JSON.parse(localStorage.getItem("tasks") ?? "[]");\nconst [tasks,setTasks] = createSignal<Task[]>(initial);\n\ncreateEffect(() => localStorage.setItem("tasks",JSON.stringify(tasks())));','<p style="font-family:system-ui">Las tareas continúan después de recargar.</p>','Extra: añade versión al formato almacenado para futuras migraciones.'),
    ex(5,'Store de perfil','Crea un formulario de perfil con createStore. Actualiza nombre y preferencias por ruta y muestra una vista previa.','const [profile,setProfile] = createStore({ name:"", theme:"dark" });\nsetProfile("name",event.currentTarget.value);','<section style="font-family:system-ui"><strong>Perfil:</strong> Ana · tema oscuro</section>','Separa formulario y vista previa sin crear un store global.'),
    ex(6,'Dashboard asíncrono','Consume una API, modela loading/error/data y crea métricas derivadas. Si usas SolidStart, añade una ruta SSR y compara el HTML inicial.','const [data] = createResource(fetchMetrics);\n\n<Show when={!data.loading} fallback={<p>Cargando…</p>}>\n  <Show when={!data.error} fallback={<p>Error</p>}>\n    <Dashboard metrics={data()!} />\n  </Show>\n</Show>','<section style="font-family:system-ui"><h3>Dashboard</h3><p>Usuarios: 1.240 · Conversión: 4,8 %</p></section>','Criterios: loading, error, reintento, memo y build sin errores.')
  ]});
})();
