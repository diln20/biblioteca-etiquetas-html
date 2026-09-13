(()=>{
  if(window.__djangoFrameworkCategoryAdded)return;
  window.__djangoFrameworkCategoryAdded=true;
  if(!Array.isArray(window.sections))return;

  const COURSE='Django Framework';
  const AREAS=['HTML','CSS','JavaScript','Git','APIs','Angular','React','Vue','Svelte','Solid.js','Django Framework','FastAPI','Django REST','Frameworks','Backend'];
  const normalize=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const courseOf=section=>{
    const title=String(section?.title||'');
    return /^Django Framework\s*·/i.test(title)||/^Django\s*\+\s*HTML\s*\/\s*CSS\s*·/i.test(title)||/^Django HTML CSS\s*·/i.test(title);
  };
  const appOf=text=>{
    if(/productos|producto|catalog|tienda|inventario/.test(text))return 'productos';
    if(/blog|post|articulo|artículo/.test(text))return 'blog';
    if(/usuario|perfil|login|registro|auth/.test(text))return 'usuarios';
    return 'inicio';
  };
  const templateOf=(app,text,code)=>{
    if(/base\.html/.test(`${text} ${code}`))return `${app}/templates/${app}/base.html`;
    if(/acerca/.test(text))return `${app}/templates/${app}/acerca.html`;
    if(/contacto/.test(text))return `${app}/templates/${app}/contacto.html`;
    if(/detalle|detail/.test(text))return `${app}/templates/${app}/detalle.html`;
    if(/lista|list|productos/.test(text)&&app==='productos')return `${app}/templates/${app}/lista.html`;
    if(/formulario|form|crear|editar/.test(text)&&app!=='inicio')return `${app}/templates/${app}/form.html`;
    if(/login/.test(text))return `registration/login.html`;
    return `${app}/templates/${app}/index.html`;
  };

  const fileInfo=(section,item)=>{
    const code=String(item?.code||'');
    const text=normalize(`${section?.title||''} ${item?.topic||item?.tag||''} ${item?.name||''} ${item?.description||''} ${code}`);
    const app=appOf(text);
    const guide=[];
    const files=[];
    const seen=new Set();
    const add=(action,path,detail)=>{const key=`${action}|${path}`;if(!seen.has(key)){seen.add(key);guide.push([action,path,detail]);}};
    const addFile=(path,method,detail,command='')=>{if(!files.some(file=>file.path===path))files.push({path,method,detail,command});};

    if(code.split('\n').some(line=>/^\s*(?:python|django-admin|pip|cd|mkdir|deactivate)\b/.test(line))){
      add('Ejecutar','Terminal · raíz del proyecto Django','Ejecuta aquí creación del entorno, comandos manage.py, instalación, migraciones, pruebas o servidor de desarrollo.');
    }
    if(/python\s+-m\s+venv/.test(code)){
      addFile('.venv/','PYTHON','Entorno virtual local. No debe subirse al repositorio.','python -m venv .venv');
      addFile('requirements.txt','MANUAL','Guarda las dependencias instaladas para reproducir el proyecto.','python -m pip freeze > requirements.txt');
    }
    if(/startproject\s+config/.test(code)){
      ['manage.py','config/settings.py','config/urls.py','config/asgi.py','config/wsgi.py'].forEach(path=>addFile(path,'DJANGO','Generado automáticamente por startproject.','django-admin startproject config .'));
      add('Revisar','config/settings.py','Configuración global del sitio: apps, templates, static, base de datos, idioma y seguridad.');
      add('Revisar','config/urls.py','Mapa principal de URLs del proyecto.');
    }
    const startApp=code.match(/startapp\s+([\w-]+)/);
    if(startApp){
      const created=startApp[1];
      [`${created}/models.py`,`${created}/views.py`,`${created}/admin.py`,`${created}/tests.py`,`${created}/apps.py`,`${created}/migrations/__init__.py`].forEach(path=>addFile(path,'DJANGO','Generado automáticamente por manage.py startapp.','python manage.py startapp '+created));
      add('Modificar','config/settings.py',`Registra "${created}" en INSTALLED_APPS para que Django cargue la aplicación.`);
    }
    if(/INSTALLED_APPS|TEMPLATES|STATIC_URL|STATICFILES|MEDIA_URL|LOGIN_URL|settings\.py/.test(`${code} ${text}`)){
      add('Modificar','config/settings.py','Ajusta aquí configuración global, aplicaciones instaladas, templates y archivos static.');
    }
    if(/config\/urls\.py|include\(|admin\.site\.urls/.test(`${code} ${text}`)){
      add('Modificar','config/urls.py','Incluye aquí las URLs de cada app y rutas globales como /admin/.');
    }
    if(/urlpatterns|from django\.urls import path|app_name\s*=/.test(code)){
      const path=`${app}/urls.py`;
      add('Crear',path,'Define las rutas propias de esta app y conecta cada path con una view.');
      addFile(path,'MANUAL','startapp no crea urls.py; créalo cuando la app necesite páginas.');
    }
    if(/render\(|HttpResponse|redirect\(|get_object_or_404|class\s+\w+View/.test(code)||/views\.py/.test(text)){
      add('Modificar',`${app}/views.py`,'Recibe request, prepara contexto, consulta modelos y devuelve render(), redirect() u otra respuesta.');
    }
    if(/render\([^\n]*["'][^"']+\.html/.test(code)||/{{|{%|<html|<h1|<form|<section|extends\s+["']/.test(code)){
      const path=templateOf(app,text,code);
      add('Crear',path,'Escribe aquí el HTML y las etiquetas de template de Django para esta página.');
      addFile(path,'MANUAL','Los templates se crean manualmente dentro de templates/<app>/.');
    }
    if(/base\.html/.test(`${code} ${text}`)&&!files.some(file=>file.path.endsWith('/base.html'))){
      const path=`${app}/templates/${app}/base.html`;
      add('Crear',path,'Define el layout compartido, navegación y bloques reutilizables.');
      addFile(path,'MANUAL','Crea la plantilla base antes de duplicar header y footer entre páginas.');
    }
    if(/load static|static\s+["']|styles\.css|\.hero|\.card|@media|background:|font-family/.test(`${code} ${text}`)){
      const path=`${app}/static/${app}/css/styles.css`;
      add('Crear',path,'Coloca aquí los estilos CSS de la app y enlázalos con {% static %}.');
      addFile(path,'MANUAL','Crea la hoja CSS dentro del namespace static de la app.');
    }
    if(/models\.Model|models\.(?:CharField|TextField|DecimalField|IntegerField|BooleanField|DateTimeField|ForeignKey|ImageField)|class\s+\w+\(models\.Model\)/.test(code)){
      add('Modificar',`${app}/models.py`,'Define aquí tablas, campos, relaciones y reglas cercanas a los datos.');
    }
    if(/makemigrations|migrate|migration/.test(text)){
      const path=`${app}/migrations/<revision>.py`;
      add('Generar',path,'Django crea este archivo desde los cambios en models.py; versiona las migraciones en Git.');
      addFile(path,'DJANGO','Generado por makemigrations.','python manage.py makemigrations');
    }
    if(/forms\.Form|forms\.ModelForm|from django import forms|form\.as_p|csrf_token/.test(`${code} ${text}`)){
      const path=`${app}/forms.py`;
      add('Crear',path,'Define formularios, campos y validaciones de servidor para las páginas HTML.');
      addFile(path,'MANUAL','startapp no crea forms.py; créalo cuando necesites formularios Django.');
      if(/<form|csrf_token/.test(code)){
        const template=templateOf(app,text,code);
        add('Modificar',template,'Coloca aquí <form>, {% csrf_token %}, campos y mensajes de error.');
      }
    }
    if(/admin\.site|ModelAdmin|admin\.py/.test(`${code} ${text}`)){
      add('Modificar',`${app}/admin.py`,'Registra modelos y configura cómo se muestran en el panel /admin/.');
    }
    if(/createsuperuser/.test(code))add('Ejecutar','Terminal · raíz del proyecto Django','Crea un usuario administrador para entrar en /admin/.');
    if(/login_required|LoginView|LogoutView|authenticate|UserCreationForm|registration\//.test(`${code} ${text}`)){
      add('Modificar','config/settings.py','Configura URLs de login, redirecciones y ajustes de autenticación cuando sea necesario.');
    }
    if(/test|TestCase|Client\(|assertTemplateUsed|assertContains/.test(text)){
      add('Modificar',`${app}/tests.py`,'Escribe aquí pruebas de URLs, views, templates, formularios y modelos.');
    }
    if(/collectstatic|STATIC_ROOT/.test(`${code} ${text}`))add('Modificar','config/settings.py','Configura STATIC_ROOT para recopilar archivos static en producción.');
    if(/requirements\.txt/.test(code))add('Modificar','requirements.txt','Registra las dependencias reproducibles del sitio.');

    if(!guide.length)add('Estudiar','Sin modificación de archivo','Este bloque es conceptual. Comprende el flujo antes de modificar archivos.');
    return {guide:guide.slice(0,9),files:files.slice(0,14)};
  };

  sections.forEach((section,index)=>{
    if(!courseOf(section))return;
    const oldTitle=String(section.title||'');
    if(/^Django\s*\+\s*HTML\s*\/\s*CSS\s*·/i.test(oldTitle))section.title=oldTitle.replace(/^Django\s*\+\s*HTML\s*\/\s*CSS\s*·\s*/i,'Django Framework · ');
    else if(/^Django HTML CSS\s*·/i.test(oldTitle))section.title=oldTitle.replace(/^Django HTML CSS\s*·\s*/i,'Django Framework · ');

    section.group=COURSE;
    section.primaryArea=COURSE;
    section.course=COURSE;
    if(!Number.isFinite(section.areaOrder)){
      const n=Number(String(section.title||'').match(/·\s*(\d+)/)?.[1]||0);
      section.areaOrder=n?100+n*10:100+index;
    }
    section.navLabel=String(section.title||'').replace(/^Django Framework\s*·\s*/i,'')||'Desde cero';
    if(!String(section.description||'').includes('Archivos:'))section.description=`${section.description||''} Archivos: cada lección indica qué crear, qué modificar, qué comando ejecutar y qué resultado debe aparecer en el navegador.`.trim();

    section.items?.forEach(item=>{
      const meta=fileInfo(section,item);
      const current=Array.isArray(item.guide)?item.guide:[];
      const keys=new Set(current.map(entry=>`${entry?.[0]}|${entry?.[1]}`));
      meta.guide.forEach(entry=>{const key=`${entry[0]}|${entry[1]}`;if(!keys.has(key)){keys.add(key);current.push(entry);}});
      item.guide=current;
      item.guideTitle='Dónde se hace cada modificación';
      item.filesToCreate=meta.files;
      item.filesToCreateTitle='Archivos que se crean en esta lección';
      item.filesToCreateStatus=meta.files.length?'Estos archivos se crean o aparecen durante esta lección.':'No debes crear archivos nuevos en esta lección; modifica o revisa los archivos indicados abajo.';
      item.codeLabel='Código Django Framework';
      if(String(item.kind||'').includes('Django'))item.kind=COURSE;
    });
  });

  const areaIndex=new Map(AREAS.map((area,index)=>[area,index]));
  const original=new Map(sections.map((section,index)=>[section,index]));
  sections.sort((a,b)=>{
    const aa=a.primaryArea||a.group||'HTML', ba=b.primaryArea||b.group||'HTML';
    const ai=areaIndex.has(aa)?areaIndex.get(aa):AREAS.length;
    const bi=areaIndex.has(ba)?areaIndex.get(ba):AREAS.length;
    if(ai!==bi)return ai-bi;
    return (Number.isFinite(a.areaOrder)?a.areaOrder:1000+original.get(a))-(Number.isFinite(b.areaOrder)?b.areaOrder:1000+original.get(b));
  });
  sections.forEach((section,index)=>section.routeOrder=index+1);
  window.learningPath={...(window.learningPath||{}),areas:AREAS,areaOf:section=>section.primaryArea||section.group||'HTML'};
  window.djangoFrameworkCourse=COURSE;
  if(typeof buildNav==='function')buildNav();
  if(typeof render==='function')render();
})();
