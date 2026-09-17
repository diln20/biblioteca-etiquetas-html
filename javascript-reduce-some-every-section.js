(()=>{
  if(window.__javascriptReduceSomeEveryAdded)return;
  window.__javascriptReduceSomeEveryAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const box=(title,body,accent='#8b5cf6')=>`<section style="font-family:system-ui;padding:16px;border:1px solid ${accent};border-radius:14px;background:#0b1220;color:#e5edf8"><strong style="display:block;margin-bottom:10px;color:${accent};font-size:18px">${title}</strong>${body}</section>`;
  const M=(name,description,code,preview,tip,meta={})=>T(
    'JavaScript · Arrays',name,description,code,preview,[],{
      kind:'JavaScript · reduce(), some() y every()',
      tip,
      guideTitle:'Qué observar en este ejemplo',
      codeLabel:'Código JavaScript',
      ...meta
    }
  );

  sections.push({
    title:'JavaScript · 8B. reduce(), some() y every() a fondo',
    navLabel:'reduce(), some() y every()',
    group:'JavaScript',
    primaryArea:'JavaScript',
    areaOrder:850,
    description:'Aprende tres métodos de arrays que resuelven problemas distintos: reduce() transforma muchos elementos en un resultado acumulado, some() pregunta si al menos uno cumple una condición y every() comprueba si todos la cumplen. Los ejemplos muestran sintaxis, recorrido paso a paso, casos reales y errores comunes.',
    quote:'“reduce acumula; some pregunta si existe al menos uno; every exige que todos cumplan.”',
    challenge:'Toma una lista de productos y calcula el total con reduce(), comprueba con some() si existe alguno agotado y usa every() para validar que todos tengan precio mayor que cero.',
    items:[
      M(
        '1. Comparación rápida: reduce() vs some() vs every()',
        'Los tres recorren un array mediante una función callback, pero no devuelven lo mismo. reduce() produce un resultado acumulado; some() devuelve true cuando encuentra el primer elemento que cumple la condición; every() devuelve false cuando encuentra el primero que no la cumple. some() y every() pueden detener el recorrido antes de llegar al final.',
        `const numeros = [2, 4, 6, 8];\n\nconst suma = numeros.reduce((total, numero) => total + numero, 0);\nconst hayMayorA5 = numeros.some(numero => numero > 5);\nconst todosPares = numeros.every(numero => numero % 2 === 0);\n\nconsole.log(suma);       // 20\nconsole.log(hayMayorA5); // true\nconsole.log(todosPares); // true`,
        box('Comparación rápida','<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px"><div style="padding:12px;border-radius:10px;background:#20163f"><b>reduce()</b><br><small>muchos → un resultado</small></div><div style="padding:12px;border-radius:10px;background:#3b1027"><b>some()</b><br><small>¿al menos uno?</small></div><div style="padding:12px;border-radius:10px;background:#0e3520"><b>every()</b><br><small>¿todos?</small></div></div>'),
        'No los elijas por costumbre: primero pregunta qué resultado necesitas obtener.'
      ),
      M(
        '2. reduce() · sintaxis y acumulador',
        'reduce() ejecuta una callback para cada elemento y conserva un acumulador. La callback puede recibir accumulator, currentValue, currentIndex y array. El segundo argumento de reduce() es el valor inicial del acumulador y conviene escribirlo explícitamente para que el comportamiento sea claro y para evitar errores con arrays vacíos.',
        `const numeros = [1, 2, 3, 4];\n\nconst suma = numeros.reduce(\n  function(acumulador, valorActual, indice, array) {\n    console.log({ acumulador, valorActual, indice });\n    return acumulador + valorActual;\n  },\n  0\n);\n\nconsole.log(suma); // 10`,
        box('Cómo avanza reduce()','<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center"><span style="padding:8px 12px;background:#172033;border-radius:8px">acc = 0</span><b>→</b><span>+1 = 1</span><b>→</b><span>+2 = 3</span><b>→</b><span>+3 = 6</span><b>→</b><span>+4 = 10</span></div>'),
        'Si omites el valor inicial, el primer elemento se usa como acumulador. En un array vacío eso provoca TypeError.'
      ),
      M(
        '3. reduce() · sumar, promediar y calcular totales',
        'Uno de los usos más comunes de reduce() es calcular un total. En un carrito puedes acumular precio × cantidad. Para un promedio primero sumas y después divides por la cantidad de elementos.',
        `const carrito = [\n  { nombre: "Teclado", precio: 120000, cantidad: 1 },\n  { nombre: "Mouse", precio: 70000, cantidad: 2 },\n  { nombre: "Base", precio: 50000, cantidad: 1 }\n];\n\nconst total = carrito.reduce(function(acumulado, producto) {\n  return acumulado + producto.precio * producto.cantidad;\n}, 0);\n\nconsole.log(total); // 310000\n\nconst notas = [4.0, 3.5, 4.5];\nconst suma = notas.reduce((acc, nota) => acc + nota, 0);\nconst promedio = suma / notas.length;\nconsole.log(promedio); // 4`,
        box('Caso real','<p style="margin:0">Carrito → <code>precio × cantidad</code> → acumulador → <strong>$310.000</strong></p>'),
        'reduce() es ideal cuando el resultado final ya no es la lista original, sino un total, promedio, objeto agrupado o resumen.'
      ),
      M(
        '4. reduce() · agrupar objetos por una propiedad',
        'El acumulador no tiene que ser un número. También puede ser un objeto. Este patrón es útil para agrupar datos recibidos de una API por categoría, estado, ciudad u otra propiedad.',
        `const cursos = [\n  { nombre: "HTML", categoria: "Frontend" },\n  { nombre: "CSS", categoria: "Frontend" },\n  { nombre: "Java", categoria: "Backend" }\n];\n\nconst porCategoria = cursos.reduce(function(grupos, curso) {\n  const clave = curso.categoria;\n\n  if (!grupos[clave]) {\n    grupos[clave] = [];\n  }\n\n  grupos[clave].push(curso);\n  return grupos;\n}, {});\n\nconsole.log(porCategoria);`,
        box('Resultado del agrupamiento','<pre style="margin:0;white-space:pre-wrap;color:#cbd5e1">{\n  Frontend: [HTML, CSS],\n  Backend: [Java]\n}</pre>'),
        'Cuando uses objetos o arrays como acumulador, recuerda devolver el acumulador al final de cada iteración.'
      ),
      M(
        '5. some() · ¿al menos un elemento cumple?',
        'some() devuelve true si encuentra al menos un elemento para el cual la callback devuelve un valor verdadero. Se detiene en cuanto encuentra la primera coincidencia, por eso es apropiado para preguntas de existencia.',
        `const numeros = [5, 8, 12, 3];\n\nconst hayPar = numeros.some(function(numero) {\n  return numero % 2 === 0;\n});\n\nconsole.log(hayPar); // true\n\nconst usuarios = [\n  { nombre: "Ana", activo: false },\n  { nombre: "Luis", activo: true },\n  { nombre: "Sara", activo: false }\n];\n\nconst hayUsuarioActivo = usuarios.some(usuario => usuario.activo);\nconsole.log(hayUsuarioActivo); // true`,
        box('Cómo trabaja some()','<div style="display:flex;gap:8px;flex-wrap:wrap"><span>5 → false</span><span>→</span><span style="color:#f9a8d4">8 → true ✓</span><span>→ se detiene</span></div>','#ec4899'),
        'En un array vacío, some() devuelve false porque no existe ningún elemento que pueda cumplir la condición.'
      ),
      M(
        '6. every() · ¿todos los elementos cumplen?',
        'every() devuelve true únicamente si todos los elementos cumplen la condición. Se detiene en cuanto encuentra el primer false. Es muy útil para validaciones completas antes de continuar con una operación.',
        `const numeros = [2, 4, 6, 8];\n\nconst todosPares = numeros.every(function(numero) {\n  return numero % 2 === 0;\n});\n\nconsole.log(todosPares); // true\n\nconst campos = [\n  { nombre: "correo", valido: true },\n  { nombre: "clave", valido: true },\n  { nombre: "terminos", valido: true }\n];\n\nconst formularioValido = campos.every(campo => campo.valido);\nconsole.log(formularioValido); // true`,
        box('Cómo trabaja every()','<div style="display:flex;gap:8px;flex-wrap:wrap"><span>2 ✓</span><span>→</span><span>4 ✓</span><span>→</span><span>6 ✓</span><span>→</span><span style="color:#86efac">8 ✓ → true</span></div>','#22c55e'),
        'every() sobre un array vacío devuelve true. Si para tu regla de negocio “sin elementos” debe ser inválido, comprueba también array.length > 0.'
      ),
      M(
        '7. some() y every() · permisos y validaciones',
        'En aplicaciones reales some() puede comprobar si un usuario posee al menos uno de los permisos aceptados, mientras every() sirve para exigir que una colección completa cumpla una regla.',
        `const permisosUsuario = ["leer", "editar"];\nconst permisosAceptados = ["editar", "administrar"];\n\nconst puedeModificar = permisosAceptados.some(function(permiso) {\n  return permisosUsuario.includes(permiso);\n});\n\nconsole.log(puedeModificar); // true\n\nconst productos = [\n  { nombre: "Teclado", precio: 120000 },\n  { nombre: "Mouse", precio: 70000 }\n];\n\nconst preciosValidos = productos.every(producto => producto.precio > 0);\nconsole.log(preciosValidos); // true`,
        box('Regla mental','<p style="margin:0"><b style="color:#f472b6">some()</b> = necesito una coincidencia.<br><b style="color:#4ade80">every()</b> = necesito que todas pasen.</p>'),
        'Si necesitas el elemento encontrado y no solo true/false, normalmente find() es más apropiado que some().'
      ),
      M(
        '8. Mini práctica · analizar productos de una API',
        'Este ejercicio reúne los tres métodos con una estructura similar a un JSON recibido desde una API: reduce() calcula el valor del inventario, some() detecta productos agotados y every() valida que todos tengan datos coherentes.',
        `const productos = [\n  { id: 1, nombre: "Teclado", precio: 120000, stock: 4 },\n  { id: 2, nombre: "Mouse", precio: 70000, stock: 0 },\n  { id: 3, nombre: "Monitor", precio: 900000, stock: 2 }\n];\n\nconst valorInventario = productos.reduce(function(total, producto) {\n  return total + producto.precio * producto.stock;\n}, 0);\n\nconst hayAgotados = productos.some(producto => producto.stock === 0);\n\nconst datosValidos = productos.every(function(producto) {\n  return producto.nombre.trim() !== "" && producto.precio > 0 && producto.stock >= 0;\n});\n\nconsole.log({ valorInventario, hayAgotados, datosValidos });`,
        box('Resultado esperado','<pre style="margin:0;color:#cbd5e1">{\n  valorInventario: 2280000,\n  hayAgotados: true,\n  datosValidos: true\n}</pre>','#38bdf8'),
        'Prueba cambiando el stock, precio o nombre de un producto y predice el resultado antes de ejecutar el código.',
        {
          exerciseTitle:'Ejercicio para ti · estadísticas de estudiantes',
          exerciseTasks:['Crea un array de estudiantes con nombre, nota y activo.','Usa reduce() para calcular el promedio.','Usa some() para comprobar si alguien perdió.','Usa every() para comprobar que todas las notas estén entre 0 y 5.'],
          exerciseExtra:'Muestra el resumen resultante dentro del DOM usando textContent.'
        }
      )
    ]
  });

  if(typeof buildNav==='function')buildNav();
  if(typeof render==='function')render();
})();
