import type { TaskFilter, TaskSort } from "../models/task-view.types";
import { SectionHeading } from "./SectionHeading";

interface TaskFiltersProps {
  query: string;
  filter: TaskFilter;
  sortBy: TaskSort;
  resultCount: number;
  onQueryChange: (value: string) => void;
  onFilterChange: (value: TaskFilter) => void;
  onSortChange: (value: TaskSort) => void;
  onClear: () => void;
}

const fieldLabelClass = "grid gap-1 text-sm font-medium text-slate-700";
const controlClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 font-normal text-slate-900 placeholder:text-slate-400 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-teal-600";

export function TaskFilters({
  query,
  filter,
  sortBy,
  resultCount,
  onQueryChange,
  onFilterChange,
  onSortChange,
  onClear,
}: TaskFiltersProps) {
  const hasActiveCriteria =
    query.trim() !== "" || filter !== "all" || sortBy !== "updated-desc";
  const resultLabel =
    resultCount === 1
      ? "1 resultado visible."
      : `${resultCount} resultados visibles.`;

  return (
    <section
      className="rounded-md border border-slate-300 bg-white p-5 shadow-sm sm:p-6"
      aria-labelledby="task-filters-title"
    >
      <SectionHeading
        eyebrow="Consulta"
        title="Buscar y organizar"
        titleId="task-filters-title"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_auto] lg:items-end">
        <label className={fieldLabelClass}>
          <span>Buscar por título</span>
          <input
            type="search"
            value={query}
            placeholder="Ejemplo: documentación"
            onChange={(event) => onQueryChange(event.target.value)}
            className={controlClass}
          />
        </label>
        <label className={fieldLabelClass}>
          <span>Estado</span>
          <select
            value={filter}
            onChange={(event) =>
              onFilterChange(event.target.value as TaskFilter)
            }
            className={controlClass}
          >
            <option value="all">Todas</option>
            <option value="pending">Pendientes</option>
            <option value="completed">Completadas</option>
          </select>
        </label>
        <label className={fieldLabelClass}>
          <span>Ordenar por</span>
          <select
            value={sortBy}
            onChange={(event) => onSortChange(event.target.value as TaskSort)}
            className={controlClass}
          >
            <option value="updated-desc">Actualización reciente</option>
            <option value="created-desc">Creación reciente</option>
            <option value="title-asc">Título A a Z</option>
          </select>
        </label>
        <button
          type="button"
          onClick={onClear}
          disabled={!hasActiveCriteria}
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
        >
          Limpiar criterios
        </button>
      </div>
      <p className="mt-4 text-sm text-slate-600" role="status">
        {resultLabel}
      </p>
    </section>
  );
}
