const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const read=file=>fs.readFileSync(file,'utf8');
const source=read('modern-frontend-tools-section.js');
const loader=read('loader.js');

assert.doesNotThrow(()=>new vm.Script(source,{filename:'modern-frontend-tools-section.js'}));
assert.ok(loader.includes('modern-frontend-tools-section.js?v=1'));

const context={
  console,
  sections:[
    {title:'JavaScript · 8. Métodos de arreglos',group:'JavaScript',primaryArea:'JavaScript',items:[]},
    {title:'JavaScript · 9. Objetos y manejo de datos',group:'JavaScript',primaryArea:'JavaScript',items:[]},
    {title:'Frameworks frontend · React',group:'React',primaryArea:'React',items:[]},
    {title:'Proyectos con frameworks · React + Bootstrap',group:'Frameworks',primaryArea:'Frameworks',items:[]}
  ],
  T:(tag,name,description,code,preview=code,attrs=[],meta={})=>({tag,name,description,code,preview,attrs,...meta}),
  buildNav:()=>{},
  render:()=>{}
};
context.window=context;
vm.createContext(context);
new vm.Script(source,{filename:'modern-frontend-tools-section.js'}).runInContext(context);

const array=context.sections.find(section=>section.title==='JavaScript · 8A. map vs filter vs reduce');
const react=context.sections.find(section=>section.title==='React · Formularios y validación');
const deploy=context.sections.find(section=>section.title==='Frameworks frontend · Despliegue · Vercel vs Netlify vs Cloudflare Pages');

assert.ok(array,'falta comparación map/filter/reduce');
assert.ok(react,'falta sección de formularios React');
assert.ok(deploy,'falta sección de despliegue frontend');
assert.equal(array.primaryArea,'JavaScript');
assert.equal(react.primaryArea,'React');
assert.equal(deploy.primaryArea,'Frameworks');

const jsCode=array.items.map(item=>item.code).join('\n');
['.map(','.filter(','.reduce(','filter(venta => venta.pagada)'].forEach(text=>assert.ok(jsCode.includes(text),`falta ${text}`));
assert.ok(array.items.some(item=>String(item.preview).includes('[2, 4, 6, 8]')));

const reactCode=react.items.map(item=>item.code).join('\n');
['react-hook-form','formik','zod','@hookform/resolvers/zod','zodResolver','safeParse'].forEach(text=>assert.ok(reactCode.includes(text),`falta ${text}`));
assert.ok(react.items.some(item=>item.filesToCreate.some(file=>file.path==='src/forms/FormularioRHF.jsx')));
assert.ok(react.items.some(item=>item.filesToCreate.some(file=>file.path==='src/forms/FormularioFormik.jsx')));
assert.ok(react.items.some(item=>item.filesToCreate.some(file=>file.path==='src/forms/registro-schema.js')));
assert.ok(react.items.every(item=>Array.isArray(item.guide)&&item.guide.length>0));
assert.ok(react.items.every(item=>String(item.preview).includes('Resultado ·')));

const deployCode=deploy.items.map(item=>item.code).join('\n');
['npm run build','netlify.toml','wrangler pages deploy','Vercel','Cloudflare Pages','VITE_API_URL'].forEach(text=>assert.ok(deployCode.includes(text),`falta ${text}`));
assert.ok(deploy.items.some(item=>item.filesToCreate.some(file=>file.path==='netlify.toml')));
assert.ok(deploy.items.some(item=>item.filesToCreate.some(file=>file.path==='.env.example')));
assert.ok(deploy.items.every(item=>Array.isArray(item.guide)&&item.guide.length>0));

const titles=context.sections.map(section=>section.title);
assert.equal(titles.indexOf(array.title),titles.indexOf('JavaScript · 8. Métodos de arreglos')+1,'la comparación debe ir después de Métodos de arreglos');
assert.equal(titles.indexOf(react.title),titles.indexOf('Frameworks frontend · React')+1,'formularios debe ir después del bloque base de React');

console.log({status:'ok',arrayLessons:array.items.length,reactLessons:react.items.length,deployLessons:deploy.items.length,realPreviews:true,fileGuides:true});
