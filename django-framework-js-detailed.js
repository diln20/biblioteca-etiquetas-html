(()=>{
  if(window.__djangoFrameworkJsDetailed)return;
  window.__djangoFrameworkJsDetailed=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const preview=(title,body)=>`<section style="font-family:system-ui;max-width:620px;padding:24px;border:1px solid #cbd5e1;border-radius:16px;background:#fff;color:#0f172a"><p style="margin:0 0 6px;font-size:12px;font-weight:900;text-transform:uppercase;color:#15803d">JavaScript en Django</p><h2 style="margin:0 0 12px">${title}</h2>${body}</section>`;
  const D=(topic,name,description,code,result,tip)=>T(topic,name,description,code,result,[],{kind:'Django Framework',tip});

  sections.push({
    title:'Django Framework · JavaScript e interacción',
    navLabel:'JavaScript e interacción',
    group:'Django Framework',
    primaryArea:'Django Framework',
    areaOrder:30,
    description:'Lecciones detalladas para integrar JavaScript sin convertir Django en una SPA. Primero Django entrega HTML útil; luego JavaScript añade comportamiento: eventos, filtros, datos del template, localStorage y peticiones puntuales.',
    quote:'“El servidor entrega la página; JavaScript mejora lo que ocurre después en el navegador.”',
    challenge:'Añade interacción progresiva a una página Django sin romper su funcionamiento básico cuando JavaScript esté desactivado.',
    items:[
      D(
        'static JavaScript',
        'Cargar main.js con defer',
        'JavaScript también vive dentro de static. defer hace que el navegador descargue el archivo en paralelo mientras procesa el HTML y lo ejecute después de construir el DOM. Así el script puede buscar elementos con querySelector sin bloquear la carga visual. Django únicamente genera la URL del archivo; el código JavaScript se ejecuta en el navegador del usuario.',
        '<!-- inicio/templates/inicio/base.html -->\n{% load static %}\n<head>\n  <link rel="stylesheet" href="{% static \'inicio/css/styles.css\' %}">\n  <script src="{% static \'inicio/js/main.js\' %}" defer></script>\n</head>\n\n// inicio/static/inicio/js/main.js\nconsole.log("JavaScript cargado");\nconst titulo = document.querySelector("h1");\nconsole.log(titulo?.textContent);',
        preview('Orden de carga','<p>1. Django responde HTML</p><p>2. El navegador analiza el documento</p><p>3. Descarga main.js</p><p style="margin-bottom:0">4. defer ejecuta el script cuando el DOM ya está disponible</p>'),
        'Usa defer para scripts propios que dependen del HTML y evita llenar los templates con scripts inline.'
      ),
      D(
        'DOM + eventos',
        'Crear un contador local con addEventListener',
        'Django renderiza el número inicial y el botón. Después del primer render, JavaScript escucha el clic y modifica textContent. No se hace una petición nueva al servidor porque el cambio es puramente visual. Si recargas la página, el contador vuelve a cero. Este ejemplo ayuda a distinguir estado del navegador de estado persistido en la base de datos.',
        '<!-- inicio/templates/inicio/index.html -->\n<section data-counter>\n  <p>Clics: <strong data-count>0</strong></p>\n  <button type="button" data-increment>Incrementar</button>\n</section>\n\n// inicio/static/inicio/js/main.js\nconst counter = document.querySelector("[data-counter]");\n\nif (counter) {\n  const output = counter.querySelector("[data-count]");\n  const button = counter.querySelector("[data-increment]");\n  let count = 0;\n\n  button.addEventListener("click", () => {\n    count += 1;\n    output.textContent = String(count);\n  });\n}',
        preview('Interacción local','<p>Clics: <strong>0</strong></p><button style="padding:9px 14px;border:0;border-radius:9px;background:#15803d;color:#fff;font-weight:800">Incrementar</button><p style="color:#64748b;font-size:13px">Cada clic cambia 0 → 1 → 2 → 3 sin recargar.</p>'),
        'Usa atributos data-* como selectores de JavaScript para no acoplar la lógica a clases que existen solo por diseño.'
      ),
      D(
        'data-*',
        'Pasar valores simples del template a JavaScript',
        'Los atributos data-* se escriben en el HTML final y JavaScript puede leerlos con dataset. Son útiles para IDs, nombres o pequeñas configuraciones. dataset siempre devuelve texto, así que convierte a Number cuando realmente necesitas un número. No uses data-* para secretos: cualquier valor enviado al navegador puede ser inspeccionado.',
        '<!-- productos/templates/productos/detalle.html -->\n<button\n  type="button"\n  data-favorite\n  data-product-id="{{ producto.id }}"\n  data-product-name="{{ producto.nombre }}"\n>\n  Agregar a favoritos\n</button>\n\n// productos/static/productos/js/main.js\nconst favorite = document.querySelector("[data-favorite]");\n\nif (favorite) {\n  favorite.addEventListener("click", () => {\n    const id = Number(favorite.dataset.productId);\n    const name = favorite.dataset.productName;\n    console.log({ id, name });\n  });\n}',
        preview('data-* → dataset','<p><strong>HTML:</strong> data-product-id="7"</p><p><strong>JavaScript:</strong> dataset.productId devuelve "7"</p><p style="margin-bottom:0"><strong>Conversión:</strong> Number("7") devuelve 7</p>'),
        'Para datos grandes o anidados, usa json_script en lugar de muchos atributos data-*.'
      ),
      D(
        'json_script',
        'Pasar listas y objetos de Django a JavaScript de forma segura',
        'json_script serializa un valor de Python como JSON escapado dentro de un elemento script de tipo application/json. JavaScript lee textContent y usa JSON.parse(). Es preferible a escribir directamente const datos = {{ datos }} porque las comillas y caracteres especiales podrían romper el código. Úsalo para configuraciones o colecciones pequeñas que ya forman parte de la página.',
        '# productos/views.py\ndef lista(request):\n    categorias = ["Teclados", "Mouse", "Monitores"]\n    return render(request, "productos/lista.html", {"categorias": categorias})\n\n<!-- productos/templates/productos/lista.html -->\n{{ categorias|json_script:"categorias-data" }}\n\n// productos/static/productos/js/main.js\nconst node = document.getElementById("categorias-data");\n\nif (node) {\n  const categorias = JSON.parse(node.textContent);\n  console.log(categorias);\n}',
        preview('JSON entregado por Django','<pre style="margin:0">[\n  "Teclados",\n  "Mouse",\n  "Monitores"\n]</pre>'),
        'json_script es una forma segura de transportar JSON desde el template hasta el JavaScript de la misma página.'
      ),
      D(
        'Filtro cliente',
        'Filtrar tarjetas ya renderizadas',
        'Django genera todas las tarjetas. JavaScript escucha el evento input, normaliza el texto escrito y usa hidden para ocultar temporalmente las tarjetas que no coinciden. Si JavaScript no carga, la lista completa sigue visible: eso es mejora progresiva. Este patrón funciona bien con una colección pequeña ya presente en el DOM; para miles de registros conviene filtrar en el servidor.',
        '<!-- productos/lista.html -->\n<label for="search">Buscar producto</label>\n<input id="search" type="search" data-search>\n\n{% for producto in productos %}\n<article data-product data-search-text="{{ producto.nombre|lower }}">\n  <h2>{{ producto.nombre }}</h2>\n</article>\n{% endfor %}\n\n// productos/static/productos/js/main.js\nconst search = document.querySelector("[data-search]");\nconst cards = [...document.querySelectorAll("[data-product]")];\n\nsearch?.addEventListener("input", () => {\n  const term = search.value.trim().toLowerCase();\n  cards.forEach(card => {\n    const text = card.dataset.searchText || "";\n    card.hidden = !text.includes(term);\n  });\n});',
        preview('Búsqueda inmediata','<input value="tec" style="width:100%;padding:10px;border:1px solid #cbd5e1;border-radius:8px"><div style="margin-top:14px;padding:12px;border:1px solid #cbd5e1;border-radius:10px"><strong>Teclado mecánico</strong></div>'),
        'La búsqueda de interfaz no reemplaza una consulta SQL cuando la cantidad de registros es grande.'
      ),
      D(
        'localStorage',
        'Guardar una preferencia solo en el navegador',
        'localStorage conserva strings entre recargas para el mismo dominio. Sirve para preferencias visuales, favoritos locales o estados no sensibles. JSON.stringify convierte un arreglo en texto y JSON.parse lo reconstruye. No confíes en localStorage para permisos, seguridad o datos críticos: el usuario puede modificarlo y no se sincroniza automáticamente entre dispositivos.',
        '<button type="button" data-theme-toggle>Cambiar tema</button>\n\n// inicio/static/inicio/js/main.js\nconst KEY = "sitio:theme";\nconst button = document.querySelector("[data-theme-toggle]");\n\nfunction applyTheme(theme) {\n  document.documentElement.dataset.theme = theme;\n  localStorage.setItem(KEY, theme);\n}\n\napplyTheme(localStorage.getItem(KEY) || "light");\n\nbutton?.addEventListener("click", () => {\n  const current = document.documentElement.dataset.theme;\n  applyTheme(current === "dark" ? "light" : "dark");\n});',
        preview('Preferencia local','<p style="margin:0">Tema guardado en este navegador: <strong>dark</strong></p>'),
        'Explica que localStorage pertenece al navegador, no a la base de datos Django.'
      ),
      D(
        'fetch sin DRF',
        'Usar fetch con una view Django que devuelve JsonResponse',
        'fetch no obliga a instalar Django REST Framework. Una view Django normal puede devolver JsonResponse para una interacción puntual. El navegador hace una segunda petición, Django ejecuta la view y JavaScript procesa el JSON. Es útil para disponibilidad, autocompletado o pequeñas actualizaciones. Para una API grande y reutilizable, Django REST puede ser una mejor arquitectura.',
        '# productos/views.py\nfrom django.http import JsonResponse\n\ndef disponibilidad(request, id):\n    stock = 4\n    return JsonResponse({"id": id, "stock": stock, "disponible": stock > 0})\n\n# productos/urls.py\npath("productos/<int:id>/disponibilidad/", views.disponibilidad, name="disponibilidad"),\n\n// productos/static/productos/js/main.js\nasync function consultarDisponibilidad(id) {\n  const response = await fetch("/productos/" + id + "/disponibilidad/");\n  if (!response.ok) throw new Error("No se pudo consultar");\n  return response.json();\n}',
        preview('Respuesta JSON puntual','<pre style="margin:0">{\n  "id": 7,\n  "stock": 4,\n  "disponible": true\n}</pre>'),
        'Usa JsonResponse para una necesidad pequeña; si empiezas a diseñar una API completa, sepárala como tal.'
      )
    ]
  });
})();
