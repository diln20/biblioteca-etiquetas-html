(()=>{
  if(window.__htmlPythonSectionAdded)return;
  window.__htmlPythonSectionAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const escapeHtml=value=>String(value).replace(/[&<>]/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[char]));
  const visual=(title,body,color='#3776ab')=>`<section style="font-family:system-ui;border:1px solid ${color};border-radius:14px;overflow:hidden;background:#07111f;color:#e5edf8"><header style="padding:10px 14px;background:#0d1a2a;color:#ffd343;font-weight:900">Resultado · ${title}</header><div style="padding:16px;line-height:1.55">${body}</div></section>`;
  const output=(title,text,note,color='#3776ab')=>visual(title,`<pre style="margin:0 0 10px;padding:12px;border-radius:10px;background:#020817;color:#e2e8f0;white-space:pre-wrap">${escapeHtml(text)}</pre><p style="margin:0;color:#a8b4c6">${note}</p>`,color);
  const file=(path,method,detail,command='')=>({path,method,detail,command});
  const P=(topic,name,description,code,preview,meta={})=>T(topic,name,description,code,preview,[],{
    kind:'HTML + Python',
    tip:meta.tip||'Prueba estos ejemplos desde un servidor local o GitHub Pages; evita abrirlos solo con file:// cuando el navegador deba cargar módulos, runtimes o archivos externos.',
    guide:meta.guide||[],
    guideTitle:'Dónde se hace cada modificación',
    codeLabel:meta.codeLabel||'Código HTML + Python',
    filesToCreate:meta.files||[],
    filesToCreateTitle:'Archivos que se crean en esta lección',
    filesToCreateStatus:(meta.files||[]).length?'Crea los archivos indicados y conserva las rutas relativas mostradas.':'No necesitas crear archivos adicionales para esta explicación.'
  });

  sections.push({
    title:'HTML + Python · Python en el navegador',
    navLabel:'Python en HTML · PyScript y Pyodide',
    group:'HTML',primaryArea:'HTML',course:'HTML',areaOrder:1500,
    description:'Aprende qué significa realmente usar Python dentro de una página HTML. El navegador no interpreta Python de forma nativa como interpreta JavaScript; para ejecutar Python en el cliente se utiliza un runtime como Pyodide, normalmente compilado a WebAssembly, o una capa como PyScript. También se explica cuándo conviene ejecutar Python en el navegador y cuándo debe quedarse en el servidor con Django o FastAPI.',
    quote:'“HTML construye la interfaz; PyScript o Pyodide llevan un intérprete de Python al navegador.”',
    challenge:'Construye una pequeña calculadora que lea dos números desde HTML, ejecute la suma en Python, responda a un clic y muestre el resultado sin recargar la página.',
    items:[
      P(
        'concepto',
        '1. Python no se ejecuta de forma nativa en HTML',
        'Un archivo HTML puede cargar CSS, JavaScript y otros recursos, pero los navegadores no incluyen un intérprete de Python como parte estándar de la plataforma web. Para ejecutar Python del lado del cliente necesitas cargar un runtime. PyScript ofrece una experiencia de alto nivel para escribir Python en páginas web y puede usar Pyodide como intérprete. Pyodide es una distribución de Python para WebAssembly que permite ejecutar Python dentro del navegador. Otra arquitectura completamente distinta es ejecutar Python en el servidor con Django o FastAPI y enviar al navegador HTML o JSON.',
        `HTML + Python en navegador

index.html
   ↓ carga
PyScript / Pyodide
   ↓ inicia
Python en WebAssembly
   ↓ interactúa con
DOM, eventos y datos del navegador

Servidor Python es otra opción:
HTML → HTTP → Django/FastAPI → respuesta`,
        visual('Dos formas de usar Python',`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px"><div style="padding:14px;border:1px solid #3776ab;border-radius:10px"><strong style="color:#ffd343">En el navegador</strong><p>PyScript/Pyodide ejecutan Python en el cliente.</p></div><div style="padding:14px;border:1px solid #22c55e;border-radius:10px"><strong style="color:#86efac">En el servidor</strong><p>Django/FastAPI ejecutan Python y devuelven HTML o JSON.</p></div></div>`),
        {guide:[['Revisar','index.html','El HTML carga el runtime que hará posible ejecutar Python en el navegador.'],['Decidir','Arquitectura del proyecto','Antes de programar define si la lógica debe ejecutarse públicamente en el cliente o de forma privada en el servidor.']]}
      ),
      P(
        'PyScript',
        '2. Primer Python dentro de un archivo HTML con PyScript',
        'PyScript permite cargar su núcleo desde el head y después utilizar un script con type="py". La versión se fija explícitamente para que una actualización futura no cambie el comportamiento de la práctica. Dentro del script Python puedes importar display desde pyscript para presentar valores en la página. El primer arranque es más pesado que JavaScript porque el navegador debe descargar e inicializar el runtime de Python.',
        `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Python en HTML</title>
  <link rel="stylesheet"
        href="https://pyscript.net/releases/2026.7.3/core.css">
  <script type="module"
          src="https://pyscript.net/releases/2026.7.3/core.js"></script>
</head>
<body>
  <h1>Mi primer PyScript</h1>

  <script type="py">
from pyscript import display

display("Hola desde Python")
display(2 + 3)
  </script>
</body>
</html>`,
        output('PyScript mínimo','Mi primer PyScript\nHola desde Python\n5','El HTML sigue construyendo la página; el bloque type="py" es ejecutado por PyScript cuando el runtime queda disponible.'),
        {guide:[['Crear','python-html/index.html','Crea un HTML completo y carga aquí core.css y core.js de PyScript.']],files:[file('python-html/index.html','MANUAL','Página mínima que ejecuta Python con PyScript.')]}
      ),
      P(
        'main.py',
        '3. Separar el código Python en main.py',
        'Cuando el ejemplo deja de ser trivial, conviene sacar Python del HTML. El atributo src del script type="py" apunta al archivo .py. Esta separación evita mezclar demasiado marcado y lógica, permite que el editor trate main.py como Python real y facilita organizar funciones, módulos y pruebas. index.html continúa siendo el punto de entrada visual.',
        `<!-- python-html/index.html -->
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet"
        href="https://pyscript.net/releases/2026.7.3/core.css">
  <script type="module"
          src="https://pyscript.net/releases/2026.7.3/core.js"></script>
</head>
<body>
  <h1>Curso con Python</h1>
  <div id="resultado"></div>
  <script type="py" src="./main.py"></script>
</body>
</html>

# python-html/main.py
from pyscript import display

curso = "HTML + Python"
display(f"Aprendiendo {curso}", target="resultado")`,
        output('Python externo','Curso con Python\nAprendiendo HTML + Python','El navegador carga index.html y PyScript solicita main.py usando la ruta relativa ./main.py.'),
        {guide:[['Modificar','python-html/index.html','Deja en HTML la interfaz y la referencia a main.py.'],['Crear','python-html/main.py','Escribe aquí la lógica Python que ejecutará PyScript.']],files:[file('python-html/main.py','MANUAL','Código Python separado del HTML.')]}
      ),
      P(
        '@when',
        '4. Ejecutar Python cuando el usuario hace clic',
        'PyScript ofrece el decorador @when para conectar una función Python con un evento del navegador. El primer argumento es el tipo de evento, por ejemplo click, y el segundo es un selector CSS. La función recibe el evento cuando se produce. display puede dirigir el resultado a un elemento concreto mediante target y reemplazar el contenido anterior usando append=False.',
        `<!-- index.html -->
<button id="saludar">Saludar</button>
<div id="resultado"></div>
<script type="py" src="./main.py"></script>

# main.py
from pyscript import when, display

@when("click", "#saludar")
def saludar(event):
    display(
        "Hola desde un evento Python",
        target="resultado",
        append=False,
    )`,
        visual('Evento click',`<button type="button" style="padding:10px 14px;border:0;border-radius:8px;background:#3776ab;color:#fff;font-weight:800">Saludar</button><div style="margin-top:12px;padding:12px;border-radius:8px;background:#0b1728">Hola desde un evento Python</div>`),
        {guide:[['Modificar','python-html/index.html','Crea el botón #saludar y el contenedor #resultado.'],['Modificar','python-html/main.py','Importa when y display; conecta la función al clic.']]}
      ),
      P(
        'DOM',
        '5. Leer inputs y modificar el DOM desde Python',
        'Además de display, PyScript expone una API Pythonic para trabajar con el DOM mediante pyscript.web. web.page permite localizar elementos por id o selector. El valor de un input sigue siendo texto, por lo que debes convertirlo con int o float antes de calcular. Este patrón es equivalente a leer document.querySelector(...).value en JavaScript, pero escrito desde Python.',
        `<!-- index.html -->
<label>Número A <input id="a" type="number" value="5"></label>
<label>Número B <input id="b" type="number" value="7"></label>
<button id="sumar">Sumar</button>
<p id="resultado"></p>

# main.py
from pyscript import web, when

@when("click", "#sumar")
def sumar(event):
    a = float(web.page["a"].value)
    b = float(web.page["b"].value)
    web.page["resultado"].innerText = f"Resultado: {a + b}"`,
        output('Leer el DOM','Número A: 5\nNúmero B: 7\nResultado: 12.0','Python obtiene los valores del DOM, los convierte a float y escribe el resultado en el párrafo.'),
        {guide:[['Modificar','python-html/index.html','Añade los inputs #a, #b, el botón #sumar y #resultado.'],['Modificar','python-html/main.py','Usa pyscript.web para leer y actualizar elementos existentes.']]}
      ),
      P(
        'config',
        '6. Instalar paquetes con pyscript.json',
        'El navegador no tiene automáticamente todas las librerías de tu entorno local. PyScript permite declarar paquetes en un archivo de configuración. Al iniciar la aplicación, el runtime descarga los paquetes compatibles necesarios. Para producción conviene mantener la configuración versionada y entender que paquetes grandes aumentan tiempo y transferencia de la primera carga.',
        `// python-html/pyscript.json
{
  "packages": [
    "numpy"
  ]
}

<!-- index.html -->
<div id="resultado"></div>
<script type="py"
        src="./main.py"
        config="./pyscript.json"></script>

# main.py
import numpy as np
from pyscript import display

notas = np.array([4.0, 3.5, 5.0])
display(f"Promedio: {notas.mean():.2f}", target="resultado")`,
        output('Paquetes Python','Promedio: 4.17','pyscript.json declara numpy; main.py puede importarlo después de que PyScript resuelve el paquete.'),
        {guide:[['Crear','python-html/pyscript.json','Declara paquetes y archivos que la aplicación necesita.'],['Modificar','python-html/index.html','Añade config="./pyscript.json" al script type="py".'],['Modificar','python-html/main.py','Importa únicamente paquetes declarados o disponibles en el runtime.']],files:[file('python-html/pyscript.json','MANUAL','Configuración de paquetes de PyScript.')]}
      ),
      P(
        'Pyodide',
        '7. Usar Pyodide directamente sin PyScript',
        'Pyodide es una opción de nivel más bajo. Se carga pyodide.js, después loadPyodide() inicializa el runtime y runPython() evalúa código Python. Esta alternativa da control explícito desde JavaScript y ayuda a entender qué ocurre por debajo: JavaScript arranca el intérprete WebAssembly y decide cuándo ejecutar Python. Para una interfaz educativa sencilla, PyScript suele ser más cómodo; para integraciones personalizadas, Pyodide directo puede ser apropiado.',
        `<!doctype html>
<html lang="es">
<head>
  <script src="https://cdn.jsdelivr.net/pyodide/v314.0.6/full/pyodide.js"></script>
</head>
<body>
  <p id="resultado">Cargando Python...</p>

  <script>
    async function iniciar() {
      const pyodide = await loadPyodide();
      const total = pyodide.runPython("sum([10, 20, 30])");
      document.querySelector('#resultado').textContent =
        'Resultado Python: ' + total;
    }

    iniciar();
  </script>
</body>
</html>`,
        output('Pyodide directo','Resultado Python: 60','JavaScript inicializa Pyodide y recibe el valor producido por runPython().'),
        {guide:[['Crear o modificar','python-html/pyodide.html','Práctica independiente para comparar Pyodide directo con PyScript.']],files:[file('python-html/pyodide.html','MANUAL','Ejemplo mínimo de Pyodide controlado desde JavaScript.')]}
      ),
      P(
        'arquitectura',
        '8. Qué lógica sí y qué lógica no debe ir en Python del navegador',
        'Todo archivo HTML, JavaScript, Python y configuración enviado al navegador debe considerarse visible para el usuario. Nunca guardes contraseñas, claves privadas, secretos de API o credenciales de base de datos dentro de main.py pensando que Python las ocultará. Python del navegador es adecuado para aprendizaje, cálculos locales, visualización, análisis de datos, simulaciones y herramientas que pueden ejecutarse públicamente. Autenticación sensible, acceso directo a bases de datos, secretos y reglas críticas deben quedarse en un backend.',
        `NAVEGADOR
index.html
main.py
pyscript.json
→ visibles / descargables por el usuario

SERVIDOR
.env
credenciales
conexión a base de datos
reglas privadas
→ Django / FastAPI / otro backend`,
        visual('Cliente vs servidor',`<div style="display:grid;gap:10px"><div style="padding:12px;border:1px solid #38bdf8;border-radius:9px"><strong>Cliente</strong> · interfaz, cálculos públicos y visualización.</div><div style="padding:12px;border:1px solid #f87171;border-radius:9px"><strong>Servidor</strong> · secretos, base de datos, autenticación y autorización.</div></div>`),
        {guide:[['Revisar','python-html/main.py','Asume que cualquier persona puede inspeccionar este código.'],['Mantener en servidor','.env / configuración backend','Nunca copies secretos reales dentro de archivos servidos por GitHub Pages.']]}
      ),
      P(
        'proyecto',
        '9. Proyecto guiado · calculadora HTML controlada por Python',
        'Este ejercicio reúne estructura HTML, inputs, eventos y lógica Python. index.html define la interfaz. main.py lee valores cuando el usuario pulsa Calcular, valida entradas, realiza la operación y actualiza el DOM. Mantener cada responsabilidad separada permite ampliar después la calculadora con resta, multiplicación, historial o validaciones.',
        `<!-- python-html/calculadora/index.html -->
<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Calculadora PyScript</title>
  <link rel="stylesheet" href="https://pyscript.net/releases/2026.7.3/core.css">
  <script type="module" src="https://pyscript.net/releases/2026.7.3/core.js"></script>
</head>
<body>
  <main>
    <h1>Calculadora</h1>
    <input id="numero-a" type="number" value="12">
    <input id="numero-b" type="number" value="8">
    <button id="calcular">Calcular suma</button>
    <output id="resultado">Resultado: --</output>
  </main>
  <script type="py" src="./main.py"></script>
</body>
</html>

# python-html/calculadora/main.py
from pyscript import web, when

@when("click", "#calcular")
def calcular(event):
    try:
        a = float(web.page["numero-a"].value)
        b = float(web.page["numero-b"].value)
        texto = f"Resultado: {a + b:g}"
    except ValueError:
        texto = "Resultado: escribe dos números válidos"

    web.page["resultado"].innerText = texto`,
        visual('Calculadora PyScript',`<div style="display:grid;gap:10px;max-width:360px"><h3 style="margin:0;color:#ffd343">Calculadora</h3><div style="display:flex;gap:8px"><input value="12" style="width:90px;padding:8px"><input value="8" style="width:90px;padding:8px"></div><button type="button" style="padding:9px;border:0;border-radius:8px;background:#3776ab;color:#fff">Calcular suma</button><output style="padding:10px;border-radius:8px;background:#0b1728">Resultado: 20</output></div>`),
        {guide:[['Crear','python-html/calculadora/index.html','Construye aquí la interfaz HTML de la calculadora.'],['Crear','python-html/calculadora/main.py','Implementa evento, conversión, validación y cálculo.']],files:[file('python-html/calculadora/index.html','MANUAL','Interfaz del proyecto final.'),file('python-html/calculadora/main.py','MANUAL','Lógica Python del proyecto final.')]}
      ),
      P(
        'deploy',
        '10. Publicar una aplicación PyScript en GitHub Pages',
        'Una aplicación PyScript que no necesita backend puede publicarse como sitio estático: index.html, main.py, pyscript.json y demás recursos se sirven tal como están. GitHub Pages puede alojar este tipo de proyecto. Comprueba siempre las rutas relativas y espera a que el runtime termine de cargar antes de evaluar el resultado. Para producción es preferible fijar una versión concreta de PyScript en lugar de depender de latest.',
        `python-html/
├── index.html
├── main.py
├── pyscript.json        # solo si necesitas configuración
└── styles.css           # opcional

# En GitHub Pages se sirven como archivos estáticos.
# Mantén rutas como ./main.py y ./pyscript.json.
# No incluyas .env ni secretos.`,
        output('Estructura para Pages','index.html  → interfaz\nmain.py     → Python del cliente\npyscript.json → paquetes/configuración','El despliegue estático funciona siempre que todos los archivos públicos necesarios estén incluidos y las rutas sean correctas.'),
        {guide:[['Subir','Repositorio de GitHub Pages','Publica únicamente archivos que puedan ser visibles públicamente.'],['Revisar','DevTools · Network','Comprueba que core.js, main.py y pyscript.json respondan sin 404.']]}
      )
    ]
  });
})();
