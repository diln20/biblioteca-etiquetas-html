(()=>{
  if(window.__javascriptFunctionsDetailedAdded)return;
  window.__javascriptFunctionsDetailedAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const escapeHtml=value=>String(value).replace(/[&<>]/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[char]));
  const preview=(title,output,note,color='#f7df1e')=>`<section style="font-family:system-ui;border:1px solid ${color};border-radius:14px;overflow:hidden;background:#07111f;color:#e5edf8"><header style="padding:10px 14px;background:#101b2b;color:${color};font-weight:900">Resultado · ${title}</header><div style="padding:16px;display:grid;gap:10px"><pre style="margin:0;padding:12px;border-radius:10px;background:#020817;color:#e2e8f0;white-space:pre-wrap">${escapeHtml(output)}</pre><p style="margin:0;color:#a8b4c6;line-height:1.5">${note}</p></div></section>`;
  const file=(path,method,detail,command='')=>({path,method,detail,command});
  const lesson=(topic,name,description,code,output,note,meta={})=>T(topic,name,description,code,preview(name,output,note,meta.color),[],{
    kind:'JavaScript · Funciones',
    tip:meta.tip||'Ejecuta el ejemplo, cambia los argumentos y observa qué valores entran, cuándo se ejecuta la función y qué retorna.',
    guide:meta.guide||[['Crear o modificar','js/funciones/tipos-funciones.js','Usa este archivo de práctica para comparar las distintas formas de declarar y usar funciones.']],
    guideTitle:'Dónde se hace cada modificación',
    codeLabel:'Código JavaScript',
    filesToCreate:meta.files||[],
    filesToCreateTitle:'Archivos que se crean en esta lección',
    filesToCreateStatus:(meta.files||[]).length?'Crea este archivo para repetir la práctica completa desde cero.':'No necesitas crear otro archivo; continúa trabajando en js/funciones/tipos-funciones.js.'
  });

  sections.push({
    title:'JavaScript · 7A. Tipos de funciones',
    navLabel:'7A. Tipos de funciones',
    group:'JavaScript',primaryArea:'JavaScript',course:'JavaScript',areaOrder:75,
    description:'Amplía la lección de funciones con las formas y patrones más importantes de JavaScript: declaración, expresión, arrow, anónima, IIFE, callback, parámetros por defecto, rest, funciones parametrizadas, recursivas, de orden superior y constructoras. También se añaden funciones async y generadoras para llevar el tema hasta un nivel más avanzado. La sección aclara cuáles son realmente sintaxis distintas y cuáles describen una forma de usar una función.',
    quote:'“En JavaScript una función puede ser código ejecutable y también un valor que se guarda, se pasa y se devuelve.”',
    challenge:'Implementa una calculadora de pedidos donde una función reciba datos, otra funcione como callback, otra use rest, otra devuelva una función y una async simule guardar el pedido.',
    items:[
      lesson(
        'function declaration',
        '1. Function declaration · declaración de función',
        'Una declaración usa la palabra function seguida de un nombre. Es la forma clásica de definir una operación reutilizable. El nombre queda disponible en su ámbito y la declaración se registra antes de ejecutar el resto del bloque, por eso normalmente puede invocarse incluso antes de la línea donde aparece. Los parámetros son nombres locales que reciben los argumentos enviados en cada llamada y return entrega el resultado al código que llamó la función.',
        `console.log(saludar('Ana'));

function saludar(nombre) {
  return 'Hola ' + nombre;
}`,
        'Hola Ana',
        'La llamada funciona aunque aparezca antes de la declaración porque las declaraciones de función se inicializan durante la creación del ámbito.',
        {files:[file('js/funciones/tipos-funciones.js','MANUAL','Archivo central de práctica para todos los tipos de funciones.')],color:'#facc15'}
      ),
      lesson(
        'function expression',
        '2. Function expression · expresión de función',
        'Una expresión de función crea una función como valor y la asigna a una variable. Aquí la función no está disponible antes de que se ejecute la asignación a const o let. Este patrón deja muy claro que las funciones son valores de primera clase: pueden guardarse en variables, propiedades de objetos, arreglos o pasarse como argumentos.',
        `const saludar = function(nombre) {
  return 'Hola ' + nombre;
};

console.log(saludar('Luis'));`,
        'Hola Luis',
        'saludar contiene una referencia a la función. La variable debe inicializarse antes de llamar la función.',
        {color:'#f59e0b'}
      ),
      lesson(
        'arrow function',
        '3. Arrow function · función flecha',
        'Las arrow functions usan => y ofrecen una sintaxis compacta. Si el cuerpo tiene una sola expresión, puede omitirse return y las llaves. No crean su propio this, arguments ni super: capturan el this del contexto exterior. Tampoco pueden invocarse con new, por lo que no sustituyen a una función constructora cuando necesitas crear instancias.',
        `const duplicar = numero => numero * 2;
const sumar = (a, b) => a + b;

console.log(duplicar(5));
console.log(sumar(4, 7));`,
        '10\n11',
        'La expresión situada después de => se retorna de forma implícita cuando no se usan llaves.',
        {color:'#fde047'}
      ),
      lesson(
        'anonymous function',
        '4. Anonymous function · función anónima',
        'Una función anónima simplemente es una función sin nombre explícito. No es una categoría incompatible con las demás: una expresión de función o una arrow puede ser anónima. Se usa con frecuencia como callback cuando la función solo necesita existir en el lugar donde se entrega. Si la lógica crece o se reutiliza, conviene darle un nombre para mejorar lectura, pruebas y trazas de errores.',
        `setTimeout(function() {
  console.log('Han pasado 1000 ms');
}, 1000);`,
        'Han pasado 1000 ms',
        'setTimeout recibe una función anónima y la ejecuta después del tiempo indicado; pasar la función no significa ejecutarla inmediatamente.',
        {color:'#fbbf24'}
      ),
      lesson(
        'IIFE',
        '5. IIFE · función invocada inmediatamente',
        'IIFE significa Immediately Invoked Function Expression. Se crea una expresión de función y se invoca en el mismo momento con (). Históricamente se usaba mucho para crear un ámbito privado y evitar contaminar el espacio global. Los módulos ES modernos redujeron la necesidad de este patrón, pero sigue siendo útil para comprender expresiones, alcance y código de inicialización aislado.',
        `(function() {
  const mensaje = 'Se ejecuta una sola vez';
  console.log(mensaje);
})();`,
        'Se ejecuta una sola vez',
        'Los primeros paréntesis convierten la función en una expresión y los últimos () la ejecutan inmediatamente.',
        {color:'#f59e0b'}
      ),
      lesson(
        'callback',
        '6. Callback function · función entregada a otra función',
        'Un callback es una función que se pasa como argumento para que otra función decida cuándo ejecutarla. Puede ejecutarse de forma síncrona, como en map, o posteriormente, como en un temporizador o una respuesta asíncrona. Lo importante es diferenciar pasar procesarResultado de ejecutar procesarResultado().',
        `function procesar(nombre, callback) {
  const mensaje = 'Hola ' + nombre;
  callback(mensaje);
}

procesar('Sara', function(resultado) {
  console.log(resultado.toUpperCase());
});`,
        'HOLA SARA',
        'procesar recibe la referencia del callback y lo invoca después de construir el mensaje.',
        {color:'#eab308'}
      ),
      lesson(
        'default parameter',
        '7. Default parameter · parámetro con valor por defecto',
        'Un parámetro puede declarar un valor por defecto con =. Ese valor se usa cuando el argumento correspondiente se omite o se envía explícitamente como undefined. No se aplica cuando se envía null, porque null sí es un valor. Los valores por defecto permiten reducir comprobaciones manuales dentro de la función.',
        `function saludar(nombre = 'Invitado') {
  return 'Hola ' + nombre;
}

console.log(saludar());
console.log(saludar('Dilan'));`,
        'Hola Invitado\nHola Dilan',
        'En la primera llamada no existe argumento para nombre, por eso se utiliza Invitado.',
        {color:'#fde047'}
      ),
      lesson(
        'rest parameter',
        '8. Rest parameter · recibir una cantidad variable de argumentos',
        'El parámetro rest se escribe con ... antes del último parámetro y agrupa los argumentos restantes dentro de un Array real. Solo puede existir un rest parameter y debe ocupar la última posición. Es preferible a arguments cuando quieres usar métodos de arreglos como reduce, map o filter directamente.',
        `function sumar(...numeros) {
  return numeros.reduce((total, numero) => total + numero, 0);
}

console.log(sumar(2, 4, 6));
console.log(sumar(10, 20, 30, 40));`,
        '12\n100',
        '...numeros recoge todos los argumentos y crea el arreglo [2, 4, 6] en la primera llamada.',
        {color:'#facc15'}
      ),
      lesson(
        'parameters',
        '9. Parameterized function · función con parámetros',
        '“Función parametrizada” describe una función que recibe parámetros; no es una sintaxis distinta de function declaration, expression o arrow. Los parámetros son los nombres escritos en la definición y los argumentos son los valores concretos enviados en la llamada. Entender esta diferencia ayuda a leer APIs y documentación.',
        `function calcularTotal(precio, cantidad, impuesto = 0.19) {
  const subtotal = precio * cantidad;
  return subtotal + subtotal * impuesto;
}

console.log(calcularTotal(10000, 2));`,
        '23800',
        'precio, cantidad e impuesto son parámetros; 10000 y 2 son argumentos de la llamada.',
        {color:'#f59e0b'}
      ),
      lesson(
        'recursion',
        '10. Recursive function · función recursiva',
        'Una función recursiva se llama a sí misma para resolver una versión más pequeña del mismo problema. Siempre debe existir un caso base que detenga la recursión. Sin ese caso, las llamadas siguen acumulándose hasta agotar la pila. Para muchas tareas iterativas un bucle es más simple, pero la recursión es natural en árboles, estructuras anidadas y ciertos algoritmos.',
        `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5));`,
        '120',
        'factorial(5) depende de factorial(4), luego de factorial(3), hasta llegar al caso base n <= 1.',
        {color:'#fbbf24'}
      ),
      lesson(
        'higher-order function',
        '11. Higher-order function · función de orden superior',
        'Una función de orden superior recibe al menos una función como argumento, devuelve una función, o hace ambas cosas. map, filter y reduce son ejemplos porque reciben callbacks. Crear funciones que devuelven otras funciones permite fabricar comportamientos configurados sin repetir lógica.',
        `function multiplicarPor(factor) {
  return function(numero) {
    return numero * factor;
  };
}

const duplicar = multiplicarPor(2);
const triplicar = multiplicarPor(3);

console.log(duplicar(8));
console.log(triplicar(8));`,
        '16\n24',
        'multiplicarPor devuelve una nueva función que recuerda el valor de factor mediante un closure.',
        {color:'#eab308'}
      ),
      lesson(
        'constructor function',
        '12. Constructor function · función constructora',
        'Antes de class era habitual usar funciones constructoras junto con new para crear objetos relacionados. Por convención su nombre empieza en mayúscula. new crea un objeto, enlaza su prototipo, ejecuta la función usando ese objeto como this y devuelve la instancia. Es importante conocer este patrón para código existente, aunque class suele expresar mejor la intención en código moderno.',
        `function Persona(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;
}

Persona.prototype.saludar = function() {
  return 'Hola, soy ' + this.nombre;
};

const ana = new Persona('Ana', 21);
console.log(ana.saludar());`,
        'Hola, soy Ana',
        'new Persona(...) crea una instancia cuyo prototipo contiene saludar. Una arrow function no puede utilizarse como constructora.',
        {color:'#f59e0b'}
      ),
      lesson(
        'async function',
        '13. Async function · funciones asíncronas',
        'Una función declarada con async siempre devuelve una Promise. Dentro de ella, await permite esperar el resultado de otra Promise sin encadenar manualmente varios .then(). await pausa esa función, no bloquea todo el navegador. Los errores pueden manejarse con try/catch.',
        `async function obtenerUsuario() {
  const respuesta = await Promise.resolve({ id: 1, nombre: 'Laura' });
  return respuesta;
}

obtenerUsuario().then(usuario => {
  console.log(usuario.nombre);
});`,
        'Laura',
        'obtenerUsuario devuelve una Promise; el valor retornado se convierte en el resultado resuelto de esa Promise.',
        {color:'#facc15'}
      ),
      lesson(
        'generator function',
        '14. Generator function · función generadora',
        'Una función generadora se declara con function* y puede pausar su ejecución con yield. Al llamarla no se ejecuta todo el cuerpo: se obtiene un iterador. Cada next() reanuda la función hasta el siguiente yield. Es útil para secuencias perezosas, iteradores personalizados y procesos que producen valores paso a paso.',
        `function* ids() {
  let id = 1;
  while (true) {
    yield id;
    id += 1;
  }
}

const generador = ids();
console.log(generador.next().value);
console.log(generador.next().value);
console.log(generador.next().value);`,
        '1\n2\n3',
        'Cada llamada a next() continúa justo después del yield anterior sin reiniciar las variables locales.',
        {color:'#fde047'}
      )
    ]
  });
})();
