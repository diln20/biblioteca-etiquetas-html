const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const read = file => fs.readFileSync(file, 'utf8');
const source = read('api-documentation-openapi-section.js');
const loader = read('loader.js');

assert.doesNotThrow(() => new vm.Script(source, { filename:'api-documentation-openapi-section.js' }));

const context = {
  console,
  sections: [],
  T: (tag,name,description,code,preview=code,attrs=[],meta={}) => ({tag,name,description,code,preview,attrs,...meta})
};
context.window = context;
vm.createContext(context);
new vm.Script(source).runInContext(context);

assert.equal(context.sections.length, 1);
const section = context.sections[0];
assert.equal(section.title, 'APIs · Documentación con OpenAPI, Swagger UI y Scalar');
assert.equal(section.primaryArea, 'APIs');
assert.ok(section.items.length >= 11);

const all = section.items.map(item => `${item.name}\n${item.description}\n${item.code}`).join('\n');
[
  'OpenAPI',
  'Swagger UI',
  'Scalar',
  'openapi: 3.1.0',
  'requestBody',
  'components',
  'securitySchemes',
  'bearerAuth',
  'SwaggerUIBundle',
  '@scalar/api-reference',
  'Scalar.createApiReference',
  '/openapi.json',
  '/docs',
  '/scalar',
  'scalar-fastapi'
].forEach(text => assert.ok(all.includes(text), `falta ${text}`));

assert.ok(section.items.some(item => item.code.includes('python -m http.server 5500')));
assert.ok(section.items.some(item => Array.isArray(item.filesToCreate) && item.filesToCreate.some(file => file.path.endsWith('openapi.yaml'))));
assert.ok(section.items.some(item => Array.isArray(item.filesToCreate) && item.filesToCreate.some(file => file.path.endsWith('swagger.html'))));
assert.ok(section.items.some(item => Array.isArray(item.filesToCreate) && item.filesToCreate.some(file => file.path.endsWith('scalar.html'))));
assert.ok(section.items.every(item => item.kind === 'APIs · Documentación'));
assert.ok(section.items.every(item => Array.isArray(item.guide) && item.guide.length > 0));
assert.ok(loader.includes('api-documentation-openapi-section.js?v=1'));

console.log({
  status:'ok',
  section:section.title,
  lessons:section.items.length,
  swagger:true,
  scalar:true,
  openapi:true
});
