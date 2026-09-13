# Ruta de Desarrollo Web

Biblioteca y ruta de aprendizaje interactiva para estudiar **HTML, CSS, JavaScript, DOM, Git, APIs, frameworks frontend, FastAPI y Django REST** mediante explicaciones, ejemplos ejecutables, ejercicios y proyectos guiados.

## Funciones principales

- Navegación organizada por áreas y niveles.
- Buscador, filtros y favoritos.
- Código con vista previa y editor en vivo.
- Ejercicios y proyectos paso a paso.
- Progreso real por secciones, guardado en `localStorage`.
- Diseño adaptable para escritorio, tableta y móvil.
- Contenido de frontend, backend, APIs y Git.

## Ejecutar localmente

Puedes abrir `index.html` directamente. Para evitar restricciones del navegador al trabajar con archivos locales, también puedes iniciar un servidor sencillo:

```bash
python -m http.server 8000
```

Después abre `http://localhost:8000`.

## Verificar cambios

El proyecto incluye una prueba de humo sin dependencias externas:

```bash
node loader.smoke.test.cjs
```

La prueba valida el bundle principal, los recursos cargados, la sintaxis del JavaScript, las secciones educativas y la navegación agrupada.

## Estructura actual

- `index.html`: punto de entrada y metadatos de la página.
- `payload-*.js`: fragmentos del bundle HTML original.
- `loader.js`: reconstruye la aplicación y carga estilos y secciones.
- `*-section.js`: contenido de cada ruta de aprendizaje.
- `course-ui.js`: agrupación, navegación, tema y progreso.
- `content-corrections.js`: ajustes puntuales de contenido aplicados de forma idempotente.
- `theme-modern.css`, `course-ui-enhancements.css` y `screen-fit.css`: apariencia, accesibilidad y adaptación de pantalla.
- `loader.smoke.test.cjs`: verificación automática principal.

## Agregar una sección

1. Crea o actualiza un archivo `*-section.js`.
2. Añade objetos a `sections` con `title`, `description`, `quote`, `challenge` e `items`.
3. Registra el script en `loader.js` antes de `course-ui.js`.
4. Ejecuta `node loader.smoke.test.cjs`.
5. Actualiza el número de versión del recurso en `loader.js` cuando cambie un archivo servido por GitHub Pages.

## Próximos pasos

- Migrar gradualmente el bundle comprimido a módulos JavaScript.
- Añadir URLs compartibles por lección.
- Incorporar ejercicios con comprobación automática.
- Ejecutar pruebas reales de navegador y auditorías de accesibilidad.

## Publicación

El sitio es estático y puede publicarse directamente con GitHub Pages desde la rama `main`.
