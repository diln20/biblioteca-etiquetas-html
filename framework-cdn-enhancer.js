(()=>{
  if(window.__frameworkCdnEnhanced)return;
  window.__frameworkCdnEnhanced=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const addItem=(section,title,item)=>{
    if(!section||!Array.isArray(section.items))return;
    if(section.items.some(existing=>existing?.name===title))return;
    section.items.splice(1,0,item);
  };

  const meta=(kind,guide,files=[])=>({
    kind,
    tip:'Usa CDN para aprender o prototipar cuando tenga sentido; para producción conserva una versión fija y sigue la instalación recomendada por el framework.',
    guide,
    guideTitle:'Dónde se configura el CDN',
    codeLabel:'Código CDN / framework',
    filesToCreate:files,
    filesToCreateTitle:'Archivo para practicar',
    filesToCreateStatus:files.length?'Crea este archivo para probar la alternativa por CDN.':'No necesitas crear archivos adicionales para esta explicación.'
  });

  const react=sections.find(section=>section.title==='Frameworks frontend · React');
  addItem(react,'React por CDN · demo sin build',T(
    'CDN','React por CDN · demo sin build',
    'React puede cargarse desde un CDN ESM para una demostración pequeña, pero sin un transformador no puedes escribir JSX directamente. Por eso este ejemplo usa React.createElement. Para cursos y proyectos reales mantén Vite o un framework React como ruta principal.',
    '<div id="root"></div>\n\n<script type="module">\n  import React from "https://esm.sh/react@19";\n  import { createRoot } from "https://esm.sh/react-dom@19/client";\n\n  const app = React.createElement("h1", null, "Hola React CDN");\n  createRoot(document.querySelector("#root")).render(app);\n</script>',
    '<div style="font-family:system-ui"><h1 style="color:#087ea4">Hola React CDN</h1><p>Demo sin JSX ni build.</p></div>',
    [],
    meta('React',[['Modificar','index.html','Coloca #root y el script type="module" en una página HTML de práctica.'],['Comparar','Proyecto Vite','Después repite el mismo ejemplo con npm create vite para ver la diferencia entre CDN y build.']],[{path:'index.html',method:'MANUAL',detail:'Página mínima para la demo React por CDN.'}])
  ));

  const angular=sections.find(section=>section.title==='Frameworks frontend · Angular');
  addItem(angular,'Angular y CDN · qué sí y qué no',T(
    'CDN','Angular y CDN · qué sí y qué no',
    'Angular moderno no debe enseñarse como si bastara un script CDN. Su flujo normal usa Angular CLI, TypeScript, compilación y paquetes. Lo que sí puedes cargar por CDN dentro de una app Angular son recursos independientes, por ejemplo iconos o CSS de Bootstrap, siempre que no choquen con el DOM controlado por Angular.',
    'ng new mi-angular\ncd mi-angular\nng serve\n\n<!-- src/index.html: recurso externo opcional -->\n<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">',
    '<div style="font-family:system-ui"><strong style="color:#dd0031">Angular</strong><p>CLI + paquetes para Angular; CDN solo para recursos externos compatibles.</p></div>',
    [],
    meta('Angular',[['Ejecutar','Terminal · carpeta padre','Crea Angular con CLI; no reemplaces el toolchain por un script remoto.'],['Modificar','src/index.html','Si necesitas un CSS externo por CDN, enlázalo aquí o usa la configuración de estilos del workspace.']])
  ));

  const vue=sections.find(section=>section.title==='Frameworks frontend · Vue');
  addItem(vue,'Vue 3 por CDN · alternativa oficial',T(
    'CDN','Vue 3 por CDN · alternativa oficial',
    'Vue permite oficialmente trabajar sin build. La versión global expone Vue en window y resulta útil para mejorar HTML existente, integrar Vue en Django/FastAPI o crear una práctica rápida. Para Single-File Components .vue y proyectos grandes usa create-vue/Vite.',
    '<div id="app">{{ mensaje }}</div>\n\n<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>\n<script>\n  const { createApp } = Vue;\n  createApp({\n    data: () => ({ mensaje: "Hola Vue CDN" })\n  }).mount("#app");\n</script>',
    '<div style="font-family:system-ui"><h2 style="color:#42b883">Hola Vue CDN</h2><p>Sin Vite para esta práctica.</p></div>',
    [],
    meta('Vue',[['Modificar','index.html','Coloca #app, carga Vue y monta la aplicación después del contenedor.']],[{path:'index.html',method:'MANUAL',detail:'Página para practicar Vue directamente desde CDN.'}])
  ));

  const svelte=sections.find(section=>section.title==='Frameworks frontend · Svelte');
  addItem(svelte,'Svelte y CDN · primero compilar',T(
    'CDN','Svelte y CDN · primero compilar',
    'Svelte compila los componentes .svelte durante el desarrollo. Por eso un CDN no reemplaza el compilador de la misma forma que en Vue global. El resultado compilado sí puede publicarse en una CDN, y también puedes consumir librerías externas por CDN en páginas independientes.',
    'npm create vite@latest mi-svelte -- --template svelte\ncd mi-svelte\nnpm install\nnpm run build\n\n# dist/ contiene los archivos finales que puedes servir desde una CDN.',
    '<div style="font-family:system-ui"><strong style="color:#ff3e00">Svelte</strong><p>.svelte → compilación → dist/ → CDN estática</p></div>',
    [],
    meta('Svelte',[['Ejecutar','Terminal · proyecto Svelte','Compila la aplicación con npm run build.'],['Publicar','dist/','La carpeta generada contiene HTML/CSS/JS aptos para hosting o CDN estática.']])
  ));

  const intro=sections.find(section=>section.title==='Frameworks frontend · Introducción');
  addItem(intro,'CDN o npm · elegir antes de empezar',T(
    'CDN','CDN o npm · elegir antes de empezar',
    'Antes de instalar un framework comprueba si puede ejecutarse directamente en el navegador o si necesita compilación. Vue tiene una ruta CDN oficial; React puede usarse de forma limitada con módulos remotos; Angular y Svelte dependen mucho más de su toolchain. Las librerías CSS y utilidades pequeñas suelen ser las candidatas más sencillas para CDN.',
    'CDN directo:\n  Bootstrap CSS\n  Bulma\n  Vue global\n  Axios / Chart.js\n\nBuild recomendado:\n  React + JSX\n  Angular\n  Svelte\n  aplicaciones grandes',
    '<div style="font-family:system-ui"><strong>Pregunta clave:</strong><p>¿La herramienta entrega un archivo listo para el navegador o necesita compilar?</p></div>',
    [],
    meta('Framework frontend',[['Decidir','Antes de crear el proyecto','Revisa la documentación oficial: CDN para demo rápida o npm/CLI para flujo completo.']])
  ));
})();
