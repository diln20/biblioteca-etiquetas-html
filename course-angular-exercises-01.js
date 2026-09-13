(()=>{
  if(window.__angularExercises01Added)return;
  window.__angularExercises01Added=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;
  const exercise=(number,name,description,code,preview,tip)=>T(`Ejercicio ${number}`,name,description,code,preview,[],{kind:'Ejercicio Angular',tip});
  sections.push({title:'Frameworks frontend · Angular · 2A. Ejercicios iniciales',navLabel:'Angular · Ejercicios 1–2',group:'Frameworks',primaryArea:'Frameworks',areaOrder:220,description:'Primeros ejercicios: mostrar datos y construir una tarjeta dinámica.',quote:'“Empieza pequeño, modifica cada ejemplo y conserva un commit por ejercicio.”',challenge:'Completa ambos ejercicios sin copiar la solución final.',items:[
    exercise(1,'Hola Mundo','Crea el proyecto, reemplaza la vista inicial y mueve el texto a una propiedad title. El objetivo es comprobar el recorrido main.ts → componente raíz → plantilla.','ng new hola-angular --style=scss --strict\ncd hola-angular\nng serve --open\n\n// app.ts\ntitle = "Hola Mundo desde Angular";\n\n<!-- app.html -->\n<h1>{{ title }}</h1>','<h1 style="font-family:system-ui;color:#b91c1c">Hola Mundo desde Angular</h1>','Extra: añade un subtítulo y explica por qué no necesitas querySelector.'),
    exercise(2,'Tarjeta dinámica','Crea ProductCard con nombre, precio y disponibilidad. Usa interpolación, property binding y un evento.','ng g c features/products/product-card\n\nname = "Teclado";\nprice = 180000;\navailable = true;\n\n<h2>{{ name }}</h2>\n<p>{{ price }}</p>\n<button [disabled]="!available" (click)="available = false">Comprar</button>','<article style="font-family:system-ui;border:1px solid #cbd5e1;border-radius:12px;padding:16px"><h2>Teclado</h2><p>$180.000</p><button>Comprar</button></article>','Extra: después de comprar, muestra “Agotado” con @if.')
  ]});
})();
