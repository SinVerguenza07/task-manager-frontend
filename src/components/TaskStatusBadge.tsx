import type { TaskStatus } from '../models/task.interface';

interface TaskStatusBadgeProps {
  status: TaskStatus;
}

const badgeConfig: Record<
  TaskStatus,
  { label: string; className: string }
> = {
  pending: {
    label: 'Pendiente',
    className:
      'bg-amber-50 text-amber-800 ring-amber-200',
  },
  completed: {
    label: 'Completada',
    className:
      'bg-teal-50 text-teal-800 ring-teal-200',
  },
};

export function TaskStatusBadge({
  status,
}: TaskStatusBadgeProps) {
  const { label, className } = badgeConfig[status];

  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${className}`}
    >
      {label}
    </span>
  );
}