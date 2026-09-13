(()=>{
  if(window.__exactExplanationsAdded)return;
  window.__exactExplanationsAdded=true;
  if(!Array.isArray(window.sections))return;

  const textOf=(section,item)=>`${section.title} ${item.topic||item.tag||''} ${item.name||''} ${item.code||''}`.toLowerCase();

  const angularDetail=text=>{
    if(/signal|computed|effect/.test(text))return 'Angular registra qué plantilla o cálculo leyó cada signal. Cuando set o update cambia el valor, invalida esas dependencias y vuelve a calcular o renderizar únicamente lo relacionado.';
    if(/input|output|padre|hijo/.test(text))return 'El padre conserva la fuente de verdad: input transporta datos hacia el hijo y output emite un hecho hacia el padre. El hijo no modifica directamente el estado que pertenece a otro componente.';
    if(/router|ruta|activatedroute|lazy|loadcomponent|loadchildren/.test(text))return 'El Router compara la URL con la configuración de rutas, carga el componente o chunk correspondiente y lo inserta en router-outlet. Los parámetros se leen desde ActivatedRoute.';
    if(/httpclient|interceptor|petici|api/.test(text))return 'HttpClient construye una petición observable. Los interceptores la transforman en cadena, el navegador la envía al servidor y la respuesta vuelve por la cadena antes de llegar al servicio o componente.';
    if(/form|validator|control/.test(text))return 'El formulario mantiene un modelo de controles con valor, estado y errores. Los validadores recalculan esos errores al cambiar el dato y la plantilla decide cuándo mostrarlos.';
    if(/service|servicio|inject|provider|dependenc/.test(text))return 'El inyector busca un provider para el token solicitado, crea o reutiliza la instancia según su alcance y la entrega al consumidor. Esto separa la creación de la dependencia de su uso.';
    if(/observable|rxjs|switchmap|debounce|subscribe/.test(text))return 'El Observable comienza a producir valores cuando existe una suscripción. Cada operador crea un nuevo flujo; switchMap cancela el flujo anterior cuando llega una entrada más reciente.';
    if(/ssr|hydrate|prerender/.test(text))return 'El servidor o el proceso de build genera HTML inicial. En el navegador, la hidratación conecta eventos y estado con ese DOM existente para hacerlo interactivo sin recrearlo por completo.';
    if(/test|spec|testbed/.test(text))return 'TestBed crea un entorno Angular controlado. La prueba prepara dependencias, ejecuta una acción observable y verifica la salida sin depender de servicios externos reales.';
    return 'El compilador procesa el componente y su plantilla, crea instrucciones de renderizado y relaciona expresiones con nodos del DOM. Los eventos llaman métodos; los cambios de estado actualizan las dependencias visibles.';
  };

  const detailFor=(section,item)=>{
    const text=textOf(section,item);
    if(text.includes('angular'))return angularDetail(text);
    if(text.includes('solid.js')||text.includes('createsignal'))return 'Solid ejecuta el componente para crear DOM real y registra dependencias al leer signals. Cuando una signal cambia, actualiza directamente los nodos o cálculos suscritos, sin volver a ejecutar todo el árbol.';
    if(section.title.startsWith('HTML'))return 'El navegador analiza el marcado de arriba hacia abajo, crea nodos en el DOM y aplica el significado y comportamiento definidos por la etiqueta y sus atributos. La estructura resultante queda disponible para CSS, JavaScript y tecnologías de asistencia.';
    if(section.title.startsWith('CSS')||section.title.startsWith('Frameworks CSS'))return 'El navegador compara selectores con el DOM, resuelve especificidad, herencia y orden de la cascada, calcula el estilo final y después ejecuta layout, paint y composición para mostrar el resultado.';
    if(section.title.startsWith('JavaScript')||section.title==='Manejo del DOM')return 'El motor evalúa las instrucciones en orden, guarda valores en memoria y ejecuta funciones cuando son llamadas. Si el código usa el DOM, lee o modifica nodos; si usa promesas, la continuación se programa en la cola de microtareas.';
    if(section.title.startsWith('Git'))return 'Git compara y guarda instantáneas. Según el comando, lee o modifica el directorio de trabajo, el área de preparación, el historial local o las referencias remotas.';
    if(section.title.includes('API')||section.title.startsWith('Consumo'))return 'El cliente construye una solicitud con método, URL, cabeceras y cuerpo. El servidor enruta, valida y procesa; después devuelve estado, cabeceras y cuerpo, que el cliente interpreta antes de actualizar la interfaz.';
    if(section.title.startsWith('Backend FastAPI'))return 'La solicitud entra por el servidor ASGI, FastAPI selecciona la ruta, valida datos y ejecuta la dependencia y la función. La capa de negocio consulta o modifica persistencia y la respuesta se serializa a HTTP.';
    if(section.title.startsWith('Django'))return 'Django recibe la solicitud, resuelve la URL, ejecuta middleware y vista, consulta modelos cuando corresponde y genera una respuesta. Django REST Framework añade serialización, validación y negociación de contenido.';
    if(section.title.startsWith('UI/UX'))return 'El navegador convierte HTML semántico en DOM y árbol de accesibilidad. El foco, nombre accesible, estado y mensajes asociados determinan cómo teclado y tecnologías de asistencia interpretan el control.';
    if(section.title.includes('Escalabilidad'))return 'Cada solicitud atraviesa componentes con capacidad y latencia medibles. Balanceo, caché, colas y réplicas cambian dónde se procesa o almacena el trabajo; métricas y pruebas permiten localizar el límite real.';
    return 'Identifica la entrada, el proceso y la salida: el código recibe datos o eventos, aplica una regla concreta y produce un cambio observable. Modifica una entrada para comprobar exactamente qué parte del resultado depende de ella.';
  };

  sections.forEach(section=>{
    section.items?.forEach(item=>{
      if(typeof item.description!=='string')item.description='';
      if(!item.description.includes('Cómo funciona exactamente:')){
        item.description+=` Cómo funciona exactamente: ${detailFor(section,item)}`;
      }
      if(!item.description.includes('Cómo comprobarlo:')){
        item.description+=' Cómo comprobarlo: cambia una sola entrada, ejecuta el ejemplo y relaciona el cambio observado con la línea responsable.';
      }
    });
  });
})();
