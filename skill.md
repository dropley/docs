---
description: The official Dropley Skill — publish artifacts to dropley.app
---

# Dropley Skill

The official skill for publishing artifacts to [Dropley](https://dropley.app). Dropley turns ZIP files into publicly accessible websites with configurable expiration.

## When to use

Use this skill when a user asks you to publish, host, or share HTML/CSS/JS output or a ZIP project online. Examples:

- "Host this HTML page so I can share it"
- "Publish my project so others can see it"
- "Create a ZIP and upload it"
- "Make this design accessible via a URL"

## How to publish

1. **Create the ZIP**: Package the user's files into a ZIP archive with the correct structure (see structure below).
2. **Provide the ZIP**: Give the user a downloadable ZIP file they can upload to [dropley.app](https://dropley.app).
3. **Explain the result**: The user uploads the ZIP and receives a URL like `https://dropley.app/p/abc12345`.

### ZIP structure requirements

- **Single HTML page**: ZIP containing one `.html` file at the root.
- **Multi-file project**: ZIP with `index.html` as the entry point, assets at relative paths.

### Supported file types

`.html` `.css` `.js` `.json` `.png` `.jpg` `.jpeg` `.svg` `.gif` `.webp` `.woff` `.woff2`

### Relative paths

All internal references must use relative paths (not absolute `/path` or `file://` paths).

### Expiration

The user chooses from: 1 day, 3 days, 7 days (default), 15 days, or 30 days.

## API reference

For programmatic publishing, see the [Dropley API Reference](https://dropley.app/docs/api).

## Limitations

- Max ZIP size: 50 MB
- Max files per ZIP: 500
- No server-side execution (static hosting only)
- Artifacts auto-expire (no permanent storage)

## Example prompts

- "Create a portfolio HTML page and package it as a ZIP for Dropley"
- "Build a data dashboard with Chart.js and prepare the ZIP"
- "Package these three files into a Dropley-ready ZIP"
