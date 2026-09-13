(()=>{
  if(window.__courseAngularFormsAdded)return;
  window.__courseAngularFormsAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function'||!window.CourseVisuals)return;
  const V=window.CourseVisuals;
  const item=(topic,name,description,code,preview,tip)=>T(topic,name,description,code,preview,[],{kind:'Angular principiante',tip});
  sections.push({
    title:'Frameworks frontend · Angular · 1E. Formularios básicos',
    navLabel:'Angular · 1E. Formularios básicos',
    group:'Frameworks',primaryArea:'Frameworks',areaOrder:215,
    description:'Formulario pequeño con FormsModule, ngModel, validación accesible y mensajes específicos.',
    quote:'“Un formulario debe explicar qué escribir, dónde está el foco y cómo corregir un error.”',
    challenge:'Crea un formulario de tarea con label, validación, error asociado y botón de envío.',
    items:[
      item('Formulario','FormsModule y ngModel','Para formularios pequeños, ngModel conecta un control con una propiedad. FormsModule expone invalid, touched y dirty. Mantén el label visible, muestra el error después de la interacción y valida también en el servidor.','import { FormsModule } from "@angular/forms";\n\n@Component({ imports: [FormsModule] })\nexport class TaskForm { title = ""; }\n\n<form #form="ngForm" (ngSubmit)="createTask()">\n  <label for="title">Tarea</label>\n  <input id="title" name="title" [(ngModel)]="title"\n    #titleField="ngModel" required minlength="3"\n    aria-describedby="title-error">\n  @if (titleField.invalid && titleField.touched) {\n    <p id="title-error">Escribe al menos 3 caracteres.</p>\n  }\n  <button [disabled]="form.invalid">Agregar</button>\n</form>',V.box('Formulario accesible','<label style="display:grid;gap:6px">Tarea<input value="Te" style="padding:9px;border:1px solid #dc2626;border-radius:8px"></label><small style="color:#dc2626">Debe tener al menos 3 caracteres; falta 1.</small>','#b91c1c'),'Usa Reactive Forms cuando aumenten campos, reglas o validaciones entre controles.'),
      item('Foco','Estado visible del campo activo','Quien navega con Tab necesita localizar el control activo. :focus-visible permite mostrar un borde fuerte al usar teclado. Nunca elimines outline sin reemplazarlo.','input:focus-visible,\nbutton:focus-visible {\n  outline: 3px solid #2563eb;\n  outline-offset: 3px;\n}',V.compare('Sin orientación','<input value="Jh" style="width:100%;padding:9px;border:1px solid #e2e8f0">','Foco visible','<input value="Jh" style="width:100%;padding:9px;border:3px solid #0f172a;box-shadow:0 0 0 3px #bfdbfe">'),'Recorre todo el formulario con Tab y Shift+Tab.')
    ]
  });
})();
