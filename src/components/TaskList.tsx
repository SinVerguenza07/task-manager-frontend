import type { Task } from "../models/task.interface";
import { SectionHeading } from "./SectionHeading";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  emptyMessage: string;
  onToggleStatus: (id: string) => void;
  onEditTask: (id: string, title: string) => void;
  onDeleteTask: (id: string) => void;
}

export function TaskList({
  tasks,
  emptyMessage,
  onToggleStatus,
  onEditTask,
  onDeleteTask,
}: TaskListProps) {
  const resultLabel = tasks.length === 1 ? "1 tarea" : `${tasks.length} tareas`;

  return (
    <section
      className="rounded-md border border-slate-300 bg-white p-5 shadow-sm sm:p-6"
      aria-labelledby="task-list-title"
    >
      <SectionHeading
        eyebrow="Actividades"
        title="Tareas registradas"
        titleId="task-list-title"
        aside={
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            {resultLabel}
          </span>
        }
      />
      {tasks.length === 0 ? (
        <div
          className="rounded-md border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center"
          role="status"
        >
          <h3 className="mb-1 text-base font-semibold text-slate-800">
            Sin resultados
          </h3>
          <p className="text-sm text-slate-600">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid gap-3" role="list">
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
