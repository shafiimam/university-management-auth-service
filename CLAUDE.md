# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

This project uses **Yarn** (a `yarn.lock` is committed; `package-lock.json` is also present but Yarn is the source of truth — `husky` invokes `yarn lint-staged`).

- `yarn start` — run the dev server with `ts-node-dev --respawn --transpile-only src/server.ts` (no compiled build step is configured).
- `yarn lint:check` / `yarn lint:fix` — ESLint over `.js`/`.ts`.
- `yarn prettier:check` / `yarn prettier:fix` — Prettier over `**/*.{js,ts,json}`.
- `yarn lint:prettier` — combined lint + prettier check (used by `lint-staged` on pre-commit).

There is **no test runner**, **no production build script**, and **no Docker setup**. `package.json`'s `test` script is the placeholder default. Don't claim tests pass — there are none.

A `.env` at the project root is required (loaded by `src/config/index.ts` via `dotenv` from `process.cwd()`). Required keys:

- `NODE_ENV` (`development` enables console logging and verbose error stacks)
- `PORT`
- `MONGO_URI`
- `DEFAULT_STUDENT_PASSWORD`
- `DEFAULT_FACULTY_PASSWORD`

Logs are written to `logs/successes/` and `logs/errors/` via `winston-daily-rotate-file`; the `logs/` directory is gitignored.

## Architecture

Express + Mongoose + Zod REST service. Single-process, single-database. All API routes mount under `/api/v1` (see `src/app.ts` → `src/routes/index.ts`).

### Bootstrap flow

`src/server.ts` connects Mongoose first, then starts the HTTP listener. It installs `uncaughtException` (sync exit), `unhandledRejection` (graceful close then exit), and `SIGTERM` handlers — preserve this ordering when modifying startup.

### Module layout (the dominant pattern)

Each domain lives under `src/app/modules/<name>/` and is composed of these per-file roles. Always check the module first — naming pluralization is **inconsistent** across modules:

| Role | Typical name | Variants in repo |
| --- | --- | --- |
| Express router | `<name>.route.ts` | `academicDepartment.routes.ts` |
| Request handlers | `<name>.controller.ts` | — |
| Business logic / DB access | `<name>.service.ts` | — |
| Mongoose model | `<name>.model.ts` | — |
| TypeScript types | `<name>.interface.ts` | `academicDepartment.interfaces.ts` |
| Zod schemas | `<name>.validation.ts` | `academicDepartment.validations.ts` |
| Constants (searchable/filterable fields, enums) | `<name>.constant.ts` | `academicDepartment.constants.ts` |

Existing modules: `user`, `student`, `faculty`, `academicSemester`, `academicFaculty`, `academicDepartment`. To add a new domain, mirror an existing module and register it in `src/routes/index.ts` (`moduleRoutes` array).

### Request lifecycle conventions

- **Validation**: routes wrap handlers in `RequestValidation.validateRequest(schema)` from `src/middleWares/validateRequest.ts`. Zod schemas wrap the whole shape `{ body, query, params }` — write schemas as `z.object({ body: z.object({...}) })` etc., not bare body schemas.
- **Async errors**: every controller is wrapped in `catchAsync` (`src/shared/catchAsync.ts`) so `throw` in services bubbles to the global handler — never write `try/catch` around the service call just to call `next(error)`.
- **Errors**: throw `new ApiError(statusCode, message)` from `src/errors/APIError.ts` for expected failures. `src/middleWares/globalErrorHandler.ts` maps `ZodError`, Mongoose `ValidationError`, Mongoose `CastError`, and `ApiError` to a uniform `{ success, message, errorMessages, stack }` payload (stack hidden when `NODE_ENV === 'production'`).
- **Responses**: always return through `sendResponse<T>(res, { statusCode, success, message, data, meta? })` from `src/shared/sendResponse.ts` so the response envelope stays consistent.
- **Query parsing**: use `pick(req.query, fieldList)` (`src/shared/pick.ts`) to whitelist filter and pagination fields. Filterable/searchable fields are declared as constant arrays inside each module's `*.constant.ts`.
- **Pagination**: `calculatePagination` in `src/helpers/paginationHelper.ts` normalizes `page/limit/sortBy/sortOrder` (defaults: page 1, limit 10, sort by `createdAt desc`). The standard `paginationFields` list lives in `src/constants/pagination.ts`.

### Searching & filtering pattern (services)

`getAll*` services build an `andConditions` array combining a `$or` regex search across `searchableFields` with an `$and` of exact-match `filterableFields`, then apply `sort/skip/limit`. See `src/app/modules/student/student.service.ts` and `academicSemester/academicSemester.service.ts` — copy this shape rather than inventing a new query strategy.

### Cross-module data model

`User` is the auth principal and references one of `Student | Faculty | Admin` by `ObjectId`. `Student` references `AcademicSemester`, `AcademicDepartment`, and `AcademicFaculty`. Creating a student or faculty is a **two-document write** in `user.service.ts` performed inside a Mongoose session/transaction (`startSession` → `startTransaction` → `commitTransaction`/`abortTransaction`). When adding new linked-document creation flows, use the same transaction pattern — MongoDB transactions require a replica set.

### ID generation

Human-readable IDs are generated in `src/app/modules/user/user.utils.ts`:

- Student ID: `<YY><semesterCode><5-digit-sequence>` (e.g. `2301<00001>`), looked up from the most recent student-role user.
- Faculty ID: `F<5-digit-sequence>`.

These are **not race-safe** under concurrent requests — read the existing implementation before adding new ID schemes.

### Role enum mismatch (gotcha)

`src/enums/users.ts` defines `ENUM_USER_ROLE` with values `super_admin | admin | student | faculty`, but the `User` Mongoose schema (`user.model.ts`) restricts `role` to `['student', 'faculty', 'admin']` and `user.service.createStudent` assigns the literal string `'student'`. If you need `super_admin` to work, both the enum and the schema enum need updating.

## Code style

- ESLint extends `eslint:recommended` + `@typescript-eslint/recommended` + `prettier`. Notable rules: `@typescript-eslint/consistent-type-definitions: ['error', 'type']` — **use `type`, not `interface`**, even though existing files name types `IFoo`. `no-console` is a warning (the global error handler uses `console.log` only in development behind a config check).
- Prettier: semicolons on, single quotes, `arrowParens: 'avoid'`.
- Husky `pre-commit` runs `yarn lint-staged`, which runs `yarn lint:prettier` on staged `src/**/*.ts`. Don't bypass with `--no-verify`.
- Service exports are typically a single object literal (`export const FooService = { ... }`) or a default-exported object — match the surrounding module rather than introducing named per-function exports.
