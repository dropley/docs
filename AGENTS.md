# AGENTS.md

Instructions for AI agents working on the Dropley documentation site.

## Relationship to the main repo

This repo (`dropley/docs`) is the user-facing documentation site for the main application at `dropley/dropley`. When features, APIs, limits, or UI change in the main repo, the corresponding docs pages here must be updated.

## When to update docs

| Main repo change | Docs to update |
|---|---|
| API endpoint added/modified/removed | **None** — API docs are never duplicated here. Link to `https://dropley.app/docs/api` instead. |
| Service limits changed | `knowledge/limits.mdx` |
| Upload flow / UI changed | `knowledge/getting-started.mdx`, `knowledge/publishing-html.mdx`, `knowledge/publishing-zip.mdx` |
| Expiration options changed | `knowledge/concepts.mdx`, `knowledge/limits.mdx` |
| Supported file types changed | `knowledge/publishing-zip.mdx` |
| File size / rate limits changed | `knowledge/limits.mdx` |
| Security / CSP / acceptable use policy changed | `knowledge/security.mdx` |
| New AI assistant platform added | `guides/` — add a new platform guide |
| New example use case | `public/examples/` — add a new example project, update `knowledge/examples.mdx` |
| Brand / design tokens updated | `docs.json` (colors section) |

## What NOT to do

- Never add API endpoint documentation (paths, schemas, request/response bodies). Those live in the main app's OpenAPI spec at `https://dropley.app/docs/api`.
- Never include internal architecture details, DB schemas, or implementation notes.
- Never duplicate content from the main repo's `docs/` directory (internal docs).

## Conventions

- Content format: MDX with frontmatter (`title`, `description`)
- Use relative links between pages (e.g., `/knowledge/concepts`)
- External links use full URLs
- Frontmatter is required on every page
- Use existing pages as style references for tone and structure
- All content is user-facing — write for end users, not maintainers

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local preview at `http://localhost:5173` |
| `npm run build` | Production build (verify no errors) |
| `npm test` | No unit tests — validation is build-time only |

## Navigation

Edit `docs.json` to add, remove, or reorder pages. Follow the Mintlify `docs.json` schema.

## Preview before committing

Always run `npm run build` before committing to catch broken internal links and MDX errors.
