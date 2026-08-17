import { ScrollView, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";

const sections = [
  {
    title: "Overview",
    body: "AI Image Studio is a creative image workspace. This policy describes how the current version of the application handles information when you use its prompt, reference-image, creation-history, saved-image, profile, download, and share features.",
  },
  {
    title: "Information stored on your device",
    body: "The current version stores app preferences, profile details entered in the app, prompt history, creation records, saved-image state, and generation settings locally on your device so the app can remember your workspace. You can remove local app data by clearing the app data or uninstalling the app through your device settings.",
  },
  {
    title: "Reference images and generated images",
    body: "The app accesses a photo or camera source only when you choose an image-upload action and grant the relevant device permission. In the current local-first release, selected reference images and generated-image records are handled locally by the app. The app does not require you to upload a reference image to use the text-only workflow.",
  },
  {
    title: "Information we do not currently require",
    body: "The current release does not require an account, does not require your name or email to use the core local workflow, and does not intentionally sell personal information. The current release is not intended to collect precise location, contacts, messages, or advertising identifiers.",
  },
  {
    title: "Permissions",
    body: "Photo-library or camera access is requested only when you choose a related feature. You can deny a permission and continue using available text-based features. Downloading an image may require the device gallery permission supported by your Android version.",
  },
  {
    title: "Sharing and external services",
    body: "When you choose Download or Share, Android may provide access to the selected device or third-party application according to its own privacy policy. AI Image Studio does not control how another application handles content after you share it.",
  },
  {
    title: "Security",
    body: "We use the storage and permission controls provided by the operating system and app platform. No method of electronic storage or transmission is completely secure. Do not place passwords, payment information, or other highly sensitive information in an image prompt.",
  },
  {
    title: "Children’s privacy",
    body: "The current release is not directed to children under 13. We do not knowingly collect personal information from children through the current local-first workflow. If you believe a child has provided personal information to a future connected version, contact us so the information can be reviewed and removed where appropriate.",
  },
  {
    title: "Future connected features",
    body: "If a future release adds sign-in, cloud synchronization, remote AI-provider processing, analytics, subscriptions, or cloud image storage, this policy will be updated before those features are enabled. The Amazon Appstore listing and data-safety disclosures should always match the behavior of the exact release being distributed.",
  },
  {
    title: "Changes to this policy",
    body: "We may update this policy when the app’s behavior, services, or legal requirements change. The effective date below identifies the latest version. Please review this page before using a materially updated release.",
  },
  {
    title: "Contact",
    body: "For privacy questions or requests about the current app, contact roopanaaz2@gmail.com.",
  },
];

export default function PrivacyPolicyScreen() {
  return (
    <ScreenContainer containerClassName="bg-background" edges={["top", "bottom", "left", "right"]}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 48 }}>
        <View style={{ maxWidth: 760, width: "100%", alignSelf: "center" }}>
          <Text className="text-3xl font-bold text-foreground">Privacy Policy</Text>
          <Text className="mt-2 text-sm text-muted">AI Image Studio · Effective August 17, 2026</Text>
          <Text className="mt-6 text-base leading-6 text-foreground">
            This is the privacy policy for the current AI Image Studio release. It is written for the local-first version submitted to the Amazon Appstore.
          </Text>
          {sections.map((section) => (
            <View key={section.title} className="mt-7">
              <Text className="text-lg font-semibold text-foreground">{section.title}</Text>
              <Text className="mt-2 text-base leading-6 text-muted">{section.body}</Text>
            </View>
          ))}
          <Text className="mt-8 text-xs leading-5 text-muted">
            This page is a working privacy-policy draft for the current release. If the production build processes data through remote AI providers, cloud storage, analytics, or account services, update this policy and the store data-safety declarations before publishing that build.
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
