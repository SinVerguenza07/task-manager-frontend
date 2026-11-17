import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useAuth } from "../hooks/useAuth";
import type { Task } from "../models/task.interface";
import {
  getHttpErrorMessage,
  isAbortError,
  isHttpError,
} from "../services/http.service";
import { deleteTask, getTaskById } from "../services/task.api.service";
import { formatTaskDate } from "../utils/date";
import { NotFoundPage } from "./NotFoundPage";

type Outcome =
  | { kind: "success"; task: Task }
  | { kind: "not-found" }
  | { kind: "error"; message: string };

interface ResolvedResult {
  key: string; // consulta a la que pertenece el resultado
  outcome: Outcome;
}

export function TaskDetailPage() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { accessToken, user } = useAuth();

  const [result, setResult] = useState<ResolvedResult | null>(null);
  const [deleteError, setDeleteError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const canDelete = user?.role === "admin";
  const requestKey = `${taskId ?? ""}|${accessToken ?? ""}|${reloadKey}`;

  useEffect(() => {
    if (!taskId || !accessToken) return; // sin setState

    const token = accessToken;
    const id = taskId;
    const controller = new AbortController();

    async function loadTask(): Promise<void> {
      try {
        const response = await getTaskById(id, token, controller.signal);
        setResult({
          key: requestKey,
          outcome: { kind: "success", task: response.data },
        });
      } catch (error) {
        if (isAbortError(error)) return;
        if (isHttpError(error) && error.status === 404) {
          setResult({ key: requestKey, outcome: { kind: "not-found" } });
          return;
        }
        setResult({
          key: requestKey,
          outcome: { kind: "error", message: getHttpErrorMessage(error) },
        });
      }
    }

    void loadTask();
    return () => controller.abort();
  }, [taskId, accessToken, requestKey]);

  async function handleDelete(task: Task): Promise<void> {
    if (!accessToken || !canDelete) return;

    const shouldDelete = window.confirm(`¿Eliminar la tarea "${task.title}"?`);
    if (!shouldDelete) return;

    setIsDeleting(true);
    setDeleteError("");
    try {
      await deleteTask(task.id, accessToken);
      navigate("/tasks", { replace: true });
    } catch (error) {
      setDeleteError(getHttpErrorMessage(error));
      setIsDeleting(false);
    }
  }

  // ---- Estado derivado (sin setState en el efecto) ----
  if (!taskId) {
    return (
      <NotFoundPage
        title="Tarea no encontrada"
        message="La tarea no existe o fue eliminada."
      />
    );
  }

  const errorView = (message: string) => (
    <section className="panel" role="alert">
      <h2>No fue posible consultar la tarea</h2>
      <p>{message}</p>
      <button
        type="button"
        onClick={() => setReloadKey((current) => current + 1)}
      >
        Reintentar
      </button>
    </section>
  );

  if (!accessToken) {
    return errorView("La sesión no está disponible.");
  }

  // Si el resultado guardado no corresponde a la consulta actual, está cargando
  if (!result || result.key !== requestKey) {
    return <p role="status">Consultando tarea...</p>;
  }

  const { outcome } = result;

  if (outcome.kind === "not-found") {
    return (
      <NotFoundPage
        title="Tarea no encontrada"
        message="La tarea no existe o fue eliminada."
      />
    );
  }

  if (outcome.kind === "error") {
    return errorView(outcome.message);
  }

  const task = outcome.task;

  return (
    <article className="panel task-detail" aria-labelledby="task-detail-title">
      <p className="section-heading__eyebrow">Detalle protegido</p>
      <h2 id="task-detail-title">{task.title}</h2>
      <dl className="task-detail__grid">
        <div>
          <dt>Identificador</dt>
          <dd>{task.id}</dd>
        </div>
        <div>
          <dt>Estado</dt>
          <dd>{task.status === "completed" ? "Completada" : "Pendiente"}</dd>
        </div>
        <div>
          <dt>Fecha de creación</dt>
          <dd>
            <time dateTime={task.createdAt}>
              {formatTaskDate(task.createdAt)}
            </time>
          </dd>
        </div>
        <div>
          <dt>Última actualización</dt>
          <dd>
            <time dateTime={task.updatedAt}>
              {formatTaskDate(task.updatedAt)}
            </time>
          </dd>
        </div>
      </dl>
      {deleteError && (
        <p className="operation-message operation-message--error" role="alert">
          {deleteError}
        </p>
      )}
      {!canDelete && (
        <p className="permission-note">La eliminación requiere el rol admin.</p>
      )}
      <div className="task-detail__actions">
        <Link className="button-link button-link--secondary" to="/tasks">
          Volver a tareas
        </Link>
        {canDelete && (
          <button
            type="button"
            className="button-danger"
            disabled={isDeleting}
            onClick={() => void handleDelete(task)}
          >
            {isDeleting ? "Eliminando..." : "Eliminar tarea"}
          </button>
        )}
      </div>
    </article>
  );
}