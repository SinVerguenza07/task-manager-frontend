export function AppHeader() {
  return (
    <header className="border-b-4 border-teal-600 bg-slate-900 px-4 py-9 text-white sm:py-12">
      <div className="mx-auto w-full max-w-6xl sm:px-2">
        <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-teal-300">
          Diseño Frontend con Frameworks
        </p>
        <h1 className="mb-3 text-[clamp(2rem,6vw,3.5rem)] font-bold leading-[1.05] tracking-tight">
          Administrador de tareas
        </h1>
        <p className="max-w-162.5 text-base leading-relaxed text-slate-300 sm:text-lg">
          Organiza las actividades pendientes y consulta el avance del trabajo.
        </p>
      </div>
    </header>
  );
}