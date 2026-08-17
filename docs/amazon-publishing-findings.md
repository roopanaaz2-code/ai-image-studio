# Amazon Appstore publishing findings

Verified from official Amazon Appstore documentation on 17 August 2026:

- Required workflow: Step 1 Upload Your App File → Step 2 Target Your App → Step 3 Add Appstore Details → Step 4 Review and Submit.
- A Fire OS app can be submitted as an APK or AAB. The console can inspect package name, version code, version name, minimum SDK, permissions, supported screens, and native platforms.
- The package name must be unique to the app and the versionCode must be unique and greater than previous uploaded Fire OS versions for updates.
- Amazon recommends physical-device testing. Live App Testing supports APK/AAB testing and requires app file, supported devices, app title, category, icon, language, content rating, and export compliance.
- The Target Your App step includes supported devices, availability, target audience, content rating, and user-data privacy.
- Submission cannot proceed until Upload Your App File, Target Your App, and Appstore Details show green checks.
- If using Login with Amazon or Amazon Device Messaging, a security profile association may be required. AI Image Studio currently does not need this unless those services are added.
- Official sources: https://developer.amazon.com/docs/app-submission/submitting-apps-to-amazon-appstore.html ; https://developer.amazon.com/docs/app-submission/upload-app-file.html ; https://developer.amazon.com/docs/app-submission/target-app.html ; https://developer.amazon.com/docs/app-testing/live-app-testing-getting-started.html
