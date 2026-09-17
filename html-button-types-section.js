(()=>{
  if(window.__htmlButtonTypesAdded)return;
  window.__htmlButtonTypesAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const card=(title,body,accent)=>`<section style="font-family:system-ui;padding:16px;border:1px solid ${accent};border-radius:14px;background:#07111f;color:#e5edf8"><strong style="display:block;margin-bottom:10px;color:${accent};font-size:18px">${title}</strong>${body}</section>`;
  const B=(name,description,code,preview,tip,meta={})=>T(
    'HTML · Formularios',name,description,code,preview,[],{
      kind:'HTML · Tipos de button',
      tip,
      guideTitle:'Qué debes observar',
      codeLabel:'HTML del ejemplo',
      ...meta
    }
  );

  sections.push({
    title:'HTML · Formularios · Tipos de button',
    navLabel:'Tipos de button',
    group:'HTML',
    primaryArea:'HTML',
    areaOrder:620,
    description:'Aprende la diferencia entre <button type="submit">, <button type="reset"> y <button type="button">. La elección del atributo type cambia el comportamiento del botón, especialmente cuando está dentro de un formulario.',
    quote:'“El mismo elemento <button> puede enviar, restablecer o ejecutar una acción personalizada según su type.”',
    challenge:'Crea un formulario con tres botones: uno para enviar, otro para restaurar valores y otro para mostrar una vista previa con JavaScript.',
    items:[
      B(
        '1. El atributo type define el comportamiento',
        'Un <button> puede representar acciones diferentes. type="submit" intenta enviar el formulario asociado; type="reset" restaura los controles a sus valores iniciales; type="button" no ejecuta una acción automática y normalmente se conecta con JavaScript. Dentro de un formulario, omitir type hace que el botón se comporte como submit.',
        `<form id="perfil" onsubmit="return false">\n  <input name="nombre" value="Ana">\n\n  <button type="submit">Guardar</button>\n  <button type="reset">Restablecer</button>\n  <button type="button">Vista previa</button>\n</form>`,
        card('Tres comportamientos','<div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px"><div style="padding:12px;border:1px solid #22c55e;border-radius:10px"><b>submit</b><br><small>envía</small></div><div style="padding:12px;border:1px solid #38bdf8;border-radius:10px"><b>reset</b><br><small>restaura</small></div><div style="padding:12px;border:1px solid #a855f7;border-radius:10px"><b>button</b><br><small>acción propia</small></div></div>','#38bdf8'),
        'Dentro de <form>, acostúmbrate a escribir type de forma explícita para evitar envíos accidentales.'
      ),
      B(
        '2. type="submit" · enviar el formulario',
        'submit activa el proceso normal de envío del formulario. Antes del envío, el navegador aplica validaciones HTML como required, type="email", min, max o pattern. Con JavaScript puedes escuchar el evento submit del formulario y usar event.preventDefault() cuando quieras procesar los datos sin recargar la página.',
        `<form id="registro">\n  <label>\n    Correo\n    <input name="correo" type="email" required>\n  </label>\n\n  <button type="submit">Enviar</button>\n</form>\n\n<script>\n  const form = document.querySelector("#registro");\n\n  form.addEventListener("submit", function(event) {\n    event.preventDefault();\n\n    const datos = new FormData(form);\n    console.log(datos.get("correo"));\n  });\n<\/script>`,
        '<form onsubmit="event.preventDefault();this.querySelector(\'output\').textContent=\'Formulario enviado con JavaScript ✓\'" style="display:grid;gap:10px;max-width:380px"><input type="email" required placeholder="correo@ejemplo.com" style="padding:10px"><button type="submit" style="padding:10px;border:0;border-radius:9px;background:#22c55e;color:#052e16;font-weight:800">Enviar</button><output aria-live="polite"></output></form>',
        'Escucha submit en el <form>, no solamente click en el botón. Así también funciona cuando el usuario envía con Enter.'
      ),
      B(
        '3. type="reset" · restaurar valores iniciales',
        'reset devuelve los controles del formulario a sus valores iniciales. No significa necesariamente “dejar todo vacío”: si un input empezó con value="Ana", al restablecer volverá a Ana. También existe el evento reset si necesitas reaccionar desde JavaScript.',
        `<form id="preferencias">\n  <input name="nombre" value="Ana">\n\n  <select name="tema">\n    <option>Claro</option>\n    <option selected>Oscuro</option>\n  </select>\n\n  <button type="reset">Restablecer</button>\n</form>\n\n<script>\n  const form = document.querySelector("#preferencias");\n\n  form.addEventListener("reset", function() {\n    console.log("Se restaurarán los valores iniciales");\n  });\n<\/script>`,
        '<form style="display:grid;gap:10px;max-width:380px"><input value="Ana" style="padding:10px"><select style="padding:10px"><option>Claro</option><option selected>Oscuro</option></select><button type="reset" style="padding:10px;border:0;border-radius:9px;background:#0ea5e9;color:#082f49;font-weight:800">Restablecer</button></form>',
        'Usa reset con cuidado: puede borrar cambios que el usuario ya había escrito. En formularios largos suele ser mejor pedir confirmación.'
      ),
      B(
        '4. type="button" · acción personalizada con JavaScript',
        'type="button" no envía ni restablece el formulario. Sirve para acciones como abrir un modal, mostrar una vista previa, agregar otro campo, alternar una contraseña o ejecutar cualquier comportamiento programado con JavaScript.',
        `<button id="saludar" type="button">Mostrar mensaje</button>\n<p id="mensaje"></p>\n\n<script>\n  const boton = document.querySelector("#saludar");\n  const mensaje = document.querySelector("#mensaje");\n\n  boton.addEventListener("click", function() {\n    mensaje.textContent = "Hola desde JavaScript";\n  });\n<\/script>`,
        '<div style="display:grid;gap:10px;max-width:380px"><button type="button" onclick="this.nextElementSibling.textContent=\'Hola desde JavaScript ✓\'" style="padding:10px;border:0;border-radius:9px;background:#9333ea;color:white;font-weight:800">Hacer clic</button><p style="margin:0;min-height:24px"></p></div>',
        'Si el botón está dentro de un formulario y solo ejecutará JavaScript, escribe type="button" de forma explícita.'
      ),
      B(
        '5. Error común · olvidar type dentro de un formulario',
        'El valor predeterminado de <button> dentro de un formulario es submit. Por eso un botón pensado para abrir una ayuda, añadir una fila o alternar una interfaz puede terminar enviando el formulario si no especificas type="button".',
        `<!-- Puede enviar el formulario sin querer -->\n<form>\n  <input name="nombre">\n  <button id="ayuda">Ayuda</button>\n</form>\n\n<!-- Mejor -->\n<form>\n  <input name="nombre">\n  <button id="ayuda" type="button">Ayuda</button>\n  <button type="submit">Guardar</button>\n</form>`,
        card('Regla práctica','<p style="margin:0"><code>&lt;button&gt;</code> dentro de un formulario → piensa primero si debe <b>enviar</b>. Si no, usa <code>type="button"</code>.</p>','#f59e0b'),
        'Este pequeño atributo evita muchos comportamientos inesperados cuando empiezas a combinar HTML con JavaScript.'
      ),
      B(
        '6. submitter · saber qué botón envió el formulario',
        'Un formulario puede tener varios botones submit. En el evento submit, event.submitter indica cuál de ellos inició el envío. Esto permite tener acciones como Guardar borrador y Publicar sin escuchar click por separado en cada botón.',
        `<form id="articulo">\n  <input name="titulo" required>\n\n  <button type="submit" name="accion" value="borrador">\n    Guardar borrador\n  </button>\n\n  <button type="submit" name="accion" value="publicar">\n    Publicar\n  </button>\n</form>\n\n<script>\n  const form = document.querySelector("#articulo");\n\n  form.addEventListener("submit", function(event) {\n    event.preventDefault();\n    console.log(event.submitter.value);\n  });\n<\/script>`,
        card('Dos submit, una sola lógica','<div style="display:flex;gap:10px;flex-wrap:wrap"><button type="button" style="padding:9px 14px">Guardar borrador</button><button type="button" style="padding:9px 14px;background:#22c55e;border:0;border-radius:6px">Publicar</button></div>','#22c55e'),
        'name y value del botón submit también pueden formar parte de los datos enviados al servidor.'
      ),
      B(
        '7. Atributos avanzados del botón submit',
        'Un botón submit puede sobrescribir atributos del formulario mediante formaction, formmethod, formenctype, formtarget y formnovalidate. Es útil cuando el mismo formulario necesita distintos destinos o comportamientos de envío.',
        `<form action="/guardar" method="post">\n  <input name="titulo" required>\n\n  <button type="submit">Guardar</button>\n\n  <button\n    type="submit"\n    formaction="/vista-previa"\n    formtarget="_blank"\n    formnovalidate\n  >\n    Vista previa\n  </button>\n</form>`,
        card('Un formulario, distintos envíos','<p style="margin:0"><b>Guardar</b> usa la configuración del <code>&lt;form&gt;</code>.<br><b>Vista previa</b> puede usar otra URL o saltar validación.</p>','#14b8a6'),
        'Estos atributos se aplican a botones de envío. No tienen sentido en type="button".'
      ),
      B(
        '8. Accesibilidad · usa button para acciones',
        'Para una acción interactiva, <button> suele ser mejor que un <div onclick>. El botón ya tiene semántica, puede enfocarse con teclado, responde a Enter/Espacio y comunica su función a tecnologías de asistencia. disabled desactiva el control cuando la acción no está disponible.',
        `<!-- Correcto para una acción -->\n<button id="guardar" type="button">Guardar cambios</button>\n\n<!-- Desactivado temporalmente -->\n<button type="submit" disabled>Procesando...</button>\n\n<!-- Evita esto para acciones -->\n<div onclick="guardar()">Guardar</div>`,
        card('Elemento correcto para cada intención','<p style="margin:0"><code>&lt;a&gt;</code> → navegar a otro lugar.<br><code>&lt;button&gt;</code> → ejecutar una acción.</p>','#a78bfa'),
        'No reemplaces un botón por un div solo por apariencia. CSS puede dar al <button> cualquier estilo sin perder su comportamiento accesible.',
        {
          exerciseTitle:'Ejercicio para ti · formulario con tres acciones',
          exerciseTasks:['Crea nombre y correo con required.','Agrega un submit llamado Enviar.','Agrega un reset llamado Restablecer.','Agrega un type="button" llamado Vista previa y muestra los datos con JavaScript.'],
          exerciseExtra:'Añade dos botones submit y usa event.submitter para distinguir Guardar borrador de Publicar.'
        }
      )
    ]
  });

  if(typeof buildNav==='function')buildNav();
  if(typeof render==='function')render();
})();
