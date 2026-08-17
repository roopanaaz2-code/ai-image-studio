# AI Image Studio: A–Z Guide to Publishing Successfully

**Prepared for:** AI Image Studio

**Last reviewed:** 17 August 2026

> **Important reality check:** No developer can honestly guarantee that an app will never crash or that every network request will always succeed. The correct goal is a release that is production-ready, tested on representative Android devices, resilient when services fail, and supported by monitoring and a rollback plan.

This guide is written for the current AI Image Studio project and the APK/AAB you supplied. The current project has a polished Android-first interface, local persistence, image fallback behavior, native-module isolation, API timeout/retry handling, and reliability tests. Before public release, the live AI provider, authentication, private cloud storage, usage limits, and user-scoped backend data must be connected and tested as production services.

## Release Status at a Glance

| Area | Current status | Public-release requirement |
|---|---|---|
| Mobile interface | Implemented and preview-verified | Test on real Android devices and different screen sizes |
| APK/AAB identity | Supplied build audited | Keep the same package name and signing identity for updates |
| Image upload/download/share boundaries | Implemented | Validate gallery and share behavior on physical devices |
| Connection timeout/retry handling | Added to the API client | Test airplane mode, slow networks, timeouts, and provider failures |
| AI generation backend | Not yet a complete production integration | Connect server-side provider routing, quotas, private storage, and monitoring |
| Google authentication | Backend/template boundary exists, but public flow needs end-to-end testing | Test login, callback, logout, persistence, and review credentials |
| Data protection | Must be finalized for the live architecture | Publish privacy policy and complete accurate Play Data safety declarations |
| Store release | Not yet public | Complete internal test, closed test, production access, and review |

Google Play requires developers to complete account setup, accept the Developer Distribution Agreement, pay the registration fee, choose an account type, verify identity, and—where applicable—complete testing and device-verification requirements.[1]

## A — Account and Ownership

Create or use a dedicated Google account that will remain under your control. Enable two-step verification, add a recovery email and phone number, and decide whether the Play Console account should be **Personal** or **Organization**. Use an organization account when the app belongs to a registered company or team. Keep ownership, signing credentials, backend credentials, billing access, and the privacy-policy domain under controlled accounts rather than a temporary personal email.

Google Play Console registration requires the developer agreement, registration payment, account-type selection, and identity verification.[1] Do not share the owner password with contractors; use Play Console users and roles instead.

## B — Build Identity

Confirm that the Android package name is permanent. The current project uses the package identity generated for AI Image Studio. Do not change it after publishing unless you intend to create a completely separate app. A Play update must use the same application identity and compatible signing lineage as the installed app.

Record the following in a private release document:

| Value | What to record |
|---|---|
| Application ID/package name | The exact value shown in the release configuration |
| Version name | Human-readable release, such as `1.0.1` |
| Version code | Integer that increases for every uploaded release |
| Upload-key owner | The person or organization responsible for the upload key |
| Play App Signing status | Whether Google manages the app-signing key |
| Backend production URL | HTTPS API origin used by the release build |
| Support email | Monitored address shown to users and reviewers |

## C — Complete the Product Before Publishing

The current build should not be marketed as a complete commercial AI service until the production backend is ready. The public release must connect the mobile client to a secure backend that performs authentication, validates requests, selects an enabled AI provider, enforces usage limits, stores images privately, records generation history, and returns safe errors.

Provider API keys must remain on the server. Never place OpenAI, Gemini, storage, database, OAuth, or signing secrets in React Native source code, `app.config.ts`, screenshots, public repositories, or the APK/AAB.

For AI Image Studio, the minimum production generation path is:

> User → authenticated mobile request → HTTPS backend → usage and authorization checks → provider router → AI provider → private object storage → safe generation record → mobile viewer.

## D — Data Model and User Isolation

Before release, implement and test user-scoped records for profiles, generations, saved images, reference uploads, provider/model metadata, usage, and deletion status. Every read, update, download, and delete operation must verify the authenticated user ID on the server. Do not rely on a client-supplied user ID.

