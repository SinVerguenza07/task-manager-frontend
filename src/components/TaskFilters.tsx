const fieldClass =
  'w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-2 focus:outline-offset-0 focus:outline-teal-200';

const labelClass =
  'text-sm font-semibold text-slate-700';

export function TaskFilters() {
  return (
    <section
      className="overflow-hidden rounded-md border border-slate-300 bg-white shadow-sm"
      aria-labelledby="filters-title"
    >
      <div className="border-b border-slate-300 bg-slate-50 px-5 py-4">
        <p className="mb-0.5 text-xs font-bold uppercase tracking-wider text-teal-700">
          Consulta
        </p>
        <h2
          id="filters-title"
          className="text-lg font-semibold text-slate-900"
        >
          Buscar y organizar
        </h2>
      </div>

      <div className="grid gap-4 p-5">
        <div className="grid gap-4 sm:grid-cols-[2fr_1fr_1fr]">
          <div className="grid content-start gap-1.5">
            <label className={labelClass} htmlFor="task-search">
              Buscar por título
            </label>
            <input
              id="task-search"
              type="search"
              placeholder="Escribe una palabra"
              className={fieldClass}
            />
          </div>

          <div className="grid content-start gap-1.5">
            <label className={labelClass} htmlFor="status-filter">
              Estado
            </label>
            <select
              id="status-filter"
              defaultValue="all"
              className={fieldClass}
            >
              <option value="all">Todas</option>
              <option value="pending">Pendientes</option>
              <option value="completed">Completadas</option>
            </select>
          </div>

          <div className="grid content-start gap-1.5">
            <label className={labelClass} htmlFor="task-order">
              Orden
            </label>
            <select
              id="task-order"
              defaultValue="newest"
              className={fieldClass}
            >
              <option value="newest">Más recientes</option>
              <option value="oldest">Más antiguas</option>
              <option value="title">Por título</option>
            </select>
          </div>
        </div>

        <p className="text-sm text-slate-500">
          Los controles son demostrativos y todavía no modifican los resultados.
        </p>
      </div>
    </section>
  );
}