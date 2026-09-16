(()=>{
  if(window.__publicApiJsonPracticeAdded)return;
  window.__publicApiJsonPracticeAdded=true;
  if(!Array.isArray(window.sections)||typeof window.T!=='function')return;

  const preview=(title,html)=>`<section style="font-family:system-ui;padding:16px;border:1px solid #334155;border-radius:12px;background:#07111f;color:#e5edf8"><strong style="display:block;margin-bottom:8px;color:#34d399">${title}</strong>${html}</section>`;
  const file=(path,detail)=>({path,method:'MANUAL',detail});
  const P=(tag,name,description,code,previewHtml,tip,meta={})=>T(tag,name,description,code,previewHtml,[],{
    kind:'APIs públicas · JSON',
    tip,
    guideTitle:'Dónde se hace cada modificación',
    codeLabel:'Código práctico · JSON de API pública',
    filesToCreateTitle:'Archivos para practicar',
    filesToCreateStatus:'Crea los archivos indicados y ejecuta el proyecto desde un servidor local. Revisa siempre la respuesta real en DevTools · Network · Response.',
    ...meta
  });

  sections.push({
    title:'APIs · JSON de APIs públicas en práctica',
    navLabel:'JSON de APIs públicas',
    group:'APIs',
    primaryArea:'APIs',
    course:'APIs',
    areaOrder:140,
    description:'Aprende a leer y usar el JSON real de APIs públicas. Cada API puede organizar sus datos de manera distinta: Open-Meteo concentra valores actuales dentro de current, PokéAPI mezcla propiedades simples con arrays y objetos anidados, y Rick and Morty envuelve una colección dentro de results junto con información de paginación en info.',
    quote:'“No basta con hacer fetch: primero entiende la forma del JSON y después decide qué campos necesita tu interfaz.”',
    challenge:'Construye una página con tres botones: clima, Pokémon y personajes. Cada botón debe consultar su API, convertir la respuesta con response.json() y mostrar únicamente los campos útiles en HTML.',
    items:[
      P(
        'api json estructura',
        '1. Primero mira la forma del JSON',
        'Antes de escribir data.algo, abre DevTools y observa la respuesta. Hay APIs que devuelven un objeto principal, otras devuelven arrays y otras envuelven los registros en una propiedad como results. Si entiendes la estructura, sabrás si debes usar acceso por propiedad, índice, map(), filter() o un bucle.',
        `async function inspeccionar(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("HTTP " + response.status);
  }

  const data = await response.json();

  console.log("Respuesta completa:", data);
  console.log("¿Es array?", Array.isArray(data));
  console.log("Claves principales:", Object.keys(data));

  return data;
}

// Ejemplo:
// inspeccionar("https://pokeapi.co/api/v2/pokemon/pikachu");`,
        preview('Método de lectura','<p style="margin:0">Network → Response → Object.keys(data) → localizar campo → usarlo.</p>'),
        'No empieces adivinando propiedades. Mira el JSON primero y sigue la ruta exacta hasta el dato.',
        {
          guide:[['Abrir','DevTools · Network · Response','Observa el JSON recibido.'],['Abrir','DevTools · Console','Prueba Object.keys(data), Array.isArray(data) y console.table().']],
          filesToCreate:[file('javascript/apis-publicas-json/app.js','Función genérica para inspeccionar respuestas JSON.')]
        }
      ),
      P(
        'open meteo json current units',
        '2. Open-Meteo · objeto current y unidades',
        'Open-Meteo devuelve un objeto principal. Cuando solicitas condiciones actuales, los valores elegidos aparecen dentro de current y las unidades correspondientes dentro de current_units. La idea es tomar solo esas propiedades y convertirlas en un objeto más pequeño que la interfaz pueda usar fácilmente.',
        `async function obtenerClima() {
  const url = new URL("https://api.open-meteo.com/v1/forecast");

  url.searchParams.set("latitude", "7.1254");
  url.searchParams.set("longitude", "-73.1198");
  url.searchParams.set(
    "current",
    "temperature_2m,relative_humidity_2m,wind_speed_10m"
  );

  const response = await fetch(url);
  if (!response.ok) throw new Error("HTTP " + response.status);

  const json = await response.json();

  console.log("JSON completo:", json);
  console.log("current:", json.current);
  console.log("current_units:", json.current_units);

  const weather = {
    temperature: json.current.temperature_2m,
    temperatureUnit: json.current_units.temperature_2m,
    humidity: json.current.relative_humidity_2m,
    humidityUnit: json.current_units.relative_humidity_2m,
    wind: json.current.wind_speed_10m,
    windUnit: json.current_units.wind_speed_10m
  };

  return weather;
}

obtenerClima()
  .then(function(weather) {
    console.table(weather);
  })
  .catch(console.error);`,
        preview('Ruta dentro del JSON','<p style="margin:0">json.current.temperature_2m<br>json.current_units.temperature_2m</p>'),
        'Aquí no necesitas recorrer un array: current es un objeto y accedes directamente a sus propiedades.',
        {
          guide:[['Crear','javascript/apis-publicas-json/clima/app.js','Consulta Open-Meteo y crea el objeto weather.'],['Abrir','DevTools · Network','Compara current con current_units.']],
          filesToCreate:[file('javascript/apis-publicas-json/clima/app.js','Lectura y transformación del JSON de Open-Meteo.')]
        }
      ),
      P(
        'open meteo json html',
        '3. Open-Meteo · llevar el JSON al HTML',
        'Después de transformar el JSON, el HTML solo necesita contenedores. JavaScript coloca cada valor con textContent. Así separas la lectura de la API del render de la interfaz.',
        `<!-- index.html -->
<button id="clima" type="button">Consultar clima</button>
<p id="estado"></p>
<dl>
  <dt>Temperatura</dt>
  <dd id="temperatura">--</dd>
  <dt>Humedad</dt>
  <dd id="humedad">--</dd>
  <dt>Viento</dt>
  <dd id="viento">--</dd>
</dl>
<script src="app.js" defer><\/script>

// app.js
const weatherButton = document.querySelector("#clima");
const statusText = document.querySelector("#estado");

weatherButton.addEventListener("click", mostrarClima);

async function mostrarClima() {
  statusText.textContent = "Cargando...";

  try {
    const weather = await obtenerClima();

    document.querySelector("#temperatura").textContent =
      weather.temperature + " " + weather.temperatureUnit;

    document.querySelector("#humedad").textContent =
      weather.humidity + " " + weather.humidityUnit;

    document.querySelector("#viento").textContent =
      weather.wind + " " + weather.windUnit;

    statusText.textContent = "Datos actualizados";
  } catch (error) {
    statusText.textContent = "No se pudo consultar el clima";
    console.error(error);
  }
}

// obtenerClima() es la función de la práctica anterior.`,
        preview('JSON → HTML','<p style="margin:0">current → objeto weather → textContent → temperatura / humedad / viento</p>'),
        'Transforma primero el JSON y renderiza después. Esa separación evita llenar el DOM de rutas largas como json.current.algo.',
        {
          guide:[['Crear','javascript/apis-publicas-json/clima/index.html','Botón, estado y campos del clima.'],['Modificar','javascript/apis-publicas-json/clima/app.js','Agrega mostrarClima() debajo de obtenerClima().']],
          filesToCreate:[file('javascript/apis-publicas-json/clima/index.html','Interfaz del clima.'),file('javascript/apis-publicas-json/clima/app.js','Fetch, transformación y render.')]
        }
      ),
      P(
        'pokeapi json nested arrays',
        '4. PokéAPI · objetos anidados y arrays',
        'El JSON de un Pokémon contiene propiedades simples como id, name, height y weight, pero también arrays como types y abilities y un objeto sprites. Para obtener los tipos debes recorrer json.types y entrar a item.type.name; para las habilidades haces lo mismo con item.ability.name.',
        `async function obtenerPokemon(name) {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" +
      encodeURIComponent(name.toLowerCase())
  );

  if (!response.ok) {
    throw new Error("Pokémon no encontrado");
  }

  const json = await response.json();

  console.log("JSON completo:", json);
  console.log("sprites:", json.sprites);
  console.log("types:", json.types);
  console.log("abilities:", json.abilities);

  const types = json.types.map(function(item) {
    return item.type.name;
  });

  const abilities = json.abilities.map(function(item) {
    return item.ability.name;
  });

  return {
    id: json.id,
    name: json.name,
    image: json.sprites.front_default,
    types: types,
    abilities: abilities,
    height: json.height / 10,
    weight: json.weight / 10
  };
}

obtenerPokemon("pikachu")
  .then(console.table)
  .catch(console.error);`,
        preview('Rutas importantes','<p style="margin:0">json.sprites.front_default<br>json.types[].type.name<br>json.abilities[].ability.name</p>'),
        'Cuando veas [] en la respuesta, piensa en índice, for...of, map(), filter() o find().',
        {
          guide:[['Crear','javascript/apis-publicas-json/pokemon/app.js','Consulta PokéAPI y reduce el JSON a los campos necesarios.']],
          filesToCreate:[file('javascript/apis-publicas-json/pokemon/app.js','Lectura de objetos y arrays anidados de PokéAPI.')]
        }
      ),
      P(
        'pokeapi json html card',
        '5. PokéAPI · convertir JSON en una tarjeta HTML',
        'Una vez normalizado el JSON puedes crear una tarjeta sin depender de la estructura compleja de la API. join() transforma arrays como types y abilities en texto legible.',
        `<!-- index.html -->
<input id="pokemon" value="pikachu" placeholder="pikachu o 25">
<button id="buscar" type="button">Buscar</button>
<article id="ficha"></article>
<script src="app.js" defer><\/script>

// app.js
const input = document.querySelector("#pokemon");
const card = document.querySelector("#ficha");

document.querySelector("#buscar").addEventListener("click", async function() {
  card.textContent = "Cargando...";

  try {
    const pokemon = await obtenerPokemon(input.value.trim());

    card.replaceChildren();

    const image = document.createElement("img");
    image.src = pokemon.image;
    image.alt = pokemon.name;

    const title = document.createElement("h2");
    title.textContent = pokemon.name;

    const info = document.createElement("p");
    info.textContent =
      "Tipos: " + pokemon.types.join(", ") +
      " · Habilidades: " + pokemon.abilities.join(", ");

    card.append(image, title, info);
  } catch (error) {
    card.textContent = error.message;
  }
});

// obtenerPokemon() es la función de la práctica anterior.`,
        preview('JSON anidado → tarjeta','<p style="margin:0">types.map(...) + abilities.map(...) → objeto simple → img + h2 + p</p>'),
        'No necesitas mostrar todo el JSON. La interfaz debe quedarse solo con la información útil para el usuario.',
        {
          guide:[['Crear','javascript/apis-publicas-json/pokemon/index.html','Input, botón y article.'],['Modificar','javascript/apis-publicas-json/pokemon/app.js','Agrega el evento y el render de la tarjeta.']],
          filesToCreate:[file('javascript/apis-publicas-json/pokemon/index.html','Buscador de Pokémon.'),file('javascript/apis-publicas-json/pokemon/app.js','Fetch y render de PokéAPI.')]
        }
      ),
      P(
        'rick morty json results info',
        '6. Rick and Morty · results e info',
        'Esta API devuelve un objeto con dos zonas importantes: info contiene paginación y results contiene el array de personajes. Por eso no debes escribir json.map(...); primero debes llegar a json.results. Cada personaje también tiene objetos anidados como origin y location.',
        `async function obtenerPersonajes(page) {
  const response = await fetch(
    "https://rickandmortyapi.com/api/character?page=" + page
  );

  if (!response.ok) {
    throw new Error("HTTP " + response.status);
  }

  const json = await response.json();

  console.log("info:", json.info);
  console.log("results:", json.results);

  const characters = json.results.map(function(character) {
    return {
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      image: character.image,
      origin: character.origin?.name ?? "Desconocido"
    };
  });

  return {
    characters: characters,
    next: json.info.next,
    prev: json.info.prev,
    pages: json.info.pages,
    count: json.info.count
  };
}

obtenerPersonajes(1)
  .then(function(data) {
    console.table(data.characters);
    console.log("Páginas:", data.pages);
  })
  .catch(console.error);`,
        preview('Estructura de colección','<p style="margin:0">json.info → paginación<br>json.results → array de personajes</p>'),
        'Si una API envuelve el array dentro de results, data o items, localiza primero esa propiedad antes de usar map().',
        {
          guide:[['Crear','javascript/apis-publicas-json/personajes/app.js','Lee info y transforma results.']],
          filesToCreate:[file('javascript/apis-publicas-json/personajes/app.js','Lectura de paginación y personajes.')]
        }
      ),
      P(
        'rick morty json filter html',
        '7. Rick and Morty · filtrar el JSON y mostrarlo en HTML',
        'Después de obtener results puedes filtrar personajes antes de renderizar. En este ejemplo el select decide si mostrar todos, Alive, Dead o unknown. filter() trabaja sobre el array ya convertido desde JSON.',
        `<!-- index.html -->
<select id="estado">
  <option value="all">Todos</option>
  <option value="Alive">Alive</option>
  <option value="Dead">Dead</option>
  <option value="unknown">unknown</option>
</select>
<button id="cargar" type="button">Cargar</button>
<section id="personajes"></section>
<script src="app.js" defer><\/script>

// app.js
const statusSelect = document.querySelector("#estado");
const container = document.querySelector("#personajes");

document.querySelector("#cargar").addEventListener("click", async function() {
  container.textContent = "Cargando...";

  try {
    const data = await obtenerPersonajes(1);
    const selectedStatus = statusSelect.value;

    const visible = data.characters.filter(function(character) {
      return selectedStatus === "all" || character.status === selectedStatus;
    });

    container.replaceChildren();

    for (const character of visible) {
      const card = document.createElement("article");
      const image = document.createElement("img");
      const title = document.createElement("h2");
      const detail = document.createElement("p");

      image.src = character.image;
      image.alt = character.name;
      title.textContent = character.name;
      detail.textContent =
        character.species + " · " + character.status +
        " · Origen: " + character.origin;

      card.append(image, title, detail);
      container.append(card);
    }
  } catch (error) {
    container.textContent = "No se pudieron cargar los personajes";
    console.error(error);
  }
});`,
        preview('Colección JSON → filtro → DOM','<p style="margin:0">results → map() → characters → filter() → tarjetas</p>'),
        'Puedes transformar y filtrar el array antes de tocar el DOM. Así el render queda más simple.',
        {
          guide:[['Crear','javascript/apis-publicas-json/personajes/index.html','Select, botón y contenedor.'],['Modificar','javascript/apis-publicas-json/personajes/app.js','Agrega filtro y render.']],
          filesToCreate:[file('javascript/apis-publicas-json/personajes/index.html','Controles y resultados.'),file('javascript/apis-publicas-json/personajes/app.js','Transformación, filtro y render del JSON.')]
        }
      ),
      P(
        'comparar json api patterns',
        '8. Tres patrones de JSON que debes reconocer',
        'Estas tres APIs enseñan estructuras distintas que se repiten en muchos servicios reales. Aprender a reconocerlas te permite adaptarte a otras APIs aunque cambien los nombres de las propiedades.',
        `// 1. OBJETO CON SUBOBJETO
// Open-Meteo
const temperatura = json.current.temperature_2m;

// 2. OBJETO CON ARRAYS ANIDADOS
// PokéAPI
const tipos = json.types.map(function(item) {
  return item.type.name;
});

// 3. OBJETO QUE ENVUELVE UNA COLECCIÓN
// Rick and Morty
const personajes = json.results.map(function(item) {
  return item.name;
});

// Preguntas útiles cada vez que recibas JSON:
// ¿data es {} o []?
// ¿Dónde está el array principal?
// ¿Hay objetos anidados?
// ¿Qué campos necesita realmente mi HTML?
// ¿Debo usar map, filter o find?`,
        preview('Patrones','<p style="margin:0">objeto.subobjeto · objeto.arrays[] · objeto.results[]</p>'),
        'Memoriza el método, no las rutas exactas: inspeccionar → localizar → transformar → renderizar.',
        {
          guide:[['Comparar','DevTools · Response','Abre una respuesta de cada API y señala con tus palabras dónde está cada dato.']],
          filesToCreate:[file('javascript/apis-publicas-json/README.md','Resume las diferencias entre current, types/abilities y results/info.')]
        }
      )
    ]
  });
})();
