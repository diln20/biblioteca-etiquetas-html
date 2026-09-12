(()=>{
  if(window.__uiUxToolsSectionAdded)return;
  window.__uiUxToolsSectionAdded=true;

  const panel=html=>`<div style="font-family:system-ui;padding:16px;border:1px solid #334155;border-radius:14px;background:#0b1220;color:#e5edf8">${html}</div>`;
  const U=(topic,name,description,code,preview,tip,kind='UI/UX')=>T(topic,name,description,code,preview,[],{kind,tip});

  sections.push(
    {
      title:'UI/UX · Formularios e inputs',
      description:'Buenas prácticas para que los campos de formulario sean claros, accesibles, cómodos en móvil y fáciles de corregir cuando ocurre un error.',
      quote:'“Un buen formulario le dice al usuario dónde está, qué debe escribir y cómo corregir un problema.”',
      challenge:'Diseña un formulario de registro que tenga foco visible, mensajes de error claros, teclado apropiado en móvil y áreas táctiles cómodas.',
      items:[
        U(
          'focus-visible',
          'Foco claro',
          'El usuario debe saber en todo momento qué campo está activo. El foco no debe depender únicamente del cursor del mouse, porque también existe navegación con teclado. Usa :focus-visible para resaltar el elemento activo con suficiente contraste sin llenar toda la interfaz de bordes permanentes.',
          `label {\n  display: grid;\n  gap: 6px;\n}\n\ninput {\n  min-height: 44px;\n  padding: 0 14px;\n  border: 1px solid #475569;\n  border-radius: 10px;\n  background: #111827;\n  color: white;\n}\n\ninput:focus-visible {\n  outline: 3px solid rgba(56, 189, 248, .35);\n  border-color: #38bdf8;\n  box-shadow: 0 0 0 4px rgba(59, 130, 246, .12);\n}`,
          panel('<label>Nombre<input autofocus value="" placeholder="Escribe tu nombre" style="width:100%;box-sizing:border-box;min-height:44px;padding:0 12px;border-radius:9px;border:2px solid #38bdf8;background:#111827;color:white;box-shadow:0 0 0 4px rgba(56,189,248,.16)"></label><p style="margin:10px 0 0;color:#94a3b8">El borde azul indica claramente dónde se está escribiendo.</p>'),
          'Actividad: crea tres campos y comprueba con la tecla Tab que siempre puedas identificar cuál tiene el foco.'
        ),
        U(
          'aria-invalid',
          'Errores visibles y comprensibles',
          'Un mensaje de error debe aparecer junto al campo que lo causó, explicar qué ocurrió y orientar sobre cómo resolverlo. No uses solamente el color rojo: combina color, texto e iconografía. aria-invalid comunica el estado y aria-describedby relaciona el campo con su explicación.',
          `<label for="correo">Correo electrónico</label>\n<input\n  id="correo"\n  name="correo"\n  type="email"\n  aria-invalid="true"\n  aria-describedby="correo-error correo-ayuda"\n>\n<p id="correo-error" class="error">\n  Ingresa un correo válido.\n</p>\n<p id="correo-ayuda">\n  Ejemplo: estudiante@universidad.edu.co\n</p>\n\n<style>\ninput[aria-invalid="true"] {\n  border-color: #fb7185;\n}\n.error {\n  color: #fda4af;\n  font-weight: 600;\n}\n</style>`,
          panel('<label style="display:block;margin-bottom:7px">Correo</label><div style="position:relative"><input value="usuario@" aria-invalid="true" style="width:100%;box-sizing:border-box;min-height:44px;padding:0 42px 0 12px;border-radius:9px;border:2px solid #fb7185;background:#111827;color:white"><span style="position:absolute;right:13px;top:9px;color:#fb7185;font-size:20px">!</span></div><strong style="display:block;margin-top:7px;color:#fda4af">Ingresa un correo válido.</strong><small style="display:block;margin-top:5px;color:#94a3b8">Por ejemplo: tu@ejemplo.com</small>'),
          'Actividad: crea validaciones para nombre vacío, correo inválido y contraseña de menos de ocho caracteres. Cada error debe explicar cómo corregirlo.'
        ),
        U(
          'input type',
          'Teclado correcto en móvil',
          'El atributo type ayuda al navegador a mostrar el teclado más apropiado. email facilita escribir @, tel muestra un teclado numérico telefónico y password oculta el contenido. autocomplete también permite que el navegador sugiera datos de forma segura y reduce el esfuerzo del usuario.',
          `<label>Correo\n  <input\n    type="email"\n    name="email"\n    autocomplete="email"\n    inputmode="email"\n  >\n</label>\n\n<label>Teléfono\n  <input\n    type="tel"\n    name="telefono"\n    autocomplete="tel"\n    inputmode="tel"\n  >\n</label>\n\n<label>Contraseña\n  <input\n    type="password"\n    name="password"\n    autocomplete="new-password"\n  >\n</label>`,
          panel('<div style="display:grid;gap:12px"><label>Correo electrónico<input type="email" placeholder="tu@ejemplo.com" style="width:100%;box-sizing:border-box;min-height:44px;margin-top:5px;padding:0 12px;border-radius:9px;border:1px solid #475569;background:#111827;color:white"></label><label>Teléfono<input type="tel" placeholder="300 123 4567" style="width:100%;box-sizing:border-box;min-height:44px;margin-top:5px;padding:0 12px;border-radius:9px;border:1px solid #475569;background:#111827;color:white"></label><label>Contraseña<input type="password" placeholder="Tu contraseña" style="width:100%;box-sizing:border-box;min-height:44px;margin-top:5px;padding:0 12px;border-radius:9px;border:1px solid #475569;background:#111827;color:white"></label></div>'),
          'Actividad: abre tu formulario desde un celular y revisa qué teclado aparece para email, teléfono, número y URL.'
        ),
        U(
          'touch target',
          'Área táctil suficiente',
          'En pantallas táctiles los campos y botones necesitan una altura cómoda y separación suficiente para evitar pulsaciones accidentales. Como referencia práctica, usa controles de aproximadamente 44 px o más y deja espacio visible entre elementos relacionados.',
          `.formulario {\n  display: grid;\n  gap: 24px;\n}\n\n.formulario input,\n.formulario button {\n  min-height: 44px;\n  border-radius: 10px;\n}\n\n.formulario button {\n  padding-inline: 18px;\n  cursor: pointer;\n}`,
          panel('<div style="display:grid;gap:24px;max-width:420px"><input placeholder="Nombre" style="min-height:44px;padding:0 12px;border-radius:9px;border:1px solid #475569;background:#111827;color:white"><input placeholder="Correo" style="min-height:44px;padding:0 12px;border-radius:9px;border:1px solid #475569;background:#111827;color:white"><button style="min-height:44px;border:0;border-radius:9px;background:#3b82f6;color:white;font-weight:700">Crear cuenta</button></div>'),
          'Actividad: inspecciona el formulario con DevTools en vista móvil y verifica que controles consecutivos no queden pegados.'
        ),
        U(
          'label',
          'Etiqueta, ayuda y placeholder',
          'El placeholder no debe reemplazar la etiqueta. Una etiqueta permanece visible después de escribir; el placeholder desaparece y puede olvidarse. Utiliza el texto de ayuda para explicar formato o requisitos antes de que ocurra un error.',
          `<label for="usuario">Nombre de usuario</label>\n<input\n  id="usuario"\n  name="usuario"\n  placeholder="Ejemplo: ana.dev"\n  aria-describedby="usuario-ayuda"\n>\n<small id="usuario-ayuda">\n  Usa entre 4 y 20 caracteres.\n</small>`,
          panel('<label for="demo-usuario" style="display:block;margin-bottom:6px;font-weight:700">Nombre de usuario</label><input id="demo-usuario" placeholder="Ejemplo: ana.dev" style="width:100%;box-sizing:border-box;min-height:44px;padding:0 12px;border-radius:9px;border:1px solid #475569;background:#111827;color:white"><small style="display:block;margin-top:7px;color:#94a3b8">Usa entre 4 y 20 caracteres.</small>'),
          'Actividad: revisa un formulario que hayas creado y reemplaza placeholders que estén actuando como única etiqueta.'
        ),
        U(
          'checklist',
          'Checklist del input correcto',
          'Antes de considerar terminado un formulario, revisa cuatro puntos: error claro, foco visible, área táctil suficiente y teclado correcto. Después comprueba etiquetas, ayuda contextual, contraste, orden con Tab y mensajes comprensibles.',
          `/* Revisión rápida */\n1. ¿El campo tiene label visible?\n2. ¿El foco se reconoce fácilmente?\n3. ¿El error aparece junto al campo?\n4. ¿El error explica cómo solucionarlo?\n5. ¿El control mide ~44px o más?\n6. ¿Hay espacio entre controles?\n7. ¿type/inputmode muestran el teclado correcto?\n8. ¿autocomplete está configurado cuando aplica?\n9. ¿Se puede completar todo con teclado?\n10. ¿El contraste permite leer estados y ayudas?`,
          panel('<div style="display:grid;gap:8px"><div>✅ Error claro</div><div>✅ Foco visible</div><div>✅ Área táctil suficiente</div><div>✅ Teclado correcto</div><div>✅ Etiqueta siempre visible</div><div>✅ Ayuda y estados comprensibles</div></div>'),
          'Actividad final: usa esta lista para auditar el formulario de inicio de sesión o registro de un proyecto anterior.'
        )
      ]
    },
    {
      title:'Herramientas · Diseño web y CSS',
      description:'Recursos visuales para crear glassmorphism, gradientes, iconos animados y formas orgánicas sin perder de vista el CSS que hay detrás.',
      quote:'“Una herramienta acelera el trabajo; comprender el CSS permite adaptarlo.”',
      challenge:'Elige dos herramientas, genera un resultado y después modifica manualmente el CSS obtenido para crear una versión propia.',
      items:[
        U(
          'UI Glass',
          'UI Glass / CSS Glass',
          'UI Glass ayuda a experimentar con transparencia, desenfoque, borde y sombra para crear efectos glassmorphism. Es útil para tarjetas, overlays, paneles y modales. Conviene mantener suficiente contraste y no abusar del blur porque puede reducir legibilidad y rendimiento.',
          `.glass {\n  background: rgba(15, 23, 42, .48);\n  backdrop-filter: blur(20px);\n  -webkit-backdrop-filter: blur(20px);\n  border: 1px solid rgba(255, 255, 255, .18);\n  box-shadow: 0 18px 45px rgba(0, 0, 0, .28);\n  border-radius: 18px;\n}\n\n/* Herramienta de referencia */\n/* https://ui.glass */`,
          panel('<div style="padding:22px;border-radius:18px;background:linear-gradient(135deg,#2563eb,#14b8a6)"><div style="padding:24px;border-radius:16px;background:rgba(15,23,42,.5);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.28);box-shadow:0 16px 35px rgba(0,0,0,.25)"><strong style="font-size:20px">UI Glass</strong><p style="margin-bottom:0;color:#cbd5e1">Transparencia + blur + borde + sombra.</p></div></div>'),
          'Prueba la herramienta y luego cambia a mano opacidad, blur y border-radius hasta entender qué modifica cada propiedad.',
          'Herramienta CSS'
        ),
        U(
          'gradient',
          'Gradient Generator · Josh Comeau',
          'El generador de gradientes de Josh Comeau permite construir transiciones de color más suaves y ajustar dirección, colores y distribución. Es útil para fondos, botones, tarjetas y hero sections. Después de generar el resultado, revisa el linear-gradient para comprender ángulo y paradas de color.',
          `.hero {\n  background: linear-gradient(\n    135deg,\n    #6366f1 0%,\n    #38bdf8 48%,\n    #34d399 100%\n  );\n}\n\n/* Herramienta */\n/* https://www.joshwcomeau.com/gradient-generator/ */`,
          panel('<div style="height:150px;border-radius:16px;background:linear-gradient(135deg,#6366f1 0%,#38bdf8 48%,#34d399 100%);display:grid;place-items:center;color:#07111f;font-weight:900;font-size:24px">Gradient Generator</div>'),
          'Actividad: genera tres gradientes cambiando únicamente el ángulo y compara cómo cambia la dirección visual.',
          'Herramienta CSS'
        ),
        U(
          'Lordicon',
          'Lordicon · Iconos animados',
          'Lordicon ofrece iconos estáticos y animados que pueden utilizarse en menús, botones, estados, notificaciones y llamadas a la acción. La animación debe reforzar el significado del icono, no distraer. En proyectos web puede integrarse mediante su paquete o el código de inserción generado por la propia herramienta.',
          `# Instalación mediante npm\nnpm install @lordicon/element\n\n// JavaScript\nimport { defineElement } from "@lordicon/element";\ndefineElement();\n\n<!-- Después copia desde Lordicon el src del icono elegido -->\n<lord-icon\n  src="RUTA-DEL-ICONO.json"\n  trigger="hover"\n  style="width:48px;height:48px">\n</lord-icon>\n\n<!-- https://lordicon.com/ -->`,
          panel('<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;text-align:center"><div style="padding:16px;border:1px solid #334155;border-radius:12px">⌂<br><small>Inicio</small></div><div style="padding:16px;border:1px solid #334155;border-radius:12px">♥<br><small>Like</small></div><div style="padding:16px;border:1px solid #334155;border-radius:12px">🔔<br><small>Aviso</small></div><div style="padding:16px;border:1px solid #334155;border-radius:12px">➤<br><small>Enviar</small></div></div>'),
          'Actividad: selecciona un icono para “guardar”, otro para “eliminar” y otro para “enviar”. Decide si debe animarse al cargar, al hacer hover o únicamente al ejecutar la acción.',
          'Herramienta UI'
        ),
        U(
          'border-radius',
          'Fancy Border Radius',
          'Fancy Border Radius muestra visualmente que border-radius puede recibir ocho valores para construir formas orgánicas. Es útil para imágenes, avatares, tarjetas y elementos decorativos. La herramienta genera el CSS para copiar, pero conviene reconocer la sintaxis horizontal / vertical que produce cada curva.',
          `.forma-organica {\n  width: 260px;\n  aspect-ratio: 1;\n  background: linear-gradient(135deg,#60a5fa,#34d399);\n  border-radius:\n    60% 40% 30% 70% /\n    60% 30% 70% 40%;\n}\n\n/* Herramienta */\n/* https://9elements.github.io/fancy-border-radius/ */`,
          panel('<div style="display:grid;place-items:center;padding:20px"><div style="width:180px;aspect-ratio:1;background:linear-gradient(135deg,#60a5fa,#34d399);border-radius:60% 40% 30% 70% / 60% 30% 70% 40%;box-shadow:0 18px 45px rgba(52,211,153,.18)"></div><code style="margin-top:15px;color:#93c5fd">border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;</code></div>'),
          'Actividad: crea cuatro formas distintas para una imagen, una tarjeta, un avatar y una mancha decorativa.',
          'Herramienta CSS'
        ),
        U(
          'criterio',
          'Cómo elegir una herramienta',
          'No todas las herramientas son necesarias en todos los proyectos. Usa un generador cuando acelere una tarea repetitiva o ayude a explorar posibilidades, pero conserva control sobre accesibilidad, rendimiento, compatibilidad y mantenibilidad. Copiar CSS sin entenderlo suele producir estilos difíciles de ajustar después.',
          `Antes de usar una herramienta pregunta:\n\n1. ¿Qué problema resuelve?\n2. ¿El resultado sigue siendo legible?\n3. ¿Funciona bien en móvil?\n4. ¿Añade una dependencia innecesaria?\n5. ¿Puedo explicar el CSS generado?\n6. ¿La animación aporta significado?\n7. ¿El efecto perjudica rendimiento o accesibilidad?`,
          panel('<strong style="display:block;margin-bottom:10px;color:#67e8f9">Herramienta ≠ solución automática</strong><span>Genera → revisa → comprende → adapta → prueba.</span>'),
          'Actividad final: toma un CSS generado por una herramienta, elimina lo innecesario y documenta qué hace cada propiedad.',
          'Buenas prácticas'
        )
      ]
    }
  );

  buildNav();
  render();
})();
