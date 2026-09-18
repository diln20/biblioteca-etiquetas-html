(()=>{
  if(window.__cssVisualPropertySectionsAdded)return;
  window.__cssVisualPropertySectionsAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const code=(...lines)=>lines.join('\n');
  const shell=(title,body)=>`
    <section style="font-family:system-ui;padding:18px;background:#f8fafc;color:#0f172a;min-height:220px">
      <strong style="display:block;margin-bottom:12px;color:#1d4ed8">${title}</strong>
      ${body}
    </section>`;

  const meta=(kind,tip)=>({
    kind,
    tip,
    interactiveWeb:true,
    guideTitle:'Cómo practicar este ejemplo',
    guide:[
      ['Editar','Código del ejemplo','Cambia el valor de la propiedad y observa la vista previa.'],
      ['Comparar','Vista del resultado','Prueba varios valores para reconocer qué cambia y qué permanece igual.']
    ],
    filesToCreate:[],
    filesToCreateStatus:'Puedes practicar directamente en el editor interactivo de la biblioteca.'
  });

  const C=(topic,name,description,source,preview,tip,kind)=>T(
    topic,name,description,source,preview,[],meta(kind,tip)
  );

  const overflowDemo=(value)=>code(
    '<div class="overflow-demo">',
    '  CSS ayuda a controlar qué ocurre cuando el contenido es más grande que su caja.',
    '  Esta frase es intencionalmente larga para provocar desbordamiento y poder comparar el comportamiento.',
    '</div>',
    '',
    '<style>',
    '.overflow-demo {',
    '  width: 280px;',
    '  height: 105px;',
    '  padding: 14px;',
    '  border: 3px solid #38bdf8;',
    '  border-radius: 12px;',
    '  background: #e0f2fe;',
    '  font: 16px/1.5 system-ui;',
    `  overflow: ${value};`,
    '}',
    '</style>'
  );

  sections.push({
    title:'CSS · overflow visual',
    navLabel:'overflow visual',
    group:'CSS',primaryArea:'CSS',course:'CSS',areaOrder:31,
    description:'Aprende qué ocurre cuando el contenido supera el tamaño de su contenedor. Compara visible, hidden, scroll, auto y clip con ejemplos editables.',
    quote:'“overflow decide si el contenido puede sobresalir, recortarse o desplazarse.”',
    challenge:'Cambia width, height y overflow hasta lograr una caja que mantenga el diseño sin perder acceso al contenido.',
    items:[
      C(
        'overflow: visible',
        '1. visible · deja sobresalir',
        'visible es el valor inicial de overflow. El contenido puede dibujarse fuera de la caja cuando no cabe; no crea barras de desplazamiento.',
        overflowDemo('visible'),
        shell('overflow: visible','<div style="width:260px;height:86px;padding:12px;border:3px solid #22c55e;border-radius:10px;background:#dcfce7;overflow:visible">El contenido puede sobresalir fuera de los límites de esta caja cuando es demasiado grande. Sigue siendo visible.</div>'),
        'Es útil cuando el desbordamiento no rompe el diseño, pero no es una solución para paneles con contenido variable.',
        'CSS · overflow'
      ),
      C(
        'overflow: hidden',
        '2. hidden · oculta lo que sobra',
        'hidden recorta el contenido que excede la caja y no ofrece barras de desplazamiento. El contenido sigue existiendo, pero la parte desbordada deja de verse.',
        overflowDemo('hidden'),
        shell('overflow: hidden','<div style="width:260px;height:86px;padding:12px;border:3px solid #38bdf8;border-radius:10px;background:#e0f2fe;overflow:hidden">La parte de este texto que no cabe dentro de la caja queda recortada y no aparece una barra de desplazamiento.</div>'),
        'No lo uses para esconder accidentalmente contenido que el usuario necesita leer.',
        'CSS · overflow'
      ),
      C(
        'overflow: scroll',
        '3. scroll · siempre reserva desplazamiento',
        'scroll crea un contenedor desplazable y normalmente muestra barras de scroll incluso cuando podrían no ser necesarias.',
        overflowDemo('scroll'),
        shell('overflow: scroll','<div style="width:260px;height:86px;padding:12px;border:3px solid #a855f7;border-radius:10px;background:#f3e8ff;overflow:scroll">Desplázate dentro de esta caja. Con scroll el contenedor fuerza el mecanismo de desplazamiento.</div>'),
        'Cuando solo quieres barras si hacen falta, normalmente auto produce una interfaz más limpia.',
        'CSS · overflow'
      ),
      C(
        'overflow: auto',
        '4. auto · scroll solo cuando hace falta',
        'auto permite al navegador añadir desplazamiento únicamente cuando el contenido supera las dimensiones del contenedor.',
        overflowDemo('auto'),
        shell('overflow: auto','<div style="width:260px;height:86px;padding:12px;border:3px solid #f59e0b;border-radius:10px;background:#fef3c7;overflow:auto">Si el contenido supera el espacio disponible, aparecerá desplazamiento. Si cabe, las barras no son necesarias.</div>'),
        'Es una opción habitual para paneles, tablas, menús y zonas con contenido dinámico.',
        'CSS · overflow'
      ),
      C(
        'overflow: clip',
        '5. clip · recorta sin scroll',
        'clip recorta el contenido exactamente en el borde de overflow y no crea un contenedor desplazable. A diferencia de hidden, no está pensado para desplazarse programáticamente dentro de esa caja.',
        overflowDemo('clip'),
        shell('overflow: clip','<div style="width:260px;height:86px;padding:12px;border:3px solid #ef4444;border-radius:10px;background:#fee2e2;overflow:clip">Este contenido se recorta de forma estricta en el límite de la caja y no dispone de scroll.</div>'),
        'Úsalo cuando el recorte estricto forma parte del diseño y no necesitas recuperar la zona recortada mediante scroll.',
        'CSS · overflow'
      )
    ]
  });

  const visibilityBox=(value)=>code(
    '<div class="lista-visibilidad">',
    '  <div>Elemento 1</div>',
    `  <div class="objetivo">Elemento 2 · ${value}</div>`,
    '  <div>Elemento 3</div>',
    '</div>',
    '',
    '<style>',
    '.lista-visibilidad { display:grid; gap:8px; max-width:320px; font:16px system-ui; }',
    '.lista-visibilidad > div { padding:18px; border-radius:10px; background:#dbeafe; border:1px solid #60a5fa; }',
    `.lista-visibilidad .objetivo { visibility: ${value}; }`,
    '</style>'
  );

  sections.push({
    title:'CSS · visibility visual',
    navLabel:'visibility visual',
    group:'CSS',primaryArea:'CSS',course:'CSS',areaOrder:32,
    description:'Compara visibility: visible, hidden y collapse. A diferencia de display:none, visibility:hidden oculta el elemento pero conserva el espacio que ocupaba.',
    quote:'“visibility cambia si se ve; display puede cambiar además cómo participa en el layout.”',
    challenge:'Oculta el elemento central sin mover los otros dos y después compáralo con display:none.',
    items:[
      C(
        'visibility: visible',
        '1. visible · se muestra normalmente',
        'visible hace que el elemento se pinte y ocupe su espacio normal. Es el valor inicial de visibility.',
        visibilityBox('visible'),
        shell('visibility: visible','<div style="display:grid;gap:8px"><div style="padding:14px;background:#dcfce7;border-radius:8px">Elemento 1</div><div style="padding:14px;background:#dcfce7;border-radius:8px">Elemento 2</div><div style="padding:14px;background:#dcfce7;border-radius:8px">Elemento 3</div></div>'),
        'Usa visible para restaurar un elemento que había sido ocultado con visibility.',
        'CSS · visibility'
      ),
      C(
        'visibility: hidden',
        '2. hidden · oculta y conserva espacio',
        'hidden hace invisible el elemento, pero su caja sigue participando en el layout. Por eso los elementos vecinos no ocupan automáticamente su lugar.',
        visibilityBox('hidden'),
        shell('visibility: hidden','<div style="display:grid;gap:8px"><div style="padding:14px;background:#dbeafe;border-radius:8px">Elemento 1</div><div style="min-height:48px;border:2px dashed #94a3b8;border-radius:8px;display:grid;place-items:center;color:#64748b">Espacio reservado</div><div style="padding:14px;background:#dbeafe;border-radius:8px">Elemento 3</div></div>'),
        'Si quieres que desaparezca también el espacio, compara con display:none.',
        'CSS · visibility'
      ),
      C(
        'visibility: collapse',
        '3. collapse · especialmente útil en tablas',
        'collapse tiene un comportamiento especial principalmente en filas y columnas de tablas: puede retirar su espacio del cálculo de la tabla. En otros tipos de elementos puede comportarse de forma similar a hidden según el contexto.',
        code(
          '<table class="tabla-visibilidad">',
          '  <tr><td>Fila 1</td></tr>',
          '  <tr class="fila-colapsada"><td>Fila 2</td></tr>',
          '  <tr><td>Fila 3</td></tr>',
          '</table>',
          '',
          '<style>',
          '.tabla-visibilidad { border-collapse:collapse; width:280px; font:16px system-ui; }',
          '.tabla-visibilidad td { padding:14px; border:1px solid #a855f7; }',
          '.fila-colapsada { visibility:collapse; }',
          '</style>'
        ),
        shell('visibility: collapse','<table style="border-collapse:collapse;width:100%"><tr><td style="padding:12px;border:1px solid #a855f7">Fila 1</td></tr><tr style="visibility:collapse"><td style="padding:12px;border:1px solid #a855f7">Fila 2</td></tr><tr><td style="padding:12px;border:1px solid #a855f7">Fila 3</td></tr></table>'),
        'Pruébalo con filas de una tabla para entender mejor la diferencia frente a hidden.',
        'CSS · visibility'
      )
    ]
  });

  const decorationDemo=(value)=>code(
    '<p class="texto-decorado">Texto de ejemplo</p>',
    '',
    '<style>',
    '.texto-decorado {',
    '  margin: 20px;',
    '  font: 700 34px/1.3 system-ui;',
    '  color: #0f172a;',
    `  text-decoration: ${value};`,
    '}',
    '</style>'
  );

  sections.push({
    title:'CSS · text-decoration visual',
    navLabel:'text-decoration visual',
    group:'CSS',primaryArea:'CSS',course:'CSS',areaOrder:33,
    description:'Visualiza underline, overline, line-through y none. Después combina línea, color, estilo y grosor mediante las propiedades de text-decoration.',
    quote:'“text-decoration añade líneas al texto sin modificar su contenido.”',
    challenge:'Crea un enlace cuyo subrayado cambie de color y grosor al pasar el puntero.',
    items:[
      C(
        'text-decoration: underline',
        '1. underline · línea debajo',
        'underline dibuja una línea debajo del texto. Es muy común en enlaces porque comunica visualmente que el texto es interactivo.',
        decorationDemo('underline'),
        shell('underline','<p style="margin:24px;font:700 34px system-ui;text-decoration:underline;text-decoration-thickness:3px;text-underline-offset:6px">Texto de ejemplo</p>'),
        'En enlaces, evita quitar el subrayado si no ofreces otra señal visual clara de interactividad.',
        'CSS · text-decoration'
      ),
      C(
        'text-decoration: overline',
        '2. overline · línea encima',
        'overline coloca una línea por encima de los caracteres.',
        decorationDemo('overline'),
        shell('overline','<p style="margin:24px;font:700 34px system-ui;text-decoration:overline">Texto de ejemplo</p>'),
        'Suele usarse con moderación porque no es una convención tan común como underline.',
        'CSS · text-decoration'
      ),
      C(
        'text-decoration: line-through',
        '3. line-through · texto tachado',
        'line-through atraviesa el texto con una línea. Puede representar información anulada, un precio anterior o una tarea descartada.',
        decorationDemo('line-through'),
        shell('line-through','<p style="margin:24px;font:700 34px system-ui;text-decoration:line-through;text-decoration-color:#a855f7;text-decoration-thickness:4px">Texto de ejemplo</p>'),
        'No dependas solo del tachado para transmitir información importante; acompáñalo con contexto.',
        'CSS · text-decoration'
      ),
      C(
        'text-decoration: none',
        '4. none · elimina la decoración',
        'none elimina las líneas decorativas aplicadas al texto.',
        decorationDemo('none'),
        shell('none','<p style="margin:24px;font:700 34px system-ui;text-decoration:none">Texto de ejemplo</p>'),
        'En enlaces, mantener una indicación reconocible de clic mejora la usabilidad.',
        'CSS · text-decoration'
      ),
      C(
        'text-decoration shorthand',
        '5. Personalizar color, estilo y grosor',
        'La familia text-decoration permite elegir línea, color, estilo y grosor. La forma abreviada puede combinar varios de estos valores.',
        code(
          '<a class="enlace-decorado" href="#">Documentación CSS</a>',
          '',
          '<style>',
          '.enlace-decorado {',
          '  font: 700 28px system-ui;',
          '  color: #1d4ed8;',
          '  text-decoration-line: underline;',
          '  text-decoration-color: #f43f5e;',
          '  text-decoration-style: wavy;',
          '  text-decoration-thickness: 3px;',
          '  text-underline-offset: 6px;',
          '}',
          '</style>'
        ),
        shell('Decoración personalizada','<a href="#" style="font:700 30px system-ui;color:#1d4ed8;text-decoration-line:underline;text-decoration-color:#f43f5e;text-decoration-style:wavy;text-decoration-thickness:3px;text-underline-offset:7px">Documentación CSS</a>'),
        'text-underline-offset separa el subrayado del texto y puede mejorar su legibilidad.',
        'CSS · text-decoration'
      )
    ]
  });

  const svg=encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"><defs><linearGradient id="s" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#38bdf8"/><stop offset="1" stop-color="#c4b5fd"/></linearGradient></defs><rect width="640" height="360" fill="url(#s)"/><circle cx="520" cy="85" r="48" fill="#fde68a"/><path d="M0 300L150 145l95 90 90-125 145 154 70-75 90 111v60H0z" fill="#14532d" opacity=".9"/><path d="M0 318l170-108 80 68 105-84 145 92 140-55v129H0z" fill="#166534"/></svg>');
  const imageUrl='data:image/svg+xml;charset=UTF-8,'+svg;
  const objectFitDemo=(value)=>code(
    '<div class="marco-imagen">',
    `  <img src="${imageUrl}" alt="Paisaje ilustrado">`,
    '</div>',
    '',
    '<style>',
    '.marco-imagen {',
    '  width: 320px;',
    '  height: 190px;',
    '  border: 4px solid #334155;',
    '  border-radius: 14px;',
    '  overflow: hidden;',
    '  background: #e2e8f0;',
    '}',
    '.marco-imagen img {',
    '  width: 100%;',
    '  height: 100%;',
    `  object-fit: ${value};`,
    '}',
    '</style>'
  );

  const imagePreview=value=>shell(
    'object-fit: '+value,
    `<div style="width:300px;height:170px;border:4px solid #334155;border-radius:12px;overflow:hidden;background:#e2e8f0"><img src="${imageUrl}" alt="Paisaje ilustrado" style="width:100%;height:100%;display:block;object-fit:${value}"></div>`
  );

  sections.push({
    title:'CSS · object-fit visual',
    navLabel:'object-fit visual',
    group:'CSS',primaryArea:'CSS',course:'CSS',areaOrder:34,
    description:'Aprende cómo una imagen o video se ajusta dentro de una caja con dimensiones definidas. Compara cover, contain, fill, none y scale-down.',
    quote:'“object-fit controla el encaje del contenido reemplazable dentro de su propia caja.”',
    challenge:'Construye una tarjeta de producto con imagen 16:9 y prueba cover frente a contain.',
    items:[
      C(
        'object-fit: cover',
        '1. cover · llena y puede recortar',
        'cover mantiene la proporción del recurso y llena toda la caja. Si las proporciones no coinciden, parte de la imagen queda recortada.',
        objectFitDemo('cover'),
        imagePreview('cover'),
        'Es frecuente en miniaturas, hero cards y avatares donde llenar toda la caja importa más que mostrar cada píxel.',
        'CSS · object-fit'
      ),
      C(
        'object-fit: contain',
        '2. contain · muestra todo y puede dejar espacio',
        'contain mantiene la proporción y asegura que toda la imagen quepa dentro de la caja. Pueden aparecer espacios libres.',
        objectFitDemo('contain'),
        imagePreview('contain'),
        'Úsalo para logos, capturas o productos cuando no quieres recortar información.',
        'CSS · object-fit'
      ),
      C(
        'object-fit: fill',
        '3. fill · rellena deformando si es necesario',
        'fill estira el contenido hasta ocupar exactamente el ancho y el alto definidos. No conserva necesariamente la proporción original.',
        objectFitDemo('fill'),
        imagePreview('fill'),
        'Puede deformar imágenes; úsalo solo cuando esa distorsión sea aceptable.',
        'CSS · object-fit'
      ),
      C(
        'object-fit: none',
        '4. none · conserva el tamaño intrínseco',
        'none no redimensiona el contenido para ajustarlo a la caja. Si el recurso es más grande, parte puede quedar fuera del área visible.',
        objectFitDemo('none'),
        imagePreview('none'),
        'Combínalo con object-position cuando necesites controlar qué parte del recurso queda visible.',
        'CSS · object-fit'
      ),
      C(
        'object-fit: scale-down',
        '5. scale-down · elige el resultado más pequeño',
        'scale-down compara el comportamiento de none y contain y utiliza el que produzca un tamaño de contenido menor.',
        objectFitDemo('scale-down'),
        imagePreview('scale-down'),
        'Es útil cuando quieres evitar ampliar innecesariamente un recurso pequeño.',
        'CSS · object-fit'
      )
    ]
  });
})();