# Flow API (CashFlowBuddy Backend)

Backend service for a marketplace-style app built with NestJS, Prisma, MariaDB, Better Auth, and Socket.IO.

## What this project provides

- Email/password and social authentication with Better Auth
- Role-aware user flows (USER and ADMIN)
- Listing CRUD, saved listings, and admin listing moderation endpoints
- Picture uploads for listings and user avatars
- Chat rooms and message history for listing conversations
- Expo push token registration for notifications
- Swagger API docs and Better Auth OpenAPI reference

## Tech stack

- Runtime: Node.js 22, TypeScript, NestJS 11
- Database: MariaDB + Prisma 7 (`@prisma/adapter-mariadb`)
- Auth: `better-auth` + `@thallesp/nestjs-better-auth`
- API docs: `@nestjs/swagger`
- Realtime: Socket.IO
- Package manager: pnpm

## Prerequisites

- Node.js 22+
- pnpm 9+
- Docker (recommended for local MariaDB)

## Environment variables

Create `.env` from `.env.example` and set real secrets.

Required/important variables:

- `DATABASE_URL` (MariaDB connection string)
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL` (for example `http://localhost:3000`)
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `CORS_ORIGIN` (comma-separated list)
- `COOKIE_DOMAIN` (optional, defaults to `localhost`)
- `PORT` (optional, defaults to `3000`)

Example:

```env
DATABASE_URL=mysql://flow:flow@localhost:3306/flow
BETTER_AUTH_SECRET=replace-me
BETTER_AUTH_URL=http://localhost:3000
GITHUB_CLIENT_ID=replace-me
GITHUB_CLIENT_SECRET=replace-me
CORS_ORIGIN=http://localhost:3001
COOKIE_DOMAIN=localhost
PORT=3000
```

## Local development

1. Install dependencies:

```bash
pnpm install
```

2. Start database (Docker):

```bash
docker compose up -d db
```

3. Generate Prisma client and sync schema:

```bash
pnpm prisma generate
pnpm prisma db push
```

4. Start API in watch mode:

```bash
pnpm run start:dev
```

The API will run on `http://localhost:3000` by default.

## Run with Docker Compose

Run API + MariaDB together:

```bash
docker compose up --build
```

Services:

- API: `http://localhost:3000`
- MariaDB: `localhost:3306`

The API container runs `pnpm prisma db push` on startup, then starts `node dist/src/main`.

## API documentation

- Swagger UI: `http://localhost:3000/api/docs`
- Better Auth reference: `http://localhost:3000/api/auth/reference`
- Global REST prefix: `/api`

## Project scripts

```bash
# build
pnpm run build

# dev / prod
pnpm run start
pnpm run start:dev
pnpm run start:prod

# quality
pnpm run lint
pnpm run format

# tests
pnpm run test
pnpm run test:watch
pnpm run test:cov
pnpm run test:e2e
pnpm run test:report
```

## Key modules

- `src/users`: user profile, admin-only list, avatar uploads
- `src/listings`: listing CRUD, saved listings, admin status filtering
- `src/pictures`: listing image uploads and retrieval
- `src/chat`: chat rooms, message history, websocket gateway
- `src/notifications`: Expo push token registration
- `src/prisma`: Prisma service/module integration

## Testing and reports

- Coverage output: `coverage/`
- Machine-readable test output: `test-results/jest-results.json`
- JUnit report: `test-results/junit.xml`
- Human summary script: `scripts/generate-test-results.mjs`

## License

UNLICENSED
