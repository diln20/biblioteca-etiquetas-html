(()=>{
  if(window.__javascriptSectionAdded)return;
  window.__javascriptSectionAdded=true;

  const output=text=>`<pre style="padding:12px;background:#f3f4f6;border-radius:8px">${text}</pre>`;
  const interactive=(html,js)=>html+'<script>'+js+'</scr'+'ipt>';
  const course={
    title:'JavaScript',
    description:'Fundamentos, DOM, eventos y herramientas modernas para añadir comportamiento a la web.',
    quote:'“JavaScript convierte una página en una experiencia interactiva.”',
    challenge:'Crea una lista interactiva que permita agregar y eliminar elementos.',
    items:[
      T('script','Agregar JavaScript','JavaScript puede escribirse en una etiqueta script o cargarse desde un archivo externo.','<script src="app.js" defer></script>','<p>El atributo <strong>defer</strong> ejecuta el archivo después de analizar el HTML.</p>',['src','defer'],{kind:'Fundamento'}),
      T('console','Consola','La consola ayuda a inspeccionar valores y encontrar errores durante el desarrollo.','const lenguaje = "JavaScript";\nconsole.log(lenguaje);',output('JavaScript'),[],{kind:'Herramienta'}),
      T('let / const','Variables','const declara referencias que no se reasignan; let se utiliza cuando el valor debe cambiar.','const nombre = "Laura";\nlet puntos = 10;\npuntos += 5;\nconsole.log(nombre, puntos);',output('Laura 15'),[],{kind:'Fundamento'}),
      T('typeof','Tipos de datos','JavaScript incluye strings, numbers, booleans, null, undefined, objetos y otros tipos.','const texto = "Hola";\nconst numero = 25;\nconst activo = true;\n\nconsole.log(typeof texto);\nconsole.log(typeof numero);\nconsole.log(typeof activo);',output('string\nnumber\nboolean'),[],{kind:'Fundamento'}),
      T('operadores','Operadores','Permiten calcular, comparar valores y combinar condiciones.','const total = 10 + 5;\nconst aprobado = total >= 12 && total !== 0;\nconsole.log(total, aprobado);',output('15 true'),[],{kind:'Fundamento'}),
      T('template literal','Plantillas de texto','Las plantillas con backticks insertan expresiones mediante la sintaxis ${...}.','const nombre = "Sofía";\nconst edad = 21;\nconst mensaje = `${nombre} tiene ${edad} años`;\nconsole.log(mensaje);',output('Sofía tiene 21 años'),[],{kind:'Fundamento'}),
      T('if / else','Condicionales','Ejecutan diferentes bloques según se cumpla o no una condición.','const nota = 4.2;\n\nif (nota >= 3) {\n  console.log("Aprobado");\n} else {\n  console.log("Pendiente");\n}',output('Aprobado'),[],{kind:'Control de flujo'}),
      T('switch','Selección múltiple','switch resulta útil cuando un valor puede coincidir con varios casos definidos.','const rol = "editor";\nlet permiso;\n\nswitch (rol) {\n  case "admin": permiso = "control total"; break;\n  case "editor": permiso = "editar contenido"; break;\n  default: permiso = "solo lectura";\n}\nconsole.log(permiso);',output('editar contenido'),[],{kind:'Control de flujo'}),
      T('for','Bucles','Los bucles repiten instrucciones mientras se cumpla una condición.','for (let i = 1; i <= 3; i++) {\n  console.log(`Elemento ${i}`);\n}',output('Elemento 1\nElemento 2\nElemento 3'),[],{kind:'Control de flujo'}),
      T('function','Funciones','Agrupan instrucciones reutilizables y pueden recibir parámetros y devolver resultados.','function sumar(a, b) {\n  return a + b;\n}\n\nconst resultado = sumar(4, 6);\nconsole.log(resultado);',output('10'),[],{kind:'Función'}),
      T('=>','Funciones flecha','Ofrecen una sintaxis compacta para escribir funciones.','const duplicar = numero => numero * 2;\nconsole.log(duplicar(8));',output('16'),[],{kind:'Función'}),
      T('Array','Arreglos','Almacenan colecciones ordenadas y ofrecen métodos para transformarlas o recorrerlas.','const numeros = [1, 2, 3, 4];\nconst dobles = numeros.map(numero => numero * 2);\nconst mayores = dobles.filter(numero => numero > 4);\nconsole.log(mayores);',output('[6, 8]'),[],{kind:'Colección'}),
      T('Object','Objetos','Agrupan información mediante propiedades y comportamientos mediante métodos.','const estudiante = {\n  nombre: "Mateo",\n  curso: "JavaScript",\n  presentar() {\n    return `${this.nombre} estudia ${this.curso}`;\n  }\n};\nconsole.log(estudiante.presentar());',output('Mateo estudia JavaScript'),[],{kind:'Colección'}),
      T('...','Desestructuración y spread','La desestructuración extrae valores y spread copia o combina arreglos y objetos.','const usuario = { nombre: "Sara", ciudad: "Bogotá" };\nconst { nombre, ciudad } = usuario;\nconst actualizado = { ...usuario, activo: true };\nconsole.log(nombre, ciudad, actualizado.activo);',output('Sara Bogotá true'),[],{kind:'Sintaxis moderna'}),
      T('querySelector','Modificar el DOM','El DOM permite seleccionar y modificar los elementos de la página.','const titulo = document.querySelector("#titulo");\ntitulo.textContent = "Texto actualizado";\ntitulo.style.color = "#2563eb";',interactive('<h3 id="titulo">Texto original</h3>','const titulo=document.querySelector("#titulo");titulo.textContent="Texto actualizado";titulo.style.color="#2563eb";'),[],{kind:'DOM'}),
      T('addEventListener','Eventos','Los eventos permiten reaccionar a clics, escritura, envíos de formularios y otras acciones.','const boton = document.querySelector("#saludar");\nconst mensaje = document.querySelector("#mensaje");\n\nboton.addEventListener("click", () => {\n  mensaje.textContent = "¡Hola desde JavaScript!";\n});',interactive('<button id="saludar">Saludar</button><p id="mensaje">Pulsa el botón</p>','document.querySelector("#saludar").addEventListener("click",()=>{document.querySelector("#mensaje").textContent="¡Hola desde JavaScript!"})'),[],{kind:'DOM'}),
      T('FormData','Formularios','El evento submit y FormData permiten validar y procesar los campos de un formulario.','formulario.addEventListener("submit", evento => {\n  evento.preventDefault();\n  const datos = new FormData(formulario);\n  console.log(datos.get("nombre"));\n});',interactive('<form id="formulario"><input name="nombre" placeholder="Nombre" required><button>Enviar</button></form><p id="respuesta"></p>','document.querySelector("#formulario").addEventListener("submit",e=>{e.preventDefault();document.querySelector("#respuesta").textContent=`Hola, ${new FormData(e.target).get("nombre")}`})'),[],{kind:'DOM'}),
      T('JSON','JSON','JSON.stringify convierte datos a texto y JSON.parse reconstruye el valor original.','const usuario = { nombre: "Ana", puntos: 20 };\nconst texto = JSON.stringify(usuario);\nconst copia = JSON.parse(texto);\nconsole.log(copia.nombre);',output('Ana'),[],{kind:'Datos'}),
      T('localStorage','Almacenamiento local','localStorage conserva pequeños valores de texto en el navegador entre recargas.','const preferencias = { tema: "oscuro" };\nlocalStorage.setItem("preferencias", JSON.stringify(preferencias));\n\nconst guardado = JSON.parse(localStorage.getItem("preferencias"));\nconsole.log(guardado.tema);',output('oscuro'),[],{kind:'Web API'}),
      T('try / catch','Manejo de errores','try y catch permiten controlar errores sin detener toda la aplicación.','try {\n  const datos = JSON.parse("texto inválido");\n  console.log(datos);\n} catch (error) {\n  console.error("No se pudo leer el JSON");\n}',output('No se pudo leer el JSON'),[],{kind:'Errores'}),
      T('Promise','Promesas','Una promesa representa un resultado que estará disponible en el futuro.','const espera = new Promise(resolve => {\n  setTimeout(() => resolve("Listo"), 500);\n});\n\nespera.then(resultado => console.log(resultado));',output('Listo'),[],{kind:'Asincronía'}),
      T('async / await','Async y await','await permite esperar una promesa dentro de una función async con una sintaxis legible.','async function cargarUsuario() {\n  const respuesta = await fetch("https://api.example.com/user/1");\n  if (!respuesta.ok) throw new Error("Error de red");\n  return respuesta.json();\n}\n\ncargarUsuario().then(console.log).catch(console.error);',output('La respuesta se procesa cuando finaliza la solicitud.'),[],{kind:'Asincronía'}),
      T('class','Clases','Las clases sirven para crear objetos que comparten propiedades y métodos.','class Producto {\n  constructor(nombre, precio) {\n    this.nombre = nombre;\n    this.precio = precio;\n  }\n\n  etiqueta() {\n    return `${this.nombre}: $${this.precio}`;\n  }\n}\n\nconst libro = new Producto("Libro", 25);\nconsole.log(libro.etiqueta());',output('Libro: $25'),[],{kind:'Objetos'}),
      T('import / export','Módulos','Los módulos dividen el código en archivos y permiten importar únicamente lo necesario.','// matematicas.js\nexport const sumar = (a, b) => a + b;\n\n// app.js\nimport { sumar } from "./matematicas.js";\nconsole.log(sumar(2, 3));','<p>Los módulos se cargan con <code>&lt;script type="module"&gt;</code>.</p>',[],{kind:'Organización'})
    ]
  };

  sections.push(
    {
      title:'JavaScript · Principiante',
      description:'Empieza desde cero con variables, tipos, operadores, decisiones, bucles y funciones.',
      quote:'“Primero aprende a expresar la lógica con claridad.”',
      challenge:'Solicita dos números, súmalos y muestra si el resultado es par o impar.',
      items:course.items.slice(0,10)
    },
    {
      title:'JavaScript · Intermedio',
      description:'Trabaja con colecciones, objetos, DOM, eventos, formularios y datos JSON.',
      quote:'“La interactividad nace cuando los datos y el DOM trabajan juntos.”',
      challenge:'Crea una lista interactiva que permita agregar y eliminar elementos.',
      items:course.items.slice(10,18)
    },
    {
      title:'JavaScript · Avanzado',
      description:'Controla almacenamiento, errores, asincronía, clases y organización mediante módulos.',
      quote:'“El código avanzado sigue siendo código sencillo bien organizado.”',
      challenge:'Consulta una API, controla los errores y representa sus datos mediante una clase.',
      items:course.items.slice(18)
    }
  );

  buildNav();
  render();
})();
