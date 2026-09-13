(()=>{
  if(window.__angularFileGuideCorrectionsAdded)return;
  window.__angularFileGuideCorrectionsAdded=true;
  if(!Array.isArray(window.sections))return;

  const normalize=value=>String(value||'')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'')
    .toLowerCase();

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

  const simpleFeatures=new Set(['demo','greeting','counter']);
  const fixPath=path=>String(path||'')
    .replace(/^src\/app\/features\/(?:greeting|counter)\/ui\//,'src/app/components/')
    .replace(/^src\/app\/features\/shared\/ui\//,'src/app/components/');

  sections
    .filter(section=>section?.primaryArea==='Angular'||section?.group==='Angular')
    .forEach(section=>section.items?.forEach(item=>{
      const code=String(item.code||'');
      const text=normalize(`${section.title} ${item.topic||item.tag||''} ${item.name||''} ${code}`);
      const feature=featureOf(text);
      const selector=code.match(/selector\s*:\s*['"]app-([^'"]+)['"]/i)?.[1];
      const className=code.match(/export\s+class\s+([A-Za-z0-9_]+)/)?.[1]||'El componente';
      const componentCommand=code.match(/ng\s+(?:g|generate)\s+(?:c|component)\s+([^\s#]+)/i)?.[1]
        ?.replace(/^\.\//,'')
        .replace(/^src\/app\//,'')
        .replace(/\/$/,'');

      let guide=(Array.isArray(item.guide)?item.guide:[]).map(([action,path,detail])=>[
        action,
        fixPath(path),
        String(detail||'')
          .replaceAll('src/app/features/greeting/ui/','src/app/components/')
          .replaceAll('src/app/features/counter/ui/','src/app/components/')
      ]);

      if(typeof item.description==='string'){
        item.description=item.description
          .replaceAll('src/app/features/greeting/ui/','src/app/components/')
          .replaceAll('src/app/features/counter/ui/','src/app/components/');
      }

      if(selector==='root'){
        const rootPath=path=>String(path)
          .replace(/^src\/app\/components\/(?:app-root|root)\/(?:app-root|root)\.(ts|html|scss|css|spec\.ts)$/,'src/app/app.$1')
          .replace(/^src\/app\/features\/greeting\/ui\/(?:app-root|root)\/(?:app-root|root)\.(ts|html|scss|css|spec\.ts)$/,'src/app/app.$1');
        guide=guide.map(([action,path,detail])=>[action,rootPath(path),detail]);
        if(/template\s*:\s*[`'"]/.test(code))guide=guide.filter(([,path])=>path!=='src/app/app.html');
        guide=guide.filter(([,path,detail])=>!(String(path).startsWith('Terminal')&&String(detail).includes('component root')));
        if(typeof item.description==='string'){
          item.description=item.description
            .replaceAll('src/app/components/root/root.ts','src/app/app.ts')
            .replaceAll('src/app/components/app-root/app-root.ts','src/app/app.ts')
            .replaceAll('src/app/features/greeting/ui/root/root.ts','src/app/app.ts')
            .replaceAll('src/app/features/greeting/ui/app-root/app-root.ts','src/app/app.ts');
        }
      }

      if(componentCommand){
        const parts=componentCommand.split('/').filter(Boolean);
        const componentName=parts.at(-1);
        const componentRoot=`src/app/${componentCommand}`;
        const generated=[
          ['Crear',`${componentRoot}/${componentName}.ts`,'Aquí quedan el decorador @Component, la clase TypeScript, el estado, los inputs, los outputs y los métodos.'],
          ['Crear',`${componentRoot}/${componentName}.html`,'Aquí queda la plantilla HTML cuando el componente usa templateUrl.'],
          ['Crear',`${componentRoot}/${componentName}.scss`,'Aquí quedan los estilos locales del componente cuando el proyecto utiliza SCSS.'],
          ['Crear',`${componentRoot}/${componentName}.spec.ts`,'Aquí quedan las pruebas del componente generadas por Angular CLI.']
        ];
        generated.forEach(entry=>{
          if(!guide.some(([,path])=>path===entry[1]))guide.push(entry);
        });
      }

      if(selector&&selector!=='root'){
        const componentEntry=guide.find(([,path])=>String(path).endsWith(`/${selector}.ts`));
        const componentPath=componentEntry?.[1]||(
          simpleFeatures.has(feature)
            ? `src/app/components/${selector}/${selector}.ts`
            : `src/app/features/${feature}/ui/${selector}/${selector}.ts`
        );
        const componentFolder=componentPath.replace(/^src\/app\//,'').replace(/\/[A-Za-z0-9-]+\.ts$/,'');
        const parentBase=simpleFeatures.has(feature)
          ? 'src/app/app'
          : `src/app/features/${feature}/pages/${feature}-page/${feature}-page`;
        const parentTs=`${parentBase}.ts`;
        const parentHtml=`${parentBase}.html`;

        guide=guide.filter(([,path])=>!(path==='src/app/app.html'||path===parentHtml||path===parentTs));

        const commandEntry=[
          'Ejecutar',
          'Terminal · raíz del proyecto Angular',
          `Ejecuta ng generate component ${componentFolder} para crear el componente y sus archivos antes de pegar el ejemplo.`
        ];
        const parentTypeScript=[
          'Modificar',
          parentTs,
          `Importa ${className} y agrégalo al arreglo imports del componente padre para que Angular reconozca <app-${selector}>.`
        ];
        const parentTemplate=[
          'Modificar',
          parentHtml,
          `Escribe <app-${selector} /> en la posición donde debe mostrarse el componente.`
        ];

        const hasCommand=guide.some(([,path,detail])=>String(path).startsWith('Terminal')&&String(detail).includes(`component ${componentFolder}`));
        if(!hasCommand)guide.unshift(commandEntry);
        guide.push(parentTypeScript,parentTemplate);
      }

      // La ruta "Desde cero" trabaja con el componente raíz. No debe inventar
      // components/demo: cada bloque señala exactamente el archivo real que el
      // estudiante modifica o el lugar donde ejecuta el comando.
      if(String(section.title).includes('Angular · Desde cero')){
        const terminal=['Ejecutar','Terminal · raíz del proyecto Angular','Ejecuta aquí los comandos ng serve, ng build y demás comandos del proyecto.'];
        const appTs=['Modificar','src/app/app.ts','Coloca aquí imports, propiedades, signals y métodos del componente raíz.'];
        const appHtml=['Modificar','src/app/app.html','Coloca aquí el HTML, interpolaciones, bindings y eventos que se muestran en pantalla.'];
        const appScss=['Modificar','src/app/app.scss','Coloca aquí los estilos que pertenecen al componente raíz.'];

        if(item.name==='Qué debes instalar y por qué'){
          guide=[['Ejecutar','Terminal · cualquier carpeta','Comprueba Node.js y npm e instala Angular CLI globalmente. Todavía no modificas archivos del proyecto.']];
        }else if(item.name==='Qué hace exactamente ng new'){
          guide=[['Ejecutar','Terminal · carpeta donde crearás el proyecto','Ejecuta ng new aquí. Angular CLI creará la carpeta del proyecto y los archivos iniciales automáticamente.']];
        }else if(item.name==='Qué función cumple cada archivo principal'){
          guide=[
            ['Revisar','src/main.ts','Punto de arranque de Angular.'],
            ['Revisar','src/app/app.ts','Clase, estado y comportamiento del componente raíz.'],
            ['Revisar','src/app/app.html','Plantilla HTML del componente raíz.'],
            ['Revisar','src/app/app.scss','Estilos locales del componente raíz.'],
            ['Revisar','src/app/app.config.ts','Providers globales de la aplicación.'],
            ['Revisar','src/app/app.routes.ts','Rutas principales de la aplicación.']
          ];
        }else if(item.name==='Qué ocurre cuando ejecutas ng serve'){
          guide=[terminal,['Revisar','angular.json','Angular CLI lee este archivo para conocer la configuración de build y serve.']];
        }else if(item.name==='Cómo llega un dato desde TypeScript hasta la pantalla'){
          guide=[appTs,appHtml,appScss];
        }else if(item.name==='Cómo funciona un clic con signal'){
          guide=[['Modificar','src/app/app.ts','En este ejemplo la plantilla está inline dentro de @Component; coloca aquí la signal, el método y template.']];
        }else if(item.name==='Mini aplicación desde una carpeta vacía'){
          guide=[
            ['Ejecutar','Terminal · carpeta donde crearás el proyecto','Ejecuta ng new perfil-angular, entra con cd perfil-angular y usa ng serve.'],
            appTs,
            appHtml,
            appScss,
            ['Ejecutar','Terminal · raíz de perfil-angular','Cuando termine el ejercicio, ejecuta ng build para comprobar la compilación de producción.']
          ];
        }
      }

      const unique=[];
      const seen=new Set();
      guide.forEach(entry=>{
        const key=`${entry?.[0]}|${entry?.[1]}`;
        if(!seen.has(key)){seen.add(key);unique.push(entry);}
      });
      item.guide=unique.slice(0,8);
    }));
})();
