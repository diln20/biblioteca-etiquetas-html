(()=>{
  if(window.__solidExercises01Added)return;
  window.__solidExercises01Added=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;
  const ex=(n,name,description,code,preview,tip)=>T(`Ejercicio ${n}`,name,description,code,preview,[],{kind:'Ejercicio Solid.js',tip});
  sections.push({title:'Frameworks frontend · Solid.js · 3A. Ejercicios iniciales',navLabel:'Solid.js · Ejercicios 1–3',group:'Frameworks',primaryArea:'Frameworks',areaOrder:284,description:'Hola Mundo, contador y lista reactiva.',quote:'“Observa qué nodo cambia cuando se actualiza una signal.”',challenge:'Completa los tres ejercicios y explica el grafo reactivo.',items:[
    ex(1,'Hola Mundo','Crea Greeting con una constante name y después conviértela en prop para reutilizar el componente.','function Greeting(props:{ name:string }){\n  return <h1>Hola {props.name}</h1>;\n}\n\n<Greeting name="Dilan" />','<h1 style="font-family:system-ui;color:#2563eb">Hola Dilan</h1>','Extra: renderiza tres saludos desde un arreglo.'),
    ex(2,'Contador con createSignal','Construye incrementar, decrementar y reiniciar. Impide negativos y muestra el doble con createMemo.','const [count,setCount] = createSignal(0);\nconst double = createMemo(() => count() * 2);','<p style="font-family:system-ui">− 0 + · Doble: 0</p>','Explica por qué count lleva paréntesis.'),
    ex(3,'Lista y condicionales','Crea tareas, muestra estado vacío y permite eliminar por id usando For y Show.','<Show when={tasks().length > 0} fallback={<p>Sin tareas</p>}>\n  <For each={tasks()}>{task =>\n    <button onClick={() => remove(task.id)}>{task.title}</button>\n  }</For>\n</Show>','<ul style="font-family:system-ui"><li>Aprender signals</li><li>Crear lista</li></ul>','Extra: agrega filtro pendiente/completada con createMemo.')
  ]});
})();
