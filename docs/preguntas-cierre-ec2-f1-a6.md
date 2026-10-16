# Preguntas de cierre - EC2 F1 A6

## 1. ¿Qué función cumple la interfaz Task?

Describe la estructura que debe tener cada tarea: `id`, `title`, `status`, `createdAt` y `updatedAt`. Funciona como un contrato común. Si a un objeto le falta una propiedad o tiene un tipo incorrecto, TypeScript avisa durante el desarrollo, antes de ejecutar la aplicación.

## 2. ¿Qué diferencia existe entre Task y TaskStatus?

`Task` es una interfaz que modela el objeto completo de una tarea. `TaskStatus` es un tipo unión (`'pending' | 'completed'`) que limita los valores permitidos de una sola propiedad, `status`. `Task` usa a `TaskStatus` para que el estado no pueda tener variantes como "done" o "Pendiente".

## 3. ¿Qué significa declarar un arreglo como Task[]?

Que todos los elementos del arreglo deben cumplir con la interfaz `Task`. Si se agrega un objeto al que le falta `id` o con un `status` inválido, TypeScript marca error.

## 4. ¿Qué hace el método map?

Recorre un arreglo y devuelve un arreglo nuevo con el resultado de aplicar una función a cada elemento. No modifica el arreglo original. En React se usa para transformar datos en elementos visuales.

## 5. ¿Qué resultado produce map dentro de TaskList?

Un arreglo de elementos `<TaskItem />`, uno por cada tarea de la colección. React lo renderiza como una lista de tarjetas o filas.

## 6. ¿Para qué utiliza React la propiedad key?

Para identificar de forma estable cada elemento de una lista. Con ella React relaciona cada elemento visual con su dato, detecta qué se agregó, cambió o eliminó, y actualiza solo lo necesario sin mezclar el estado de elementos distintos. `key` es interna de React y el componente no la recibe como prop.

## 7. ¿Por qué se utiliza task.id y no el índice?

Porque el `id` pertenece a la tarea y no cambia aunque la lista se reordene o se elimine un elemento. El índice cambia cuando se mueven o eliminan elementos, y eso puede asociar datos o estado a la fila equivocada. Tampoco conviene `Math.random()`, porque genera una clave nueva en cada render.

## 8. ¿Cómo se envía una tarea de TaskList a TaskItem?

Mediante una propiedad. Dentro de `map`, cada objeto se pasa como `task={task}`, y `TaskItem` lo recibe tipado como `task: Task` en sus props.

## 9. ¿Cómo se comunican App, TaskSummary y TaskList?

Con flujo unidireccional, de padre a hijo. `App` tiene la colección y se la envía a ambos componentes mediante props (`tasks={tasks}`). `TaskSummary` calcula las cantidades y `TaskList` renderiza las tareas, y ninguno modifica el arreglo.

## 10. ¿Qué es el renderizado condicional?

Mostrar una estructura u otra según una condición. En `TaskList`, si `tasks.length === 0` se muestra el mensaje de colección vacía; en caso contrario, se renderiza la lista.

## 11. ¿Por qué el resumen se calcula a partir de la colección?

Porque son datos derivados. El total sale de `tasks.length` y las completadas de un `filter`, así que no hay que guardar contadores aparte ni mantenerlos sincronizados. Cuando la colección cambia, el resumen siempre coincide con ella.

## 12. ¿Qué dificultad encontraste durante la refactorización y cómo la resolviste?

Al separar los datos de los componentes, me aparecía un error de importación del tipo `Task` por una ruta incorrecta. Lo resolví revisando la ruta relativa `../models/task.interface` y usando `import type`.
