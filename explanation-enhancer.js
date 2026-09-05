(()=>{
  if(window.__allExplanationsEnhanced)return;
  window.__allExplanationsEnhanced=true;

  const conceptDetails={
    'Ingeniería web':'Relaciona las cinco etapas del código con un proyecto real: primero se entiende la necesidad, luego se diseña, se construye, se comprueba y finalmente se mantiene.',
    'Arquitectura de la información':'Observa cómo header, nav, main y las rutas visibles ayudan a saber dónde está el usuario, qué contenido consulta y hacia dónde puede continuar.',
    'Fundamentos de la arquitectura de la información':'El título organiza el contenido, el buscador permite localizarlo, las categorías lo etiquetan y la navegación conecta unas áreas con otras.',
    'Desarrollo web':'Sigue el recorrido completo: el formulario pertenece al frontend, fetch envía la información al backend y este puede guardarla o consultarla en una base de datos.',
    'Patrones de diseño':'En Observer, el estado no necesita conocer los detalles de cada receptor: registra funciones y las notifica cuando el valor cambia.'
  };

  const labelOf=item=>String(item.tag||item.topic||item.name||'elemento').replace(/[<>]/g,'').trim();
  const detailFor=(section,item)=>{
    const label=labelOf(item);
    if(conceptDetails[item.name])return conceptDetails[item.name];
    if(section.title.startsWith('HTML + CSS + JavaScript'))return `Separa mentalmente el ejemplo en tres capas: HTML crea los elementos, CSS reconoce sus clases y los presenta, y JavaScript usa esos mismos elementos para responder a las acciones. Prueba los controles y relaciona cada cambio visible con la línea que lo produce.`;
    if(section.title.startsWith('HTML + JavaScript'))return `Primero HTML crea los controles y la zona de salida; después JavaScript los localiza, escucha una acción y actualiza el contenido. Sigue ese orden en el código y prueba la interacción en el resultado.`;
    if(section.title==='HTML + CSS')return `Compara los nombres de clase del HTML con los selectores CSS: esa coincidencia determina qué elemento recibe cada regla. El panel de resultado permite reconocer el efecto de estructura, espacio, color y distribución.`;
    if(section.title==='Manejo del DOM')return `Primero identifica el elemento creado por HTML; luego observa cómo JavaScript usa «${label}» para encontrarlo, recorrerlo o modificarlo. Ejecuta el control del resultado y comprueba qué parte del DOM cambia.`;
    if(section.title.startsWith('JavaScript'))return `Lee el ejemplo en este orden: valores iniciales, operación con «${label}» y salida obtenida. Cambia uno de los datos para comprobar cómo esa instrucción transforma el resultado.`;
    if(section.title.startsWith('CSS'))return `Relaciona el selector con el elemento HTML que posee la etiqueta, clase o id correspondiente. Después cambia una propiedad y compara el código con el resultado para reconocer su efecto visual.`;
    const attributes=item.attrs?.length?` Revisa también ${item.attrs.join(', ')}, porque estos atributos precisan su comportamiento.`:'';
    return `Localiza «${label}» en el código y observa qué contenido organiza o qué función semántica cumple; después compáralo con el resultado renderizado.${attributes}`;
  };

  sections.forEach(section=>{
    if(!section.description.includes('Orden recomendado:')){
      section.description+=` Orden recomendado: lee la idea principal, revisa el código y confirma el efecto en el resultado.`;
    }
    section.items.forEach(item=>{
      if(!item.description.includes('Para leer este ejemplo:')){
        item.description+=` Para leer este ejemplo: ${detailFor(section,item)}`;
      }
    });
  });

  buildNav();
  render();
})();
