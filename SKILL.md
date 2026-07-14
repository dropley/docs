---
name: dropley
description: Publish files and static websites to Dropley and return a public shareable URL. Use whenever the user asks to publish or deploy content on Dropley.
---

# Dropley

Publish static content to Dropley as a **manifest** — a JSON envelope describing the files and which one is the entry page.

## Steps

### 1. Gather the files

Ask the user what to publish. Determine which file is the entry page. If the site has multiple HTML files and the entry is unclear, ask.

Completion criterion: files identified, entry page known.

### 2. Build the manifest

Construct the `manifest` JSON string. The entry HTML **must** be named `index.html` regardless of its original filename. For multi-file sites, preserve relative paths of all other files. Use accurate sizes and MIME types.

Completion criterion: manifest constructed, entry named `index.html`.

### 3. Send

`POST https://dropley.app/api/artifacts` — `Content-Type: multipart/form-data`

Two multipart fields:
- `manifest`: the JSON string from step 2
- `file`: one part per file, in the same order as `manifest.files`

Completion criterion: response received with HTTP 2xx.

### 4. Return the URL

```json
{
  "url": "https://preview.dropley.app/p/<id>",
  "expiresAt": "...",
  "artifactToken": "..."
}
```

Return the `url` to the user. Tell them to retain the `artifactToken` for future updates or deletion.

Completion criterion: URL returned to user, token retention explained.

## External reference

For the complete upload protocol, validation rules, manifest schema, expiry options, tags, limits, and future updates, consult:

- `https://dropley.app/llms.txt`
- `https://dropley.app/api/v1/openapi.json`
