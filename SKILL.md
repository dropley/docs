---
name: dropley
description: Publish, retrieve, update, and delete finished static HTML artifacts on Dropley. Use when a completed index.html-based site or artifact needs a temporary public share link.
---

# Dropley

Dropley publishes finished static HTML sites and artifacts as temporary public
share links — no account required. Use it for output that includes an
`index.html` entry point, such as a single HTML page, a static-site folder, or a
ZIP archive. It is not generic file sharing, permanent hosting, or a runtime for
server-side applications.

## Create Artifact

### 1. Gather the files

Ask the user what to publish. Determine which file is the entry page. If the site has multiple HTML files and the entry is unclear, ask.

Completion criterion: files identified, entry page known.

### 2. Build the manifest

Construct the `manifest` JSON string. The entry HTML **must** be uploaded as `index.html` regardless of its original filename. For multi-file sites, preserve relative paths of all other files. Use accurate sizes and MIME types.

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
    }
  ]
}
```

If multiple HTML files exist and the entry page is unclear, ask the user which page should be the site's entry.

Completion criterion: manifest constructed, entry named `index.html`.

### 3. Send

**Endpoint:** `POST /api/artifacts`

**Content-Type:** `multipart/form-data`

**Authentication:** None

#### Multipart fields

| Field | Type | Notes |
|-------|------|-------|
| `manifest` | JSON string | The manifest from step 2 |
| `file` | Binary | One part for each entry in `manifest.files`, in the same order |

#### Validation rules

- `manifestVersion` **must** be `1`.
- `entry` **must** be `index.html` and **must** exist in `manifest.files`.
- Every file requires `path`, `size`, and `contentType`.
- Every `path` must be unique.
- `manifest.files` must contain between **1** and **1000** files.
- Every object in `manifest.files` must have a corresponding multipart `file` part, in the same order.
- Every multipart upload part must use the field name `file`.
- The number of multipart `file` parts must equal `manifest.files.length`.

#### Optional fields

| Field | Description |
|------|-------------|
| `expiry` | `1d`, `3d`, or `7d` (default `3d`) |
| `source` | Optional identifier of the uploading client. One of: `claude-code`, `chatgpt`, `cursor`, `lovable`, `bolt`, `storybook`, `figma`, `other` |
| `tags` | Array of up to 10 strings |

Completion criterion: response received with HTTP 2xx.

### 4. Return the URL

```json
{
  "url": "https://preview.dropley.app/p/<id>",
  "expiresAt": "2026-07-21T12:34:56Z",
  "artifactToken": "..."
}
```

Return the public `url` to the user. Tell them to retain the `artifactToken` for future update or delete operations.

Completion criterion: URL returned to user, token retention explained.

---

## Retrieve Artifact

**Endpoint:** `GET /api/artifacts/{id}`

Returns the artifact metadata and current status.

---

## Update Artifact

**Endpoint:** `PATCH /api/artifacts/{id}`

Requires the `artifactToken` returned during artifact creation, passed in the `X-Artifact-Token` header. Supports updating artifact metadata (`source`, `expiry`, `tags`). Files cannot be replaced.

---

## Delete Artifact

**Endpoint:** `DELETE /api/artifacts/{id}`

Requires the `artifactToken` in the `X-Artifact-Token` header.

---

## References

If a request fails (unknown path, disallowed method, or validation error), the response body is a flat JSON object with `error`, `code`, `message`, and `hint` fields — machine-facing API failures never return an HTML page.

If requests fail or the API has changed, consult:

- `https://dropley.app/llms.txt` — machine-readable site index with a "When to use Dropley" summary and developer resources
- Any dropley.app page (`/features`, `/about`, `/contact`, `/privacy`, `/terms`, `/acceptable-use`) fetched with an `Accept: text/markdown` header returns a Markdown representation

For the complete API specification and request/response schemas:

- `https://dropley.app/api/v1/openapi.json`

This URL also serves byte-identical copies at `https://dropley.app/openapi.json`, `/openapi.yaml`, `/api/openapi.json`, and `/api/openapi.yaml`. Every operation has a stable unique `operationId` (`createArtifact`, `getArtifact`, `updateArtifact`, `deleteArtifact`, `createReport`), so the spec is safe to load directly into function-calling tools and code generators.
