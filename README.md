# Dropley Docs

[![docs.dropley.app](https://img.shields.io/badge/docs-dropley.app-171717?style=flat)](https://docs.dropley.app)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

The official documentation website for [Dropley](https://dropley.app) — publish finished static HTML artifacts. Drag, drop, share.

**Live at [docs.dropley.app](https://docs.dropley.app)**

## What's Inside

| Directory | Contents |
|-----------|----------|
| `knowledge/` | User docs — getting started, concepts, limits, security, FAQ |
| `guides/` | AI assistant integration guides (Claude, Codex, Gemini, etc.) |
| `public/examples/` | Reference projects you can inspect and learn from |
| `SKILL.md` | Canonical Dropley skill for AI coding agents, served at [docs.dropley.app/skill.md](https://docs.dropley.app/skill.md) |

## Contributing

Found an error or want to improve the docs? Open an issue or send a PR. All content is in MDX — see existing pages for style reference.

## Development

```bash
npm install
npm run dev     # local preview at http://localhost:5173
npm run build   # production build
```

Edit the root `SKILL.md` to update the official skill. Keep `public/skill.md` as the relative symlink `../SKILL.md`, preserving that exact filename case. The build copies the source contents to `/skill.md`; do not replace the symlink with a second editable copy.

Link to the raw skill with its full URL, `https://docs.dropley.app/skill.md`. The documentation generator strips `.md` from internal page links, so a root-relative link would point to the wrong path for this static asset.

## License

MIT
