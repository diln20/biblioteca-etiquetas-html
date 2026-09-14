const fs = require('fs');
const vm = require('vm');
const assert = require('assert');

const source = fs.readFileSync('backend-baas-section.js', 'utf8');
const sections = [];
const T = (tag,name,description,code,preview,attrs=[],meta={}) => ({tag,name,description,code,preview,attrs,...meta});
const context = { window: { sections, T }, console };
vm.createContext(context);
vm.runInContext(source, context);

assert.equal(sections.length, 1, 'debe agregar exactamente una sección BaaS');
const section = sections[0];
assert.equal(section.primaryArea, 'Backend');
assert.match(section.title, /Supabase vs Firebase vs Appwrite/);
assert.equal(section.items.length, 14, 'debe incluir 14 lecciones');

const text = section.items.map(item => [item.name,item.description,item.code].join('\n')).join('\n');
[
  'Backend as a Service',
  'Supabase',
  'PostgreSQL',
  'Row Level Security',
  'Firebase',
  'Firestore',
  'Security Rules',
  'Appwrite',
  'TablesDB',
  'DocumentsDB',
  'VectorsDB',
  'self-hosting',
  'service_role',
  'prueba usuario A/B'
].forEach(term => assert.ok(text.includes(term), `falta ${term}`));

assert.ok(section.items.every(item => Array.isArray(item.guide) && item.guide.length >= 1), 'cada lección debe indicar dónde modificar');
assert.ok(section.items.every(item => Array.isArray(item.filesToCreate) && item.filesToCreate.length >= 1), 'cada lección debe indicar archivos a crear');
assert.ok(section.items.some(item => item.code.includes('npm install @supabase/supabase-js')));
assert.ok(section.items.some(item => item.code.includes('npm install firebase')));
assert.ok(section.items.some(item => item.code.includes('npm install appwrite')));
assert.ok(section.items.some(item => item.code.includes('firestore.rules')));
assert.ok(section.items.some(item => item.code.includes('docker compose up -d')));

console.log({status:'ok', section:section.title, lessons:section.items.length, fileGuides:true, filesToCreate:true});
