const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync('http-status-codes-section.js', 'utf8');
const loader = fs.readFileSync('loader.js', 'utf8');

assert.doesNotThrow(() => new vm.Script(source, { filename:'http-status-codes-section.js' }));

const sections = [];
const context = {
  console,
  sections,
  T: (tag,name,description,code,preview=code,attrs=[],meta={}) => ({tag,name,description,code,preview,attrs,...meta}),
  buildNav: () => {},
  render: () => {}
};
context.window = context;
vm.createContext(context);
new vm.Script(source, { filename:'http-status-codes-section.js' }).runInContext(context);

const section = sections.find(item => item.title === 'APIs · Códigos de estado HTTP con http.cat');
assert.ok(section, 'falta la sección de estados HTTP');
assert.ok(section.items.length >= 15, 'faltan prácticas de estados HTTP');

const text = section.items.map(item => `${item.name}\n${item.description}\n${item.code}\n${item.preview}`).join('\n');
[
  '1xx', '2xx', '3xx', '4xx', '5xx',
  '200 OK', '201 Created', '202 Accepted', '204 No Content', '206 Partial Content',
  '301 Moved Permanently', '302 Found', '303 See Other', '304 Not Modified', '307 Temporary Redirect', '308 Permanent Redirect',
  '400 Bad Request', '401 Unauthorized', '403 Forbidden', '404 Not Found', '405 Method Not Allowed',
  '409 Conflict', '410 Gone', '413', '415', '422', '429',
  '500 Internal Server Error', '501 Not Implemented', '502 Bad Gateway', '503 Service Unavailable', '504 Gateway Timeout',
  'response.ok', 'response.status', 'response.json()', 'Retry-After', 'Content-Type',
  'https://http.cat/404', 'https://http.cat/500'
].forEach(term => assert.ok(text.includes(term), `falta explicar ${term}`));

assert.ok(text.includes('401 pregunta'));
assert.ok(text.includes('403'));
assert.ok(text.includes('204') && text.includes('return null'));
assert.ok(text.includes('fetch() no entra automáticamente al catch'));
assert.ok(text.includes('códigos no estándar') || text.includes('códigos no standard') || text.includes('no estándar'));
assert.ok(loader.includes('http-status-codes-section.js?v=1'), 'loader no carga estados HTTP');

console.log({
  status:'ok',
  lessons:section.items.length,
  httpCat:true,
  fetchHandling:true,
  statusFamilies:true
});
