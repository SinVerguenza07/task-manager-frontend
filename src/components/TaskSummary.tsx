import type { Task } from '../models/task.interface';

interface TaskSummaryProps {
  tasks: Task[];
}

export function TaskSummary({
  tasks,
}: TaskSummaryProps) {
  const completed = tasks.filter(
    ({ status }) => status === 'completed',
  ).length;

  const pending =
    tasks.length - completed;

  const cardClass =
    'grid gap-1 rounded-md border border-t-4 border-slate-300 bg-white p-4 shadow-sm sm:p-5';
  const labelClass =
    'text-xs font-semibold uppercase tracking-wider text-slate-500';
  const valueClass =
    'text-3xl font-bold tabular-nums text-slate-900';

  return (
    <section
      className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      aria-label="Resumen de tareas"
    >
      <article className={`${cardClass} border-t-slate-700`}>
        <span className={labelClass}>Total</span>
        <strong className={valueClass}>
          {tasks.length}
        </strong>
      </article>

      <article className={`${cardClass} border-t-amber-500`}>
        <span className={labelClass}>Pendientes</span>
        <strong className={valueClass}>{pending}</strong>
      </article>

      <article className={`${cardClass} border-t-teal-600`}>
        <span className={labelClass}>Completadas</span>
        <strong className={valueClass}>
          {completed}
        </strong>
      </article>
    </section>
  );
}