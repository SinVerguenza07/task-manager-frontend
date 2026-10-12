# Preguntas de cierre - EC2 F1 A5

## 1. ¿Qué problema resuelve React al construir una interfaz?

React permite construir interfaces complejas dividiéndolas en piezas pequeñas
y reutilizables llamadas componentes. Sin React, habría que escribir todo el
HTML en un solo documento y manipular el DOM manualmente, lo que se vuelve
difícil de mantener conforme crece la aplicación. Con React describo cómo debe
verse cada parte de la interfaz y el framework se encarga de mostrarla y, más
adelante, de actualizarla cuando cambien los datos.

## 2. ¿Qué es un componente?

Es una función que devuelve la representación de una parte de la interfaz
(escrita en TSX). Cada componente tiene una responsabilidad concreta, por
ejemplo AppHeader muestra el encabezado y TaskItem muestra una tarea. Los
componentes pueden usarse dentro de otros componentes para formar la
interfaz completa.

## 3. ¿Por qué los componentes comienzan con mayúscula?

Porque React usa la mayúscula inicial para distinguir un componente propio de
una etiqueta HTML normal. Si escribo <TaskForm />, React entiende que debe
ejecutar la función TaskForm; si escribiera <taskform />, lo interpretaría
como una etiqueta HTML desconocida y el componente no se mostraría.

## 4. ¿Qué diferencia existe entre HTML y TSX?

TSX es una sintaxis parecida a HTML que se escribe dentro de TypeScript. Las
diferencias principales son: se usa className en lugar de class y htmlFor en
lugar de for; todas las etiquetas deben cerrarse (por ejemplo <input />);
los valores dinámicos se insertan con llaves {}; y un componente debe devolver
un solo elemento raíz o un fragmento. Además, TSX es verificado por TypeScript,
por lo que los errores se detectan antes de ejecutar la aplicación.

## 5. ¿Para qué se utiliza className?

Se utiliza para asignar clases CSS a un elemento en TSX. Se usa className
porque class es una palabra reservada de JavaScript y TypeScript, así que
React adoptó ese nombre para evitar conflictos. Gracias a className se aplican
los estilos definidos en index.css, como task-item o status-badge.

## 6. ¿Qué son las propiedades o props?

Son los datos que un componente padre envía a un componente hijo, de forma
parecida a los argumentos de una función. Por ejemplo, en
<TaskItem title="Configurar el proyecto React" status="completed" />, el
componente TaskItem recibe el título y el estado y los usa para mostrarse.
Esto permite reutilizar el mismo componente con información distinta.

## 7. ¿Cómo ayuda TypeScript a validar las propiedades?

Con una interface o un type se define qué propiedades recibe un componente y
de qué tipo es cada una. Por ejemplo, TaskSummaryProps exige tres números; si
envío una cadena donde se espera un número, o si olvido una propiedad
obligatoria, TypeScript marca el error en el editor y al compilar, antes de
ejecutar la aplicación. En TaskItem, el tipo unión TaskStatus solo permite
'pending' o 'completed', lo que evita escribir estados inválidos.

## 8. ¿Cuál es la responsabilidad de App.tsx?

Es el componente principal y funciona como coordinador de la estructura
general. No contiene los detalles de cada sección: importa los demás
componentes (encabezado, formulario, filtros, resumen, lista y pie de página),
los organiza en el orden correcto y les envía los datos que necesitan, como
los números del resumen.

## 9. ¿Por qué la interfaz se dividió en varios componentes?

Para separar responsabilidades, mantener el código ordenado y poder
reutilizarlo. Cada archivo se encarga de una sola parte, por lo que es más
fácil de leer, probar y modificar sin afectar al resto. Además, TaskItem se
reutiliza para las tres tareas en lugar de repetir el mismo código tres veces.
Esta organización también facilitará agregar estado y comportamiento en las
siguientes actividades.

## 10. ¿Por qué los botones todavía están deshabilitados?

Porque en esta actividad solo se construye la parte visual. Para que los botones
funcionen se necesitan estado (useState), eventos y formularios controlados,
contenidos que se estudiarán en actividades posteriores. Se dejan deshabilitados
para que el usuario no espere un comportamiento que aún no existe.

## 11. ¿Qué componente consideras más reutilizable y por qué?

TaskItem, porque recibe por propiedades el título y el estado y con ello
representa cualquier tarea con la misma estructura. En la lista se usa tres
veces con datos diferentes, y en la siguiente actividad se podrá usar para
mostrar cualquier cantidad de tareas sin modificar su código.

## 12. ¿Qué dificultad encontraste y cómo la resolviste?

Al principio confundí la sintaxis de TSX con la de HTML: escribí class en lugar
de className y dejé una etiqueta <input> sin cerrar, lo que generó errores. Lo
resolví revisando los mensajes de la consola y de pnpm lint, y corrigiendo la
sintaxis según la tabla de errores frecuentes de la guía. También tuve que
verificar que cada componente estuviera importado y utilizado en App.tsx para
que apareciera en pantalla.