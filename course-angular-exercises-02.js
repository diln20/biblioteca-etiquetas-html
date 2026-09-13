(()=>{
  if(window.__angularExercises02Added)return;
  window.__angularExercises02Added=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;
  const exercise=(number,name,description,code,preview,tip)=>T(`Ejercicio ${number}`,name,description,code,preview,[],{kind:'Ejercicio Angular',tip});
  sections.push({title:'Frameworks frontend · Angular · 2B. Ejercicios reactivos',navLabel:'Angular · Ejercicios 3–4',group:'Frameworks',primaryArea:'Frameworks',areaOrder:221,description:'Signals, valores derivados y listas con control de flujo.',quote:'“Guarda el estado mínimo y deriva el resto.”',challenge:'Completa un contador y una lista editable.',items:[
    exercise(3,'Contador con signal','Construye incrementar, decrementar y restablecer. Impide valores negativos y muestra el doble mediante computed.','count = signal(0);\ndouble = computed(() => this.count() * 2);\n\nincrement(){ this.count.update(value => value + 1); }\ndecrement(){ this.count.update(value => Math.max(0, value - 1)); }\nreset(){ this.count.set(0); }','<div style="font-family:system-ui;display:flex;gap:10px;align-items:center"><button>−</button><strong>0</strong><button>+</button><span>Doble: 0</span></div>','Explica la diferencia entre set y update.'),
    exercise(4,'Lista con @for','Define una colección tipada y muéstrala con @for. Añade @empty y usa un id estable como track.','languages = signal([\n  { id: 1, name: "HTML" },\n  { id: 2, name: "TypeScript" },\n  { id: 3, name: "Angular" }\n]);\n\n@for (language of languages(); track language.id) {\n  <li>{{ language.name }}</li>\n} @empty {\n  <li>No hay lenguajes.</li>\n}','<ul style="font-family:system-ui"><li>HTML</li><li>TypeScript</li><li>Angular</li></ul>','Extra: elimina un registro y verifica que los restantes mantengan identidad.')
  ]});
})();
