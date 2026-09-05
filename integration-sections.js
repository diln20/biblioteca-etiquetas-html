(()=>{
  if(window.__integrationSectionsAdded)return;
  window.__integrationSectionsAdded=true;

  const source=(html,js,css='')=>`${html}${css?`\n\n<style>\n${css}\n</style>`:''}\n\n<script>\n${js}\n</script>`;
  const preview=(html,js,css='')=>`${css?`<style>${css}</style>`:''}${html}<script>${js}</scr`+'ipt>';
  const I=(label,name,description,html,js,css='',kind='Proyecto')=>T(label,name,description,source(html,js,css),preview(html,js,css),[],{kind});

  sections.push(
    {
      title:'HTML + JavaScript · Principiante',
      description:'Conecta elementos HTML con JavaScript y responde a acciones sencillas del usuario.',
      quote:'“Selecciona un elemento, escucha una acción y actualiza la página.”',
      challenge:'Crea un botón que cambie alternativamente entre dos mensajes.',
      items:[
        I('HTML + JS','Cambiar un texto','Selecciona un elemento por su id y modifica su contenido.',
          '<h2 id="mensaje-hj">Texto original</h2>\n<button id="cambiar-hj">Cambiar texto</button>',
          'const mensaje = document.querySelector("#mensaje-hj");\nconst boton = document.querySelector("#cambiar-hj");\n\nboton.addEventListener("click", () => {\n  mensaje.textContent = "Texto actualizado con JavaScript";\n});'),
        I('HTML + JS','Contador básico','Guarda un valor en una variable y actualízalo con cada clic.',
          '<button id="restar-hj">−</button>\n<strong id="numero-hj">0</strong>\n<button id="sumar-hj">+</button>',
          'let contador = 0;\nconst numero = document.querySelector("#numero-hj");\n\ndocument.querySelector("#sumar-hj").addEventListener("click", () => {\n  numero.textContent = ++contador;\n});\ndocument.querySelector("#restar-hj").addEventListener("click", () => {\n  numero.textContent = --contador;\n});'),
        I('HTML + JS','Saludo desde un formulario','Lee un campo del formulario y muestra una respuesta sin recargar la página.',
          '<form id="saludo-hj">\n  <label>Nombre <input name="nombre" required></label>\n  <button>Saludar</button>\n</form>\n<p id="respuesta-hj"></p>',
          'const formulario = document.querySelector("#saludo-hj");\n\nformulario.addEventListener("submit", evento => {\n  evento.preventDefault();\n  const datos = new FormData(formulario);\n  document.querySelector("#respuesta-hj").textContent =\n    `¡Hola, ${datos.get("nombre")}!`;\n});')
      ]
    },
    {
      title:'HTML + JavaScript · Intermedio',
      description:'Genera contenido, filtra colecciones y valida formularios mediante el DOM.',
      quote:'“El estado de la aplicación determina lo que aparece en el HTML.”',
      challenge:'Crea una lista que permita agregar elementos y eliminarlos individualmente.',
      items:[
        I('HTML + JS','Lista dinámica','Crea nodos HTML a partir de un arreglo de datos.',
          '<ul id="lista-hj"></ul>\n<button id="agregar-hj">Agregar lenguaje</button>',
          'const lenguajes = ["HTML", "CSS"];\nconst lista = document.querySelector("#lista-hj");\n\nfunction renderizar() {\n  lista.innerHTML = lenguajes.map(item => `<li>${item}</li>`).join("");\n}\n\ndocument.querySelector("#agregar-hj").addEventListener("click", () => {\n  if (!lenguajes.includes("JavaScript")) lenguajes.push("JavaScript");\n  renderizar();\n});\nrenderizar();'),
        I('HTML + JS','Buscador en vivo','Filtra elementos mientras el usuario escribe.',
          '<label>Buscar <input id="buscar-hj" placeholder="Escribe un nombre"></label>\n<ul id="resultados-hj"></ul>',
          'const nombres = ["Ana", "Carlos", "Diana", "Mateo"];\nconst entrada = document.querySelector("#buscar-hj");\nconst resultados = document.querySelector("#resultados-hj");\n\nfunction filtrar() {\n  const texto = entrada.value.toLowerCase();\n  resultados.innerHTML = nombres\n    .filter(nombre => nombre.toLowerCase().includes(texto))\n    .map(nombre => `<li>${nombre}</li>`).join("");\n}\nentrada.addEventListener("input", filtrar);\nfiltrar();'),
        I('HTML + JS','Validación personalizada','Comprueba valores y presenta errores accesibles cerca del campo.',
          '<form id="registro-hj" novalidate>\n  <label>Contraseña <input id="clave-hj" type="password"></label>\n  <button>Validar</button>\n</form>\n<p id="error-hj" role="alert"></p>',
          'document.querySelector("#registro-hj").addEventListener("submit", evento => {\n  evento.preventDefault();\n  const clave = document.querySelector("#clave-hj").value;\n  document.querySelector("#error-hj").textContent = clave.length >= 8\n    ? "Contraseña válida"\n    : "Debe contener al menos 8 caracteres";\n});')
      ]
    },
    {
      title:'HTML + JavaScript · Avanzado',
      description:'Organiza estado, componentes y procesos asíncronos para interfaces mantenibles.',
      quote:'“Separa los datos, la lógica y la representación.”',
      challenge:'Construye una tabla que cargue datos asíncronos y permita ordenarlos.',
      items:[
        I('HTML + JS','Estado y renderizado','Mantén los datos en un objeto y genera la interfaz desde una función.',
          '<div id="estado-hj"></div>\n<button id="alternar-hj">Alternar sesión</button>',
          'const estado = { conectado: false, usuario: "Elena" };\nconst vista = document.querySelector("#estado-hj");\n\nfunction render() {\n  vista.innerHTML = estado.conectado\n    ? `<strong>Bienvenida, ${estado.usuario}</strong>`\n    : "Sesión cerrada";\n}\n\ndocument.querySelector("#alternar-hj").addEventListener("click", () => {\n  estado.conectado = !estado.conectado;\n  render();\n});\nrender();'),
        I('HTML + JS','Contenido asíncrono','Muestra estados de carga, éxito y error mientras esperas una promesa.',
          '<button id="cargar-hj">Cargar datos</button>\n<p id="datos-hj">Sin datos</p>',
          'const esperarDatos = () => new Promise(resolve =>\n  setTimeout(() => resolve(["HTML", "CSS", "JavaScript"]), 700)\n);\n\ndocument.querySelector("#cargar-hj").addEventListener("click", async () => {\n  const salida = document.querySelector("#datos-hj");\n  salida.textContent = "Cargando…";\n  try {\n    const datos = await esperarDatos();\n    salida.textContent = datos.join(" · ");\n  } catch {\n    salida.textContent = "No fue posible cargar";\n  }\n});'),
        I('HTML + JS','Componente reutilizable','Una clase puede encapsular el estado y comportamiento de una parte de la interfaz.',
          '<div id="componente-hj"></div>',
          'class Contador {\n  constructor(elemento) {\n    this.elemento = elemento;\n    this.valor = 0;\n    this.render();\n  }\n\n  render() {\n    this.elemento.innerHTML = `<button>Conteo: ${this.valor}</button>`;\n    this.elemento.querySelector("button").onclick = () => {\n      this.valor++;\n      this.render();\n    };\n  }\n}\n\nnew Contador(document.querySelector("#componente-hj"));')
      ]
    },
    {
      title:'HTML + CSS + JavaScript · Principiante',
      description:'Combina estructura, apariencia y eventos en pequeños componentes interactivos.',
      quote:'“HTML estructura, CSS presenta y JavaScript responde.”',
      challenge:'Diseña un botón que cambie el color y el texto de una tarjeta.',
      items:[
        I('HTML + CSS + JS','Tarjeta que cambia de tema','JavaScript alterna una clase cuyos estilos están definidos en CSS.',
          '<article class="tema-demo" id="tema-demo">\n  <h2>Mi tarjeta</h2>\n  <p>Haz clic para cambiar el tema.</p>\n  <button id="tema-boton">Cambiar tema</button>\n</article>',
          'document.querySelector("#tema-boton").addEventListener("click", () => {\n  document.querySelector("#tema-demo").classList.toggle("oscuro");\n});',
          '.tema-demo { padding: 18px; border-radius: 14px; background: #e0f2fe; color: #0c4a6e; transition: .25s; }\n.tema-demo.oscuro { background: #0f172a; color: white; }\n.tema-demo button { padding: 8px 12px; border: 0; border-radius: 8px; cursor: pointer; }'),
        I('HTML + CSS + JS','Contador visual','Combina controles, estilos y una variable JavaScript.',
          '<div class="contador-demo">\n  <button id="menos-demo">−</button>\n  <strong id="valor-demo">0</strong>\n  <button id="mas-demo">+</button>\n</div>',
          'let valor = 0;\nconst salida = document.querySelector("#valor-demo");\ndocument.querySelector("#mas-demo").onclick = () => salida.textContent = ++valor;\ndocument.querySelector("#menos-demo").onclick = () => salida.textContent = --valor;',
          '.contador-demo { display: flex; justify-content: center; align-items: center; gap: 14px; }\n.contador-demo strong { min-width: 50px; text-align: center; font-size: 28px; color: #1d4ed8; }\n.contador-demo button { width: 42px; height: 42px; border: 0; border-radius: 50%; color: white; background: #2563eb; font-size: 22px; cursor: pointer; }'),
        I('HTML + CSS + JS','Formulario con respuesta','Valida un campo y comunica visualmente el resultado.',
          '<form class="correo-demo" id="correo-form">\n  <label for="correo-cj">Correo electrónico</label>\n  <input id="correo-cj" type="email" required>\n  <button>Comprobar</button>\n  <p id="correo-estado"></p>\n</form>',
          'document.querySelector("#correo-form").addEventListener("submit", evento => {\n  evento.preventDefault();\n  const campo = document.querySelector("#correo-cj");\n  const estado = document.querySelector("#correo-estado");\n  estado.textContent = campo.validity.valid ? "Correo válido" : "Revisa el correo";\n  estado.className = campo.validity.valid ? "correcto" : "error";\n});',
          '.correo-demo { display: grid; gap: 8px; max-width: 360px; font-family: system-ui; }\n.correo-demo input, .correo-demo button { padding: 10px; border: 1px solid #94a3b8; border-radius: 8px; }\n.correo-demo button { color: white; background: #2563eb; cursor: pointer; }\n.correcto { color: #15803d; } .error { color: #dc2626; }')
      ]
    },
    {
      title:'HTML + CSS + JavaScript · Intermedio',
      description:'Construye patrones habituales con estado, renderizado y estilos reutilizables.',
      quote:'“Una interfaz consistente nace de componentes con responsabilidades claras.”',
      challenge:'Crea una aplicación de tareas con agregar, completar, filtrar y eliminar.',
      items:[
        I('HTML + CSS + JS','Pestañas accesibles','Relaciona botones y paneles, y alterna su estado activo.',
          '<div class="tabs-demo">\n  <div role="tablist">\n    <button role="tab" data-panel="html-panel">HTML</button>\n    <button role="tab" data-panel="css-panel">CSS</button>\n  </div>\n  <section id="html-panel">Estructura el contenido.</section>\n  <section id="css-panel" hidden>Diseña la interfaz.</section>\n</div>',
          'document.querySelectorAll("[role=tab]").forEach(tab => {\n  tab.addEventListener("click", () => {\n    document.querySelectorAll(".tabs-demo section").forEach(panel => panel.hidden = true);\n    document.querySelector(`#${tab.dataset.panel}`).hidden = false;\n  });\n});',
          '.tabs-demo [role=tablist] { display: flex; gap: 6px; }\n.tabs-demo button { padding: 9px 14px; border: 0; border-radius: 8px 8px 0 0; background: #dbeafe; cursor: pointer; }\n.tabs-demo section { padding: 18px; border: 1px solid #93c5fd; border-radius: 0 10px 10px; }'),
        I('HTML + CSS + JS','Lista de tareas','Renderiza una colección y actualiza su estado desde la interfaz.',
          '<form class="tareas-demo" id="tareas-form"><input name="tarea" placeholder="Nueva tarea" required><button>Agregar</button></form>\n<ul class="tareas-lista" id="tareas-lista"></ul>',
          'const tareas = [];\nconst lista = document.querySelector("#tareas-lista");\nfunction render() {\n  lista.innerHTML = tareas.map((tarea, i) => `<li>${tarea} <button data-i="${i}">×</button></li>`).join("");\n}\ndocument.querySelector("#tareas-form").onsubmit = evento => {\n  evento.preventDefault();\n  tareas.push(new FormData(evento.target).get("tarea"));\n  evento.target.reset();\n  render();\n};\nlista.onclick = evento => {\n  const i = evento.target.dataset.i;\n  if (i !== undefined) { tareas.splice(i, 1); render(); }\n};',
          '.tareas-demo { display: flex; gap: 8px; }\n.tareas-demo input { flex: 1; padding: 9px; }\n.tareas-demo button, .tareas-lista button { border: 0; border-radius: 7px; color: white; background: #2563eb; cursor: pointer; }\n.tareas-lista { padding: 0; list-style: none; }\n.tareas-lista li { display: flex; justify-content: space-between; margin-top: 8px; padding: 10px; border-radius: 8px; background: #eff6ff; }'),
        I('HTML + CSS + JS','Galería filtrable','Usa data attributes para relacionar categorías, controles y tarjetas.',
          '<div class="filtros-demo"><button data-filtro="todos">Todos</button><button data-filtro="web">Web</button><button data-filtro="diseño">Diseño</button></div>\n<div class="galeria-demo"><article data-tipo="web">Sitio web</article><article data-tipo="diseño">Logotipo</article><article data-tipo="web">Aplicación</article></div>',
          'document.querySelector(".filtros-demo").addEventListener("click", evento => {\n  const filtro = evento.target.dataset.filtro;\n  if (!filtro) return;\n  document.querySelectorAll(".galeria-demo article").forEach(tarjeta => {\n    tarjeta.hidden = filtro !== "todos" && tarjeta.dataset.tipo !== filtro;\n  });\n});',
          '.filtros-demo { display: flex; gap: 8px; margin-bottom: 12px; }\n.filtros-demo button { padding: 8px 12px; border: 0; border-radius: 999px; background: #dbeafe; cursor: pointer; }\n.galeria-demo { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }\n.galeria-demo article { padding: 20px 10px; border-radius: 10px; text-align: center; background: #f1f5f9; }')
      ]
    },
    {
      title:'HTML + CSS + JavaScript · Avanzado',
      description:'Integra arquitectura de estado, asincronía y componentes completos.',
      quote:'“Una aplicación sólida mantiene sincronizados datos, interfaz y acciones.”',
      challenge:'Construye un catálogo asíncrono con búsqueda, carrito y resumen del total.',
      items:[
        I('HTML + CSS + JS','Carrito con estado','Centraliza productos y cantidades, y vuelve a renderizar al cambiar el estado.',
          '<section class="carrito-demo"><button data-producto="HTML">Agregar HTML</button><button data-producto="CSS">Agregar CSS</button><ul id="carrito-lista"></ul><strong id="carrito-total"></strong></section>',
          'const carrito = [];\nfunction renderCarrito() {\n  document.querySelector("#carrito-lista").innerHTML = carrito.map(item => `<li>${item}</li>`).join("");\n  document.querySelector("#carrito-total").textContent = `Productos: ${carrito.length}`;\n}\ndocument.querySelector(".carrito-demo").onclick = evento => {\n  if (evento.target.dataset.producto) {\n    carrito.push(evento.target.dataset.producto);\n    renderCarrito();\n  }\n};\nrenderCarrito();',
          '.carrito-demo { padding: 16px; border: 1px solid #cbd5e1; border-radius: 12px; }\n.carrito-demo button { margin: 3px; padding: 9px 12px; border: 0; border-radius: 8px; color: white; background: #7c3aed; cursor: pointer; }\n#carrito-lista { min-height: 30px; }'),
        I('HTML + CSS + JS','Panel asíncrono','Representa visualmente los estados de espera, éxito y error.',
          '<section class="panel-async"><button id="panel-cargar">Actualizar métricas</button><div id="panel-estado">Pulsa actualizar</div></section>',
          'const obtenerMetricas = () => new Promise(resolve =>\n  setTimeout(() => resolve({ usuarios: 128, cursos: 12 }), 700)\n);\ndocument.querySelector("#panel-cargar").onclick = async () => {\n  const estado = document.querySelector("#panel-estado");\n  estado.className = "cargando";\n  estado.textContent = "Cargando…";\n  try {\n    const datos = await obtenerMetricas();\n    estado.className = "listo";\n    estado.innerHTML = `<strong>${datos.usuarios}</strong> usuarios · <strong>${datos.cursos}</strong> cursos`;\n  } catch {\n    estado.className = "error";\n    estado.textContent = "Error al actualizar";\n  }\n};',
          '.panel-async { display: grid; gap: 12px; padding: 18px; border-radius: 14px; background: #f8fafc; }\n.panel-async button { width: max-content; padding: 9px 13px; border: 0; border-radius: 8px; color: white; background: #0f766e; }\n#panel-estado { padding: 14px; border-radius: 9px; }\n.cargando { background: #fef3c7; } .listo { background: #dcfce7; } .error { background: #fee2e2; }'),
        I('HTML + CSS + JS','Cuestionario interactivo','Modela preguntas como datos y deriva de ellas la interfaz y puntuación.',
          '<section class="quiz-demo"><h3 id="quiz-pregunta"></h3><div id="quiz-opciones"></div><p id="quiz-resultado"></p></section>',
          'const preguntas = [{ texto: "¿Qué estructura una página?", opciones: ["CSS", "HTML"], correcta: "HTML" }];\nlet indice = 0;\nfunction renderQuiz() {\n  const pregunta = preguntas[indice];\n  document.querySelector("#quiz-pregunta").textContent = pregunta.texto;\n  document.querySelector("#quiz-opciones").innerHTML = pregunta.opciones.map(opcion => `<button>${opcion}</button>`).join("");\n}\ndocument.querySelector("#quiz-opciones").onclick = evento => {\n  if (evento.target.tagName !== "BUTTON") return;\n  document.querySelector("#quiz-resultado").textContent = evento.target.textContent === preguntas[indice].correcta ? "¡Correcto!" : "Inténtalo de nuevo";\n};\nrenderQuiz();',
          '.quiz-demo { padding: 20px; border-radius: 14px; color: #1e293b; background: #eef2ff; text-align: center; }\n#quiz-opciones { display: flex; justify-content: center; gap: 10px; }\n#quiz-opciones button { padding: 9px 18px; border: 1px solid #818cf8; border-radius: 8px; background: white; cursor: pointer; }\n#quiz-resultado { min-height: 24px; font-weight: 800; color: #4338ca; }')
      ]
    }
  );

  buildNav();
  render();
})();
