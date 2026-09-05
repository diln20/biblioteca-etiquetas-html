(()=>{
  if(window.__domSectionAdded)return;
  window.__domSectionAdded=true;

  const interactive=(html,js)=>html+'<script>'+js+'</scr'+'ipt>';
  const D=(topic,name,description,html,js,kind='DOM')=>T(
    topic,name,description,`${html}\n\n<script>\n${js}\n</script>`,interactive(html,js),[],{kind}
  );
  sections.push({
    title:'Manejo del DOM',
    description:'Selecciona, recorre y modifica documentos HTML dinámicamente mediante JavaScript.',
    quote:'“El DOM es la representación que conecta JavaScript con la página.”',
    challenge:'Construye una lista dinámica usando selección, creación de nodos y eventos.',
    items:[
      D('querySelector','Seleccionar elementos','querySelector obtiene la primera coincidencia y querySelectorAll devuelve todas las coincidencias.',
        '<h3 id="titulo-dom">Título original</h3>\n<p class="texto-dom">Primer párrafo</p>\n<p class="texto-dom">Segundo párrafo</p>',
        'const titulo = document.querySelector("#titulo-dom");\nconst parrafos = document.querySelectorAll(".texto-dom");\n\ntitulo.textContent = `Se encontraron ${parrafos.length} párrafos`;'),
      D('textContent','Modificar contenido','textContent cambia texto de forma segura; innerHTML interpreta una cadena como marcado HTML.',
        '<div id="contenido-dom">Contenido inicial</div>\n<button id="contenido-boton">Actualizar</button>',
        'document.querySelector("#contenido-boton").addEventListener("click", () => {\n  const contenido = document.querySelector("#contenido-dom");\n  contenido.innerHTML = "<strong>Contenido actualizado</strong>";\n});'),
      D('createElement','Crear y eliminar nodos','createElement construye un nodo, append lo inserta y remove lo elimina del documento.',
        '<button id="crear-dom">Crear elemento</button>\n<div id="contenedor-dom"></div>',
        'const contenedor = document.querySelector("#contenedor-dom");\n\ndocument.querySelector("#crear-dom").addEventListener("click", () => {\n  const elemento = document.createElement("p");\n  elemento.textContent = "Elemento creado dinámicamente";\n  elemento.onclick = () => elemento.remove();\n  contenedor.append(elemento);\n});'),
      D('classList','Clases y estilos','classList agrega, elimina o alterna clases sin reemplazar las demás clases del elemento.',
        '<div class="caja-dom" id="caja-dom">Alterna mi estado</div>\n<button id="clase-dom">Cambiar clase</button>\n<style>.caja-dom{padding:14px;background:#e2e8f0}.caja-dom.activa{color:white;background:#2563eb}</style>',
        'const caja = document.querySelector("#caja-dom");\ndocument.querySelector("#clase-dom").onclick = () => {\n  caja.classList.toggle("activa");\n};'),
      D('dataset','Atributos y data-*','getAttribute y setAttribute administran atributos; dataset permite leer información personalizada.',
        '<button class="curso-dom" data-curso="HTML">HTML</button>\n<button class="curso-dom" data-curso="CSS">CSS</button>\n<p id="curso-elegido">Sin selección</p>',
        'document.querySelectorAll(".curso-dom").forEach(boton => {\n  boton.addEventListener("click", () => {\n    document.querySelector("#curso-elegido").textContent =\n      `Curso elegido: ${boton.dataset.curso}`;\n    boton.setAttribute("aria-pressed", "true");\n  });\n});'),
      D('closest','Recorrer el DOM','parentElement, children, closest y matches permiten navegar entre elementos relacionados.',
        '<article class="tarjeta-dom">\n  <h3>Artículo</h3>\n  <button class="detalles-dom">Ver contenedor</button>\n  <p class="salida-dom"></p>\n</article>',
        'document.querySelector(".detalles-dom").addEventListener("click", evento => {\n  const tarjeta = evento.target.closest(".tarjeta-dom");\n  tarjeta.querySelector(".salida-dom").textContent =\n    `El contenedor es un ${tarjeta.tagName.toLowerCase()}`;\n});'),
      D('event.target','Delegación de eventos','Un solo listener en el contenedor puede atender eventos de muchos elementos presentes o futuros.',
        '<ul id="acciones-dom">\n  <li>HTML <button data-eliminar>Eliminar</button></li>\n  <li>CSS <button data-eliminar>Eliminar</button></li>\n  <li>JavaScript <button data-eliminar>Eliminar</button></li>\n</ul>',
        'document.querySelector("#acciones-dom").addEventListener("click", evento => {\n  if (!evento.target.matches("[data-eliminar]")) return;\n  evento.target.closest("li").remove();\n});',
        'Eventos')
    ]
  });

  buildNav();
  render();
})();
