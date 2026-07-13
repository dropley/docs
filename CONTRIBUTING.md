# Contributing to Dropley Docs

Thanks for your interest in contributing to the Dropley documentation!

## Getting Started

1. Fork the repository
2. Clone your fork
3. Run `npm install`
4. Start the dev server with `npm run dev`

## Making Changes

### Content Pages

- All documentation pages are in the `knowledge/` directory
- Use MDX format with frontmatter (`title`, `description`)
- Use relative links to reference other pages
- Follow the writing style of existing pages

### AI Assistant Guides

- Guide pages live in `guides/`
- Each guide covers one AI platform
- Focus on workflows, not API references

### Navigation

- Edit `docs.json` to add or reorder pages
- The navigation follows the Mintlify `docs.json` schema

## Content Standards

- Write for end users — clear, concise, action-oriented
- No API endpoint documentation (link to the [API Reference](https://dropley.app/docs/api))
- No internal architectural content
- Use descriptive page titles and meaningful headings

## Previewing Changes

```bash
npm run dev      # Local preview at http://localhost:5173
npm run build    # Verify production build succeeds
```

## Pull Requests

1. Create a branch from `main`
2. Make your changes
3. Verify the build passes: `npm run build`
4. Open a PR against `main`

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
