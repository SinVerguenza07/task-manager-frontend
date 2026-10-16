import type { Task } from '../models/task.interface';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggleStatus: (id: string) => void;
  onEditTask: (id: string, title: string) => void;
  onDeleteTask: (id: string) => void;
}

export function TaskList({
  tasks,
  onToggleStatus,
  onEditTask,
  onDeleteTask,
}: TaskListProps) {
  const resultLabel =
    tasks.length === 1
      ? '1 tarea'
      : `${tasks.length} tareas`;

  return (
    <section
      className="overflow-hidden rounded-md border border-slate-300 bg-white shadow-sm"
      aria-labelledby="task-list-title"
    >
      <div className="flex items-center justify-between gap-4 border-b border-slate-300 bg-slate-50 px-5 py-4">
        <div>
          <p className="mb-0.5 text-xs font-bold uppercase tracking-wider text-teal-700">
            Actividades
          </p>
          <h2
            id="task-list-title"
            className="text-lg font-semibold text-slate-900"
          >
            Tareas registradas
          </h2>
        </div>

        <span className="whitespace-nowrap rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 ring-1 ring-teal-200">
          {resultLabel}
        </span>
      </div>

      {tasks.length === 0 ? (
        <div className="p-5">
          <div
            className="grid justify-items-center gap-1 rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center"
            role="status"
          >
            <h3 className="text-base font-semibold text-slate-700">
              No hay tareas registradas
            </h3>
            <p className="text-sm text-slate-500">
              Utiliza el formulario para registrar
              una nueva actividad.
            </p>
          </div>
        </div>
      ) : (
        <div
          className="divide-y divide-slate-200"
          role="list"
        >
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleStatus={onToggleStatus}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      )}
    </section>
  );
}