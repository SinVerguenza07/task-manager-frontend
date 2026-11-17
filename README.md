## Integración con la API REST
La aplicación consume la API de tareas mediante Fetch API.
### Requisitos
- Backend disponible en http://localhost:3000
- Frontend ejecutado mediante Vite
- MongoDB Atlas conectado desde el Backend
### Configuración local
1. Copiar `.env.example` como `.env.local`.
2. Confirmar `VITE_API_URL=/api`.
3. Iniciar el Backend con `pnpm dev`.
4. Iniciar el Frontend con `pnpm dev`.
### Funciones remotas
- Listado paginado.
- Búsqueda, filtro y ordenamiento.
- Creación, edición y cambio de estado.
- Eliminación con confirmación.
- Consulta de detalle por identificador.
- Estados de carga, vacío, error y reintento.
### Compilación
```bash
pnpm build
```