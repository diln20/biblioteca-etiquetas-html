(()=>{
  if(window.__angularExercises03Added)return;
  window.__angularExercises03Added=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function'||!window.CourseVisuals)return;
  const V=window.CourseVisuals;
  const exercise=(number,name,description,code,preview,tip)=>T(`Ejercicio ${number}`,name,description,code,preview,[],{kind:'Ejercicio Angular',tip});
  sections.push({title:'Frameworks frontend · Angular · 2C. Ejercicios con componentes',navLabel:'Angular · Ejercicios 5–6',group:'Frameworks',primaryArea:'Frameworks',areaOrder:222,description:'Comunicación padre-hijo y proyecto principiante integrado.',quote:'“Los datos bajan; los eventos suben.”',challenge:'Completa un gestor de tareas dividido en componentes.',items:[
    exercise(5,'Selector padre-hijo','Crea ProductList y ProductCard. El padre entrega cada producto con input; la tarjeta emite selected; el padre muestra el producto elegido.','// hijo\nproduct = input.required<Product>();\nselected = output<Product>();\n\n// padre\nselectedProduct = signal<Product | null>(null);\n\n<app-product-card [product]="item"\n  (selected)="selectedProduct.set($event)" />','<section style="font-family:system-ui"><p>Producto seleccionado: Teclado</p><button>Seleccionar tarjeta</button></section>','Extra: emite solo el id y compara ambas decisiones.'),
    exercise(6,'Gestor de tareas','Integra formulario, signal de tareas, computed para pendientes, @for, @empty y componentes. TaskForm emite created; TaskItem emite toggled y removed.','interface Task { id:number; title:string; completed:boolean; }\ntasks = signal<Task[]>([]);\npending = computed(() => this.tasks().filter(task => !task.completed));\n\nsrc/app/features/tasks/\n├── models/task.ts\n├── pages/tasks-page/\n└── ui/\n    ├── task-form/\n    ├── task-list/\n    └── task-item/',V.tree('tasks/\n├─ models/task.ts\n├─ pages/tasks-page/\n└─ ui/\n   ├─ task-form/\n   ├─ task-list/\n   └─ task-item/'),'Criterios: estado vacío, foco visible, mensajes específicos, completar, eliminar, filtrar y ng build sin errores.')
  ]});
})();
