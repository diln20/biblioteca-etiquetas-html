(()=>{
  if(window.__cssGamesSectionAdded)return;
  window.__cssGamesSectionAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const preview=(css,html)=>`<style>${css}</style>${html}`;
  const file=(path,detail)=>({path,method:'MANUAL',detail});
  const flexboxInlineGame=`
<div class="flexbox-inline-game" data-flexbox-inline-game>
  <div class="fx-inline-head">
    <div>
      <span class="fx-inline-counter">Nivel 1 de 12</span>
      <h3 class="fx-inline-title">Centro horizontal</h3>
    </div>
    <span class="fx-inline-score">0/12</span>
  </div>

  <div class="fx-inline-body">
    <div>
      <p class="fx-inline-instruction">Lleva los tres orbes al centro horizontal usando justify-content.</p>

      <div class="fx-inline-stage">
        <div class="fx-inline-arena fx-inline-target" aria-hidden="true"></div>
        <div class="fx-inline-arena fx-inline-player" aria-label="Resultado de tu CSS"></div>
      </div>

      <div class="fx-inline-status" aria-live="polite">
        Edita el CSS y mira el resultado en tiempo real.
      </div>

      <div class="fx-inline-actions">
        <button type="button" data-action="check">Comprobar</button>
        <button type="button" data-action="hint">Pista</button>
        <button type="button" data-action="solution">Ver solución</button>
        <button type="button" data-action="next" disabled>Siguiente →</button>
        <button type="button" data-action="reset">Reiniciar</button>
      </div>

      <div class="fx-inline-note fx-inline-hint" hidden></div>
      <div class="fx-inline-note fx-inline-solution" hidden></div>
    </div>

    <div class="fx-inline-editor-panel">
      <div class="fx-inline-editor-head">styles.css · editable</div>
      <div class="fx-inline-code">
        <code>.arena {</code>
        <code>&nbsp;&nbsp;display: flex;</code>
        <label class="sr-only" for="flexboxInlineEditor">Propiedades CSS</label>
        <textarea id="flexboxInlineEditor" class="fx-inline-editor" rows="7" spellcheck="false" placeholder="justify-content: center;"></textarea>
        <code>}</code>
      </div>
      <div class="fx-inline-help">
        <code>justify-content</code>
        <code>align-items</code>
        <code>flex-direction</code>
        <code>flex-wrap</code>
        <code>align-content</code>
      </div>
    </div>
  </div>

  <div class="fx-inline-levels" aria-label="Niveles de Flexbox"></div>

  <div class="fx-inline-footer">
    <span>Tip: Ctrl + Enter también comprueba.</span>
    <a href="css-flexbox-game.html" target="_blank" rel="noopener">Abrir grande ↗</a>
  </div>
</div>`;
  const G=(name,description,html,css,tip,tasks=[],extra='')=>T(
    'CSS · Juego',
    name,
    description,
    `<!-- index.html -->\n${html}\n\n/* styles.css */\n${css}`,
    preview(css,html),
    [],
    {
      kind:'Juego CSS',
      tip,
      guideTitle:'Cómo jugar',
      codeLabel:'Solución de referencia',
      filesToCreateTitle:'Archivos para practicar',
      filesToCreateStatus:'Primero intenta resolver el reto sin mirar toda la solución. Después compara tu CSS con el ejemplo de referencia.',
      guide:[
        ['1','index.html','Copia únicamente la estructura HTML del reto.'],
        ['2','styles.css','Intenta lograr el objetivo usando las propiedades indicadas en la misión.'],
        ['3','Navegador','Recarga y compara el resultado con la vista esperada.'],
        ['4','DevTools','Activa y desactiva reglas para entender qué propiedad produce cada cambio.']
      ],
      filesToCreate:[
        file('css/juegos/index.html','Estructura HTML del reto.'),
        file('css/juegos/styles.css','Tus reglas CSS para resolverlo.')
      ],
      exerciseTitle:'Tu misión',
      exerciseTasks:tasks,
      exerciseExtra:extra
    }
  );

  sections.push({
    title:'CSS · Juegos y retos prácticos',
    navLabel:'Juegos CSS',
    group:'CSS',
    primaryArea:'CSS',
    areaOrder:45,
    description:'Entrena CSS como si fueran niveles de un juego. Cada reto parte de un objetivo visual concreto y obliga a usar selectores, modelo de caja, Flexbox, Grid, position, pseudoclases, especificidad, responsive, variables y animaciones. La meta no es memorizar propiedades: es aprender a elegir la herramienta correcta.',
    quote:'“En CSS se mejora resolviendo layouts, rompiéndolos y reparándolos.”',
    challenge:'Completa los niveles en orden. En cada uno intenta primero la misión sin copiar la solución; usa DevTools para probar reglas y solo después compara tu resultado.',
    items:[
      T(
        'CSS · Juego interactivo',
        'Flexbox Arena · juego tipo niveles',
        'Juego interactivo inspirado en la dinámica de aprender haciendo: mueve orbes hasta sus objetivos escribiendo propiedades Flexbox. Tiene 12 niveles, editor CSS en vivo, pistas, comprobación, progreso guardado y un boss final. Se puede jugar directamente aquí, dentro de esta sección, sin salir de la biblioteca.',
        '/* Edita las propiedades directamente en el panel interactivo de esta tarjeta. */\njustify-content: center;',
        flexboxInlineGame,
        [],
        {
          kind:'Juego CSS interactivo',
          tip:'Edita el CSS directamente aquí. Cada cambio se aplica al tablero en tiempo real; usa Comprobar o Ctrl + Enter para validar.',
          guideTitle:'Cómo jugar',
          guide:[
            ['1','Editor dentro de la sección','Escribe CSS directamente en el textarea visible de esta tarjeta; no necesitas abrir otra página.'],
            ['2','Editor CSS','Escribe propiedades como justify-content, align-items o flex-direction.'],
            ['3','Comprobar','El juego valida el estilo calculado y habilita el siguiente nivel cuando coincide.'],
            ['4','Progreso','Los niveles completados se guardan en localStorage del navegador.']
          ],
          filesToCreate:[
            file('css-flexbox-game.html','Pantalla principal del juego.'),
            file('css-flexbox-game.css','Diseño visual del tablero y editor.'),
            file('css-flexbox-game.js','Niveles, validación y progreso.')
          ],
          exerciseTitle:'Objetivo del juego',
          exerciseTasks:[
            'Completa los 12 niveles sin usar la solución automática.',
            'Explica qué eje modifica justify-content y cuál modifica align-items.',
            'Repite los niveles 7 a 12 hasta poder resolverlos sin pista.'
          ],
          exerciseExtra:'Después de terminar Flexbox Arena, crea un nivel propio agregando otra configuración al arreglo levels.'
        }
      ),
      G(
        'Nivel 1 · Caza el selector correcto',
        'Solo una tarjeta debe quedar resaltada. Practica selectores por clase, descendientes y combinación de clases. El reto consiste en modificar únicamente el elemento correcto sin afectar sus hermanos.',
        '<section class="arena-selectores">\n  <article class="carta">HTML</article>\n  <article class="carta objetivo">CSS</article>\n  <article class="carta">JavaScript</article>\n</section>',
        '.arena-selectores { display:flex; gap:10px; }\n.carta { padding:16px; border:2px solid #64748b; border-radius:10px; }\n.carta.objetivo { border-color:#22c55e; background:#dcfce7; transform:translateY(-4px); }',
        'Lee el HTML antes de escribir CSS. Si una regla afecta más elementos de los necesarios, el selector es demasiado amplio.',
        ['Haz que solo la tarjeta CSS tenga fondo verde.','No uses id ni estilos inline.','Después intenta resolverlo con un selector descendiente.'],
        'Añade una cuarta tarjeta y consigue que la regla siga afectando únicamente a .objetivo.'
      ),
      G(
        'Nivel 2 · Repara la caja',
        'La tarjeta necesita espacio interior, separación exterior y un ancho predecible. Este nivel entrena box model y box-sizing.',
        '<article class="caja-reto">\n  <h3>Inventario</h3>\n  <p>3 objetos encontrados</p>\n</article>',
        '* { box-sizing:border-box; }\n.caja-reto { width:280px; margin:24px auto; padding:24px; border:4px solid #38bdf8; border-radius:16px; background:#e0f2fe; }',
        'Recuerda: margin separa la caja de otras cajas; padding separa el contenido de su borde.',
        ['Consigue un ancho final de 280px.','Deja 24px entre contenido y borde.','Centra la caja horizontalmente con margin.'],
        'Quita temporalmente box-sizing:border-box y observa cómo cambia el ancho real.'
      ),
      G(
        'Nivel 3 · Alinea la tripulación con Flexbox',
        'Debes colocar tres controles en una sola fila, separados y centrados verticalmente. Practica display:flex, justify-content, align-items y gap.',
        '<nav class="barra-juego">\n  <strong>Jugador 1</strong>\n  <div class="acciones"><button>Mapa</button><button>Inventario</button></div>\n  <span>⭐ 250</span>\n</nav>',
        '.barra-juego { display:flex; justify-content:space-between; align-items:center; gap:16px; padding:14px; background:#0f172a; color:white; border-radius:12px; }\n.acciones { display:flex; gap:8px; }',
        'Flexbox es ideal cuando el problema principal ocurre en una sola dirección: fila o columna.',
        ['Mantén jugador, acciones y puntuación en la misma fila.','Distribuye el espacio sobrante entre los grupos.','Separa los botones sin usar margin individual.'],
        'Cambia flex-direction a column y adapta la barra para pantallas pequeñas.'
      ),
      G(
        'Nivel 4 · Construye el tablero con CSS Grid',
        'Crea un tablero de seis casillas y haz que la casilla jefe ocupe dos columnas. Practica grid-template-columns, gap y grid-column.',
        '<section class="tablero-css">\n  <div>1</div><div>2</div><div>3</div>\n  <div>4</div><div class="jefe">BOSS</div>\n</section>',
        '.tablero-css { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; max-width:480px; }\n.tablero-css div { min-height:80px; display:grid; place-items:center; border-radius:12px; background:#ede9fe; font-weight:800; }\n.tablero-css .jefe { grid-column:span 2; background:#fecaca; }',
        'Grid es mejor que Flexbox cuando necesitas controlar filas y columnas al mismo tiempo.',
        ['Crea tres columnas iguales.','Mantén 10px entre casillas.','Haz que BOSS ocupe dos columnas.'],
        'Haz que la primera casilla ocupe dos filas usando grid-row.'
      ),
      G(
        'Nivel 5 · Atrapa la insignia',
        'Una etiqueta “NUEVO” debe quedar pegada a la esquina de una tarjeta sin salir disparada hacia la página. Practica relative y absolute.',
        '<article class="producto-juego">\n  <span class="insignia-juego">NUEVO</span>\n  <h3>Curso CSS</h3>\n  <p>Nivel intermedio</p>\n</article>',
        '.producto-juego { position:relative; padding:28px 18px 18px; border:1px solid #cbd5e1; border-radius:14px; }\n.insignia-juego { position:absolute; top:8px; right:8px; padding:4px 8px; border-radius:999px; background:#f97316; color:white; font-size:12px; }',
        'El elemento absolute busca el ancestro posicionado más cercano. Por eso el padre necesita position:relative.',
        ['Ubica NUEVO a 8px de arriba y derecha.','No uses márgenes para empujarlo.','Comprueba qué pasa al quitar position:relative del padre.'],
        'Añade otra insignia en la esquina inferior izquierda.'
      ),
      G(
        'Nivel 6 · Duelo de especificidad',
        'Predice qué color gana antes de abrir el navegador. Después simplifica las reglas para depender de clases y no de !important.',
        '<p id="mensaje-boss" class="mensaje-boss alerta-boss">Peligro detectado</p>',
        'p { color:#475569; }\n.mensaje-boss { color:#2563eb; }\n.alerta-boss { color:#f97316; }\n#mensaje-boss { color:#dc2626; }',
        'Cuando varias reglas coinciden, no gana “la última” siempre: primero importa la especificidad y después el orden cuando empatan.',
        ['Adivina el color final sin ejecutar el código.','Elimina el selector por id y consigue el color deseado con clases.','No uses !important.'],
        'Crea dos clases con la misma especificidad e intercambia su orden para observar la cascada.'
      ),
      G(
        'Nivel 7 · Botón con estados',
        'Haz que el botón responda visualmente a puntero, teclado y clic. Practica :hover, :focus-visible y :active.',
        '<button class="boton-mision">Completar misión</button>',
        '.boton-mision { padding:12px 18px; border:0; border-radius:10px; background:#7c3aed; color:white; font-weight:700; cursor:pointer; transition:transform .15s, background .15s; }\n.boton-mision:hover { background:#6d28d9; }\n.boton-mision:focus-visible { outline:4px solid #c4b5fd; outline-offset:3px; }\n.boton-mision:active { transform:scale(.96); }',
        'No elimines el foco sin reemplazarlo. El usuario de teclado necesita saber qué control está activo.',
        ['Cambia el color al pasar el puntero.','Muestra un foco visible con teclado.','Reduce ligeramente el botón mientras se pulsa.'],
        'Añade un estado :disabled que comunique claramente que el botón no se puede usar.'
      ),
      G(
        'Nivel 8 · Rescate responsive',
        'El panel funciona en escritorio pero debe transformarse en una columna en pantallas pequeñas. Practica unidades fluidas y @media.',
        '<section class="panel-responsive">\n  <aside>Menú</aside>\n  <main>Contenido principal</main>\n</section>',
        '.panel-responsive { display:grid; grid-template-columns:minmax(160px,220px) 1fr; gap:16px; width:min(900px,94%); margin:auto; }\n.panel-responsive > * { padding:20px; border-radius:12px; background:#e2e8f0; }\n@media (max-width:640px) { .panel-responsive { grid-template-columns:1fr; } }',
        'Responsive no significa crear otra página: significa permitir que el mismo layout cambie cuando el espacio disponible lo exige.',
        ['Usa dos columnas en escritorio.','Convierte el layout en una sola columna por debajo de 640px.','Evita anchos fijos que provoquen scroll horizontal.'],
        'Añade una tercera columna de estadísticas que desaparezca o se recolocque de forma útil en móvil.'
      ),
      G(
        'Nivel 9 · Cambia el tema con variables CSS',
        'Centraliza colores, radios y espacios para poder transformar toda la interfaz cambiando pocas variables.',
        '<article class="panel-tema">\n  <h3>Perfil</h3>\n  <button>Editar</button>\n</article>',
        ':root { --fondo-juego:#0f172a; --texto-juego:#f8fafc; --acento-juego:#22c55e; --radio-juego:16px; }\n.panel-tema { padding:22px; border-radius:var(--radio-juego); background:var(--fondo-juego); color:var(--texto-juego); }\n.panel-tema button { border:0; padding:9px 14px; border-radius:8px; background:var(--acento-juego); }',
        'Si repites el mismo color en muchas reglas, probablemente es candidato para una variable.',
        ['Define al menos cuatro variables en :root.','Usa var() en el componente.','Cambia el tema editando únicamente los valores de las variables.'],
        'Crea [data-theme="claro"] con otros valores para las mismas variables.'
      ),
      G(
        'Nivel 10 · Animación sin marear',
        'Crea una recompensa animada y añade una alternativa para usuarios que prefieren menos movimiento.',
        '<div class="recompensa-css" aria-label="Recompensa obtenida">★</div>',
        '.recompensa-css { width:72px; height:72px; display:grid; place-items:center; border-radius:50%; background:#facc15; font-size:36px; animation:recompensa 900ms ease-in-out infinite alternate; }\n@keyframes recompensa { to { transform:translateY(-10px) rotate(8deg); } }\n@media (prefers-reduced-motion:reduce) { .recompensa-css { animation:none; } }',
        'Una animación útil debe comunicar algo o mejorar la experiencia; no debería impedir leer ni interactuar.',
        ['Crea una animación con @keyframes.','Anima transform en lugar de propiedades costosas como top/left cuando sea posible.','Desactívala con prefers-reduced-motion.'],
        'Haz que la animación ocurra solo al pasar el puntero en vez de repetirse infinitamente.'
      ),
      G(
        'Boss final · HUD responsive de videojuego',
        'Combina varias habilidades en un único reto: variables, Grid, Flexbox, pseudoclases, barras de progreso y responsive. El objetivo es construir una interfaz completa sin frameworks CSS.',
        '<section class="hud-css">\n  <header><strong>CSS QUEST</strong><span>Nivel 10</span></header>\n  <div class="hud-grid">\n    <article><h3>Vida</h3><div class="barra"><span class="vida"></span></div></article>\n    <article><h3>XP</h3><div class="barra"><span class="xp"></span></div></article>\n    <article class="mision"><h3>Misión</h3><p>Construye un layout responsive.</p><button>Completar</button></article>\n  </div>\n</section>',
        ':root { --hud:#0f172a; --card:#1e293b; --text:#f8fafc; --ok:#22c55e; --xp:#38bdf8; }\n.hud-css { max-width:760px; margin:auto; padding:20px; border-radius:18px; background:var(--hud); color:var(--text); }\n.hud-css header { display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; }\n.hud-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; }\n.hud-grid article { padding:16px; border-radius:12px; background:var(--card); }\n.mision { grid-column:1 / -1; }\n.barra { height:10px; overflow:hidden; border-radius:999px; background:#334155; }\n.barra span { display:block; height:100%; }\n.vida { width:78%; background:var(--ok); }\n.xp { width:54%; background:var(--xp); }\n.mision button { padding:9px 14px; border:0; border-radius:9px; cursor:pointer; }\n.mision button:hover { transform:translateY(-2px); }\n@media (max-width:560px) { .hud-grid { grid-template-columns:1fr; } .mision { grid-column:auto; } }',
        'El boss final no introduce una propiedad nueva: comprueba si sabes combinar las herramientas anteriores para resolver un diseño completo.',
        ['Reproduce el HUD sin copiar primero la solución.','Usa Flexbox en el encabezado y Grid en las tarjetas.','Crea dos barras de progreso solo con HTML y CSS.','Adapta el diseño a móvil con @media.'],
        'Crea tu propia versión cambiando tema, espaciado y layout, pero conserva una jerarquía visual clara.'
      )
    ]
  });
})();