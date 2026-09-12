(()=>{
  if(window.__javascriptSectionAdded)return;
  window.__javascriptSectionAdded=true;

  const result=(text,exercise)=>`
    <div style="font-family:system-ui;display:grid;gap:12px">
      <div>
        <strong style="display:block;margin-bottom:6px">Resultado del ejemplo</strong>
        <pre style="margin:0;padding:12px;background:#f3f4f6;color:#111827;border-radius:8px;white-space:pre-wrap">${text}</pre>
      </div>
      <div style="padding:12px 14px;border-radius:10px;border:1px solid rgba(96,165,250,.35);background:rgba(37,99,235,.08)">
        <strong style="display:block;margin-bottom:5px">Ejercicio propuesto</strong>
        <span>${exercise}</span>
      </div>
    </div>`;

  const J=(topic,name,description,code,out,exercise,kind='JavaScript')=>T(
    topic,
    name,
    description,
    code,
    result(out,exercise),
    [],
    {kind,tip:'Primero escribe el ejemplo a mano, ejecútalo en la consola y después resuelve el ejercicio sin copiar una solución.'}
  );

  const add=(title,description,challenge,items)=>sections.push({
    title,
    description,
    quote:'“Comprender la lógica es más importante que memorizar la sintaxis.”',
    challenge,
    items
  });

  add(
    'JavaScript · 1. Primeros pasos',
    'Empieza desde cero: qué es JavaScript, dónde se escribe, cómo ejecutarlo y cómo observar resultados en la consola.',
    'Crea un archivo app.js, enlázalo desde un HTML y muestra tres mensajes diferentes en la consola.',
    [
      J(
        'script',
        '¿Qué es JavaScript?',
        'JavaScript es el lenguaje que añade comportamiento a una página web. HTML define la estructura, CSS controla la apariencia y JavaScript permite tomar decisiones, repetir tareas, procesar datos y reaccionar a acciones. Para comenzar conviene escribir el código en un archivo externo llamado app.js y cargarlo con defer para que el navegador procese primero el HTML.',
        '<script src="app.js" defer></script>',
        'El navegador carga app.js después de analizar el HTML.',
        'Crea index.html y app.js. Enlaza el archivo JavaScript y comprueba desde DevTools que no aparezcan errores.',
        'Introducción'
      ),
      J(
        'console.log',
        'La consola del navegador',
        'console.log permite mostrar valores mientras aprendemos o depuramos. La consola se abre desde las herramientas del desarrollador del navegador. También existen console.error, console.warn y console.table para presentar información de distintas formas.',
        'console.log("Hola JavaScript");\nconsole.warn("Este es un aviso");\nconsole.error("Este es un error de ejemplo");',
        'Hola JavaScript\nEste es un aviso\nEste es un error de ejemplo',
        'Muestra en consola tu nombre, tu edad y el nombre del curso en tres instrucciones diferentes.',
        'Herramienta'
      ),
      J(
        'comentarios',
        'Comentarios en el código',
        'Los comentarios sirven para explicar decisiones o dejar notas para otras personas. // comenta una sola línea y /* ... */ permite comentar varias líneas. No conviene explicar con comentarios lo que ya es evidente en el código.',
        '// Comentario de una línea\nconst curso = "JavaScript";\n\n/*\n  Comentario de\n  varias líneas\n*/\nconsole.log(curso);',
        'JavaScript',
        'Escribe un pequeño programa con dos variables y añade un comentario que explique para qué se utilizarán.',
        'Sintaxis'
      )
    ]
  );

  add(
    'JavaScript · 2. Variables y tipos de datos',
    'Aprende a guardar información, distinguir let y const, conocer los tipos básicos y convertir valores.',
    'Guarda los datos de un estudiante en variables y muestra una frase completa usando esos valores.',
    [
      J(
        'const',
        'Constantes',
        'const crea una variable cuya referencia no puede asignarse nuevamente. Se utiliza por defecto cuando sabemos que el identificador seguirá apuntando al mismo valor. El nombre debe describir el dato que representa.',
        'const nombre = "Laura";\nconst edad = 19;\nconst activo = true;\n\nconsole.log(nombre);\nconsole.log(edad);\nconsole.log(activo);',
        'Laura\n19\ntrue',
        'Declara constantes para nombre, ciudad y carrera. Luego muéstralas en la consola.',
        'Variables'
      ),
      J(
        'let',
        'Variables que cambian',
        'let se utiliza cuando el valor necesita cambiar durante la ejecución. Por ejemplo, un contador, el puntaje de un juego o la cantidad disponible de un producto. Evita usar var al comenzar porque tiene reglas de alcance distintas y puede causar confusión.',
        'let puntos = 10;\npuntos = 15;\npuntos += 5;\n\nconsole.log(puntos);',
        '20',
        'Crea una variable saldo con valor 100000. Resta una compra de 25000 y después suma un ingreso de 50000.',
        'Variables'
      ),
      J(
        'typeof',
        'Tipos primitivos',
        'Los tipos básicos más frecuentes son string para texto, number para números, boolean para verdadero/falso, undefined para valores todavía no asignados, null para una ausencia intencional de valor y bigint para enteros muy grandes. typeof permite consultar el tipo en tiempo de ejecución.',
        'const nombre = "Ana";\nconst semestre = 3;\nconst matriculado = true;\nlet telefono;\nconst segundoNombre = null;\n\nconsole.log(typeof nombre);\nconsole.log(typeof semestre);\nconsole.log(typeof matriculado);\nconsole.log(typeof telefono);\nconsole.log(segundoNombre);',
        'string\nnumber\nboolean\nundefined\nnull',
        'Crea una variable de tipo string, number, boolean, undefined y null. Muestra cada valor y su tipo.',
        'Tipos de datos'
      ),
      J(
        'Number / String',
        'Conversión de tipos',
        'Los datos recibidos desde un input suelen llegar como texto. Number convierte un texto numérico a número y String convierte un valor a texto. Number.isNaN ayuda a detectar conversiones numéricas inválidas.',
        'const edadTexto = "20";\nconst edad = Number(edadTexto);\nconst codigo = String(2026);\n\nconsole.log(edad + 1);\nconsole.log(typeof edad);\nconsole.log(typeof codigo);',
        '21\nnumber\nstring',
        'Parte de precio = "12500" y cantidad = "3". Convierte ambos valores y calcula el total de la compra.',
        'Tipos de datos'
      ),
      J(
        'template literal',
        'Plantillas de texto',
        'Las plantillas literales usan backticks y permiten insertar expresiones con ${...}. Son más cómodas que concatenar muchas cadenas con el operador +.',
        'const nombre = "Sofía";\nconst semestre = 2;\nconst mensaje = `${nombre} cursa el semestre ${semestre}`;\n\nconsole.log(mensaje);',
        'Sofía cursa el semestre 2',
        'Crea una frase que muestre nombre, edad y ciudad usando una sola plantilla literal.',
        'Strings'
      )
    ]
  );

  add(
    'JavaScript · 3. Operadores',
    'Utiliza operadores aritméticos, de comparación y lógicos para construir expresiones y reglas.',
    'Calcula el promedio de tres notas y determina si un estudiante aprueba.',
    [
      J(
        '+ - * / % **',
        'Operadores aritméticos',
        'Permiten realizar cálculos. + suma, - resta, * multiplica, / divide, % devuelve el residuo y ** calcula potencias. Los paréntesis ayudan a dejar claro el orden de las operaciones.',
        'const a = 10;\nconst b = 3;\n\nconsole.log(a + b);\nconsole.log(a - b);\nconsole.log(a * b);\nconsole.log(a / b);\nconsole.log(a % b);\nconsole.log(a ** 2);',
        '13\n7\n30\n3.3333333333333335\n1\n100',
        'Calcula el área de un rectángulo y después el residuo de dividir 25 entre 4.',
        'Operadores'
      ),
      J(
        '=== !== > >= < <=',
        'Operadores de comparación',
        'Las comparaciones producen true o false. Se recomienda usar === y !== porque comparan valor y tipo sin realizar conversiones implícitas que puedan ocultar errores.',
        'const edad = 18;\n\nconsole.log(edad === 18);\nconsole.log(edad !== 20);\nconsole.log(edad >= 18);\nconsole.log(edad < 30);\nconsole.log("18" === 18);',
        'true\ntrue\ntrue\ntrue\nfalse',
        'Compara dos notas y determina si son iguales, cuál es mayor y si ambas superan 3.0.',
        'Operadores'
      ),
      J(
        '&& || !',
        'Operadores lógicos',
        '&& exige que ambas condiciones sean verdaderas. || necesita que al menos una sea verdadera. ! invierte un booleano. Se usan para combinar reglas.',
        'const edad = 21;\nconst tieneDocumento = true;\n\nconst puedeIngresar = edad >= 18 && tieneDocumento;\nconst necesitaAyuda = edad < 18 || !tieneDocumento;\n\nconsole.log(puedeIngresar);\nconsole.log(necesitaAyuda);',
        'true\nfalse',
        'Una persona obtiene descuento si es estudiante o tiene más de 60 años. Construye la condición correspondiente.',
        'Operadores'
      )
    ]
  );

  add(
    'JavaScript · 4. Estructuras de datos',
    'Organiza varios valores usando arreglos y objetos antes de empezar con estructuras de control.',
    'Representa un curso con nombre, docente y una lista de estudiantes.',
    [
      J(
        'Array',
        'Arreglos',
        'Un Array guarda varios valores en orden. Las posiciones comienzan en cero. length indica cuántos elementos tiene la colección. Los arreglos son útiles para listas de estudiantes, productos, notas o tareas.',
        'const lenguajes = ["HTML", "CSS", "JavaScript"];\n\nconsole.log(lenguajes[0]);\nconsole.log(lenguajes[2]);\nconsole.log(lenguajes.length);',
        'HTML\nJavaScript\n3',
        'Crea un arreglo con cinco materias. Muestra la primera, la última y la cantidad total.',
        'Estructura de datos'
      ),
      J(
        'push / pop',
        'Agregar y eliminar elementos',
        'push agrega un elemento al final, pop elimina el último, unshift agrega al inicio y shift elimina el primero. Estos métodos modifican el arreglo original.',
        'const tareas = ["HTML", "CSS"];\n\ntareas.push("JavaScript");\nconsole.log(tareas);\n\ntareas.pop();\nconsole.log(tareas);',
        '["HTML", "CSS", "JavaScript"]\n["HTML", "CSS"]',
        'Crea una lista de compras, agrega dos productos, elimina uno y muestra el resultado.',
        'Estructura de datos'
      ),
      J(
        'Object',
        'Objetos',
        'Un objeto agrupa datos relacionados mediante propiedades. Se accede normalmente con punto. Es útil cuando una entidad necesita varios campos, como un estudiante con nombre, edad y programa.',
        'const estudiante = {\n  nombre: "Mateo",\n  edad: 20,\n  programa: "Ingeniería",\n  activo: true\n};\n\nconsole.log(estudiante.nombre);\nconsole.log(estudiante.programa);',
        'Mateo\nIngeniería',
        'Crea un objeto producto con id, nombre, precio y stock. Luego muestra una frase con sus datos.',
        'Estructura de datos'
      ),
      J(
        'Array de objetos',
        'Colecciones de objetos',
        'Las aplicaciones suelen trabajar con arreglos de objetos porque combinan una lista con datos estructurados. Esta forma es muy parecida a la información JSON que puede devolver una API.',
        'const estudiantes = [\n  { id: 1, nombre: "Ana", nota: 4.5 },\n  { id: 2, nombre: "Luis", nota: 3.8 },\n  { id: 3, nombre: "Sara", nota: 4.1 }\n];\n\nconsole.log(estudiantes[1].nombre);',
        'Luis',
        'Crea un arreglo con tres productos. Cada producto debe tener id, nombre y precio. Muestra el precio del segundo.',
        'Estructura de datos'
      )
    ]
  );

  add(
    'JavaScript · 5. Estructuras condicionales',
    'Aprende a ejecutar caminos diferentes según una condición mediante if, else if, else, switch y el operador ternario.',
    'Construye un programa que clasifique una nota en reprobado, aprobado, bueno o excelente.',
    [
      J(
        'if',
        'Condición simple',
        'if ejecuta un bloque solamente cuando la expresión evaluada produce true. La condición se escribe entre paréntesis y el bloque entre llaves.',
        'const edad = 20;\n\nif (edad >= 18) {\n  console.log("Es mayor de edad");\n}',
        'Es mayor de edad',
        'Lee mentalmente una variable saldo. Si es mayor a cero, muestra “Saldo disponible”.',
        'Condicional'
      ),
      J(
        'if / else',
        'Dos caminos posibles',
        'else se ejecuta cuando la condición del if es falsa. Permite representar decisiones binarias como aprobado/reprobado, disponible/no disponible o encendido/apagado.',
        'const nota = 2.8;\n\nif (nota >= 3) {\n  console.log("Aprobado");\n} else {\n  console.log("Reprobado");\n}',
        'Reprobado',
        'Determina si un número es positivo o no positivo usando if y else.',
        'Condicional'
      ),
      J(
        'else if',
        'Varias condiciones',
        'else if permite comprobar varias condiciones en orden. JavaScript se detiene en la primera condición verdadera, por lo que el orden de las reglas importa.',
        'const nota = 4.4;\n\nif (nota < 3) {\n  console.log("Reprobado");\n} else if (nota < 4) {\n  console.log("Aprobado");\n} else if (nota < 4.5) {\n  console.log("Bueno");\n} else {\n  console.log("Excelente");\n}',
        'Bueno',
        'Clasifica una edad como niñez, adolescencia, adulto o adulto mayor.',
        'Condicional'
      ),
      J(
        'switch',
        'Selección por casos',
        'switch es cómodo cuando una misma variable puede coincidir con varios valores exactos. break evita que se continúen ejecutando los casos siguientes y default funciona como alternativa final.',
        'const dia = 3;\nlet nombreDia;\n\nswitch (dia) {\n  case 1: nombreDia = "Lunes"; break;\n  case 2: nombreDia = "Martes"; break;\n  case 3: nombreDia = "Miércoles"; break;\n  default: nombreDia = "Otro día";\n}\n\nconsole.log(nombreDia);',
        'Miércoles',
        'Crea un switch para convertir los valores 1, 2 y 3 en “Bajo”, “Medio” y “Alto”.',
        'Condicional'
      ),
      J(
        '? :',
        'Operador ternario',
        'El ternario es una forma corta de elegir entre dos valores. Es útil cuando la condición y los resultados son sencillos. Si la lógica empieza a crecer, es preferible volver a if/else.',
        'const edad = 17;\nconst estado = edad >= 18 ? "Adulto" : "Menor";\nconsole.log(estado);',
        'Menor',
        'Usa un ternario para mostrar “Par” o “Impar” según un número.',
        'Condicional'
      )
    ]
  );

  add(
    'JavaScript · 6. Estructuras repetitivas',
    'Repite instrucciones de forma controlada usando for, while, do...while, for...of y forEach.',
    'Genera las tablas de multiplicar del 1 al 5 usando bucles anidados.',
    [
      J(
        'for',
        'Bucle for',
        'for es ideal cuando conocemos cuántas repeticiones necesitamos. Incluye inicialización, condición y actualización en una sola línea.',
        'for (let i = 1; i <= 5; i++) {\n  console.log(`Vuelta ${i}`);\n}',
        'Vuelta 1\nVuelta 2\nVuelta 3\nVuelta 4\nVuelta 5',
        'Usa for para mostrar los números del 1 al 10 y después del 10 al 1.',
        'Repetitiva'
      ),
      J(
        'while',
        'Bucle while',
        'while repite mientras una condición continúe siendo verdadera. Se usa cuando no sabemos exactamente cuántas iteraciones serán necesarias. Debemos actualizar la variable de control para evitar bucles infinitos.',
        'let numero = 1;\n\nwhile (numero <= 3) {\n  console.log(numero);\n  numero++;\n}',
        '1\n2\n3',
        'Usa while para sumar todos los números del 1 al 100.',
        'Repetitiva'
      ),
      J(
        'do...while',
        'Bucle do...while',
        'do...while ejecuta el bloque por lo menos una vez y después comprueba la condición. Es útil cuando una acción debe realizarse antes de decidir si se repite.',
        'let intento = 1;\n\ndo {\n  console.log(`Intento ${intento}`);\n  intento++;\n} while (intento <= 3);',
        'Intento 1\nIntento 2\nIntento 3',
        'Simula un menú que se ejecute al menos una vez y continúe mientras una variable opcion sea distinta de 0.',
        'Repetitiva'
      ),
      J(
        'for...of',
        'Recorrer un arreglo',
        'for...of obtiene directamente cada elemento de una colección iterable. Para estudiantes que empiezan suele ser más claro que trabajar manualmente con índices.',
        'const materias = ["HTML", "CSS", "JavaScript"];\n\nfor (const materia of materias) {\n  console.log(materia);\n}',
        'HTML\nCSS\nJavaScript',
        'Recorre un arreglo de cinco notas y calcula la suma total.',
        'Repetitiva'
      ),
      J(
        'forEach',
        'forEach',
        'forEach ejecuta una función una vez por cada elemento del arreglo. Recibe el elemento actual y opcionalmente su índice. Es útil para acciones, aunque no crea un nuevo arreglo.',
        'const estudiantes = ["Ana", "Luis", "Sara"];\n\nestudiantes.forEach((nombre, indice) => {\n  console.log(`${indice + 1}. ${nombre}`);\n});',
        '1. Ana\n2. Luis\n3. Sara',
        'Recorre una lista de productos y muestra “Producto 1: ...”, “Producto 2: ...” para cada elemento.',
        'Repetitiva'
      ),
      J(
        'break / continue',
        'Controlar un bucle',
        'break termina completamente el bucle. continue salta solamente la iteración actual y continúa con la siguiente. Deben usarse cuando hacen la intención más clara.',
        'for (let i = 1; i <= 10; i++) {\n  if (i === 3) continue;\n  if (i === 7) break;\n  console.log(i);\n}',
        '1\n2\n4\n5\n6',
        'Recorre del 1 al 20, omite los múltiplos de 3 y detente cuando llegues a 15.',
        'Repetitiva'
      )
    ]
  );

  add(
    'JavaScript · 7. Funciones',
    'Organiza la lógica en bloques reutilizables usando parámetros, retorno, alcance y funciones flecha.',
    'Crea funciones para calcular subtotal, descuento e impuesto de una compra.',
    [
      J(
        'function',
        'Declarar una función',
        'Una función agrupa instrucciones bajo un nombre. Solo se ejecuta cuando la llamamos. Esto evita repetir la misma lógica en diferentes partes del programa.',
        'function saludar() {\n  console.log("Hola estudiante");\n}\n\nsaludar();\nsaludar();',
        'Hola estudiante\nHola estudiante',
        'Crea una función llamada mostrarBienvenida que imprima un mensaje y ejecútala tres veces.',
        'Funciones'
      ),
      J(
        'parámetros',
        'Parámetros y argumentos',
        'Los parámetros son variables declaradas por la función. Los argumentos son los valores concretos enviados cuando la llamamos. Permiten reutilizar la misma lógica con datos diferentes.',
        'function saludar(nombre) {\n  console.log(`Hola, ${nombre}`);\n}\n\nsaludar("Ana");\nsaludar("Carlos");',
        'Hola, Ana\nHola, Carlos',
        'Crea una función presentar(nombre, edad) que muestre una frase con ambos valores.',
        'Funciones'
      ),
      J(
        'return',
        'Devolver un resultado',
        'return entrega un valor al lugar donde se llamó la función y finaliza su ejecución. Las funciones que calculan valores suelen ser más reutilizables cuando retornan el resultado en lugar de imprimirlo directamente.',
        'function sumar(a, b) {\n  return a + b;\n}\n\nconst total = sumar(8, 4);\nconsole.log(total);',
        '12',
        'Crea una función calcularPromedio(n1, n2, n3) que retorne el promedio de tres notas.',
        'Funciones'
      ),
      J(
        '=>',
        'Funciones flecha',
        'Las funciones flecha ofrecen una sintaxis corta. Son comunes en métodos como map, filter y forEach. Cuando la función solo devuelve una expresión, podemos omitir las llaves y return.',
        'const cuadrado = numero => numero * numero;\nconst sumar = (a, b) => a + b;\n\nconsole.log(cuadrado(5));\nconsole.log(sumar(3, 7));',
        '25\n10',
        'Escribe una función flecha que reciba un precio y retorne el precio con IVA del 19%.',
        'Funciones'
      ),
      J(
        'scope',
        'Alcance de variables',
        'Una variable declarada dentro de un bloque o función tiene un alcance limitado. Evitar variables globales innecesarias reduce errores y hace el código más fácil de entender.',
        'const curso = "JavaScript";\n\nfunction ejemplo() {\n  const mensaje = "Variable local";\n  console.log(curso);\n  console.log(mensaje);\n}\n\nejemplo();',
        'JavaScript\nVariable local',
        'Crea una función con una variable local e intenta razonar qué ocurriría si trataras de usarla fuera de la función.',
        'Funciones'
      )
    ]
  );

  add(
    'JavaScript · 8. Métodos de arreglos',
    'Aprende a buscar, transformar, filtrar y resumir colecciones usando métodos modernos de Array.',
    'A partir de una lista de estudiantes, obtén aprobados, nombres y promedio general sin modificar el arreglo original.',
    [
      J(
        'find',
        'Buscar un elemento',
        'find devuelve el primer elemento que cumple la condición. Si no encuentra ninguno devuelve undefined. Es apropiado para buscar un registro por id o por otra propiedad única.',
        'const productos = [\n  { id: 1, nombre: "Teclado" },\n  { id: 2, nombre: "Mouse" }\n];\n\nconst producto = productos.find(item => item.id === 2);\nconsole.log(producto.nombre);',
        'Mouse',
        'Busca por id el segundo estudiante dentro de un arreglo de objetos.',
        'Arrays'
      ),
      J(
        'filter',
        'Filtrar elementos',
        'filter crea un nuevo arreglo solamente con los elementos que cumplen una condición. No modifica el arreglo original.',
        'const notas = [2.5, 3.2, 4.8, 2.9, 4.0];\nconst aprobadas = notas.filter(nota => nota >= 3);\nconsole.log(aprobadas);',
        '[3.2, 4.8, 4]',
        'Filtra de una lista de productos solamente los que tengan stock mayor que cero.',
        'Arrays'
      ),
      J(
        'map',
        'Transformar elementos',
        'map crea un nuevo arreglo con el resultado de transformar cada elemento. El nuevo arreglo conserva la misma cantidad de posiciones que el original.',
        'const precios = [10000, 20000, 30000];\nconst conIva = precios.map(precio => precio * 1.19);\nconsole.log(conIva);',
        '[11900, 23800, 35700]',
        'Toma un arreglo de nombres y genera otro arreglo donde todos estén en mayúsculas.',
        'Arrays'
      ),
      J(
        'reduce',
        'Reducir a un solo valor',
        'reduce combina todos los elementos y produce un único resultado, por ejemplo una suma, un promedio o un acumulado. El segundo argumento representa el valor inicial del acumulador.',
        'const valores = [10, 20, 30, 40];\nconst total = valores.reduce((acumulado, valor) => acumulado + valor, 0);\nconsole.log(total);',
        '100',
        'Usa reduce para calcular el total de una lista de precios.',
        'Arrays'
      ),
      J(
        'some / every',
        'Comprobar condiciones en una lista',
        'some devuelve true si al menos un elemento cumple la condición. every devuelve true únicamente si todos la cumplen. Son útiles para validaciones de conjuntos.',
        'const notas = [4.0, 3.5, 2.8];\n\nconsole.log(notas.some(nota => nota < 3));\nconsole.log(notas.every(nota => nota >= 3));',
        'true\nfalse',
        'Comprueba si algún producto está agotado y si todos los productos tienen precio mayor que cero.',
        'Arrays'
      )
    ]
  );

  add(
    'JavaScript · 9. Objetos y manejo de datos',
    'Trabaja con propiedades, desestructuración, spread, JSON y clases antes de pasar al DOM.',
    'Modela un pequeño catálogo de productos y genera una copia actualizada sin alterar el objeto original.',
    [
      J(
        'propiedades',
        'Leer y modificar objetos',
        'Las propiedades pueden consultarse con punto o con corchetes. También es posible agregar o modificar propiedades después de crear el objeto.',
        'const usuario = { nombre: "Ana", edad: 20 };\n\nusuario.edad = 21;\nusuario.ciudad = "Pamplona";\n\nconsole.log(usuario.nombre);\nconsole.log(usuario["edad"]);\nconsole.log(usuario.ciudad);',
        'Ana\n21\nPamplona',
        'Crea un objeto libro, modifica su precio y agrega una propiedad disponible.',
        'Objetos'
      ),
      J(
        'desestructuración',
        'Desestructurar objetos y arreglos',
        'La desestructuración extrae propiedades o posiciones en variables. Reduce código repetido cuando necesitamos varios valores de la misma estructura.',
        'const estudiante = { nombre: "Sara", nota: 4.6 };\nconst { nombre, nota } = estudiante;\n\nconst colores = ["azul", "verde"];\nconst [primero, segundo] = colores;\n\nconsole.log(nombre, nota);\nconsole.log(primero, segundo);',
        'Sara 4.6\nazul verde',
        'Desestructura nombre y precio de un producto; luego desestructura los dos primeros elementos de un arreglo.',
        'Objetos'
      ),
      J(
        'spread',
        'Copiar y combinar datos',
        'El operador spread (...) permite crear copias superficiales y combinar objetos o arreglos. Es muy usado para actualizar datos sin modificar directamente el valor original.',
        'const producto = { id: 1, nombre: "Mouse", precio: 50000 };\nconst actualizado = { ...producto, precio: 55000 };\n\nconsole.log(producto.precio);\nconsole.log(actualizado.precio);',
        '50000\n55000',
        'Copia un objeto estudiante y cambia solamente su nota en la nueva copia.',
        'Objetos'
      ),
      J(
        'JSON',
        'JSON.stringify y JSON.parse',
        'JSON es un formato de texto usado para intercambiar datos. JSON.stringify convierte un objeto JavaScript en texto JSON y JSON.parse realiza el proceso inverso.',
        'const usuario = { nombre: "Ana", activo: true };\nconst texto = JSON.stringify(usuario);\nconst copia = JSON.parse(texto);\n\nconsole.log(texto);\nconsole.log(copia.nombre);',
        '{"nombre":"Ana","activo":true}\nAna',
        'Convierte un objeto producto a JSON y después reconstruye el objeto con JSON.parse.',
        'Datos'
      ),
      J(
        'class',
        'Clases',
        'Una clase define una plantilla para crear objetos que comparten propiedades y métodos. constructor recibe los datos iniciales y los métodos describen comportamientos de las instancias.',
        'class Producto {\n  constructor(nombre, precio) {\n    this.nombre = nombre;\n    this.precio = precio;\n  }\n\n  descripcion() {\n    return `${this.nombre}: $${this.precio}`;\n  }\n}\n\nconst mouse = new Producto("Mouse", 50000);\nconsole.log(mouse.descripcion());',
        'Mouse: $50000',
        'Crea una clase Estudiante con nombre y nota, además de un método estaAprobado que retorne true o false.',
        'Objetos'
      )
    ]
  );

  add(
    'JavaScript · 10. Errores, módulos y asincronía',
    'Finaliza los fundamentos con manejo de errores, módulos, promesas, async/await y consumo de APIs. Después continúa con la sección Manejo del DOM.',
    'Escribe una función async que consulte datos, detecte una respuesta incorrecta y controle el error con try/catch.',
    [
      J(
        'try / catch',
        'Manejo de errores',
        'try ejecuta código que podría fallar y catch recibe el error si ocurre. Esto permite responder de forma controlada sin detener todo el programa.',
        'try {\n  const dato = JSON.parse("texto inválido");\n  console.log(dato);\n} catch (error) {\n  console.error("No se pudo procesar el JSON");\n}',
        'No se pudo procesar el JSON',
        'Intenta convertir dos cadenas JSON: una válida y otra inválida. Controla el segundo caso con try/catch.',
        'Errores'
      ),
      J(
        'throw',
        'Crear errores propios',
        'throw permite detener una operación cuando una regla no se cumple. Normalmente se lanza un objeto Error con un mensaje descriptivo.',
        'function dividir(a, b) {\n  if (b === 0) {\n    throw new Error("No se puede dividir entre cero");\n  }\n  return a / b;\n}\n\nconsole.log(dividir(10, 2));',
        '5',
        'Crea una función registrarEdad que lance un error si la edad es menor que 0.',
        'Errores'
      ),
      J(
        'Promise',
        'Promesas',
        'Una Promise representa un resultado que llegará en el futuro. Puede estar pending, fulfilled o rejected. then procesa el éxito y catch procesa el rechazo.',
        'const tarea = new Promise(resolve => {\n  setTimeout(() => resolve("Proceso terminado"), 500);\n});\n\ntarea.then(resultado => console.log(resultado));',
        'Proceso terminado',
        'Crea una promesa que después de un segundo entregue el texto “Datos cargados”.',
        'Asincronía'
      ),
      J(
        'async / await',
        'async y await',
        'Una función async siempre devuelve una promesa. await permite esperar una promesa sin encadenar varios then, haciendo que el flujo sea más fácil de leer.',
        'function esperar() {\n  return Promise.resolve("Listo");\n}\n\nasync function ejecutar() {\n  const resultado = await esperar();\n  console.log(resultado);\n}\n\nejecutar();',
        'Listo',
        'Crea una función async que espere una promesa con un número y después muestre su doble.',
        'Asincronía'
      ),
      J(
        'fetch',
        'Consumir una API',
        'fetch realiza solicitudes HTTP y devuelve una promesa. Conviene comprobar response.ok antes de convertir la respuesta con json(). En aplicaciones reales la URL suele apuntar a nuestro backend.',
        'async function cargarUsuarios() {\n  try {\n    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");\n\n    if (!respuesta.ok) {\n      throw new Error(`HTTP ${respuesta.status}`);\n    }\n\n    const usuarios = await respuesta.json();\n    console.log(usuarios.length);\n  } catch (error) {\n    console.error("Error al cargar usuarios", error);\n  }\n}\n\ncargarUsuarios();',
        'Se muestra la cantidad de usuarios recibidos por la API.',
        'Consulta una API pública de prueba y muestra en consola únicamente el nombre de cada elemento recibido.',
        'Asincronía'
      ),
      J(
        'import / export',
        'Módulos JavaScript',
        'Los módulos permiten separar el programa en varios archivos. export publica valores y funciones; import los utiliza desde otro módulo. En HTML se cargan con type="module".',
        '// matematicas.js\nexport function sumar(a, b) {\n  return a + b;\n}\n\n// app.js\nimport { sumar } from "./matematicas.js";\nconsole.log(sumar(4, 5));\n\n// index.html\n<script type="module" src="app.js"></script>',
        '9',
        'Crea operaciones.js con una función multiplicar exportada e impórtala desde app.js.',
        'Organización'
      )
    ]
  );

  buildNav();
  render();
})();
