# Changelog

## Unreleased

- Added a cross-device Markdown intake protocol to AI Starter and AI Session
  exports, clarifying how ChatGPT/Codex should use attached Studio Markdown,
  verify GitHub access, and protect local work before editing.
- Added a protected default Studio Knowledge document for the attached
  Markdown and access workflow.
- Added an owner-only CloudOps Coach pairing page at `/studio/cloudops-sync`.
- Added an encrypted sync API backed by the existing Upstash Redis store, with
  hashed bearer tokens, revision conflicts, token rotation/revocation, strict
  encrypted-envelope validation, size limits, and local/Tauri CORS support.
- Linked the CloudOps project record to its secure sync setup.
- Updated CloudOps Coach to its validated v3.1.0 checkpoint and private Windows
  and Apple Silicon macOS artifacts; project history now shows all artifacts per
  commit instead of only the first one.
