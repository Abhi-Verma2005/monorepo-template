# Enterprise SaaS Monorepo Template

A production-ready, full-stack monorepo template designed for scalability and rapid MVP development. Built with **Node.js (Express)**, **React (Vite)**, **trpc**, **Prisma**, and **Docker**.

## 🚀 Quick Start (Zero Config)

1.  **Clone the repository**
    ```bash
    git clone <repo-url>
    cd <repo-name>
    ```

2.  **Install dependencies**
    ```bash
    pnpm install
    ```

3.  **Start Infrastructure (PostgreSQL)**
    ```bash
    pnpm run docker:up
    ```
    *Wait for the database to be ready.*

4.  **Setup Environment & Database**
    Copy `.env.example` to `.env` in `backend/` and `frontend/` (or use defaults).
    ```bash
    # Run migrations using the dockerized DB
    pnpm run db:migrate
    # (Optional) Seed the database
    pnpm run db:seed
    ```

5.  **Start Development Server**
    ```bash
    pnpm run dev
    ```
    - **Frontend:** [http://localhost:5173](http://localhost:5173)
    - **Backend:** [http://localhost:3000](http://localhost:3000)
    - **Studio:** `pnpm run studio -w backend` for Database GUI

## 🏗 Architecture

### Backend (`/backend`)
Follows a modular, **Enterprise Layered Architecture**:

*   **Core**: Base classes for Services, Repositories, and standard API Responses.
*   **Modules**: Feature-based separation (e.g., `Auth`, `User`).
    *   **Router**: tRPC procedures definitions.
    *   **Service**: Business logic (pure TypeScript, no HTTP/Express code).
    *   **Repository**: Data access layer (Prisma).
    *   **DTO**: Zod schemas for validation.
*   **Loaders**: Dependency injection and startup logic.

### Frontend (`/frontend`)
Built with **React 18** + **Vite** + **TypeScript**.

*   **tRPC Client**: Fully typed API integration.
*   **TanStack Query**: Data fetching and caching.
*   **Tailwind CSS**: Utility-first styling.
*   **Authentication**: JWT-based auth hook (`useAuth`) and Protected Routes.

## 🛠 Adding a New Feature

To add a new module (e.g., `Project`), follow these steps:

1.  **Define Schema**: Add `Project` model to `backend/prisma/schema.prisma` and run `npm run db:migrate`.
2.  **Create Module**: Create `backend/src/modules/project/`.
    *   `dto/project.dto.ts`: Define Zod schemas.
    *   `project.repository.ts`: Extend `BaseRepository`.
    *   `project.service.ts`: Implement business logic.
3.  **Add tRPC Router**:
    *   Create `backend/src/trpc/routers/project.ts`.
    *   Inject `ProjectService` into `backend/src/trpc/context.ts`.
    *   Add router to `appRouter` in `backend/src/trpc/router.ts`.
4.  **Frontend Usage**:
    *   The new route is immediately available in `frontend` with full type safety:
    *   `trpc.project.getAll.useQuery()`

## 📦 Scripts

| Command | Description |
| :--- | :--- |
| `pnpm run dev` | Start both backend and frontend in watch mode |
| `pnpm run build` | Build both backend and frontend for production |
| `pnpm run docker:up` | Start PostgreSQL container |
| `pnpm run docker:down` | Stop containers |
| `pnpm run db:migrate` | Run Prisma migrations (backend) |
| `pnpm run db:seed` | Seed database (backend) |

## 🔑 Environment Variables

**Backend (`backend/.env`)**
```env
DATABASE_URL=postgresql://devuser:devpass@localhost:5432/mvp_template
JWT_SECRET=dev-secret-change-in-production
PORT=3000
NODE_ENV=development
```

**Frontend (`frontend/.env`)**
```env
VITE_API_URL=http://localhost:3000
```
