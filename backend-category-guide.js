(()=>{
  if(window.__backendCourseCategoriesAdded)return;
  window.__backendCourseCategoriesAdded=true;
  if(!Array.isArray(window.sections))return;

  const COURSES=['FastAPI','Django REST'];
  const AREAS=['HTML','CSS','JavaScript','Git','APIs','Angular','React','Vue','Svelte','Solid.js','FastAPI','Django REST','Frameworks','Backend'];
  const normalize=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const response=(course,method,path,status,body)=>`<section style="font-family:system-ui;border:1px solid #cbd5e1;border-radius:12px;overflow:hidden;background:#fff;color:#0f172a"><header style="padding:10px 14px;background:#0f172a;color:#fff"><strong style="color:${course==='FastAPI'?'#2dd4bf':'#34d399'}">${method}</strong> ${path} · ${status}</header><pre style="margin:0;padding:16px;background:#fff;color:#334155;white-space:pre-wrap">${body}</pre></section>`;

  const courseOf=section=>{
    const title=String(section?.title||'');
    if(/^Backend FastAPI\s*·/i.test(title))return 'FastAPI';
    if(/^Django REST\s*·/i.test(title))return 'Django REST';
    return '';
  };

  const featureOf=text=>{
    if(/producto|product|catalog|inventario|inventory/.test(text))return 'products';
    if(/venta|sale/.test(text))return 'sales';
    if(/pedido|order/.test(text))return 'orders';
    if(/usuario|user|auth|login|token|permiso/.test(text))return 'auth';
    return 'general';
  };

  const djangoAppOf=text=>{
    if(/usuario|auth|login|token|permiso/.test(text))return 'usuarios';
    if(/pedido|order/.test(text))return 'pedidos';
    if(/venta|sale/.test(text))return 'ventas';
    return 'productos';
  };

  const previewFor=(course,item)=>{
    const code=String(item?.code||'');
    const text=normalize(`${item?.topic||item?.tag||''} ${item?.name||''}`);
    if(course==='FastAPI'){
      if(/@app\.get\(["']\/["']\)/.test(code))return response(course,'GET','/','200','{\n  "message": "Hola desde FastAPI"\n}');
      if(/@(?:app|router)\.get/.test(code)&&/product|producto/.test(`${code} ${text}`))return response(course,'GET','/products','200','[\n  {"id": 1, "name": "Teclado"}\n]');
      if(/@(?:app|router)\.post/.test(code)&&/product|producto/.test(`${code} ${text}`))return response(course,'POST','/products','201','{\n  "id": 1,\n  "name": "Teclado",\n  "price": 180000,\n  "stock": 4\n}');
      if(/HTTPException/.test(code)&&/404/.test(code))return response(course,'GET','/products/99','404','{\n  "detail": "Producto no encontrado"\n}');
    }
    if(course==='Django REST'){
      if(/@api_view/.test(code)&&/hello|hola/.test(`${code} ${text}`))return response(course,'GET','/api/hello/','200','{\n  "message": "Hola desde Django REST"\n}');
      if(/ModelViewSet|APIView|ListCreateAPIView/.test(code)&&/producto|product/.test(`${code} ${text}`))return response(course,'GET','/api/productos/','200','[\n  {"id": 1, "nombre": "Teclado", "precio": "180000.00", "stock": 4}\n]');
      if(/serializers\.ModelSerializer/.test(code)&&/Producto/.test(code))return response(course,'POST','/api/productos/','201','{\n  "id": 1,\n  "nombre": "Teclado",\n  "precio": "180000.00",\n  "stock": 4\n}');
    }
    return '';
  };

  const fastApiGuide=(section,item)=>{
    const code=String(item?.code||'');
    const text=normalize(`${section?.title||''} ${item?.topic||item?.tag||''} ${item?.name||''} ${code}`);
    const feature=featureOf(text);
    const guide=[];
    const files=[];
    const seen=new Set();
    const add=(action,path,detail)=>{const key=`${action}|${path}`;if(!seen.has(key)){seen.add(key);guide.push([action,path,detail]);}};
    const addFile=(path,method,detail,command='')=>{if(!files.some(file=>file.path===path))files.push({path,method,detail,command});};
    const routeName=feature==='general'?'health':feature;

    if(/^\s*(?:python|pip|uvicorn|alembic|pytest|docker|psql|createdb|cd|mkdir)/m.test(code))add('Ejecutar','Terminal · raíz del proyecto FastAPI','Ejecuta aquí comandos del entorno, servidor, migraciones, pruebas o herramientas de infraestructura.');
    if(/python\s+-m\s+venv/.test(code)){addFile('.venv/','PYTHON','El entorno virtual se crea con venv y no se sube a Git.','python -m venv .venv');addFile('requirements.txt','MANUAL','Registra las dependencias para reproducir el entorno.','python -m pip freeze > requirements.txt');}
    if(/FastAPI\(|@app\.|include_router|CORSMiddleware/.test(code)){add('Modificar','app/main.py','Crea la aplicación FastAPI, registra middleware y conecta routers aquí.');addFile('app/main.py','MANUAL','Punto de entrada de la API.');}
    if(/APIRouter|@router\./.test(code)){const path=`app/api/routes/${routeName}.py`;add('Crear',path,'Define aquí endpoints HTTP de esta funcionalidad usando APIRouter.');addFile(path,'MANUAL','Crea el router cuando la funcionalidad tenga sus propias rutas.');}
    if(/BaseModel|Field\(|model_dump|response_model/.test(code)){const path=`app/schemas/${feature==='general'?'common':feature}.py`;add('Crear',path,'Define aquí contratos Pydantic de entrada y salida.');addFile(path,'MANUAL','Crea los schemas usados por la API.');}
    if(/DeclarativeBase|Mapped\[|mapped_column|relationship|__tablename__/.test(code)){const path=`app/models/${feature==='general'?'base':feature}.py`;add('Crear',path,'Define aquí modelos SQLAlchemy que representan tablas y relaciones.');addFile(path,'MANUAL','Crea el modelo ORM de esta funcionalidad.');}
    if(/create_engine|sessionmaker|SessionLocal|get_db|AsyncSession/.test(code)){add('Crear','app/core/database.py','Configura aquí engine, fábrica de sesiones y dependencia de base de datos.');addFile('app/core/database.py','MANUAL','Centraliza la conexión y sesiones de SQLAlchemy.');}
    if(/BaseSettings|Settings|DATABASE_URL|environment|\.env/.test(`${code} ${text}`)){add('Crear','app/core/config.py','Lee y valida aquí variables de entorno y configuración pública del backend.');addFile('app/core/config.py','MANUAL','Centraliza configuración tipada.');add('Crear','.env','Guarda valores locales como DATABASE_URL fuera del código versionado.');addFile('.env','MANUAL','Archivo local; agrega .env al .gitignore.');}
    if(/service|servicio|product_service|sale_service|regla de negocio/.test(text)){const path=`app/services/${feature==='general'?'app':feature}.py`;add('Crear',path,'Coloca aquí reglas de negocio y coordinación de persistencia reutilizable.');addFile(path,'MANUAL','Extrae reglas cuando dejan de pertenecer al endpoint.');}
    if(/HTTPException|status_code|exception_handler/.test(code)&&!guide.some(([,path])=>path.includes('/routes/'))){add('Modificar',guide.find(([,path])=>path==='app/main.py')?'app/main.py':`app/api/routes/${routeName}.py`,'Implementa aquí la respuesta HTTP o manejo de errores del ejemplo.');}
    if(/OAuth2|JWT|jwt|password|hash|security|token/.test(text)){add('Crear','app/core/security.py','Concentra aquí hash de contraseñas, tokens y utilidades de seguridad.');addFile('app/core/security.py','MANUAL','No mezcles secretos ni algoritmos de autenticación dentro de routers.');}
    if(/alembic|migration|migracion/.test(text)){add('Modificar','alembic.ini','Configura Alembic para el proyecto.');add('Crear','alembic/versions/<revision>.py','Cada migración describe un cambio reproducible del esquema.');addFile('alembic/versions/<revision>.py','ALEMBIC','Se genera con alembic revision --autogenerate.','alembic revision --autogenerate -m "change"');}
    if(/pytest|TestClient|test_/.test(`${code} ${text}`)){const path=`tests/test_${feature==='general'?'app':feature}.py`;add('Crear',path,'Escribe aquí pruebas de endpoints y reglas sin depender de acciones manuales.');addFile(path,'MANUAL','Crea pruebas automatizadas del comportamiento público.');}
    if(/requirements\.txt/.test(code))add('Modificar','requirements.txt','Mantén aquí las dependencias reproducibles del proyecto.');
    if(!guide.length)add('Estudiar','Sin modificación de archivo','Este bloque es conceptual. Comprende el recorrido antes de continuar con el siguiente ejemplo de código.');
    return {guide:guide.slice(0,8),files:files.slice(0,12)};
  };

  const djangoGuide=(section,item)=>{
    const code=String(item?.code||'');
    const text=normalize(`${section?.title||''} ${item?.topic||item?.tag||''} ${item?.name||''} ${code}`);
    const app=djangoAppOf(text);
    const guide=[];
    const files=[];
    const seen=new Set();
    const add=(action,path,detail)=>{const key=`${action}|${path}`;if(!seen.has(key)){seen.add(key);guide.push([action,path,detail]);}};
    const addFile=(path,method,detail,command='')=>{if(!files.some(file=>file.path===path))files.push({path,method,detail,command});};

    if(/^\s*(?:python|django-admin|pip|psql|createdb|cd|mkdir)/m.test(code))add('Ejecutar','Terminal · raíz del proyecto Django','Ejecuta aquí manage.py, instalación, migraciones o comandos de PostgreSQL.');
    if(/python\s+-m\s+venv/.test(code)){addFile('.venv/','PYTHON','Entorno virtual local; no se sube a Git.','python -m venv .venv');addFile('requirements.txt','MANUAL','Registra las dependencias instaladas.','python -m pip freeze > requirements.txt');}
    if(/startproject\s+config/.test(code)){
      ['manage.py','config/settings.py','config/urls.py','config/asgi.py','config/wsgi.py'].forEach(path=>addFile(path,'DJANGO','Generado por django-admin startproject.','django-admin startproject config .'));
      add('Revisar','config/settings.py','Aquí vive la configuración global del proyecto.');
      add('Revisar','config/urls.py','Este es el mapa principal de URLs.');
    }
    if(/startapp\s+/.test(code)){
      [`${app}/models.py`,`${app}/views.py`,`${app}/admin.py`,`${app}/tests.py`,`${app}/apps.py`,`${app}/migrations/__init__.py`].forEach(path=>addFile(path,'DJANGO','Generado por manage.py startapp.','python manage.py startapp '+app));
    }
    if(/INSTALLED_APPS|REST_FRAMEWORK|DATABASES|MIDDLEWARE|settings\.py/.test(`${code} ${text}`))add('Modificar','config/settings.py','Registra apps, DRF, base de datos, middleware y configuración global aquí.');
    if(/models\.Model|models\.(?:CharField|DecimalField|ForeignKey|PositiveIntegerField)|class\s+\w+\(models\.Model\)/.test(code))add('Modificar',`${app}/models.py`,'Define aquí entidades persistentes y restricciones del ORM.');
    if(/makemigrations|migrate|migration/.test(text)){add('Generar',`${app}/migrations/<revision>.py`,'Django genera este archivo a partir de cambios en models.py; versiona la migración en Git.');addFile(`${app}/migrations/<revision>.py`,'DJANGO','Generado por makemigrations.','python manage.py makemigrations');}
    if(/Serializer|ModelSerializer|serializers\./.test(code)){const path=`${app}/serializers.py`;add('Crear',path,'Define aquí validación y representación JSON.');addFile(path,'MANUAL','startapp no crea serializers.py; créalo cuando expongas la app mediante DRF.');}
    if(/APIView|ModelViewSet|ViewSet|api_view|Response\(/.test(code))add('Modificar',`${app}/views.py`,'Recibe aquí solicitudes HTTP y coordina serializer, permisos y ORM.');
    if(/DefaultRouter|router\.register|urlpatterns|path\(|include\(/.test(code)){
      if(/DefaultRouter|router\.register|productos\/urls|urlpatterns\s*=\s*router/.test(`${code} ${text}`)){const path=`${app}/urls.py`;add('Crear',path,'Registra aquí rutas o routers propios de la app.');addFile(path,'MANUAL','startapp no crea urls.py; créalo cuando la app exponga URLs.');}
      add('Modificar','config/urls.py','Incluye aquí las URLs de la app bajo el prefijo público de la API.');
    }
    if(/admin\.site|ModelAdmin|admin\.py/.test(`${code} ${text}`))add('Modificar',`${app}/admin.py`,'Registra modelos y personaliza el panel administrativo aquí.');
    if(/permission|permissions\.|BasePermission/.test(`${code} ${text}`)){const path=`${app}/permissions.py`;add('Crear',path,'Define permisos reutilizables de DRF.');addFile(path,'MANUAL','Crea permisos propios cuando las reglas no quepan en clases integradas.');}
    if(/filter|FilterSet|django_filters/.test(`${code} ${text}`)){const path=`${app}/filters.py`;add('Crear',path,'Concentra filtros complejos y declarativos de la API.');addFile(path,'MANUAL','Crea filtros reutilizables para listas.');}
    if(/test|APITestCase|APIClient|pytest/.test(text)){add('Modificar',`${app}/tests.py`,'Escribe aquí pruebas de modelos, serializers, permisos y endpoints; puedes dividirlas en tests/ si crecen.');}
    if(/\.env|SECRET_KEY|DATABASE_URL|POSTGRES/.test(`${code} ${text}`)){add('Crear','.env','Guarda configuración local y secretos fuera del código versionado.');addFile('.env','MANUAL','Añade .env al .gitignore.');}
    if(/requirements\.txt/.test(code))add('Modificar','requirements.txt','Registra dependencias reproducibles del backend.');
    if(!guide.length)add('Estudiar','Sin modificación de archivo','Este bloque es conceptual. Úsalo para comprender el recorrido antes de modificar archivos.');
    return {guide:guide.slice(0,8),files:files.slice(0,12)};
  };

  sections.forEach((section,index)=>{
    const course=courseOf(section);
    if(!course)return;
    section.group=course;
    section.primaryArea=course;
    section.course=course;
    section.areaOrder=Number.isFinite(section.areaOrder)?section.areaOrder:100+index;
    const title=String(section.title||'');
    if(course==='FastAPI')section.navLabel=title.replace(/^Backend\s+FastAPI\s*·?\s*/i,'')||'Desde cero';
    if(course==='Django REST')section.navLabel=title.replace(/^Django\s+REST\s*·?\s*/i,'')||'Desde cero';
    if(!String(section.description||'').includes('Archivos:'))section.description=`${section.description||''} Archivos: cada lección indica qué crear, qué modificar, qué comando ejecutar y cuál es el resultado esperado.`.trim();

    section.items?.forEach(item=>{
      const meta=course==='FastAPI'?fastApiGuide(section,item):djangoGuide(section,item);
      const current=Array.isArray(item.guide)?item.guide:[];
      const keys=new Set(current.map(entry=>`${entry?.[0]}|${entry?.[1]}`));
      meta.guide.forEach(entry=>{const key=`${entry[0]}|${entry[1]}`;if(!keys.has(key)){keys.add(key);current.push(entry);}});
      item.guide=current;
      item.guideTitle='Dónde se hace cada modificación';
      item.filesToCreate=Array.isArray(item.filesToCreate)&&item.filesToCreate.length?item.filesToCreate:meta.files;
      item.filesToCreateTitle='Archivos que se crean en esta lección';
      item.filesToCreateStatus=item.filesToCreate.length?'Crea o genera estos archivos antes de aplicar las modificaciones de la lección.':'No debes crear archivos nuevos en esta lección; modifica o revisa los archivos indicados abajo.';
      item.codeLabel=`Código ${course}`;
      item.kind=course;
      const realPreview=previewFor(course,item);
      if(realPreview)item.preview=realPreview;
      const principal=current.find(([,path])=>path&&!String(path).startsWith('Terminal')&&path!=='Sin modificación de archivo');
      if(principal&&!String(item.description||'').includes('Archivo principal:'))item.description+=` Archivo principal: ${principal[1]}.`;
    });
  });

  const areaIndex=new Map(AREAS.map((area,index)=>[area,index]));
  const sourceIndex=new Map(sections.map((section,index)=>[section,index]));
  sections.sort((a,b)=>{
    const areaA=areaIndex.get(a.primaryArea||a.group)??999;
    const areaB=areaIndex.get(b.primaryArea||b.group)??999;
    if(areaA!==areaB)return areaA-areaB;
    const orderA=Number.isFinite(a.areaOrder)?a.areaOrder:1000+(sourceIndex.get(a)||0);
    const orderB=Number.isFinite(b.areaOrder)?b.areaOrder:1000+(sourceIndex.get(b)||0);
    return orderA-orderB||(sourceIndex.get(a)||0)-(sourceIndex.get(b)||0);
  });
  sections.forEach((section,index)=>section.routeOrder=index+1);
  window.learningPath={...(window.learningPath||{}),areas:AREAS,areaOf:section=>section.primaryArea||section.group||'HTML'};
  window.backendCourses=COURSES;
  if(typeof buildNav==='function')buildNav();
  if(typeof render==='function')render();
})();
