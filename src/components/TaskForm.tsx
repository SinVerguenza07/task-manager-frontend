import { useState } from 'react';
import type { FormEvent } from 'react';

interface TaskFormProps {
  onAddTask: (title: string) => void;
}

export function TaskForm({
  onAddTask,
}: TaskFormProps) {
  const [title, setTitle] = useState('');
  const normalizedTitle = title.trim();

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!normalizedTitle) {
      return;
    }

    onAddTask(normalizedTitle);
    setTitle('');
  }

  return (
    <section
      className="overflow-hidden rounded-md border border-slate-300 bg-white shadow-sm"
      aria-labelledby="task-form-title"
    >
      <div className="border-b border-slate-300 bg-slate-50 px-5 py-4">
        <p className="mb-0.5 text-xs font-bold uppercase tracking-wider text-teal-700">
          Registro
        </p>
        <h2
          id="task-form-title"
          className="text-lg font-semibold text-slate-900"
        >
          Nueva tarea
        </h2>
      </div>

      <form
        className="grid gap-2 p-5"
        onSubmit={handleSubmit}
      >
        <label
          className="text-sm font-semibold text-slate-700"
          htmlFor="task-title"
        >
          Título de la tarea
        </label>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
          <input
            id="task-title"
            name="title"
            type="text"
            placeholder="Ejemplo: revisar documentación"
            maxLength={120}
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            required
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-2 focus:outline-offset-0 focus:outline-teal-200"
          />

          <button
            type="submit"
            disabled={!normalizedTitle}
            className="w-full rounded-md border border-teal-700 bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-teal-700 sm:w-auto"
          >
            Agregar tarea
          </button>
        </div>

        <p className="text-sm text-slate-500">
          {title.length}/120 caracteres
        </p>
      </form>
    </section>
  );
}