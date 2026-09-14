(()=>{
  if(window.__typescriptCourseAdded)return;
  window.__typescriptCourseAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const COURSE='TypeScript';
  const R=(title,body)=>`<section style="font-family:system-ui;max-width:620px;border:1px solid #cbd5e1;border-radius:14px;overflow:hidden;background:#fff;color:#0f172a"><header style="padding:10px 14px;background:#3178c6;color:#fff;font-weight:800">Resultado · ${title}</header><pre style="margin:0;padding:16px;white-space:pre-wrap;line-height:1.55;background:#f8fafc;color:#334155">${body}</pre></section>`;
  const L=(topic,name,description,code,output,opts={})=>{
    const path=opts.path||'src/index.ts';
    const action=opts.action||'Crear o modificar';
    const guide=[];
    const files=[];
    if(opts.command)guide.push(['Ejecutar','Terminal · raíz del proyecto TypeScript',opts.commandDetail||'Ejecuta este comando desde la carpeta del proyecto.']);
    if(path)guide.push([action,path,opts.pathDetail||'Escribe aquí el código principal de esta lección y compílalo para comprobar el resultado.']);
    (opts.extraGuide||[]).forEach(entry=>guide.push(entry));
    if(opts.create!==false&&path)files.push({path,method:opts.method||'MANUAL',detail:opts.fileDetail||'Archivo de práctica de esta lección.',command:opts.fileCommand||''});
    (opts.files||[]).forEach(file=>files.push(file));
    return T(topic,name,description,code,R(name,output),[],{
      kind:COURSE,
      tip:opts.tip||'Compila con TypeScript y compara el resultado con lo esperado.',
      guide,
      guideTitle:'Dónde se hace cada modificación',
      codeLabel:'Código TypeScript',
      filesToCreate:files,
      filesToCreateTitle:'Archivos que se crean en esta lección',
      filesToCreateStatus:files.length?'Crea o genera estos archivos antes de continuar.':'No necesitas crear un archivo nuevo en esta lección; revisa o modifica los indicados abajo.'
    });
  };
  const S=(n,title,description,challenge,items)=>sections.push({
    title:`TypeScript · ${n}. ${title}`,
    navLabel:`${n}. ${title}`,
    group:COURSE,
    primaryArea:COURSE,
    course:COURSE,
    areaOrder:Number(n)*100,
    description,
    quote:'“TypeScript añade información de tipos antes de ejecutar JavaScript; el navegador sigue ejecutando JavaScript.”',
    challenge,
    items
  });

  S(0,'Desde cero',
    'Instala TypeScript, crea un proyecto vacío, entiende qué compila tsc y aprende a trabajar con tsconfig.json y modo strict. La meta es comprender el flujo archivo .ts → compilador → archivo .js → ejecución.',
    'Crea una carpeta nueva, configura TypeScript en modo strict y ejecuta un primer programa compilado.',[
      L('Introducción','Qué es TypeScript y qué problema resuelve',
        'TypeScript es un superconjunto de JavaScript: acepta JavaScript válido y añade un sistema de tipos estático que ayuda a detectar errores antes de ejecutar. Los tipos se usan durante desarrollo y compilación; normalmente desaparecen del JavaScript generado.',
        `const nombre: string = 'Ana';\nconst edad: number = 24;\n\nconsole.log(nombre, edad);`,
        `Ana 24\n\nEl navegador o Node ejecuta JavaScript compilado; : string y : number no existen en tiempo de ejecución.`,
        {path:'src/00-desde-cero/que-es-typescript.ts',tip:'Piensa en TypeScript como una capa de comprobación sobre JavaScript, no como un navegador nuevo.'}),
      L('Instalación','Crear un proyecto e instalar TypeScript',
        'npm init crea package.json. Instalar TypeScript como dependencia de desarrollo hace que la versión del compilador quede registrada dentro del proyecto. npx tsc usa esa versión local.',
        `mkdir repaso-typescript\ncd repaso-typescript\nnpm init -y\nnpm install -D typescript\nnpx tsc --version`,
        `package.json creado\nnode_modules instalado\nVersion 5.x`,
        {path:'package.json',action:'Revisar',create:false,command:'npm init -y && npm install -D typescript',commandDetail:'Crea package.json e instala TypeScript como dependencia de desarrollo.',files:[{path:'package.json',method:'NPM',detail:'npm init genera el manifiesto del proyecto.',command:'npm init -y'}]}),
      L('Configuración','Crear tsconfig.json',
        'tsconfig.json define cómo compila el proyecto. strict activa comprobaciones importantes; rootDir indica dónde vive TypeScript y outDir dónde se escribe JavaScript compilado.',
        `npx tsc --init\n\n// tsconfig.json\n{\n  "compilerOptions": {\n    "target": "ES2022",\n    "module": "ESNext",\n    "rootDir": "./src",\n    "outDir": "./dist",\n    "strict": true\n  },\n  "include": ["src/**/*.ts"]\n}`,
        `tsconfig.json listo\nsrc/ será la entrada\ndist/ contendrá el JavaScript compilado`,
        {path:'tsconfig.json',action:'Modificar',create:false,command:'npx tsc --init',files:[{path:'tsconfig.json',method:'TSC',detail:'El compilador genera una configuración inicial.',command:'npx tsc --init'}]}),
      L('Compilación','Primer archivo .ts y compilación con tsc',
        'El compilador lee los archivos incluidos por tsconfig, valida sus tipos y genera JavaScript en dist. Si hay errores de tipos, TypeScript los reporta con archivo, línea y explicación.',
        `// src/index.ts\nconst mensaje: string = 'Hola TypeScript';\nconsole.log(mensaje);\n\n// Terminal\nnpx tsc\nnode dist/index.js`,
        `Hola TypeScript`,
        {path:'src/index.ts',command:'npx tsc && node dist/index.js',extraGuide:[['Revisar','dist/index.js','Observa el JavaScript generado: las anotaciones de tipos ya no están.']]}),
      L('Desarrollo','Modo watch para recompilar automáticamente',
        'tsc --watch mantiene el compilador activo. Cada vez que guardas un .ts vuelve a comprobar y compilar únicamente lo necesario, lo que acelera el ciclo editar → guardar → probar.',
        `npx tsc --watch`,
        `Starting compilation in watch mode...\nFound 0 errors. Watching for file changes.`,
        {path:'tsconfig.json',action:'Revisar',create:false,command:'npx tsc --watch',tip:'Deja una terminal con tsc --watch y usa otra para ejecutar la aplicación.'}),
      L('Seguridad','Por qué conviene strict',
        'strict reúne varias comprobaciones que evitan valores posiblemente undefined, parámetros sin tipo y asignaciones inseguras. Aprender con strict evita acostumbrarse a silenciar errores reales.',
        `function mayusculas(texto: string | undefined) {\n  if (texto === undefined) return 'SIN TEXTO';\n  return texto.toUpperCase();\n}\n\nconsole.log(mayusculas(undefined));`,
        `SIN TEXTO`,
        {path:'src/00-desde-cero/strict.ts',extraGuide:[['Modificar','tsconfig.json','Mantén "strict": true para que el compilador detecte casos inseguros.']]})
    ]);

  S(1,'Tipos fundamentales',
    'Aprende inferencia, anotaciones, tipos primitivos, arrays, tuplas, readonly y valores literales. Estas piezas son la base de todo el tipado posterior.',
    'Modela los datos de un producto usando tipos correctos sin recurrir a any.',[
      L('Inferencia','Dejar que TypeScript infiera el tipo',
        'Cuando el valor inicial es claro, TypeScript puede deducir el tipo sin escribir una anotación. Esto reduce ruido sin perder seguridad.',
        `let ciudad = 'Bogotá';\nlet visitas = 3;\nlet activo = true;\n\n// ciudad = 25; // error\nconsole.log(ciudad, visitas, activo);`,
        `Bogotá 3 true`,{path:'src/01-tipos/inferencia.ts'}),
      L('Primitivos','string, number, boolean, null y undefined',
        'Los tipos primitivos describen valores simples. null y undefined son tipos distintos cuando strictNullChecks está activo, por eso deben incluirse explícitamente si una variable puede contenerlos.',
        `const titulo: string = 'Curso';\nconst precio: number = 199900;\nconst publicado: boolean = true;\nlet descuento: number | null = null;\nlet nota: string | undefined;\n\nconsole.log(titulo, precio, publicado, descuento, nota);`,
        `Curso 199900 true null undefined`,{path:'src/01-tipos/primitivos.ts'}),
      L('Colecciones','Arrays tipados',
        'string[] y Array<string> significan un arreglo cuyos elementos deben ser string. El tipo impide insertar accidentalmente datos incompatibles.',
        `const temas: string[] = ['HTML', 'CSS'];\nconst notas: Array<number> = [4.5, 4.8];\n\ntemas.push('TypeScript');\nconsole.log(temas.join(' · '));`,
        `HTML · CSS · TypeScript`,{path:'src/01-tipos/arrays.ts'}),
      L('Tuplas','Tuplas para posiciones con significado',
        'Una tupla fija cuántas posiciones existen y qué tipo corresponde a cada una. Es útil para pares o resultados pequeños; para estructuras grandes suele ser más legible un objeto.',
        `const coordenada: [number, number] = [4.711, -74.072];\nconst usuario: [number, string, boolean] = [1, 'Ana', true];\n\nconsole.log(usuario[1], coordenada[0]);`,
        `Ana 4.711`,{path:'src/01-tipos/tuplas.ts'}),
      L('Inmutabilidad','readonly y ReadonlyArray',
        'readonly comunica que una referencia no debe modificarse a través de esa variable. Es una protección de compilación y ayuda a diseñar funciones sin efectos secundarios inesperados.',
        `const tecnologias: readonly string[] = ['HTML', 'CSS', 'TS'];\n// tecnologias.push('SQL'); // error\n\nconst copia = [...tecnologias, 'SQL'];\nconsole.log(copia.join(', '));`,
        `HTML, CSS, TS, SQL`,{path:'src/01-tipos/readonly.ts'})
    ]);

  S(2,'Objetos y funciones',
    'Modela objetos con type e interface y aprende a tipar parámetros, retornos, propiedades opcionales, callbacks y funciones con argumentos variables.',
    'Crea funciones que trabajen con un modelo Producto sin perder información de tipos.',[
      L('Modelado','type alias para objetos',
        'Un alias permite poner nombre a una estructura y reutilizarla. Las propiedades quedan comprobadas cada vez que asignas un objeto a ese tipo.',
        `type Producto = {\n  id: number;\n  nombre: string;\n  precio: number;\n};\n\nconst teclado: Producto = { id: 1, nombre: 'Teclado', precio: 180000 };\nconsole.log(teclado.nombre);`,
        `Teclado`,{path:'src/02-objetos/producto-type.ts'}),
      L('Interfaces','interface y extensión',
        'interface describe la forma de un objeto y puede extender otra interface. Es frecuente en contratos de dominio, APIs y clases.',
        `interface Persona {\n  id: number;\n  nombre: string;\n}\n\ninterface Estudiante extends Persona {\n  curso: string;\n}\n\nconst ana: Estudiante = { id: 1, nombre: 'Ana', curso: 'TypeScript' };\nconsole.log(ana.curso);`,
        `TypeScript`,{path:'src/02-objetos/interfaces.ts'}),
      L('Propiedades','Propiedades opcionales y readonly',
        'El signo ? indica que una propiedad puede faltar. readonly evita reasignarla a través de ese tipo. Ambos modificadores expresan reglas del dominio.',
        `interface Cuenta {\n  readonly id: number;\n  nombre: string;\n  avatarUrl?: string;\n}\n\nconst cuenta: Cuenta = { id: 7, nombre: 'Dilan' };\nconsole.log(cuenta.avatarUrl ?? 'sin avatar');`,
        `sin avatar`,{path:'src/02-objetos/propiedades.ts'}),
      L('Funciones','Parámetros y tipo de retorno',
        'Tipar parámetros protege lo que entra a la función y el retorno protege lo que sale. TypeScript también puede inferir el retorno, pero escribirlo en APIs públicas documenta el contrato.',
        `function total(precio: number, cantidad: number): number {\n  return precio * cantidad;\n}\n\nconsole.log(total(25000, 3));`,
        `75000`,{path:'src/02-objetos/funciones.ts'}),
      L('Callbacks','Tipar una función recibida como argumento',
        'El tipo del callback describe qué parámetros recibirá y qué debe devolver. Así el editor puede autocompletar y detectar retornos incorrectos.',
        `type Formateador = (valor: number) => string;\n\nfunction mostrarPrecio(valor: number, formato: Formateador) {\n  return formato(valor);\n}\n\nconst pesos: Formateador = valor => '$' + valor.toLocaleString('es-CO');\nconsole.log(mostrarPrecio(180000, pesos));`,
        `$180.000`,{path:'src/02-objetos/callbacks.ts'})
    ]);

  S(3,'Uniones y narrowing',
    'Aprende a representar varios estados válidos y a reducir una unión hasta el tipo correcto mediante comprobaciones seguras.',
    'Modela estados loading, success y error y obliga al código a manejar todos los casos.',[
      L('Uniones','Permitir varios tipos con |',
        'Una unión indica que un valor puede pertenecer a varios tipos. Antes de usar operaciones específicas debes demostrar cuál de ellos tienes.',
        `function imprimirId(id: number | string) {\n  return typeof id === 'number' ? id.toFixed(0) : id.toUpperCase();\n}\n\nconsole.log(imprimirId(10));\nconsole.log(imprimirId('ab-7'));`,
        `10\nAB-7`,{path:'src/03-uniones/uniones.ts'}),
      L('Literales','Tipos literales para valores permitidos',
        'Un tipo literal limita el valor a opciones concretas. Es más preciso que string cuando solo existen unos pocos estados válidos.',
        `type Estado = 'pendiente' | 'pagado' | 'cancelado';\n\nlet estado: Estado = 'pendiente';\nestado = 'pagado';\nconsole.log(estado);`,
        `pagado`,{path:'src/03-uniones/literales.ts'}),
      L('Narrowing','typeof, in e instanceof',
        'TypeScript analiza condiciones de JavaScript para reducir tipos. typeof sirve para primitivos, in para propiedades y instanceof para instancias de clases.',
        `type Admin = { nombre: string; permisos: string[] };\ntype Cliente = { nombre: string; compras: number };\n\nfunction resumen(usuario: Admin | Cliente) {\n  if ('permisos' in usuario) return 'Admin: ' + usuario.permisos.length;\n  return 'Cliente: ' + usuario.compras;\n}\n\nconsole.log(resumen({ nombre: 'Ana', permisos: ['editar'] }));`,
        `Admin: 1`,{path:'src/03-uniones/narrowing.ts'}),
      L('Estados','Uniones discriminadas',
        'Una propiedad común con valores literales permite distinguir cada variante de forma muy segura. Este patrón es excelente para estados de peticiones y reducers.',
        `type Respuesta =\n  | { estado: 'cargando' }\n  | { estado: 'ok'; datos: string[] }\n  | { estado: 'error'; mensaje: string };\n\nfunction texto(r: Respuesta): string {\n  if (r.estado === 'ok') return r.datos.join(', ');\n  if (r.estado === 'error') return r.mensaje;\n  return 'Cargando...';\n}\n\nconsole.log(texto({ estado: 'ok', datos: ['TS', 'Angular'] }));`,
        `TS, Angular`,{path:'src/03-uniones/discriminadas.ts'}),
      L('Seguridad','unknown, any y never',
        'any desactiva la comprobación y debe evitarse. unknown obliga a validar antes de usar. never representa un caso imposible y sirve para comprobar que una unión fue manejada completamente.',
        `function mensajeSeguro(valor: unknown): string {\n  if (valor instanceof Error) return valor.message;\n  if (typeof valor === 'string') return valor;\n  return 'Error desconocido';\n}\n\nconsole.log(mensajeSeguro(new Error('Falló la petición')));`,
        `Falló la petición`,{path:'src/03-uniones/unknown-never.ts'})
    ]);

  S(4,'Clases y orientación a objetos',
    'Usa clases cuando el problema requiere instancias con estado y comportamiento. Aprende constructor, visibilidad, readonly, herencia, clases abstractas e interfaces.',
    'Crea una clase Cuenta que proteja su saldo y exponga operaciones seguras.',[
      L('Clases','Constructor y métodos',
        'Una clase define cómo construir objetos con estado y comportamiento. Las propiedades deben inicializarse de forma compatible con strictPropertyInitialization.',
        `class Producto {\n  constructor(public nombre: string, public precio: number) {}\n\n  conIva(): number {\n    return this.precio * 1.19;\n  }\n}\n\nconst p = new Producto('Teclado', 180000);\nconsole.log(p.conIva());`,
        `214200`,{path:'src/04-poo/clases.ts'}),
      L('Encapsulación','public, private y protected',
        'public es accesible desde cualquier parte. private limita el acceso a la clase. protected permite acceso dentro de la clase y sus subclases. Esto ayuda a proteger invariantes.',
        `class Cuenta {\n  private saldo = 0;\n\n  depositar(valor: number) {\n    if (valor <= 0) throw new Error('Valor inválido');\n    this.saldo += valor;\n  }\n\n  obtenerSaldo() { return this.saldo; }\n}\n\nconst cuenta = new Cuenta();\ncuenta.depositar(50000);\nconsole.log(cuenta.obtenerSaldo());`,
        `50000`,{path:'src/04-poo/encapsulacion.ts'}),
      L('Propiedades','readonly, static, getter y setter',
        'readonly bloquea reasignación después de inicializar. static pertenece a la clase y no a una instancia. getters y setters permiten exponer una propiedad calculada o validada.',
        `class Usuario {\n  static total = 0;\n  readonly id: number;\n  private _nombre: string;\n\n  constructor(nombre: string) {\n    this.id = ++Usuario.total;\n    this._nombre = nombre;\n  }\n\n  get nombre() { return this._nombre; }\n  set nombre(valor: string) { if (valor.trim()) this._nombre = valor.trim(); }\n}\n\nconst u = new Usuario('Ana');\nconsole.log(u.id, u.nombre);`,
        `1 Ana`,{path:'src/04-poo/propiedades.ts'}),
      L('Herencia','extends y super',
        'extends permite especializar una clase base. super llama al constructor del padre. Usa herencia cuando exista una relación real de especialización, no solo para reutilizar código.',
        `class Empleado {\n  constructor(public nombre: string) {}\n}\n\nclass Desarrollador extends Empleado {\n  constructor(nombre: string, public lenguaje: string) {\n    super(nombre);\n  }\n}\n\nconst dev = new Desarrollador('Ana', 'TypeScript');\nconsole.log(dev.nombre, dev.lenguaje);`,
        `Ana TypeScript`,{path:'src/04-poo/herencia.ts'}),
      L('Contratos','implements y clases abstractas',
        'implements obliga a una clase a respetar una interface. abstract define una base que no puede instanciarse directamente y puede exigir métodos a sus subclases.',
        `interface Guardable { guardar(): void }\n\nabstract class Recurso {\n  constructor(public id: number) {}\n  abstract etiqueta(): string;\n}\n\nclass Documento extends Recurso implements Guardable {\n  etiqueta() { return 'Documento #' + this.id; }\n  guardar() { console.log('guardado'); }\n}\n\nconst doc = new Documento(3);\nconsole.log(doc.etiqueta());`,
        `Documento #3`,{path:'src/04-poo/contratos.ts'})
    ]);

  S(5,'Genéricos y tipos utilitarios',
    'Los genéricos conservan información de tipos sin duplicar funciones. Aquí también aprenderás keyof, acceso indexado y utilidades integradas para transformar modelos.',
    'Diseña una respuesta API genérica y deriva modelos de creación y actualización a partir de un modelo principal.',[
      L('Genéricos','Función genérica básica',
        'T representa un tipo que se decide al llamar la función. El retorno conserva el tipo exacto de la entrada en lugar de degradarlo a unknown o any.',
        `function primero<T>(lista: T[]): T | undefined {\n  return lista[0];\n}\n\nconst numero = primero([10, 20, 30]);\nconst texto = primero(['TS', 'JS']);\nconsole.log(numero, texto);`,
        `10 TS`,{path:'src/05-genericos/funcion-generica.ts'}),
      L('Constraints','Restringir un genérico con extends',
        'Una restricción exige que T tenga ciertas propiedades sin perder el resto de su tipo específico.',
        `function conId<T extends { id: number }>(valor: T): string {\n  return 'ID=' + valor.id;\n}\n\nconsole.log(conId({ id: 7, nombre: 'Ana' }));`,
        `ID=7`,{path:'src/05-genericos/constraints.ts'}),
      L('Claves','keyof y acceso indexado',
        'keyof produce la unión de claves de un objeto. T[K] obtiene el tipo de una propiedad. Juntos permiten utilidades seguras para leer datos dinámicamente.',
        `function obtener<T, K extends keyof T>(obj: T, clave: K): T[K] {\n  return obj[clave];\n}\n\nconst producto = { nombre: 'Mouse', precio: 90000 };\nconsole.log(obtener(producto, 'precio'));`,
        `90000`,{path:'src/05-genericos/keyof.ts'}),
      L('Utilidades','Partial, Pick, Omit, Record y Readonly',
        'Los utility types transforman tipos existentes. Esto evita duplicar interfaces casi iguales para crear, editar, listar o congelar datos.',
        `type Producto = { id: number; nombre: string; precio: number };\ntype CrearProducto = Omit<Producto, 'id'>;\ntype ActualizarProducto = Partial<CrearProducto>;\ntype PrecioPorId = Record<number, number>;\n\nconst cambio: ActualizarProducto = { precio: 99000 };\nconst precios: PrecioPorId = { 1: 90000, 2: 120000 };\nconsole.log(cambio.precio, precios[2]);`,
        `99000 120000`,{path:'src/05-genericos/utility-types.ts'}),
      L('APIs','Respuesta genérica reutilizable',
        'Un contenedor genérico puede envolver distintos tipos de datos manteniendo tipado completo para datos, errores y metadatos.',
        `interface ApiResponse<T> {\n  data: T;\n  ok: boolean;\n  message?: string;\n}\n\ntype Producto = { id: number; nombre: string };\nconst respuesta: ApiResponse<Producto[]> = {\n  ok: true,\n  data: [{ id: 1, nombre: 'Teclado' }]\n};\n\nconsole.log(respuesta.data[0].nombre);`,
        `Teclado`,{path:'src/05-genericos/api-response.ts'})
    ]);

  S(6,'Módulos, DOM y asincronía',
    'Aplica TypeScript en aplicaciones web reales: módulos ES, DOM tipado, eventos, formularios, fetch, Promises y almacenamiento local.',
    'Construye una pequeña búsqueda que lea un formulario, haga fetch y pinte resultados tipados.',[
      L('Módulos','export e import',
        'Los módulos separan responsabilidades. export hace pública una función o tipo e import lo consume desde otro archivo. Los tipos pueden importarse con import type.',
        `// src/06-web/math.ts\nexport function sumar(a: number, b: number) { return a + b; }\n\n// src/06-web/main.ts\nimport { sumar } from './math.js';\nconsole.log(sumar(2, 3));`,
        `5`,{path:'src/06-web/main.ts',files:[{path:'src/06-web/math.ts',method:'MANUAL',detail:'Módulo exportado con funciones reutilizables.'}],extraGuide:[['Crear','src/06-web/math.ts','Exporta aquí la función sumar.']]}),
      L('DOM','Seleccionar elementos con tipos seguros',
        'querySelector puede devolver null, así que debes comprobar el resultado. Los genéricos permiten indicar el tipo concreto de elemento y acceder a propiedades como value.',
        `const input = document.querySelector<HTMLInputElement>('#nombre');\n\nif (input) {\n  input.value = 'Ana';\n  console.log(input.value);\n}`,
        `El input #nombre queda con el valor Ana.`,{path:'src/06-web/dom.ts',extraGuide:[['Modificar','index.html','Añade <input id="nombre"> para probar el selector.']],files:[{path:'index.html',method:'MANUAL',detail:'Página mínima que contiene el elemento #nombre.'}]}),
      L('Eventos','Tipar eventos del navegador',
        'El callback del evento recibe un Event. currentTarget puede tiparse mediante una comprobación o un cast controlado cuando sabes qué elemento registró el listener.',
        `const boton = document.querySelector<HTMLButtonElement>('#guardar');\n\nboton?.addEventListener('click', (evento) => {\n  const actual = evento.currentTarget as HTMLButtonElement;\n  actual.textContent = 'Guardado';\n});`,
        `Al hacer clic, el botón cambia de “Guardar” a “Guardado”.`,{path:'src/06-web/eventos.ts',extraGuide:[['Modificar','index.html','Añade <button id="guardar">Guardar</button>.']]}),
      L('Formularios','Leer un formulario con FormData',
        'FormData devuelve FormDataEntryValue, que puede ser string o File. Debes comprobar el tipo antes de tratarlo como texto.',
        `const form = document.querySelector<HTMLFormElement>('#registro');\n\nform?.addEventListener('submit', evento => {\n  evento.preventDefault();\n  const data = new FormData(form);\n  const nombre = data.get('nombre');\n  if (typeof nombre === 'string') console.log(nombre.trim());\n});`,
        `Si el usuario escribe Ana y envía: Ana`,{path:'src/06-web/formularios.ts',extraGuide:[['Modificar','index.html','Crea el formulario #registro con un input name="nombre".']]}),
      L('Fetch','fetch con tipos de respuesta',
        'fetch no conoce automáticamente la forma del JSON. Define un tipo, comprueba response.ok y valida datos externos cuando la aplicación necesite garantías en tiempo de ejecución.',
        `type Usuario = { id: number; name: string };\n\nasync function cargarUsuario(id: number): Promise<Usuario> {\n  const response = await fetch('https://jsonplaceholder.typicode.com/users/' + id);\n  if (!response.ok) throw new Error('HTTP ' + response.status);\n  return await response.json() as Usuario;\n}\n\ncargarUsuario(1).then(u => console.log(u.name));`,
        `Leanne Graham`,{path:'src/06-web/fetch.ts'}),
      L('Persistencia','localStorage con parseo tipado',
        'localStorage solo guarda strings. JSON.parse devuelve any, por eso conviene centralizar la lectura y validar si los datos externos son críticos.',
        `type Tarea = { id: number; texto: string; hecha: boolean };\n\nconst tareas: Tarea[] = [{ id: 1, texto: 'Estudiar TS', hecha: false }];\nlocalStorage.setItem('tareas', JSON.stringify(tareas));\n\nconst raw = localStorage.getItem('tareas');\nconst guardadas: Tarea[] = raw ? JSON.parse(raw) : [];\nconsole.log(guardadas[0].texto);`,
        `Estudiar TS`,{path:'src/06-web/storage.ts'})
    ]);

  S(7,'TypeScript avanzado',
    'Transforma tipos, deriva información automáticamente y diseña APIs de tipos expresivas. Estos recursos son comunes en librerías, frameworks y bases de código grandes.',
    'Crea tipos derivados sin repetir manualmente las propiedades del modelo original.',[
      L('Intersecciones','Combinar tipos con &',
        'Una intersección exige cumplir varios tipos a la vez. Es útil para componer capacidades, aunque un objeto de dominio demasiado fragmentado puede volverse difícil de leer.',
        `type Identificable = { id: number };\ntype Auditable = { creadoEn: Date };\ntype Registro = Identificable & Auditable & { nombre: string };\n\nconst r: Registro = { id: 1, nombre: 'Ana', creadoEn: new Date('2026-01-01') };\nconsole.log(r.id, r.nombre);`,
        `1 Ana`,{path:'src/07-avanzado/intersecciones.ts'}),
      L('Mapped types','Crear tipos recorriendo claves',
        'Un mapped type itera sobre keyof y genera propiedades nuevas. Muchas utilidades estándar como Partial están construidas con esta idea.',
        `type Flags<T> = {\n  [K in keyof T]: boolean;\n};\n\ntype Permisos = { editar: string; borrar: string };\ntype PermisosUI = Flags<Permisos>;\n\nconst ui: PermisosUI = { editar: true, borrar: false };\nconsole.log(ui);`,
        `{ editar: true, borrar: false }`,{path:'src/07-avanzado/mapped-types.ts'}),
      L('Conditional types','Tipos condicionales e infer',
        'Un conditional type elige un tipo según una condición. infer permite capturar una parte del tipo dentro de esa condición.',
        `type Elemento<T> = T extends Array<infer U> ? U : T;\n\ntype A = Elemento<string[]>; // string\ntype B = Elemento<number>;   // number\n\nconst a: A = 'TS';\nconst b: B = 7;\nconsole.log(a, b);`,
        `TS 7`,{path:'src/07-avanzado/conditional-infer.ts'}),
      L('Template literal types','Construir strings válidos desde tipos',
        'Los template literal types combinan unions para generar cadenas permitidas. Son útiles para eventos, rutas y nombres de propiedades.',
        `type Evento = 'create' | 'update' | 'delete';\ntype Recurso = 'user' | 'product';\ntype NombreEvento = \`${'${Evento}'}:${'${Recurso}'}\`;\n\nconst evento: NombreEvento = 'update:product';\nconsole.log(evento);`,
        `update:product`,{path:'src/07-avanzado/template-literals.ts'}),
      L('Precisión','as const y satisfies',
        'as const conserva valores literales y readonly. satisfies verifica que un valor cumple un contrato sin perder la inferencia específica del objeto.',
        `type Config = { modo: 'dev' | 'prod'; puerto: number };\n\nconst config = {\n  modo: 'dev',\n  puerto: 5173\n} satisfies Config;\n\nconst rutas = ['/', '/login'] as const;\nconsole.log(config.modo, rutas[1]);`,
        `dev /login`,{path:'src/07-avanzado/satisfies.ts'}),
      L('Librerías','Archivos .d.ts y declaración de tipos',
        'Un archivo .d.ts describe tipos sin producir JavaScript. Se usa para librerías JavaScript, variables globales o contratos públicos de paquetes.',
        `// src/types/legacy-lib.d.ts\ndeclare module 'legacy-lib' {\n  export function saludar(nombre: string): string;\n}\n\n// src/07-avanzado/usar-legacy.ts\nimport { saludar } from 'legacy-lib';\nconst mensaje: string = saludar('Ana');`,
        `El editor conoce la firma de saludar aunque la librería original sea JavaScript.`,{path:'src/07-avanzado/usar-legacy.ts',files:[{path:'src/types/legacy-lib.d.ts',method:'MANUAL',detail:'Declaración de tipos para el módulo JavaScript.'}],extraGuide:[['Crear','src/types/legacy-lib.d.ts','Declara aquí el contrato público de la librería sin generar JavaScript.']]})
    ]);

  S(8,'Proyecto y repaso avanzado',
    'Cierra el curso construyendo una aplicación de tareas separada por modelo, servicio, vista y punto de entrada. El proyecto conecta tipos, módulos, DOM, localStorage y compilación strict.',
    'Construye la aplicación completa, añade una nueva propiedad prioridad y comprueba que TypeScript te muestre todos los lugares que debes actualizar.',[
      L('Arquitectura','Estructura del proyecto final',
        'Separar archivos por responsabilidad evita que toda la lógica termine en main.ts. El modelo define datos, el servicio maneja persistencia y la vista manipula el DOM.',
        `src/\n├─ models/tarea.ts\n├─ services/tarea-service.ts\n├─ ui/tarea-view.ts\n└─ main.ts\n\nindex.html\ntsconfig.json`,
        `Proyecto dividido en modelo, servicio, vista y entrada.`,{path:'src/main.ts',files:[{path:'src/models/tarea.ts',method:'MANUAL',detail:'Contrato de una tarea.'},{path:'src/services/tarea-service.ts',method:'MANUAL',detail:'Persistencia y reglas de tareas.'},{path:'src/ui/tarea-view.ts',method:'MANUAL',detail:'Renderizado y eventos del DOM.'},{path:'index.html',method:'MANUAL',detail:'Estructura HTML de la aplicación.'}]}),
      L('Modelo','Definir el modelo Tarea',
        'El modelo expresa el contrato central. Si cambia, el compilador ayuda a localizar qué código debe adaptarse.',
        `export type Prioridad = 'baja' | 'media' | 'alta';\n\nexport interface Tarea {\n  id: string;\n  texto: string;\n  hecha: boolean;\n  prioridad: Prioridad;\n}`, 
        `Tarea queda disponible para importarla desde servicios y UI.`,{path:'src/models/tarea.ts'}),
      L('Servicio','Servicio tipado con localStorage',
        'El servicio encapsula cómo se cargan y guardan tareas. La UI no necesita conocer la clave de localStorage ni cómo se serializa el arreglo.',
        `import type { Tarea } from '../models/tarea.js';\n\nconst CLAVE = 'ts-tareas';\n\nexport function cargar(): Tarea[] {\n  const raw = localStorage.getItem(CLAVE);\n  return raw ? JSON.parse(raw) as Tarea[] : [];\n}\n\nexport function guardar(tareas: Tarea[]): void {\n  localStorage.setItem(CLAVE, JSON.stringify(tareas));\n}`, 
        `El servicio expone cargar(): Tarea[] y guardar(tareas): void.`,{path:'src/services/tarea-service.ts'}),
      L('Vista','Renderizar tareas en el DOM',
        'La vista recibe datos tipados y produce elementos HTML. Centralizar el renderizado evita mezclar almacenamiento y DOM.',
        `import type { Tarea } from '../models/tarea.js';\n\nexport function renderTareas(lista: HTMLElement, tareas: Tarea[]): void {\n  lista.replaceChildren(...tareas.map(tarea => {\n    const li = document.createElement('li');\n    li.textContent = \`${'${tarea.texto}'} · ${'${tarea.prioridad}'}\`;\n    li.dataset.id = tarea.id;\n    return li;\n  }));\n}`, 
        `La lista HTML muestra cada texto con su prioridad.`,{path:'src/ui/tarea-view.ts'}),
      L('Integración','Conectar formulario, servicio y vista',
        'main.ts coordina los módulos. Lee el formulario, crea una Tarea válida, persiste el arreglo y vuelve a renderizar.',
        `import type { Tarea } from './models/tarea.js';\nimport { cargar, guardar } from './services/tarea-service.js';\nimport { renderTareas } from './ui/tarea-view.js';\n\nconst lista = document.querySelector<HTMLUListElement>('#tareas');\nconst form = document.querySelector<HTMLFormElement>('#nueva-tarea');\nlet tareas: Tarea[] = cargar();\n\nif (lista) renderTareas(lista, tareas);\n\nform?.addEventListener('submit', event => {\n  event.preventDefault();\n  const data = new FormData(form);\n  const texto = String(data.get('texto') ?? '').trim();\n  if (!texto || !lista) return;\n\n  tareas = [...tareas, { id: crypto.randomUUID(), texto, hecha: false, prioridad: 'media' }];\n  guardar(tareas);\n  renderTareas(lista, tareas);\n  form.reset();\n});`, 
        `Al enviar el formulario aparece una nueva tarea y queda guardada en localStorage.`,{path:'src/main.ts',extraGuide:[['Modificar','index.html','Crea #nueva-tarea, un input name="texto" y la lista #tareas.']]}),
      L('Build','Compilar el proyecto final sin errores',
        'La última comprobación es ejecutar tsc con strict y resolver cualquier error. El build debe generar JavaScript en dist sin usar any para silenciar problemas.',
        `npx tsc --noEmit\nnpx tsc\n\n# opcional en package.json\n# "scripts": { "check": "tsc --noEmit", "build": "tsc" }`,
        `Found 0 errors.\ndist/ generado correctamente.`,{path:'package.json',action:'Modificar',create:false,command:'npx tsc --noEmit && npx tsc',extraGuide:[['Revisar','dist/','Comprueba que el JavaScript compilado se generó a partir de los módulos TypeScript.']]})
    ]);
})();