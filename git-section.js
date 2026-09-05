(()=>{
  if(window.__gitSectionAdded)return;
  window.__gitSectionAdded=true;

  const terminal=text=>`<pre style="margin:0;padding:14px;border-radius:10px;color:#d1fae5;background:#07130f;font:14px/1.55 ui-monospace,monospace;white-space:pre-wrap">${text}</pre>`;
  const G=(command,name,description,code,result,meta={})=>T(
    command,name,description,code,terminal(result),[],{kind:meta.kind||'Git',tip:meta.tip||''}
  );

  sections.push(
    {
      title:'Git · Principiante',
      description:'Comprende el control de versiones y aprende a registrar cambios locales con seguridad.',
      quote:'“Un commit útil explica una decisión pequeña y completa.”',
      challenge:'Crea un repositorio local y registra su primer cambio.',
      items:[
        G('Git','¿Qué es el control de versiones?','Git guarda instantáneas del proyecto para consultar su evolución, comparar cambios y recuperar versiones anteriores. El repositorio contiene archivos de trabajo, un área de preparación y un historial de commits.','# Flujo básico\narchivos modificados → git add → área preparada → git commit → historial','Trabajo → Preparación → Commit',{kind:'Concepto',tip:'Git trabaja localmente; una plataforma como GitHub aloja una copia remota del repositorio.'}),
        G('git config','Configurar la identidad','Define el nombre y correo que aparecerán como autor de los commits. La opción --global aplica la identidad a todos los repositorios del usuario.','git config --global user.name "Ana Pérez"\ngit config --global user.email "ana@ejemplo.com"\ngit config --list','user.name=Ana Pérez\nuser.email=ana@ejemplo.com',{kind:'Configuración'}),
        G('git init','Crear un repositorio','Inicializa Git en la carpeta actual y crea el directorio interno .git, donde se almacena el historial. No modifica los archivos existentes.','cd mi-proyecto\ngit init','Initialized empty Git repository in mi-proyecto/.git/',{kind:'Inicio',tip:'Ejecuta git init solo en la raíz real del proyecto, no en una carpeta superior que contenga otros trabajos.'}),
        G('git status','Consultar el estado','Muestra la rama actual y clasifica archivos sin seguimiento, modificados o preparados. Es el comando más útil antes de agregar, confirmar o cambiar de rama.','git status','On branch main\nChanges not staged for commit:\n  modified: index.html',{kind:'Inspección'}),
        G('git add','Preparar cambios','Copia al área de preparación la versión actual de los archivos indicados. Permite decidir exactamente qué formará parte del próximo commit.','git add index.html estilos.css\ngit status --short','M  index.html\nA  estilos.css',{kind:'Preparación',tip:'Prefiere indicar archivos concretos cuando el proyecto contiene cambios no relacionados.'}),
        G('git diff','Revisar diferencias','Compara el contenido para saber qué líneas se añadieron o eliminaron. Sin opciones muestra cambios no preparados; --staged revisa lo que entrará al commit.','git diff\ngit diff --staged','-  <h1>Inicio</h1>\n+  <h1>Biblioteca web</h1>',{kind:'Inspección'}),
        G('git commit','Registrar una versión','Crea una instantánea con los cambios preparados. El mensaje debe resumir con claridad qué resultado aporta esa versión.','git commit -m "Mejora el encabezado principal"','[main a1b2c3d] Mejora el encabezado principal\n 2 files changed, 8 insertions(+), 2 deletions(-)',{kind:'Historial'}),
        G('git log','Consultar el historial','Presenta los commits desde el más reciente. --oneline resume cada registro y --decorate muestra referencias como ramas y etiquetas.','git log --oneline --decorate -5','a1b2c3d (HEAD -> main) Mejora el encabezado principal\n8e7f6a5 Crea la estructura inicial',{kind:'Historial'})
      ]
    },
    {
      title:'Git · Intermedio',
      description:'Trabaja con ramas y sincroniza el repositorio local con un remoto.',
      quote:'“Las ramas aíslan el trabajo; la integración vuelve a reunirlo.”',
      challenge:'Desarrolla una mejora en una rama y combínala con main.',
      items:[
        G('git clone','Clonar un repositorio','Descarga un repositorio remoto completo, configura origin y crea una carpeta de trabajo con la rama principal activa.','git clone https://github.com/equipo/proyecto.git\ncd proyecto','Cloning into \'proyecto\'...\nReceiving objects: 100%',{kind:'Remotos'}),
        G('git branch','Administrar ramas','Lista las ramas locales. Con un nombre nuevo crea una referencia independiente sin cambiar todavía hacia ella.','git branch\ngit branch mejora-menu','* main\n  mejora-menu',{kind:'Ramas'}),
        G('git switch','Cambiar o crear una rama','Cambia la rama activa. La opción -c crea la rama y se mueve a ella en un solo paso, dejando main sin modificaciones.','git switch -c mejora-menu','Switched to a new branch \'mejora-menu\'' ,{kind:'Ramas'}),
        G('git merge','Combinar ramas','Integra en la rama actual los commits de otra rama. Primero cambia a la rama que recibirá los cambios y luego ejecuta merge.','git switch main\ngit merge mejora-menu','Updating a1b2c3d..d4e5f6a\nFast-forward\n menu.css | 12 ++++++++++++',{kind:'Integración'}),
        G('git remote','Configurar un remoto','Asocia una URL con un nombre corto. origin es la convención para el remoto principal, pero no es una palabra obligatoria.','git remote add origin https://github.com/equipo/proyecto.git\ngit remote -v','origin  https://github.com/equipo/proyecto.git (fetch)\norigin  https://github.com/equipo/proyecto.git (push)',{kind:'Remotos'}),
        G('git fetch','Descargar referencias','Consulta el remoto y actualiza referencias como origin/main sin mezclar cambios en la rama local. Permite revisar antes de integrar.','git fetch origin\ngit log --oneline main..origin/main','f7a8b9c Corrige navegación móvil',{kind:'Sincronización'}),
        G('git pull','Descargar e integrar','Obtiene los cambios remotos y los integra en la rama activa. Conviene tener el trabajo confirmado o guardado y revisar primero el estado.','git status\ngit pull --ff-only origin main','Updating d4e5f6a..f7a8b9c\nFast-forward',{kind:'Sincronización',tip:'--ff-only evita crear una combinación automática cuando las ramas han divergido.'}),
        G('git push','Publicar commits','Envía commits locales al remoto. -u establece la relación de seguimiento para que los próximos push puedan ejecutarse sin indicar rama.','git push -u origin mejora-menu','branch \'mejora-menu\' set up to track \'origin/mejora-menu\'.',{kind:'Publicación',tip:'Revisa git status, el diff preparado y el nombre de la rama antes de publicar.'}),
        G('.gitignore','Ignorar archivos','El archivo .gitignore enumera patrones que Git no debe comenzar a seguir, como dependencias, secretos locales o archivos generados.','node_modules/\n.env\ndist/\n*.log','Los archivos coincidentes dejan de aparecer como “untracked”.',{kind:'Configuración',tip:'.gitignore no deja de seguir archivos que ya estaban confirmados en el historial.'})
      ]
    },
    {
      title:'Git · Avanzado',
      description:'Reorganiza cambios, recupera versiones y resuelve integraciones de forma controlada.',
      quote:'“Antes de reescribir historial, confirma qué referencia y qué archivos serán afectados.”',
      challenge:'Resuelve un conflicto y recupera un cambio mediante una operación reversible.',
      items:[
        G('git stash','Guardar trabajo temporal','Aparta cambios sin confirmar para dejar limpia la carpeta de trabajo. list muestra las entradas y pop reaplica la más reciente eliminándola del almacén.','git stash push -m "menú en progreso"\ngit stash list\ngit stash pop','stash@{0}: On mejora-menu: menú en progreso\nDropped refs/stash@{0}',{kind:'Organización'}),
        G('git rebase','Reaplicar commits','Coloca los commits de la rama actual sobre otra base para obtener un historial lineal. Cambia identificadores, por lo que debe evitarse sobre commits compartidos.','git switch mejora-menu\ngit rebase main','Successfully rebased and updated refs/heads/mejora-menu.',{kind:'Historial',tip:'Usa rebase en trabajo local; coordina con el equipo antes de reescribir una rama publicada.'}),
        G('git cherry-pick','Copiar un commit','Aplica en la rama actual el cambio introducido por un commit concreto y crea un nuevo commit con otro identificador.','git switch main\ngit cherry-pick a1b2c3d','[main c4d5e6f] Corrige enlace del menú',{kind:'Historial'}),
        G('git revert','Revertir de forma segura','Crea un nuevo commit que invierte los cambios de otro. Conserva el historial y por eso es apropiado para ramas compartidas.','git revert a1b2c3d','[main e7f8a9b] Revert "Mejora el encabezado principal"',{kind:'Recuperación'}),
        G('git restore','Descartar o retirar cambios','Restaura un archivo desde el último commit. Con --staged lo retira del área de preparación sin borrar las modificaciones de la carpeta de trabajo.','git restore --staged index.html\ngit restore index.html','index.html vuelve primero a “modificado” y después recupera su versión confirmada.',{kind:'Recuperación',tip:'Antes de restaurar el archivo de trabajo, revisa git diff porque los cambios no confirmados se perderán.'}),
        G('conflictos','Resolver conflictos','Un conflicto aparece cuando Git no puede combinar automáticamente cambios sobre la misma zona. Edita los marcadores, conserva el resultado correcto, prepara el archivo y continúa.','git status\n# Editar <<<<<<<, ======= y >>>>>>>\ngit add index.html\ngit merge --continue','All conflicts fixed but you are still merging.\nMerge made by the recursive strategy.',{kind:'Integración'}),
        G('git tag','Etiquetar versiones','Una etiqueta nombra un commit importante, normalmente una versión publicada. Las etiquetas anotadas incluyen mensaje, autor y fecha.','git tag -a v1.0.0 -m "Primera versión estable"\ngit push origin v1.0.0','* [new tag] v1.0.0 -> v1.0.0',{kind:'Versiones'})
      ]
    }
  );

  buildNav();
  render();
})();
