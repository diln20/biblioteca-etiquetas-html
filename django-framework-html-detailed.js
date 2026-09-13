(()=>{
  if(window.__djangoFrameworkHtmlDetailed)return;
  window.__djangoFrameworkHtmlDetailed=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const page=(title,body)=>`<article style="font-family:system-ui;max-width:620px;padding:26px;border:1px solid #bbf7d0;border-radius:18px;background:#f0fdf4;color:#14532d"><p style="margin:0 0 6px;font-size:12px;font-weight:900;text-transform:uppercase;color:#15803d">Django Framework · resultado</p><h2 style="margin:0 0 12px">${title}</h2><div style="line-height:1.65">${body}</div></article>`;
  const D=(topic,name,description,code,preview,tip)=>T(topic,name,description,code,preview,[],{kind:'Django Framework',tip});

  sections.push({
    title:'Django Framework · HTML y templates a fondo',
    navLabel:'HTML y templates a fondo',
    group:'Django Framework',
    primaryArea:'Django Framework',
    areaOrder:10,
    description:'Lecciones detalladas para entender qué parte de una página pertenece a HTML y qué parte procesa Django antes de responder. Incluye contexto, herencia, bloques, bucles, condicionales y navegación por nombres de URL.',
    quote:'“Django prepara el HTML; el navegador recibe el documento final.”',
    challenge:'Construye Inicio, Acerca de y Productos usando una base común, datos desde views.py y enlaces generados con {% url %}.',
    items:[
      D(
        'HTML + DTL',
        'Diferenciar HTML del lenguaje de templates de Django',
        'HTML como <main>, <h1> y <p> lo interpreta el navegador. En cambio, {{ variable }} y {% ... %} los interpreta Django en el servidor antes de enviar la respuesta. El recorrido exacto es: la view prepara un diccionario, render() abre el template, Django reemplaza variables y ejecuta etiquetas, genera HTML normal y finalmente el navegador interpreta ese HTML. Por eso el usuario nunca necesita Python instalado para visitar la página y por eso una variable de Python no existe automáticamente dentro de JavaScript.',
        '# inicio/views.py\nfrom django.shortcuts import render\n\ndef index(request):\n    contexto = {"nombre": "Ana", "rol": "Estudiante"}\n    return render(request, "inicio/index.html", contexto)\n\n<!-- inicio/templates/inicio/index.html -->\n<main>\n  <h1>Hola, {{ nombre }}</h1>\n  <p>Rol: {{ rol }}</p>\n</main>\n\n# HTML aproximado que recibe el navegador\n<main>\n  <h1>Hola, Ana</h1>\n  <p>Rol: Estudiante</p>\n</main>',
        page('Hola, Ana','<p style="margin:0">Rol: Estudiante</p>'),
        'Usa “Ver código fuente” en el navegador y comprueba que {{ nombre }} ya fue reemplazado.'
      ),
      D(
        'base.html',
        'Crear una plantilla base semántica',
        'base.html evita repetir <!doctype>, <head>, navegación y footer. Los bloques son espacios que las páginas hijas pueden reemplazar. Conviene comenzar con title y content; después puedes agregar extra_css y extra_js. Usa <header>, <nav>, <main> y <footer> para que el documento tenga una estructura comprensible para lectores de pantalla, buscadores y otros desarrolladores.',
        '<!-- inicio/templates/inicio/base.html -->\n{% load static %}\n<!doctype html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>{% block title %}Mi sitio{% endblock %}</title>\n  <link rel="stylesheet" href="{% static \'inicio/css/styles.css\' %}">\n  {% block extra_css %}{% endblock %}\n</head>\n<body>\n  <header>\n    <nav aria-label="Navegación principal">\n      <a href="{% url \'inicio:index\' %}">Inicio</a>\n      <a href="{% url \'inicio:acerca\' %}">Acerca de</a>\n    </nav>\n  </header>\n  <main>{% block content %}{% endblock %}</main>\n  <footer>Proyecto Django</footer>\n  {% block extra_js %}{% endblock %}\n</body>\n</html>',
        page('Plantilla base','<p>Header y navegación compartidos</p><hr><p>El contenido cambia según la página</p><hr><p style="margin-bottom:0">Footer compartido</p>'),
        'No copies <html>, <head> y <body> en cada página hija; deja esa responsabilidad en base.html.'
      ),
      D(
        'extends + block',
        'Hacer que una página herede de base.html',
        '{% extends %} indica cuál plantilla es la base. Después, cada {% block %} reemplaza el bloque del mismo nombre. La página hija debe contener solo lo que cambia. Si modificas el menú en base.html, todas las páginas hijas reciben el cambio. La herencia ocurre en el servidor: el navegador sigue recibiendo un solo documento HTML completo.',
        '<!-- inicio/templates/inicio/index.html -->\n{% extends "inicio/base.html" %}\n\n{% block title %}Inicio · Mi sitio{% endblock %}\n\n{% block content %}\n<section class="hero">\n  <p>Django Framework</p>\n  <h1>Aprendiendo templates</h1>\n  <p>Esta página reutiliza base.html.</p>\n</section>\n{% endblock %}',
        page('Aprendiendo templates','<p style="margin:0">Esta página reutiliza la estructura de <strong>base.html</strong>.</p>'),
        'Si aparece contenido duplicado, revisa que la plantilla hija no tenga otro <html> o <body>.'
      ),
      D(
        'Variables y filtros',
        'Mostrar datos enviados desde Python',
        'El contexto es el puente entre Python y HTML. Cada clave del diccionario se vuelve un nombre disponible en el template. Los filtros transforman la presentación sin mover reglas de negocio al HTML. Por ejemplo, upper cambia la representación visual y default muestra un texto alternativo. Django escapa HTML por defecto, lo que ayuda a impedir que texto del usuario se interprete como etiquetas.',
        '# productos/views.py\ndef detalle(request):\n    producto = {\n        "nombre": "Teclado mecánico",\n        "categoria": "periféricos",\n        "descripcion": "",\n    }\n    return render(request, "productos/detalle.html", {"producto": producto})\n\n<!-- productos/templates/productos/detalle.html -->\n<article>\n  <p>{{ producto.categoria|upper }}</p>\n  <h1>{{ producto.nombre }}</h1>\n  <p>{{ producto.descripcion|default:"Sin descripción disponible" }}</p>\n</article>',
        page('Teclado mecánico','<small style="font-weight:800">PERIFÉRICOS</small><p style="margin-bottom:0">Sin descripción disponible</p>'),
        'Si una transformación contiene reglas complejas, hazla en Python y entrega al template un valor listo para mostrar.'
      ),
      D(
        'for + if + empty',
        'Crear listas y estados de interfaz',
        '{% for %} repite HTML por cada elemento. {% if %} decide qué fragmento mostrar y {% empty %} cubre el caso de una lista vacía. Django genera todas las tarjetas en el servidor; JavaScript no es obligatorio para el primer render. Este enfoque deja una versión funcional incluso si los scripts no cargan.',
        '# productos/views.py\ndef lista(request):\n    productos = [\n        {"nombre": "Teclado", "stock": 4},\n        {"nombre": "Mouse", "stock": 0},\n    ]\n    return render(request, "productos/lista.html", {"productos": productos})\n\n<!-- productos/templates/productos/lista.html -->\n{% for producto in productos %}\n<article>\n  <h2>{{ producto.nombre }}</h2>\n  {% if producto.stock > 0 %}\n    <span>Disponible: {{ producto.stock }}</span>\n  {% else %}\n    <span>Agotado</span>\n  {% endif %}\n</article>\n{% empty %}\n<p>No hay productos registrados.</p>\n{% endfor %}',
        page('Productos','<p><strong>Teclado</strong> · Disponible: 4</p><p style="margin-bottom:0"><strong>Mouse</strong> · Agotado</p>'),
        'Usa {% empty %} cuando la colección pueda venir vacía; evita dejar una pantalla sin explicación.'
      ),
      D(
        'url tag',
        'Crear enlaces resistentes a cambios de rutas',
        'Escribir href="/productos/" acopla el HTML a una ruta literal. Con {% url "productos:lista" %}, Django busca la ruta por app_name y name. Si más adelante cambia el path, el template puede seguir funcionando. El mismo principio sirve para enlaces de detalle que necesitan parámetros.',
        '# productos/urls.py\nfrom django.urls import path\nfrom . import views\n\napp_name = "productos"\nurlpatterns = [\n    path("productos/", views.lista, name="lista"),\n    path("productos/<int:id>/", views.detalle, name="detalle"),\n]\n\n<!-- template -->\n<a href="{% url \'productos:lista\' %}">Ver productos</a>\n<a href="{% url \'productos:detalle\' producto.id %}">Ver detalle</a>',
        page('Navegación por nombre','<p style="margin:0">Los enlaces se construyen desde <strong>app_name + name</strong>, no desde texto fijo.</p>'),
        'Pon name a las rutas desde el inicio; refactorizar el proyecto será mucho más sencillo.'
      )
    ]
  });
})();
