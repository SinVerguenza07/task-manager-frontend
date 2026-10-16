import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Task } from '../models/task.interface';
import { TaskStatusBadge } from './TaskStatusBadge';

interface TaskItemProps {
  task: Task;
  onToggleStatus: (id: string) => void;
  onEditTask: (id: string, title: string) => void;
  onDeleteTask: (id: string) => void;
}

function formatTaskDate(value: string): string {
  return new Intl.DateTimeFormat('es-MX', {
    dateStyle: 'medium',
  }).format(new Date(value));
}

const baseButton =
  'rounded-md border px-3 py-1.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

const secondaryButton = `${baseButton} border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus-visible:outline-teal-600`;

const primaryButton = `${baseButton} border-teal-700 bg-teal-700 text-white hover:bg-teal-800 focus-visible:outline-teal-600`;

const dangerButton = `${baseButton} border-red-300 bg-white text-red-700 hover:bg-red-50 focus-visible:outline-red-600`;

export function TaskItem({
  task,
  onToggleStatus,
  onEditTask,
  onDeleteTask,
}: TaskItemProps) {
  const { id, title, status, updatedAt } = task;
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const normalizedDraft = draftTitle.trim();
  const isCompleted = status === 'completed';

  function handleStartEdit() {
    setDraftTitle(title);
    setIsEditing(true);
  }

  function handleCancelEdit() {
    setDraftTitle(title);
    setIsEditing(false);
  }

  function handleEditSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!normalizedDraft) {
      return;
    }

    onEditTask(id, normalizedDraft);
    setIsEditing(false);
  }

  return (
    <article
      className={`flex flex-col gap-4 border-l-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${
        isCompleted
          ? 'border-l-teal-600 bg-teal-50/40'
          : 'border-l-amber-500 bg-white'
      }`}
      role="listitem"
    >
      <div className="min-w-0 flex-1">
        {isEditing ? (
          <form
            className="grid w-full gap-2.5"
            onSubmit={handleEditSubmit}
          >
            <label
              className="sr-only"
              htmlFor={`edit-task-${id}`}
            >
              Editar título de la tarea
            </label>

            <input
              id={`edit-task-${id}`}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-teal-600 focus:outline-2 focus:outline-offset-0 focus:outline-teal-200"
              value={draftTitle}
              onChange={(event) =>
                setDraftTitle(event.target.value)
              }
              maxLength={120}
              autoFocus
              required
            />

            <div className="flex flex-wrap gap-2">
              <button
                type="submit"
                className={primaryButton}
                disabled={!normalizedDraft}
              >
                Guardar
              </button>
              <button
                type="button"
                className={secondaryButton}
                onClick={handleCancelEdit}
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <div className="grid justify-items-start gap-1.5">
            <h3
              className={`wrap-break-word text-base font-semibold ${
                isCompleted
                  ? 'text-slate-500 line-through'
                  : 'text-slate-900'
              }`}
            >
              {title}
            </h3>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                 <TaskStatusBadge status={status} />

              <p className="text-xs text-slate-500">
                Actualizada:{' '}
                <time dateTime={updatedAt}>
                  {formatTaskDate(updatedAt)}
                </time>
              </p>
            </div>
          </div>
        )}
      </div>

      <div
        className="flex flex-wrap gap-2 sm:justify-end"
        role="group"
        aria-label={`Acciones para ${title}`}
      >
        <button
          type="button"
          className={secondaryButton}
          onClick={() => onToggleStatus(id)}
          disabled={isEditing}
        >
          {status === 'completed'
            ? 'Reabrir'
            : 'Completar'}
        </button>

        <button
          type="button"
          className={secondaryButton}
          onClick={handleStartEdit}
          disabled={isEditing}
        >
          Editar
        </button>

        <button
          type="button"
          className={dangerButton}
          onClick={() => onDeleteTask(id)}
          disabled={isEditing}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}