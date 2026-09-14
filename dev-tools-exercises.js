(()=>{
  if(window.__devToolsExercisesAdded)return;
  window.__devToolsExercisesAdded=true;
  if(!Array.isArray(window.sections))return;

  const tools=window.sections.filter(section=>(section.primaryArea||section.group)==='Herramientas');
  tools.forEach(section=>section.items?.forEach(item=>{
    const name=String(item.name||'').toLowerCase();
    item.exerciseTitle='Ejercicio para ti · configura y comprueba';
    item.exerciseIntro='No marques la herramienta como aprendida solo por instalarla. Haz una prueba mínima, observa el efecto y deja la configuración reproducible cuando corresponda.';
    item.exerciseTasks=[
      'Realiza la instalación o configuración indicada en la lección y comprueba que VS Code la reconoce.',
      'Crea un caso pequeño que obligue a la herramienta a actuar: formatea, provoca un warning, escribe una ruta, cambia una etiqueta, ejecuta un console.log o inicia una sesión según el tema.',
      'Explica en una frase qué problema resuelve la herramienta y qué archivo o ajuste tendrías que compartir con otro estudiante para reproducirlo.'
    ];
    item.exerciseExtra='Desactiva temporalmente la extensión o el ajuste, repite la prueba y compara qué comportamiento desaparece. Después vuelve a activarlo.';

    if(name.includes('prettier'))item.exerciseExtra='Desordena a propósito un archivo, ejecuta npm run format o guarda el archivo y compara el antes/después. Luego ejecuta npm run format:check.';
    if(name.includes('eslint'))item.exerciseExtra='Crea una variable sin usar, ejecuta npm run lint y comprueba que el diagnóstico aparece también en VS Code.';
    if(name.includes('live share'))item.exerciseExtra='Haz una sesión de prueba con un compañero o segundo perfil, revisa permisos y ciérrala al terminar. No compartas secretos.';
    if(name.includes('path intellisense'))item.exerciseExtra='Crea dos carpetas de assets y comprueba que las sugerencias cambian correctamente al mover un archivo.';
    if(name.includes('console ninja'))item.exerciseExtra='Compara el valor inline con la consola de DevTools para entender que la extensión es una ayuda visual y no un reemplazo del debugger.';
  }));
})();
