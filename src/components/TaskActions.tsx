interface TaskActionsProps {
  completedCount: number;
  onClearCompleted: () => void;
}

export function TaskActions({
  completedCount,
  onClearCompleted,
}: TaskActionsProps) {
  return (
    <section
      className="flex flex-col gap-3 rounded-md border border-slate-300 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
      aria-label="Acciones sobre la colección"
    >
      <p className="text-sm text-slate-600">
        {completedCount === 0
          ? 'No hay tareas completadas para limpiar.'
          : completedCount === 1
            ? '1 tarea completada.'
            : `${completedCount} tareas completadas.`}
      </p>

      <button
        type="button"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
        className="w-full rounded-md cursor-pointer border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white sm:w-auto"
      >
        Eliminar completadas
      </button>
    </section>
  );
}