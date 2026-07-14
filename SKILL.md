---
name: dropley-upload
description: Publish files or static websites to Dropley and return a public shareable URL. Use whenever the user asks to upload, publish, host, deploy, or share HTML, Markdown, or other supported files on Dropley. Triggers on phrases like "upload to dropley", "share this file", "get a public URL", "host this HTML", "publish this site", or "put this on dropley".
---

# Dropley Upload

Publish one or more files to Dropley and return a public URL.

**Endpoint:** `POST https://dropley.app/api/artifacts`

**Content-Type:** `multipart/form-data`

**Authentication:** None

## When to use

Use this skill whenever the user wants to:

- Upload a file to Dropley
- Publish a static website
- Share HTML publicly
- Get a public URL for generated content
- Host files on Dropley

## Required fields

| Field | Type | Notes |
|-------|------|-------|
| `manifest` | string (JSON) | Upload manifest describing the artifact |
| `file` | binary | One multipart file for each entry in `manifest.files`, in the same order |

## Manifest structure

```json
{
  "manifestVersion": 1,
  "entry": "index.html",
  "files": [
    {
      "path": "index.html",
      "size": 1234,
      "contentType": "text/html"
    },
    {
      "path": "assets/app.js",
      "size": 5678,
      "contentType": "application/javascript"
    },
    {
      "path": "styles/main.css",
      "size": 910,
      "contentType": "text/css"
    }
  ]
}
```

## Entry file requirement

**Critical constraint:** Dropley requires the site's entry document to be named `index.html`.

- For a single HTML file, upload it as `index.html` regardless of its original filename.
- For multi-file websites, preserve the relative paths of all assets (CSS, JavaScript, images, fonts, etc.), but upload the entry HTML document as `index.html`.
- Set `"entry": "index.html"` in the manifest.
- If multiple HTML files exist and the entry page is not obvious, ask the user which page should be the site's entry before uploading.

## Validation rules

- `manifestVersion` **MUST** be `1`.
- `entry` **MUST** be `index.html`.
- `entry` **MUST** exist in `manifest.files`.
- Every file listed in `manifest.files` **MUST** include:
  - `path`
  - `size`
  - `contentType`
- Every `path` **MUST** be unique.
- `manifest.files` **MUST** contain between **1** and **1000** files.

## Upload requirements

- Every object in `manifest.files` must have a corresponding multipart `file` part.
- Multipart file parts **MUST** appear in the same order as `manifest.files`.
- Every multipart upload part **MUST** use the field name `file`.
- The number of multipart `file` parts **MUST** exactly equal `manifest.files.length`.
- Preserve relative paths for all non-entry files.
- Provide accurate MIME types whenever known.

## Optional fields

| Field | Notes |
|------|-------|
| `expiry` | `1d`, `3d`, `7d`, `15d`, or `30d` (default: `7d`) |
| `source` | Optional identifier of the uploading client (for example: `claude-code`, `codex`, `continue`) |
| `tags` | Array of up to 10 strings |

## Example

```bash
curl -X POST https://dropley.app/api/artifacts \
  -F 'manifest={"manifestVersion":1,"entry":"index.html","files":[{"path":"index.html","size":1234,"contentType":"text/html"}]}' \
  -F 'source=claude-code' \
  -F 'file=@/path/to/page.html;filename=index.html;type=text/html'
```

Get the file size before building the manifest:

```bash
wc -c < /path/to/file
```

## Successful response

**HTTP 201**

```json
{
  "url": "https://preview.dropley.app/p/<shortId>",
  "expiresAt": "2026-07-21T12:34:56Z",
  "artifactToken": "..."
}
```

Present the public preview URL to the user.

The `artifactToken` can be used for future management operations such as updating or deleting the artifact.

## Error handling

If the upload fails because of validation or protocol errors, consult:

- `https://dropley.app/llms.txt`

for the latest API constraints before retrying.

For the complete API specification and endpoint details, see:

- `https://dropley.app/api/v1/openapi.json`
