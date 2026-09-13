(()=>{
  if(window.__fastApiFromZeroAdded)return;
  window.__fastApiFromZeroAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const terminal=text=>`<pre style="margin:0;padding:16px;border-radius:12px;background:#07111f;color:#86efac;font:13px/1.6 ui-monospace,SFMono-Regular,Consolas,monospace;white-space:pre-wrap;overflow:auto">${text}</pre>`;
  const response=(method,path,status,body)=>`<section style="font-family:system-ui;border:1px solid #cbd5e1;border-radius:12px;overflow:hidden;background:#fff;color:#0f172a"><header style="padding:10px 14px;background:#0f172a;color:#fff"><strong style="color:#2dd4bf">${method}</strong> ${path} · ${status}</header><pre style="margin:0;padding:16px;background:#fff;color:#334155;white-space:pre-wrap">${body}</pre></section>`;
  const card=(title,body)=>`<article style="font-family:system-ui;max-width:540px;padding:22px;border:1px solid #99f6e4;border-radius:14px;background:#f0fdfa;color:#134e4a"><p style="margin:0 0 6px;font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase">FastAPI</p><h2 style="margin:0 0 10px">${title}</h2><div style="line-height:1.55">${body}</div></article>`;
  const F=(topic,name,description,code,preview,tip)=>T(topic,name,description,code,preview,[],{kind:'FastAPI',tip});

  sections.push({
    title:'Backend FastAPI · 0. Desde cero',
    navLabel:'Desde cero',
    group:'Backend',
    primaryArea:'Backend',
    areaOrder:80,
    description:'Punto de entrada para quien nunca ha creado una API con Python. Explica el entorno, la estructura de archivos, el primer endpoint, Pydantic, parámetros, errores, documentación automática y tres ejercicios progresivos antes de conectar PostgreSQL.',
    quote:'“Primero entiende qué archivo recibe HTTP, cuál valida los datos y qué respuesta verá el cliente.”',
    challenge:'Crea una API desde una carpeta vacía, publica GET /, valida un producto y completa un CRUD en memoria antes de continuar con PostgreSQL.',
    items:[
      F(
        'Entorno',
        'Qué necesitas instalar y por qué',
        'Python ejecuta la aplicación. venv crea un entorno aislado para no mezclar dependencias entre proyectos. pip instala FastAPI y Uvicorn. FastAPI define rutas y validación; Uvicorn es el servidor ASGI que escucha conexiones HTTP y entrega cada solicitud a la aplicación.',
        'python --version\npython -m pip --version\n\nmkdir api_fastapi\ncd api_fastapi\npython -m venv .venv\n\n# Windows PowerShell\n.\\.venv\\Scripts\\Activate.ps1\n\n# Linux / macOS\nsource .venv/bin/activate\n\npython -m pip install fastapi "uvicorn[standard]"\npython -m pip freeze > requirements.txt',
        terminal('(.venv) api_fastapi> python -m pip install fastapi "uvicorn[standard]"\nSuccessfully installed fastapi ... uvicorn ...'),
        'Activa el entorno virtual antes de instalar paquetes o ejecutar el servidor.'
      ),
      F(
        'Carpetas',
        'Estructura mínima que vas a construir',
        'Empieza con una estructura pequeña pero explícita. app/main.py crea la aplicación y registra routers. schemas contiene contratos Pydantic. api/routes recibe HTTP. services concentra reglas cuando empiezan a crecer. Más adelante models y core/database conectarán SQLAlchemy y PostgreSQL. tests contiene pruebas automáticas.',
        'api_fastapi/\n├── .venv/\n├── .gitignore\n├── requirements.txt\n├── app/\n│   ├── __init__.py\n│   ├── main.py\n│   ├── api/\n│   │   └── routes/\n│   ├── schemas/\n│   ├── services/\n│   ├── models/\n│   └── core/\n└── tests/',
        terminal('app/main.py          → arranque y routers\napp/api/routes/       → endpoints HTTP\napp/schemas/          → entrada y salida\napp/services/         → reglas de negocio\napp/models/           → tablas ORM\napp/core/             → configuración y base de datos\ntests/                → pruebas'),
        'No crees diez capas vacías por obligación. La ruta las introduce cuando aparece una responsabilidad real.'
      ),
      F(
        'Primer endpoint',
        'Hola API en app/main.py',
        'FastAPI() crea la aplicación ASGI. El decorador @app.get("/") registra una operación GET asociada a la raíz. Cuando Uvicorn recibe GET /, FastAPI encuentra la ruta, ejecuta root y serializa el diccionario de Python como JSON con estado 200.',
        '/* app/main.py */\nfrom fastapi import FastAPI\n\napp = FastAPI(title="Mi primera API")\n\n@app.get("/")\ndef root():\n    return {"message": "Hola desde FastAPI"}\n\n# Terminal\nuvicorn app.main:app --reload',
        response('GET','/','200','{\n  "message": "Hola desde FastAPI"\n}'),
        'Abre http://127.0.0.1:8000/ y confirma primero la respuesta JSON antes de crear más archivos.'
      ),
      F(
        'Parámetros',
        'Path y query parameters',
        'Un parámetro dentro de la URL como /products/{product_id} es un path parameter. Un parámetro opcional como q llega por query string. Las anotaciones de tipo permiten a FastAPI convertir y validar los valores antes de llamar la función. Si product_id no puede convertirse a int, la función ni siquiera se ejecuta.',
        '/* app/main.py */\nfrom fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get("/products/{product_id}")\ndef get_product(product_id: int, q: str | None = None):\n    return {\n        "id": product_id,\n        "search": q\n    }',
        response('GET','/products/7?q=teclado','200','{\n  "id": 7,\n  "search": "teclado"\n}'),
        'Prueba /products/abc para observar la validación automática del path parameter.'
      ),
      F(
        'Pydantic',
        'Validar el cuerpo de una petición',
        'BaseModel describe el contrato del JSON. Field permite añadir restricciones. FastAPI lee el body, pide a Pydantic que lo valide y solo ejecuta el endpoint cuando los datos cumplen el esquema. Esto evita repetir comprobaciones manuales de tipo y también alimenta la documentación OpenAPI.',
        '/* app/schemas/product.py */\nfrom pydantic import BaseModel, Field\n\nclass ProductCreate(BaseModel):\n    name: str = Field(min_length=2, max_length=120)\n    price: float = Field(gt=0)\n    stock: int = Field(ge=0)\n\n/* app/main.py */\nfrom app.schemas.product import ProductCreate\n\n@app.post("/products", status_code=201)\ndef create_product(data: ProductCreate):\n    return {"id": 1, **data.model_dump()}',
        response('POST','/products','201','{\n  "id": 1,\n  "name": "Teclado",\n  "price": 180000,\n  "stock": 4\n}'),
        'Envía price -1 desde /docs para ver un 422 generado antes de entrar al endpoint.'
      ),
      F(
        'Routers',
        'Separar endpoints de main.py',
        'APIRouter permite mover una familia de endpoints a otro archivo sin crear otra aplicación. main.py importa el router y lo registra con include_router. El prefijo /products y la etiqueta se declaran una sola vez. Así main.py conserva el arranque y cada funcionalidad controla sus rutas.',
        '/* app/api/routes/products.py */\nfrom fastapi import APIRouter\n\nrouter = APIRouter(prefix="/products", tags=["products"])\n\n@router.get("")\ndef list_products():\n    return [{"id": 1, "name": "Teclado"}]\n\n/* app/main.py */\nfrom fastapi import FastAPI\nfrom app.api.routes.products import router as products_router\n\napp = FastAPI()\napp.include_router(products_router)',
        response('GET','/products','200','[\n  {"id": 1, "name": "Teclado"}\n]'),
        'Cuando una funcionalidad tenga varias rutas, dale su propio router en lugar de llenar main.py.'
      ),
      F(
        'Errores',
        'Responder 404 con HTTPException',
        'Un endpoint no debe devolver 200 cuando el recurso no existe. HTTPException interrumpe la operación y genera una respuesta HTTP con el status_code y detalle definidos. La validación de entrada y los errores de dominio son problemas distintos: un id bien formado puede ser válido y aun así no existir.',
        '/* app/api/routes/products.py */\nfrom fastapi import APIRouter, HTTPException\n\nproducts = {1: {"id": 1, "name": "Teclado"}}\n\n@router.get("/{product_id}")\ndef get_product(product_id: int):\n    product = products.get(product_id)\n    if product is None:\n        raise HTTPException(status_code=404, detail="Producto no encontrado")\n    return product',
        response('GET','/products/99','404','{\n  "detail": "Producto no encontrado"\n}'),
        'Usa 404 para ausencia de recurso; no conviertas todos los errores de negocio en 500.'
      ),
      F(
        'Documentación',
        'Swagger UI y OpenAPI automáticos',
        'FastAPI construye un esquema OpenAPI usando rutas, métodos, parámetros, modelos y respuestas. /docs renderiza Swagger UI y /redoc una documentación alternativa. Estas pantallas permiten probar la API durante el aprendizaje, pero no sustituyen las pruebas automáticas.',
        'uvicorn app.main:app --reload\n\n# navegador\nhttp://127.0.0.1:8000/docs\nhttp://127.0.0.1:8000/redoc\nhttp://127.0.0.1:8000/openapi.json',
        card('Documentación interactiva','<p style="margin:0">GET /products</p><p style="margin:6px 0 0">POST /products</p><p style="margin:6px 0 0">Schemas: ProductCreate</p>'),
        'Comprueba que cada schema aparezca con sus restricciones y que los status codes importantes estén documentados.'
      ),
      F(
        'Ejercicio 1',
        'Hola API sin copiar el ejemplo',
        'Crea otro proyecto llamado saludo_api. Debe responder tu nombre y un mensaje en GET /. Añade GET /health con {"status":"ok"}. El objetivo es dominar entorno, main.py, Uvicorn y respuesta JSON antes de introducir Pydantic.',
        'Resultado requerido:\nGET /\n→ {"name":"Dilan","message":"API funcionando"}\n\nGET /health\n→ {"status":"ok"}\n\nComprobación:\nuvicorn app.main:app --reload',
        response('GET','/health','200','{\n  "status": "ok"\n}'),
        'Haz un commit cuando puedas reconstruirlo desde una carpeta vacía sin revisar el código anterior.'
      ),
      F(
        'Ejercicio 2',
        'Producto validado con Pydantic',
        'Crea ProductCreate con name, price y stock. POST /products debe devolver 201 y un id ficticio. Prueba nombre de un carácter, precio cero y stock negativo. Anota qué casos devuelve 422 y qué mensaje produce Pydantic.',
        'Archivos objetivo:\napp/main.py\napp/schemas/product.py\n\nCasos:\n1. válido → 201\n2. name="A" → 422\n3. price=0 → 422\n4. stock=-1 → 422',
        response('POST','/products','201','{\n  "id": 1,\n  "name": "Mouse",\n  "price": 75000,\n  "stock": 8\n}'),
        'No agregues todavía base de datos. Primero demuestra que entiendes el contrato HTTP.'
      ),
      F(
        'Ejercicio 3',
        'CRUD en memoria antes de PostgreSQL',
        'Construye un router products con GET lista, GET detalle, POST, PATCH y DELETE usando un diccionario o lista en memoria. El objetivo no es persistir datos todavía, sino entender método HTTP, status code, validación y separación de archivos. Después pasarás a SQLAlchemy y PostgreSQL sin cambiar el contrato externo.',
        'app/\n├── main.py\n├── api/routes/products.py\n├── schemas/product.py\n└── services/products.py\n\nGET    /products\nGET    /products/{id}\nPOST   /products\nPATCH  /products/{id}\nDELETE /products/{id}',
        card('CRUD mínimo','<ul style="margin:0;padding-left:20px"><li>Listar productos</li><li>Crear con 201</li><li>Editar con PATCH</li><li>Eliminar con 204</li><li>404 cuando no existe</li></ul>'),
        'Cuando funcione, continúa con la ruta de PostgreSQL, SQLAlchemy, Alembic, autenticación, pruebas y despliegue que aparece después en la categoría FastAPI.'
      )
    ]
  });
})();
