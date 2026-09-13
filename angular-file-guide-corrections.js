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

      if(selector){
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

      const unique=[];
      const seen=new Set();
      guide.forEach(entry=>{
        const key=`${entry?.[0]}|${entry?.[1]}`;
        if(!seen.has(key)){seen.add(key);unique.push(entry);}
      });
      item.guide=unique.slice(0,7);
    }));
})();
