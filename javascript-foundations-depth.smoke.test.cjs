const fs=require('fs');
const vm=require('vm');
const assert=require('assert');

const sections=[];
const T=(topic,name,description,code,preview,attrs,meta={})=>({topic,name,description,code,preview,attrs,...meta});
const context={window:{sections,T},sections,T,console};
context.window.window=context.window;
vm.createContext(context);

for(const file of ['javascript-foundations-extra-1.js','javascript-foundations-extra-2.js','javascript-runtime-review.js']){
  vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file});
}

assert.equal(sections.length,7,'deben existir 7 secciones nuevas de JavaScript');
const all=sections.flatMap(section=>section.items||[]);
assert.ok(all.length>=35,'deben existir al menos 35 lecciones nuevas');
const text=sections.map(s=>`${s.title}\n${s.description}\n${(s.items||[]).map(i=>`${i.name}\n${i.description}\n${i.code}`).join('\n')}`).join('\n');
[
  'Inline, interno y externo','prompt, confirm e input HTML','undefined vs null vs NaN','BigInt','Symbol','typeof y casos especiales',
  'Primitivos vs referencias','const con objetos y arrays','Conversión explícita','Coerción implícita','Truthy y Falsy',
  'Operadores de asignación','??, ||=, &&= y ??=','Strings · índices','toUpperCase','slice, substring, replace, replaceAll y split',
  'Number, parseInt y parseFloat','toFixed, isInteger, isNaN e isFinite','MAX_SAFE_INTEGER','round, floor, ceil y trunc',
  'Math.random','Navegador vs Node.js','Parser y AST','JIT, Call Stack y Heap','Event Loop','Repaso y preguntas de entrevista'
].forEach(term=>assert.ok(text.includes(term),`falta ${term}`));

assert.ok(all.every(item=>Array.isArray(item.guide)&&item.guide.length>=2),'cada leccion debe indicar donde practicar');
assert.ok(all.every(item=>Array.isArray(item.filesToCreate)&&item.filesToCreate.length>=1),'cada leccion debe indicar archivos');
assert.ok(all.every(item=>item.exerciseTitle==='Ejercicio para ti'),'cada leccion debe incluir ejercicio');
assert.ok(sections.every(section=>section.primaryArea==='JavaScript'),'todas las secciones deben pertenecer a JavaScript');

console.log({status:'ok',sections:sections.length,lessons:all.length,fileGuides:true,exercises:true});
