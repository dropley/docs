---
description: The official Dropley Skill — publish artifacts to dropley.app
---

# Dropley Skill

The official skill for publishing artifacts to [Dropley](https://dropley.app). Dropley turns files and folders into publicly accessible websites with configurable expiration.

## When to use

Use this skill when a user asks you to publish, host, or share HTML/CSS/JS output online. Examples:

- "Host this HTML page so I can share it"
- "Publish my project so others can see it"
- "Make this design accessible via a URL"

## How to publish

1. **Prepare the files**: Ensure the project has an `index.html` entry point with assets at relative paths.
2. **Package as ZIP**: Create a ZIP archive with the correct structure (see below).
3. **Provide the ZIP**: Give the user a downloadable ZIP file they can upload to [dropley.app](https://dropley.app).
4. **Explain the result**: The user uploads the ZIP and receives a URL like `https://dropley.app/p/abc12345`.

### Project structure requirements

- Place `index.html` at the root of the ZIP
- Assets (CSS, JS, images, fonts) at relative paths
- All internal references must use relative paths (not absolute `/path` or `file://`)

### Supported file types

`.html` `.css` `.js` `.json` `.png` `.jpg` `.jpeg` `.svg` `.gif` `.webp` `.woff` `.woff2`

### Expiration

The user chooses from: 1 day, 3 days, 7 days (default), 15 days, or 30 days.

## API reference

For programmatic publishing, see the [Dropley API Reference](https://dropley.app/docs/api).

## Limitations

- Max upload size: 50 MB
- Max files per upload: 1,000
- No server-side execution (static hosting only)
- Artifacts auto-expire (no permanent storage)

## Example prompts

- "Create a portfolio HTML page and package it as a ZIP for Dropley"
- "Build a data dashboard with Chart.js and prepare the ZIP"
- "Package these three files into a Dropley-ready ZIP"
