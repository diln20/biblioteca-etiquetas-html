(()=>{
  if(window.__djangoRestFromZeroOverviewAdded)return;
  window.__djangoRestFromZeroOverviewAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const terminal=text=>`<pre style="margin:0;padding:16px;border-radius:12px;background:#07111f;color:#86efac;font:13px/1.6 ui-monospace,SFMono-Regular,Consolas,monospace;white-space:pre-wrap;overflow:auto">${text}</pre>`;
  const response=(method,path,status,body)=>`<section style="font-family:system-ui;border:1px solid #cbd5e1;border-radius:12px;overflow:hidden;background:#fff;color:#0f172a"><header style="padding:10px 14px;background:#0f172a;color:#fff"><strong style="color:#34d399">${method}</strong> ${path} · ${status}</header><pre style="margin:0;padding:16px;background:#fff;color:#334155;white-space:pre-wrap">${body}</pre></section>`;
  const card=(title,body)=>`<article style="font-family:system-ui;max-width:540px;padding:22px;border:1px solid #a7f3d0;border-radius:14px;background:#ecfdf5;color:#064e3b"><p style="margin:0 0 6px;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase">Django REST</p><h2 style="margin:0 0 10px">${title}</h2><div style="line-height:1.55">${body}</div></article>`;
  const D=(topic,name,description,code,preview,tip)=>T(topic,name,description,code,preview,[],{kind:'Django REST',tip});

  sections.push({
    title:'Django REST · 0. Desde cero',
    navLabel:'Desde cero',
    group:'Backend',
    primaryArea:'Backend',
    areaOrder:480,
    description:'Entrada rápida para quien nunca ha creado una API con Django REST Framework. Explica proyecto, app, settings, modelo, migraciones, serializer, ViewSet, router y tres ejercicios progresivos. Después continúa con la ruta extensa de PostgreSQL, seguridad, permisos, pruebas y producción.',
    quote:'“En Django REST, URL, ViewSet, Serializer y Model forman una cadena que termina en la base de datos y vuelve como JSON.”',
    challenge:'Crea un proyecto desde una carpeta vacía y consigue un CRUD de productos con ModelViewSet antes de añadir autenticación o reglas avanzadas.',
    items:[
      D(
        'Entorno',
        'Python, entorno virtual y dependencias',
        'Python ejecuta Django. venv separa las dependencias del proyecto. Django aporta configuración, ORM, migraciones y administración; Django REST Framework agrega serializers, vistas API, routers, autenticación y permisos. psycopg conecta con PostgreSQL cuando llegues a persistencia real.',
        'python --version\nmkdir api_django_rest\ncd api_django_rest\npython -m venv .venv\n\n# Windows PowerShell\n.\\.venv\\Scripts\\Activate.ps1\n\n# Linux / macOS\nsource .venv/bin/activate\n\npython -m pip install django djangorestframework "psycopg[binary]"\npython -m pip freeze > requirements.txt',
        terminal('(.venv) api_django_rest> python -m pip install django djangorestframework "psycopg[binary]"\nSuccessfully installed Django ... djangorestframework ...'),
        'Activa siempre .venv antes de ejecutar manage.py o instalar paquetes.'
      ),
      D(
        'Proyecto y app',
        'Qué crean startproject y startapp',
        'startproject crea la configuración global y manage.py. startapp crea una carpeta funcional con models.py, views.py, admin.py, apps.py, tests.py y migrations. El proyecto configura todo el sitio; la app productos encapsula una parte concreta del dominio.',
        'django-admin startproject config .\npython manage.py startapp productos\npython manage.py runserver',
        terminal('api_django_rest/\n├─ manage.py\n├─ config/\n│  ├─ settings.py\n│  └─ urls.py\n└─ productos/\n   ├─ models.py\n   ├─ views.py\n   ├─ admin.py\n   ├─ tests.py\n   └─ migrations/'),
        'serializers.py y urls.py de la app no se generan con startapp: se crean cuando los necesitas.'
      ),
      D(
        'Configuración',
        'Registrar DRF y la app en settings.py',
        'Django carga funcionalidades declaradas en INSTALLED_APPS. rest_framework habilita DRF y productos registra el modelo y configuración de esa app. Si olvidas productos, las migraciones y el admin no verán correctamente la aplicación.',
        '/* config/settings.py */\nINSTALLED_APPS = [\n    # apps de Django...\n    "rest_framework",\n    "productos",\n]',
        card('settings.py','<p style="margin:0">Django REST Framework y productos quedan registrados en el proyecto.</p>'),
        'Evita guardar contraseñas o secretos directamente en settings.py; utiliza variables de entorno.'
      ),
      D(
        'Modelo',
        'Definir una tabla con el ORM',
        'Una clase que hereda de models.Model describe una tabla. Cada Field describe una columna y sus restricciones. Django no cambia la base de datos apenas guardas models.py: primero debes crear una migración y después aplicarla.',
        '/* productos/models.py */\nfrom django.db import models\n\nclass Producto(models.Model):\n    nombre = models.CharField(max_length=120)\n    precio = models.DecimalField(max_digits=10, decimal_places=2)\n    stock = models.PositiveIntegerField(default=0)\n\n    def __str__(self):\n        return self.nombre\n\n# Terminal\npython manage.py makemigrations\npython manage.py migrate',
        terminal('Migrations for productos:\n  productos/migrations/0001_initial.py\nApplying productos.0001_initial... OK'),
        'Cada cambio estructural importante del modelo debe quedar registrado en migraciones versionadas.'
      ),
      D(
        'Serializer',
        'Convertir modelos a JSON y validar entrada',
        'ModelSerializer conoce los campos del modelo y permite definir qué datos forman parte de la API. Al recibir JSON valida tipos y restricciones; al responder transforma instancias Producto en estructuras serializables. No expongas automáticamente todo el modelo si existen campos internos.',
        '/* productos/serializers.py */\nfrom rest_framework import serializers\nfrom .models import Producto\n\nclass ProductoSerializer(serializers.ModelSerializer):\n    class Meta:\n        model = Producto\n        fields = ["id", "nombre", "precio", "stock"]',
        response('POST','/api/productos/','201','{\n  "id": 1,\n  "nombre": "Teclado",\n  "precio": "180000.00",\n  "stock": 4\n}'),
        'Crea serializers.py manualmente dentro de la app productos.'
      ),
      D(
        'ViewSet',
        'Construir el CRUD con ModelViewSet',
        'ModelViewSet combina las operaciones habituales de listar, crear, consultar detalle, actualizar y eliminar. queryset indica qué objetos maneja y serializer_class define cómo se validan y representan. Antes de usarlo conviene entender que cada acción termina usando el ORM y el serializer.',
        '/* productos/views.py */\nfrom rest_framework.viewsets import ModelViewSet\nfrom .models import Producto\nfrom .serializers import ProductoSerializer\n\nclass ProductoViewSet(ModelViewSet):\n    queryset = Producto.objects.all().order_by("id")\n    serializer_class = ProductoSerializer',
        card('ProductoViewSet','<ul style="margin:0;padding-left:20px"><li>list → GET colección</li><li>create → POST</li><li>retrieve → GET detalle</li><li>update/partial_update → PUT/PATCH</li><li>destroy → DELETE</li></ul>'),
        'Cuando aparezcan reglas de negocio, no conviertas el ViewSet en un archivo enorme; extrae servicios o métodos de dominio.'
      ),
      D(
        'Router',
        'Conectar URLs con el ViewSet',
        'DefaultRouter genera automáticamente las rutas REST del ViewSet. productos/urls.py registra el ViewSet y config/urls.py incluye esas URLs bajo /api/. Al llegar una petición, Django resuelve primero config/urls.py y después el router de la app.',
        '/* productos/urls.py */\nfrom rest_framework.routers import DefaultRouter\nfrom .views import ProductoViewSet\n\nrouter = DefaultRouter()\nrouter.register("productos", ProductoViewSet, basename="producto")\nurlpatterns = router.urls\n\n/* config/urls.py */\nfrom django.contrib import admin\nfrom django.urls import include, path\n\nurlpatterns = [\n    path("admin/", admin.site.urls),\n    path("api/", include("productos.urls")),\n]',
        response('GET','/api/productos/','200','[\n  {\n    "id": 1,\n    "nombre": "Teclado",\n    "precio": "180000.00",\n    "stock": 4\n  }\n]'),
        'Mantén las rutas de cada app cerca de la funcionalidad y usa config/urls.py como mapa principal.'
      ),
      D(
        'Recorrido completo',
        'Qué pasa cuando haces POST /api/productos/',
        'Django resuelve la URL, el router elige ProductoViewSet.create, el serializer valida el JSON y crea una instancia usando el ORM. El ORM genera SQL, la base de datos persiste la fila y el serializer transforma el objeto guardado en JSON. DRF responde normalmente 201.',
        'POST /api/productos/\n        ↓\nconfig/urls.py\n        ↓\nproductos/urls.py · Router\n        ↓\nProductoViewSet.create\n        ↓\nProductoSerializer.is_valid\n        ↓\nProducto.objects.create\n        ↓\nBase de datos\n        ↓\nJSON + HTTP 201',
        card('Flujo de una creación','<p style="margin:0">URL → ViewSet → Serializer → ORM → Base de datos → Serializer → JSON</p>'),
        'Cuando una petición falle, identifica primero en qué paso de esta cadena se encuentra el problema.'
      ),
      D(
        'Ejercicio 1',
        'Primer JSON sin modelo',
        'Antes del CRUD, crea una vista mínima que responda un mensaje JSON. El objetivo es comprender URL y view sin mezclar todavía serializer ni ORM. Puedes usar @api_view para este ejercicio y luego volver al enfoque con ViewSets.',
        '/* productos/views.py */\nfrom rest_framework.decorators import api_view\nfrom rest_framework.response import Response\n\n@api_view(["GET"])\ndef hello(request):\n    return Response({"message": "Hola desde Django REST"})\n\n/* productos/urls.py */\nfrom django.urls import path\nfrom .views import hello\n\nurlpatterns = [path("hello/", hello)]',
        response('GET','/api/hello/','200','{\n  "message": "Hola desde Django REST"\n}'),
        'Haz este ejercicio antes de ModelViewSet si nunca has trabajado con Django.'
      ),
      D(
        'Ejercicio 2',
        'Modelo + serializer de productos',
        'Crea Producto, ejecuta makemigrations y migrate, y construye ProductoSerializer. Desde python manage.py shell crea un registro y serialízalo. El objetivo es entender ORM y serializer antes de añadir HTTP.',
        'Archivos objetivo:\nproductos/models.py\nproductos/serializers.py\n\nComandos:\npython manage.py makemigrations\npython manage.py migrate\npython manage.py shell',
        card('Resultado esperado','<p style="margin:0"><strong>Producto:</strong> Teclado</p><p style="margin:6px 0 0"><strong>JSON:</strong> id, nombre, precio y stock</p>'),
        'Si el serializer funciona en shell, después será más sencillo detectar errores en el ViewSet.'
      ),
      D(
        'Ejercicio 3',
        'CRUD completo con router',
        'Conecta ProductoViewSet con DefaultRouter. Prueba listar, crear, consultar, modificar y eliminar. Después añade un producto inválido con stock negativo y comprueba qué capa impide guardarlo. Este ejercicio cierra el nivel inicial; las siguientes secciones profundizan PostgreSQL, filtros, autenticación, permisos, pruebas y producción.',
        'GET    /api/productos/\nPOST   /api/productos/\nGET    /api/productos/1/\nPATCH  /api/productos/1/\nDELETE /api/productos/1/\n\nArchivos:\nproductos/models.py\nproductos/serializers.py\nproductos/views.py\nproductos/urls.py\nconfig/urls.py',
        response('PATCH','/api/productos/1/','200','{\n  "id": 1,\n  "nombre": "Teclado mecánico",\n  "precio": "195000.00",\n  "stock": 4\n}'),
        'No avances hasta poder explicar qué responsabilidad corresponde a cada uno de los cinco archivos del ejercicio.'
      )
    ]
  });
})();
