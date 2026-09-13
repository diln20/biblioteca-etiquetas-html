(()=>{
  if(window.__frameworkCoursesSeparated)return;
  window.__frameworkCoursesSeparated=true;
  if(!Array.isArray(window.sections))return;

  const AREAS=['HTML','CSS','JavaScript','Git','APIs','Angular','React','Vue','Svelte','Solid.js','Frameworks','Backend'];
  const COURSE=['React','Vue','Svelte','Solid.js'];
  const cfg={
    React:{root:'src/App.jsx',main:'src/main.jsx',style:'src/App.css',ext:'jsx',color:'#087ea4'},
    Vue:{root:'src/App.vue',main:'src/main.js',style:'src/assets/main.css',ext:'vue',color:'#42b883'},
    Svelte:{root:'src/App.svelte',main:'src/main.js',style:'src/app.css',ext:'svelte',color:'#ff3e00'},
    'Solid.js':{root:'src/App.tsx',main:'src/index.tsx',style:'src/index.css',ext:'tsx',color:'#2c4f7c'}
  };
  const norm=v=>String(v||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const frameworkOf=section=>{
    const title=String(section?.title||'');
    if(/(?:^| · )React(?: ·|$| \+)/i.test(title))return 'React';
    if(/(?:^| · )Vue(?: ·|$| \+)/i.test(title))return 'Vue';
    if(/(?:^| · )Svelte(?: ·|$| \+)/i.test(title))return 'Svelte';
    if(/Solid\.js/i.test(title))return 'Solid.js';
    return '';
  };
  const result=(fw,title,body,button='')=>`<article style="font-family:system-ui;max-width:520px;padding:22px;border:1px solid #cbd5e1;border-radius:14px;background:#fff;color:#0f172a;box-shadow:0 10px 26px rgba(15,23,42,.08)"><p style="margin:0 0 6px;color:${cfg[fw].color};font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase">${fw}</p><h2 style="margin:0 0 10px;color:${cfg[fw].color}">${title}</h2><div style="color:#475569;line-height:1.55">${body}</div>${button?`<button type="button" style="margin-top:14px;padding:10px 14px;border:0;border-radius:9px;background:${cfg[fw].color};color:#fff;font-weight:800">${button}</button>`:''}</article>`;

  const previewFor=(fw,item)=>{
    const code=String(item?.code||'');
    const text=norm(`${item?.topic||item?.tag||''} ${item?.name||''}`);
    if(fw==='React'){
      if(/useState|onClick/.test(code))return result(fw,'Contador React','El estado cambia y React vuelve a renderizar el componente.','Contador: 0');
      if(/props|Saludo|nombre/.test(code))return result(fw,'Saludo reutilizable','Hola, Ana');
      if(/\.map\(|<li/.test(code))return result(fw,'Lista React','<ul style="margin:0;padding-left:20px"><li>Estudiar JSX</li><li>Practicar componentes</li></ul>');
      if(/<h1|<main/.test(code))return result(fw,'Primera vista','Aprendiendo React');
    }
    if(fw==='Vue'){
      if(/\bref\(|@click|v-model/.test(code))return result(fw,'Contador Vue','La ref cambia y la plantilla refleja el nuevo valor.','Contador: 0');
      if(/defineProps|nombre/.test(code))return result(fw,'Componente Vue','Hola, Ana');
      if(/v-for|<li/.test(code))return result(fw,'Lista Vue','<ul style="margin:0;padding-left:20px"><li>Aprender plantillas</li><li>Practicar refs</li></ul>');
      if(/<template>|<h1|<h2/.test(code))return result(fw,'Primera vista','Hola desde Vue');
    }
    if(fw==='Svelte'){
      if(/\$state|on:click|onclick/.test(code))return result(fw,'Contador Svelte','El estado cambia y Svelte actualiza el texto dependiente.','Contador: 0');
      if(/export\s+let|\$props|nombre/.test(code))return result(fw,'Componente Svelte','Hola, Ana');
      if(/#each|<li/.test(code))return result(fw,'Lista Svelte','<ul style="margin:0;padding-left:20px"><li>Aprender componentes</li><li>Practicar estado</li></ul>');
      if(/<h1|<h2/.test(code))return result(fw,'Primera vista','Hola desde Svelte');
    }
    if(fw==='Solid.js'){
      if(/createSignal/.test(code)&&/<button/.test(code))return result(fw,'Contador Solid','La signal notifica a las expresiones que la leyeron.','Clics: 0');
      if(/createMemo/.test(code))return result(fw,'Total derivado','<strong>Total: $25.000</strong><p style="margin:7px 0 0">Precio × cantidad se recalcula automáticamente.</p>');
      if(/createEffect/.test(code))return result(fw,'Efecto aplicado','<p style="margin:0">Tema actual: <strong>dark</strong></p><p style="margin:7px 0 0">El efecto sincroniza el documento y localStorage.</p>');
      if(/createStore/.test(code))return result(fw,'Estado estructurado','<p style="margin:0"><strong>Usuario:</strong> Dilan</p><p style="margin:7px 0 0"><strong>Tareas:</strong> 1</p>');
      if(/Greeting|Hola\s+\{?name/.test(code))return result(fw,'Componente Solid','Hola Dilan');
    }
    return '';
  };

  const fileInfo=(fw,item)=>{
    const c=cfg[fw], code=String(item?.code||''), text=norm(`${item?.topic||item?.tag||''} ${item?.name||''} ${code}`);
    const guide=[], files=[], seen=new Set();
    const add=(action,path,detail)=>{const k=`${action}|${path}`;if(!seen.has(k)){seen.add(k);guide.push([action,path,detail]);}};
    const addFile=(path,method,detail,command='')=>{if(!files.some(file=>file.path===path))files.push({path,method,detail,command});};
    const project=/npm\s+create|create-vue|create-solid|vite@latest/i.test(code);
    if(/^|\n/.test(code)&&code.split('\n').some(line=>/^\s*(npm|npx|pnpm|yarn|cd)\b/.test(line))){
      add('Ejecutar',project?'Terminal · carpeta donde crearás el proyecto':`Terminal · raíz del proyecto ${fw}`,project?'Ejecuta aquí la creación del proyecto; la herramienta genera los archivos iniciales.':'Ejecuta aquí los comandos de instalación, desarrollo o build.');
    }
    if(project){
      addFile(c.main,'GENERADO','Archivo de entrada creado por la herramienta.');
      addFile(c.root,'GENERADO','Componente raíz creado por la herramienta.');
      addFile(c.style,'GENERADO','Estilos iniciales creados por la herramienta.');
      add('Revisar',c.main,'Comprueba aquí cómo se inicia o monta la aplicación.');
      add('Modificar',c.root,'Empieza aquí la interfaz principal.');
    }

    const componentName=/saludo|greeting/.test(text)?'Saludo':/contador|counter/.test(text)?'Contador':/lista|renderizado|collection/.test(text)?'Lista':'';
    if(fw==='React'){
      if(/createRoot|ReactDOM/.test(code))add('Modificar',c.main,'Monta <App /> dentro del elemento #root.');
      const path=componentName?`src/components/${componentName}.jsx`:c.root;
      if(/function\s+[A-Z]|useState|props|className|\.map\(/.test(code)){
        add(componentName?'Crear':'Modificar',path,componentName?`Aquí van JSX, props, estado y eventos de ${componentName}.`:'Aquí van JSX, estado y eventos del componente raíz.');
        if(componentName)addFile(path,'MANUAL',`Crea ${componentName}.jsx y luego impórtalo en App.jsx.`);
      }
      if(/className/.test(code))add('Modificar',c.style,'Coloca aquí los estilos de App o importa una hoja específica del componente.');
    }
    if(fw==='Vue'){
      const path=componentName?`src/components/${componentName}.vue`:c.root;
      if(/<template>|<script\s+setup|defineProps|\bref\(/.test(code)){
        add(componentName?'Crear':'Modificar',path,'En este archivo .vue conviven script setup, template y estilos del componente.');
        if(componentName)addFile(path,'MANUAL',`Crea ${componentName}.vue y luego impórtalo en App.vue.`);
      }
      if(/createApp|mount\(/.test(code))add('Modificar',c.main,'Aquí Vue crea la aplicación y monta App en el DOM.');
    }
    if(fw==='Svelte'){
      const path=componentName?`src/lib/${componentName}.svelte`:c.root;
      if(/<script|\$state|\$props|#each|#if|<h[1-6]|<button/.test(code)){
        add(componentName?'Crear':'Modificar',path,'En este archivo .svelte conviven lógica, marcado y estilos.');
        if(componentName)addFile(path,'MANUAL',`Crea ${componentName}.svelte y luego impórtalo desde App.svelte.`);
      }
    }
    if(fw==='Solid.js'){
      const name=componentName||(/Greeting/.test(code)?'Greeting':'');
      const path=name?`src/components/${name}.tsx`:c.root;
      if(/createSignal|createMemo|createEffect|createStore|function\s+[A-Z]|<[A-Za-z]/.test(code)){
        add(name?'Crear':'Modificar',path,name?`Aquí viven el JSX y el estado reactivo de ${name}.`:'Coloca aquí el JSX y el estado reactivo mientras trabajas en App.');
        if(name)addFile(path,'MANUAL',`Crea ${name}.tsx y luego impórtalo en App.tsx.`);
      }
      if(/render\(/.test(code))add('Modificar',c.main,'Aquí Solid monta <App /> en el elemento raíz.');
    }
    if(/router|route|ruta|navigate|navigation/.test(text)){
      const path=fw==='Vue'?'src/router/index.js':fw==='Svelte'?'src/routes/+page.svelte':fw==='Solid.js'?'src/routes/index.tsx':'src/router.jsx';
      add('Crear',path,'Define aquí la navegación y las rutas de la aplicación.');
      addFile(path,'MANUAL','Crea este archivo cuando la lección introduzca navegación.');
    }
    if(!guide.length)add('Modificar',c.root,`Usa ${c.root} como ubicación inicial y extrae componentes cuando tengan responsabilidad propia.`);
    return {guide:guide.slice(0,7),files:files.slice(0,10)};
  };

  sections.forEach((section,index)=>{
    const fw=frameworkOf(section); if(!fw)return;
    section.group=fw; section.primaryArea=fw; section.course=fw;
    if(!Number.isFinite(section.areaOrder))section.areaOrder=100+index;
    const title=String(section.title||'');
    if(title.startsWith(`Frameworks frontend · ${fw}`))section.navLabel=title.split(`Frameworks frontend · ${fw}`).at(-1).replace(/^\s*·?\s*/,'')||'Desde cero';
    else if(title.startsWith('Proyectos con frameworks'))section.navLabel=`Proyecto · ${title.split(' · ').at(-1)}`;
    if(!String(section.description||'').includes('Archivos:'))section.description=`${section.description||''} Archivos: cada lección indica qué archivo crear, cuál modificar y qué comando ejecutar.`.trim();
    section.items?.forEach(item=>{
      const meta=fileInfo(fw,item), current=Array.isArray(item.guide)?item.guide:[], keys=new Set(current.map(entry=>`${entry?.[0]}|${entry?.[1]}`));
      meta.guide.forEach(entry=>{const key=`${entry[0]}|${entry[1]}`;if(!keys.has(key)){keys.add(key);current.push(entry);}});
      item.guide=current;
      item.guideTitle='Dónde se hace cada modificación';
      item.codeLabel=`Código ${fw}`;
      item.filesToCreate=meta.files;
      item.filesToCreateTitle='Archivos que se crean en esta lección';
      item.filesToCreateStatus=meta.files.length?'Estos archivos se crean o aparecen durante esta lección.':'No debes crear archivos nuevos en esta lección; modifica o revisa los indicados abajo.';
      if(item.kind==='Framework frontend'||item.kind==='Proyecto con frameworks')item.kind=fw;
      const visual=previewFor(fw,item); if(visual)item.preview=visual;
    });
  });

  sections.filter(section=>section.primaryArea==='Angular'||/\bAngular\b/i.test(String(section.title||''))).forEach(section=>section.items?.forEach(item=>{
    if(item.name==='Cómo funciona un clic con signal')item.preview='<article style="font-family:system-ui;max-width:500px;padding:24px;border:1px solid #cbd5e1;border-radius:14px;background:#fff;color:#0f172a"><p style="margin:0 0 8px;color:#64748b">Resultado real del componente</p><h2 style="margin:0 0 14px;color:#dd0031">Contador con signal</h2><button type="button" style="padding:10px 16px;border:0;border-radius:9px;background:#dd0031;color:#fff;font-weight:800">Clics: 0</button><p style="margin:14px 0 0;color:#475569">Al hacer clic, el texto pasa a Clics: 1, 2, 3…</p></article>';
  }));

  const areaIndex=new Map(AREAS.map((area,index)=>[area,index])), original=new Map(sections.map((section,index)=>[section,index]));
  sections.sort((a,b)=>{
    const ai=areaIndex.has(a.primaryArea||a.group)?areaIndex.get(a.primaryArea||a.group):AREAS.length;
    const bi=areaIndex.has(b.primaryArea||b.group)?areaIndex.get(b.primaryArea||b.group):AREAS.length;
    if(ai!==bi)return ai-bi;
    return (Number.isFinite(a.areaOrder)?a.areaOrder:1000+original.get(a))-(Number.isFinite(b.areaOrder)?b.areaOrder:1000+original.get(b));
  });
  sections.forEach((section,index)=>section.routeOrder=index+1);
  window.learningPath={...(window.learningPath||{}),areas:AREAS,areaOf:section=>section.primaryArea||section.group||'HTML'};
  window.frameworkCourses=COURSE;
  if(typeof buildNav==='function')buildNav();
  if(typeof render==='function')render();
})();
