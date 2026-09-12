(()=>{
  if(window.__freeApisSectionAdded)return;
  window.__freeApisSectionAdded=true;

  const box=html=>`<div style="font-family:system-ui;padding:16px;border:1px solid #334155;border-radius:14px;background:#0b1220;color:#e5edf8">${html}</div>`;
  const A=(topic,name,description,code,preview,tip,kind='APIs gratuitas')=>T(topic,name,description,code,box(preview),[],{kind,tip});
  const add=(title,description,challenge,items)=>sections.push({
    title,
    description,
    quote:'“Consumir una API significa pedir datos a otro sistema, comprobar la respuesta y transformarla en una experiencia útil.”',
    challenge,
    items
  });

  add(
    'APIs gratuitas · 1. Conceptos desde cero',
    'Aprende qué es una API, qué es un endpoint, cómo viaja una petición HTTP y cómo leer una respuesta JSON antes de escribir código.',
    'Abre una API pública en el navegador, identifica la URL del endpoint y explica qué datos devuelve.',
    [
      A(
        'API',
        '¿Qué es una API?',
        'Una API permite que dos programas intercambien información mediante reglas conocidas. En desarrollo web es común que el navegador o un backend envíen una petición HTTP a una URL y reciban datos en JSON. La página no necesita saber cómo está construida internamente la aplicación que ofrece los datos.',
        'Aplicación\n   ↓ petición HTTP\nAPI externa\n   ↓ respuesta JSON\nAplicación\n   ↓ procesa datos\nInterfaz del usuario',
        '<div style="display:grid;gap:8px;text-align:center"><strong>Tu aplicación</strong><span>↓ GET</span><strong>API pública</strong><span>↓ JSON</span><strong>Datos en pantalla</strong></div>',
        'Ejercicio: explica con tus palabras la diferencia entre una página web y una API.'
      ),
      A(
        'endpoint',
        'Endpoint, recurso y URL',
        'Un endpoint es una dirección concreta de una API. Cada endpoint representa un recurso o una operación. Por ejemplo, JSONPlaceholder ofrece /posts para publicaciones y /users para usuarios. Cambiar la ruta o los parámetros cambia la información solicitada.',
        'https://jsonplaceholder.typicode.com/posts\nhttps://jsonplaceholder.typicode.com/posts/1\nhttps://jsonplaceholder.typicode.com/users\nhttps://jsonplaceholder.typicode.com/posts?userId=1',
        '<div><strong>Base:</strong> jsonplaceholder.typicode.com<br><strong>Recurso:</strong> /posts<br><strong>ID:</strong> /posts/1<br><strong>Filtro:</strong> ?userId=1</div>',
        'Ejercicio: abre /posts/1 y /users/1 y compara la estructura de ambos JSON.'
      ),
      A(
        'HTTP',
        'Métodos HTTP y códigos de estado',
        'GET consulta datos, POST solicita crear, PUT suele reemplazar, PATCH modifica parcialmente y DELETE elimina. La respuesta también incluye un código de estado: 200 indica éxito, 201 creación, 204 éxito sin cuerpo, 400 petición incorrecta, 404 recurso inexistente y 500 error del servidor.',
        'GET    /posts        → consultar\nPOST   /posts        → crear\nPATCH  /posts/1      → modificar\nDELETE /posts/1      → eliminar\n\n200 OK\n201 Created\n404 Not Found\n500 Internal Server Error',
        '<table style="width:100%;border-collapse:collapse"><tr><th>Método</th><th>Uso</th></tr><tr><td>GET</td><td>Leer</td></tr><tr><td>POST</td><td>Crear</td></tr><tr><td>PATCH</td><td>Modificar</td></tr><tr><td>DELETE</td><td>Eliminar</td></tr></table>',
        'Ejercicio: indica qué método usarías para listar productos, crear uno, cambiar su precio y eliminarlo.'
      ),
      A(
        'JSON',
        'Comprender una respuesta JSON',
        'JSON representa datos mediante objetos, arreglos, strings, números, booleanos y null. Cuando fetch obtiene una respuesta, response.json() convierte el cuerpo JSON en valores de JavaScript que pueden recorrerse y mostrarse.',
        '{\n  "id": 1,\n  "nombre": "Ana",\n  "activo": true,\n  "cursos": ["HTML", "CSS", "JavaScript"]\n}',
        '<pre style="margin:0;color:#dbeafe">objeto → { }\narreglo → [ ]\npropiedad → "nombre": "Ana"\nboolean → true</pre>',
        'Ejercicio: crea un objeto JSON que represente un estudiante con nombre, edad, activo y tres materias.'
      ),
      A(
        'CORS',
        'CORS, límites y claves',
        'No todas las APIs permiten llamadas directas desde el navegador. CORS define qué orígenes pueden consumir una API desde frontend. Además, algunas APIs tienen límites de uso o requieren una clave. Nunca coloques una clave secreta en JavaScript público; cuando exista un secreto, haz la petición desde tu backend y guarda la clave en variables de entorno.',
        '// Frontend: solo APIs que permitan CORS y no requieran secretos\nfetch("https://api.example.com/public")\n\n# Backend / .env\nAPI_KEY=valor-secreto\n\n# Nunca subir .env a Git\n.env',
        '<div style="display:grid;gap:8px"><div>✅ API pública sin secreto → frontend posible</div><div>🔐 API con clave privada → backend</div><div>⏱️ Revisa límites de uso</div><div>📄 Lee siempre la documentación</div></div>',
        'Ejercicio: explica por qué una API key privada no debe escribirse directamente dentro de app.js.'
      )
    ]
  );

  add(
    'APIs gratuitas · 2. JavaScript + fetch',
    'Consume APIs públicas sin clave desde JavaScript y aprende el flujo fetch → comprobar respuesta → convertir JSON → mostrar datos.',
    'Consulta JSONPlaceholder y muestra los primeros cinco títulos dentro de una lista HTML.',
    [
      A(
        'fetch',
        'Primera petición con JSONPlaceholder',
        'JSONPlaceholder es una API gratuita de datos ficticios para pruebas y prototipos. El endpoint /posts devuelve publicaciones. fetch inicia la petición; await espera la respuesta; response.ok permite detectar errores HTTP y response.json() convierte el cuerpo a JavaScript.',
        `async function cargarPosts() {\n  const respuesta = await fetch(\n    "https://jsonplaceholder.typicode.com/posts"\n  );\n\n  if (!respuesta.ok) {\n    throw new Error("No se pudieron cargar los posts");\n  }\n\n  const posts = await respuesta.json();\n  console.log(posts);\n}\n\ncargarPosts();`,
        '<div><strong>GET /posts</strong><p style="margin-bottom:0;color:#94a3b8">Devuelve una colección de publicaciones ficticias.</p></div>',
        'Ejercicio: cambia /posts por /users y muestra en consola solamente el nombre de cada usuario.'
      ),
      A(
        'render',
        'Mostrar los datos en HTML',
        'Después de obtener los datos, puedes transformarlos a elementos HTML. Conviene separar la función que consulta la API de la función que renderiza la interfaz. Esto facilita pruebas, mantenimiento y manejo de errores.',
        `<ul id="lista-posts"></ul>\n\n<script>\nasync function cargar() {\n  const respuesta = await fetch(\n    "https://jsonplaceholder.typicode.com/posts?_limit=5"\n  );\n  const posts = await respuesta.json();\n\n  const lista = document.querySelector("#lista-posts");\n  lista.innerHTML = posts\n    .map(post => \`<li>\${post.title}</li>\`)\n    .join("");\n}\n\ncargar();\n</script>`,
        '<ul style="margin:0;padding-left:20px"><li>Post de ejemplo 1</li><li>Post de ejemplo 2</li><li>Post de ejemplo 3</li></ul>',
        'Ejercicio: muestra también el body de cada publicación dentro de una tarjeta.'
      ),
      A(
        'loading',
        'Estado de carga, error y éxito',
        'Una interfaz no debe quedarse en blanco mientras espera. Antes de llamar la API muestra “Cargando…”. Si ocurre un error, presenta un mensaje comprensible. Cuando llegan los datos, reemplaza el estado por el resultado.',
        `const estado = document.querySelector("#estado");\n\nasync function cargarDatos() {\n  estado.textContent = "Cargando...";\n\n  try {\n    const respuesta = await fetch(URL);\n    if (!respuesta.ok) throw new Error("HTTP " + respuesta.status);\n\n    const datos = await respuesta.json();\n    estado.textContent = "Datos cargados";\n    render(datos);\n  } catch (error) {\n    estado.textContent = "No fue posible cargar la información";\n    console.error(error);\n  }\n}`,
        '<div style="display:flex;gap:10px;flex-wrap:wrap"><span style="padding:7px 10px;border-radius:8px;background:#1e293b">⏳ Cargando</span><span style="padding:7px 10px;border-radius:8px;background:#052e2b">✓ Éxito</span><span style="padding:7px 10px;border-radius:8px;background:#3f111c">! Error</span></div>',
        'Ejercicio: agrega un botón “Reintentar” cuando falle la petición.'
      ),
      A(
        'POST',
        'Simular un POST con JSONPlaceholder',
        'JSONPlaceholder permite practicar POST, PUT, PATCH y DELETE, pero los cambios se simulan y no se guardan realmente. Es ideal para aprender el formato de una petición sin necesitar un backend propio.',
        `async function crearPost() {\n  const respuesta = await fetch(\n    "https://jsonplaceholder.typicode.com/posts",\n    {\n      method: "POST",\n      headers: {\n        "Content-Type": "application/json"\n      },\n      body: JSON.stringify({\n        title: "Mi publicación",\n        body: "Contenido de prueba",\n        userId: 1\n      })\n    }\n  );\n\n  const creado = await respuesta.json();\n  console.log(creado);\n}\n\ncrearPost();`,
        '<div><strong>POST simulado</strong><p style="margin-bottom:0;color:#94a3b8">La API responde como si hubiera creado el recurso, pero no persiste el cambio.</p></div>',
        'Ejercicio: practica PATCH para cambiar únicamente el title del post 1.'
      )
    ]
  );

  add(
    'APIs gratuitas · 3. Proyectos con datos reales y de prueba',
    'Practica con APIs útiles que no necesitan clave para estos ejemplos: DummyJSON, PokéAPI y Open-Meteo.',
    'Elige una API y construye una interfaz que tenga búsqueda, estado de carga, error y una tarjeta con los resultados.',
    [
      A(
        'DummyJSON',
        'Catálogo de productos con DummyJSON',
        'DummyJSON ofrece datos ficticios de productos, usuarios, carritos, recetas y más. Es muy útil para practicar tiendas y dashboards. /products devuelve un objeto que contiene el arreglo products, además de información de paginación.',
        `async function cargarProductos() {\n  const respuesta = await fetch(\n    "https://dummyjson.com/products?limit=6"\n  );\n  const datos = await respuesta.json();\n\n  datos.products.forEach(producto => {\n    console.log(producto.title, producto.price);\n  });\n}\n\ncargarProductos();`,
        '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px"><div style="padding:10px;border:1px solid #334155;border-radius:10px">Producto A<br><small>$19.99</small></div><div style="padding:10px;border:1px solid #334155;border-radius:10px">Producto B<br><small>$29.99</small></div></div>',
        'Ejercicio: construye seis tarjetas con imagen, título, precio y categoría. Después agrega un buscador usando /products/search?q=.',
        'API de prueba'
      ),
      A(
        'PokéAPI',
        'Buscador de Pokémon con PokéAPI',
        'PokéAPI es una API de consulta abierta que no requiere autenticación. Puedes pedir un Pokémon por nombre o id y recibir estadísticas, tipos, sprites y muchos otros recursos. Es apropiada para practicar formularios de búsqueda y renderizado de objetos anidados.',
        `async function buscarPokemon(nombre) {\n  const respuesta = await fetch(\n    \`https://pokeapi.co/api/v2/pokemon/\${nombre.toLowerCase()}\`\n  );\n\n  if (!respuesta.ok) {\n    throw new Error("Pokémon no encontrado");\n  }\n\n  const pokemon = await respuesta.json();\n\n  console.log({\n    nombre: pokemon.name,\n    altura: pokemon.height,\n    tipos: pokemon.types.map(t => t.type.name),\n    imagen: pokemon.sprites.front_default\n  });\n}\n\nbuscarPokemon("pikachu");`,
        '<div style="text-align:center"><div style="font-size:42px">⚡</div><strong>Pikachu</strong><p style="margin:5px 0 0;color:#94a3b8">tipo: electric</p></div>',
        'Ejercicio: crea un input para buscar por nombre y muestra imagen, tipos, altura y peso. Maneja el caso 404.',
        'API abierta'
      ),
      A(
        'Open-Meteo',
        'Clima con Open-Meteo',
        'Open-Meteo ofrece datos meteorológicos mediante parámetros de latitud y longitud. Para uso no comercial ofrece acceso gratuito sin clave en los límites indicados por su documentación. El ejemplo pide temperatura actual, humedad y velocidad del viento para unas coordenadas.',
        `const latitud = 7.1254;\nconst longitud = -73.1198;\n\nconst url = new URL(\n  "https://api.open-meteo.com/v1/forecast"\n);\nurl.searchParams.set("latitude", latitud);\nurl.searchParams.set("longitude", longitud);\nurl.searchParams.set(\n  "current",\n  "temperature_2m,relative_humidity_2m,wind_speed_10m"\n);\n\nconst respuesta = await fetch(url);\nconst clima = await respuesta.json();\nconsole.log(clima.current);`,
        '<div style="display:flex;gap:10px;align-items:center"><span style="font-size:36px">🌤️</span><div><strong>Clima actual</strong><div style="color:#94a3b8">Temperatura · Humedad · Viento</div></div></div>',
        'Ejercicio: agrega dos campos para latitud y longitud y permite consultar cualquier ubicación. Luego investiga la API de geocodificación para buscar por ciudad.',
        'API de datos reales'
      ),
      A(
        'comparar',
        '¿Cuál API usar para practicar?',
        'Elige la API según el objetivo de aprendizaje. JSONPlaceholder es simple para HTTP y CRUD simulado; DummyJSON sirve para interfaces de productos y usuarios; PokéAPI permite practicar objetos anidados e imágenes; Open-Meteo introduce parámetros reales y datos que cambian con el tiempo.',
        `JSONPlaceholder → HTTP y CRUD simulado\nDummyJSON       → tiendas, usuarios, búsquedas\nPokéAPI         → búsqueda, objetos anidados, imágenes\nOpen-Meteo      → parámetros, geodatos y clima real`,
        '<div style="display:grid;gap:8px"><div>🧪 JSONPlaceholder → empezar</div><div>🛒 DummyJSON → catálogos</div><div>⚡ PokéAPI → buscadores</div><div>🌤️ Open-Meteo → datos reales</div></div>',
        'Actividad: propone un proyecto diferente para cada una de las cuatro APIs.',
        'Selección de API'
      )
    ]
  );

  add(
    'APIs gratuitas · 4. Consumir una API desde Django',
    'Aprende a realizar la petición desde el servidor con Django, procesar el JSON en Python y enviar solo los datos necesarios al template.',
    'Crea una vista Django que consulte PokéAPI o DummyJSON y renderice el resultado en una plantilla propia.',
    [
      A(
        'requests',
        'Instalar requests',
        'Django puede consumir una API externa desde views.py usando la biblioteca requests. La petición se ejecuta en el servidor, no en el navegador. Esto resulta útil cuando la API necesita una clave privada, cuando quieres transformar datos o cuando deseas centralizar la lógica.',
        `python -m pip install requests\n\n# requirements.txt\nDjango\nrequests`,
        '<div><strong>Django servidor</strong><br><span style="color:#94a3b8">requests → API externa → JSON → template</span></div>',
        'Ejercicio: instala requests y confirma desde Python que puedes importar la librería sin errores.',
        'Django'
      ),
      A(
        'view',
        'Vista Django que consulta PokéAPI',
        'La vista recibe el nombre desde la URL, solicita el recurso a PokéAPI, verifica el estado y crea un contexto pequeño para el template. No es necesario enviar al HTML el enorme JSON completo si la página solo utiliza cuatro datos.',
        `# views.py\nimport requests\nfrom django.shortcuts import render\n\ndef pokemon(request, nombre="pikachu"):\n    url = f"https://pokeapi.co/api/v2/pokemon/{nombre.lower()}"\n\n    try:\n        respuesta = requests.get(url, timeout=5)\n        respuesta.raise_for_status()\n        datos = respuesta.json()\n\n        contexto = {\n            "pokemon": {\n                "nombre": datos["name"],\n                "imagen": datos["sprites"]["front_default"],\n                "altura": datos["height"],\n                "peso": datos["weight"],\n            }\n        }\n    except requests.RequestException:\n        contexto = {"error": "No fue posible consultar la API"}\n\n    return render(request, "pokemon/detalle.html", contexto)`,
        '<div style="display:grid;gap:6px"><strong>views.py</strong><span>1. recibe solicitud</span><span>2. llama PokéAPI</span><span>3. procesa JSON</span><span>4. envía contexto</span></div>',
        'Ejercicio: agrega los tipos del Pokémon al contexto usando una comprensión de listas.',
        'Django'
      ),
      A(
        'template',
        'Mostrar la respuesta en el template',
        'El template no necesita conocer requests ni la URL de la API. Solo recibe el contexto que preparó la vista. Esto mantiene la capa visual sencilla y permite manejar estados de éxito y error mediante etiquetas de plantilla.',
        `{% if error %}\n  <p class="error">{{ error }}</p>\n{% else %}\n  <article class="pokemon">\n    <img src="{{ pokemon.imagen }}" alt="{{ pokemon.nombre }}">\n    <h1>{{ pokemon.nombre|title }}</h1>\n    <p>Altura: {{ pokemon.altura }}</p>\n    <p>Peso: {{ pokemon.peso }}</p>\n  </article>\n{% endif %}`,
        '<article style="text-align:center;padding:12px;border:1px solid #334155;border-radius:12px"><div style="font-size:42px">⚡</div><strong>Pikachu</strong><p style="margin-bottom:0;color:#94a3b8">Datos entregados por la vista Django</p></article>',
        'Ejercicio: aplica CSS a la tarjeta y agrega un estado visual diferente cuando exista error.',
        'Django Template'
      ),
      A(
        'timeout',
        'Timeouts, errores y dependencia externa',
        'Cuando tu aplicación depende de otra API, esa API puede tardar, fallar o cambiar. Usa timeout, captura errores y evita que una caída externa bloquee toda la página. Para proyectos mayores también conviene cachear respuestas y revisar los términos y límites de uso.',
        `try:\n    respuesta = requests.get(url, timeout=5)\n    respuesta.raise_for_status()\nexcept requests.Timeout:\n    mensaje = "La API tardó demasiado"\nexcept requests.HTTPError:\n    mensaje = "La API respondió con un error"\nexcept requests.RequestException:\n    mensaje = "No hay conexión con el servicio externo"`,
        '<div style="display:grid;gap:7px"><div>⏱️ timeout</div><div>⚠️ manejo de error HTTP</div><div>💾 caché cuando tenga sentido</div><div>📚 revisar documentación y límites</div></div>',
        'Ejercicio: modifica la vista para diferenciar un 404 de un problema de conexión.',
        'Buenas prácticas'
      )
    ]
  );

  add(
    'APIs gratuitas · 5. Retos para estudiantes',
    'Aplica lo aprendido con proyectos pequeños que aumentan progresivamente de dificultad.',
    'Escoge uno de los proyectos y constrúyelo completo con HTML, CSS y JavaScript o con Django.',
    [
      A('Reto 1','Lista de usuarios','Consulta JSONPlaceholder /users y crea tarjetas con nombre, correo, ciudad y sitio web. Agrega un buscador local por nombre.','GET https://jsonplaceholder.typicode.com/users','<strong>Nivel inicial</strong><p style="margin-bottom:0;color:#94a3b8">fetch + array + map + DOM</p>','No copies el HTML manualmente: genera las tarjetas recorriendo los datos.','Proyecto'),
      A('Reto 2','Tienda ficticia','Usa DummyJSON para mostrar productos, buscarlos y filtrarlos por categoría. Agrega estados de carga y error.','GET https://dummyjson.com/products\nGET https://dummyjson.com/products/search?q=phone','<strong>Nivel intermedio</strong><p style="margin-bottom:0;color:#94a3b8">búsqueda + tarjetas + filtros + imágenes</p>','Divide el código en funciones: consultar, renderizar, filtrar y manejar errores.','Proyecto'),
      A('Reto 3','Pokédex','Crea un formulario que busque Pokémon por nombre y muestre imagen, tipos, estadísticas y movimientos.','GET https://pokeapi.co/api/v2/pokemon/pikachu','<strong>Nivel intermedio</strong><p style="margin-bottom:0;color:#94a3b8">formulario + objetos anidados + 404</p>','No olvides normalizar el texto con trim() y toLowerCase().','Proyecto'),
      A('Reto 4','Panel meteorológico','Usa Open-Meteo para mostrar clima actual y pronóstico. Empieza con coordenadas fijas y luego agrega selección de ubicación.','GET https://api.open-meteo.com/v1/forecast?...','<strong>Nivel avanzado</strong><p style="margin-bottom:0;color:#94a3b8">query params + datos reales + gráficos opcionales</p>','Incluye unidades y fecha/hora para que el usuario entienda el dato.','Proyecto'),
      A('Reto 5','Django + API externa','Crea una aplicación Django donde la vista consulte una API pública, transforme la respuesta y renderice un template con CSS.','URL → view Django → requests → API externa → contexto → template','<strong>Nivel avanzado</strong><p style="margin-bottom:0;color:#94a3b8">backend + API + template + manejo de errores</p>','Incluye timeout, error amigable y una página que siga funcionando aunque la API externa falle.','Proyecto')
    ]
  );

  buildNav();
  render();
})();
