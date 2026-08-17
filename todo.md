# Project TODO

- [x] Inspect the attached AI Image Studio specification
- [x] Initialize Android-first Expo mobile project
- [x] Write mobile interface design plan
- [x] Generate and configure branded AI Image Studio logo assets
- [x] Build Home / Create screen with prompt composer and generation modes
- [x] Add reference image picker and preview/remove interactions
- [x] Add expandable generation settings
- [x] Add generation progress, success, retry, and error states
- [x] Build Creations gallery and full-screen image viewer
- [x] Build Saved gallery with save/unsave behavior
- [x] Build Profile and Edit Profile screens
- [x] Add app settings and theme preference controls
- [x] Add local persistence for creations, saved images, profile, and preferences
- [x] Add download/share action boundaries for generated media
- [x] Add backend-ready generation service abstraction and provider types
- [ ] Preserve secure backend-only API key architecture
- [ ] Add authentication boundary and user-scoped data model
- [ ] Add deterministic tests for core state and persistence behavior
- [x] Run typecheck, lint, tests, and visual verification
- [ ] Save final checkpoint and deliver project

- [x] Audit supplied APK and AAB metadata, package configuration, permissions, and build identity
- [x] Audit startup, navigation, image generation, upload, download, share, and persistence flows for crash risks
- [x] Add explicit network timeout, retry, offline, and human-readable failure states
- [x] Remove or isolate native-only imports that can crash web or unsupported platforms
- [x] Add deterministic tests for reliability-critical state and service boundaries
- [ ] Validate Android build configuration and downloadable artifact workflow
- [x] Re-run typecheck, lint, tests, and preview verification after hardening
- [ ] Save hardened checkpoint and provide the downloadable project

- [x] Diagnose installed APK startup failure and identify release-specific crash cause
- [ ] Fix APK startup failure and validate a new Android release build

- [ ] Write updated publishing guide for corrected Android build
- [ ] Include fresh-build, uninstall/reinstall, device validation, and Play release steps

- [ ] Prepare Amazon Appstore metadata and submission values
- [ ] Guide Amazon Appstore APK upload, testing, and final submission

- [x] Create separate Amazon Appstore icon assets at the required dimensions
- [x] Create Amazon Appstore tablet screenshots and promotional image assets
- [x] Validate asset dimensions, formats, and upload naming instructions

- [ ] Replace placeholder Amazon privacy-policy URL with a real public HTTPS policy page
- [ ] Complete Amazon target-audience selection and verify the green completion status
- [ ] Recheck Amazon Upload Your App File completion status before submitting

- [x] Create public AI Image Studio privacy-policy page
- [ ] Verify privacy-policy URL is publicly reachable for Amazon Appstore

- [ ] Add secure server-side text-to-image generation flow
- [ ] Add secure reference-image upload and image-to-image generation flow
- [ ] Add generation job state, timeout, retry, quota, and provider-error handling
- [ ] Add moderation and safe-use validation for prompts and uploaded images
- [ ] Add production backend tests and Android release validation for real generation

- [ ] Prepare GitHub source repository workflow for AI Image Studio
- [ ] Document reproducible APK/AAB build and signing workflow
- [ ] Preserve package name and signing identity for future Amazon updates

- [x] Audit public-source commit for secrets, signing credentials, and private artifacts
- [x] Push AI Image Studio source to the authorized public GitHub repository
- [x] Verify public repository contents and document APK/AAB build path

- [ ] Add custom GitHub Actions Android validation and build workflow
- [ ] Add reproducible Android build configuration without committing secrets
- [ ] Validate and publish the workflow to GitHub
- [ ] Document protected secrets and workflow run/download steps
