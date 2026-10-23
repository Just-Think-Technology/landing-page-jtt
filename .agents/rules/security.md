---
tipo: rule
origin: baseline
scope: every service, script, pipeline and configuration in the repository
enforcement: code review, CI and manual review
---
# Security

Security is a default, not a feature added at the end. When a choice is between convenient and safe, choose safe and record the cost.

Project-specific values, such as rate limits, CSP directives and backup schedules, live in `decisions/` or in project rules. This rule defines the baseline that every project follows.

## Secrets

- Secrets live in a password manager and in the CI secret store (GitHub Environments or equivalent). Never in the repository, a test fixture, a screenshot, a log or `.agents/`.
- `.env` is local and ignored. `.env.example` contains placeholders only.
- Never paste a secret into chat, an issue, a PR or a commit message. If a secret leaks, rotate it first and record the incident.
- A missing required secret fails at boot or at deploy. It never becomes an empty string or a default credential in production.
- Separate credentials by purpose: application runtime, migrations, backups and CI do not share a privileged user.

## Authentication

- Passwords are stored with a slow, salted hash (argon2id or bcrypt with a current cost). Never reversible and never in logs.
- Sessions use `httpOnly`, `Secure` cookies in every non-local environment. JavaScript never reads the session token, and the token is never stored in `localStorage`.
- Refresh tokens are opaque, stored hashed and rotated. Reuse of a rotated token is treated as theft and revokes the affected sessions.
- Changing a password or an e-mail ends every session, unless a decision says otherwise.
- Verification and reset links are single-purpose, expiring and consumed once.
- Authentication responses do not reveal whether an account exists.
- Rate-limit login, registration, verification resend and password reset.

## Authorization

- Authorization is decided on the server, on every request, from the authenticated identity and the stored resource. Never trust a role, an owner id or a visibility flag sent by the client.
- Default deny. A route or resource without an explicit allow rule is closed.
- Check object-level access, not only the role. A valid session does not grant access to another account's resource.
- Re-read the live role when a change must take effect immediately. Do not trust a long-lived token claim for that.
- Return `403` when the caller is authenticated but not allowed. Return `404` when revealing existence would leak information. An unauthenticated browser navigation to a protected page redirects to login.
- Authorization logic has one home and is reused by the API, the UI and the tests.

## Input and output

- Validate every input at the boundary: type, size, format, range and allowed values.
- Use parameterized queries or the ORM. Never concatenate input into SQL.
- Escape output in the context where it renders: HTML, attribute, URL, e-mail, CSV.
- Do not accept a file type by extension alone. Check the content type and enforce the size limit while streaming.
- Do not serve user-uploaded HTML from the application origin. Serve documents as attachments or with a safe content type and `nosniff`.
- Errors shown to the user are actionable and in Brazilian Portuguese. Stack traces, SQL and internal identifiers stay in the logs.

## Personal data and confidentiality

- Collect only what the feature needs. Record why each personal field exists.
- Never log document content, file names, e-mail addresses, tokens or credentials beyond what the operation requires. Log ids, counts, roles and error codes.
- Do not send personal data to a third party without a recorded decision and a review of the provider.
- Deletion is real deletion, unless a legal or contractual rule requires retention. Record the retention rule.
- Test data is synthetic. Never use a real document, client or e-mail in a test, demo or screenshot.
- Access to production data is exceptional, logged and limited to the people who need it.

## Dependencies and supply chain

- Commit the lockfile. Install from the lockfile in CI and in Docker images.
- Do not use `latest` for a runtime, a base image or a GitHub Action. Pin a version or a commit SHA.
- Run the dependency audit and fail on `high` and `critical` findings.
- Review the lockfile diff in a PR that changes dependencies.
- A new dependency needs a reason, a check of its maintenance and a note in the PR.
- Run secret scanning on every push and pull request. A verified secret fails the job.

## Transport, headers and abuse

- TLS in every environment that is not local-only. HSTS in staging and production.
- Security headers are configured once per app, not per route: CSP, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` or `frame-ancestors`, and a minimal `Permissions-Policy`.
- A CSP exception is documented next to the policy and has a reason. Do not add `unsafe-inline` or `unsafe-eval` for convenience.
- Rate-limit globally and apply stricter limits to authentication, upload and download routes. The limit is enforced on the server.
- The reverse proxy exposes only the port it must. Databases and object storage stay on the internal network.

## Data at rest and backups

- Disk or volume encryption is the minimum for a managed host. Application-level encryption is a decision, not an automatic choice.
- A backup that stays on the same machine is not a backup. It must leave the host and be encrypted.
- Test the restore, not only the backup. A row without its object is a broken restore.
- Never restore over production without an announced plan and explicit confirmation.

## CI and deployment

- CI secrets come from the secret store, never from a committed file.
- CI logs do not print environment files or credentials.
- A red security gate blocks merge.
- Production deploys use immutable artifacts (an image digest or a tagged release), not a rebuild from a moving branch.
- A deploy that changes a secret, a permission or a network rule is announced and reversible.

## When something goes wrong

1. Stop the exposure: revoke the credential, close the route or roll back the deploy.
2. Preserve evidence without copying personal data into a new place.
3. Rotate every credential that could have been exposed.
4. Record what happened, the impact and the fix.
5. Add the test or the gate that would have caught it.

Do not hide an incident to avoid noise. Do not delete logs that are needed to understand it.

## Review checklist

- [ ] No secret, token or real personal data in the diff.
- [ ] Authorization is server-side and checks the object, not only the role.
- [ ] Every input is validated; queries are parameterized.
- [ ] Output is escaped for its context.
- [ ] Uploads enforce type and size on the server.
- [ ] Logs do not contain personal data, document content or credentials.
- [ ] New dependencies are justified and audited.
- [ ] Security headers and rate limits still apply to the new route.
- [ ] Backup and restore still cover any new state.
- [ ] Errors shown to the user do not leak internals.
