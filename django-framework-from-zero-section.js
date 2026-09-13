(()=>{
  if(window.__djangoFrameworkFromZeroAdded)return;
  window.__djangoFrameworkFromZeroAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const terminal=text=>`<pre style="margin:0;padding:16px;border-radius:12px;background:#07111f;color:#86efac;font:13px/1.6 ui-monospace,SFMono-Regular,Consolas,monospace;white-space:pre-wrap;overflow:auto">${text}</pre>`;
  const page=(title,body)=>`<article style="font-family:system-ui;max-width:560px;padding:24px;border:1px solid #bbf7d0;border-radius:16px;background:#f0fdf4;color:#14532d;box-shadow:0 12px 28px rgba(20,83,45,.08)"><p style="margin:0 0 6px;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#15803d">Django Framework</p><h1 style="margin:0 0 10px;font-size:28px">${title}</h1><div style="line-height:1.6">${body}</div></article>`;
  const tree=text=>`<pre style="margin:0;padding:16px;border:1px solid #bbf7d0;border-radius:12px;background:#f7fee7;color:#365314;font:13px/1.65 ui-monospace,SFMono-Regular,Consolas,monospace;white-space:pre-wrap;overflow:auto">${text}</pre>`;
  const D=(topic,name,description,code,preview,tip)=>T(topic,name,description,code,preview,[],{kind:'Django Framework',tip});

  sections.push({
    title:'Django Framework · 0. Desde cero',
    navLabel:'Desde cero',
    group:'Django Framework',
    primaryArea:'Django Framework',
    areaOrder:0,
    description:'Ruta inicial para crear páginas web tradicionales con Django, sin Django REST Framework. Parte desde Python y un entorno virtual, crea el proyecto y una app, conecta URL → view → template, aplica CSS con static, usa contexto y herencia de plantillas y termina con ejercicios progresivos.',
    quote:'“Django recibe una URL, ejecuta Python, renderiza una plantilla y entrega HTML terminado al navegador.”',
    challenge:'Crea un sitio desde una carpeta vacía con inicio, acerca de y contacto; usa una plantilla base, datos enviados desde views.py y una hoja CSS propia.',
    items:[
      D(
        'Concepto',
        'Qué es Django Framework y en qué se diferencia de Django REST',
        'Django Framework permite construir sitios web completos renderizados en el servidor. El navegador solicita una URL; Django ejecuta una vista de Python, prepara datos y renderiza un archivo HTML antes de responder. Django REST Framework se usa principalmente para APIs JSON. En esta categoría trabajarás con páginas, templates, formularios, modelos, autenticación, archivos static y panel administrativo, sin convertir cada pantalla en una API REST.',
        'NAVEGADOR\n   │ GET /productos/\n   ▼\nconfig/urls.py\n   ▼\nproductos/urls.py\n   ▼\nproductos/views.py\n   │ contexto Python\n   ▼\ntemplates/productos/lista.html\n   │ HTML terminado\n   ▼\nNAVEGADOR + CSS + imágenes',
        page('Django renderiza páginas','<p style="margin:0">La respuesta que recibe el navegador ya contiene HTML generado en el servidor.</p><p style="margin:10px 0 0"><strong>No necesitas Django REST</strong> para crear un sitio web tradicional.</p>'),
        'Piensa en Django tradicional como servidor de páginas HTML y en Django REST como servidor de datos JSON.'
      ),
      D(
        'Entorno',
        'Preparar Python, venv y Django',
        'El entorno virtual mantiene aisladas las dependencias. Crea una carpeta para el proyecto, genera .venv, actívalo e instala Django. requirements.txt guarda las versiones instaladas para que otra persona pueda reproducir el entorno.',
        'mkdir mi_sitio_django\ncd mi_sitio_django\n\npython -m venv .venv\n\n# Windows PowerShell\n.\\.venv\\Scripts\\Activate.ps1\n\n# Linux / macOS\nsource .venv/bin/activate\n\npython -m pip install django\npython -m django --version\npython -m pip freeze > requirements.txt',
        terminal('(.venv) mi_sitio_django> python -m django --version\n5.x\n\nEl proyecto ya puede usar Django.'),
        'Antes de instalar paquetes confirma que el prompt muestra (.venv).'
      ),
      D(
        'Proyecto',
        'Crear el proyecto y entender qué genera startproject',
        'django-admin startproject crea la configuración global. manage.py permite ejecutar tareas administrativas. config/settings.py contiene configuración, config/urls.py define rutas principales y asgi.py/wsgi.py son puntos de entrada del servidor. El punto final evita una carpeta config duplicada.',
        'django-admin startproject config .\npython manage.py runserver',
        tree('mi_sitio_django/\n├── manage.py\n├── requirements.txt\n├── config/\n│   ├── __init__.py\n│   ├── settings.py\n│   ├── urls.py\n│   ├── asgi.py\n│   └── wsgi.py\n└── .venv/'),
        'Abre http://127.0.0.1:8000 y confirma que aparece la página inicial de Django antes de continuar.'
      ),
      D(
        'App',
        'Crear una app llamada inicio',
        'Un proyecto Django puede contener varias apps. Cada app agrupa una funcionalidad: inicio, productos, usuarios, blog, etc. startapp genera los archivos base de la app. Después debes registrarla en INSTALLED_APPS para que Django la conozca.',
        'python manage.py startapp inicio\n\n# config/settings.py\nINSTALLED_APPS = [\n    # apps de Django...\n    "inicio",\n]',
        tree('inicio/\n├── migrations/\n├── __init__.py\n├── admin.py\n├── apps.py\n├── models.py\n├── tests.py\n└── views.py\n\nCrearás manualmente:\n├── urls.py\n├── templates/inicio/\n└── static/inicio/'),
        'Proyecto es la configuración general; app es una funcionalidad concreta dentro del proyecto.'
      ),
      D(
        'Primera página',
        'Conectar URL → view → template',
        'Este es el recorrido más importante de Django tradicional. config/urls.py incluye las URLs de la app. inicio/urls.py asocia una ruta con una función de views.py. La view llama render() y el template produce el HTML. Si entiendes esta cadena sabrás en qué archivo modificar cada parte.',
        '# inicio/urls.py\nfrom django.urls import path\nfrom . import views\n\napp_name = "inicio"\nurlpatterns = [\n    path("", views.index, name="index"),\n]\n\n# config/urls.py\nfrom django.contrib import admin\nfrom django.urls import include, path\n\nurlpatterns = [\n    path("admin/", admin.site.urls),\n    path("", include("inicio.urls")),\n]\n\n# inicio/views.py\nfrom django.shortcuts import render\n\ndef index(request):\n    return render(request, "inicio/index.html")\n\n<!-- inicio/templates/inicio/index.html -->\n<h1>Hola Mundo con Django</h1>\n<p>Mi primera página renderizada desde Python.</p>',
        page('Hola Mundo con Django','<p style="margin:0">Mi primera página renderizada desde Python.</p>'),
        'Cuando una página no abre, revisa en orden: URL principal, URL de la app, view y ruta del template.'
      ),
      D(
        'Contexto',
        'Enviar datos desde Python al HTML',
        'La view puede enviar un diccionario llamado contexto. Cada clave se vuelve una variable disponible en el template. Esto permite mostrar datos dinámicos sin escribirlos directamente en el HTML. La lógica compleja permanece en Python y el template se concentra en presentar.',
        '# inicio/views.py\ndef index(request):\n    contexto = {\n        "nombre": "Ana",\n        "curso": "Django Framework",\n        "tecnologias": ["Python", "Django", "HTML", "CSS"],\n    }\n    return render(request, "inicio/index.html", contexto)\n\n<!-- inicio/templates/inicio/index.html -->\n<h1>Hola, {{ nombre }}</h1>\n<p>Curso: {{ curso }}</p>\n<ul>\n{% for tecnologia in tecnologias %}\n  <li>{{ tecnologia }}</li>\n{% endfor %}\n</ul>',
        page('Hola, Ana','<p>Curso: Django Framework</p><ul style="margin-bottom:0"><li>Python</li><li>Django</li><li>HTML</li><li>CSS</li></ul>'),
        'No consultes la base de datos desde el template. Prepara los datos en Python y envía solo lo necesario.'
      ),
      D(
        'Static',
        'Agregar CSS correctamente',
        'Los archivos static contienen CSS, imágenes y JavaScript del sitio. Colócalos dentro de la app con un namespace para evitar choques de nombres. En la plantilla carga {% load static %} y usa {% static ... %} para que Django construya la URL correcta.',
        '/* inicio/static/inicio/css/styles.css */\nbody {\n  margin: 0;\n  font-family: system-ui, sans-serif;\n  background: #07111f;\n  color: #e2e8f0;\n}\n\n.hero {\n  width: min(900px, 92%);\n  margin: 64px auto;\n  padding: 32px;\n  border-radius: 18px;\n  background: #0f172a;\n}\n\n<!-- inicio/templates/inicio/index.html -->\n{% load static %}\n<link rel="stylesheet" href="{% static \'inicio/css/styles.css\' %}">\n<section class="hero">\n  <h1>Mi sitio Django</h1>\n  <p>HTML renderizado en servidor + CSS propio.</p>\n</section>',
        '<section style="font-family:system-ui;max-width:560px;padding:30px;border-radius:18px;background:#0f172a;color:#e2e8f0"><h1 style="margin-top:0;color:#86efac">Mi sitio Django</h1><p style="margin-bottom:0">HTML renderizado en servidor + CSS propio.</p></section>',
        'Abre DevTools → Network y confirma que styles.css responde con estado 200.'
      ),
      D(
        'Templates',
        'Crear base.html y reutilizar el layout',
        'La herencia de templates evita repetir <html>, <head>, navegación y pie de página. base.html define bloques. Cada página usa {% extends %} y reemplaza únicamente los bloques necesarios. Así puedes cambiar la navegación una sola vez para todo el sitio.',
        '<!-- inicio/templates/inicio/base.html -->\n<!doctype html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <title>{% block title %}Mi sitio{% endblock %}</title>\n</head>\n<body>\n  <nav><a href="{% url \'inicio:index\' %}">Inicio</a></nav>\n  <main>{% block content %}{% endblock %}</main>\n</body>\n</html>\n\n<!-- inicio/templates/inicio/index.html -->\n{% extends "inicio/base.html" %}\n{% block title %}Inicio{% endblock %}\n{% block content %}\n  <h1>Bienvenido</h1>\n{% endblock %}',
        page('Bienvenido','<p style="margin:0">La navegación y el layout vienen de <strong>base.html</strong>; esta página solo reemplaza su contenido.</p>'),
        'Crea base.html antes de tener muchas páginas; evita copiar el mismo header en cada template.'
      ),
      D(
        'Ejercicio 1',
        'Hola Mundo completo',
        'Construye desde cero una página / con título, párrafo y CSS. Debes poder explicar qué archivo recibe la URL, cuál ejecuta Python, cuál contiene el HTML y cuál contiene el CSS. El ejercicio termina cuando runserver funciona y no hay errores 404 de templates o static.',
        'Objetivo:\n1. Crear proyecto config.\n2. Crear app inicio.\n3. Crear inicio/urls.py.\n4. Crear view index.\n5. Crear templates/inicio/index.html.\n6. Crear static/inicio/css/styles.css.\n7. Conectar todo y ejecutar runserver.',
        page('Hola Mundo','<p style="margin:0">Primera página Django terminada y estilizada.</p>'),
        'Haz un commit cuando puedas reconstruir este flujo sin mirar la solución completa.'
      ),
      D(
        'Ejercicio 2',
        'Mini sitio de perfil con tres páginas',
        'Sube un nivel: crea Inicio, Acerca de y Contacto. Todas deben heredar de base.html, compartir navegación y CSS. Envía nombre, profesión y habilidades desde views.py a la página Acerca de. Usa nombres de URL en lugar de rutas escritas a mano.',
        'Rutas:\n/           → inicio.index\n/acerca/    → inicio.acerca\n/contacto/  → inicio.contacto\n\nArchivos manuales principales:\ninicio/urls.py\ninicio/templates/inicio/base.html\ninicio/templates/inicio/index.html\ninicio/templates/inicio/acerca.html\ninicio/templates/inicio/contacto.html\ninicio/static/inicio/css/styles.css',
        page('Ana · Desarrolladora web','<p>Python · Django · HTML · CSS</p><nav style="display:flex;gap:12px"><span>Inicio</span><span>Acerca de</span><span>Contacto</span></nav>'),
        'Criterio de terminado: ninguna página repite el layout completo y los enlaces usan {% url %}.'
      )
    ]
  });
})();
