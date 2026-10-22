import { useState } from "react";
import type { FormEvent } from "react";
import type { Task } from "../models/task.interface";
import { TaskStatusBadge } from "./TaskStatusBadge";
import {
  TASK_TITLE_MAX_LENGTH,
  validateTaskTitle,
} from "../utils/task-validation";
interface TaskItemProps {
  task: Task;
  onToggleStatus: (id: string) => void;
  onEditTask: (id: string, title: string) => void;
  onDeleteTask: (id: string) => void;
}
function formatTaskDate(value: string): string {
  return new Intl.DateTimeFormat("es-MX", {
    dateStyle: "medium",
  }).format(new Date(value));
}
export function TaskItem({
  task,
  onToggleStatus,
  onEditTask,
  onDeleteTask,
}: TaskItemProps) {
  const { id, title, status, updatedAt } = task;
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [error, setError] = useState("");
  function handleStartEdit(): void {
    setDraftTitle(title);
    setError("");
    setIsEditing(true);
  }
  function handleCancelEdit(): void {
    setDraftTitle(title);
    setError("");
    setIsEditing(false);
  }
  function handleDraftChange(value: string): void {
    setDraftTitle(value);
    if (error) {
      setError(validateTaskTitle(value) ?? "");
    }
  }
  function handleEditSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const validationMessage = validateTaskTitle(draftTitle);
    if (validationMessage) {
      setError(validationMessage);
      return;
    }
    onEditTask(id, draftTitle.trim());
    setError("");
    setIsEditing(false);
  }
  const actionButtonClass =
    "rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white";

  return (
    <article
      className={`flex flex-col gap-3 rounded-md border border-l-4 border-slate-300 bg-white p-4 sm:flex-row sm:items-center sm:justify-between ${
        status === "completed" ? "border-l-teal-600" : "border-l-amber-500"
      }`}
      role="listitem"
    >
      <div className="min-w-0 flex-1">
        {isEditing ? (
          <form
            className="grid gap-2"
            onSubmit={handleEditSubmit}
            noValidate
          >
            <label className="sr-only" htmlFor={`edit-task-${id}`}>
              Editar título de la tarea
            </label>
            <input
              id={`edit-task-${id}`}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-teal-600 aria-invalid:border-red-500"
              value={draftTitle}
              maxLength={TASK_TITLE_MAX_LENGTH}
              onChange={(event) => handleDraftChange(event.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? `edit-error-${id}` : undefined}
              autoFocus
            />
            {error && (
              <p
                id={`edit-error-${id}`}
                className="text-sm font-medium text-red-700"
                role="alert"
              >
                {error}
              </p>
            )}
            <div className="flex gap-2">
              <button
                type="submit"
                className="rounded-md bg-teal-700 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className={actionButtonClass}
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <>
            <h3
              className={`mb-1.5 break-words text-base font-semibold ${
                status === "completed"
                  ? "text-slate-500 line-through"
                  : "text-slate-900"
              }`}
            >
              {title}
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <TaskStatusBadge status={status} />
              <p className="text-xs text-slate-500">
                Actualizada:{" "}
                <time dateTime={updatedAt}>{formatTaskDate(updatedAt)}</time>
              </p>
            </div>
          </>
        )}
      </div>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label={`Acciones para ${title}`}
      >
        <button
          type="button"
          className={actionButtonClass}
          onClick={() => onToggleStatus(id)}
          disabled={isEditing}
        >
          {status === "completed" ? "Reabrir" : "Completar"}
        </button>
        <button
          type="button"
          className={actionButtonClass}
          onClick={handleStartEdit}
          disabled={isEditing}
        >
          Editar
        </button>
        <button
          type="button"
          className="rounded-md border border-red-300 bg-white px-3 py-1.5 text-sm font-medium text-red-700 transition hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
          onClick={() => onDeleteTask(id)}
          disabled={isEditing}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}
