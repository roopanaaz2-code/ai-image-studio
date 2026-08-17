# AI Image Studio — Mobile Interface Design Plan

## Product Direction

AI Image Studio is an Android-first creative workspace for generating and transforming images. The experience should feel like a focused, premium iOS/Android creative tool: calm dark surfaces, strong visual hierarchy, generous touch targets, and a clear path from prompt to result.

The first implementation prioritizes a polished local mobile experience with backend-ready boundaries. It must not claim unlimited free generation; usage messaging should remain configurable and honest.

## Screen List

| Screen | Primary content and functionality |
|---|---|
| Home / Create | Prompt composer, generation mode selector, optional reference image, expandable settings, usage status, recent creations, and the primary Generate Image action. |
| Creations | Paginated personal generation history in a two-column grid, with prompt/date metadata and full-screen image viewer actions. |
| Saved | Saved/favorite generations in a two-column grid, with unsave, download, share, edit, and delete actions. |
| Profile | Account summary, avatar, display name, plan/usage status, profile editing entry, theme preference, help, privacy, terms, and logout. |
| Edit Profile | Profile photo, display name, username, email, bio, preferences, and Save Changes. |
| Image Viewer | Full-screen result preview, prompt/provider metadata, Download, Share, Save, Regenerate, Edit, Variation, and Delete. |
| Settings | Appearance, generation defaults, provider/model display preferences, notifications, and account controls. |
| Auth / Welcome | Branded welcome state with Continue with Google and a concise explanation of the creative workflow. |

## Primary Layout

The app uses portrait orientation and one-handed operation. The Home screen places the prompt composer in the upper-middle content area, where it is reachable after the user opens the app. The bottom tab bar contains **Home**, **Creations**, **Saved**, and **Profile**. Secondary actions use bottom sheets or modal cards rather than deep navigation stacks.

The Home screen starts with a compact brand header, a small usage badge, and a large rounded prompt card. The mode selector uses four segmented pills: Text to Image, Image to Image, Edit, and Reference. The upload area is a dashed rounded card with a prominent Add Image action and a removable preview thumbnail. Settings collapse behind an expandable row to keep the main task uncluttered.

## Key User Flows

1. **Generate from text:** Home → choose Text to Image → enter prompt → optionally expand Settings → tap Generate Image → view progress → open result viewer → Save, Download, Share, Regenerate, Edit, Variation, or Delete.
2. **Generate from a reference image:** Home → choose Image to Image or Reference → tap Add Image → choose Gallery or Camera → review preview → enter instruction → Generate Image.
3. **Review history:** Creations → tap a creation → full-screen viewer → perform an action or return to the grid.
4. **Save a favorite:** Result viewer → tap Save → Saved tab → tap saved item → unsave or share/download/delete.
5. **Edit profile:** Profile → Edit Profile → update fields → Save Changes → return to Profile with updated summary.
6. **Authentication:** Welcome → Continue with Google → authenticated Home; Profile → Logout → Welcome. The backend boundary must preserve user-scoped history and authorization checks.

## Color Choices

The brand uses a near-black ink background (#0B0D12), elevated charcoal surfaces (#151923), and a vivid violet-to-cyan creative accent. Primary violet is #8B5CF6, cyan highlight is #22D3EE, and the main text is #F7F7FB. Secondary text is #9AA3B2, borders are #272D3A, success is #34D399, warning is #FBBF24, and errors are #FB7185. Light mode inverts the surfaces to #F7F8FC and #FFFFFF while retaining the violet/cyan accent.

## Interaction and Accessibility

All primary controls use at least 44pt-equivalent touch targets. Primary actions provide subtle scale and haptic feedback, while destructive actions require confirmation. Loading states communicate progress without blocking navigation. Text inputs support keyboard-aware scrolling, clear focus states, and human-readable validation messages.

## Backend Boundary

The client submits an authenticated generation request containing mode, prompt, reference asset identifier, and generation settings. A server-side provider router selects an enabled provider and model, applies usage/rate limits, stores the output in private user-scoped storage, and returns a safe result record. Provider credentials never ship in the mobile bundle. The client UI should treat provider, plan, limits, and errors as dynamic server data.
