(()=>{
  if(window.__vscodeToolsSectionAdded)return;
  window.__vscodeToolsSectionAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const COURSE='Herramientas';
  const file=(path,method,detail,command='')=>({path,method,detail,command});
  const preview=(title,lines=[])=>`<section style="font-family:system-ui;padding:18px;border:1px solid #38bdf8;border-radius:14px;background:#07111f;color:#e5edf8"><strong style="display:block;margin-bottom:10px;color:#7dd3fc">${title}</strong><div style="display:grid;gap:7px">${lines.map(line=>`<div style="padding:8px 10px;border:1px solid #23364d;border-radius:8px;background:#0b1728">${line}</div>`).join('')}</div></section>`;
  const V=(topic,name,description,code,meta={})=>window.T(topic,name,description,code,meta.preview||preview(name,meta.previewLines||['Instala o configura la herramienta.','Guarda la configuración en el proyecto.','Prueba el cambio antes de continuar.']),[],{
    kind:COURSE,
    tip:meta.tip||'Haz la configuración en un proyecto de práctica. Si un ajuste es solo para ese proyecto, guárdalo en .vscode/settings.json en lugar de cambiar toda tu instalación de VS Code.',
    guide:meta.guide||[],
    guideTitle:'Dónde se configura cada cosa',
    codeLabel:meta.codeLabel||'Configuración y comandos',
    filesToCreate:meta.files||[],
    filesToCreateTitle:'Archivos que se crean en esta lección',
    filesToCreateStatus:(meta.files||[]).length?'Crea estos archivos para que la configuración viaje con el proyecto.':'No necesitas crear archivos nuevos; instala o configura la herramienta desde VS Code.'
  });
  const add=(title,areaOrder,description,challenge,items)=>sections.push({
    title,
    navLabel:title.replace(/^Herramientas\s*·\s*/,''),
    description,
    quote:'“Una buena herramienta no reemplaza entender el código: reduce trabajo repetitivo y hace visibles los problemas antes.”',
    challenge,
    group:COURSE,
    primaryArea:COURSE,
    course:COURSE,
    areaOrder,
    items
  });

  add(
    'Herramientas · 0. Visual Studio Code desde cero',
    10,
    'Configura Visual Studio Code desde cero antes de instalar extensiones: abre una carpeta como workspace, distingue ajustes de usuario y de proyecto, aprende a editar settings.json y deja recomendaciones de extensiones versionadas para que otro estudiante pueda reproducir el mismo entorno.',
    'Crea un workspace de práctica que tenga ajustes propios, recomendaciones de extensiones y una estructura mínima HTML/CSS/JavaScript.',
    [
      V('VS Code','1. Workspace · abre la carpeta del proyecto, no archivos sueltos','VS Code funciona mejor cuando abres la carpeta raíz completa con File > Open Folder o con el comando code . desde la terminal. Eso permite que rutas, extensiones, ESLint, Prettier, Git y configuraciones de .vscode entiendan cuál es la raíz del proyecto. Un workspace no es otro lenguaje: es el contexto que usa el editor para aplicar ajustes y herramientas.',`mkdir practica-vscode
cd practica-vscode
code .`,{
        guide:[['Ejecutar','Terminal · carpeta donde crearás el proyecto','Crea la carpeta y abre esa carpeta completa en VS Code.'],['Revisar','Explorador de VS Code','Confirma que la carpeta practica-vscode aparece como raíz del explorador.']],
        previewLines:['Terminal → code .','VS Code abre la carpeta raíz','Extensiones y rutas trabajan con el mismo workspace']
      }),
      V('Settings','2. User Settings vs Workspace Settings','User Settings afectan todos tus proyectos. Workspace Settings afectan solamente el proyecto abierto y normalmente se guardan en .vscode/settings.json. Para una clase o repositorio conviene poner allí solo ajustes reproducibles del proyecto. Puedes abrir Settings con Ctrl+, y usar el icono Open Settings (JSON) cuando quieras editar el archivo directamente.',`// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "files.trimTrailingWhitespace": true,
  "editor.tabSize": 2
}`,{
        files:[file('.vscode/settings.json','MANUAL','Ajustes compartidos únicamente por este proyecto.')],
        guide:[['Crear','.vscode/settings.json','Guarda aquí ajustes del workspace que quieras compartir con el proyecto.'],['Abrir','VS Code · Settings','Usa Ctrl+, para comparar la interfaz gráfica con settings.json.']],
        previewLines:['User Settings → todos tus proyectos','Workspace Settings → solo este proyecto','.vscode/settings.json → configuración versionable']
      }),
      V('Extensions','3. Instalar extensiones desde la interfaz o con code --install-extension','Abre Extensions con Ctrl+Shift+X, busca la extensión y revisa siempre el publisher antes de instalar. También puedes instalar por terminal usando el identificador exacto de la extensión. Esta forma es útil para documentar un laboratorio o preparar un equipo nuevo.',`code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --list-extensions`,{
        guide:[['Ejecutar','Terminal · cualquier carpeta','Instala extensiones por su identificador y luego lista lo instalado.'],['Abrir','VS Code · Extensions','Comprueba nombre, publisher, versión y estado de cada extensión.']],
        previewLines:['Ctrl+Shift+X → Extensions','Instalar por ID → reproducible','code --list-extensions → verificar']
      }),
      V('Recommendations','4. .vscode/extensions.json · recomienda el entorno al estudiante','extensions.json no instala extensiones automáticamente. VS Code muestra una recomendación cuando alguien abre el proyecto. Es útil para que el repositorio indique qué herramientas necesita sin obligar a cada persona a usar todas las extensiones que tú tienes instaladas.',`// .vscode/extensions.json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "usernamehw.errorlens",
    "christian-kohler.path-intellisense"
  ]
}`,{
        files:[file('.vscode/extensions.json','MANUAL','Lista de extensiones recomendadas para quien abra el repositorio.')],
        guide:[['Crear','.vscode/extensions.json','Añade aquí los IDs de extensiones realmente necesarias para el proyecto.'],['Comprobar','VS Code · Extensions · Recommended','Reabre el proyecto y revisa las recomendaciones del workspace.']],
        previewLines:['Repositorio abre en VS Code','VS Code detecta extensions.json','El estudiante ve Recommended']
      }),
      V('Profiles','5. Perfil de estudio y sincronización','Los Profiles de VS Code permiten separar extensiones, ajustes, snippets y apariencia por contexto: por ejemplo Web, Python o Base de datos. Settings Sync puede sincronizar parte de la configuración entre tus equipos cuando inicias sesión. No uses el repositorio para guardar tokens o secretos personales; .vscode debe contener solo configuración segura y reproducible.',`PERFIL WEB
- HTML / CSS / JavaScript
- Prettier
- ESLint
- Error Lens
- Path Intellisense

PERFIL PYTHON
- Python
- Pylance
- herramientas del proyecto`,{
        guide:[['Abrir','VS Code · Manage · Profiles','Crea un perfil de estudio separado si quieres mantener extensiones por tipo de proyecto.'],['Revisar','.vscode/','Versiona solo ajustes del proyecto; no guardes tokens ni credenciales.']],
        previewLines:['Perfil Web → herramientas frontend','Perfil Python → herramientas Python','Settings Sync → preferencias entre equipos']
      })
    ]
  );

  add(
    'Herramientas · 1. Extensiones esenciales de VS Code',
    20,
    'Repaso práctico de las extensiones mostradas en las imágenes: Console Ninja, Error Lens, Auto Rename Tag, Image Preview, Path Intellisense y Live Share. Cada lección explica para qué sirve, cómo instalarla, qué configuración necesita y cómo comprobar que funciona.',
    'Instala las extensiones de esta sección en un proyecto de práctica y documenta cuáles usarías siempre, cuáles son opcionales y por qué.',
    [
      V('Console Ninja','1. Console Ninja · resultados JavaScript dentro del editor','Console Ninja muestra valores de console.log y otra información de ejecución junto al código mientras una aplicación JavaScript o TypeScript compatible está corriendo. Es una ayuda de depuración, no sustituye DevTools ni un debugger. Instálalo y abre un proyecto JS; después inicia la aplicación o la sesión que la extensión soporte y comprueba que los valores aparecen en el editor.',`code --install-extension WallabyJs.console-ninja

// app.js
const nombre = 'Ana';
const tecnologias = ['HTML', 'CSS', 'JS'];
console.log(nombre, tecnologias.length);`,{
        guide:[['Instalar','VS Code · Extensions','Busca Console Ninja y confirma el publisher Wallaby.js antes de instalar.'],['Modificar','app.js','Agrega console.log a un ejemplo pequeño y ejecuta el proyecto.'],['Comprobar','Editor + Output/DevTools','Verifica que el valor inline coincida con la salida real.']],
        previewLines:['app.js ejecutándose','console.log(...) → valor junto a la línea','DevTools sigue siendo la referencia completa']
      }),
      V('Error Lens','2. Error Lens · errores y warnings en la misma línea','Error Lens toma diagnósticos que VS Code ya conoce —por ejemplo de JavaScript, TypeScript o ESLint— y los hace mucho más visibles al lado de la línea. No crea reglas nuevas: muestra mejor los errores producidos por el lenguaje o por linters configurados.',`code --install-extension usernamehw.errorlens

// .vscode/settings.json
{
  "errorLens.enabled": true,
  "errorLens.messageEnabled": true
}`,{
        files:[file('.vscode/settings.json','MANUAL','Activa de forma explícita la visualización de Error Lens en este workspace.')],
        guide:[['Instalar','VS Code · Extensions','Instala Error Lens.'],['Modificar','.vscode/settings.json','Activa los mensajes para este proyecto.'],['Comprobar','archivo JavaScript con un error','Provoca un error sencillo y confirma que el diagnóstico aparece junto a la línea.']],
        previewLines:['ESLint/TypeScript detecta problema','Error Lens lo muestra inline','Corriges → desaparece el diagnóstico']
      }),
      V('Auto Rename Tag','3. Auto Rename Tag · renombrar apertura y cierre','Auto Rename Tag ayuda a mantener sincronizadas etiquetas de apertura y cierre. En versiones modernas de VS Code también existe linked editing integrado para varios lenguajes. Puedes activar editor.linkedEditing y decidir si todavía necesitas la extensión según el tipo de archivo que uses.',`code --install-extension formulahendry.auto-rename-tag

// .vscode/settings.json
{
  "editor.linkedEditing": true
}

<!-- prueba -->
<section>
  <h2>Perfil</h2>
</section>`,{
        files:[file('.vscode/settings.json','MANUAL','Activa linked editing como soporte integrado de VS Code.')],
        guide:[['Instalar','VS Code · Extensions','Instala Auto Rename Tag si lo necesitas para tus lenguajes o flujo.'],['Modificar','.vscode/settings.json','Activa editor.linkedEditing.'],['Comprobar','index.html','Cambia section por article y verifica que la etiqueta de cierre se actualice.']],
        previewLines:['Cambias <section>','Se sincroniza </section>','Menos etiquetas abiertas/cerradas por error']
      }),
      V('Image Preview','4. Image Preview · miniaturas de imágenes junto a las rutas','Image Preview muestra una vista previa de archivos de imagen cuando aparecen en rutas de HTML, CSS u otros archivos compatibles. Es especialmente útil para proyectos con muchas imágenes porque ayuda a confirmar visualmente si la ruta apunta al recurso correcto. Normalmente no necesita una configuración obligatoria para empezar.',`code --install-extension kisstkondoros.vscode-gutter-preview

<!-- index.html -->
<img src="images/avatar.png" alt="Avatar de práctica">

/* styles.css */
.hero {
  background-image: url("./images/banner.jpg");
}`,{
        guide:[['Instalar','VS Code · Extensions','Instala Image Preview / vscode-gutter-preview.'],['Crear o revisar','images/avatar.png','Usa una imagen de práctica dentro del proyecto.'],['Modificar','index.html','Escribe una ruta de imagen y confirma que la vista previa corresponde al archivo.']],
        previewLines:['Ruta de archivo en HTML/CSS','Miniatura en el editor','Detectas más rápido una imagen equivocada']
      }),
      V('Path Intellisense','5. Path Intellisense · autocompletar rutas e imports','Path Intellisense sugiere archivos y carpetas mientras escribes rutas. VS Code ya ofrece autocompletado en muchos imports JavaScript/TypeScript, pero esta extensión puede ser útil en rutas de assets y otros contextos. Puedes definir mappings para aliases del proyecto.',`code --install-extension christian-kohler.path-intellisense

// .vscode/settings.json
{
  "path-intellisense.mappings": {
    "@": "${workspaceFolder}/src"
  }
}

// ejemplo
import { crearPerfil } from '@/utils/perfil.js';`,{
        files:[file('.vscode/settings.json','MANUAL','Configura aliases que Path Intellisense debe resolver.')],
        guide:[['Instalar','VS Code · Extensions','Instala Path Intellisense.'],['Modificar','.vscode/settings.json','Declara mappings solo si tu proyecto realmente usa aliases.'],['Comprobar','src/app.js','Empieza a escribir una ruta y verifica las sugerencias.']],
        previewLines:['Escribes ./im… o @/ut…','VS Code sugiere carpetas/archivos','Seleccionas sin memorizar toda la ruta']
      }),
      V('Live Share','6. Live Share · programar con otra persona','Live Share permite compartir una sesión de VS Code para que otra persona navegue y edite el proyecto contigo. Debes iniciar sesión, comenzar una collaboration session y compartir el enlace solo con personas autorizadas. Revisa permisos de terminal y servidores compartidos, y nunca expongas .env, tokens o archivos con secretos.',`code --install-extension MS-vsliveshare.vsliveshare

PASOS
1. Inicia sesión en Live Share.
2. Start Collaboration Session.
3. Copia el enlace de invitación.
4. Revisa quién entra a la sesión.
5. Detén la sesión al terminar.`,{
        guide:[['Instalar','VS Code · Extensions','Instala Live Share y completa el inicio de sesión.'],['Ejecutar','Command Palette · Live Share: Start Collaboration Session','Inicia una sesión para una práctica controlada.'],['Revisar','.gitignore','Asegúrate de excluir .env y archivos sensibles antes de compartir el proyecto.']],
        previewLines:['Host inicia sesión','Invitado abre enlace autorizado','Ambos editan el mismo workspace en tiempo real']
      })
    ]
  );

  add(
    'Herramientas · 2. Prettier y ESLint · formato y calidad',
    30,
    'Configura Prettier y ESLint de forma reproducible. Prettier decide el formato; ESLint analiza problemas y reglas del código. La extensión de VS Code mejora la experiencia, pero el proyecto también debe instalar las dependencias npm cuando quieras que la configuración funcione igual en todos los equipos y en CI.',
    'Deja un proyecto donde npm run format y npm run lint funcionen desde terminal y también al guardar archivos en VS Code.',
    [
      V('Prettier','1. Prettier · instalar extensión y paquete del proyecto','La extensión permite formatear desde VS Code. Instalar prettier como devDependency fija una versión para el proyecto y permite ejecutar el mismo formateador desde terminal o CI. De esa forma no dependes únicamente de la versión global o de la extensión.',`code --install-extension esbenp.prettier-vscode
npm install --save-dev prettier
npx prettier --version
npx prettier . --check`,{
        guide:[['Ejecutar','Terminal · raíz del proyecto','Instala Prettier como dependencia de desarrollo y verifica la versión.'],['Instalar','VS Code · Extensions','Instala la extensión Prettier - Code formatter.'],['Modificar','package.json','npm agrega prettier a devDependencies.']],
        previewLines:['Extensión → formato en el editor','Paquete npm → formato reproducible','npx prettier . --check → verificación']
      }),
      V('Prettier config','2. .prettierrc.json · reglas de formato','Guarda las preferencias de formato en el proyecto. Así todos reciben las mismas reglas. Prettier tiene valores por defecto razonables; no necesitas cambiar muchas opciones. El objetivo es evitar discusiones manuales sobre espacios, comillas o longitud de línea.',`// .prettierrc.json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 100,
  "trailingComma": "es5"
}`,{
        files:[file('.prettierrc.json','MANUAL','Reglas de formato compartidas por el proyecto.')],
        guide:[['Crear','.prettierrc.json','Define aquí solo las decisiones de formato del equipo.'],['Comprobar','src/app.js','Formatea un archivo y revisa cómo cambian comillas, indentación y saltos de línea.']],
        previewLines:['Código desordenado','Prettier aplica reglas','.prettierrc.json mantiene el mismo formato para todos']
      }),
      V('Prettier ignore','3. .prettierignore · qué no debe formatearse','No todo debe pasar por Prettier. Archivos generados, dependencias y builds deben ignorarse. Mantener una lista explícita evita gastar tiempo recorriendo directorios grandes o modificar artefactos que no deberían editarse manualmente.',`# .prettierignore
node_modules
dist
build
coverage
*.min.js`,{
        files:[file('.prettierignore','MANUAL','Excluye dependencias y archivos generados del formateo.')],
        guide:[['Crear','.prettierignore','Lista aquí rutas que Prettier no debe procesar.'],['Ejecutar','Terminal · raíz del proyecto','Usa npx prettier . --check y confirma que las rutas ignoradas no se revisan.']],
        previewLines:['src/ → se formatea','dist/ → se ignora','node_modules/ → se ignora']
      }),
      V('Format on save','4. Formatear al guardar sin afectar otros proyectos','Configura el default formatter dentro del workspace y activa formatOnSave. Así el proyecto usa Prettier al guardar, pero otros repositorios pueden tener otra política. Si un lenguaje necesita otro formateador, puedes sobrescribir la configuración por lenguaje.',`// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "prettier.requireConfig": true
}`,{
        files:[file('.vscode/settings.json','MANUAL','Ajustes de formateo específicos del workspace.')],
        guide:[['Modificar','.vscode/settings.json','Activa Prettier al guardar para este proyecto.'],['Comprobar','src/app.js','Desordena el código, guarda y observa el formateo.']],
        previewLines:['Ctrl+S','Prettier detecta .prettierrc.json','Archivo queda formateado automáticamente']
      }),
      V('ESLint','5. ESLint · instalar el analizador de código','ESLint analiza JavaScript y puede detectar variables no usadas, errores probables y reglas de calidad. La extensión dbaeumer.vscode-eslint integra los diagnósticos con VS Code, pero el paquete eslint debe existir en el proyecto para tener una configuración reproducible.',`code --install-extension dbaeumer.vscode-eslint
npm install --save-dev eslint @eslint/js globals eslint-config-prettier
npx eslint --version`,{
        guide:[['Ejecutar','Terminal · raíz del proyecto','Instala ESLint y los paquetes usados por la configuración.'],['Instalar','VS Code · Extensions','Instala la extensión oficial ESLint de Microsoft.'],['Modificar','package.json','npm registra las dependencias en devDependencies.']],
        previewLines:['ESLint analiza el código','VS Code muestra diagnósticos','Error Lens puede hacerlos aún más visibles']
      }),
      V('ESLint flat config','6. eslint.config.mjs · configuración moderna','La configuración flat usa eslint.config.js/mjs/cjs. Este ejemplo habilita las reglas recomendadas, globals del navegador, ignora carpetas generadas y deja eslint-config-prettier al final para apagar reglas de formato que podrían chocar con Prettier.',`// eslint.config.mjs
import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default [
  { ignores: ['dist/**', 'coverage/**'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.browser
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
    }
  },
  prettier
];`,{
        files:[file('eslint.config.mjs','MANUAL','Configuración ESLint flat del proyecto.')],
        guide:[['Crear','eslint.config.mjs','Define archivos, globals, ignores y reglas de lint.'],['Ejecutar','Terminal · raíz del proyecto','Ejecuta npx eslint . para revisar todo el proyecto.']],
        previewLines:['eslint.config.mjs carga reglas','npx eslint . analiza src/','Warnings/errores llegan a VS Code']
      }),
      V('ESLint on save','7. Corregir reglas seguras de ESLint al guardar','VS Code puede solicitar a ESLint acciones de corrección al guardar. Esto es distinto de Prettier: Prettier formatea y ESLint corrige reglas que tengan autofix. source.fixAll.eslint en modo explicit evita aplicar correcciones inesperadas fuera del guardado explícito.',`// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}`,{
        files:[file('.vscode/settings.json','MANUAL','Integra format on save y las acciones de ESLint en el workspace.')],
        guide:[['Modificar','.vscode/settings.json','Añade la acción source.fixAll.eslint y los lenguajes que quieras validar.'],['Comprobar','src/app.js','Crea un warning corregible, guarda y confirma qué parte arregla ESLint y qué parte formatea Prettier.']],
        previewLines:['Guardar archivo','Prettier → formato','ESLint → reglas con autofix']
      }),
      V('Scripts npm','8. Scripts npm · format, format:check y lint','Los comandos del editor deben poder ejecutarse también desde terminal. Añade scripts a package.json para que un compañero o CI pueda revisar el proyecto sin depender de botones de VS Code.',`// package.json (fragmento)
{
  "scripts": {
    "format": "prettier . --write",
    "format:check": "prettier . --check",
    "lint": "eslint ."
  }
}

npm run format:check
npm run lint`,{
        guide:[['Modificar','package.json','Agrega scripts reproducibles para formato y lint.'],['Ejecutar','Terminal · raíz del proyecto','Ejecuta npm run format:check y npm run lint antes de subir cambios.']],
        previewLines:['npm run format:check → formato consistente','npm run lint → calidad','Mismos comandos localmente y en CI']
      })
    ]
  );

  add(
    'Herramientas · 3. Proyecto · entorno VS Code reproducible',
    40,
    'Integra todas las herramientas en una estructura pequeña y fácil de copiar a futuros proyectos. La meta es que otro estudiante clone el repositorio, instale dependencias y reciba las recomendaciones y ajustes necesarios sin configurar todo a mano.',
    'Construye el proyecto de repaso, instala las ocho extensiones del ZIP y demuestra con una prueba concreta qué aporta cada una.',
    [
      V('Project tree','1. Estructura final recomendada','Una configuración saludable separa ajustes del editor, reglas de formato, lint y código fuente. No guardes node_modules ni secretos. extensions.json recomienda herramientas; settings.json configura el workspace; Prettier y ESLint quedan en la raíz para que también funcionen fuera de VS Code.',`practica-vscode/
├── .vscode/
│   ├── extensions.json
│   └── settings.json
├── src/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── images/
│   └── avatar.png
├── .gitignore
├── .prettierignore
├── .prettierrc.json
├── eslint.config.mjs
└── package.json`,{
        files:[
          file('.vscode/settings.json','MANUAL','Ajustes del editor para el proyecto.'),
          file('.vscode/extensions.json','MANUAL','Extensiones recomendadas.'),
          file('.prettierrc.json','MANUAL','Reglas de formato.'),
          file('.prettierignore','MANUAL','Rutas excluidas del formato.'),
          file('eslint.config.mjs','MANUAL','Reglas de análisis estático.')
        ],
        guide:[['Crear','.vscode/','Agrupa configuración del workspace.'],['Crear','src/','Guarda aquí la práctica HTML/CSS/JS.'],['Crear o modificar','package.json','Registra dependencias y scripts.']],
        previewLines:['Editor reproducible','Formato reproducible','Lint reproducible','Extensiones recomendadas']
      }),
      V('Extensions bundle','2. Instalar las ocho extensiones del ZIP','Ejecuta los IDs de las ocho extensiones revisadas. Después usa code --list-extensions para verificar. No significa que todas sean obligatorias en todo proyecto: esta práctica sirve para conocerlas y decidir cuáles aportan valor a tu flujo.',`code --install-extension WallabyJs.console-ninja
code --install-extension usernamehw.errorlens
code --install-extension esbenp.prettier-vscode
code --install-extension formulahendry.auto-rename-tag
code --install-extension kisstkondoros.vscode-gutter-preview
code --install-extension dbaeumer.vscode-eslint
code --install-extension MS-vsliveshare.vsliveshare
code --install-extension christian-kohler.path-intellisense

code --list-extensions`,{
        guide:[['Ejecutar','Terminal','Instala las ocho extensiones por ID.'],['Revisar','VS Code · Extensions','Comprueba que estén enabled en el perfil/workspace correcto.']],
        previewLines:['8 extensiones instaladas','Verifica publisher e ID','Deshabilita las que no necesites por workspace']
      }),
      V('Recommendations final','3. extensions.json completo','Deja una lista de recomendaciones coherente con el curso. Este archivo es mejor que pedir al estudiante que recuerde nombres manualmente. Si una extensión es solo opcional, puedes omitirla de recommendations y documentarla en el README.',`// .vscode/extensions.json
{
  "recommendations": [
    "WallabyJs.console-ninja",
    "usernamehw.errorlens",
    "esbenp.prettier-vscode",
    "formulahendry.auto-rename-tag",
    "kisstkondoros.vscode-gutter-preview",
    "dbaeumer.vscode-eslint",
    "MS-vsliveshare.vsliveshare",
    "christian-kohler.path-intellisense"
  ]
}`,{
        files:[file('.vscode/extensions.json','MANUAL','Recomendaciones de extensiones del proyecto de práctica.')],
        guide:[['Modificar','.vscode/extensions.json','Añade los ocho IDs y elimina después los que no correspondan a un proyecto real.']],
        previewLines:['Abres repositorio nuevo','VS Code ofrece Recommended','Entorno más fácil de reproducir']
      }),
      V('Final settings','4. settings.json completo y explicado','Combina solo ajustes que tengan sentido para el proyecto. Prettier formatea al guardar, ESLint ofrece fixes, Error Lens hace visibles los diagnósticos, linked editing ayuda con etiquetas y Path Intellisense resuelve el alias de ejemplo. Evita copiar decenas de ajustes sin entenderlos.',`// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "prettier.requireConfig": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "eslint.validate": ["javascript", "javascriptreact"],
  "errorLens.enabled": true,
  "errorLens.messageEnabled": true,
  "editor.linkedEditing": true,
  "path-intellisense.mappings": {
    "@": "${workspaceFolder}/src"
  }
}`,{
        files:[file('.vscode/settings.json','MANUAL','Configuración final del workspace.')],
        guide:[['Modificar','.vscode/settings.json','Combina los ajustes y comenta mentalmente qué problema resuelve cada uno.'],['Comprobar','src/index.html + src/app.js','Prueba linked editing, rutas, formato y diagnósticos.']],
        previewLines:['Guardar → Prettier','Diagnóstico → ESLint + Error Lens','Ruta → Path Intellisense','Etiqueta → linked editing']
      }),
      V('Verification','5. Checklist final · demostrar que cada herramienta funciona','No des por hecho que instalar significa configurar. Haz una prueba pequeña para cada herramienta: un console.log para Console Ninja, un error para Error Lens/ESLint, código desordenado para Prettier, una etiqueta para Auto Rename Tag/linked editing, una imagen para Image Preview, una ruta para Path Intellisense y una sesión privada para Live Share.',`CHECKLIST
[ ] Console Ninja muestra un valor de ejecución
[ ] Error Lens hace visible un diagnóstico
[ ] Prettier formatea al guardar
[ ] ESLint detecta un problema real
[ ] Auto Rename Tag / linkedEditing sincroniza etiquetas
[ ] Image Preview muestra una miniatura
[ ] Path Intellisense sugiere una ruta
[ ] Live Share inicia y termina una sesión de prueba
[ ] npm run format:check pasa
[ ] npm run lint pasa`,{
        guide:[['Comprobar','VS Code · proyecto practica-vscode','Completa cada verificación una por una.'],['Ejecutar','Terminal · raíz del proyecto','Corre npm run format:check y npm run lint al final.']],
        previewLines:['Instalar ≠ configurar','Configurar ≠ comprobar','Checklist completo → entorno listo']
      })
    ]
  );
})();
