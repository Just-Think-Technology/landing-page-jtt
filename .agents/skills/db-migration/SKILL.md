---
name: db-migration
description: Use when changing a database schema or backfilling data, especially in production. Covers expand-contract, safe DDL, Prisma and Alembic, and verification.
---
# Database migration

A migration is a production change. It runs once, on data you cannot recreate, and it must not take the system down.

Use this skill with the `testing` rule and the stack pack.

## Principles

- **Forward-only in production.** A destructive change is a sequence of safe steps, not one irreversible command.
- **Backward compatible first.** The old code must keep working while the new schema is deployed.
- **Small and reviewable.** One logical change per migration. Review the generated SQL, not only the schema diff.
- **Separate schema from data.** A DDL migration and a backfill are easier to reason about, retry and monitor separately.
- **Measure before you lock.** Know the table size, the query plans and the expected duration.
- **No reset in production.** `migrate reset`, `drop`, `truncate` and mass delete require an announced plan and explicit confirmation.

## Expand and contract

A breaking change ships in phases across deploys:

1. **Expand:** add the new column, table or index. Keep the old shape working.
2. **Dual write:** the application writes both shapes. Reads still use the old one.
3. **Backfill:** copy existing data in batches, with progress and a way to resume.
4. **Switch reads:** deploy code that reads the new shape. Keep the old writes for one deploy.
5. **Stop old writes:** remove the old path after the new one is proven.
6. **Contract:** drop the old column, table or constraint in a later deploy.

Do not combine expand and contract in the same deploy.

## Safe DDL patterns

| Change | Safe approach |
|---|---|
| Add a nullable column | Add it. Backfill. Add `NOT NULL` later, after the backfill is complete |
| Add a required column | Add nullable, backfill, then set `NOT NULL`; do not add a required column with no default to a large table |
| Add a default | Add the column, set the default, then backfill existing rows in batches if needed |
| Rename a column | Add the new column, dual write, backfill, switch reads, drop the old one later. Do not rename in place on a live system |
| Change a type | Add a new column with the target type, backfill and cast, switch reads, drop the old one |
| Add an index | On a large table, plan a concurrent index build and confirm how the migration tool handles transactions. Some tools wrap each migration in a transaction, which blocks `CONCURRENTLY` |
| Add a constraint | Add it `NOT VALID`, then `VALIDATE CONSTRAINT` in a separate step |
| Drop a column or table | Stop reading and writing it first, deploy, wait, then drop. Keep a backup window |

Use a `lock_timeout` and a `statement_timeout` for the migration session so a blocked DDL fails fast instead of queueing every request behind it.

## Backfill

- Do it in batches, ordered by a stable key: `UPDATE ... WHERE id > :last AND id <= :last + :size`.
- Commit each batch. Record progress so a failure resumes instead of restarting.
- Throttle the batch when the table is under write load.
- Make the backfill idempotent. Running it twice must not corrupt data.
- Verify with counts: rows expected, rows updated, rows still null.
- Do not run a single `UPDATE` over millions of rows inside the deploy.

## Prisma

- Change `schema.prisma`, then `pnpm prisma migrate dev --name <change>` locally.
- Open the generated SQL under `prisma/migrations/` and review it before applying.
- Commit the migration. An uncommitted migration is a migration that never runs.
- Deploy with `pnpm prisma migrate deploy`, using the privileged migration connection, never the runtime role.
- Use `pnpm prisma migrate status` to confirm the state before and after.
- Do not use `prisma db push` against a shared environment. It skips the migration history.

## Alembic

- Create the revision with `alembic revision --autogenerate -m "<change>"`.
- Review the generated file and the SQL. Autogenerate misses data migrations, constraints and renames.
- Test `alembic upgrade head` on a disposable database with production-like data.
- In production, run the upgrade as a deploy step with the privileged connection.
- A downgrade is for development. In production, prefer a forward fix or a restore plan.

## Before applying

- [ ] The migration is committed and reviewed as SQL.
- [ ] It was applied to a disposable copy with production-like volume.
- [ ] The table size and the expected lock are known.
- [ ] The code that deploys with it tolerates both the old and the new shape.
- [ ] A backup exists and the restore was tested, when the change is destructive.
- [ ] The application role has the grants the new object needs.
- [ ] The migration does not depend on a manual step that is not documented.

## After applying

- [ ] The deploy is healthy and the affected routes answer.
- [ ] Row counts and null counts match the expectation.
- [ ] No orphan row and no broken foreign key.
- [ ] The query plan for the hot query is acceptable.
- [ ] The backfill, if any, completed and is recorded.
- [ ] The old shape is removed only in a later, separate deploy.

## Rollback

- Prefer a forward fix over a down migration in production.
- A down migration is safe only when it does not lose data. Otherwise, the rollback is a restore, and a restore needs an announced plan and confirmation.
- Never restore over production to "undo" a small mistake. Fix forward or restore to a separate database and copy the data.

## Review checklist

- [ ] The change is backward compatible for one deploy.
- [ ] The generated SQL was read, not only the schema diff.
- [ ] Large-table operations use a safe pattern.
- [ ] Backfill is batched, idempotent and resumable.
- [ ] The migration uses the privileged connection and the runtime role stays least-privileged.
- [ ] A destructive step is separate and announced.
- [ ] Verification queries and a rollback plan exist.
