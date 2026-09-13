(()=>{
  if(window.__djangoFrameworkProjectDetailed)return;
  window.__djangoFrameworkProjectDetailed=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const preview=(title,body)=>`<section style="font-family:system-ui;max-width:640px;padding:24px;border:1px solid #cbd5e1;border-radius:16px;background:#fff;color:#0f172a"><p style="margin:0 0 6px;font-size:12px;font-weight:900;text-transform:uppercase;color:#15803d">Proyecto Django</p><h2 style="margin:0 0 12px">${title}</h2>${body}</section>`;
  const D=(topic,name,description,code,result,tip)=>T(topic,name,description,code,result,[],{kind:'Django Framework',tip});

  sections.push({
    title:'Django Framework · Proyecto integrador HTML CSS JavaScript',
    navLabel:'Proyecto integrador HTML + CSS + JS',
    group:'Django Framework',
    primaryArea:'Django Framework',
    areaOrder:50,
    description:'Proyecto progresivo para unir Django, HTML, CSS y JavaScript. Cada nivel agrega una sola responsabilidad y explica por qué se coloca en ese archivo.',
    quote:'“Primero haz que funcione; después haz que se vea bien; por último agrega interacción.”',
    challenge:'Construye un mini catálogo completo y reemplaza los datos temporales por un modelo real.',
    items:[
      D(
        'Arquitectura',
        'Planear la estructura antes de programar',
        'config contiene configuración global. productos contiene la funcionalidad del catálogo. templates guarda HTML. static guarda CSS, JavaScript e imágenes. views.py coordina la petición y models.py representa datos persistentes. Esta separación ayuda a que el estudiante sepa dónde modificar cada cosa antes de escribir código.',
        'catalogo/\n├── manage.py\n├── config/\n│   ├── settings.py\n│   └── urls.py\n└── productos/\n    ├── urls.py\n    ├── views.py\n    ├── models.py\n    ├── forms.py\n    ├── templates/\n    │   └── productos/\n    │       ├── base.html\n    │       ├── lista.html\n    │       └── detalle.html\n    └── static/\n        └── productos/\n            ├── css/styles.css\n            ├── js/main.js\n            └── img/',
        preview('Mapa de responsabilidades','<p><strong>Python:</strong> rutas, datos y reglas</p><p><strong>HTML:</strong> estructura y contenido</p><p><strong>CSS:</strong> distribución y apariencia</p><p style="margin-bottom:0"><strong>JavaScript:</strong> interacción en el navegador</p>'),
        'Antes de crear un archivo pregúntate qué responsabilidad tendrá y quién necesita leerlo.'
      ),
      D(
        'Nivel 1',
        'Catálogo renderizado con Django + HTML',
        'Empieza sin CSS y sin JavaScript. La view crea datos temporales, la URL conecta la petición y el template usa for. Si esta versión funciona, ya tienes la columna vertebral del sitio. Esto evita usar JavaScript para resolver problemas que pertenecen al servidor.',
        '# productos/views.py\nfrom django.shortcuts import render\n\ndef lista(request):\n    productos = [\n        {"id": 1, "nombre": "Teclado", "precio": 180000},\n        {"id": 2, "nombre": "Mouse", "precio": 90000},\n        {"id": 3, "nombre": "Monitor", "precio": 850000},\n    ]\n    return render(request, "productos/lista.html", {"productos": productos})\n\n# productos/urls.py\nfrom django.urls import path\nfrom . import views\n\napp_name = "productos"\nurlpatterns = [path("", views.lista, name="lista")]\n\n<!-- productos/templates/productos/lista.html -->\n<h1>Catálogo</h1>\n{% for producto in productos %}\n<article>\n  <h2>{{ producto.nombre }}</h2>\n  <p>${{ producto.precio }}</p>\n</article>\n{% endfor %}',
        preview('Catálogo básico','<h3>Teclado</h3><p>$180000</p><h3>Mouse</h3><p>$90000</p><h3>Monitor</h3><p style="margin-bottom:0">$850000</p>'),
        'Confirma que esta versión funciona antes de avanzar al diseño.'
      ),
      D(
        'Nivel 2',
        'Agregar una interfaz responsive con CSS',
        'Ahora mejora únicamente presentación. El template recibe clases y CSS crea la cuadrícula. La view no cambia porque los datos siguen siendo los mismos. Este nivel demuestra separación de responsabilidades: Python decide qué productos existen y CSS decide cómo se distribuyen en pantalla.',
        '<!-- productos/templates/productos/lista.html -->\n<section class="catalog-grid">\n{% for producto in productos %}\n  <article class="product-card" data-product data-search-text="{{ producto.nombre|lower }}">\n    <p class="product-card__eyebrow">Producto {{ producto.id }}</p>\n    <h2>{{ producto.nombre }}</h2>\n    <p class="product-card__price">${{ producto.precio }}</p>\n  </article>\n{% endfor %}\n</section>\n\n/* productos/static/productos/css/styles.css */\n.catalog-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 18px;\n}\n\n.product-card {\n  padding: 20px;\n  border: 1px solid #cbd5e1;\n  border-radius: 16px;\n  background: #fff;\n}\n\n.product-card__price {\n  color: #15803d;\n  font-size: 1.25rem;\n  font-weight: 800;\n}',
        preview('Catálogo responsive','<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px"><article style="padding:14px;border:1px solid #cbd5e1;border-radius:12px"><strong>Teclado</strong><p style="color:#15803d">$180000</p></article><article style="padding:14px;border:1px solid #cbd5e1;border-radius:12px"><strong>Mouse</strong><p style="color:#15803d">$90000</p></article><article style="padding:14px;border:1px solid #cbd5e1;border-radius:12px"><strong>Monitor</strong><p style="color:#15803d">$850000</p></article></div>'),
        'Desactiva JavaScript y confirma que el catálogo sigue siendo completamente usable.'
      ),
      D(
        'Nivel 3',
        'Agregar búsqueda instantánea con JavaScript',
        'La lista ya funciona. JavaScript solamente mejora la experiencia filtrando tarjetas que ya existen en el DOM. El input escucha el evento input, toma el texto de data-search-text y usa hidden para ocultar lo que no coincide. Si el script falla, la página sigue mostrando todos los productos.',
        '<!-- lista.html, antes del grid -->\n<label for="catalog-search">Buscar</label>\n<input id="catalog-search" type="search" data-catalog-search placeholder="Ej. teclado">\n\n// productos/static/productos/js/main.js\nconst search = document.querySelector("[data-catalog-search]");\nconst products = [...document.querySelectorAll("[data-product]")];\n\nsearch?.addEventListener("input", () => {\n  const value = search.value.trim().toLowerCase();\n  products.forEach(product => {\n    const text = product.dataset.searchText || "";\n    product.hidden = !text.includes(value);\n  });\n});',
        preview('Filtro instantáneo','<input value="mouse" style="width:100%;padding:10px;border:1px solid #cbd5e1;border-radius:8px"><article style="margin-top:12px;padding:14px;border:1px solid #cbd5e1;border-radius:12px"><strong>Mouse</strong><p style="margin-bottom:0;color:#15803d">$90000</p></article>'),
        'Usa búsqueda del lado cliente solo cuando la colección ya está cargada y es razonablemente pequeña.'
      ),
      D(
        'Nivel 4',
        'Agregar favoritos locales con localStorage',
        'localStorage permite guardar una preferencia en el navegador sin modificar la base de datos. Guardamos un arreglo de IDs serializado como JSON. Este favorito no pertenece a una cuenta de usuario y no se sincroniza entre dispositivos. El ejercicio sirve para aprender persistencia cliente antes de mover la funcionalidad al servidor.',
        '<!-- dentro de cada product-card -->\n<button type="button" data-favorite data-product-id="{{ producto.id }}">\n  ☆ Favorito\n</button>\n\n// productos/static/productos/js/main.js\nconst KEY = "catalogo:favoritos";\nconst saved = JSON.parse(localStorage.getItem(KEY) || "[]");\nconst favorites = new Set(saved.map(Number));\n\ndocument.querySelectorAll("[data-favorite]").forEach(button => {\n  const id = Number(button.dataset.productId);\n\n  const paint = () => {\n    button.textContent = favorites.has(id) ? "★ Favorito" : "☆ Favorito";\n  };\n\n  button.addEventListener("click", () => {\n    favorites.has(id) ? favorites.delete(id) : favorites.add(id);\n    localStorage.setItem(KEY, JSON.stringify([...favorites]));\n    paint();\n  });\n\n  paint();\n});',
        preview('Favorito local','<article style="padding:14px;border:1px solid #cbd5e1;border-radius:12px"><strong>Teclado</strong><p>$180000</p><button style="padding:8px 12px;border:1px solid #15803d;border-radius:8px;background:#dcfce7;color:#14532d;font-weight:800">★ Favorito</button></article>'),
        'Explica que localStorage puede ser modificado por el usuario y no debe contener información sensible.'
      ),
      D(
        'Nivel 5',
        'Reemplazar los datos temporales por un modelo real',
        'Al final cambia la fuente de datos sin rehacer la interfaz. Producto.objects.all() reemplaza la lista escrita a mano. El template, CSS y JavaScript pueden mantenerse casi iguales porque ya estaban desacoplados. El recorrido completo queda: modelo → ORM → view → contexto → template → HTML → CSS + JavaScript.',
        '# productos/models.py\nfrom django.db import models\n\nclass Producto(models.Model):\n    nombre = models.CharField(max_length=120)\n    precio = models.DecimalField(max_digits=12, decimal_places=2)\n    stock = models.PositiveIntegerField(default=0)\n\n    def __str__(self):\n        return self.nombre\n\n# productos/views.py\nfrom django.shortcuts import render\nfrom .models import Producto\n\ndef lista(request):\n    productos = Producto.objects.all().order_by("nombre")\n    return render(request, "productos/lista.html", {"productos": productos})\n\n# terminal\npython manage.py makemigrations\npython manage.py migrate',
        preview('Arquitectura completa','<p><strong>Modelo:</strong> persiste Producto</p><p><strong>View:</strong> consulta ORM</p><p><strong>Template:</strong> genera tarjetas HTML</p><p><strong>CSS:</strong> diseña el catálogo</p><p style="margin-bottom:0"><strong>JavaScript:</strong> busca y gestiona favoritos locales</p>'),
        'Si cambias la fuente de datos y la interfaz requiere pocos cambios, las responsabilidades están bien separadas.'
      )
    ]
  });
})();
