(()=>{
  if(window.__angularCategoryGuideAdded)return;
  window.__angularCategoryGuideAdded=true;
  if(!Array.isArray(window.sections))return;

  const normalize=value=>String(value||'')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'')
    .toLowerCase();

  const kebab=value=>String(value||'demo')
    .replace(/([a-z0-9])([A-Z])/g,'$1-$2')
    .replace(/(Component|Page|Service|Store|Guard|Interceptor|Directive|Pipe)$/i,'')
    .replace(/[^a-zA-Z0-9]+/g,'-')
    .replace(/^-|-$/g,'')
    .toLowerCase()||'demo';

  const isAngular=section=>/(?:^| · )Angular(?: ·|$)/i.test(String(section?.title||''));
  const angularSections=sections.filter(isAngular);

  const featureOf=text=>{
    if(/tarea|task/.test(text))return 'tasks';
    if(/producto|product|catalog|inventario|inventory/.test(text))return 'products';
    if(/autentic|auth|login|sesion|session|token|permiso/.test(text))return 'auth';
    if(/carrito|cart/.test(text))return 'cart';
    if(/usuario|user/.test(text))return 'users';
    if(/reporte|report/.test(text))return 'reports';
    if(/dashboard|panel/.test(text))return 'dashboard';
    if(/pedido|order/.test(text))return 'orders';
    if(/saludo|hello|hola/.test(text))return 'greeting';
    if(/contador|counter/.test(text))return 'counter';
    return 'demo';
  };

  const contextOf=(section,item)=>{
    const code=String(item?.code||'');
    const text=normalize(`${section?.title||''} ${item?.topic||item?.tag||''} ${item?.name||''} ${code}`);
    const command=code.match(/ng\s+(?:g|generate)\s+(?:c|component)\s+([^\s#]+)/i)?.[1]?.replace(/^\.\//,'').replace(/\/$/,'');
    const selector=code.match(/selector\s*:\s*['"]app-([^'"]+)['"]/i)?.[1];
    const className=code.match(/export\s+class\s+([A-Za-z0-9_]+)/)?.[1];
    const feature=featureOf(text);
    let base=command?.split('/').filter(Boolean).at(-1)||selector||kebab(className||'');
    if(!base||base==='demo'){
      if(feature==='products')base=/form/.test(text)?'product-form':/detail|detalle/.test(text)?'product-detail':/list|lista/.test(text)?'product-list':'product-card';
      else if(feature==='tasks')base=/form/.test(text)?'task-form':/item/.test(text)?'task-item':/list|lista/.test(text)?'task-list':'tasks-page';
      else if(feature==='auth')base=/guard/.test(text)?'auth-guard':/interceptor/.test(text)?'auth-interceptor':/login/.test(text)?'login-page':'auth';
      else if(feature==='counter')base='counter';
      else if(feature==='greeting')base='saludo';
      else base='demo';
    }
    return {code,text,command,selector,className,feature,base:kebab(base)};
  };

  const explicitPaths=code=>{
    const results=[];
    const regex=/(?:^|[\s`'"(])((?:src|projects|public|\.github)\/[A-Za-z0-9_./-]+\.(?:ts|html|scss|css|json|ya?ml)|(?:package|angular|tsconfig(?:\.[A-Za-z0-9_-]+)?)\.json)/gm;
    let match;
    while((match=regex.exec(code)))results.push(match[1]);
    return results;
  };

  const guideFor=(section,item)=>{
    const {code,text,command,selector,className,feature,base}=contextOf(section,item);
    const guide=[];
    const seen=new Set();
    const add=(action,path,detail)=>{
      const key=`${action}|${path}`;
      if(seen.has(key))return;
      seen.add(key);
      guide.push([action,path,detail]);
    };

    const commandRoot=command?`src/app/${command}`:'';
    const componentRoot=commandRoot||(
      base==='app'
        ? 'src/app'
        : feature==='demo'
          ? `src/app/components/${base}`
          : /page|detail|dashboard|login/.test(base)
            ? `src/app/features/${feature}/pages/${base}`
            : `src/app/features/${feature}/ui/${base}`
    );
    const componentTs=base==='app'?'src/app/app.ts':`${componentRoot}/${base}.ts`;
    const componentHtml=base==='app'?'src/app/app.html':`${componentRoot}/${base}.html`;
    const componentStyle=base==='app'?'src/app/app.scss':`${componentRoot}/${base}.scss`;

    explicitPaths(code).forEach(path=>add('Modificar',path,'Este fragmento menciona directamente este archivo; coloca allí la parte correspondiente del ejemplo.'));

    const commandLines=code.split('\n').filter(line=>/^\s*(?:\$\s*)?(?:npm|npx|ng|node|git|cd)\b/.test(line));
    if(commandLines.length){
      add(
        'Ejecutar',
        /\bng\s+new\b/.test(code)?'Terminal · carpeta donde crearás el proyecto':'Terminal · raíz del proyecto Angular',
        /\bng\s+new\b/.test(code)
          ? 'Ejecuta estos comandos fuera de otro proyecto; ng new creará la carpeta y sus archivos.'
          : 'Abre la terminal en la carpeta que contiene package.json antes de ejecutar los comandos.'
      );
    }

    if(/bootstrapApplication|main\.ts/.test(code))add('Modificar','src/main.ts','Aquí se inicia Angular y se conecta el componente raíz con la configuración global.');
    if(/app\.config|ApplicationConfig|provideRouter|provideHttpClient|withInterceptors/.test(code))add('Modificar','src/app/app.config.ts','Registra aquí providers globales como Router, HttpClient e interceptores.');
    if(/app\.routes\.server|ServerRoute|RenderMode|\bssr\b|prerender|hydrate|hidrat/.test(text))add('Modificar','src/app/app.routes.server.ts','Define aquí qué rutas se renderizan en servidor, en build o solamente en el navegador.');
    if(/server\.ts|CommonEngine|AngularNodeAppEngine/.test(code))add('Modificar','server.ts','Configura aquí el servidor que entrega la aplicación renderizada.');

    if(/Routes|RouterOutlet|routerLink|ActivatedRoute|loadComponent|loadChildren|canActivate|\bruta|\brouter/.test(`${code} ${item?.name||''}`)){
      const routePath=feature!=='demo'&&/loadChildren|PRODUCT_ROUTES|feature|lazy/.test(`${code} ${text}`)
        ? `src/app/features/${feature}/${feature}.routes.ts`
        : 'src/app/app.routes.ts';
      add('Modificar',routePath,'Declara aquí la URL, el componente, los parámetros, guards o la carga diferida.');
      if(/RouterOutlet|router-outlet/.test(code))add('Modificar','src/app/app.html','Coloca <router-outlet /> en la plantilla donde deben aparecer las páginas activas.');
    }

    if(/environment|apiUrl/.test(`${code} ${item?.name||''}`))add('Modificar','src/environments/environment.ts','Guarda aquí configuración pública por entorno; nunca coloques secretos del servidor.');
    if(/package\.json|scripts|npm run/.test(`${code} ${item?.name||''}`)&&!/ng\s+new/.test(code))add('Modificar','package.json','Declara aquí scripts y dependencias del proyecto.');
    if(/angular\.json|budget|budgets/.test(`${code} ${item?.name||''}`))add('Modificar','angular.json','Ajusta aquí opciones de build, estilos, assets y límites de tamaño.');
    if(/github|workflow|actions\/checkout|runs-on|ci\/cd|pipeline/.test(text))add('Crear','.github/workflows/angular-quality.yml','Define aquí la instalación, pruebas y compilación automática del proyecto.');

    if(/CanActivateFn|Guard|\bguard\b/.test(`${code} ${item?.name||''}`))add('Crear','src/app/core/auth/auth.guard.ts','El guard decide si la navegación continúa o redirige; el backend aún debe autorizar la operación.');
    if(/InterceptorFn|interceptor|HttpContextToken/.test(`${code} ${item?.name||''}`))add('Crear','src/app/core/http/auth.interceptor.ts','Transforma aquí peticiones y respuestas HTTP de forma transversal.');

    if(/@Injectable|\bservice\b|servicio|HttpClient/.test(`${code} ${text}`)){
      const servicePath=feature==='auth'
        ? 'src/app/core/auth/auth.service.ts'
        : `src/app/features/${feature==='demo'?'shared':feature}/data-access/${feature==='demo'?'app':feature}.service.ts`;
      add('Crear',servicePath,'Encapsula aquí acceso a datos o lógica reutilizable; el componente debe consumir el servicio mediante inject.');
    }

    if(/\bstore\b|state|estado compartido|asReadonly|readonly.*signal/.test(text)){
      add('Crear',`src/app/features/${feature==='demo'?'shared':feature}/state/${feature==='demo'?'app':feature}.store.ts`,'Conserva aquí el estado escribible privado, lecturas readonly y acciones de la funcionalidad.');
    }

    if(/interface\s+[A-Z]|type\s+[A-Z]|modelo|model/.test(`${code} ${text}`)){
      add('Crear',`src/app/features/${feature==='demo'?'shared':feature}/models/${feature==='demo'?'app':feature}.model.ts`,'Define aquí interfaces y tipos compartidos por la funcionalidad.');
    }

    const componentCode=/@Component|selector\s*:|template(?:Url)?\s*:|\binput\s*\(|\boutput\s*\(|\bsignal\s*\(|\bcomputed\s*\(|\(click\)|\{\{|@if|@for|formControlName|\[formGroup\]/.test(code);
    if(componentCode){
      const inlineTemplate=/template\s*:\s*[`'\"]/.test(code)&&!/templateUrl\s*:/.test(code);
      add('Modificar',componentTs,inlineTemplate
        ? 'Aquí van el decorador @Component, la clase, el estado, los métodos y la plantilla inline de este ejemplo.'
        : 'Aquí van el decorador @Component, imports, estado, inputs, outputs y métodos del componente.');

      const hasTemplateMarkup=/<[a-z][^>]*>|\{\{|@if|@for|\(click\)|\[[A-Za-z]/i.test(code);
      if(!inlineTemplate&&hasTemplateMarkup)add('Modificar',componentHtml,'Coloca aquí el marcado, bindings, eventos y bloques de control de flujo de la plantilla.');

      if(/styleUrl|\.scss|\.css|:host|display\s*:|grid|flex/.test(code))add('Modificar',componentStyle,'Coloca aquí estilos que pertenecen solamente a este componente.');

      if(selector){
        add('Usar','src/app/app.html',`Inserta <app-${selector} /> o impórtalo en la plantilla del componente padre para que aparezca en pantalla.`);
      }else if(/<app-[a-z0-9-]+/i.test(code)){
        const parentPath=feature==='demo'?'src/app/app.html':`src/app/features/${feature}/pages/${feature}-page/${feature}-page.html`;
        add('Modificar',parentPath,'Aquí se usa el selector del componente hijo y se conectan sus inputs y outputs.');
      }
    }

    if(/ReactiveFormsModule|FormBuilder|FormControl|Validators|formControlName|ngModel|FormsModule/.test(code)){
      const formBase=/login/.test(text)?'login-page':feature==='products'?'product-form':feature==='tasks'?'task-form':'form-page';
      const formRoot=feature==='auth'
        ? `src/app/features/auth/pages/${formBase}`
        : `src/app/features/${feature==='demo'?'forms':feature}/ui/${formBase}`;
      add('Modificar',`${formRoot}/${formBase}.ts`,'Crea y valida aquí el modelo del formulario, además del método de envío.');
      add('Modificar',`${formRoot}/${formBase}.html`,'Conecta aquí formGroup, formControlName, mensajes de error y el evento de envío.');
    }

    if(/\.spec\.ts|TestBed|describe\(|\bit\(|HttpTestingController|provideHttpClientTesting/.test(code)){
      add('Crear',componentTs.replace(/\.ts$/,'.spec.ts'),'Escribe aquí las pruebas del componente o adapta el nombre al servicio que se está comprobando.');
    }

    if(/styles\.scss|estilos globales|global/.test(text))add('Modificar','src/styles.scss','Coloca aquí variables, reset y estilos que deben aplicarse a toda la aplicación.');

    if(!guide.length){
      const conceptual=!/[{}();<>=]|\b(?:import|export|class|const|let|function|ng|npm)\b/.test(code);
      if(conceptual){
        add('Estudiar','Sin modificación de archivo','Este bloque es conceptual: úsalo para comprender el flujo antes de escribir código en la siguiente práctica.');
      }else{
        add('Modificar',componentTs,'Usa este archivo como ubicación principal del ejemplo y separa la plantilla en .html cuando el marcado crezca.');
      }
    }

    return guide.slice(0,6);
  };

  angularSections.forEach((section,index)=>{
    section.group='Angular';
    section.primaryArea='Angular';
    section.course='Angular';
    if(!Number.isFinite(section.areaOrder))section.areaOrder=section.title==='Frameworks frontend · Angular'?205:200+index;

    if(section.title==='Frameworks frontend · Angular'){
      section.navLabel='Introducción rápida';
    }else{
      const original=String(section.navLabel||section.title.split(' · Angular · ').at(-1)||section.title);
      section.navLabel=original.replace(/^Angular\s*·\s*/i,'');
    }

    if(!section.description.includes('Convención de archivos:')){
      section.description+=' Convención de archivos: la ruta usa nombres modernos del Angular CLI, como saludo.ts y saludo.html; proyectos anteriores pueden mostrar saludo.component.ts y saludo.component.html.';
    }

    section.items?.forEach(item=>{
      const inferred=guideFor(section,item);
      const current=Array.isArray(item.guide)?item.guide:[];
      const merged=[...current];
      const keys=new Set(current.map(entry=>`${entry?.[0]}|${entry?.[1]}`));
      inferred.forEach(entry=>{
        const key=`${entry[0]}|${entry[1]}`;
        if(!keys.has(key)){keys.add(key);merged.push(entry);}
      });
      item.guide=merged;
      item.guideTitle='Dónde se hace cada modificación';
      item.codeLabel='Código Angular';
      if(item.kind==='Framework frontend')item.kind='Angular';

      const principal=merged.find(([,path])=>!path.startsWith('Terminal')&&path!=='Sin modificación de archivo');
      if(principal&&!String(item.description||'').includes('Archivo principal:')){
        item.description+=` Archivo principal: ${principal[1]}.`;
      }
    });
  });

  window.AngularCourse={
    sections:angularSections,
    fileGuideFor:guideFor
  };
})();
