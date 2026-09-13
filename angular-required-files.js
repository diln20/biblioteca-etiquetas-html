(()=>{
  if(window.__angularRequiredFilesAdded)return;
  window.__angularRequiredFilesAdded=true;
  if(!Array.isArray(window.sections))return;

  const builtInFiles=new Set([
    'package.json','package-lock.json','angular.json','tsconfig.json','tsconfig.app.json','tsconfig.spec.json',
    'src/index.html','src/main.ts','src/styles.scss','src/styles.css',
    'src/app/app.ts','src/app/app.html','src/app/app.scss','src/app/app.css',
    'src/app/app.config.ts','src/app/app.routes.ts'
  ]);

  const normalize=value=>String(value||'').trim();
  const isAngular=section=>section?.primaryArea==='Angular'||section?.group==='Angular'||/\bAngular\b/i.test(String(section?.title||''));
  const isFilePath=path=>/^(?:src|projects|public|\.github)\//.test(path)||/^(?:server\.ts|package\.json|angular\.json|tsconfig(?:\.[\w-]+)?\.json)$/.test(path);
  const isRootFile=path=>builtInFiles.has(path);
  const isGeneratedFeatureFile=path=>/^src\/app\/(?:components|features|core|shared)\//.test(path)&&/\.(?:ts|html|scss|css)$/.test(path);
  const isComponentTypeScript=path=>{
    if(!/^src\/app\/.+\.ts$/.test(path)||/\.spec\.ts$/.test(path))return false;
    if(/\.(?:service|store|model|guard|interceptor|directive|pipe|routes|config)\.ts$/.test(path))return false;
    if(/\/(?:models|state|data-access)\//.test(path))return false;
    return !isRootFile(path);
  };

  const commandFor=(path,code)=>{
    if(path==='src/app/app.routes.server.ts'||path==='server.ts')return 'ng add @angular/ssr';
    if(path.startsWith('.github/'))return '';
    if(path.startsWith('projects/'))return 'ng generate library nombre-de-la-libreria';

    const relative=path.replace(/^src\/app\//,'');
    if(/\.service\.ts$/.test(path))return `ng generate service ${relative.replace(/\.service\.ts$/,'')}`;
    if(/\.guard\.ts$/.test(path))return `ng generate guard ${relative.replace(/\.guard\.ts$/,'')}`;
    if(/\.interceptor\.ts$/.test(path))return `ng generate interceptor ${relative.replace(/\.interceptor\.ts$/,'')}`;
    if(/\.pipe\.ts$/.test(path))return `ng generate pipe ${relative.replace(/\.pipe\.ts$/,'')}`;
    if(/\.directive\.ts$/.test(path))return `ng generate directive ${relative.replace(/\.directive\.ts$/,'')}`;

    if(isComponentTypeScript(path)){
      const parts=relative.split('/');
      parts.pop();
      const folder=parts.join('/');
      const inlineTemplate=/template\s*:\s*[`'"]/.test(code)&&!/templateUrl\s*:/.test(code);
      const inlineStyle=/styles?\s*:\s*[`'"\[]/.test(code)&&!/styleUrl\s*:/.test(code);
      return `ng generate component ${folder}${inlineTemplate?' --inline-template':''}${inlineStyle?' --inline-style':''}`;
    }

    return '';
  };

  const methodFor=(path,command)=>{
    if(command)return command.startsWith('ng new ')?'NG NEW':'ANGULAR CLI';
    if(path.startsWith('.github/'))return 'MANUAL';
    if(/\.(?:routes|model|store)\.ts$/.test(path)||path.includes('/models/')||path.includes('/state/'))return 'MANUAL';
    if(path==='src/environments/environment.ts')return 'MANUAL';
    return 'MANUAL';
  };

  const detailFor=(path,method)=>{
    if(method==='NG NEW')return 'Angular CLI genera este archivo automáticamente al crear el proyecto; no lo escribas a mano.';
    if(method==='ANGULAR CLI')return 'Créalo una sola vez con el comando indicado. Si ya existe por una lección anterior, continúa modificándolo.';
    if(path.startsWith('.github/'))return 'Crea este archivo manualmente dentro del repositorio para definir la automatización.';
    if(path.includes('/models/'))return 'Crea este archivo manualmente para guardar interfaces y tipos de la funcionalidad.';
    if(path.includes('/state/')||/\.store\.ts$/.test(path))return 'Crea este archivo manualmente para concentrar el estado y sus acciones.';
    if(/\.routes\.ts$/.test(path))return 'Crea este archivo manualmente para declarar las rutas propias de la funcionalidad.';
    if(path==='src/environments/environment.ts')return 'Crea este archivo manualmente si tu versión de Angular CLI no lo generó.';
    return 'Crea este archivo antes de pegar el código. Si ya existe, úsalo como archivo de modificación.';
  };

  const addUnique=(target,entry,seen)=>{
    const key=entry.path;
    if(!entry.path||seen.has(key))return;
    seen.add(key);
    target.push(entry);
  };

  sections.filter(isAngular).forEach(section=>{
    section.items?.forEach(item=>{
      const code=String(item.code||'');
      const guide=Array.isArray(item.guide)?item.guide:[];
      const files=[];
      const seen=new Set();
      const ngNewLine=code.split('\n').map(line=>line.trim().replace(/^\$\s*/,''))
        .find(line=>/^ng\s+new\b/.test(line));

      if(ngNewLine){
        [
          'src/app/app.ts','src/app/app.html','src/app/app.scss',
          'src/app/app.config.ts','src/app/app.routes.ts'
        ].forEach(path=>addUnique(files,{
          path,
          method:'NG NEW',
          command:ngNewLine,
          detail:detailFor(path,'NG NEW')
        },seen));
      }

      guide.forEach(([action,rawPath])=>{
        const path=normalize(rawPath);
        if(!isFilePath(path)||path==='Sin modificación de archivo'||path.startsWith('Terminal'))return;
        const createAction=/^crear/i.test(String(action||''));
        const shouldCreate=createAction||(!isRootFile(path)&&(
          isGeneratedFeatureFile(path)||
          path==='src/app/app.routes.server.ts'||path==='server.ts'||
          path==='src/environments/environment.ts'||
          path.startsWith('.github/')||path.startsWith('projects/')
        ));
        if(!shouldCreate)return;
        const command=commandFor(path,code);
        const method=methodFor(path,command);
        addUnique(files,{path,method,command,detail:detailFor(path,method)},seen);
      });

      const componentPaths=guide
        .map(([,path])=>normalize(path))
        .filter(isComponentTypeScript);

      componentPaths.forEach(componentTs=>{
        const command=commandFor(componentTs,code);
        const method='ANGULAR CLI';
        const folder=componentTs.slice(0,componentTs.lastIndexOf('/'));
        const fileName=componentTs.slice(componentTs.lastIndexOf('/')+1,-3);
        const inlineTemplate=/template\s*:\s*[`'"]/.test(code)&&!/templateUrl\s*:/.test(code);
        const inlineStyle=/styles?\s*:\s*[`'"\[]/.test(code)&&!/styleUrl\s*:/.test(code);
        const generated=[componentTs];
        if(!inlineTemplate)generated.push(`${folder}/${fileName}.html`);
        if(!inlineStyle)generated.push(`${folder}/${fileName}.scss`);
        generated.push(`${folder}/${fileName}.spec.ts`);
        generated.forEach(path=>addUnique(files,{
          path,
          method,
          command,
          detail:detailFor(path,method)
        },seen));
      });

      item.filesToCreate=files.slice(0,12);
      item.filesToCreateTitle='Archivos que se crean en esta lección';
      item.filesToCreateStatus=files.length
        ? `${files.length} ${files.length===1?'archivo':'archivos'} para crear o generar antes de continuar.`
        : 'No debes crear archivos nuevos en esta lección; modifica los archivos existentes indicados abajo.';
    });
  });
})();
