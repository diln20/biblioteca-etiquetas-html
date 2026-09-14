(()=>{
  if(window.__cssPseudoClassesAdded)return;
  window.__cssPseudoClassesAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const C=(name,description,css,html,tip='')=>T(
    name,
    name,
    description,
    `${html}\n\n<style>\n${css}\n</style>`,
    `<style>${css}</style>${html}`,
    [],
    {kind:'CSS · pseudoclase',tip}
  );

  sections.push({
    title:'CSS · Pseudoclases',
    description:'Repaso completo de pseudoclases para estados, enlaces, estructura y formularios. Incluye ejemplos reales de :hover, :active, :focus, :visited, :link, :first-child, :last-child, :nth-child(), :nth-of-type(), :not(), :checked y :disabled.',
    quote:'“Una pseudoclase selecciona un estado o una posición sin añadir clases extra al HTML.”',
    challenge:'Crea una lista y un formulario donde cambien estilos por hover, foco, posición, selección y estado deshabilitado.',
    group:'CSS',
    primaryArea:'CSS',
    areaOrder:35,
    items:[
      C(':hover','Aplica estilos mientras el puntero está sobre un elemento.','.demo-hover{padding:10px 16px;border:0;border-radius:8px;background:#ef4444;color:white;font-weight:800}.demo-hover:hover{background:#b91c1c;transform:translateY(-2px)}','<button class="demo-hover">Pasa el mouse</button>','Úsalo como mejora visual, pero no dependas solo de hover porque en pantallas táctiles puede no existir.'),
      C(':active','Se activa durante el instante en que el usuario presiona el elemento.','.demo-active{padding:10px 16px;border:0;border-radius:8px;background:#2563eb;color:white}.demo-active:active{transform:scale(.95);background:#1d4ed8}','<button class="demo-active">Mantén presionado</button>','Sirve para dar feedback inmediato al clic o toque.'),
      C(':focus','Selecciona el elemento que tiene el foco del teclado o de la interacción.','.demo-focus{padding:10px;border:2px solid #cbd5e1;border-radius:8px}.demo-focus:focus{border-color:#3b82f6;outline:3px solid #bfdbfe}','<label>Nombre <input class="demo-focus" placeholder="Escribe aquí"></label>','No elimines el outline sin reemplazarlo por una señal de foco visible.'),
      C(':visited','Aplica estilos a enlaces que el navegador reconoce como ya visitados.','.demo-visited:visited{color:#8b5cf6}','<a class="demo-visited" href="https://example.com">Enlace visitado</a>','Los navegadores limitan qué propiedades pueden cambiar por privacidad.'),
      C(':link','Selecciona enlaces con href que todavía no se han visitado.','.demo-link:link{color:#2563eb;text-decoration-thickness:2px}','<a class="demo-link" href="https://example.org/ruta-no-visitada">Enlace no visitado</a>','Combínalo con :visited, :hover y :focus para definir todos los estados del enlace.'),
      C(':first-child','Selecciona un elemento cuando es el primer hijo de su padre.','.lista-first li:first-child{background:#dcfce7;font-weight:800}.lista-first li{padding:7px 10px;border-radius:7px}','<ul class="lista-first"><li>Primer elemento</li><li>Segundo elemento</li><li>Tercer elemento</li></ul>','La posición se evalúa entre todos los hijos del padre.'),
      C(':last-child','Selecciona un elemento cuando es el último hijo de su padre.','.lista-last li:last-child{background:#fee2e2;font-weight:800}.lista-last li{padding:7px 10px;border-radius:7px}','<ul class="lista-last"><li>Primero</li><li>Segundo</li><li>Último elemento</li></ul>','Es útil para quitar el borde o margen del último elemento de una lista.'),
      C(':nth-child()','Selecciona por posición entre todos los hijos. Puedes usar números, odd, even o expresiones como 3n.','.lista-nth li:nth-child(2){background:#dbeafe;font-weight:800}.lista-nth li{padding:7px 10px;border-radius:7px}','<ul class="lista-nth"><li>Elemento 1</li><li>Elemento 2</li><li>Elemento 3</li></ul>','nth-child(2) significa “el segundo hijo”, no “el segundo elemento de este tipo”.'),
      C(':nth-of-type()','Selecciona por posición contando solo elementos del mismo tipo.','.demo-type p:nth-of-type(1){background:#dcfce7;font-weight:800;padding:8px;border-radius:7px}','<div class="demo-type"><h4>Título</h4><p>Primer párrafo</p><p>Segundo párrafo</p><p>Tercer párrafo</p></div>','Es útil cuando entre los hijos hay etiquetas de tipos diferentes.'),
      C(':not()','Selecciona elementos que no coinciden con el selector indicado.','.acciones-not button:not(.disabled){background:#2563eb;color:white}.acciones-not button{padding:9px 12px;border:0;border-radius:8px;margin:3px}','<div class="acciones-not"><button>Primario</button><button>Secundario</button><button class="disabled">Deshabilitado visual</button></div>','Mantén el selector dentro de :not() simple cuando no necesites una condición compleja.'),
      C(':checked','Selecciona checkbox, radio u option que estén seleccionados.','.check-demo:checked{accent-color:#2563eb}.check-wrap{display:flex;gap:8px;align-items:center}','<label class="check-wrap"><input class="check-demo" type="checkbox" checked> Acepto las condiciones</label>','Permite dar feedback visual sin JavaScript cuando el estado vive en un control nativo.'),
      C(':disabled','Selecciona controles de formulario que tienen el atributo disabled.','.disabled-demo:disabled{background:#e5e7eb;color:#9ca3af;cursor:not-allowed}.disabled-demo{padding:10px;border:1px solid #cbd5e1;border-radius:8px}','<input class="disabled-demo" value="Campo deshabilitado" disabled>','Un control disabled no puede recibir foco ni se envía con el formulario.')
    ]
  });
})();
