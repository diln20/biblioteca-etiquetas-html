(()=>{
  if(window.__modernFrontendToolsAdded)return;
  window.__modernFrontendToolsAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const result=(title,body,color='#2563eb')=>`<section style="font-family:system-ui;border:1px solid #cbd5e1;border-radius:14px;overflow:hidden;background:#fff;color:#0f172a"><header style="padding:10px 14px;background:${color};color:#fff;font-weight:900">Resultado · ${title}</header><div style="padding:16px;line-height:1.55">${body}</div></section>`;
  const codeResult=(title,lines,color='#2563eb')=>result(title,`<pre style="margin:0;padding:14px;border-radius:10px;background:#0f172a;color:#e2e8f0;white-space:pre-wrap">${lines}</pre>`,color);
  const lesson=(topic,name,description,code,preview,meta={})=>T(topic,name,description,code,preview,[],{
    kind:meta.kind||'Frontend práctico',
    tip:meta.tip||'Prueba el ejemplo, cambia los datos de entrada y comprueba cómo cambia el resultado.',
    guide:meta.guide||[],
    guideTitle:'Dónde se hace cada modificación',
    codeLabel:meta.codeLabel||'Código',
    filesToCreate:meta.files||[],
    filesToCreateTitle:'Archivos que se crean en esta lección',
    filesToCreateStatus:(meta.files||[]).length?'Crea estos archivos para repetir la práctica desde cero.':'No necesitas crear archivos nuevos en esta lección; usa los indicados abajo.',
    ...meta
  });
  const insertAfter=(predicate,section)=>{
    const index=sections.findIndex(predicate);
    if(index>=0)sections.splice(index+1,0,section); else sections.push(section);
  };

  const arraySection={
    title:'JavaScript · 8A. map vs filter vs reduce',
    navLabel:'8A. map vs filter vs reduce',
    group:'JavaScript',primaryArea:'JavaScript',course:'JavaScript',areaOrder:85,
    description:'Comparación práctica de map, filter y reduce usando el mismo arreglo para que quede claro qué recibe cada método, qué devuelve y cuándo conviene usarlo.',
    quote:'“Misma colección, objetivos distintos: transformar, seleccionar o resumir.”',
    challenge:'Parte de una lista de productos y usa map, filter y reduce para obtener nombres, productos disponibles y valor total del inventario.',
    items:[
      lesson('Comparación','La misma entrada, tres resultados',
        'map, filter y reduce recorren un arreglo, pero no persiguen el mismo objetivo. map transforma cada elemento y devuelve otro arreglo con la misma cantidad de posiciones. filter conserva solamente los elementos que cumplen una condición y devuelve un arreglo que puede ser más corto. reduce combina todos los elementos hasta producir un solo resultado, como un número, objeto o resumen.',
        `const numeros = [1, 2, 3, 4];\n\nconst duplicados = numeros.map(numero => numero * 2);\nconst pares = numeros.filter(numero => numero % 2 === 0);\nconst suma = numeros.reduce((acumulado, numero) => acumulado + numero, 0);\n\nconsole.log(duplicados);\nconsole.log(pares);\nconsole.log(suma);`,
        result('map vs filter vs reduce',`<div style="display:grid;gap:10px"><div><strong>Original:</strong> [1, 2, 3, 4]</div><div style="padding:10px;border-radius:9px;background:#dbeafe"><strong>map()</strong> → [2, 4, 6, 8]</div><div style="padding:10px;border-radius:9px;background:#dcfce7"><strong>filter()</strong> → [2, 4]</div><div style="padding:10px;border-radius:9px;background:#f3e8ff"><strong>reduce()</strong> → 10</div></div>`,'#0f172a'),
        {kind:'JavaScript',codeLabel:'Código JavaScript',guide:[['Crear o modificar','js/arrays/map-filter-reduce.js','Guarda aquí la comparación para ejecutar los tres métodos con la misma entrada.']],files:[{path:'js/arrays/map-filter-reduce.js',method:'MANUAL',detail:'Archivo de práctica para comparar los tres métodos.'}]}),
      lesson('map()','Transformar sin cambiar el arreglo original',
        'map ejecuta una función por cada elemento y usa el valor retornado para construir un nuevo arreglo. La longitud normalmente se conserva. Es apropiado cuando quieres convertir números, extraer propiedades o construir una nueva representación de cada registro.',
        `const productos = [\n  { id: 1, nombre: 'Teclado', precio: 180000 },\n  { id: 2, nombre: 'Mouse', precio: 90000 }\n];\n\nconst nombres = productos.map(producto => producto.nombre);\nconst conIva = productos.map(producto => ({\n  ...producto,\n  precioFinal: producto.precio * 1.19\n}));\n\nconsole.log(nombres);\nconsole.log(conIva);`,
        codeResult('map()','["Teclado", "Mouse"]\n\nSe crea un arreglo nuevo con precioFinal; productos permanece sin modificar.','#2563eb'),
        {kind:'JavaScript',codeLabel:'Código JavaScript',guide:[['Modificar','js/arrays/map-filter-reduce.js','Añade aquí las transformaciones con map.']]}),
      lesson('filter()','Conservar solamente lo que cumple una condición',
        'filter evalúa cada elemento y conserva aquellos cuyo callback devuelve true. No transforma el elemento: decide si permanece o desaparece de la nueva colección. Es ideal para búsquedas, filtros por estado, permisos o disponibilidad.',
        `const productos = [\n  { nombre: 'Teclado', stock: 4 },\n  { nombre: 'Mouse', stock: 0 },\n  { nombre: 'Monitor', stock: 2 }\n];\n\nconst disponibles = productos.filter(producto => producto.stock > 0);\nconsole.log(disponibles);`,
        codeResult('filter()','Teclado · stock 4\nMonitor · stock 2','#16a34a'),
        {kind:'JavaScript',codeLabel:'Código JavaScript',guide:[['Modificar','js/arrays/map-filter-reduce.js','Añade aquí filtros y cambia la condición para comprobar qué registros permanecen.']]}),
      lesson('reduce()','Combinar toda la colección en un solo resultado',
        'reduce recibe un acumulador y el elemento actual. En cada vuelta devuelve el nuevo acumulador. El valor inicial es importante porque define desde qué estado comienza el cálculo. Puede sumar, agrupar, contar o construir objetos.',
        `const precios = [180000, 90000, 750000];\n\nconst total = precios.reduce(\n  (acumulado, precio) => acumulado + precio,\n  0\n);\n\nconsole.log(total);`,
        codeResult('reduce()','1020000','#7e22ce'),
        {kind:'JavaScript',codeLabel:'Código JavaScript',guide:[['Modificar','js/arrays/map-filter-reduce.js','Añade aquí el reduce y experimenta con diferentes valores iniciales.']]}),
      lesson('Composición','Encadenar filter, map y reduce',
        'Los métodos pueden encadenarse cuando cada etapa tiene una responsabilidad clara. Primero filtra la colección, después transforma los elementos y al final reduce el resultado. Leer el código como una tubería ayuda a entenderlo: seleccionar → transformar → resumir.',
        `const ventas = [\n  { total: 100000, pagada: true },\n  { total: 50000, pagada: false },\n  { total: 200000, pagada: true }\n];\n\nconst totalPagado = ventas\n  .filter(venta => venta.pagada)\n  .map(venta => venta.total)\n  .reduce((suma, total) => suma + total, 0);\n\nconsole.log(totalPagado);`,
        codeResult('Cadena de métodos','300000','#0f766e'),
        {kind:'JavaScript',codeLabel:'Código JavaScript',guide:[['Modificar','js/arrays/map-filter-reduce.js','Practica el orden filter → map → reduce y compara con otras combinaciones.']]})
    ]
  };
  insertAfter(section=>section.title==='JavaScript · 8. Métodos de arreglos',arraySection);

  const reactSection={
    title:'React · Formularios y validación',
    navLabel:'Formularios y validación',
    group:'React',primaryArea:'React',course:'React',areaOrder:240,
    description:'Aprende cuándo usar formularios nativos de React y cómo se diferencian React Hook Form, Formik y Zod. La sección muestra instalación, archivos, validación, errores y una integración real.',
    quote:'“React Hook Form y Formik administran formularios; Zod valida la forma de los datos.”',
    challenge:'Construye un formulario de registro con nombre, correo y edad, valida los datos y muestra errores junto a cada campo.',
    items:[
      lesson('Concepto','Primero: qué problema resuelve cada herramienta',
        'React Hook Form y Formik ayudan a administrar valores, envío, errores y estado de un formulario. Zod cumple otra función: define un esquema y valida datos contra ese contrato. Por eso Zod puede combinarse con React Hook Form o Formik; no es un reemplazo directo de ambos.',
        `React Hook Form → gestión eficiente del formulario\nFormik          → estado estructurado del formulario\nZod             → esquema y validación de datos\n\nCombinación habitual:\nReact Hook Form + Zod`,
        result('Qué hace cada herramienta',`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:10px"><div style="padding:12px;border:1px solid #86efac;border-radius:10px"><strong>React Hook Form</strong><br>registro de campos, submit y errores</div><div style="padding:12px;border:1px solid #7dd3fc;border-radius:10px"><strong>Formik</strong><br>values, errors, touched y submit</div><div style="padding:12px;border:1px solid #d8b4fe;border-radius:10px"><strong>Zod</strong><br>esquema y reglas de validación</div></div>`,'#111827'),
        {kind:'React',codeLabel:'Comparación React',guide:[['Revisar','src/App.jsx','Decide primero si el formulario es suficientemente simple para usar React sin una librería adicional.']]}),
      lesson('React Hook Form','Instalar y registrar campos',
        'useForm entrega register para conectar inputs, handleSubmit para controlar el envío y formState.errors para leer errores. register recibe las reglas de validación del campo sin obligarte a escribir un useState por cada input.',
        `npm install react-hook-form\n\n// src/forms/FormularioRHF.jsx\nimport { useForm } from 'react-hook-form';\n\nexport function FormularioRHF() {\n  const { register, handleSubmit, formState: { errors } } = useForm();\n\n  const guardar = datos => console.log(datos);\n\n  return (\n    <form onSubmit={handleSubmit(guardar)}>\n      <input\n        {...register('correo', {\n          required: 'El correo es obligatorio'\n        })}\n        placeholder="correo@ejemplo.com"\n      />\n      {errors.correo && <p>{errors.correo.message}</p>}\n      <button>Guardar</button>\n    </form>\n  );\n}`,
        result('React Hook Form','<form><label>Correo</label><input style="display:block;margin:6px 0 10px;padding:8px" placeholder="correo@ejemplo.com"><button type="button">Guardar</button></form>','#16a34a'),
        {kind:'React',codeLabel:'Código React',guide:[['Ejecutar','Terminal · raíz del proyecto React','Instala react-hook-form antes de importar useForm.'],['Crear','src/forms/FormularioRHF.jsx','Aquí se registra cada campo y se controla el submit.'],['Modificar','src/App.jsx','Importa <FormularioRHF /> y renderízalo.']],files:[{path:'src/forms/FormularioRHF.jsx',method:'MANUAL',detail:'Componente del formulario con React Hook Form.'}]}),
      lesson('React Hook Form','Validación y mensajes por campo',
        'Las reglas de register permiten required, minLength, pattern y validate. Cada regla puede devolver un mensaje distinto. Conviene colocar el mensaje cerca del input y usar aria-invalid para que el estado también sea accesible.',
        `const { register, formState: { errors } } = useForm();\n\n<input\n  aria-invalid={errors.nombre ? 'true' : 'false'}\n  {...register('nombre', {\n    required: 'Escribe tu nombre',\n    minLength: { value: 3, message: 'Mínimo 3 caracteres' }\n  })}\n/>\n\n{errors.nombre && (\n  <p role="alert">{errors.nombre.message}</p>\n)}`,
        result('Errores por campo','<label>Nombre</label><input aria-invalid="true" style="display:block;margin:6px 0;border:1px solid #ef4444;padding:8px"><p style="color:#b91c1c;margin:0">Mínimo 3 caracteres</p>','#16a34a'),
        {kind:'React',codeLabel:'Código React',guide:[['Modificar','src/forms/FormularioRHF.jsx','Añade reglas en register y renderiza el mensaje asociado a errors.']]}),
      lesson('Formik','Estado estructurado con values, errors y touched',
        'Formik centraliza valores, errores, campos visitados y envío. Field conecta inputs con el estado de Formik y ErrorMessage presenta errores. Es útil cuando prefieres una API declarativa basada en un estado de formulario explícito.',
        `npm install formik\n\n// src/forms/FormularioFormik.jsx\nimport { Formik, Form, Field, ErrorMessage } from 'formik';\n\nexport function FormularioFormik() {\n  return (\n    <Formik\n      initialValues={{ nombre: '' }}\n      validate={values => {\n        const errors = {};\n        if (!values.nombre) errors.nombre = 'Nombre obligatorio';\n        return errors;\n      }}\n      onSubmit={values => console.log(values)}\n    >\n      <Form>\n        <Field name="nombre" placeholder="Nombre" />\n        <ErrorMessage name="nombre" component="p" />\n        <button type="submit">Guardar</button>\n      </Form>\n    </Formik>\n  );\n}`,
        result('Formik','<form><input style="display:block;margin-bottom:10px;padding:8px" placeholder="Nombre"><button type="button">Guardar</button></form>','#0284c7'),
        {kind:'React',codeLabel:'Código React',guide:[['Ejecutar','Terminal · raíz del proyecto React','Instala formik.'],['Crear','src/forms/FormularioFormik.jsx','Aquí viven initialValues, validación, campos y envío.'],['Modificar','src/App.jsx','Importa y muestra el formulario de Formik.']],files:[{path:'src/forms/FormularioFormik.jsx',method:'MANUAL',detail:'Componente de formulario basado en Formik.'}]}),
      lesson('Zod','Definir un esquema de validación',
        'Zod valida datos independientes de la interfaz. z.object describe la estructura esperada y cada propiedad agrega reglas. safeParse devuelve success y data cuando todo es válido o un error estructurado cuando existe un problema.',
        `npm install zod\n\n// src/forms/registro-schema.js\nimport { z } from 'zod';\n\nexport const registroSchema = z.object({\n  nombre: z.string().min(3, 'Mínimo 3 caracteres'),\n  correo: z.string().email('Correo inválido'),\n  edad: z.coerce.number().int().min(18, 'Debes ser mayor de edad')\n});\n\nconst resultado = registroSchema.safeParse({\n  nombre: 'Ana', correo: 'ana@email.com', edad: '22'\n});\n\nconsole.log(resultado.success);`,
        codeResult('Zod','true\nLos datos cumplen el esquema.','#9333ea'),
        {kind:'React',codeLabel:'Código Zod',guide:[['Crear','src/forms/registro-schema.js','Define aquí reglas reutilizables sin mezclarlas con el JSX.']],files:[{path:'src/forms/registro-schema.js',method:'MANUAL',detail:'Esquema Zod reutilizable por distintos formularios o llamadas a API.'}]}),
      lesson('Integración','React Hook Form + Zod',
        'El resolver conecta el esquema Zod con React Hook Form. De esta forma las reglas se escriben una sola vez en el esquema, React Hook Form administra los campos y errors contiene los mensajes producidos por Zod.',
        `npm install react-hook-form zod @hookform/resolvers\n\nimport { useForm } from 'react-hook-form';\nimport { zodResolver } from '@hookform/resolvers/zod';\nimport { registroSchema } from './registro-schema';\n\nconst { register, handleSubmit, formState: { errors } } = useForm({\n  resolver: zodResolver(registroSchema)\n});\n\n<form onSubmit={handleSubmit(console.log)}>\n  <input {...register('correo')} />\n  {errors.correo && <p>{errors.correo.message}</p>}\n  <button>Crear cuenta</button>\n</form>`,
        result('RHF + Zod','<form><label>Correo</label><input style="display:block;margin:6px 0;border:1px solid #ef4444;padding:8px" value="correo-invalido" readonly><p style="color:#b91c1c">Correo inválido</p><button type="button">Crear cuenta</button></form>','#7c3aed'),
        {kind:'React',codeLabel:'Código React + Zod',guide:[['Modificar','src/forms/FormularioRHF.jsx','Configura zodResolver y muestra los errores del esquema.'],['Modificar','src/forms/registro-schema.js','Mantén aquí las reglas de datos.']]}),
      lesson('Comparación','¿Cuándo elegir React Hook Form, Formik o Zod?',
        'Para formularios pequeños puedes trabajar con HTML y estado React sin instalar nada. React Hook Form reduce código repetitivo y suele integrarse bien con validadores. Formik ofrece un modelo muy explícito de values, errors y touched. Zod se elige cuando quieres un contrato de datos reutilizable; normalmente se combina con una librería de formularios.',
        `Formulario pequeño      → React + HTML nativo\nFormulario con muchos campos→ React Hook Form\nEstado declarativo explícito → Formik\nEsquema reutilizable         → Zod\nFormulario + esquema         → React Hook Form + Zod`,
        result('Decisión rápida','<table style="width:100%;border-collapse:collapse"><tr><th style="text-align:left">Herramienta</th><th style="text-align:left">Responsabilidad</th></tr><tr><td>React Hook Form</td><td>Gestionar formulario</td></tr><tr><td>Formik</td><td>Gestionar formulario</td></tr><tr><td>Zod</td><td>Validar estructura de datos</td></tr></table>','#111827'),
        {kind:'React',codeLabel:'Comparación',guide:[['Revisar','package.json','Evita instalar varias librerías si el proyecto no las necesita. Elige una estrategia y mantenla consistente.']]})
    ]
  };
  insertAfter(section=>section.title==='Frameworks frontend · React',reactSection);

  const deploySection={
    title:'Frameworks frontend · Despliegue · Vercel vs Netlify vs Cloudflare Pages',
    navLabel:'Despliegue · Vercel vs Netlify vs Cloudflare Pages',
    group:'Frameworks',primaryArea:'Frameworks',course:'Frameworks',areaOrder:900,
    description:'Repaso práctico del proceso de despliegue de un frontend: build, carpeta de salida, repositorio Git, variables de entorno, previews y diferencias conceptuales entre Vercel, Netlify y Cloudflare Pages.',
    quote:'“Desplegar no es copiar src al servidor: primero debes saber qué construye tu proyecto y qué archivos públicos debe servir la plataforma.”',
    challenge:'Publica una aplicación Vite de prueba en una plataforma, configura una variable de entorno y verifica que un nuevo commit produzca otro despliegue.',
    items:[
      lesson('Fundamentos','Qué ocurre cuando despliegas un frontend',
        'En un proyecto moderno el servidor de desarrollo no es el producto final. npm run build transforma módulos, CSS y recursos y genera una carpeta de salida, normalmente dist en Vite. La plataforma de hosting ejecuta el build o recibe esa carpeta y luego sirve los archivos mediante HTTP y CDN.',
        `npm install\nnpm run build\n\n# Vite suele generar:\ndist/\n  index.html\n  assets/\n\n# Comprueba localmente antes de publicar:\nnpm run preview`,
        result('Flujo de despliegue','<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><span>Git push</span><strong>→</strong><span>Build</span><strong>→</strong><span>dist/</span><strong>→</strong><span>CDN</span><strong>→</strong><span>Navegador</span></div>','#0f172a'),
        {kind:'Frameworks',codeLabel:'Comandos de build',guide:[['Ejecutar','Terminal · raíz del proyecto','Genera el build de producción y comprueba que no existan errores.'],['Revisar','package.json','Confirma los scripts build y preview.'],['Revisar','dist/','Esta carpeta contiene el resultado público generado por Vite.']]}),
      lesson('Vercel','Despliegue conectado a Git',
        'Vercel puede importar un repositorio y ejecutar el build cuando llegan nuevos commits. En un proyecto Vite debes comprobar el comando de build y la carpeta de salida. Los detalles exactos de detección dependen del framework, por eso conviene revisar la configuración que muestra el proyecto antes del primer despliegue.',
        `# Proyecto Vite\nnpm run build\n\nBuild command: npm run build\nOutput directory: dist\n\n# Flujo\ngit push → build → deployment`,
        result('Vercel','<strong>Repositorio</strong> → build automático → URL de despliegue<br><small>Revisa build, output y variables de entorno antes de publicar.</small>','#16a34a'),
        {kind:'Frameworks',codeLabel:'Configuración de despliegue',guide:[['Revisar','package.json','Vercel utilizará el script de build del proyecto.'],['Configurar','Vercel · Project Settings','Define comando de build, carpeta de salida y variables de entorno cuando la detección automática no sea suficiente.']]}),
      lesson('Netlify','Build y carpeta publish',
        'Netlify también puede conectar un repositorio Git. Una forma reproducible de guardar la configuración del build es netlify.toml. Para un proyecto Vite, command ejecuta la compilación y publish apunta a dist.',
        `# netlify.toml\n[build]\n  command = "npm run build"\n  publish = "dist"`,
        codeResult('netlify.toml','Build: npm run build\nPublish: dist','#0284c7'),
        {kind:'Frameworks',codeLabel:'Configuración Netlify',guide:[['Crear','netlify.toml','Guarda aquí la configuración de build y carpeta publicada para que viaje con el repositorio.'],['Revisar','package.json','Comprueba que exista npm run build.']],files:[{path:'netlify.toml',method:'MANUAL',detail:'Configuración versionable de Netlify para el frontend.'}]}),
      lesson('Cloudflare Pages','Publicar el resultado de build',
        'Cloudflare Pages puede construir desde un repositorio o recibir una carpeta ya compilada. Con Wrangler puedes publicar dist desde la terminal. Antes de ejecutar el comando crea el build de producción y confirma que dist contiene index.html.',
        `npm run build\n\n# Ejemplo con Wrangler\nnpx wrangler pages deploy dist --project-name mi-frontend`,
        result('Cloudflare Pages','<strong>dist/</strong> → Pages → red global de Cloudflare<br><small>El frontend publicado sigue siendo HTML, CSS, JavaScript e imágenes estáticas.</small>','#7e22ce'),
        {kind:'Frameworks',codeLabel:'Comandos Cloudflare Pages',guide:[['Ejecutar','Terminal · raíz del proyecto','Genera dist y publica esa carpeta con Wrangler si eliges despliegue por CLI.'],['Revisar','dist/index.html','Confirma que la compilación produjo el punto de entrada.']]}),
      lesson('SPA','Rutas del frontend y recargas directas',
        'Una SPA puede funcionar al navegar desde la interfaz y fallar al recargar /productos si el hosting busca un archivo físico con esa ruta. La solución depende de la plataforma: se configura una regla de fallback o rewrite hacia index.html. Solo aplícala cuando tu aplicación usa routing del lado del cliente.',
        `Solicitud: GET /productos\n        ↓\nHosting intenta buscar /productos\n        ↓\nSPA necesita servir index.html\n        ↓\nReact/Vue/Svelte Router decide qué vista mostrar`,
        result('Fallback de SPA','<strong>/productos</strong> → index.html → router del frontend → vista Productos','#ea580c'),
        {kind:'Frameworks',codeLabel:'Flujo de rutas',guide:[['Revisar','Configuración de hosting','Añade el fallback de SPA únicamente si usas rutas de cliente y una recarga directa devuelve 404.']]}),
      lesson('Variables de entorno','No subir secretos al frontend',
        'Las variables de entorno usadas durante el build pueden terminar incorporadas al JavaScript que descarga el navegador. Por eso una clave expuesta al frontend debe considerarse pública. Los secretos reales pertenecen a un backend o función server-side, no a un bundle de React, Vue o Svelte.',
        `# Ejemplo Vite\nVITE_API_URL=https://api.ejemplo.com\n\n// Sí: URL pública\nconst apiUrl = import.meta.env.VITE_API_URL;\n\n// No: contraseña de base de datos\n// No: token privado del servidor`,
        codeResult('Variables públicas','VITE_API_URL puede viajar al navegador.\nUna contraseña privada no debe formar parte del bundle.','#b91c1c'),
        {kind:'Frameworks',codeLabel:'Configuración del entorno',guide:[['Configurar','Panel de la plataforma · Environment Variables','Guarda valores por entorno y separa desarrollo, preview y producción cuando lo necesites.'],['Revisar','.env.example','Documenta nombres de variables sin incluir secretos reales.']],files:[{path:'.env.example',method:'MANUAL',detail:'Plantilla sin secretos para documentar las variables necesarias.'}]}),
      lesson('Comparación','Vercel vs Netlify vs Cloudflare Pages',
        'Las tres opciones pueden servir frontends modernos y automatizar despliegues desde Git. La decisión no debería basarse solamente en el nombre: compara integración con tu stack, flujo de previews, funciones o runtime server-side si lo necesitas, CDN, observabilidad, restricciones del proyecto y experiencia del equipo. Los servicios evolucionan, así que para producción revisa siempre la documentación y límites actuales.',
        `Vercel           → muy integrado con ecosistemas React/Next y previews\nNetlify          → flujo Jamstack, builds y funciones integradas\nCloudflare Pages → despliegue sobre la red global de Cloudflare y Workers\n\nEn los tres casos:\nGit → build → artefacto → despliegue → dominio`,
        result('Comparación de despliegue','<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px"><div style="padding:12px;border:1px solid #86efac;border-radius:10px"><strong>Vercel</strong><br>Git + builds + previews</div><div style="padding:12px;border:1px solid #7dd3fc;border-radius:10px"><strong>Netlify</strong><br>Git + Jamstack + funciones</div><div style="padding:12px;border:1px solid #d8b4fe;border-radius:10px"><strong>Cloudflare Pages</strong><br>Pages + red global + Workers</div></div>','#0f172a'),
        {kind:'Frameworks',codeLabel:'Comparación',guide:[['Revisar','README.md','Documenta qué plataforma utiliza el proyecto, cómo se construye y qué carpeta se publica.']]})
    ]
  };
  let frameworkLast=-1;
  sections.forEach((section,index)=>{if((section.primaryArea||section.group)==='Frameworks')frameworkLast=index;});
  if(frameworkLast>=0)sections.splice(frameworkLast+1,0,deploySection); else sections.push(deploySection);

  sections.forEach((section,index)=>section.routeOrder=index+1);
  if(typeof buildNav==='function')buildNav();
  if(typeof render==='function')render();
})();
