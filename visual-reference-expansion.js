(()=>{
  if(window.__visualReferenceExpansionAdded)return;
  window.__visualReferenceExpansionAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const code=lines=>lines.join('\n');
  const frame=(title,body,badge='Referencia visual')=>
    '<section style="font-family:system-ui;padding:16px;border:1px solid #334155;border-radius:14px;background:#07111f;color:#e5edf8">'+
      '<span style="display:inline-block;margin-bottom:8px;padding:3px 8px;border:1px solid #475569;border-radius:999px;color:#93c5fd;font-size:11px;font-weight:800">'+badge+'</span>'+
      '<strong style="display:block;margin-bottom:10px;font-size:17px;color:#f8fafc">'+title+'</strong>'+body+
    '</section>';

  const refMeta=(kind,tip)=>({
    kind,
    tip,
    guideTitle:'Cómo usar esta referencia',
    guide:[['Consultar','Referencia visual','Compara la sintaxis, el efecto y el resultado antes de aplicarlo en tu proyecto.']],
    codeLabel:'Código de referencia',
    filesToCreateTitle:'Archivos necesarios',
    filesToCreate:[],
    filesToCreateStatus:'Es una referencia visual: no necesitas crear archivos adicionales para estudiarla.'
  });

  const arraySection=sections.find(section=>section.title==='JavaScript · 8. Métodos de arreglos');
  if(arraySection&&Array.isArray(arraySection.items)&&!arraySection.items.some(item=>item.visualArrayMethod)){
    const arrayPreview=(method,before,after,mode,returns)=>{
      const modeColor=mode==='MUTA el original'?'#fb7185':'#86efac';
      return frame(
        method,
        '<div style="display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);gap:12px;align-items:center">'+
          '<code style="padding:12px;border-radius:10px;background:#111827;color:#fde68a">'+before+'</code>'+
          '<span style="font-size:24px;color:#f472b6">→</span>'+
          '<code style="padding:12px;border-radius:10px;background:#111827;color:#c4b5fd">'+after+'</code>'+
        '</div>'+
        '<p style="margin:12px 0 0"><strong style="color:'+modeColor+'">'+mode+'</strong> · devuelve '+returns+'</p>',
        'Array Methods Visualized'
      );
    };
    const A=(topic,name,description,source,preview,tip)=>T(topic,name,description,source,preview,[],{
      ...refMeta('JavaScript · Arrays visualizados',tip),
      visualArrayMethod:true
    });

    arraySection.items.push(
      A(
        'map',
        'Visual · map() transforma sin modificar',
        'map recorre todos los elementos y construye un arreglo nuevo con el valor que retorna el callback. El arreglo original conserva sus valores.',
        code([
          'const original = [1, 2, 3];',
          'const dobles = original.map(numero => numero * 2);',
          '',
          'console.log(original); // [1, 2, 3]',
          'console.log(dobles);   // [2, 4, 6]'
        ]),
        arrayPreview('map()','[1, 2, 3]','[2, 4, 6]','NO muta','un arreglo nuevo'),
        'Úsalo cuando cada elemento de entrada deba producir un elemento de salida.'
      ),
      A(
        'filter',
        'Visual · filter() selecciona sin modificar',
        'filter crea un arreglo nuevo únicamente con los elementos cuyo callback devuelve true. No elimina elementos del arreglo original.',
        code([
          'const original = [1, 2, 3, 4];',
          'const pares = original.filter(numero => numero % 2 === 0);',
          '',
          'console.log(original); // [1, 2, 3, 4]',
          'console.log(pares);    // [2, 4]'
        ]),
        arrayPreview('filter()','[1, 2, 3, 4]','[2, 4]','NO muta','un arreglo nuevo'),
        'filter puede devolver desde cero hasta todos los elementos.'
      ),
      A(
        'push',
        'Visual · push() agrega al final y modifica',
        'push agrega uno o más elementos al final del mismo arreglo. Modifica el arreglo original y devuelve la nueva longitud, no el arreglo.',
        code([
          'const tecnologias = ["HTML", "CSS"];',
          'const nuevaLongitud = tecnologias.push("JavaScript");',
          '',
          'console.log(tecnologias);   // ["HTML", "CSS", "JavaScript"]',
          'console.log(nuevaLongitud); // 3'
        ]),
        arrayPreview('push()','["HTML", "CSS"]','["HTML", "CSS", "JavaScript"]','MUTA el original','la nueva longitud'),
        'Si necesitas conservar el original, puedes crear otro arreglo con [...original, nuevoElemento].'
      ),
      A(
        'unshift',
        'Visual · unshift() agrega al inicio y modifica',
        'unshift inserta uno o más elementos al comienzo del mismo arreglo. Los índices existentes se desplazan y el método devuelve la nueva longitud.',
        code([
          'const pasos = ["CSS", "JavaScript"];',
          'const nuevaLongitud = pasos.unshift("HTML");',
          '',
          'console.log(pasos);         // ["HTML", "CSS", "JavaScript"]',
          'console.log(nuevaLongitud); // 3'
        ]),
        arrayPreview('unshift()','["CSS", "JS"]','["HTML", "CSS", "JS"]','MUTA el original','la nueva longitud'),
        'Insertar al inicio obliga a mover índices; para colecciones enormes conviene tenerlo en cuenta.'
      ),
      A(
        'pop',
        'Visual · pop() elimina el último y modifica',
        'pop quita el último elemento del arreglo original y devuelve exactamente el elemento eliminado. Si el arreglo está vacío devuelve undefined.',
        code([
          'const cola = ["A", "B", "C"];',
          'const eliminado = cola.pop();',
          '',
          'console.log(cola);      // ["A", "B"]',
          'console.log(eliminado); // "C"'
        ]),
        arrayPreview('pop()','["A", "B", "C"]','["A", "B"]','MUTA el original','el elemento eliminado'),
        'pop es útil cuando trabajas con el final de una pila.'
      ),
      A(
        'shift',
        'Visual · shift() elimina el primero y modifica',
        'shift quita el primer elemento del arreglo original, desplaza los índices restantes y devuelve el elemento eliminado.',
        code([
          'const cola = ["primero", "segundo", "tercero"];',
          'const eliminado = cola.shift();',
          '',
          'console.log(cola);      // ["segundo", "tercero"]',
          'console.log(eliminado); // "primero"'
        ]),
        arrayPreview('shift()','["A", "B", "C"]','["B", "C"]','MUTA el original','el elemento eliminado'),
        'shift trabaja en el inicio del arreglo; pop trabaja en el final.'
      ),
      A(
        'join',
        'Visual · join() convierte el arreglo en texto',
        'join une todos los elementos en un string usando el separador indicado. No cambia el arreglo original.',
        code([
          'const ruta = ["inicio", "cursos", "javascript"];',
          'const texto = ruta.join(" / ");',
          '',
          'console.log(ruta);  // ["inicio", "cursos", "javascript"]',
          'console.log(texto); // "inicio / cursos / javascript"'
        ]),
        arrayPreview('join(" / ")','["inicio", "cursos", "js"]','"inicio / cursos / js"','NO muta','un string'),
        'Si omites el separador, join usa una coma.'
      ),
      A(
        'concat',
        'Visual · concat() combina sin modificar',
        'concat devuelve un arreglo nuevo combinando el arreglo receptor con otros valores o arreglos. Los arreglos originales permanecen intactos.',
        code([
          'const frontend = ["HTML", "CSS"];',
          'const logica = ["JavaScript"];',
          'const stack = frontend.concat(logica);',
          '',
          'console.log(frontend); // ["HTML", "CSS"]',
          'console.log(stack);    // ["HTML", "CSS", "JavaScript"]'
        ]),
        arrayPreview('concat()','["HTML", "CSS"] + ["JS"]','["HTML", "CSS", "JS"]','NO muta','un arreglo nuevo'),
        'También puedes combinar arreglos con spread: [...a, ...b].'
      )
    );
  }

  const cssQuick=sections.find(section=>section.title==='CSS · Chuleta rápida');
  if(cssQuick&&!sections.some(section=>section.title==='CSS · Chuleta completa · 26 conceptos')){
    const cssRef=(name,description,source,summary,tip)=>T(
      'CSS · referencia completa',
      name,
      description,
      source,
      frame(name,'<p style="margin:0;line-height:1.55">'+summary+'</p>','CSS Cheat Sheet'),
      [],
      refMeta('Chuleta · CSS completa',tip)
    );

    const cssItems=[
      ['1. Sintaxis CSS','Una regla CSS combina un selector con un bloque de declaraciones propiedad: valor.',code(['selector {','  propiedad: valor;','}']),'selector → bloque → propiedad: valor;','Termina cada declaración con ; para mantener el código claro.'],
      ['2. Selectores','Permiten elegir elementos por etiqueta, clase, id, atributo o relación.',code(['* { box-sizing: border-box; }','.card { padding: 1rem; }','#menu { position: sticky; }','input[type="email"] { color: #0f172a; }','.card > h2 { margin: 0; }']),'* · elemento · .clase · #id · [atributo] · descendientes e hijos','Prefiere clases reutilizables para componentes.'],
      ['3. Colores','CSS acepta nombres, HEX, rgb/rgba, hsl/hsla y funciones modernas de color.',code(['.alerta {','  color: #ef4444;','  background: rgb(254 242 242);','  border-color: hsl(0 84% 60%);','}']),'named · HEX · RGB · RGBA · HSL','Elige una paleta y reutilízala mediante variables CSS.'],
      ['4. Texto','Controla alineación, decoración, transformación, espaciado y altura de línea.',code(['h1 {','  text-align: center;','  text-transform: uppercase;','  letter-spacing: .04em;','  line-height: 1.15;','}']),'text-align · text-decoration · text-transform · letter-spacing · line-height','La legibilidad importa más que llenar la página de efectos.'],
      ['5. Fuentes','Define familia tipográfica, tamaño, peso y estilo.',code(['body {','  font-family: system-ui, sans-serif;','  font-size: 16px;','  font-weight: 400;','  font-style: normal;','}']),'font-family · font-size · font-weight · font-style','Incluye una fuente de respaldo genérica como sans-serif.'],
      ['6. Unidades','Usa px para medidas puntuales, %, em/rem para escalas y vw/vh para viewport.',code(['.panel {','  width: 80%;','  padding: 1rem;','  min-height: 40vh;','  font-size: 1em;','}']),'px · % · em · rem · vw · vh','rem suele ser una buena base para espaciado y tipografía.'],
      ['7. Box model','Cada elemento tiene contenido, padding, border y margin.',code(['* { box-sizing: border-box; }','.box {','  margin: 20px;','  padding: 15px;','  border: 1px solid #cbd5e1;','}']),'contenido → padding → border → margin','border-box hace que width incluya padding y border.'],
      ['8. Tamaños','Controla ancho y alto con límites mínimos y máximos.',code(['img {','  width: 100%;','  max-width: 720px;','  height: auto;','  min-height: 120px;','}']),'width · height · min/max-width · min/max-height','Evita alturas rígidas cuando el contenido puede crecer.'],
      ['9. Display','Define cómo participa un elemento en el flujo y cómo organiza a sus hijos.',code(['.a { display: block; }','.b { display: inline; }','.c { display: inline-block; }','.fila { display: flex; }','.grid { display: grid; }','.oculto { display: none; }']),'block · inline · inline-block · flex · grid · none','Elige display según el comportamiento que necesitas, no por costumbre.'],
      ['10. Flexbox','Layout de una dimensión para alinear y distribuir elementos.',code(['.fila {','  display: flex;','  justify-content: center;','  align-items: center;','  gap: 1rem;','  flex-wrap: wrap;','}']),'eje principal + eje transversal + gap + wrap','justify-content usa el eje principal; align-items el transversal.'],
      ['11. Grid','Layout bidimensional para filas y columnas.',code(['.grid {','  display: grid;','  grid-template-columns: repeat(3, 1fr);','  gap: 1rem;','}']),'filas + columnas + fr + repeat() + minmax()','Para tarjetas responsive prueba auto-fit con minmax().'],
      ['12. Position','Controla el posicionamiento normal, relativo, absoluto, fijo o sticky.',code(['.padre { position: relative; }','.hijo {','  position: absolute;','  top: 0;','  right: 0;','  z-index: 2;','}']),'static · relative · absolute · fixed · sticky · z-index','absolute busca el ancestro posicionado más cercano.'],
      ['13. Fondos','Configura color, imagen, tamaño, posición y gradientes.',code(['.hero {','  background-color: #0f172a;','  background-image: linear-gradient(135deg,#0ea5e9,#8b5cf6);','  background-size: cover;','  background-position: center;','}']),'background-color · image · size · position · gradient','Usa suficiente contraste entre fondo y texto.'],
      ['14. Bordes','Agrega contornos y esquinas redondeadas.',code(['.card {','  border: 1px solid #334155;','  border-radius: 16px;','  outline: 0;','}']),'border · width · style · color · radius · outline','No elimines outline del foco sin reemplazarlo por un foco visible.'],
      ['15. Efectos','Sombras y opacidad añaden profundidad o jerarquía visual.',code(['.card {','  box-shadow: 0 10px 30px rgb(15 23 42 / .18);','  opacity: .95;','  text-shadow: 0 1px 2px rgb(0 0 0 / .15);','}']),'box-shadow · text-shadow · opacity','Las sombras sutiles suelen funcionar mejor que sombras muy fuertes.'],
      ['16. Imágenes','Haz imágenes responsive y controla cómo llenan su caja.',code(['img {','  max-width: 100%;','  height: auto;','  object-fit: cover;','  display: block;','}']),'max-width:100% · height:auto · object-fit','Para recortes de miniaturas combina dimensiones con object-fit: cover.'],
      ['17. Pseudoclases','Seleccionan estados o posiciones especiales de elementos.',code(['a:hover { color: #38bdf8; }','button:focus-visible { outline: 3px solid #22d3ee; }','li:first-child { font-weight: 700; }','li:nth-child(2) { opacity: .8; }']),'hover · focus · active · visited · first/last-child · nth-child','Diseña :focus-visible además de :hover para teclado.'],
      ['18. Pseudoelementos','Permiten estilizar partes virtuales como ::before, ::after y ::selection.',code(['.tag::before { content: "#"; }','p::first-letter { font-size: 2rem; }','::selection { background: #fde68a; }']),'::before · ::after · ::first-letter · ::selection','No uses contenido generado para información imprescindible.'],
      ['19. Transiciones','Suavizan el cambio entre estados compatibles.',code(['button {','  transition: transform .2s ease, background-color .2s ease;','}','button:hover { transform: translateY(-2px); }']),'propiedad + duración + timing-function','Evita transition: all en componentes complejos.'],
      ['20. Transformaciones','Mueven, escalan o rotan sin cambiar el flujo normal.',code(['.box:hover {','  transform: translateY(-4px) scale(1.03) rotate(1deg);','}']),'translate() · scale() · rotate()','Transform suele animarse de forma eficiente.'],
      ['21. Animaciones','@keyframes describe varios estados y animation los reproduce.',code(['@keyframes aparecer {','  from { opacity: 0; transform: translateY(8px); }','  to { opacity: 1; transform: none; }','}','.card { animation: aparecer .4s ease both; }']),'@keyframes + animation','Respeta prefers-reduced-motion para usuarios sensibles al movimiento.'],
      ['22. Variables CSS','Custom properties permiten reutilizar valores y construir temas.',code([':root {','  --primary: #0ea5e9;','  --radius: 14px;','}','button {','  background: var(--primary);','  border-radius: var(--radius);','}']),'--variable + var(--variable)','Centraliza colores y medidas repetidas.'],
      ['23. Funciones CSS','Funciones como calc(), min(), max(), clamp() y var() calculan valores.',code(['.panel {','  width: min(92%, 1100px);','  padding: clamp(1rem, 2vw, 2rem);','  min-height: calc(100vh - 64px);','}']),'calc() · min() · max() · clamp() · var()','clamp() es excelente para tamaños fluidos con límites.'],
      ['24. Responsive design','Media queries y layouts fluidos adaptan la interfaz al espacio disponible.',code(['.layout { grid-template-columns: 280px 1fr; }','@media (max-width: 768px) {','  .layout { grid-template-columns: 1fr; }','}']),'mobile + tablet + desktop según espacio disponible','Prefiere componentes fluidos y usa breakpoints cuando el contenido los necesite.'],
      ['25. Reset básico','Un reset pequeño elimina diferencias molestas y define box-sizing.',code(['*, *::before, *::after { box-sizing: border-box; }','body { margin: 0; }','img, picture { max-width: 100%; display: block; }','button, input, textarea { font: inherit; }']),'box-sizing + margin + medios responsive + controles heredando fuente','Usa un reset corto que entiendas; no copies cientos de reglas sin saber para qué sirven.'],
      ['26. Especificidad','Decide qué regla gana cuando varias coinciden sobre el mismo elemento.',code(['#id { color: red; }       /* mayor */','.clase { color: blue; }   /* media */','p { color: green; }       /* menor */']),'inline > #id > .clase/[atributo]/:pseudo > elemento/::pseudo','Evita competir con selectores cada vez más específicos; organiza componentes y capas.']
    ].map(item=>cssRef(...item));

    sections.push({
      title:'CSS · Chuleta completa · 26 conceptos',
      navLabel:'Chuleta CSS completa',
      group:'CSS',primaryArea:'CSS',course:'CSS',areaOrder:991,
      description:'Guía visual completa con 26 conceptos esenciales de CSS: sintaxis, selectores, colores, texto, tipografía, unidades, box model, layout, efectos, responsive, variables, funciones y especificidad.',
      quote:'“Consulta la propiedad, observa el patrón y luego aplícala en un ejemplo pequeño.”',
      items:cssItems
    });
  }

  if(!sections.some(section=>section.title==='CSS · display visual · 6 comportamientos')){
    const displayItem=(name,description,source,body,tip)=>T(
      'CSS · display',
      name,
      description,
      source,
      frame(name,body,'display en CSS'),
      [],
      refMeta('CSS · display visual',tip)
    );

    sections.push({
      title:'CSS · display visual · 6 comportamientos',
      navLabel:'display visual',
      group:'CSS',primaryArea:'CSS',course:'CSS',areaOrder:992,
      description:'Compara visualmente block, inline, inline-block, flex, grid y none para entender cuándo cada valor cambia el flujo y la distribución de los elementos.',
      quote:'“display define cómo se comporta una caja y, en Flexbox o Grid, cómo organiza a sus hijos.”',
      items:[
        displayItem(
          '1. display: block',
          'block ocupa el ancho disponible y normalmente comienza en una nueva línea. width y height se aplican de forma directa.',
          code(['.caja {','  display: block;','  width: 200px;','  min-height: 60px;','}']),
          '<div style="display:grid;gap:6px"><span style="display:block;padding:8px;background:#2563eb;border-radius:7px">Elemento 1</span><span style="display:block;padding:8px;background:#16a34a;border-radius:7px">Elemento 2</span><span style="display:block;padding:8px;background:#7c3aed;border-radius:7px">Elemento 3</span></div>',
          'Úsalo para cajas que deban comenzar en una nueva línea.'
        ),
        displayItem(
          '2. display: inline',
          'inline participa en la misma línea que el texto y ocupa solo el espacio necesario. width y height no se comportan como en block.',
          code(['.texto {','  display: inline;','  padding: 4px 8px;','}']),
          '<p style="margin:0;line-height:2.2"><span style="padding:5px 8px;background:#2563eb;border-radius:7px">Uno</span> <span style="padding:5px 8px;background:#16a34a;border-radius:7px">Dos</span> <span style="padding:5px 8px;background:#7c3aed;border-radius:7px">Tres</span></p>',
          'Es apropiado para fragmentos dentro de texto.'
        ),
        displayItem(
          '3. display: inline-block',
          'inline-block permanece en la misma línea cuando hay espacio, pero permite definir dimensiones como una caja.',
          code(['.chip {','  display: inline-block;','  width: 110px;','  padding: 10px;','}']),
          '<div><span style="display:inline-block;width:86px;padding:10px;background:#2563eb;border-radius:7px;text-align:center">1</span> <span style="display:inline-block;width:86px;padding:10px;background:#16a34a;border-radius:7px;text-align:center">2</span> <span style="display:inline-block;width:86px;padding:10px;background:#7c3aed;border-radius:7px;text-align:center">3</span></div>',
          'Úsalo para elementos en línea que también necesiten dimensiones.'
        ),
        displayItem(
          '4. display: flex',
          'flex convierte el elemento en contenedor flexible y distribuye sus hijos principalmente en una dimensión.',
          code(['.contenedor {','  display: flex;','  justify-content: center;','  align-items: center;','  gap: 10px;','}']),
          '<div style="display:flex;justify-content:center;gap:8px"><span style="padding:12px 18px;background:#f97316;border-radius:8px">1</span><span style="padding:12px 18px;background:#14b8a6;border-radius:8px">2</span><span style="padding:12px 18px;background:#8b5cf6;border-radius:8px">3</span></div>',
          'Ideal para barras, filas, columnas, centrado y distribución de espacio.'
        ),
        displayItem(
          '5. display: grid',
          'grid crea una cuadrícula bidimensional donde puedes controlar filas y columnas de forma explícita.',
          code(['.contenedor {','  display: grid;','  grid-template-columns: repeat(3, 1fr);','  gap: 10px;','}']),
          '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:7px"><span style="padding:12px;background:#2563eb;border-radius:7px;text-align:center">1</span><span style="padding:12px;background:#16a34a;border-radius:7px;text-align:center">2</span><span style="padding:12px;background:#7c3aed;border-radius:7px;text-align:center">3</span><span style="padding:12px;background:#f97316;border-radius:7px;text-align:center">4</span><span style="padding:12px;background:#eab308;border-radius:7px;text-align:center">5</span><span style="padding:12px;background:#06b6d4;border-radius:7px;text-align:center">6</span></div>',
          'Úsalo cuando filas y columnas importan al mismo tiempo.'
        ),
        displayItem(
          '6. display: none',
          'none quita el elemento del renderizado y también elimina el espacio que ocupaba en el layout.',
          code(['.oculto {','  display: none;','}']),
          '<div style="padding:18px;border:1px dashed #64748b;border-radius:10px;text-align:center;color:#94a3b8">El elemento con <code>display:none</code> no aparece y no reserva espacio.</div>',
          'No lo confundas con visibility:hidden, que oculta pero conserva el espacio.'
        )
      ]
    });
  }
})();