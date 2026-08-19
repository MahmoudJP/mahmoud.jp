# Changelog

## Unreleased

- Added an owner-only CloudOps Coach pairing page at `/studio/cloudops-sync`.
- Added an encrypted sync API backed by the existing Upstash Redis store, with
  hashed bearer tokens, revision conflicts, token rotation/revocation, strict
  encrypted-envelope validation, size limits, and local/Tauri CORS support.
- Linked the CloudOps project record to its secure sync setup.
