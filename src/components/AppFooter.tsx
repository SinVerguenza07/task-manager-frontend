interface AppFooterProps {
  courseName: string;
}

export function AppFooter({ courseName }: AppFooterProps) {
  return (
    <footer className="border-t border-slate-300 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6">
        <p className="text-center text-sm text-slate-500">
          Administrador de tareas - {courseName}
        </p>
      </div>
    </footer>
  );
}