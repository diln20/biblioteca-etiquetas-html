(()=>{
  if(window.__htmlInputTypesAdded)return;
  window.__htmlInputTypesAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const I=(name,description,code,preview,tip)=>T(
    'HTML · Formularios',name,description,code,preview,[],{
      kind:'HTML · Tipos de input',
      flags:['forms','semantic','accessibility'],
      tip
    }
  );

  sections.push({
    title:'HTML · Formularios · Tipos de input',
    navLabel:'Tipos de input',
    group:'HTML',
    primaryArea:'HTML',
    areaOrder:610,
    description:'Aprende los tipos de <input> de HTML, qué dato espera cada uno, qué interfaz muestra el navegador, cómo se valida y cuándo usarlo. Los ejemplos incluyen label, id y name para que el estudiante vea tanto el código como el resultado real.',
    quote:'“El type no solo cambia la apariencia: también comunica intención, activa teclados adecuados y habilita validación nativa.”',
    challenge:'Construye un formulario de registro que combine texto, correo, teléfono, fecha, selección, archivo y controles de envío; después prueba qué ocurre al enviar datos inválidos.',
    items:[
      I(
        'Qué hace el atributo type',
        'La etiqueta <input> es un control de formulario. El atributo type le dice al navegador qué clase de dato se espera. Si omites type, el navegador usa text. El tipo elegido puede cambiar el teclado móvil, la validación, el selector visual y el valor que se envía. id conecta el control con <label>; name es la clave que viaja al servidor; value es el valor inicial o el valor enviado.',
        '<form>\n  <label for="nombre">Nombre</label>\n  <input\n    id="nombre"\n    name="nombre"\n    type="text"\n    value="Ana"\n  >\n</form>',
        '<form style="display:grid;gap:8px;max-width:360px"><label for="input-demo-nombre"><strong>Nombre</strong></label><input id="input-demo-nombre" name="nombre" type="text" value="Ana" style="padding:10px;border:1px solid #94a3b8;border-radius:8px"></form>',
        'Para formularios reales, casi siempre necesitas name. Un input sin name puede verse y funcionar en pantalla, pero su valor no se envía como campo normal del formulario.'
      ),
      I(
        'text, search y password',
        'type="text" sirve para texto general de una sola línea. type="search" también recibe texto, pero comunica que el campo es de búsqueda y algunos navegadores añaden controles para limpiar el contenido. type="password" oculta visualmente los caracteres, pero no cifra el dato: la seguridad real depende de usar HTTPS y tratar la contraseña correctamente en el servidor.',
        '<label for="usuario">Usuario</label>\n<input id="usuario" name="usuario" type="text" placeholder="ana">\n\n<label for="buscar">Buscar</label>\n<input id="buscar" name="q" type="search" placeholder="Buscar tema">\n\n<label for="clave">Contraseña</label>\n<input id="clave" name="clave" type="password" autocomplete="current-password">',
        '<div style="display:grid;gap:12px;max-width:380px"><label for="input-demo-text">Usuario</label><input id="input-demo-text" type="text" placeholder="ana"><label for="input-demo-search">Buscar</label><input id="input-demo-search" type="search" placeholder="Buscar tema"><label for="input-demo-password">Contraseña</label><input id="input-demo-password" type="password" value="secreto"></div>',
        'Usa autocomplete="username", "current-password" o "new-password" cuando corresponda. Facilita el uso de gestores de contraseñas.'
      ),
      I(
        'email, tel y url',
        'Estos tipos representan datos con significado específico. email valida una estructura básica de correo al enviar el formulario. tel está pensado para teléfonos y suele mostrar un teclado numérico en móviles, pero no valida por sí solo un formato internacional. url espera una dirección web válida. Puedes combinar required, multiple o pattern según el caso.',
        '<label for="correo">Correo</label>\n<input id="correo" name="correo" type="email" required>\n\n<label for="telefono">Teléfono</label>\n<input id="telefono" name="telefono" type="tel" autocomplete="tel" placeholder="+57 300 123 4567">\n\n<label for="sitio">Sitio web</label>\n<input id="sitio" name="sitio" type="url" placeholder="https://ejemplo.com">',
        '<div style="display:grid;gap:12px;max-width:420px"><label for="input-demo-email">Correo</label><input id="input-demo-email" type="email" placeholder="ana@ejemplo.com" required><label for="input-demo-tel">Teléfono</label><input id="input-demo-tel" type="tel" placeholder="+57 300 123 4567"><label for="input-demo-url">Sitio web</label><input id="input-demo-url" type="url" placeholder="https://ejemplo.com"></div>',
        'type="tel" no garantiza que el número sea correcto. Si necesitas reglas estrictas, valida también en el servidor.'
      ),
      I(
        'number y range',
        'type="number" permite introducir números y admite min, max y step. El navegador puede impedir valores fuera de rango durante la validación. type="range" representa un valor numérico mediante un deslizador: es útil cuando importa más elegir dentro de un rango que escribir una cifra exacta. El valor sigue enviándose como texto y el servidor debe convertirlo al tipo numérico que necesite.',
        '<label for="edad">Edad</label>\n<input id="edad" name="edad" type="number" min="0" max="120" step="1" value="25">\n\n<label for="nivel">Nivel: 50</label>\n<input id="nivel" name="nivel" type="range" min="0" max="100" step="10" value="50">',
        '<div style="display:grid;gap:12px;max-width:400px"><label for="input-demo-number">Edad</label><input id="input-demo-number" type="number" min="0" max="120" step="1" value="25"><label for="input-demo-range">Nivel</label><input id="input-demo-range" type="range" min="0" max="100" step="10" value="50"></div>',
        'No uses type="number" para datos que parecen números pero no se calculan, como documentos, códigos postales o números de teléfono.'
      ),
      I(
        'date, time y datetime-local',
        'Los controles de fecha y hora permiten seleccionar valores estructurados sin construir un calendario manual. date devuelve una fecha como AAAA-MM-DD; time representa una hora; datetime-local combina fecha y hora sin zona horaria. La apariencia del selector depende del navegador y del sistema operativo. min, max y step también pueden limitar valores.',
        '<label for="fecha">Fecha</label>\n<input id="fecha" name="fecha" type="date">\n\n<label for="hora">Hora</label>\n<input id="hora" name="hora" type="time">\n\n<label for="cita">Fecha y hora</label>\n<input id="cita" name="cita" type="datetime-local">',
        '<div style="display:grid;gap:12px;max-width:420px"><label for="input-demo-date">Fecha</label><input id="input-demo-date" type="date"><label for="input-demo-time">Hora</label><input id="input-demo-time" type="time"><label for="input-demo-datetime">Fecha y hora</label><input id="input-demo-datetime" type="datetime-local"></div>',
        'datetime-local no incluye zona horaria. Si la aplicación trabaja con usuarios en varios países, define cómo interpretar y almacenar esa hora en el backend.'
      ),
      I(
        'month y week',
        'type="month" sirve para escoger mes y año sin seleccionar un día. type="week" representa una semana concreta del año. Son útiles para reportes, periodos de facturación o planificación. El control visual puede variar entre navegadores, por lo que siempre debes pensar también en validación del lado del servidor.',
        '<label for="periodo">Mes de facturación</label>\n<input id="periodo" name="periodo" type="month">\n\n<label for="semana">Semana de entrega</label>\n<input id="semana" name="semana" type="week">',
        '<div style="display:grid;gap:12px;max-width:420px"><label for="input-demo-month">Mes de facturación</label><input id="input-demo-month" type="month"><label for="input-demo-week">Semana de entrega</label><input id="input-demo-week" type="week"></div>',
        'No dependas de la apariencia exacta del selector. HTML define el tipo de dato; cada navegador decide cómo dibujar el control.'
      ),
      I(
        'checkbox y radio',
        'checkbox representa opciones independientes: pueden marcarse varias. radio representa una sola elección dentro de un grupo; para formar el grupo, todos los radios deben compartir el mismo name. En ambos casos value es el valor que se envía si el control está seleccionado. checked marca una opción inicialmente.',
        '<fieldset>\n  <legend>Tecnologías</legend>\n  <label><input type="checkbox" name="tecnologias" value="html" checked> HTML</label>\n  <label><input type="checkbox" name="tecnologias" value="css"> CSS</label>\n</fieldset>\n\n<fieldset>\n  <legend>Nivel</legend>\n  <label><input type="radio" name="nivel" value="basico" checked> Básico</label>\n  <label><input type="radio" name="nivel" value="intermedio"> Intermedio</label>\n</fieldset>',
        '<div style="display:grid;gap:14px"><fieldset><legend>Tecnologías</legend><label><input type="checkbox" checked> HTML</label> <label><input type="checkbox"> CSS</label></fieldset><fieldset><legend>Nivel</legend><label><input type="radio" name="input-demo-level" checked> Básico</label> <label><input type="radio" name="input-demo-level"> Intermedio</label></fieldset></div>',
        'Un checkbox desmarcado normalmente no envía su name. El servidor debe manejar el caso en el que la clave no llegue.'
      ),
      I(
        'color, file y hidden',
        'type="color" abre un selector de color y normalmente produce un valor hexadecimal. type="file" permite elegir archivos; accept orienta al navegador sobre tipos permitidos y multiple permite seleccionar varios. Cuando realmente envías archivos, el formulario debe usar enctype="multipart/form-data". type="hidden" envía un valor sin mostrar control visual, pero el usuario puede modificarlo desde DevTools: nunca lo uses para guardar secretos o confiar en permisos.',
        '<form enctype="multipart/form-data">\n  <label for="color">Color favorito</label>\n  <input id="color" name="color" type="color" value="#22c55e">\n\n  <label for="foto">Foto</label>\n  <input id="foto" name="foto" type="file" accept="image/*">\n\n  <input name="origen" type="hidden" value="curso-html">\n</form>',
        '<div style="display:grid;gap:12px;max-width:440px"><label for="input-demo-color">Color favorito</label><input id="input-demo-color" type="color" value="#22c55e"><label for="input-demo-file">Foto</label><input id="input-demo-file" type="file" accept="image/*"><input type="hidden" value="curso-html"><small>El input hidden existe en el formulario, pero no se dibuja.</small></div>',
        'accept mejora la selección de archivos, pero no sustituye la validación del archivo en el servidor.'
      ),
      I(
        'submit, reset, button e image',
        'Los input también pueden comportarse como botones. submit envía el formulario; reset restaura los valores iniciales; button no hace nada por sí solo y normalmente se controla con JavaScript; image funciona como un botón submit dibujado con una imagen y además envía las coordenadas del clic. En interfaces modernas suele preferirse <button> porque permite contenido más flexible.',
        '<form>\n  <input type="text" name="nombre" value="Ana">\n  <input type="submit" value="Guardar">\n  <input type="reset" value="Restablecer">\n  <input type="button" value="Vista previa">\n  <input\n    type="image"\n    alt="Enviar formulario"\n    src="boton-enviar.png"\n  >\n</form>',
        '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><input type="text" value="Ana"><input type="submit" value="Guardar"><input type="reset" value="Restablecer"><input type="button" value="Vista previa"><span style="padding:8px 12px;border:1px dashed #94a3b8;border-radius:8px">type=image → botón gráfico</span></div>',
        'Evita reset salvo que exista una razón clara: puede borrar por accidente un formulario largo que el usuario ya había completado.'
      ),
      I(
        'Atributos que completan cualquier input',
        'El tipo del input define la clase principal de dato, pero los atributos afinan su comportamiento. required obliga a proporcionar un valor; placeholder muestra una pista temporal; autocomplete ayuda al navegador a completar datos; min, max y step limitan números o fechas; minlength y maxlength limitan longitud; pattern define una expresión regular; readonly permite enviar un valor que no se puede editar; disabled impide interacción y normalmente no envía el dato; multiple permite varios valores donde el tipo lo soporta; inputmode sugiere un teclado móvil sin cambiar la semántica del campo.',
        '<label for="codigo">Código de 4 dígitos</label>\n<input\n  id="codigo"\n  name="codigo"\n  type="text"\n  inputmode="numeric"\n  pattern="[0-9]{4}"\n  minlength="4"\n  maxlength="4"\n  required\n  autocomplete="one-time-code"\n  placeholder="1234"\n>',
        '<form style="display:grid;gap:8px;max-width:360px"><label for="input-demo-code">Código de 4 dígitos</label><input id="input-demo-code" type="text" inputmode="numeric" pattern="[0-9]{4}" minlength="4" maxlength="4" required placeholder="1234"><small>Prueba escribir menos o más de 4 dígitos y enviar el formulario.</small><button type="submit">Validar</button></form>',
        'placeholder no reemplaza a label. La pista desaparece cuando el usuario escribe; el nombre del campo debe seguir visible.'
      ),
      I(
        'Ejercicio: formulario completo con varios tipos',
        'Combina los controles anteriores en un formulario realista. Observa que cada input tiene label, id y name. required aplica validación nativa; radio comparte name; file prepara una carga de archivo; checkbox representa una aceptación independiente. El navegador puede validar parte del formulario, pero el servidor siempre debe volver a validar los datos recibidos.',
        '<form action="/registro" method="post" enctype="multipart/form-data">\n  <label for="reg-nombre">Nombre</label>\n  <input id="reg-nombre" name="nombre" type="text" required autocomplete="name">\n\n  <label for="reg-correo">Correo</label>\n  <input id="reg-correo" name="correo" type="email" required autocomplete="email">\n\n  <label for="reg-telefono">Teléfono</label>\n  <input id="reg-telefono" name="telefono" type="tel" autocomplete="tel">\n\n  <label for="reg-fecha">Fecha de nacimiento</label>\n  <input id="reg-fecha" name="fecha_nacimiento" type="date">\n\n  <fieldset>\n    <legend>Nivel</legend>\n    <label><input type="radio" name="nivel" value="basico" checked> Básico</label>\n    <label><input type="radio" name="nivel" value="intermedio"> Intermedio</label>\n  </fieldset>\n\n  <label for="reg-avatar">Avatar</label>\n  <input id="reg-avatar" name="avatar" type="file" accept="image/*">\n\n  <label>\n    <input name="terminos" type="checkbox" required>\n    Acepto los términos\n  </label>\n\n  <button type="submit">Crear cuenta</button>\n</form>',
        '<form style="display:grid;gap:10px;max-width:460px"><label for="input-demo-reg-name">Nombre</label><input id="input-demo-reg-name" type="text" required><label for="input-demo-reg-email">Correo</label><input id="input-demo-reg-email" type="email" required><label for="input-demo-reg-tel">Teléfono</label><input id="input-demo-reg-tel" type="tel"><label for="input-demo-reg-date">Fecha de nacimiento</label><input id="input-demo-reg-date" type="date"><fieldset><legend>Nivel</legend><label><input type="radio" name="input-demo-reg-level" checked> Básico</label> <label><input type="radio" name="input-demo-reg-level"> Intermedio</label></fieldset><label for="input-demo-reg-file">Avatar</label><input id="input-demo-reg-file" type="file" accept="image/*"><label><input type="checkbox" required> Acepto los términos</label><button type="submit">Crear cuenta</button></form>',
        'Prueba primero enviar el formulario vacío. Después escribe un correo incorrecto y observa qué validaciones realiza el navegador antes de que exista código JavaScript.'
      )
    ]
  });

  if(typeof buildNav==='function')buildNav();
  if(typeof render==='function')render();
})();
