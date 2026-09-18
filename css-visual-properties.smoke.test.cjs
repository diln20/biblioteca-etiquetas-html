const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');

const source=fs.readFileSync('css-visual-property-sections.js','utf8');
assert.doesNotThrow(()=>new vm.Script(source,{filename:'css-visual-property-sections.js'}));

const sections=[];
const context={
  console,
  encodeURIComponent,
  sections,
  T:(tag,name,description,code,preview=code,attrs=[],meta={})=>({tag,name,description,code,preview,attrs,...meta})
};
context.window=context;
vm.createContext(context);
new vm.Script(source,{filename:'css-visual-property-sections.js'}).runInContext(context);

const expected=[
  ['CSS · overflow visual',5,['overflow: visible','overflow: hidden','overflow: scroll','overflow: auto','overflow: clip']],
  ['CSS · visibility visual',3,['visibility: visible','visibility: hidden','visibility: collapse']],
  ['CSS · text-decoration visual',5,['text-decoration: underline','text-decoration: overline','text-decoration: line-through','text-decoration: none','text-decoration-line']],
  ['CSS · object-fit visual',5,['object-fit: cover','object-fit: contain','object-fit: fill','object-fit: none','object-fit: scale-down']]
];

for(const [title,count,terms] of expected){
  const section=sections.find(item=>item.title===title);
  assert.ok(section,`falta ${title}`);
  assert.equal(section.primaryArea,'CSS');
  assert.equal(section.items.length,count,`${title} debe tener ${count} ejemplos`);
  const text=section.items.map(item=>`${item.name}\n${item.description}\n${item.code}\n${item.preview}\n${item.tip||''}`).join('\n');
  terms.forEach(term=>assert.ok(text.includes(term),`${title}: falta ${term}`));
  assert.ok(section.items.every(item=>item.interactiveWeb===true),`${title}: todos deben ser interactivos`);
}
const visibility=sections.find(s=>s.title==='CSS · visibility visual');
assert.ok((visibility.description+' '+visibility.items.map(i=>i.description+' '+(i.tip||'')).join(' ')).includes('display:none'));
assert.ok(sections.find(s=>s.title==='CSS · object-fit visual').items.map(i=>i.description).join(' ').includes('proporción'));

console.log({status:'ok',sections:sections.length,examples:sections.reduce((n,s)=>n+s.items.length,0)});
