(()=>{
  if(window.__scriptLoadingEnhancerAdded)return;
  window.__scriptLoadingEnhancerAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;
  const section=window.sections.find(section=>section.title==='JavaScript · 1A. Sintaxis, entrada y salida');
  if(!section||!Array.isArray(section.items))return;
  if(section.items.some(item=>String(item.name||'').includes('defer vs async')))return;

  const item=T(
    'script defer async module',
    '1B. defer vs async vs script normal vs type="module"',
    'Un <script src="app.js"> clásico encontrado en el <head> pausa el análisis del HTML mientras descarga y ejecuta el archivo; por eso puede retrasar la construcción del DOM. Con defer, el navegador descarga el archivo en paralelo mientras sigue leyendo HTML y lo ejecuta después de terminar el parseo, antes de DOMContentLoaded. Además, varios scripts defer conservan el orden en el que aparecen. async también descarga en paralelo, pero ejecuta apenas termina la descarga, sin garantizar orden entre archivos; sirve mejor para scripts independientes como analítica. Los scripts type="module" se comportan de forma diferida por defecto, admiten import/export y resuelven dependencias como módulos. defer solo tiene efecto útil en scripts externos clásicos; poner defer en un script inline clásico no aporta ese comportamiento. Si tu app consulta elementos del DOM al arrancar, defer suele ser una opción clara para un archivo externo clásico.',
    '<!-- 1. Clásico en head: bloquea el parseo -->\n<script src="legacy.js"><\/script>\n\n<!-- 2. Recomendado para app clásica -->\n<script src="app.js" defer><\/script>\n\n<!-- 3. Independiente: puede ejecutarse en cualquier orden -->\n<script src="analytics.js" async><\/script>\n\n<!-- 4. Módulo: diferido por defecto -->\n<script type="module" src="main.js"><\/script>\n\n<!-- app.js -->\nconst title = document.querySelector("#title");\ntitle.textContent = "DOM listo";',
    '<section style="font-family:system-ui;padding:16px;border:1px solid #334155;border-radius:12px;background:#07111f;color:#e5edf8"><strong style="color:#fde047">Orden mental</strong><p>normal en head → pausa HTML · defer → descarga paralela + ejecuta al final del parseo · async → descarga paralela + ejecuta al terminar · module → diferido por defecto.</p><p style="margin-bottom:0">Para una app que depende del DOM: <code>&lt;script src="app.js" defer&gt;</code>.</p></section>',
    [],
    {
      kind:'JavaScript',
      tip:'Usa defer para scripts externos clásicos que dependen del DOM y deben conservar el orden. Usa async solo cuando el script sea independiente del resto.',
      guideTitle:'Dónde se configura defer',
      guide:[
        ['Modificar','javascript/carga/index.html','Coloca defer, async o type="module" en la etiqueta script según el caso.'],
        ['Modificar','javascript/carga/app.js','Prueba una consulta al DOM que funcione porque defer espera a que el HTML haya sido parseado.'],
        ['Comprobar','Navegador · DevTools · Network','Observa que el archivo se descarga sin detener el parseo y revisa el orden de ejecución.']
      ],
      codeLabel:'HTML + JavaScript',
      filesToCreateTitle:'Archivos que crea el estudiante',
      filesToCreateStatus:'Crea los dos archivos y compara el comportamiento cambiando únicamente el atributo del script.',
      filesToCreate:[
        {path:'javascript/carga/index.html',method:'MANUAL',detail:'Contiene las variantes de carga de scripts.'},
        {path:'javascript/carga/app.js',method:'MANUAL',detail:'Consulta y modifica elementos del DOM.'}
      ],
      exerciseTitle:'Ejercicio para ti · comprueba defer',
      exerciseTasks:[
        'Crea un h1 con id="title" y carga app.js desde el head sin defer. Observa cuándo puede aparecer null.',
        'Agrega defer y comprueba que document.querySelector("#title") ya encuentra el elemento al ejecutar app.js.',
        'Crea dos scripts defer y verifica que respetan el orden del HTML.',
        'Cambia temporalmente a async y explica por qué no debes depender del orden de descarga.'
      ],
      exerciseExtra:'Prueba también type="module" y confirma que no necesitas defer para obtener comportamiento diferido.'
    }
  );

  section.items.splice(1,0,item);
})();
