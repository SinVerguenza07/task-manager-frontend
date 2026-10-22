# Preguntas de cierre - EC2 F2 A8

## 1. ¿Por qué las reglas de validación se colocaron en una utilidad?

Porque la misma regla se usa en dos lugares: el formulario de alta (`TaskForm`) y la edición (`TaskItem`). Al centralizarla en `utils/task-validation.ts` se evita duplicar código, se garantiza que ambos flujos apliquen el mismo criterio y, si cambia una regla (por ejemplo, la longitud mínima), se modifica en un solo sitio. Además es una función pura, fácil de probar sin renderizar componentes.

## 2. ¿Qué significa el retorno string | null de validateTaskTitle?

Es un tipo unión: la función devuelve un `string` con el mensaje de error cuando el título es inválido, o `null` cuando es válido. TypeScript obliga a quien la llama a manejar ambos casos. En los componentes se usa `validateTaskTitle(value) ?? ""` para convertir `null` en cadena vacía (sin error).

## 3. ¿Qué función cumplen aria-invalid, aria-describedby y role alert?

- `aria-invalid`: indica a las tecnologías de asistencia que el valor del campo no es válido.
- `aria-describedby`: asocia el campo con elementos que lo describen (texto de ayuda `task-title-help` y mensaje de error `task-title-error`), de modo que un lector de pantalla los lea al enfocar el campo.
- `role="alert"`: marca el mensaje de error como una región asertiva; cuando aparece, el lector de pantalla lo anuncia de inmediato sin que el usuario deba buscarlo.

## 4. ¿Por qué query, filter y sortBy son estados controlados?

Porque sus valores viven en el estado de `App` y los campos de `TaskFilters` muestran ese `value` y lo actualizan mediante `onChange`. Así React es la única fuente de verdad: la lista visible, el contador de resultados y el botón "Limpiar criterios" siempre dependen de los mismos valores, y `handleClearCriteria` puede reiniciarlos desde un solo lugar.

## 5. ¿Por qué visibleTasks no debe almacenarse como estado independiente?

Porque es un dato derivado: se puede calcular a partir de `tasks`, `query`, `filter` y `sortBy`. Guardarlo como estado crearía información duplicada que habría que sincronizar manualmente (con el riesgo de que quede desactualizada, por ejemplo al editar una tarea). Calcularlo en cada render con `getVisibleTasks` garantiza que siempre sea coherente.

## 6. ¿Cómo se normaliza una búsqueda?

Se aplica `trim()` para eliminar espacios al inicio y al final, y `toLocaleLowerCase("es-MX")` tanto al texto buscado como al título de cada tarea. Con ello la comparación con `includes` no distingue mayúsculas de minúsculas ni se ve afectada por espacios sobrantes. Si la búsqueda queda vacía, `includes("")` es verdadero y todas las tareas coinciden.

## 7. ¿Por qué se crea una copia antes de utilizar sort?

Porque `Array.prototype.sort` ordena el arreglo original (muta). En React no se deben mutar el estado ni las props, ya que React compara referencias para detectar cambios y se pueden producir resultados inesperados. Con `[...filteredTasks].sort(...)` se ordena una copia y `tasks` queda intacto. (En este caso `filter` ya devuelve un arreglo nuevo, pero la copia hace explícita la intención y protege si se cambia el código.)

## 8. ¿Qué responsabilidad tiene task-query.service.ts?

Concentrar la lógica de consulta de la colección: normalizar la búsqueda, filtrar por título y estado, y ordenar según el criterio elegido (`getVisibleTasks`). Es independiente de React y de la interfaz, por lo que `App` solo declara qué criterios quiere y el servicio devuelve las tareas visibles.

## 9. ¿Por qué el resultado de JSON.parse se trata como unknown?

Porque lo guardado en `localStorage` es externo y no confiable: pudo ser editado a mano, corromperse o venir de una versión anterior de la aplicación. `JSON.parse` devuelve `any`, que desactiva la verificación de tipos. Declararlo `unknown` obliga a validar la estructura antes de usarla, en lugar de asumir que es un `Task[]`.

## 10. ¿Qué comprueba la función isTask?

Es un type guard (`value is Task`). Verifica que el valor sea un objeto no nulo y que tenga `id` y `title` de tipo string, un `status` válido (`"pending"` o `"completed"`), y `createdAt` y `updatedAt` como strings que representen fechas válidas (`Number.isFinite(Date.parse(...))`). En `loadTasks` se usa con `every(isTask)` sobre el arreglo; si algo falla, se regresa a los datos iniciales.

## 11. ¿Qué ventaja ofrece la inicialización diferida de useState?

`useState(() => loadTasks(initialTasks))` ejecuta la función solo en el primer render. Si se escribiera `useState(loadTasks(initialTasks))`, la lectura y validación de `localStorage` se repetiría en cada render, aunque React ignorara el resultado. La inicialización diferida evita ese trabajo innecesario.

## 12. ¿Por qué localStorage se sincroniza mediante useEffect?

Porque guardar en `localStorage` es un efecto secundario: interactúa con algo externo a React y no debe ejecutarse durante el render, que tiene que ser puro. Con `useEffect(() => saveTasks(tasks), [tasks])` se guarda después de renderizar y solo cuando `tasks` cambia, sin repetir la lógica en cada handler (agregar, editar, completar, eliminar).

## 13. ¿Por qué TaskSummary recibe tasks y TaskList recibe visibleTasks?

Porque tienen propósitos distintos. El resumen (total, pendientes, completadas) debe reflejar toda la colección, sin importar los filtros activos. La lista muestra únicamente lo que coincide con la búsqueda, el filtro y el orden elegidos, por lo que recibe el resultado de `getVisibleTasks`.

## 14. ¿Qué información se pierde y cuál permanece al recargar?

**Permanece:** la colección de tareas (títulos, estados, fechas de creación y actualización), guardada en `localStorage` bajo la clave `task-manager.tasks`.

**Se pierde:** el estado de la interfaz que solo vive en memoria: el texto de búsqueda, el filtro de estado, el criterio de orden (vuelven a `""`, `"all"` y `"updated-desc"`), el texto que se estaba escribiendo en el formulario, los mensajes de error y cualquier edición en curso de una tarea.

## 15. ¿Qué dificultad encontraste y cómo la resolviste?

La principal dificultad fue integrar Tailwind: al dejar `index.css` solo con `@import "tailwindcss"`, los componentes que usaban clases personalizadas (`panel`, `task-item`, `filters-grid`, etc.) perdieron su estilo, mientras que otros ya estaban migrados. Lo resolví migrando cada componente a clases utilitarias, reutilizando `TaskStatusBadge` y `AppFooter`, y extrayendo el encabezado de sección repetido a un componente `SectionHeading` para no duplicar clases. Al final comprobé el resultado con `pnpm lint` y `pnpm build`.
