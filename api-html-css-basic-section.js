(()=>{
  if(window.__apiHtmlCssBasicSectionAdded)return;
  window.__apiHtmlCssBasicSectionAdded=true;

  const preview=html=>`<div style="font-family:system-ui;padding:16px;border:1px solid #334155;border-radius:14px;background:#0b1220;color:#e5edf8">${html}</div>`;
  const B=(topic,name,description,code,html,tip,kind='JavaScript básico + API')=>T(topic,name,description,code,preview(html),[],{kind,tip});
  const add=(title,description,challenge,items)=>sections.push({
    title,
    description,
    quote:'“Primero trae un dato, luego muéstralo; después mejora la presentación.”',
    challenge,
    items
  });

  add(
    'Proyecto básico · API + HTML + CSS + JavaScript',
    'Construye una página muy sencilla que consulta una API gratuita y muestra sus datos en HTML. Se trabaja con tres archivos separados: index.html, styles.css y app.js.',
    'Crea el proyecto completo y consigue mostrar en tarjetas los primeros cinco usuarios de JSONPlaceholder.',
    [
      B(
        'estructura',
        '1. Crear la carpeta y los tres archivos',
        'Para comenzar no necesitas frameworks. Crea una carpeta y dentro tres archivos. index.html contiene la estructura de la página, styles.css controla la apariencia y app.js consulta la API y coloca los datos dentro del HTML.',
        `mi-api-web/\n├── index.html\n├── styles.css\n└── app.js`,
        '<div style="display:grid;gap:8px"><strong>mi-api-web/</strong><span>📄 index.html</span><span>🎨 styles.css</span><span>⚙️ app.js</span></div>',
        'Ejercicio: crea la carpeta y verifica que los tres archivos estén al mismo nivel.'
      ),
      B(
        'HTML',
        '2. Preparar index.html',
        'El HTML solo necesita un título y un contenedor vacío. JavaScript utilizará el id usuarios para encontrar ese contenedor y agregar allí las tarjetas recibidas desde la API. El CSS se enlaza en head y app.js se carga con defer.',
        `<!DOCTYPE html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Usuarios de una API</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n\n  <main class="contenedor">\n    <h1>Usuarios</h1>\n    <p>Datos obtenidos desde una API gratuita.</p>\n\n    <div id="usuarios" class="lista-usuarios"></div>\n  </main>\n\n  <script src="app.js" defer></script>\n</body>\n</html>`,
        '<main style="max-width:560px;margin:auto"><h2 style="margin-top:0">Usuarios</h2><p style="color:#94a3b8">Aquí aparecerán los datos que traiga JavaScript.</p><div style="padding:20px;border:1px dashed #475569;border-radius:12px;text-align:center;color:#64748b">#usuarios</div></main>',
        'El div empieza vacío. Eso es correcto: app.js será quien agregue el contenido.'
      ),
      B(
        'CSS',
        '3. Dar estilo básico con styles.css',
        'Antes de consumir la API puedes preparar el diseño. Usaremos una cuadrícula sencilla y tarjetas. No necesitas Bootstrap ni Tailwind para este ejemplo.',
        `* {\n  box-sizing: border-box;\n}\n\nbody {\n  margin: 0;\n  font-family: Arial, sans-serif;\n  background: #f1f5f9;\n  color: #0f172a;\n}\n\n.contenedor {\n  width: min(900px, 92%);\n  margin: 40px auto;\n}\n\n.lista-usuarios {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 16px;\n  margin-top: 24px;\n}\n\n.tarjeta {\n  background: white;\n  border-radius: 12px;\n  padding: 18px;\n  box-shadow: 0 6px 18px rgba(15, 23, 42, .08);\n}\n\n.tarjeta h2 {\n  margin-top: 0;\n}\n\n.tarjeta p {\n  margin: 6px 0;\n  color: #475569;\n}`,
        '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px"><article style="background:white;color:#0f172a;padding:16px;border-radius:12px"><strong>Ana</strong><p style="color:#475569;margin-bottom:0">ana@email.com</p></article><article style="background:white;color:#0f172a;padding:16px;border-radius:12px"><strong>Luis</strong><p style="color:#475569;margin-bottom:0">luis@email.com</p></article></div>',
        'Ejercicio: cambia el fondo de la página y el border-radius de las tarjetas.'
      ),
      B(
        'fetch',
        '4. Probar la API con un console.log',
        'Antes de modificar el HTML, comprueba que puedes recibir datos. fetch hace una petición GET. Luego respuesta.json() convierte el JSON recibido en datos que JavaScript puede usar. Al principio solo los mostraremos en la consola.',
        `fetch("https://jsonplaceholder.typicode.com/users")\n  .then(function(respuesta) {\n    return respuesta.json();\n  })\n  .then(function(usuarios) {\n    console.log(usuarios);\n  });`,
        '<div><strong>Primera meta</strong><p style="margin-bottom:0;color:#94a3b8">Abrir DevTools → Console y comprobar que aparece un arreglo de usuarios.</p></div>',
        'No intentes diseñar todavía. Primero confirma que la petición funciona.'
      ),
      B(
        'getElementById',
        '5. Encontrar el contenedor del HTML',
        'document.getElementById busca un elemento por su id. Guardamos el div usuarios dentro de una variable para poder escribir contenido en él desde JavaScript.',
        `var contenedor = document.getElementById("usuarios");\n\nconsole.log(contenedor);`,
        '<div style="padding:12px;border:1px solid #334155;border-radius:10px"><code>var contenedor</code> apunta al <code>&lt;div id="usuarios"&gt;</code>.</div>',
        'Ejercicio: cambia temporalmente el id en HTML y observa qué ocurre cuando JavaScript ya no puede encontrarlo.'
      ),
      B(
        'innerHTML',
        '6. Mostrar un solo usuario',
        'Para entender el proceso, primero mostramos únicamente el primer usuario. usuarios[0] representa el primer elemento del arreglo. Con innerHTML escribimos una tarjeta dentro del contenedor.',
        `var contenedor = document.getElementById("usuarios");\n\nfetch("https://jsonplaceholder.typicode.com/users")\n  .then(function(respuesta) {\n    return respuesta.json();\n  })\n  .then(function(usuarios) {\n    var usuario = usuarios[0];\n\n    contenedor.innerHTML =\n      '<article class="tarjeta">' +\n        '<h2>' + usuario.name + '</h2>' +\n        '<p>' + usuario.email + '</p>' +\n        '<p>' + usuario.phone + '</p>' +\n      '</article>';\n  });`,
        '<article style="background:white;color:#0f172a;padding:16px;border-radius:12px"><h3 style="margin-top:0">Leanne Graham</h3><p style="color:#475569">Sincere@april.biz</p><p style="color:#475569;margin-bottom:0">1-770-736-8031</p></article>',
        'Ejercicio: agrega también usuario.website debajo del teléfono.'
      ),
      B(
        'for',
        '7. Mostrar varios usuarios con un for',
        'Una vez que un usuario funciona, repetimos la misma tarjeta usando un for. Este ejemplo evita métodos más avanzados para que sea fácil seguir cada paso. Limitamos el recorrido a cinco usuarios.',
        `var contenedor = document.getElementById("usuarios");\n\nfetch("https://jsonplaceholder.typicode.com/users")\n  .then(function(respuesta) {\n    return respuesta.json();\n  })\n  .then(function(usuarios) {\n    contenedor.innerHTML = "";\n\n    for (var i = 0; i < 5; i++) {\n      var usuario = usuarios[i];\n\n      contenedor.innerHTML +=\n        '<article class="tarjeta">' +\n          '<h2>' + usuario.name + '</h2>' +\n          '<p><strong>Correo:</strong> ' + usuario.email + '</p>' +\n          '<p><strong>Teléfono:</strong> ' + usuario.phone + '</p>' +\n        '</article>';\n    }\n  });`,
        '<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px"><div style="padding:12px;background:white;color:#0f172a;border-radius:10px"><strong>Usuario 1</strong></div><div style="padding:12px;background:white;color:#0f172a;border-radius:10px"><strong>Usuario 2</strong></div><div style="padding:12px;background:white;color:#0f172a;border-radius:10px"><strong>Usuario 3</strong></div><div style="padding:12px;background:white;color:#0f172a;border-radius:10px"><strong>Usuario 4</strong></div></div>',
        'Ejercicio: cambia el límite de 5 a 10 y comprueba cómo responde la cuadrícula CSS.'
      ),
      B(
        'loading',
        '8. Mostrar un mensaje mientras carga',
        'Una petición puede tardar. Es mejor mostrar un mensaje que dejar la pantalla vacía. Antes de fetch escribimos Cargando... y lo reemplazamos cuando llegan los usuarios.',
        `var contenedor = document.getElementById("usuarios");\n\ncontenedor.innerHTML = "<p>Cargando usuarios...</p>";\n\nfetch("https://jsonplaceholder.typicode.com/users")\n  .then(function(respuesta) {\n    return respuesta.json();\n  })\n  .then(function(usuarios) {\n    contenedor.innerHTML = "";\n\n    for (var i = 0; i < usuarios.length; i++) {\n      contenedor.innerHTML +=\n        '<article class="tarjeta">' +\n          '<h2>' + usuarios[i].name + '</h2>' +\n          '<p>' + usuarios[i].email + '</p>' +\n        '</article>';\n    }\n  });`,
        '<div style="text-align:center;color:#94a3b8">⏳ Cargando usuarios...</div>',
        'Ejercicio: cambia el texto por “Consultando API...” y agrégale una clase CSS.'
      ),
      B(
        'catch',
        '9. Mostrar un error sencillo',
        'Si falla Internet o la API, catch permite mostrar un mensaje comprensible. Para principiantes basta con indicar que no se pudieron cargar los datos y dejar el error técnico en console.error.',
        `fetch("https://jsonplaceholder.typicode.com/users")\n  .then(function(respuesta) {\n    if (!respuesta.ok) {\n      throw new Error("Error HTTP");\n    }\n    return respuesta.json();\n  })\n  .then(function(usuarios) {\n    mostrarUsuarios(usuarios);\n  })\n  .catch(function(error) {\n    contenedor.innerHTML =\n      '<p class="error">No se pudieron cargar los usuarios.</p>';\n\n    console.error(error);\n  });`,
        '<div style="padding:12px;border:1px solid #fb7185;border-radius:10px;color:#fecdd3;background:rgba(244,63,94,.08)">No se pudieron cargar los usuarios.</div>',
        'Ejercicio: cambia temporalmente la URL de la API para provocar un error y comprobar el mensaje.'
      ),
      B(
        'proyecto final',
        '10. app.js completo y sencillo',
        'Esta versión reúne el flujo completo sin conceptos innecesarios: obtener el contenedor, mostrar carga, consultar la API, recorrer usuarios, construir HTML y capturar errores.',
        `var contenedor = document.getElementById("usuarios");\n\ncontenedor.innerHTML = "<p>Cargando usuarios...</p>";\n\nfetch("https://jsonplaceholder.typicode.com/users")\n  .then(function(respuesta) {\n    if (!respuesta.ok) {\n      throw new Error("No fue posible consultar la API");\n    }\n\n    return respuesta.json();\n  })\n  .then(function(usuarios) {\n    contenedor.innerHTML = "";\n\n    for (var i = 0; i < usuarios.length; i++) {\n      var usuario = usuarios[i];\n\n      contenedor.innerHTML +=\n        '<article class="tarjeta">' +\n          '<h2>' + usuario.name + '</h2>' +\n          '<p><strong>Correo:</strong> ' + usuario.email + '</p>' +\n          '<p><strong>Teléfono:</strong> ' + usuario.phone + '</p>' +\n          '<p><strong>Web:</strong> ' + usuario.website + '</p>' +\n        '</article>';\n    }\n  })\n  .catch(function(error) {\n    contenedor.innerHTML =\n      '<p class="error">No se pudieron cargar los datos.</p>';\n\n    console.error(error);\n  });`,
        '<div style="display:grid;gap:10px"><div style="padding:12px;border-left:3px solid #38bdf8;background:#111827">1. Buscar contenedor</div><div style="padding:12px;border-left:3px solid #38bdf8;background:#111827">2. Mostrar “Cargando...”</div><div style="padding:12px;border-left:3px solid #38bdf8;background:#111827">3. fetch()</div><div style="padding:12px;border-left:3px solid #38bdf8;background:#111827">4. Convertir JSON</div><div style="padding:12px;border-left:3px solid #38bdf8;background:#111827">5. for + innerHTML</div><div style="padding:12px;border-left:3px solid #38bdf8;background:#111827">6. catch()</div></div>',
        'Reto final: cambia la API de usuarios por https://jsonplaceholder.typicode.com/posts y crea tarjetas que muestren title y body.'
      )
    ]
  );

  buildNav();
  render();
})();