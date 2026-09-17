const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const source = fs.readFileSync('git-section.js', 'utf8');
const loader = fs.readFileSync('loader.js', 'utf8');

assert.doesNotThrow(() => new vm.Script(source, { filename:'git-section.js' }));
assert.ok(loader.includes('git-section.js?v=2'), 'loader no carga la versión nueva de Git');

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
new vm.Script(source, { filename:'git-section.js' }).runInContext(context);

const history = sections.find(section => section.title === 'Git · Historial, commits y recuperación');
assert.ok(history, 'falta la sección de historial y recuperación');
assert.ok(history.items.length >= 12, 'la sección necesita suficientes prácticas');

const allText = history.items.map(item => `${item.name}\n${item.description}\n${item.code}\n${item.tip || ''}`).join('\n');
[
  'git log --oneline --graph --decorate --all',
  'git show',
  'git switch --detach',
  'git switch -c recuperar-diseno',
  'git diff a1b2c3d..d4e5f6a',
  'git restore --source=',
  'git cherry-pick',
  'git branch --contains',
  'git commit --amend',
  'git reset --soft',
  'git reset --hard',
  'git reflog',
  'git blame'
].forEach(term => assert.ok(allText.includes(term), `falta explicar ${term}`));

const advanced = sections.find(section => section.title === 'Git · Avanzado');
assert.ok(advanced, 'falta Git avanzado');
const advancedText = advanced.items.map(item => `${item.name}\n${item.description}\n${item.code}\n${item.tip || ''}`).join('\n');
[
  'git stash apply',
  'git rebase -i',
  'git bisect',
  'git revert',
  'git tag'
].forEach(term => assert.ok(advancedText.includes(term), `falta Git avanzado: ${term}`));

assert.ok(allText.includes('detached HEAD'));
assert.ok(allText.includes('reflog'));
assert.ok(allText.includes('ramas compartidas'));

console.log({
  status:'ok',
  gitSections:sections.length,
  historyLessons:history.items.length,
  advancedLessons:advanced.items.length,
  commitSelection:true,
  recovery:true
});
