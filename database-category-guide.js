(()=>{
  if(window.__databaseCategoryGuideAdded)return;
  window.__databaseCategoryGuideAdded=true;
  if(!Array.isArray(window.sections))return;

  const COURSE='Base de datos';
  const DEFAULT_AREAS=['HTML','CSS','JavaScript','Git','APIs','Angular','React','Vue','Svelte','Solid.js','Django Framework','FastAPI','Django REST','Frameworks','Base de datos','Backend'];
  const normalize=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const engineOf=(section,item)=>item?.databaseEngine||section?.databaseEngine||'Fundamentos';
  const paths={
    Oracle:{schema:'database/oracle/schema.sql',queries:'database/oracle/queries.sql'},
    PostgreSQL:{schema:'database/postgresql/schema.sql',queries:'database/postgresql/queries.sql'},
    MongoDB:{schema:'database/mongodb/commands.js',queries:'database/mongodb/commands.js'},
    Neo4j:{schema:'database/neo4j/schema.cypher',queries:'database/neo4j/queries.cypher'},
    Redis:{schema:'database/redis/commands.redis',queries:'database/redis/commands.redis'},
    Cassandra:{schema:'database/cassandra/schema.cql',queries:'database/cassandra/queries.cql'}
  };
  const terminals={Oracle:'SQLcl / SQL*Plus',PostgreSQL:'psql',MongoDB:'mongosh',Neo4j:'cypher-shell',Redis:'redis-cli',Cassandra:'cqlsh'};

  const fileInfo=(section,item)=>{
    const engine=engineOf(section,item);
    const code=String(item?.code||'');
    const text=normalize(`${item?.topic||item?.tag||''} ${item?.name||''} ${item?.description||''} ${code}`);
    const guide=[],files=[],seen=new Set();
    const add=(action,path,detail)=>{const key=`${action}|${path}`;if(!seen.has(key)){seen.add(key);guide.push([action,path,detail]);}};
    const addFile=(path,method,detail,command='')=>{if(path&&!files.some(file=>file.path===path))files.push({path,method,detail,command});};

    if(!paths[engine]){
      add('Estudiar','README.md',engine==='Comparativa'?'Documenta aquí por qué elegirías cada motor y cuál sería la fuente de verdad.':'Usa esta lección para entender el modelo antes de crear scripts específicos.');
      return {guide,files};
    }

    const p=paths[engine];
    const terminalRx={
      Oracle:/\b(?:sqlplus|sql\s+\w)/,
      PostgreSQL:/\bpsql\b/,
      MongoDB:/\bmongosh\b/,
      Neo4j:/\bcypher-shell\b/,
      Redis:/\bredis-cli\b/,
      Cassandra:/\bcqlsh\b/
    }[engine];
    if(terminalRx&&terminalRx.test(code))add('Ejecutar',`Terminal · ${terminals[engine]}`,`Abre ${terminals[engine]} y conecta con tu instancia local antes de ejecutar los ejemplos.`);

    const schemaLike=/create\s+(?:table|database|keyspace|constraint|index)|alter\s+table|primary\s+key|generated\s+/i.test(code)
      || (engine==='Neo4j'&&/CREATE \(|CONSTRAINT|INDEX/.test(code));
    const queryLike=/insert|select|update|delete|find\s*\(|aggregate|match\s*\(|merge\s*\(|set\s+|get\s+|hset|lpush|rpush|sadd|multi|consistency/i.test(code);

    if(schemaLike){
      add('Crear o modificar',p.schema,`Guarda aquí el esquema, restricciones o comandos de estructura de ${engine}. Así el estudiante puede repetir el ejercicio desde cero.`);
      addFile(p.schema,'MANUAL',`Script versionable con la estructura de ${engine}.`);
    }
    if(queryLike||!schemaLike){
      add('Crear o modificar',p.queries,`Guarda aquí las consultas y operaciones de práctica de ${engine}.`);
      addFile(p.queries,'MANUAL',`Script de consultas reproducibles para practicar ${engine}.`);
    }

    if(/transaction|transaccion|commit|rollback|begin|multi|exec/.test(text))add('Ejecutar',`Cliente ${terminals[engine]}`,`Prueba la secuencia completa y verifica qué ocurre al confirmar o revertir.`);
    if(/index|indice|índice|explain/.test(text))add('Comprobar',p.queries,'Ejecuta la consulta antes y después del índice cuando el motor permita comparar el plan o el comportamiento.');
    if(/modelo|particion|partition|relacion|documento|grafo|hash|clave/.test(text))add('Documentar',`database/${normalize(engine).replace(/[^a-z0-9]+/g,'-')}/README.md`,'Anota el modelo de datos, la consulta que optimiza y las decisiones importantes del diseño.');

    return {guide:guide.slice(0,7),files:files.slice(0,8)};
  };

  sections.forEach(section=>{
    if(section.primaryArea!==COURSE&&!String(section.title||'').startsWith('Base de datos ·'))return;
    section.group=COURSE;
    section.primaryArea=COURSE;
    section.course=COURSE;
    section.navLabel=String(section.title||'').replace(/^Base de datos\s*·\s*/,'');
    if(!String(section.description||'').includes('Archivos:'))section.description=`${section.description||''} Archivos: cada ejemplo indica dónde guardar el script, qué cliente abrir y qué resultado comprobar.`.trim();
    section.items?.forEach(item=>{
      const engine=engineOf(section,item), meta=fileInfo(section,item);
      item.guide=meta.guide;
      item.guideTitle='Dónde se hace cada modificación';
      item.filesToCreate=meta.files;
      item.filesToCreateTitle='Archivos que se crean en esta lección';
      item.filesToCreateStatus=meta.files.length?'Crea estos scripts de práctica para poder repetir el ejercicio desde cero.':'Esta lección es conceptual; no necesitas crear un archivo nuevo.';
      item.codeLabel=`Código ${engine}`;
      item.kind=COURSE;
    });
  });

  const areas=Array.isArray(window.learningPath?.areas)&&window.learningPath.areas.length?[...window.learningPath.areas]:[...DEFAULT_AREAS];
  if(!areas.includes(COURSE)){
    const backend=areas.indexOf('Backend');
    if(backend>=0)areas.splice(backend,0,COURSE); else areas.push(COURSE);
  }
  const areaIndex=new Map(areas.map((area,index)=>[area,index]));
  const original=new Map(sections.map((section,index)=>[section,index]));
  sections.sort((a,b)=>{
    const aa=a.primaryArea||a.group||'HTML', ba=b.primaryArea||b.group||'HTML';
    const ai=areaIndex.has(aa)?areaIndex.get(aa):areas.length;
    const bi=areaIndex.has(ba)?areaIndex.get(ba):areas.length;
    if(ai!==bi)return ai-bi;
    if(aa===COURSE&&ba===COURSE){
      const ao=Number.isFinite(a.areaOrder)?a.areaOrder:1000+original.get(a);
      const bo=Number.isFinite(b.areaOrder)?b.areaOrder:1000+original.get(b);
      return ao-bo;
    }
    return original.get(a)-original.get(b);
  });
  sections.forEach((section,index)=>section.routeOrder=index+1);
  window.learningPath={...(window.learningPath||{}),areas,areaOf:section=>section.primaryArea||section.group||'HTML'};
  window.databaseCourse=COURSE;
  if(typeof buildNav==='function')buildNav();
  if(typeof render==='function')render();
})();