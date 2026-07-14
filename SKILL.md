---
name: dropley
description: Publish files and static websites to Dropley and return a public shareable URL. Use whenever the user asks to upload, publish, host, deploy, or share files on Dropley.
---

# Dropley

Publish one or more files to Dropley.

**Endpoint:** `POST https://dropley.app/api/artifacts`

**Content-Type:** `multipart/form-data`

**Authentication:** None

## Requirements

- Send a JSON `manifest` multipart field.
- Send one `file` multipart field for each file listed in `manifest.files`, in the same order.
- The site's entry document **must** be uploaded as `index.html`.
- For multi-file sites, preserve the relative paths of all other files.
- Use accurate file sizes and MIME types.
- Return the public URL from the response.

## Response

```json
{
  "url": "https://preview.dropley.app/p/<id>",
  "expiresAt": "...",
  "artifactToken": "..."
}
```

## Specification

For the complete upload protocol, validation rules, manifest schema, limits, and future updates, consult:

- https://dropley.app/llms.txt
- https://dropley.app/api/v1/openapi.json
