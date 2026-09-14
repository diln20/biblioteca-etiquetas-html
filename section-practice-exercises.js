(()=>{
  if(window.__sectionPracticeExercisesAdded)return;
  window.__sectionPracticeExercisesAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const clean=value=>String(value||'')
    .replace(/^\s*\d{1,2}[A-Z]?\.\s*/i,'')
    .replace(/^\s*Ejercicio\s*\d+\s*[·.:-]?\s*/i,'')
    .replace(/\s+/g,' ')
    .trim();

  const sectionName=section=>clean(String(section.navLabel||section.title||'Tema').split(' · ').at(-1));
  const itemName=item=>clean(item?.name||item?.tag||'concepto principal');

  const guideFor=(section,items)=>{
    const rows=[];
    const seen=new Set();
    for(const item of items){
      for(const entry of Array.isArray(item?.guide)?item.guide:[]){
        if(!Array.isArray(entry)||entry.length<2)continue;
        const key=String(entry[1]);
        if(seen.has(key))continue;
        seen.add(key);
        rows.push([entry[0]||'Modificar',entry[1],entry[2]||'Usa este archivo para resolver el ejercicio.']);
        if(rows.length===4)return rows;
      }
    }
    if(rows.length)return rows;
    const area=String(section.primaryArea||section.group||'');
    const fallback={
      HTML:[['Crear o modificar','ejercicios/index.html','Resuelve aquí la práctica de HTML.']],
      CSS:[['Crear o modificar','ejercicios/index.html','Estructura de la práctica.'],['Crear o modificar','ejercicios/styles.css','Estilos del ejercicio.']],
      JavaScript:[['Crear o modificar','ejercicios/index.html','Interfaz de práctica.'],['Crear o modificar','ejercicios/app.js','Lógica JavaScript.']],
      TypeScript:[['Crear o modificar','ejercicios/main.ts','Código TypeScript del ejercicio.']],
      Angular:[['Modificar','src/app/app.ts','Lógica del ejercicio.'],['Modificar','src/app/app.html','Resultado visual cuando corresponda.']],
      React:[['Modificar','src/App.jsx','Resuelve aquí la práctica React.']],
      Vue:[['Modificar','src/App.vue','Resuelve aquí la práctica Vue.']],
      Svelte:[['Modificar','src/App.svelte','Resuelve aquí la práctica Svelte.']],
      'Solid.js':[['Modificar','src/App.tsx','Resuelve aquí la práctica Solid.js.']],
      FastAPI:[['Modificar','app/main.py','Implementa aquí el ejercicio.']],
      'Django Framework':[['Modificar','app/views.py','Lógica de la práctica.'],['Modificar','app/templates/app/index.html','Resultado HTML.']],
      'Django REST':[['Modificar','app/views.py','Implementa aquí la práctica de API.']],
      APIs:[['Crear o modificar','ejercicios/app.js','Realiza aquí las peticiones del ejercicio.']],
      Git:[['Ejecutar','Terminal','Realiza los comandos del ejercicio.']],
      'Base de datos':[['Ejecutar','Consola de la base de datos','Ejecuta y verifica las consultas del ejercicio.']]
    };
    return fallback[area]||[['Usar','Archivos de la lección','Trabaja en los mismos archivos indicados por la sección.']];
  };

  const exercise=(n,section,source,guide)=>{
    const concept=itemName(source);
    const challenge=clean(section.challenge||`Crea una variante propia de ${sectionName(section)} y comprueba que funciona.`);
    const name=n===1?`Ejercicio 1 · Practica ${concept}`:`Ejercicio 2 · Reto de ${sectionName(section)}`;
    const description=n===1
      ? `Repite “${concept}” sin copiar el ejemplo completo. Cambia datos, nombres o valores y explica con tus palabras qué hace cada parte importante.`
      : `Aplica lo aprendido en una situación nueva. ${challenge} Haz una versión mínima, pruébala y añade una mejora propia.`;
    const code=n===1
      ? `EJERCICIO 1\n\n1. Reproduce el concepto con tus propios datos.\n2. Cambia al menos dos valores.\n3. Ejecuta o abre el resultado.\n4. Corrige cualquier error.\n5. Explica qué aprendiste.`
      : `EJERCICIO 2\n\nReto: ${challenge}\n\n1. Planifica los pasos.\n2. Implementa una versión que funcione.\n3. Prueba dos casos.\n4. Añade una mejora propia.\n5. Deja el resultado sin errores.`;
    const preview=`<section style="padding:16px;border:1px solid #22c55e;border-radius:12px;background:#07111f;color:#e5edf8;font-family:system-ui"><strong style="color:#86efac">${name}</strong><p>Checklist: completar, probar, modificar y explicar.</p></section>`;
    return window.T(`Ejercicio ${n}`,name,description,code,preview,[],{
      kind:'Ejercicio práctico',
      tip:'Inténtalo primero sin copiar. Usa la explicación como pista y comprueba el resultado por tu cuenta.',
      guide,
      guideTitle:'Dónde hacer el ejercicio',
      codeLabel:'Instrucciones del ejercicio'
    });
  };

  let total=0;
  for(const section of window.sections){
    if(section.__practiceExercisesAdded)continue;
    section.__practiceExercisesAdded=true;
    if(!Array.isArray(section.items))section.items=[];
    const originals=section.items.filter(item=>!/^Ejercicio\b/i.test(String(item?.name||''))&&!/^Ejercicio/i.test(String(item?.kind||'')));
    const first=originals[0]||section.items[0]||{name:sectionName(section)};
    const second=originals[1]||first;
    const guide=guideFor(section,[first,second]);
    section.items.push(exercise(1,section,first,guide),exercise(2,section,second,guide));
    total+=1;
  }
  window.sectionPracticeExercises={sections:total,perSection:2};
})();