Test explicitly that User A cannot access User B’s image URL, generation record, profile, or saved image by changing an ID in a request. Use private storage or short-lived authenticated download URLs rather than public permanent URLs.

## E — Error and Offline Experience

Test the app with Wi-Fi disabled, mobile data disabled, a slow connection, a DNS failure, a server timeout, a provider timeout, an invalid prompt, a rejected content request, an exhausted quota, and an expired login session. Each situation should produce a short human-readable message and a recovery action such as **Retry**, **Sign in again**, **Check connection**, or **Try another prompt**.

Never show stack traces, raw provider responses, API keys, database errors, or internal storage paths to users. The current project includes bounded API requests and safe connection messages; the live generation procedure must use the same discipline.

## F — Final Release Build

Use the platform’s **Publish** flow to create the Android release artifact. Use the **AAB** for Google Play. Use the **APK** for direct installation and device testing. Android App Bundles allow Google Play to generate optimized APKs for individual device configurations.[2]

Do not manually rename an old artifact and do not upload a debug build. Confirm that the build is a release build, uses HTTPS endpoints, has the final app name and icon, has production environment configuration, and does not point to preview or localhost services.

## G — Google Play Console Setup

Open [Google Play Console](https://play.google.com/console), create the app, select the default language, enter **AI Image Studio**, choose the app category, and confirm that the app is free or paid as intended. If the app later sells subscriptions or credits, configure the billing model and policy disclosures before enabling purchases.

Complete the dashboard tasks in the order shown. The console may not enable production until account verification, app content, testing, and policy forms are complete.

## H — App Signing

Use **Google Play App Signing** unless you have a specific, well-documented reason not to. Google describes Play App Signing as a service where Google protects the app-signing key and uses it to sign APKs distributed to users.[3]

Treat the upload key as critical infrastructure. Store it in a password manager or encrypted company vault. Keep an offline recovery record. Never send it through chat or commit it to Git. If it is lost, follow Google’s upload-key reset process; do not create a new Play listing just because an upload key was mishandled.

## I — Internal Testing

Start with an internal test track. Add trusted testers, upload the AAB, install it through the generated Play testing link, and verify installation and update behavior. Internal testing is useful for catching packaging, signing, deep-link, permission, and device-compatibility problems before recruiting a larger group.[1]

Test at minimum on a low-memory Android phone, a modern mid-range phone, a large-screen phone, a device with dark mode, a device with limited storage, and both Wi-Fi and mobile data.

## J — Closed Testing

If your Play Console account is a personal account created after 13 November 2023, Google requires a closed test with at least **12 testers opted in continuously for at least 14 days** before production access can be requested.[4] Testers must remain opted in; merely sending them an APK or having them install once is not enough.

Recruit testers who represent the intended audience. Give them a short test script and a clear bug-reporting channel. Ask them to exercise the full workflow rather than only opening the Home screen.

A useful tester script is:

1. Install from the Play testing link.
2. Open the app after a fresh install.
3. Sign in and sign out.
4. Enter a prompt and submit it.
5. Upload a gallery image and remove it.
6. Try camera access and deny it once.
7. Open a result, save it, unsave it, download it, share it, and delete it.
8. Turn on airplane mode and confirm the error is understandable.
9. Reopen the app and confirm persistence.
10. Report the device model, Android version, steps, expected result, actual result, and screenshot.

Keep a dated record of tester feedback, fixes, retests, and unresolved issues. Google may ask about this information when you apply for production access.[4]

## K — Key Store and Versioning

Every Play update needs a higher version code than the previous uploaded release. Change the version name when the user-visible release changes. Never reuse a version code, even if an earlier build was rejected.

Example release sequence:

| Release | Version name | Version code | Purpose |
|---|---:|---:|---|
| Initial test | 1.0.0 | 1 | Internal and closed testing |
| First public release | 1.0.1 | 2 | Production launch |
| Bug-fix release | 1.0.2 | 3 | Crash and connection fixes |
| Feature release | 1.1.0 | 4 | New generation or gallery functionality |

## L — Listing Assets

Prepare the listing before production submission. Use the final icon, screenshots from the actual release build, a short description, a full description, category, contact email, support URL, privacy-policy URL, and feature graphic if requested by the console.

Do not use screenshots that show preview URLs, development tools, fake account data, broken images, or features that are not available in the uploaded build. Store copy should accurately describe the service. Avoid promises such as “unlimited free AI generation” unless the backend, plan, quota, and terms truly support that promise.

Suggested short description:

> Create, transform, save, and share images from text prompts or reference photos.

Suggested positioning:

> AI Image Studio is a creative workspace for turning prompts and reference images into visual concepts. Explore text-to-image, image transformation, editing directions, saved creations, and a personal creative history.

## M — Media Permissions

Request photo and camera permissions only when the user taps the relevant action. Explain why the permission is needed before the system prompt when appropriate. If the user denies access, the app must remain usable for text-only generation.

For downloads, request the minimum gallery permission required by the Android version and library behavior. Verify that saved images actually appear in the user’s gallery. Test cancellation, denial, limited access, and repeated permission requests.

## N — Network and Backend Production

Use a stable HTTPS production domain. Confirm that the AAB does not contain preview URLs, localhost, `127.0.0.1`, staging endpoints, or test API keys. Verify DNS, TLS certificates, CORS where relevant, authentication headers, request size limits, image upload limits, provider timeouts, rate limits, and server logs.

Use health checks and monitoring for the API, database, object storage, OAuth callback, provider availability, and error rate. A user-facing retry button is helpful, but it does not replace backend monitoring.

## O — Privacy Policy and Data Safety

Publish a privacy policy at a stable HTTPS URL and link it both in the Play listing and inside the app. Your policy must match actual behavior, including Google sign-in, profile information, prompts, reference images, generated images, device permissions, analytics, crash reporting, storage providers, AI providers, retention, deletion, and support processes.

Google requires developers to complete the Play Data safety form for published apps, including apps on closed or open testing tracks; even apps that collect no user data must complete the form and provide a privacy-policy link.[5] The developer is responsible for accurate declarations, including data handled by third-party SDKs.[5]

For the final production architecture, document:

| Data | Likely purpose | Questions to answer |
|---|---|---|
| Name, email, profile photo | Authentication and profile | Is it collected, shared, encrypted in transit, and deletable? |
| Prompt text | Image generation and history | Is it retained, used for training, or sent to providers? |
| Reference images | Image transformation | Where are they stored, for how long, and who can access them? |
| Generated images | Gallery and downloads | Are they private by default? How can users delete them? |
| Device identifiers or analytics | Diagnostics and product improvement | Which SDK collects them and for what purpose? |
| Camera/photo permission | User-selected media | Is access requested only when needed? |

Do not guess the answers in Data safety. Inspect the production backend, SDK documentation, database, logs, and storage behavior first.

## P — Play Policy and AI Content

Read the [Google Play Developer Policy Center](https://support.google.com/googleplay/android-developer/topic/9858052) before release. Make sure the app does not facilitate prohibited content, deceptive behavior, privacy violations, impersonation, or unsafe user-generated content. Add prompt and image moderation appropriate to the providers and use case. Provide a way to report abuse if users can publish or share content publicly.

If the app generates images of people, copyrighted styles, public figures, or sensitive subjects, define acceptable-use rules and provider-policy handling. Do not claim that generated content is always accurate, original, or safe.

## Q — Quality and Pre-Launch Report

Use Play Console’s pre-launch report after uploading the AAB. Review crashes, ANRs, screenshots, permission behavior, accessibility warnings, security findings, and device-specific failures. Google’s testing guidance recommends using testing tools and pre-launch reports to identify warnings, errors, and performance issues before production.[4]

Also run local quality checks:

| Check | Pass condition |
|---|---|
| Cold start | App opens without a crash on supported devices |
| Background/return | App resumes without losing or corrupting state |
| Rotation or configuration change | No broken layout or duplicate request |
| Low memory | App degrades gracefully and can reopen |
| Offline start | User sees a usable offline state rather than a blank screen |
| Slow image URL | Fallback image or retry state appears |
| Duplicate tap | Generation cannot be submitted twice accidentally |
| Permission denial | Text-only path remains available |
| Logout | Private data and session state are cleared appropriately |
| Update | Existing users can update without losing their data unexpectedly |

## R — Release to Production

When the closed test is complete, apply for production access in the Play Console dashboard. Personal accounts must answer questions about the closed test, the app, and production readiness.[4] Google states that review often takes seven days or less, but it can take longer.[4]

After production access is granted, create a production release, select the tested AAB, review countries/regions, pricing, store listing, app content, Data safety, content rating, and release notes, then submit for review. Start with a staged rollout if the console offers it for your release. A staged rollout limits exposure and allows you to monitor crashes before reaching everyone.

## S — Store Review Preparation

If login is required, provide Google reviewers with valid test instructions and working credentials or the approved sign-in path in the Play Console review section. Do not require reviewers to contact you for basic access. Explain how to reach the generator, how to upload a reference image, and how to test downloads.

Google specifically advises developers to provide valid working credentials when authentication is required so reviewers can test the app fully.[4]

## T — Troubleshooting Table

| Symptom | Likely cause | Correct action |
|---|---|---|
| Build request is being processed | A previous build is still running | Wait for the current build; do not submit repeated requests. If permanently stuck, contact platform support with the project and screenshot. |
| AAB rejected as unsigned | Release signing configuration is missing | Use the Publish flow and configure Play App Signing/upload signing correctly. |
| Version code already used | The integer was not increased | Increment version code and build a new AAB. |
| App unavailable on some devices | Target API, ABI, device, or manifest issue | Review Play device catalog, target API, architecture, permissions, and pre-launch report. |
| App opens but cannot connect | Preview URL, wrong production URL, TLS, DNS, CORS, or backend outage | Inspect the release configuration and production health checks; never ship localhost or preview URLs. |
| Generation hangs | Missing timeout or provider job handling | Add server and client timeouts, status polling or async jobs, retry rules, and visible progress states. |
| Images disappear | Public URL expiry or storage authorization issue | Use private storage with authenticated or signed access and test expiry behavior. |
| Download fails | Permission denial, unsupported URI, or missing media-library handling | Test permission states and use the Android media APIs supported by the chosen Expo version. |
| Reviewer cannot sign in | OAuth redirect, test account, or backend session failure | Test the exact release build and provide working review credentials/instructions. |
| Data safety rejected | Form does not match actual collection/sharing | Audit all backend services and third-party SDKs, then correct the form and privacy policy. |
| Crashes only on one phone | ABI, OS behavior, permission, memory, or vendor-specific issue | Reproduce on that device class, inspect Play pre-launch/crash reports, and release a versioned fix. |

## U — User Support and Account Deletion

Publish a support email that you actively monitor. Create a simple issue template requesting app version, Android version, device model, network type, steps, timestamp, and screenshot. Never ask users to send passwords, OAuth tokens, API keys, or private images unless there is a secure support process.

If users can create accounts or cloud data, implement account and data deletion in a way that matches your privacy policy and Play requirements. Deleting an account should address profile data, prompts, uploaded references, generated images, saved images, usage history, and provider copies where applicable.

## V — Version Updates

For every update, increase the version code, test the upgrade path from the currently published version, review Data safety changes, update release notes, and verify that signing remains compatible. Keep a rollback plan. If a release causes crashes, halt rollout, release a fixed higher version code, and communicate clearly with affected users.

Google’s target API requirements change over time. As of the current official Android documentation, starting **31 August 2026**, new apps and updates submitted to Google Play must target Android 16, API level 36 or higher.[6] Verify the requirement in Play Console at the moment you submit because future policy dates and exceptions can change.

## W — Web and Support URLs

Make sure every URL in the listing works without login unless the page is specifically an authenticated support page. Test the privacy policy, terms, support page, account-deletion instructions, and backend status page from a normal mobile browser. Use HTTPS and a domain that you will keep active for the life of the app.

## X — eXport and Backup Records

Before production submission, export or record the following securely:

1. Final AAB checksum and version code.
2. Package name and Play listing URL once assigned.
3. Upload-key and Play App Signing recovery information.
4. Backend environment names and production endpoint.
5. Database migration version.
6. Privacy policy and Data safety answers.
7. Closed-test tester list and feedback summary.
8. Release notes and known limitations.
9. Support escalation contacts.
10. Rollback and incident-response steps.

Do not place secrets in this document or in a public repository.

## Y — Your Final Go/No-Go Gate

Publish only when every item below is true:

| Gate | Required result |
|---|---|
| Build | Release AAB installs and updates correctly |
| Signing | Upload and Play App Signing are configured and backed up |
| Backend | HTTPS production APIs are live, monitored, and secured |
| AI provider | Provider routing, quotas, moderation, timeout, and fallback behavior are tested |
| Auth | Login, callback, logout, session persistence, and reviewer access work |
| Storage | Private upload, download, deletion, and authorization work |
| Permissions | Camera/photo permissions are requested only when needed and denied paths work |
| Testing | Internal and closed testing are complete; required personal-account criteria are satisfied |
| Listing | Screenshots and descriptions match the actual build |
| Policy | Privacy policy, Data safety, content rating, and policy declarations are accurate |
| Support | Support email and user deletion process are operational |
| Monitoring | Crash, ANR, backend, provider, and storage failures are visible |

## Z — Launch Day Procedure

On launch day, publish a staged production rollout if available. Watch crash-free users, ANRs, startup failures, login failures, generation failure rate, provider latency, storage errors, download errors, and support messages. Do not make unrelated code changes during the rollout.

If metrics are healthy, expand the rollout gradually. If serious errors appear, pause the rollout, identify whether the problem is client, backend, provider, or storage related, and release a focused fix. Keep the previous stable release and backend rollback configuration available.

## Exact Google Play Sequence for AI Image Studio

1. Complete the production backend and privacy policy.
2. Confirm the final package name and target API requirement.
3. Create a new checkpoint in the project.
4. Use Publish to generate the signed release AAB.
5. Create the Play Console app.
6. Upload the AAB to Internal testing.
7. Install and test it on multiple physical Android devices.
8. Fix every crash, ANR, broken permission flow, and connection failure.
9. Create Closed testing and add testers.
10. Keep at least 12 testers continuously opted in for 14 days if your personal account is subject to that rule.[4]
11. Complete the store listing, privacy policy, Data safety, content rating, app access, and target-audience forms.
12. Review the pre-launch report and resolve serious findings.
13. Apply for production access if required.
14. Upload the same tested release line with a higher version code only when changes were made.
15. Submit a staged production rollout.
16. Monitor crashes, ANRs, login, generation, storage, download, and support metrics.
17. Expand distribution only after the initial cohort is healthy.

## Later iOS Publication

For iOS, create an Apple Developer account, configure a unique bundle identifier, configure signing and capabilities, build an iOS archive through the project’s supported publishing workflow, upload it to App Store Connect, test with TestFlight, complete App Privacy details, provide screenshots and metadata, and submit for App Review. iOS requires separate signing, certificates, provisioning, privacy answers, and review procedures; an Android AAB cannot be submitted to the Apple App Store.

## References

[1]: https://support.google.com/googleplay/android-developer/answer/6112435?hl=en "Get started with Play Console — Google Play Help"

[2]: https://developer.android.com/guide/app-bundle "About Android App Bundles — Android Developers"

[3]: https://support.google.com/googleplay/android-developer/answer/9842756?hl=en "Use Play App Signing — Google Play Help"

[4]: https://support.google.com/googleplay/android-developer/answer/14151465?hl=en "App testing requirements for new personal developer accounts — Google Play Help"

[5]: https://support.google.com/googleplay/android-developer/answer/10787469?hl=en "Provide information for Google Play’s Data safety section — Google Play Help"

[6]: https://developer.android.com/google/play/requirements/target-sdk "Meet Google Play’s target API level requirement — Android Developers"
