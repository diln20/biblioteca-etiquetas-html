# Ruta de Desarrollo Web

Biblioteca y ruta interactiva para estudiar **HTML, CSS, JavaScript, DOM, Git, APIs, Angular, Solid.js, frameworks frontend, FastAPI, Django REST, UX accesible y arquitectura backend** mediante explicaciones, diagramas, código, ejercicios progresivos y proyectos guiados.

## Funciones principales

- Navegación organizada por áreas y niveles.
- Buscador, filtros y favoritos.
- Código con vista previa y editor en vivo.
- Progreso guardado en `localStorage`.
- Diseño adaptable para escritorio, tableta y móvil.
- Ejercicios desde Hola Mundo hasta proyectos completos.

## Angular desde cero

La ruta explica cómo funciona Angular antes de introducir sintaxis:

- Arranque con `main.ts`, `bootstrapApplication` y providers.
- Angular CLI, comandos y estructura de carpetas.
- Componentes standalone, bindings, `input`, `output`, signals y control de flujo.
- Formularios sencillos y reactivos.
- Organización por funcionalidades, servicios e inyección.
- Router, lazy loading, HttpClient, interceptores y RxJS.
- Estado de feature, rendimiento, `@defer`, SSR, seguridad y pruebas.
- **18 ejercicios progresivos**, desde Hola Mundo hasta un proyecto final con CI/CD.

## Otras rutas añadidas

### Formularios accesibles

Teclado móvil adecuado, `inputmode`, `autocomplete`, labels persistentes, foco visible, errores específicos, requisitos de contraseña y resumen de validación.

### Solid.js

Definición, JSX, reactividad fina, `createSignal`, `createMemo`, `createEffect`, stores, casos de uso y seis ejercicios progresivos.

### Escalabilidad backend

Evolución de una API desde una sola instancia hasta balanceador, caché, colas, réplicas, resiliencia, observabilidad y pruebas de carga.

## Ejecutar localmente

```bash
python -m http.server 8000
```

Después abre `http://localhost:8000`.

## Verificar cambios

```bash
node loader.smoke.test.cjs
```

La prueba valida recursos, sintaxis, organización, contenido educativo y la progresión de ejercicios.

## Estructura actual

- `index.html`: punto de entrada y metadatos.
- `payload-*.js`: fragmentos del bundle HTML original.
- `loader.js`: reconstruye la aplicación y carga las rutas.
- `learning-visuals.js`: diagramas, terminales, árboles y comparaciones reutilizables.
- `angular-*.js` y `course-angular-*.js`: ruta completa de Angular.
- `course-ux-form-*.js`: formularios accesibles.
- `course-solid-*.js`: ruta de Solid.js.
- `course-backend-scaling-*.js`: escalabilidad backend.
- `section-order.js`: agrupación y orden pedagógico.
- `course-ui.js`: navegación, tema y progreso.
- `loader.smoke.test.cjs`: verificación automática.

## Agregar una sección

1. Crea un archivo JavaScript de contenido.
2. Añade objetos a `sections` con `title`, `description`, `quote`, `challenge` e `items`.
3. Asigna `group`, `primaryArea` y, cuando necesites una posición concreta, `areaOrder`.
4. Registra el script en `loader.js` antes de `section-order.js`.
5. Ejecuta `node loader.smoke.test.cjs`.
6. Incrementa la versión del recurso para invalidar la caché de GitHub Pages.

## Publicación

El sitio es estático y se publica con GitHub Pages desde la rama `main`.
