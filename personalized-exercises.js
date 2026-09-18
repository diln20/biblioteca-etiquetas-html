(()=>{
  if(window.__personalizedExercisesAdded)return;
  window.__personalizedExercisesAdded=true;
  if(!Array.isArray(window.sections)||typeof window.createCard!=='function')return;

  const normalize=value=>String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const escape=value=>String(value??'').replace(/[&<>"']/g,char=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  })[char]);
  const itemSection=new WeakMap();
  sections.forEach(section=>(section.items||[]).forEach(item=>itemSection.set(item,section)));

  const style=document.createElement('style');
  style.textContent=`
    .personal-exercise{margin:16px 0;border:1px solid rgba(34,197,94,.38);border-radius:14px;background:linear-gradient(180deg,rgba(34,197,94,.075),rgba(8,16,31,.78));overflow:hidden}
    .personal-exercise summary{cursor:pointer;list-style:none;padding:13px 15px;display:flex;align-items:center;gap:10px;font-weight:900;color:#86efac;background:rgba(34,197,94,.08);border-bottom:1px solid transparent}
    .personal-exercise[open] summary{border-bottom-color:rgba(34,197,94,.25)}
    .personal-exercise summary::-webkit-details-marker{display:none}
    .personal-exercise summary::after{content:'＋';margin-left:auto;color:#4ade80;font-size:18px}
    .personal-exercise[open] summary::after{content:'−'}
    .personal-exercise-body{padding:14px 16px 16px;display:grid;gap:12px;color:#cbd5e1}
    .personal-exercise-intro{margin:0;line-height:1.55}
    .personal-exercise ol{margin:0;padding-left:22px;display:grid;gap:8px}
    .personal-exercise li{padding-left:4px;line-height:1.5}
    .personal-exercise strong{color:#f8fafc}
    .personal-exercise code{padding:2px 6px;border:1px solid rgba(148,163,184,.25);border-radius:6px;background:#07111f;color:#fde68a}
    .personal-exercise-extra{padding:10px 12px;border-left:3px solid #22c55e;border-radius:8px;background:rgba(34,197,94,.07)}
    .personal-exercise-privacy{font-size:.88em;color:#94a3b8;margin:0}
  `;
  document.head.append(style);

  const general=()=>({
    title:'Ejercicio para ti',
    intro:'No te limites a copiar el ejemplo. Cámbialo con datos propios para comprobar que entendiste qué parte del código controla cada resultado.',
    tasks:[
      'Reemplaza los datos de ejemplo por <strong>tu nombre</strong>, <strong>tu edad</strong> y <strong>tu ciudad</strong>.',
      'Agrega un dato nuevo, por ejemplo <strong>profesión, hobby, lenguaje favorito o correo de práctica</strong>.',
      'Ejecuta el ejemplo y confirma que el resultado cambió exactamente donde esperabas.'
    ],
    extra:'Reto extra: cambia otro valor sin mirar el ejemplo original e intenta explicar con tus palabras por qué funcionó.'
  });

  const exerciseFor=(item,section)=>{
    const area=String(section?.primaryArea||section?.group||section?.course||'');
    const title=`${section?.title||''} ${item?.name||''} ${item?.tag||''} ${item?.kind||''}`;
    const n=normalize(title);
    const custom=Array.isArray(item?.exerciseTasks)?item.exerciseTasks:null;
    if(section?.title==='CSS · Juegos y retos prácticos'){
      if(!custom?.length)return null;
      return {
        title:item.exerciseTitle||'Misión del reto',
        intro:item.exerciseIntro||'Resuelve estas variaciones después de estudiar el ejemplo y comprueba cada cambio en el resultado.',
        tasks:custom,
        extra:item.exerciseExtra||''
      };
    }
    if(custom?.length)return {title:item.exerciseTitle||'Ejercicio para ti',intro:item.exerciseIntro||'Practica modificando el ejemplo.',tasks:custom,extra:item.exerciseExtra||''};

    if(area==='HTML'){
      if(/form|input|select|textarea/.test(n))return {
        title:'Ejercicio para ti · formulario personal',
        intro:'Convierte este ejemplo en un formulario que recoja datos tuyos de práctica.',
        tasks:[
          'Añade campos para <strong>nombre</strong>, <strong>edad</strong> y <strong>ciudad</strong> usando <code>label</code> correctamente.',
          'Agrega un campo extra como hobby, lenguaje favorito o correo de práctica y aplica al menos una validación.',
          'Envía el formulario o revisa sus valores y comprueba que cada control tiene <code>name</code> e <code>id</code> adecuados.'
        ],
        extra:'Reto extra: añade una opción de nivel de experiencia con radio buttons y una casilla para aceptar términos.'
      };
      if(/tabla|table/.test(n))return {
        title:'Ejercicio para ti · tabla de perfil',
        intro:'Usa la tabla para representar información realista en lugar de filas genéricas.',
        tasks:[
          'Crea una fila con tu <strong>nombre</strong>, <strong>edad</strong> y <strong>ciudad</strong>.',
          'Agrega dos filas de ejemplo con datos ficticios y usa encabezados claros.',
          'Incluye una columna nueva para hobby o lenguaje favorito y revisa que la tabla siga siendo legible.'
        ],
        extra:'Reto extra: añade un <code>caption</code> que explique qué información contiene la tabla.'
      };
      if(/imagen|img|picture/.test(n))return {
        title:'Ejercicio para ti · imagen con contexto',
        intro:'Practica los atributos de imagen creando una pequeña tarjeta personal.',
        tasks:[
          'Usa una imagen de práctica o avatar genérico y escribe un <code>alt</code> descriptivo.',
          'Añade debajo tu nombre y una frase corta sobre tu hobby o área de estudio.',
          'Prueba <code>width</code>, <code>height</code> y, si aplica, <code>loading="lazy"</code> sin deformar la imagen.'
        ],
        extra:'Reto extra: usa <code>picture</code> o <code>srcset</code> para ofrecer otra versión en pantallas pequeñas.'
      };
      return {
        title:'Ejercicio para ti · página personal',
        intro:'Aplica la etiqueta o concepto de esta lección a una mini página sobre ti.',
        tasks:[
          'Escribe tu <strong>nombre</strong> como contenido principal y agrega tu <strong>edad</strong> y <strong>ciudad</strong> en una estructura HTML apropiada.',
          'Añade una sección con dos hobbies o tecnologías que quieras aprender.',
          'Revisa el HTML y cambia al menos un texto, atributo o elemento para comprobar que entiendes su función.'
        ],
        extra:'Reto extra: intenta que el HTML tenga sentido incluso si se visualiza sin CSS.'
      };
    }

    if(area==='CSS'){
      if(/flex|grid|div|fila|columna|layout/.test(n))return {
        title:'Ejercicio para ti · organiza tu perfil',
        intro:'Usa el sistema de layout de la lección para ordenar información personal de práctica.',
        tasks:[
          'Crea tres tarjetas: <strong>Nombre</strong>, <strong>Edad</strong> y <strong>Ciudad</strong>.',
          'Colócalas primero en fila y luego cambia el ejercicio para verlas en columna.',
          'Añade <code>gap</code> y una regla responsive para que en móvil queden una debajo de la otra.'
        ],
        extra:'Reto extra: agrega una cuarta tarjeta de hobby y permite que el contenedor haga wrap.'
      };
      if(/pseudo|hover|focus|active|checked|disabled/.test(n))return {
        title:'Ejercicio para ti · estados visuales',
        intro:'Crea una tarjeta personal y usa los estados CSS de esta lección.',
        tasks:[
          'Haz una tarjeta con tu nombre y edad.',
          'Aplica un estado <code>:hover</code> al contenedor y <code>:focus</code> a un botón o input.',
          'Cambia color, borde o transformación para que el cambio de estado sea evidente.'
        ],
        extra:'Reto extra: añade un checkbox y usa <code>:checked</code> para activar un estilo distinto.'
      };
      return {
        title:'Ejercicio para ti · diseña una tarjeta personal',
        intro:'Usa exactamente las propiedades de esta lección para diseñar una tarjeta con información propia.',
        tasks:[
          'Crea una tarjeta HTML con tu <strong>nombre</strong>, <strong>edad</strong> y <strong>ciudad</strong>.',
          'Aplica las propiedades CSS vistas aquí y cambia al menos tres valores respecto al ejemplo.',
          'Comprueba que el contenido sigue siendo legible en una ventana más estrecha.'
        ],
        extra:'Reto extra: agrega una clase alternativa para mostrar la misma tarjeta con otro estado visual.'
      };
    }

    if(area==='JavaScript'){
      if(/dom|selector|queryselector|getelement|closest|dataset/.test(n))return {
        title:'Ejercicio para ti · selecciona tus datos en el DOM',
        intro:'Construye una pequeña ficha personal y localiza cada dato con un selector distinto.',
        tasks:[
          'En HTML crea <code>#nombre</code>, una clase <code>.edad</code> y un elemento con <code>data-ciudad</code>.',
          'En JavaScript selecciona cada uno usando <code>getElementById</code>, <code>querySelector</code> y un selector de atributo.',
          'Agrega un botón que cambie el texto o una clase CSS cuando hagas clic.'
        ],
        extra:'Reto extra: crea dos tarjetas y usa <code>closest()</code> para saber cuál botón fue pulsado.'
      };
      if(/funcion|function|callback|arrow|recurs|parameter/.test(n))return {
        title:'Ejercicio para ti · función de presentación',
        intro:'Transforma el concepto de esta lección en una función que trabaje con datos tuyos.',
        tasks:[
          'Crea una función que reciba <code>nombre</code> y <code>edad</code>.',
          'Haz que devuelva una frase como “Hola, soy Ana y tengo 20 años”.',
          'Llámala otra vez con valores distintos para comprobar que la función realmente es reutilizable.'
        ],
        extra:'Reto extra: añade un tercer parámetro opcional para ciudad o profesión.'
      };
      if(/array|map|filter|reduce|arreglo/.test(n))return {
        title:'Ejercicio para ti · arreglos con tus intereses',
        intro:'Practica el método de la lección usando una lista que tenga significado para ti.',
        tasks:[
          'Crea un arreglo con 4 hobbies, tecnologías o cursos que te interesen.',
          'Aplica el método visto en esta lección y guarda el resultado en una variable nueva.',
          'Muestra en consola el arreglo original y el resultado para comparar qué cambió.'
        ],
        extra:'Reto extra: combina dos métodos de arreglos sin modificar el arreglo original.'
      };
      if(/objeto|object/.test(n))return {
        title:'Ejercicio para ti · objeto perfil',
        intro:'Representa una persona mediante un objeto JavaScript.',
        tasks:[
          'Crea <code>perfil</code> con nombre, edad, ciudad y hobbies.',
          'Lee dos propiedades y modifica una tercera.',
          'Agrega un método que devuelva una presentación del perfil.'
        ],
        extra:'Reto extra: crea un arreglo con dos objetos perfil y recórrelo con <code>forEach</code>.'
      };
      return {
        title:'Ejercicio para ti · personaliza el ejemplo',
        intro:'Cambia los valores genéricos por datos tuyos para comprobar que entiendes variables, tipos y salida.',
        tasks:[
          'Declara variables para <code>nombre</code>, <code>edad</code> y <code>ciudad</code>.',
          'Usa el concepto de esta lección con esas variables en vez de copiar literalmente los datos del ejemplo.',
          'Muestra el resultado en consola o en pantalla y cambia un valor para verificar el efecto.'
        ],
        extra:'Reto extra: agrega una condición que produzca un resultado distinto según la edad u otro dato.'
      };
    }

    if(area==='TypeScript')return {
      title:'Ejercicio para ti · perfil tipado',
      intro:'Repite el concepto de la lección usando un perfil con tipos explícitos.',
      tasks:[
        'Modela <code>nombre</code> como string, <code>edad</code> como number y agrega ciudad o hobby.',
        'Aplica el tipo, interface, genérico o utilidad estudiada en esta lección al perfil.',
        'Intenta asignar deliberadamente un tipo incorrecto, observa el error y luego corrígelo.'
      ],
      extra:'Reto extra: crea una función tipada que reciba el perfil y devuelva una presentación.'
    };

    if(area==='Git')return {
      title:'Ejercicio para ti · guarda tu práctica con Git',
      intro:'Convierte el tema de Git en una acción concreta sobre un archivo propio.',
      tasks:[
        'Crea o modifica <code>perfil.md</code> con nombre, edad de práctica, ciudad y tecnologías que estás estudiando.',
        'Ejecuta el comando Git de esta lección y revisa el estado antes y después.',
        'Haz un cambio adicional en el archivo y comprueba cómo Git detecta la diferencia.'
      ],
      extra:'Reto extra: usa una rama llamada <code>perfil-mejora</code> para hacer la segunda versión.'
    };

    if(area==='APIs')return {
      title:'Ejercicio para ti · perfil como datos de API',
      intro:'Usa datos de práctica para entender cómo viaja información entre cliente y servidor.',
      tasks:[
        'Crea un JSON con <code>nombre</code>, <code>edad</code>, <code>ciudad</code> y <code>hobbies</code>.',
        'Aplica el concepto de esta lección a ese JSON: petición, respuesta, autenticación, seguridad o consumo.',
        'Muestra al menos dos campos de la respuesta en pantalla o consola.'
      ],
      extra:'Reto extra: agrega un campo nuevo y verifica qué parte del cliente o servidor debe cambiar para soportarlo.'
    };

    if(area==='Angular')return {
      title:'Ejercicio para ti · componente Perfil',
      intro:'Aplica esta lección a un componente Angular sencillo con datos personales de práctica.',
      tasks:[
        'Crea o adapta un componente para mostrar nombre, edad y ciudad.',
        'Usa el concepto actual —binding, signal, formulario, servicio, ruta o directiva— sobre esos datos.',
        'Cambia uno de los valores desde la interfaz y confirma que Angular actualiza el resultado.'
      ],
      extra:'Reto extra: añade un campo hobby y separa su presentación en un componente hijo cuando tenga sentido.'
    };

    if(area==='React')return {
      title:'Ejercicio para ti · componente Perfil en React',
      intro:'Usa esta lección para construir una versión pequeña de un perfil en React.',
      tasks:[
        'Muestra nombre, edad y ciudad en un componente <code>Perfil</code>.',
        'Aplica aquí el hook, estado, formulario, consulta o patrón estudiado en la lección.',
        'Haz que al menos un dato pueda cambiar y observa el nuevo render.'
      ],
      extra:'Reto extra: pasa el nombre por props y conserva la edad en estado cuando el tema lo permita.'
    };

    if(area==='Vue')return {
      title:'Ejercicio para ti · perfil en Vue',
      intro:'Repite esta lección usando un pequeño perfil como caso de uso.',
      tasks:[
        'Declara nombre, edad y ciudad en el estado del componente.',
        'Muéstralos en el template y aplica el concepto de esta lección.',
        'Añade una interacción que cambie un dato y confirma la actualización reactiva.'
      ],
      extra:'Reto extra: mueve un dato a una prop o computed según el tema estudiado.'
    };

    if(area==='Svelte'||area==='Solid.js')return {
      title:`Ejercicio para ti · perfil en ${area}`,
      intro:'Practica la reactividad de esta lección con información de un perfil sencillo.',
      tasks:[
        'Crea datos para nombre, edad y ciudad.',
        'Muéstralos en el componente usando la sintaxis propia del framework.',
        'Agrega un botón o input que modifique un dato y comprueba la actualización.'
      ],
      extra:'Reto extra: extrae una parte del perfil a un componente reutilizable.'
    };

    if(area==='Django Framework')return {
      title:'Ejercicio para ti · página de perfil con Django',
      intro:'Aplica el tema actual a una página renderizada por Django.',
      tasks:[
        'Desde la vista envía nombre, edad y ciudad dentro del contexto.',
        'Muestra esos valores en un template HTML usando Django Template Language.',
        'Aplica el concepto de la lección en el archivo correcto: URL, view, template, CSS, JavaScript, formulario o modelo.'
      ],
      extra:'Reto extra: agrega un hobby y muéstralo condicionalmente con <code>{% if %}</code>.'
    };

    if(area==='FastAPI')return {
      title:'Ejercicio para ti · endpoint de perfil',
      intro:'Usa FastAPI para representar datos de una persona de práctica.',
      tasks:[
        'Crea o adapta un endpoint <code>/perfil</code> con nombre, edad y ciudad.',
        'Si la lección usa Pydantic, modela esos campos y valida al menos uno.',
        'Prueba el endpoint en <code>/docs</code> y revisa el JSON resultante.'
      ],
      extra:'Reto extra: agrega un campo opcional hobby y comprueba cómo aparece en OpenAPI.'
    };

    if(area==='Django REST')return {
      title:'Ejercicio para ti · recurso Perfil en Django REST',
      intro:'Aplica la lección a un recurso sencillo con datos de práctica.',
      tasks:[
        'Representa nombre, edad y ciudad en el serializer o respuesta del endpoint.',
        'Aplica la vista, ViewSet, validación, permiso o ruta estudiada en esta lección.',
        'Haz una petición y confirma que el JSON contiene los campos esperados.'
      ],
      extra:'Reto extra: añade un campo hobby y valida su longitud.'
    };

    if(area==='Base de datos')return {
      title:'Ejercicio para ti · guarda un perfil',
      intro:'Practica el motor de esta lección almacenando un registro o documento muy sencillo.',
      tasks:[
        'Crea una estructura para nombre, edad y ciudad usando la sintaxis del motor actual.',
        'Inserta un registro con datos de práctica y luego consúltalo.',
        'Actualiza la edad o ciudad y vuelve a consultar para comprobar el cambio.'
      ],
      extra:'Reto extra: agrega un segundo perfil ficticio y filtra los resultados por ciudad o edad.'
    };

    if(area==='Backend')return {
      title:'Ejercicio para ti · perfil desde backend',
      intro:'Usa el concepto backend de esta lección sobre un recurso pequeño y fácil de verificar.',
      tasks:[
        'Modela un perfil con nombre, edad y ciudad usando datos de práctica.',
        'Aplica la capa o patrón actual —ruta, servicio, repositorio, caché, prueba o seguridad— a ese recurso.',
        'Comprueba el resultado con una petición o test automatizado.'
      ],
      extra:'Reto extra: añade un campo nuevo y sigue su recorrido por todas las capas necesarias.'
    };

    if(area==='Frameworks')return {
      title:'Ejercicio para ti · mini perfil desplegable',
      intro:'Usa esta herramienta o concepto con una mini aplicación que muestre datos de práctica.',
      tasks:[
        'Prepara una vista con nombre, edad, ciudad y una tecnología favorita.',
        'Aplica la herramienta de la lección a ese proyecto.',
        'Verifica el resultado final en desarrollo o en el despliegue correspondiente.'
      ],
      extra:'Reto extra: cambia un dato, vuelve a construir/desplegar y confirma que la actualización quedó publicada.'
    };

    return general();
  };

  const originalCreateCard=window.createCard;
  window.createCard=createCard=function(item){
    const fragment=originalCreateCard(item);
    const card=fragment.querySelector?.('.tag-card');
    if(!card||card.querySelector('.personal-exercise'))return fragment;
    const section=itemSection.get(item)||{};
    const exercise=exerciseFor(item,section);
    if(!exercise?.tasks?.length)return fragment;

    const details=document.createElement('details');
    details.className='personal-exercise';
    details.dataset.personalExercise='true';
    details.innerHTML=`
      <summary><span aria-hidden="true">🧪</span><span>${escape(exercise.title||'Ejercicio para ti')}</span></summary>
      <div class="personal-exercise-body">
        <p class="personal-exercise-intro">${exercise.intro||''}</p>
        <ol>${exercise.tasks.map(task=>`<li>${task}</li>`).join('')}</ol>
        ${exercise.extra?`<div class="personal-exercise-extra"><strong>Reto extra:</strong> ${String(exercise.extra).replace(/^Reto extra:\s*/i,'')}</div>`:''}
        <p class="personal-exercise-privacy">Usa datos ficticios si vas a publicar el ejercicio. No escribas contraseñas, documentos, direcciones exactas ni otra información sensible.</p>
      </div>`;

    const tip=card.querySelector('.tip');
    if(tip)tip.before(details);
    else card.append(details);
    return fragment;
  };

  if(typeof window.render==='function')window.render();
})();
