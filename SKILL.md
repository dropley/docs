---
name: dropley
description: Publish, retrieve, update, and delete files or static websites on Dropley. Use whenever the user wants to publish or manage content on Dropley.
---

# Dropley

Dropley hosts static files and websites and provides public shareable URLs.

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
| `expiry` | `1d`, `3d`, `7d`, `15d`, or `30d` (default `7d`) |
| `source` | Optional identifier of the uploading client (for example: `claude-code`, `codex`, `continue`) |
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

Requires the `artifactToken` returned during artifact creation. Supports updating artifact metadata and replacing uploaded files.

---

## Delete Artifact

**Endpoint:** `DELETE /api/artifacts/{id}`

Requires the `artifactToken`.

---

## References

If a request fails due to validation errors or the API has changed, consult:

- `https://dropley.app/llms.txt`

For the complete API specification and request/response schemas:

- `https://dropley.app/api/v1/openapi.json`
