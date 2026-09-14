(()=>{
  if(window.__databaseFromZeroAdded)return;
  window.__databaseFromZeroAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const result=(engine,title,body)=>`<section style="font-family:system-ui;max-width:720px;padding:20px;border:1px solid #cbd5e1;border-radius:14px;background:#fff;color:#0f172a"><p style="margin:0 0 7px;color:#0f766e;font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase">${engine}</p><h3 style="margin:0 0 10px">${title}</h3><div style="color:#475569;line-height:1.55">${body}</div></section>`;
  const D=(engine,topic,name,description,code,preview,tip='')=>T(topic,name,description,code,preview,[],{kind:'Base de datos',tip,databaseEngine:engine});
  const section=(title,engine,order,description,challenge,items)=>({title,description,quote:'“Primero entiende el modelo de datos; después aprende la sintaxis.”',challenge,group:'Base de datos',primaryArea:'Base de datos',course:'Base de datos',databaseEngine:engine,areaOrder:order,items});

  sections.push(
    section(
      'Base de datos · 0. Desde cero','Fundamentos',0,
      'Repaso inicial para entender qué problema resuelve una base de datos, cómo se modelan los datos y por qué existen motores relacionales, documentales, de grafos, clave-valor y wide-column.',
      'Modela un catálogo de productos en al menos tres estilos: tabla relacional, documento y clave-valor.',
      [
        D('Fundamentos','DBMS','Qué es una base de datos','Una base de datos conserva información de forma organizada; el DBMS controla almacenamiento, consultas, concurrencia, seguridad y recuperación.',`Dato -> modelo -> motor -> consulta -> resultado`,result('Fundamentos','Flujo básico','<strong>Aplicación</strong> → DBMS → almacenamiento. El DBMS valida, busca, ordena, modifica y protege los datos.')),
        D('Fundamentos','modelos','Relacional vs NoSQL','SQL organiza datos en tablas y relaciones. NoSQL agrupa varias familias: documentos, grafos, clave-valor y wide-column.',`Relacional: Oracle, PostgreSQL\nDocumentos: MongoDB\nGrafos: Neo4j\nClave-valor: Redis\nWide-column: Cassandra`,result('Fundamentos','Modelos de datos','<ul><li>Tablas: filas y columnas</li><li>Documentos: objetos flexibles</li><li>Grafos: nodos y relaciones</li><li>Clave-valor: acceso directo por clave</li><li>Wide-column: particiones distribuidas</li></ul>')),
        D('Fundamentos','CRUD','CRUD es la idea común','Aunque la sintaxis cambia, casi todos los motores necesitan crear, leer, actualizar y eliminar información.',`CREATE / INSERT\nREAD / SELECT / FIND\nUPDATE\nDELETE`,result('Fundamentos','CRUD','Crear → consultar → actualizar → eliminar es el recorrido mínimo que practicarás en cada motor.')),
        D('Fundamentos','claves e índices','Claves, restricciones e índices','Las claves identifican datos; las restricciones protegen reglas; los índices aceleran búsquedas a cambio de espacio y trabajo extra en escrituras.',`PRIMARY KEY -> identifica\nUNIQUE -> evita duplicados\nFOREIGN KEY -> relaciona\nINDEX -> acelera búsquedas`,result('Fundamentos','Integridad y rendimiento','Primero asegura datos correctos con claves y restricciones; luego crea índices según las consultas reales.')),
        D('Fundamentos','transacciones','Transacciones y consistencia','Una transacción agrupa operaciones que deben confirmarse o revertirse juntas. En sistemas distribuidos también importa el equilibrio entre consistencia, disponibilidad y particiones.',`BEGIN\n  cambiar dato A\n  cambiar dato B\nCOMMIT   -- confirma\nROLLBACK -- revierte`,result('Fundamentos','Transacción','Las operaciones relacionadas se tratan como una unidad para evitar estados intermedios inválidos.')),
        D('Fundamentos','elección','Cómo elegir un motor','No existe una base “mejor” para todo. Elige según estructura, volumen, patrones de consulta, consistencia, latencia, distribución y operación.',`Datos relacionales fuertes -> PostgreSQL / Oracle\nJSON flexible -> MongoDB\nRelaciones profundas -> Neo4j\nCache y baja latencia -> Redis\nEscala distribuida por partición -> Cassandra`,result('Fundamentos','Regla práctica','Empieza por el patrón de consulta y la consistencia necesaria; después compara motores.'))
      ]
    ),

    section(
      'Base de datos · 1. Oracle desde cero','Oracle',100,
      'Oracle desde cero: conexión, tablas, tipos, secuencias/identidad, CRUD, restricciones, índices y transacciones usando SQL.',
      'Crea un esquema sencillo de productos y realiza CRUD con COMMIT y ROLLBACK.',
      [
        D('Oracle','SQLcl / SQL*Plus','Conectarse a Oracle','Oracle se trabaja normalmente con SQL Developer, SQLcl o SQL*Plus. La sesión se abre con un usuario del esquema.',`sql usuario/password@localhost:1521/FREEPDB1\n-- o con SQL*Plus\nsqlplus usuario/password@localhost:1521/FREEPDB1`,result('Oracle','Conexión','Una vez autenticado, cada instrucción SQL se ejecuta dentro del esquema del usuario.')),
        D('Oracle','CREATE TABLE','Crear una tabla','VARCHAR2 es habitual para texto; NUMBER maneja números; una columna identity puede generar identificadores.',`CREATE TABLE productos (\n  id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,\n  nombre VARCHAR2(120) NOT NULL,\n  precio NUMBER(10,2) NOT NULL,\n  stock NUMBER DEFAULT 0 CHECK (stock >= 0),\n  creado_en DATE DEFAULT SYSDATE\n);`,result('Oracle','Tabla productos','id · nombre · precio · stock · creado_en')),
        D('Oracle','INSERT / SELECT','Crear y consultar filas','INSERT agrega filas y SELECT permite escoger columnas, filtrar y ordenar.',`INSERT INTO productos (nombre, precio, stock)\nVALUES ('Teclado', 180000, 4);\n\nSELECT id, nombre, precio\nFROM productos\nWHERE stock > 0\nORDER BY precio DESC;`,result('Oracle','Resultado','<table><tr><th>ID</th><th>Nombre</th><th>Precio</th></tr><tr><td>1</td><td>Teclado</td><td>180000</td></tr></table>')),
        D('Oracle','UPDATE / DELETE','Actualizar y eliminar','UPDATE cambia filas que cumplan el WHERE. DELETE elimina filas; olvidar WHERE puede afectar toda la tabla.',`UPDATE productos\nSET stock = stock + 2\nWHERE id = 1;\n\nDELETE FROM productos\nWHERE id = 9;`,result('Oracle','Cambio','El producto 1 aumenta su stock. Solo el id 9 se elimina.')),
        D('Oracle','INDEX / CONSTRAINT','Índices y restricciones','Los índices aceleran búsquedas; UNIQUE, CHECK y claves protegen integridad.',`CREATE UNIQUE INDEX ux_productos_nombre\nON productos(nombre);\n\nALTER TABLE productos ADD CONSTRAINT ck_precio_positivo\nCHECK (precio >= 0);`,result('Oracle','Reglas','Nombre sin duplicados y precio no negativo.')),
        D('Oracle','COMMIT / ROLLBACK','Controlar transacciones','Oracle permite confirmar o revertir cambios pendientes.',`UPDATE productos SET stock = stock - 1 WHERE id = 1;\nROLLBACK;\n\nUPDATE productos SET stock = stock - 1 WHERE id = 1;\nCOMMIT;`,result('Oracle','Transacción','ROLLBACK deshace; COMMIT hace permanente el cambio de la sesión.'))
      ]
    ),

    section(
      'Base de datos · 2. PostgreSQL desde cero','PostgreSQL',200,
      'PostgreSQL desde cero: psql, bases, tablas, CRUD, RETURNING, joins, índices, EXPLAIN y transacciones.',
      'Crea una base tienda, relaciona categorías con productos y revisa una consulta con EXPLAIN.',
      [
        D('PostgreSQL','psql','Conectarse con psql','psql es el cliente de terminal. Puedes entrar al servidor y luego cambiar de base.',`psql -U postgres\nCREATE DATABASE tienda;\n\\c tienda`,result('PostgreSQL','Conexión','Ahora las sentencias se ejecutan dentro de la base tienda.')),
        D('PostgreSQL','CREATE TABLE','Crear tablas y claves','PostgreSQL ofrece identity, tipos ricos y restricciones declarativas.',`CREATE TABLE categorias (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  nombre text UNIQUE NOT NULL\n);\n\nCREATE TABLE productos (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  categoria_id bigint REFERENCES categorias(id),\n  nombre text NOT NULL,\n  precio numeric(12,2) CHECK (precio >= 0),\n  stock integer DEFAULT 0 CHECK (stock >= 0)\n);`,result('PostgreSQL','Esquema','categorias 1 → N productos mediante categoria_id.')),
        D('PostgreSQL','INSERT RETURNING','Insertar y recuperar el id','RETURNING permite obtener la fila creada sin una consulta adicional.',`INSERT INTO categorias (nombre)\nVALUES ('Periféricos')\nRETURNING id, nombre;`,result('PostgreSQL','RETURNING','<code>1 | Periféricos</code>')),
        D('PostgreSQL','JOIN','Consultar relaciones','JOIN combina filas relacionadas usando las claves.',`SELECT p.nombre, c.nombre AS categoria, p.precio\nFROM productos p\nJOIN categorias c ON c.id = p.categoria_id\nWHERE p.stock > 0\nORDER BY p.precio DESC;`,result('PostgreSQL','JOIN','Teclado · Periféricos · 180000')),
        D('PostgreSQL','INDEX / EXPLAIN','Índices y plan de ejecución','Crea índices sobre filtros frecuentes y usa EXPLAIN para revisar cómo planea resolver la consulta.',`CREATE INDEX idx_productos_categoria\nON productos(categoria_id);\n\nEXPLAIN SELECT *\nFROM productos\nWHERE categoria_id = 1;`,result('PostgreSQL','Plan','EXPLAIN muestra si el motor usa un escaneo secuencial o un índice.')),
        D('PostgreSQL','BEGIN / COMMIT','Transacciones','BEGIN abre una transacción explícita; COMMIT confirma y ROLLBACK revierte.',`BEGIN;\nUPDATE productos SET stock = stock - 1 WHERE id = 1;\nUPDATE productos SET stock = stock + 1 WHERE id = 2;\nCOMMIT;`,result('PostgreSQL','Transacción','Los dos cambios se confirman juntos.'))
      ]
    ),

    section(
      'Base de datos · 3. MongoDB desde cero','MongoDB',300,
      'MongoDB desde cero: documentos BSON, colecciones, mongosh, CRUD, índices y aggregation pipeline.',
      'Guarda productos como documentos, filtra por stock y construye una agregación por categoría.',
      [
        D('MongoDB','mongosh','Entrar a MongoDB','mongosh abre una consola JavaScript para trabajar con bases y colecciones.',`mongosh\nuse tienda\nshow collections`,result('MongoDB','Conexión','La base tienda se crea realmente cuando recibe datos.')),
        D('MongoDB','insertOne','Insertar documentos','Un documento puede contener campos, arreglos y objetos anidados sin declarar una tabla antes.',`db.productos.insertOne({\n  nombre: 'Teclado',\n  precio: 180000,\n  stock: 4,\n  categoria: { id: 1, nombre: 'Periféricos' },\n  etiquetas: ['mecánico', 'rgb']\n});`,result('MongoDB','Documento','{ nombre, precio, stock, categoria: {...}, etiquetas: [...] }')),
        D('MongoDB','find','Buscar y proyectar','find recibe un filtro y opcionalmente una proyección para escoger campos.',`db.productos.find(\n  { stock: { $gt: 0 }, precio: { $lte: 200000 } },\n  { nombre: 1, precio: 1, _id: 0 }\n).sort({ precio: -1 });`,result('MongoDB','Consulta','{ nombre: "Teclado", precio: 180000 }')),
        D('MongoDB','updateOne / deleteOne','Actualizar y eliminar documentos','$set cambia campos y $inc incrementa valores. deleteOne elimina el primer documento que coincide.',`db.productos.updateOne(\n  { nombre: 'Teclado' },\n  { $inc: { stock: 2 }, $set: { activo: true } }\n);\n\ndb.productos.deleteOne({ nombre: 'Producto temporal' });`,result('MongoDB','Cambio','stock aumenta en 2 y activo queda en true.')),
        D('MongoDB','createIndex','Crear índices','Los índices ayudan a filtros y ordenamientos frecuentes. unique puede impedir duplicados.',`db.productos.createIndex({ nombre: 1 }, { unique: true });\ndb.productos.createIndex({ 'categoria.id': 1, precio: -1 });`,result('MongoDB','Índices','Índice único por nombre e índice compuesto por categoría + precio.')),
        D('MongoDB','aggregate','Aggregation pipeline','El pipeline transforma documentos por etapas como $match, $group, $sort y $project.',`db.productos.aggregate([\n  { $match: { stock: { $gt: 0 } } },\n  { $group: { _id: '$categoria.nombre', total: { $sum: 1 }, promedio: { $avg: '$precio' } } },\n  { $sort: { total: -1 } }\n]);`,result('MongoDB','Agregación','Periféricos → total: 4 · promedio: 152500'))
      ]
    ),

    section(
      'Base de datos · 4. Neo4j desde cero','Neo4j',400,
      'Neo4j desde cero: nodos, etiquetas, propiedades, relaciones y consultas de patrones con Cypher.',
      'Modela usuarios que compran productos y consulta recomendaciones por relaciones compartidas.',
      [
        D('Neo4j','cypher-shell','Conectarse a Neo4j','cypher-shell permite enviar consultas Cypher desde la terminal.',`cypher-shell -a neo4j://localhost:7687 -u neo4j -p password`,result('Neo4j','Conexión','Cypher trabaja directamente con patrones de nodos y relaciones.')),
        D('Neo4j','CREATE','Crear nodos y relaciones','Las etiquetas clasifican nodos y las relaciones expresan conexiones con dirección y propiedades.',`CREATE (u:Usuario {id: 1, nombre: 'Ana'});\nCREATE (p:Producto {id: 10, nombre: 'Teclado'});\nMATCH (u:Usuario {id: 1}), (p:Producto {id: 10})\nCREATE (u)-[:COMPRO {cantidad: 1}]->(p);`,result('Neo4j','Grafo','Ana ──COMPRO──▶ Teclado')),
        D('Neo4j','MATCH','Consultar patrones','MATCH describe la forma del grafo que quieres encontrar.',`MATCH (u:Usuario)-[c:COMPRO]->(p:Producto)\nWHERE u.id = 1\nRETURN p.nombre, c.cantidad\nORDER BY p.nombre;`,result('Neo4j','Patrón','Usuario → COMPRO → Producto')),
        D('Neo4j','MERGE','Crear solo si no existe','MERGE busca un patrón y lo crea cuando no existe; es útil para cargas idempotentes.',`MERGE (c:Categoria {nombre: 'Periféricos'})\nMERGE (p:Producto {id: 10})\nMERGE (p)-[:PERTENECE_A]->(c);`,result('Neo4j','MERGE','La categoría y la relación se reutilizan si ya existen.')),
        D('Neo4j','CONSTRAINT / INDEX','Restricciones e índices','Una restricción unique protege identificadores y también crea soporte de búsqueda.',`CREATE CONSTRAINT usuario_id_unique IF NOT EXISTS\nFOR (u:Usuario) REQUIRE u.id IS UNIQUE;\n\nCREATE INDEX producto_nombre IF NOT EXISTS\nFOR (p:Producto) ON (p.nombre);`,result('Neo4j','Integridad','Usuario.id único e índice para búsquedas por nombre de producto.')),
        D('Neo4j','camino','Consultar recomendaciones','Los grafos brillan cuando la pregunta depende de varios saltos de relaciones.',`MATCH (yo:Usuario {id: 1})-[:COMPRO]->(:Producto)<-[:COMPRO]-(otro:Usuario)-[:COMPRO]->(recomendado:Producto)\nWHERE NOT (yo)-[:COMPRO]->(recomendado)\nRETURN recomendado.nombre, count(*) AS coincidencias\nORDER BY coincidencias DESC;`,result('Neo4j','Recomendación','Encuentra productos comprados por usuarios con gustos compartidos.'))
      ]
    ),

    section(
      'Base de datos · 5. Redis desde cero','Redis',500,
      'Redis desde cero: claves, strings, expiración, hashes, listas, sets y transacciones simples para caché y datos de baja latencia.',
      'Construye una caché de producto con TTL y un carrito usando hashes.',
      [
        D('Redis','redis-cli','Conectarse a Redis','redis-cli abre la consola y PING comprueba que el servidor responde.',`redis-cli\nPING`,result('Redis','PING','<code>PONG</code>')),
        D('Redis','SET / GET / EX','Guardar una clave con expiración','SET guarda un string. EX añade un TTL en segundos para cachés.',`SET producto:1 '{"nombre":"Teclado","precio":180000}' EX 300\nGET producto:1\nTTL producto:1`,result('Redis','Caché','producto:1 vive 300 segundos y luego expira automáticamente.')),
        D('Redis','HASH','Modelar objetos con hashes','HSET guarda varios campos bajo una misma clave y HGETALL los recupera.',`HSET carrito:42 producto:1 2 producto:8 1\nHGETALL carrito:42`,result('Redis','Hash','carrito:42 → producto:1=2 · producto:8=1')),
        D('Redis','LIST','Colas simples con listas','LPUSH/RPUSH agregan valores y LPOP/RPOP los extraen. Para colas robustas conviene revisar Redis Streams.',`RPUSH tareas email:1001 email:1002\nLPOP tareas\nLRANGE tareas 0 -1`,result('Redis','Lista','La primera tarea sale de la cola y las restantes permanecen.')),
        D('Redis','SET','Conjuntos sin duplicados','SADD agrega miembros únicos. SISMEMBER y SMEMBERS permiten consultar pertenencia.',`SADD producto:1:tags mecanico rgb oferta\nSISMEMBER producto:1:tags rgb\nSMEMBERS producto:1:tags`,result('Redis','Set','mecanico · rgb · oferta, sin valores repetidos.')),
        D('Redis','MULTI / EXEC','Agrupar comandos','MULTI pone comandos en cola y EXEC los ejecuta juntos. No equivale a una transacción SQL con aislamiento completo.',`MULTI\nDECRBY stock:1 1\nINCR ventas:1\nEXEC`,result('Redis','MULTI/EXEC','Los comandos encolados se ejecutan como una unidad de ejecución.'))
      ]
    ),

    section(
      'Base de datos · 6. Cassandra desde cero','Cassandra',600,
      'Apache Cassandra desde cero: keyspaces, particiones, clustering keys, tablas orientadas a consultas, CRUD y consistencia distribuida.',
      'Diseña una tabla para consultar pedidos por cliente y fecha sin joins.',
      [
        D('Cassandra','cqlsh','Conectarse con CQL','cqlsh es la consola para ejecutar CQL, un lenguaje parecido a SQL pero diseñado para un modelo distribuido diferente.',`cqlsh\nDESCRIBE CLUSTER;`,result('Cassandra','Conexión','CQL parece SQL, pero el diseño parte de las consultas y particiones.')),
        D('Cassandra','KEYSPACE','Crear un keyspace','El keyspace define replicación. NetworkTopologyStrategy es habitual en despliegues reales.',`CREATE KEYSPACE tienda\nWITH replication = {\n  'class': 'NetworkTopologyStrategy',\n  'datacenter1': 3\n};\n\nUSE tienda;`,result('Cassandra','Keyspace','tienda replica datos según la estrategia configurada.')),
        D('Cassandra','PRIMARY KEY','Diseñar por consulta','La partition key decide dónde viven los datos; las clustering columns ordenan filas dentro de la partición.',`CREATE TABLE pedidos_por_cliente (\n  cliente_id uuid,\n  fecha timestamp,\n  pedido_id uuid,\n  total decimal,\n  estado text,\n  PRIMARY KEY ((cliente_id), fecha, pedido_id)\n) WITH CLUSTERING ORDER BY (fecha DESC);`,result('Cassandra','Partición','cliente_id → partición; dentro de ella, pedidos ordenados por fecha.')),
        D('Cassandra','INSERT / SELECT','Escribir y consultar por partición','Las consultas eficientes incluyen la partition key para evitar recorrer nodos innecesariamente.',`INSERT INTO pedidos_por_cliente (cliente_id, fecha, pedido_id, total, estado)\nVALUES (11111111-1111-1111-1111-111111111111, toTimestamp(now()), uuid(), 250000, 'nuevo');\n\nSELECT fecha, pedido_id, total, estado\nFROM pedidos_por_cliente\nWHERE cliente_id = 11111111-1111-1111-1111-111111111111\nLIMIT 20;`,result('Cassandra','Consulta','Obtiene los pedidos recientes de una sola partición de cliente.')),
        D('Cassandra','UPDATE / DELETE','Actualizar y eliminar','UPDATE y DELETE también deben aprovechar la clave primaria para localizar datos con precisión.',`UPDATE pedidos_por_cliente\nSET estado = 'pagado'\nWHERE cliente_id = 11111111-1111-1111-1111-111111111111\n  AND fecha = '2026-09-13T20:00:00Z'\n  AND pedido_id = 22222222-2222-2222-2222-222222222222;`,result('Cassandra','Actualización','Se modifica una fila concreta dentro de la partición del cliente.')),
        D('Cassandra','consistencia','Consistencia configurable','Cassandra permite ajustar el consistency level por operación. Más consistencia puede implicar más coordinación y latencia.',`CONSISTENCY QUORUM;\nSELECT * FROM pedidos_por_cliente\nWHERE cliente_id = 11111111-1111-1111-1111-111111111111;`,result('Cassandra','QUORUM','La operación espera respuestas suficientes según el nivel de consistencia elegido.'))
      ]
    ),

    section(
      'Base de datos · 7. Comparativa y proyecto','Comparativa',700,
      'Cierra el repaso comparando los seis motores y practicando cuándo conviene combinarlos en una arquitectura real.',
      'Diseña una tienda: PostgreSQL u Oracle como fuente principal, Redis como caché y Neo4j para recomendaciones; explica cuándo MongoDB o Cassandra serían mejores.',
      [
        D('Comparativa','mapa mental','Qué representa “producto” en cada motor','La misma entidad cambia de forma según el modelo y la consulta que quieres optimizar.',`Oracle/PostgreSQL -> fila en tabla\nMongoDB -> documento\nNeo4j -> nodo conectado\nRedis -> clave/hash de acceso rápido\nCassandra -> fila dentro de una partición orientada a consulta`,result('Comparativa','Un dato, varios modelos','El modelo correcto depende de cómo necesitas consultar y actualizar el dato.')),
        D('Comparativa','casos de uso','Cuándo elegir cada uno','Oracle destaca en entornos empresariales y ecosistema Oracle; PostgreSQL es relacional y extensible; MongoDB facilita documentos; Neo4j relaciones profundas; Redis latencia baja; Cassandra distribución masiva.',`Oracle      -> core transaccional empresarial\nPostgreSQL  -> relacional general y avanzado\nMongoDB     -> documentos flexibles\nNeo4j       -> grafos y rutas\nRedis       -> cache, sesiones, contadores\nCassandra   -> escrituras distribuidas y grandes particiones`,result('Comparativa','Selección','No elijas por moda: define consultas, consistencia, volumen y operación primero.')),
        D('Comparativa','polyglot persistence','Combinar motores con responsabilidad clara','Un sistema puede usar más de un motor si cada uno resuelve una necesidad distinta, evitando duplicación sin control.',`PostgreSQL -> pedidos y pagos\nRedis -> cache y sesiones\nNeo4j -> recomendaciones\nObject storage -> archivos`,result('Comparativa','Arquitectura','Cada motor tiene una responsabilidad; la fuente de verdad debe quedar explícita.')),
        D('Comparativa','práctica final','Proyecto de repaso','Implementa el mismo catálogo en dos motores y documenta diferencias de modelo, consulta e índices.',`1. Define consultas principales\n2. Modela datos\n3. Crea esquema/colección/grafo\n4. Inserta datos\n5. Ejecuta CRUD\n6. Agrega índices\n7. Explica consistencia y backups`,result('Comparativa','Checklist final','Si puedes justificar el modelo y las consultas, ya no estás aprendiendo solo sintaxis.'))
      ]
    )
  );
})();
