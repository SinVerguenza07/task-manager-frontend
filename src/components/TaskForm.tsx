import { useState } from "react";
import type { FormEvent } from "react";
import {
  TASK_TITLE_MAX_LENGTH,
  validateTaskTitle,
} from "../utils/task-validation";
import { SectionHeading } from "./SectionHeading";

interface TaskFormProps {
  onAddTask: (title: string) => void;
}

export function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  function handleTitleChange(value: string): void {
    setTitle(value);
    if (error) {
      setError(validateTaskTitle(value) ?? "");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const validationMessage = validateTaskTitle(title);
    if (validationMessage) {
      setError(validationMessage);
      return;
    }
    onAddTask(title.trim());
    setTitle("");
    setError("");
  }

  return (
    <section
      className="rounded-md border border-slate-300 bg-white p-5 shadow-sm sm:p-6"
      aria-labelledby="task-form-title"
    >
      <SectionHeading
        eyebrow="Registro"
        title="Nueva tarea"
        titleId="task-form-title"
      />
      <form onSubmit={handleSubmit} noValidate className="grid gap-2">
        <label
          htmlFor="task-title"
          className="text-sm font-medium text-slate-700"
        >
          Título de la tarea
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="task-title"
            name="title"
            type="text"
            placeholder="Ejemplo: revisar documentación"
            maxLength={TASK_TITLE_MAX_LENGTH}
            value={title}
            onChange={(event) => handleTitleChange(event.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? "task-title-help task-title-error" : "task-title-help"
            }
            className="min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-teal-600 aria-invalid:border-red-500 aria-invalid:focus-visible:outline-red-600"
          />
          <button
            type="submit"
            className="rounded-md bg-teal-700 px-5 py-2 text-sm font-semibold text-white transition hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            Agregar tarea
          </button>
        </div>
        <p id="task-title-help" className="text-xs text-slate-500">
          {title.length}/{TASK_TITLE_MAX_LENGTH} caracteres
        </p>
        {error && (
          <p
            id="task-title-error"
            className="text-sm font-medium text-red-700"
            role="alert"
          >
            {error}
          </p>
        )}
      </form>
    </section>
  );
}
