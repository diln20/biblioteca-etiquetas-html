(()=>{
  if(window.__cssGamesSectionAdded)return;
  window.__cssGamesSectionAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const file=(path,detail)=>({path,method:'MANUAL',detail});
  const prettyCss=value=>String(value||'')
    .replace(/\s*\{\s*/g,' {\n  ')
    .replace(/;\s*/g,';\n  ')
    .replace(/\s*\}\s*/g,'\n}\n')
    .replace(/\n\s*\n/g,'\n')
    .trim();
  const Arcade=(name,key,description,focus)=>T(
    'CSS · Juego interactivo',
    name,
    description,
    'Editor CSS interactivo integrado en el panel Resultado.',
    '<iframe class="css-arcade-frame" src="css-arcade-game.html?game='+key+'&embed=1&inside=library&arcade=2" title="'+name+' editable" loading="lazy" style="display:block;width:100%;height:760px;border:0;border-radius:14px;background:#06111e"></iframe>',
    [],
    {
      kind:'Juego CSS interactivo',
      gameDescription:description,
      tip:'Escribe CSS directamente en styles.css. Compara Objetivo y Tu resultado, usa Comprobar o Ctrl + Enter y avanza cuando coincidan.',
      guideTitle:'Cómo jugar',
      guide:[
        ['1','Editor CSS','Escribe las reglas directamente dentro del juego.'],
        ['2','Objetivo vs resultado','Compara las dos vistas para detectar qué propiedad falta.'],
        ['3','Comprobar','El motor compara estilos calculados y te indica qué propiedad todavía difiere.'],
        ['4','Progreso','Los niveles superados quedan guardados en localStorage.']
      ],
      filesToCreate:[
        file('css-arcade-game.html','Pantalla común de los juegos CSS.'),
        file('css-arcade-game.css','Diseño visual de la arcade.'),
        file('css-arcade-game.js','Niveles, validación y progreso.')
      ],
      exerciseTitle:'Objetivo del juego',
      exerciseTasks:[
        'Completa todos los niveles sin mirar primero la solución.',
        'Resuelve al menos tres niveles seguidos sin usar Pista.',
        'Explica con tus palabras para qué sirve '+focus+'.',
        'Rompe intencionalmente una propiedad y usa el feedback para corregirla.',
        'Repite el boss final hasta resolverlo sin pista.'
      ],
      exerciseExtra:'Cuando termines, cambia el código de un nivel y crea una variante propia.'
    }
  );

  const G=(name,description,html,css,tip,tasks=[],extra='',index=0)=>T(
    'CSS · Juego',
    name,
    description,
    `<!-- index.html -->\n${html}\n\n/* styles.css */\n${prettyCss(css)}`,
    '<iframe class="css-arcade-frame" src="css-arcade-game.html?game=guided&level='+index+'&embed=1" title="'+name+' editable" loading="lazy" style="display:block;width:100%;height:820px;border:0;border-radius:14px;background:#06111e"></iframe>',
    [],
    {
      kind:'Juego CSS interactivo',
      guidedChallenge:true,
      gameDescription:description,
      tip,
      guideTitle:'Cómo jugar',
      codeLabel:'HTML + CSS · solución',
      filesToCreateTitle:'Archivos para practicar',
      filesToCreateStatus:'Primero intenta resolver el reto sin mirar toda la solución. Después compara tu CSS con el ejemplo de referencia.',
      guide:[
        ['1','Misión','Lee el objetivo y consulta el HTML del escenario.'],
        ['2','Editor CSS','Completa el código directamente dentro del juego.'],
        ['3','Comprobar','Valida tu respuesta y consulta la pista si hace falta.'],
        ['4','Niveles','Continúa con el siguiente reto; tu progreso queda guardado.']
      ],
      filesToCreate:[
        file('css/juegos/index.html','Estructura HTML del reto.'),
        file('css/juegos/styles.css','Tus reglas CSS para resolverlo.')
      ],
      exerciseTitle:'Misión · '+name.replace(/^Reto guiado \d+ · /,''),
      exerciseIntro:'Aplica el concepto de este reto y luego modifica una decisión para comprobar que entiendes qué propiedad produce cada efecto.',
      exerciseTasks:[...tasks,'Crea una variante del ejercicio cambiando una decisión de layout y explica qué efecto produce.'],
      exerciseExtra:extra
    }
  );

  sections.push({
    title:'CSS · Juegos y retos prácticos',
    navLabel:'Juegos CSS',
    group:'CSS',
    primaryArea:'CSS',
    areaOrder:45,
    description:'Entrena CSS con una arcade de juegos interactivos y retos progresivos. Hay 76 niveles interactivos entre Flexbox, Grid, selectores, box model, manipulación de DIVs, position y responsive, además de 34 retos guiados interactivos con editor CSS, pistas, comprobación y progreso guardado.  Cada reto parte de un objetivo visual concreto y obliga a usar selectores, modelo de caja, Flexbox, Grid, position, pseudoclases, especificidad, responsive, variables y animaciones. La meta no es memorizar propiedades: es aprender a elegir la herramienta correcta.',
    quote:'“En CSS se mejora resolviendo layouts, rompiéndolos y reparándolos.”',
    challenge:'Completa los niveles en orden. En cada uno intenta primero la misión sin copiar la solución; usa DevTools para probar reglas y solo después compara tu resultado.',
    items:[
      T(
        'CSS · Juego interactivo',
        'Flexbox Arena · juego tipo niveles',
        'Juego interactivo inspirado en la dinámica de aprender haciendo: mueve orbes hasta sus objetivos escribiendo propiedades Flexbox. Tiene 16 niveles, editor CSS en vivo, pistas, comprobación con feedback de propiedades, progreso guardado y un boss final. Se puede jugar directamente aquí, dentro de esta sección, sin salir de la biblioteca.',
        'Editor CSS interactivo integrado en el panel Resultado.',
        '<iframe class="flexbox-arena-frame" src="css-flexbox-game.html?embed=1&inside=library" title="Flexbox Arena editable" loading="eager" style="display:block;width:100%;height:760px;border:0;border-radius:14px;background:#07111f"></iframe>',
        [],
        {
          kind:'Juego CSS interactivo',
          tip:'Escribe directamente en el editor styles.css del panel Resultado. Cada cambio mueve los elementos en tiempo real; usa Comprobar o Ctrl + Enter.',
          guideTitle:'Cómo jugar',
          guide:[
            ['1','Editor dentro de Resultado','Escribe CSS en styles.css dentro del propio panel Resultado; no necesitas abrir otra página.'],
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
            'Completa los 16 niveles sin usar la solución automática.',
            'Explica qué eje modifica justify-content y cuál modifica align-items.',
            'Repite los niveles 11 a 16 hasta poder resolverlos sin pista.'
          ],
          exerciseExtra:'Después de terminar Flexbox Arena, crea un nivel propio agregando otra configuración al arreglo levels.'
        }
      ),
      Arcade(
        'Grid Forge · domina CSS Grid',
        'grid',
        'Juego editable de CSS Grid con 10 niveles. Construye columnas, filas, gaps, spans, alineación, auto-fit/minmax y elementos que ocupan varias celdas comparando tu layout con un objetivo visual.',
        'grid-template-columns, grid-column, gap y place-items'
      ),
      Arcade(
        'Selector Hunt · caza el selector correcto',
        'selectors',
        'Juego de 10 niveles para practicar selectores sin afectar elementos equivocados: clases combinadas, atributos, hijos directos, :nth-child(), hermanos adyacentes, descendientes, pseudoclases y :not().',
        'selectores de clase, atributos, combinadores y pseudoclases'
      ),
      Arcade(
        'Box Model Lab · repara la caja',
        'box',
        'Laboratorio interactivo de 10 niveles para entender width, padding, border, margin, box-sizing, max-width, overflow y box-shadow viendo cómo cambia el tamaño final de una caja.',
        'width, padding, border, margin y box-sizing'
      ),
      Arcade(
        'DIV Lab · manipulación de contenedores',
        'divs',
        'Doce ejercicios interactivos para manipular DIVs: tamaños, centrado horizontal y total, filas, columnas, Grid, DIVs anidados, wrap, position, superposición, z-index y responsive.',
        'width, height, margin, Flexbox, Grid, position, z-index y media queries'
      ),
      Arcade(
        'Position Rescue · rescata los elementos',
        'position',
        'Juego de 9 niveles para dominar relative, absolute, offsets, inset, transform y z-index colocando insignias, tarjetas y elementos flotantes.',
        'position, top, right, bottom, left, transform y z-index'
      ),
      Arcade(
        'Responsive Racer · gana en móvil',
        'responsive',
        'Juego responsive de 9 niveles con previews de distintos anchos. Practica imágenes fluidas, media queries, Grid adaptable, auto-fit/minmax, flex-wrap, display condicional y clamp().',
        'media queries, max-width, flex-wrap, Grid y clamp()'
      ),
      ...window.CSS_GUIDED_CHALLENGES.map((args,index)=>G(...args.slice(0,7),index))
    ]
  });
})();
