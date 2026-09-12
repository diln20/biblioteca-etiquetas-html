(()=>{
  if(window.__djangoHtmlCssSectionAdded)return;
  window.__djangoHtmlCssSectionAdded=true;

  const preview=html=>`<div style="font-family:system-ui;padding:16px;border:1px solid #334155;border-radius:14px;background:#0b1220;color:#e5edf8">${html}</div>`;
  const D=(topic,name,description,code,html,tip,kind='Django + HTML/CSS')=>T(topic,name,description,code,preview(html),[],{kind,tip});
  const add=(title,description,challenge,items)=>sections.push({
    title,
    description,
    quote:'“Django prepara los datos; las plantillas construyen el HTML; CSS presenta la interfaz.”',
    challenge,
    items
  });

  add(
    'Django + HTML/CSS · 1. Desde cero',
    'Crea un proyecto Django tradicional que renderiza páginas HTML en el servidor y aplica estilos CSS sin utilizar una API REST.',
    'Crea un proyecto llamado sitio_web, una aplicación llamada inicio y consigue que / muestre una página HTML propia.',
    [
      D(
        'arquitectura',
        '¿Cómo funciona Django con HTML y CSS?',
        'En una aplicación Django tradicional, el navegador solicita una URL. Django busca la ruta en urls.py, ejecuta una vista, prepara datos y renderiza una plantilla HTML. El navegador recibe HTML terminado y después solicita archivos estáticos como CSS e imágenes.',
        'Navegador\n   ↓ GET /\nurls.py\n   ↓\nviews.py\n   ↓ contexto\ntemplates/inicio/index.html\n   ↓ HTML\nNavegador\n   ↓\nstatic/css/styles.css',
        '<div style="display:grid;gap:8px;text-align:center"><strong>Navegador</strong><span>↓</span><strong>URL → Vista → Template</strong><span>↓</span><strong>HTML + CSS</strong></div>',
        'Actividad: dibuja el recorrido de una petición GET /productos/ y explica qué archivo interviene en cada paso.'
      ),
      D(
        'venv',
        'Crear la carpeta y el entorno virtual',
        'El entorno virtual mantiene las dependencias de este proyecto separadas de otros proyectos de Python. Primero crea una carpeta, entra en ella, genera el entorno y actívalo antes de instalar Django.',
        'mkdir sitio-django\ncd sitio-django\n\npython -m venv venv\n\n# Windows PowerShell\n.\\venv\\Scripts\\Activate.ps1\n\n# Windows CMD\nvenv\\Scripts\\activate\n\n# Linux/macOS\nsource venv/bin/activate',
        '<strong>Resultado esperado</strong><pre style="white-space:pre-wrap">(venv) C:\\sitio-django&gt;</pre>',
        'Actividad: activa y desactiva el entorno con deactivate para comprobar que entiendes cuándo está activo.'
      ),
      D(
        'pip',
        'Instalar Django',
        'Con el entorno activado instala Django y verifica que el comando esté disponible. requirements.txt permite guardar las dependencias para que otra persona pueda instalar la misma base del proyecto.',
        'pip install django\npython -m django --version\n\npip freeze > requirements.txt',
        '<strong>Archivos hasta ahora</strong><pre>sitio-django/\n├── venv/\n└── requirements.txt</pre>',
        'Actividad: abre requirements.txt e identifica la versión de Django instalada.'
      ),
      D(
        'startproject',
        'Crear el proyecto Django',
        'startproject crea la configuración general del sitio. El punto final indica que los archivos se deben crear en la carpeta actual y evita una carpeta repetida con el mismo nombre.',
        'django-admin startproject config .\npython manage.py runserver',
        '<pre style="white-space:pre-wrap">sitio-django/\n├── manage.py\n├── config/\n│   ├── __init__.py\n│   ├── settings.py\n│   ├── urls.py\n│   ├── asgi.py\n│   └── wsgi.py\n├── requirements.txt\n└── venv/</pre>',
        'Actividad: ejecuta runserver y abre http://127.0.0.1:8000 para confirmar que Django funciona.'
      ),
      D(
        'startapp',
        'Crear una aplicación',
        'Un proyecto puede contener varias apps. Cada app agrupa una responsabilidad funcional. Para una primera práctica usa una app llamada inicio y después regístrala en INSTALLED_APPS.',
        'python manage.py startapp inicio\n\n# config/settings.py\nINSTALLED_APPS = [\n    # apps de Django...\n    "inicio",\n]',
        '<pre>inicio/\n├── migrations/\n├── admin.py\n├── apps.py\n├── models.py\n├── tests.py\n└── views.py</pre>',
        'Actividad: crea una segunda app llamada productos y compárala con inicio para observar que Django genera la misma estructura base.'
      )
    ]
  );

  add(
    'Django + HTML/CSS · 2. Estructura de carpetas',
    'Organiza templates y archivos static de forma que cada pieza tenga una ubicación clara desde el comienzo.',
    'Construye la estructura completa y explica para qué sirve cada carpeta sin mirar la solución.',
    [
      D(
        'estructura',
        'Estructura recomendada para principiantes',
        'Para evitar conflictos entre nombres de plantillas, crea dentro de templates una carpeta con el nombre de la app. Haz lo mismo con static. De esta forma inicio/index.html y productos/index.html pueden coexistir sin confundirse.',
        'sitio-django/\n├── manage.py\n├── config/\n│   ├── settings.py\n│   └── urls.py\n├── inicio/\n│   ├── urls.py\n│   ├── views.py\n│   ├── templates/\n│   │   └── inicio/\n│   │       ├── base.html\n│   │       └── index.html\n│   └── static/\n│       └── inicio/\n│           ├── css/\n│           │   └── styles.css\n│           └── img/\n└── requirements.txt',
        '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px"><div><strong>templates/</strong><p>HTML</p></div><div><strong>static/</strong><p>CSS e imágenes</p></div><div><strong>views.py</strong><p>Datos y render</p></div><div><strong>urls.py</strong><p>Rutas</p></div></div>',
        'Actividad: crea exactamente esta estructura y comprueba que no escribiste templates fuera de la app por accidente.'
      ),
      D(
        'settings.py',
        'Qué configura settings.py',
        'settings.py contiene la configuración global. Para plantillas dentro de cada app normalmente basta con APP_DIRS=True y tener la app registrada. Para archivos static dentro de la app, django.contrib.staticfiles ya permite encontrarlos durante desarrollo.',
        '# config/settings.py\nTEMPLATES = [\n    {\n        "BACKEND": "django.template.backends.django.DjangoTemplates",\n        "DIRS": [],\n        "APP_DIRS": True,\n        "OPTIONS": {\n            "context_processors": [\n                # ...\n            ],\n        },\n    },\n]\n\nSTATIC_URL = "static/"',
        '<strong>Idea clave</strong><p style="margin-bottom:0">APP_DIRS=True permite buscar plantillas dentro de templates/ de las aplicaciones instaladas.</p>',
        'Actividad: cambia temporalmente APP_DIRS a False, observa qué ocurre y vuelve a dejarlo en True.'
      ),
      D(
        'urls.py',
        'Crear urls.py dentro de la app',
        'Separar las rutas por aplicación evita que config/urls.py termine lleno de todas las páginas del sistema. El proyecto incluye las URLs de inicio y la app decide qué vista atiende cada ruta.',
        '# inicio/urls.py\nfrom django.urls import path\nfrom . import views\n\napp_name = "inicio"\n\nurlpatterns = [\n    path("", views.index, name="index"),\n    path("acerca/", views.acerca, name="acerca"),\n]\n\n# config/urls.py\nfrom django.contrib import admin\nfrom django.urls import include, path\n\nurlpatterns = [\n    path("admin/", admin.site.urls),\n    path("", include("inicio.urls")),\n]',
        '<strong>Rutas resultantes</strong><p>/ → index</p><p>/acerca/ → acerca</p>',
        'Actividad: agrega una ruta /contacto/ y haz que apunte a una vista llamada contacto.'
      )
    ]
  );

  add(
    'Django + HTML/CSS · 3. Views y templates',
    'Aprende a renderizar HTML, enviar datos desde Python y mostrar esos datos usando el lenguaje de plantillas de Django.',
    'Envía nombre, curso y una lista de tecnologías desde views.py hacia index.html y muéstralos sin escribir valores fijos en el template.',
    [
      D(
        'render',
        'Primera vista con render()',
        'Una vista recibe el objeto request y devuelve una respuesta. render() combina una plantilla con un contexto y genera el HTML final que Django envía al navegador.',
        '# inicio/views.py\nfrom django.shortcuts import render\n\ndef index(request):\n    return render(request, "inicio/index.html")',
        '<div style="padding:18px;border-radius:12px;background:#111827"><h2 style="margin-top:0">Mi primera página Django</h2><p style="margin-bottom:0">HTML renderizado desde una vista.</p></div>',
        'Actividad: crea la vista acerca y haz que renderice inicio/acerca.html.'
      ),
      D(
        'context',
        'Enviar datos desde Python al HTML',
        'El contexto es un diccionario. Sus claves se convierten en nombres disponibles dentro del template. Esto permite que el HTML muestre datos calculados o consultados desde Python.',
        '# inicio/views.py\ndef index(request):\n    contexto = {\n        "nombre": "Laura",\n        "curso": "Desarrollo Web",\n        "tecnologias": ["HTML", "CSS", "Django"],\n    }\n    return render(request, "inicio/index.html", contexto)\n\n<!-- inicio/templates/inicio/index.html -->\n<h1>Hola {{ nombre }}</h1>\n<p>Curso: {{ curso }}</p>',
        '<h2 style="margin-top:0">Hola Laura</h2><p>Curso: Desarrollo Web</p>',
        'Actividad: agrega ciudad y semestre al contexto y muéstralos en la plantilla.'
      ),
      D(
        '{% for %}',
        'Recorrer listas en el template',
        'Las plantillas Django pueden recorrer colecciones con for. El HTML conserva su responsabilidad de presentación mientras Python prepara los datos.',
        '<ul>\n{% for tecnologia in tecnologias %}\n  <li>{{ tecnologia }}</li>\n{% empty %}\n  <li>No hay tecnologías registradas.</li>\n{% endfor %}\n</ul>',
        '<ul style="margin:0;line-height:1.8"><li>HTML</li><li>CSS</li><li>Django</li></ul>',
        'Actividad: crea una lista de cinco materias en views.py y muéstrala con for y empty.'
      ),
      D(
        '{% if %}',
        'Condiciones dentro del HTML',
        'if permite elegir qué bloque HTML mostrar según un valor del contexto. La lógica compleja debe permanecer en Python; el template debería usar condiciones sencillas de presentación.',
        '{% if usuario_activo %}\n  <p class="estado correcto">Usuario activo</p>\n{% else %}\n  <p class="estado">Usuario inactivo</p>\n{% endif %}',
        '<div style="display:inline-flex;padding:8px 12px;border-radius:999px;background:#064e3b;color:#a7f3d0;font-weight:700">Usuario activo</div>',
        'Actividad: muestra “Aprobado” si nota >= 3 y “Pendiente” en caso contrario; prepara la comparación en Python si la condición empieza a crecer.'
      )
    ]
  );

  add(
    'Django + HTML/CSS · 4. CSS y archivos static',
    'Conecta hojas de estilo correctamente mediante {% load static %} y evita escribir rutas relativas frágiles.',
    'Crea styles.css, enlázalo desde base.html y cambia completamente la apariencia de la página sin modificar views.py.',
    [
      D(
        '{% load static %}',
        'Cargar CSS en una plantilla Django',
        'Django necesita conocer que una ruta corresponde a un archivo static. Primero carga la etiqueta static y luego genera la URL del CSS mediante {% static ... %}.',
        '<!-- inicio/templates/inicio/base.html -->\n{% load static %}\n<!doctype html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>{% block title %}Mi sitio{% endblock %}</title>\n  <link rel="stylesheet" href="{% static \'inicio/css/styles.css\' %}">\n</head>\n<body>\n  {% block content %}{% endblock %}\n</body>\n</html>',
        '<strong>Ruta del CSS</strong><pre>/static/inicio/css/styles.css</pre>',
        'Actividad: abre DevTools → Network y confirma que styles.css responde 200.'
      ),
      D(
        'styles.css',
        'Primera hoja de estilos',
        'CSS sigue siendo CSS normal. Django únicamente se encarga de servir el archivo durante desarrollo y generar su URL. Organiza colores, tipografía, contenedores y componentes igual que en cualquier sitio web.',
        '/* inicio/static/inicio/css/styles.css */\n:root {\n  color-scheme: dark;\n  --bg: #07111f;\n  --surface: #0f172a;\n  --text: #e2e8f0;\n  --accent: #38bdf8;\n}\n\n* { box-sizing: border-box; }\n\nbody {\n  margin: 0;\n  min-height: 100vh;\n  font-family: system-ui, sans-serif;\n  background: var(--bg);\n  color: var(--text);\n}\n\n.container {\n  width: min(1100px, 92%);\n  margin-inline: auto;\n}\n\n.card {\n  padding: 24px;\n  border: 1px solid #24324a;\n  border-radius: 18px;\n  background: var(--surface);\n}',
        '<div style="padding:22px;border:1px solid #24324a;border-radius:18px;background:#0f172a"><h2 style="margin-top:0;color:#38bdf8">Tarjeta Django</h2><p style="margin-bottom:0">La plantilla aporta estructura y CSS aporta presentación.</p></div>',
        'Actividad: crea variables CSS para color principal, fondo, texto y radio; utiliza cada una al menos dos veces.'
      ),
      D(
        'responsive',
        'Hacer el diseño responsive',
        'Django no cambia la forma de construir layouts responsive. Usa CSS Grid, Flexbox, unidades fluidas y media queries. El servidor entrega el mismo HTML y el navegador adapta la presentación al ancho disponible.',
        '.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 18px;\n}\n\n@media (max-width: 800px) {\n  .grid {\n    grid-template-columns: 1fr;\n  }\n}',
        '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px"><div style="padding:12px;background:#172033;border-radius:9px">1</div><div style="padding:12px;background:#172033;border-radius:9px">2</div><div style="padding:12px;background:#172033;border-radius:9px">3</div></div>',
        'Actividad: usa el modo responsive de DevTools y convierte una cuadrícula de tres columnas en una sola columna debajo de 800px.'
      ),
      D(
        'imagen static',
        'Usar imágenes desde static',
        'Las imágenes locales también deben resolverse con la etiqueta static. Guardarlas dentro de una carpeta img mantiene una organización clara.',
        '{% load static %}\n\n<img\n  src="{% static \'inicio/img/logo.svg\' %}"\n  alt="Logo del sitio"\n  class="logo"\n>\n\n<style>\n.logo {\n  width: 120px;\n  height: auto;\n}\n</style>',
        '<div style="height:80px;display:grid;place-items:center;border:1px dashed #475569;border-radius:12px;color:#7dd3fc">inicio/static/inicio/img/logo.svg</div>',
        'Actividad: agrega una imagen, comprueba la ruta y escribe un alt que describa su función o contenido.'
      )
    ]
  );

  add(
    'Django + HTML/CSS · 5. Herencia de plantillas',
    'Evita repetir header, navegación, footer y enlaces CSS usando una plantilla base y bloques reemplazables.',
    'Crea base.html, index.html y acerca.html. Las dos páginas deben reutilizar la misma navegación sin copiarla.',
    [
      D(
        'base.html',
        'Crear una plantilla base',
        'base.html contiene el esqueleto común del sitio. block define zonas que cada página hija puede reemplazar. Esto evita copiar todo el documento HTML para cada pantalla.',
        '<!-- inicio/templates/inicio/base.html -->\n{% load static %}\n<!doctype html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>{% block title %}Mi sitio{% endblock %}</title>\n  <link rel="stylesheet" href="{% static \'inicio/css/styles.css\' %}">\n</head>\n<body>\n  <header class="site-header">\n    <nav class="container">\n      <a href="{% url \'inicio:index\' %}">Inicio</a>\n      <a href="{% url \'inicio:acerca\' %}">Acerca</a>\n    </nav>\n  </header>\n\n  <main class="container">\n    {% block content %}{% endblock %}\n  </main>\n</body>\n</html>',
        '<div style="display:grid;gap:12px"><nav style="display:flex;gap:16px;padding-bottom:10px;border-bottom:1px solid #334155"><span style="color:#38bdf8">Inicio</span><span>Acerca</span></nav><strong>Contenido cambia aquí</strong></div>',
        'Actividad: agrega un footer común y verifica que aparezca automáticamente en ambas páginas.'
      ),
      D(
        '{% extends %}',
        'Crear una página hija',
        'extends indica qué plantilla base utiliza la página. Los bloques con el mismo nombre sustituyen el contenido definido en base.html.',
        '<!-- inicio/templates/inicio/index.html -->\n{% extends "inicio/base.html" %}\n\n{% block title %}Inicio | Mi sitio{% endblock %}\n\n{% block content %}\n<section class="hero">\n  <p class="eyebrow">Django</p>\n  <h1>Aprendiendo templates y CSS</h1>\n  <p>Esta página reutiliza base.html.</p>\n</section>\n{% endblock %}',
        '<section><small style="color:#38bdf8">Django</small><h2 style="margin:.3em 0">Aprendiendo templates y CSS</h2><p style="margin-bottom:0">Esta página reutiliza base.html.</p></section>',
        'Actividad: crea contacto.html heredando de base.html y cambia únicamente title y content.'
      ),
      D(
        '{% url %}',
        'No escribir URLs a mano',
        'La etiqueta url genera enlaces utilizando el nombre de la ruta. Así un cambio futuro en el path no obliga a modificar todos los href del proyecto.',
        '# inicio/urls.py\napp_name = "inicio"\nurlpatterns = [\n    path("", views.index, name="index"),\n    path("acerca/", views.acerca, name="acerca"),\n]\n\n<!-- template -->\n<a href="{% url \'inicio:index\' %}">Inicio</a>\n<a href="{% url \'inicio:acerca\' %}">Acerca</a>',
        '<div style="display:flex;gap:10px"><span style="padding:8px 12px;border-radius:8px;background:#1d4ed8">Inicio</span><span style="padding:8px 12px;border-radius:8px;background:#172033">Acerca</span></div>',
        'Actividad: cambia acerca/ por nosotros/ en urls.py. Si usaste {% url %}, el enlace debería seguir funcionando sin tocar el template.'
      ),
      D(
        '{% include %}',
        'Reutilizar pequeños componentes',
        'include permite extraer fragmentos repetidos como tarjetas, alertas o navegación secundaria. Es útil cuando no necesitas una plantilla base completa.',
        '<!-- inicio/templates/inicio/components/tarjeta.html -->\n<article class="card">\n  <h2>{{ titulo }}</h2>\n  <p>{{ descripcion }}</p>\n</article>\n\n<!-- index.html -->\n{% include "inicio/components/tarjeta.html" with titulo="HTML" descripcion="Estructura" %}',
        '<article style="padding:16px;border-radius:12px;background:#111827"><h3 style="margin-top:0">HTML</h3><p style="margin-bottom:0">Estructura</p></article>',
        'Actividad: crea un componente boton.html y reutilízalo dos veces con textos diferentes.'
      )
    ]
  );

  add(
    'Django + HTML/CSS · 6. Mini proyecto',
    'Integra rutas, vistas, contexto, templates, herencia y CSS en una pequeña página de cursos.',
    'Construye una pantalla /cursos/ que reciba una lista desde views.py y la represente en tarjetas responsive.',
    [
      D(
        'mini proyecto',
        'Página de cursos paso a paso',
        'El objetivo es combinar lo aprendido sin base de datos todavía. views.py crea una lista de cursos, el template la recorre y CSS convierte cada curso en una tarjeta. Después puedes sustituir la lista por consultas al ORM sin cambiar toda la interfaz.',
        '# inicio/views.py\ndef cursos(request):\n    cursos = [\n        {"nombre": "HTML", "nivel": "Básico"},\n        {"nombre": "CSS", "nivel": "Intermedio"},\n        {"nombre": "Django", "nivel": "Intermedio"},\n    ]\n    return render(request, "inicio/cursos.html", {"cursos": cursos})\n\n# inicio/urls.py\npath("cursos/", views.cursos, name="cursos")\n\n<!-- cursos.html -->\n{% extends "inicio/base.html" %}\n\n{% block content %}\n<h1>Cursos</h1>\n<section class="grid">\n  {% for curso in cursos %}\n    <article class="card">\n      <h2>{{ curso.nombre }}</h2>\n      <p>{{ curso.nivel }}</p>\n    </article>\n  {% endfor %}\n</section>\n{% endblock %}\n\n/* styles.css */\n.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 18px;\n}',
        '<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px"><article style="padding:16px;background:#111827;border-radius:12px"><strong>HTML</strong><p>Básico</p></article><article style="padding:16px;background:#111827;border-radius:12px"><strong>CSS</strong><p>Intermedio</p></article><article style="padding:16px;background:#111827;border-radius:12px"><strong>Django</strong><p>Intermedio</p></article></div>',
        'Actividad: agrega duración, descripción y botón “Ver curso”. Después crea una página detalle para cada curso usando una URL con parámetro.'
      ),
      D(
        'debug',
        'Errores frecuentes',
        'Los errores iniciales suelen ser rutas incorrectas, plantillas en carpetas equivocadas o archivos static mal referenciados. Lee el traceback completo y revisa primero el nombre exacto del archivo y la ruta usada en render, static o url.',
        'TemplateDoesNotExist\n→ revisa templates/inicio/index.html\n→ revisa "inicio" en INSTALLED_APPS\n\n404 en CSS\n→ revisa {% load static %}\n→ revisa {% static \'inicio/css/styles.css\' %}\n→ revisa static/inicio/css/styles.css\n\nNoReverseMatch\n→ revisa app_name\n→ revisa name= en path()\n→ revisa {% url \'inicio:nombre\' %}',
        '<div style="display:grid;gap:8px"><span>🔎 TemplateDoesNotExist → plantilla</span><span>🎨 CSS 404 → static</span><span>🔗 NoReverseMatch → urls</span></div>',
        'Actividad: provoca intencionalmente cada uno de estos tres errores y luego corrígelo leyendo el mensaje de Django.'
      ),
      D(
        'reto final',
        'Reto para estudiantes',
        'Construye un pequeño sitio académico de tres páginas usando solamente Django, HTML y CSS. Debe tener navegación común, una página inicio, una lista de materias y una página acerca de. Los datos de materias deben salir de views.py y no estar escritos directamente en el HTML.',
        'Requisitos:\n1. Proyecto Django desde cero.\n2. App llamada academia.\n3. base.html reutilizable.\n4. home.html, materias.html y acerca.html.\n5. CSS en static/academia/css/styles.css.\n6. Navegación con {% url %}.\n7. Materias enviadas mediante context.\n8. for para crear tarjetas.\n9. Diseño responsive.\n10. Foco visible y buen contraste.',
        '<div style="padding:18px;border-radius:12px;background:linear-gradient(135deg,#1d4ed8,#0891b2)"><strong style="font-size:20px">Proyecto: Portal académico</strong><p style="margin-bottom:0">Django + Templates + HTML + CSS</p></div>',
        'No copies una solución completa. Construye primero la estructura de carpetas y avanza una página a la vez.'
      )
    ]
  );

  buildNav();
  render();
})();
