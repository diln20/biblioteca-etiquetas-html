(()=>{
  if(window.__djangoFrameworkCssDetailed)return;
  window.__djangoFrameworkCssDetailed=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const preview=(title,body)=>`<section style="font-family:system-ui;max-width:620px;padding:24px;border:1px solid #cbd5e1;border-radius:16px;background:#fff;color:#0f172a"><p style="margin:0 0 6px;font-size:12px;font-weight:900;text-transform:uppercase;color:#15803d">CSS en Django</p><h2 style="margin:0 0 12px">${title}</h2>${body}</section>`;
  const D=(topic,name,description,code,result,tip)=>T(topic,name,description,code,result,[],{kind:'Django Framework',tip});

  sections.push({
    title:'Django Framework · CSS y diseño responsive',
    navLabel:'CSS y diseño responsive',
    group:'Django Framework',
    primaryArea:'Django Framework',
    areaOrder:20,
    description:'Lecciones detalladas para conectar static correctamente, organizar CSS, usar variables, Grid, Flexbox y responsive. Django localiza y sirve el archivo; el navegador sigue siendo quien interpreta CSS.',
    quote:'“Django encuentra el CSS; el navegador decide cómo se ve la página.”',
    challenge:'Transforma el HTML anterior en una interfaz responsive sin cambiar la lógica de views.py.',
    items:[
      D(
        'static',
        'Entender exactamente qué hace {% static %}',
        'Templates y archivos static tienen recorridos distintos. El template se procesa en el servidor y genera HTML. Después el navegador detecta el <link> y hace otra petición para descargar styles.css. {% load static %} activa la etiqueta static y {% static ... %} construye la URL pública. Usar un namespace como inicio/static/inicio/ evita que dos apps con un styles.css se confundan entre sí.',
        '<!-- inicio/templates/inicio/base.html -->\n{% load static %}\n<link rel="stylesheet" href="{% static \'inicio/css/styles.css\' %}">\n\n/* archivo real */\n/* inicio/static/inicio/css/styles.css */\nbody {\n  margin: 0;\n  background: #07111f;\n  color: #e2e8f0;\n}',
        preview('Dos solicitudes diferentes','<p><strong>GET /</strong> → Django responde HTML</p><p><strong>GET /static/inicio/css/styles.css</strong> → navegador descarga CSS</p><p style="margin-bottom:0">Si el CSS responde 404, la página existe pero se verá sin estilos.</p>'),
        'Abre DevTools → Network y confirma que styles.css responde 200.'
      ),
      D(
        'Arquitectura CSS',
        'Separar estilos por responsabilidad',
        'Un proyecto pequeño puede comenzar con un solo styles.css. Cuando crezca, conviene separar base, layout, componentes y reglas exclusivas de páginas. base.css contiene variables y estilos globales; layout.css organiza header, main y contenedores; components.css contiene botones y tarjetas. Esta separación no es una obligación de Django: es una decisión de organización para que un estudiante sepa dónde buscar una regla.',
        'inicio/static/inicio/css/\n├── base.css\n├── layout.css\n├── components.css\n└── pages/\n    └── home.css\n\n<!-- base.html -->\n{% load static %}\n<link rel="stylesheet" href="{% static \'inicio/css/base.css\' %}">\n<link rel="stylesheet" href="{% static \'inicio/css/layout.css\' %}">\n<link rel="stylesheet" href="{% static \'inicio/css/components.css\' %}">',
        preview('Mapa de CSS','<p><strong>base.css</strong> · colores, tipografía y reset</p><p><strong>layout.css</strong> · contenedores y distribución</p><p><strong>components.css</strong> · botones y tarjetas</p><p style="margin-bottom:0"><strong>pages/</strong> · ajustes específicos de una pantalla</p>'),
        'Separa archivos cuando el nombre del archivo ayude a encontrar más rápido una regla; no por dividir líneas sin propósito.'
      ),
      D(
        'Variables CSS',
        'Crear un sistema visual consistente',
        'Las custom properties permiten declarar colores, radios y espacios una sola vez. El HTML de Django aporta clases y CSS decide su aspecto. Si cambias --color-accent, todos los componentes que la usen se actualizan sin tocar views.py ni templates. Prefiere nombres por intención, por ejemplo --color-accent, en lugar de nombres ligados a un valor como --verde.',
        ':root {\n  --color-bg: #07111f;\n  --color-surface: #0f172a;\n  --color-text: #e2e8f0;\n  --color-accent: #4ade80;\n  --radius-md: 14px;\n  --space-md: 16px;\n}\n\n.card {\n  padding: var(--space-md);\n  border: 1px solid #24324a;\n  border-radius: var(--radius-md);\n  background: var(--color-surface);\n  color: var(--color-text);\n}\n\n.card__title { color: var(--color-accent); }',
        '<article style="font-family:system-ui;max-width:430px;padding:18px;border:1px solid #24324a;border-radius:14px;background:#0f172a;color:#e2e8f0"><h3 style="margin-top:0;color:#4ade80">Tarjeta reutilizable</h3><p style="margin-bottom:0">Los mismos tokens visuales se comparten entre componentes.</p></article>',
        'Centraliza primero los valores que realmente se repiten; no conviertas cada número en una variable.'
      ),
      D(
        'Grid',
        'Diseñar una lista de tarjetas responsive',
        'Django puede generar una cantidad variable de <article> mediante {% for %}. CSS Grid se ocupa de distribuirlos. repeat(auto-fit, minmax(220px, 1fr)) crea tantas columnas como quepan y permite que cada tarjeta crezca. El servidor no necesita saber el ancho de pantalla; esa decisión pertenece al navegador.',
        '<!-- productos/templates/productos/lista.html -->\n<section class="product-grid">\n  {% for producto in productos %}\n  <article class="card">\n    <h2>{{ producto.nombre }}</h2>\n    <p>${{ producto.precio }}</p>\n  </article>\n  {% endfor %}\n</section>\n\n/* productos/static/productos/css/styles.css */\n.product-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 18px;\n}',
        preview('Grid adaptable','<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px"><div style="padding:14px;border:1px solid #cbd5e1;border-radius:10px">Teclado</div><div style="padding:14px;border:1px solid #cbd5e1;border-radius:10px">Mouse</div><div style="padding:14px;border:1px solid #cbd5e1;border-radius:10px">Monitor</div></div>'),
        'Prueba anchos intermedios, no solo móvil y escritorio; el layout debe reorganizarse sin scroll horizontal.'
      ),
      D(
        'Flexbox',
        'Usar Flexbox para navegación y filas de acciones',
        'Grid es excelente para áreas bidimensionales como catálogos. Flexbox funciona mejor cuando organizas elementos en una sola dirección, por ejemplo enlaces de navegación o botones dentro de una tarjeta. gap crea separación sin añadir márgenes especiales entre elementos. justify-content distribuye espacio y align-items controla alineación transversal.',
        '.site-nav {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n\n.card__actions {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n\n.card__actions .button {\n  min-height: 44px;\n}',
        preview('Flexbox','<div style="display:flex;gap:10px;flex-wrap:wrap"><button style="padding:9px 13px">Detalle</button><button style="padding:9px 13px">Favorito</button><button style="padding:9px 13px">Compartir</button></div>'),
        'Usa Grid para la colección y Flexbox dentro de cada componente cuando la distribución sea principalmente lineal.'
      ),
      D(
        'Mobile first',
        'Diseñar primero para pantallas pequeñas',
        'El CSS base puede representar la versión móvil. Después una media query con min-width añade mejoras cuando existe suficiente espacio. Esto evita depender de modelos concretos de teléfono. El breakpoint debe aparecer donde el contenido deja de verse cómodo, no porque un dispositivo popular tenga cierto ancho.',
        '.site-nav {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n.page {\n  width: min(100% - 32px, 1100px);\n  margin-inline: auto;\n}\n\n@media (min-width: 768px) {\n  .site-nav {\n    flex-direction: row;\n    align-items: center;\n  }\n\n  .hero { padding-block: 72px; }\n}',
        preview('Mobile first','<p>Base: navegación apilada para poco ancho.</p><p style="margin-bottom:0">Desde 768 px: navegación horizontal y más espacio visual.</p>'),
        'Arrastra manualmente el ancho del navegador para detectar el punto exacto donde el diseño necesita cambiar.'
      )
    ]
  });
})();
