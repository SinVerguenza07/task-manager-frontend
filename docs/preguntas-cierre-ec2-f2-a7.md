# Preguntas de cierre - EC2 F2 A7

## 1. ¿Qué diferencia existe entre una variable local y el estado de React?

Una variable local se reinicia en cada render, no conserva su valor y cambiarla no actualiza la interfaz. El estado de React se conserva entre renderizados y, cuando se actualiza con su función `set`, React vuelve a renderizar el componente con el nuevo valor.

## 2. ¿Qué valores devuelve useState?

Un arreglo con dos elementos: el valor actual del estado y una función para solicitar el siguiente valor. Por ejemplo: `const [tasks, setTasks] = useState<Task[]>(initialTasks)`.

## 3. ¿Por qué useState se declara en el nivel superior del componente?

Porque React identifica los Hooks por el orden en que se llaman en cada render. Si se declararan dentro de condiciones, ciclos o funciones anidadas, el orden podría cambiar y React asociaría los valores al Hook equivocado.

## 4. ¿Qué significa que un campo sea controlado?

Que su `value` viene del estado de React y su `onChange` actualiza ese mismo estado. Así el estado es la única fuente del valor del campo, y React puede, por ejemplo, limpiarlo con `setTitle('')`.

## 5. ¿Por qué handleSubmit utiliza preventDefault?

Porque el comportamiento por defecto de un formulario HTML es enviar los datos y recargar la página, lo que haría perder el estado. `event.preventDefault()` lo evita para que React maneje el envío.

## 6. ¿Cómo comunica TaskForm una nueva tarea a App?

Mediante una función recibida por props, `onAddTask`. `TaskForm` solo notifica qué ocurrió, llamando `onAddTask(title)`. `App` decide cómo actualizar el estado: crea la tarea y la agrega a la colección.

## 7. ¿Por qué App funciona como fuente de verdad?

Porque la colección `tasks` se guarda una sola vez, en el estado de `App`. `TaskSummary` y `TaskList` reciben ese mismo arreglo, así que no hay estados duplicados que sincronizar y todo se mantiene coherente.

## 8. ¿Cómo se implementa Create sin utilizar push?

Con spread, creando un arreglo nuevo: `setTasks((currentTasks) => [newTask, ...currentTasks])`. No se modifica el arreglo existente; se produce uno nuevo con la tarea al inicio.

## 9. ¿Cómo permite map actualizar una sola tarea?

Recorre la colección y devuelve un arreglo nuevo. Para la tarea cuyo `id` coincide devuelve una copia actualizada con spread (`{ ...task, status, updatedAt }`), y para las demás devuelve la misma tarea sin cambios.

## 10. ¿Cómo utiliza filter la operación Delete?

`filter` conserva solo los elementos que cumplen una condición. Con `currentTasks.filter((task) => task.id !== id)` se obtiene un arreglo nuevo sin la tarea eliminada, sin usar `splice` ni mutar el original.

## 11. ¿Por qué se emplea una función actualizadora en setTasks?

Porque el siguiente estado depende del anterior. La función recibe el estado pendiente más reciente (`currentTasks`), lo que evita trabajar con un valor desactualizado cuando hay varias actualizaciones seguidas.

## 12. ¿Qué información conserva TaskItem como estado local?

Solo información temporal de la edición: `isEditing` (si está en modo edición) y `draftTitle` (el borrador del título). La colección principal sigue en `App`.

## 13. ¿Por qué los cambios desaparecen al recargar la página?

Porque el estado vive solo en la memoria del navegador mientras la página está abierta. Al recargar, React vuelve a ejecutar la aplicación y el estado se inicia con las tareas de `src/data/tasks.ts`. Todavía no se usa `localStorage` ni la API REST para persistir los datos.

## 14. ¿Qué dificultad encontraste y cómo la resolviste?

Al principio todas las tareas cambiaban de estado al presionar un botón, porque no comparaba el `id` dentro de `map`. Lo resolví agregando la condición `task.id !== id` para devolver sin cambios las demás tareas.
