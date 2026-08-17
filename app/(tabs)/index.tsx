import * as Haptics from "expo-haptics";
import { useState } from "react";
import { ActivityIndicator, Alert, Image, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { useAppState, type AspectRatio, type Creation, type GenerationMode } from "@/lib/app-state";

const MODES: GenerationMode[] = ["Text to Image", "Image to Image", "Edit", "Reference"];
const RATIOS: AspectRatio[] = ["1:1", "16:9", "9:16", "4:5", "3:4"];
const GENERATED_IMAGES = [
  "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=1200&q=90",
  "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1200&q=90",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=90",
];

export default function HomeScreen() {
  const colors = useColors();
  const { addCreation } = useAppState();
  const [mode, setMode] = useState<GenerationMode>("Text to Image");
  const [prompt, setPrompt] = useState("");
  const [reference, setReference] = useState<string | null>(null);
  const [ratio, setRatio] = useState<AspectRatio>("1:1");
  const [showSettings, setShowSettings] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [isGenerating, setGenerating] = useState(false);
  const [result, setResult] = useState<Creation | null>(null);

  const chooseGallery = async () => {
    setShowPicker(false);
    const ImagePicker = await import("expo-image-picker");
    const response = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, quality: 0.9 });
    if (!response.canceled) setReference(response.assets[0].uri);
  };

  const chooseCamera = async () => {
    setShowPicker(false);
    const ImagePicker = await import("expo-image-picker");
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.status !== "granted") {
      Alert.alert("Camera access needed", "Allow camera access in Settings to take a reference photo.");
      return;
    }
    const response = await ImagePicker.launchCameraAsync({ allowsEditing: true, quality: 0.9 });
    if (!response.canceled) setReference(response.assets[0].uri);
  };

  const generate = async () => {
    if (!prompt.trim() && !reference) {
      Alert.alert("Add a creative direction", "Describe what you want to see or add a reference image first.");
      return;
    }
    setGenerating(true);
    if (Platform.OS !== "web") await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const creation: Creation = {
      id: `creation-${Date.now()}`,
      uri: GENERATED_IMAGES[Math.floor(Math.random() * GENERATED_IMAGES.length)],
      prompt: prompt.trim() || "A new visual direction from the uploaded reference",
      mode,
      ratio,
      createdAt: "Just now",
      provider: "Studio engine",
      saved: false,
    };
    addCreation(creation);
    setResult(creation);
    setGenerating(false);
    if (Platform.OS !== "web") await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <ScreenContainer containerClassName="bg-background" className="px-5">
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <View style={styles.brandRow}><View style={[styles.logo, { backgroundColor: colors.primary }]}><IconSymbol name="sparkles" size={18} color="#FFFFFF" /></View><View><Text style={[styles.kicker, { color: colors.muted }]}>AI IMAGE STUDIO</Text><Text style={[styles.title, { color: colors.foreground }]}>Create something new</Text></View></View>
          <View style={[styles.usagePill, { backgroundColor: colors.surface, borderColor: colors.border }]}><View style={[styles.usageDot, { backgroundColor: colors.success }]} /><Text style={[styles.usageText, { color: colors.muted }]}>Ready</Text></View>
        </View>

        <View style={[styles.heroCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <View style={styles.heroGlow} />
          <Text style={[styles.heroLabel, { color: colors.primary }]}>CREATIVE WORKSPACE</Text>
          <Text style={[styles.heroTitle, { color: colors.foreground }]}>Turn a thought into a visual.</Text>
          <Text style={[styles.heroCopy, { color: colors.muted }]}>Write a prompt, add a reference, and let your direction lead the way.</Text>
        </View>

        <Text style={[styles.sectionLabel, { color: colors.foreground }]}>Generation mode</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.modeRow}>
          {MODES.map((item) => <TouchableOpacity key={item} onPress={() => setMode(item)} style={[styles.modePill, { backgroundColor: mode === item ? colors.primary : colors.surface, borderColor: mode === item ? colors.primary : colors.border }]}><Text style={{ color: mode === item ? "#FFFFFF" : colors.muted, fontWeight: "700", fontSize: 12 }}>{item}</Text></TouchableOpacity>)}
        </ScrollView>

        <View style={[styles.composer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <TextInput value={prompt} onChangeText={setPrompt} multiline placeholder={mode === "Text to Image" ? "Describe the image you want to create..." : "Describe how you want to transform this image..."} placeholderTextColor={colors.muted} style={[styles.input, { color: colors.foreground }]} textAlignVertical="top" />
          <View style={styles.composerFooter}><Text style={{ color: colors.muted, fontSize: 12 }}>{prompt.length}/600</Text><View style={styles.composerActions}><TouchableOpacity onPress={() => setShowPicker(true)} style={[styles.iconButton, { backgroundColor: colors.background }]}><IconSymbol name="plus" size={19} color={colors.primary} /></TouchableOpacity><TouchableOpacity onPress={() => setShowSettings((value) => !value)} style={[styles.iconButton, { backgroundColor: showSettings ? colors.primary : colors.background }]}><IconSymbol name="slider.horizontal.3" size={18} color={showSettings ? "#FFFFFF" : colors.muted} /></TouchableOpacity></View></View>
        </View>

        {reference && <View style={[styles.referenceCard, { backgroundColor: colors.surface, borderColor: colors.border }]}><Image source={{ uri: reference }} style={styles.referenceImage} /><View style={{ flex: 1 }}><Text style={[styles.referenceTitle, { color: colors.foreground }]}>Reference attached</Text><Text style={{ color: colors.muted, fontSize: 12 }}>Ready to guide your generation</Text></View><TouchableOpacity onPress={() => setReference(null)}><IconSymbol name="xmark" size={20} color={colors.muted} /></TouchableOpacity></View>}

        <TouchableOpacity onPress={() => setShowPicker(true)} style={[styles.uploadButton, { borderColor: colors.border }]}><IconSymbol name="photo.on.rectangle.angled" size={19} color={colors.primary} /><Text style={[styles.uploadText, { color: colors.foreground }]}>{reference ? "Replace image" : "Add a reference image"}</Text><Text style={{ color: colors.muted, marginLeft: "auto", fontSize: 12 }}>Gallery or camera</Text></TouchableOpacity>

        {showSettings && <View style={[styles.settingsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}><View style={styles.settingsHeader}><View><Text style={[styles.settingsTitle, { color: colors.foreground }]}>Generation settings</Text><Text style={{ color: colors.muted, fontSize: 12 }}>Tune the output for your idea</Text></View><TouchableOpacity onPress={() => setShowSettings(false)}><IconSymbol name="chevron.down" size={20} color={colors.muted} /></TouchableOpacity></View><Text style={[styles.settingLabel, { color: colors.muted }]}>ASPECT RATIO</Text><View style={styles.ratioRow}>{RATIOS.map((item) => <TouchableOpacity key={item} onPress={() => setRatio(item)} style={[styles.ratioButton, { borderColor: ratio === item ? colors.primary : colors.border, backgroundColor: ratio === item ? colors.primary : colors.background }]}><Text style={{ color: ratio === item ? "#FFFFFF" : colors.muted, fontWeight: "700", fontSize: 12 }}>{item}</Text></TouchableOpacity>)}</View><View style={styles.settingLine}><Text style={{ color: colors.foreground, fontWeight: "600" }}>Quality</Text><Text style={{ color: colors.primary, fontWeight: "700" }}>High</Text></View><View style={styles.settingLine}><Text style={{ color: colors.foreground, fontWeight: "600" }}>AI model</Text><Text style={{ color: colors.muted }}>Auto select</Text></View></View>}

        <TouchableOpacity disabled={isGenerating} onPress={generate} style={[styles.generateButton, { backgroundColor: colors.primary }, isGenerating && { opacity: 0.8 }]}>{isGenerating ? <><ActivityIndicator color="#FFFFFF" /><Text style={styles.generateText}>Creating your image...</Text></> : <><IconSymbol name="wand.and.stars" size={20} color="#FFFFFF" /><Text style={styles.generateText}>Generate image</Text><Text style={styles.generateArrow}>→</Text></>}</TouchableOpacity>
        <Text style={[styles.disclaimer, { color: colors.muted }]}>Generation availability and limits may vary by plan and provider.</Text>

        {result && <View style={[styles.resultCard, { backgroundColor: colors.surface, borderColor: colors.border }]}><Image source={{ uri: result.uri }} style={styles.resultImage} /><View style={styles.resultOverlay}><Text style={styles.resultBadge}>NEW CREATION</Text><Text style={styles.resultTitle}>{result.prompt}</Text><TouchableOpacity onPress={() => setResult(null)} style={styles.resultClose}><IconSymbol name="xmark" size={18} color="#FFFFFF" /></TouchableOpacity></View></View>}
      </ScrollView>

      <Modal visible={showPicker} transparent animationType="slide" onRequestClose={() => setShowPicker(false)}><View style={styles.modalBackdrop}><View style={[styles.sheet, { backgroundColor: colors.surface }]}><View style={styles.sheetHandle} /><Text style={[styles.sheetTitle, { color: colors.foreground }]}>Add an image</Text><Text style={{ color: colors.muted, marginBottom: 18 }}>Use a gallery image or capture a new reference.</Text><TouchableOpacity onPress={chooseGallery} style={[styles.sheetOption, { borderColor: colors.border }]}><IconSymbol name="photo.on.rectangle.angled" size={22} color={colors.primary} /><Text style={[styles.sheetOptionText, { color: colors.foreground }]}>Choose from gallery</Text><IconSymbol name="chevron.right" size={19} color={colors.muted} /></TouchableOpacity><TouchableOpacity onPress={chooseCamera} style={[styles.sheetOption, { borderColor: colors.border }]}><IconSymbol name="sparkles" size={22} color={colors.primary} /><Text style={[styles.sheetOptionText, { color: colors.foreground }]}>Take a photo</Text><IconSymbol name="chevron.right" size={19} color={colors.muted} /></TouchableOpacity><TouchableOpacity onPress={() => setShowPicker(false)} style={styles.cancelButton}><Text style={{ color: colors.muted, fontWeight: "700" }}>Cancel</Text></TouchableOpacity></View></View></Modal>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 10, paddingBottom: 22 }, brandRow: { flexDirection: "row", alignItems: "center", gap: 11 }, logo: { width: 36, height: 36, borderRadius: 12, alignItems: "center", justifyContent: "center" }, kicker: { fontSize: 10, letterSpacing: 1.5, fontWeight: "800" }, title: { fontSize: 18, fontWeight: "800", marginTop: 2 }, usagePill: { flexDirection: "row", alignItems: "center", gap: 6, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 20 }, usageDot: { width: 7, height: 7, borderRadius: 4 }, usageText: { fontSize: 12, fontWeight: "700" }, heroCard: { minHeight: 156, borderRadius: 24, borderWidth: 1, padding: 22, overflow: "hidden", marginBottom: 24 }, heroGlow: { position: "absolute", width: 150, height: 150, borderRadius: 100, backgroundColor: "#8B5CF6", opacity: 0.16, right: -30, top: -44 }, heroLabel: { fontSize: 10, fontWeight: "800", letterSpacing: 1.4 }, heroTitle: { fontSize: 25, lineHeight: 31, fontWeight: "800", maxWidth: 260, marginTop: 11 }, heroCopy: { fontSize: 13, lineHeight: 19, maxWidth: 290, marginTop: 8 }, sectionLabel: { fontSize: 14, fontWeight: "800", marginBottom: 10 }, modeRow: { gap: 8, paddingBottom: 16 }, modePill: { borderWidth: 1, paddingHorizontal: 14, paddingVertical: 10, borderRadius: 18 }, composer: { borderWidth: 1, borderRadius: 20, minHeight: 168, padding: 15 }, input: { minHeight: 110, fontSize: 16, lineHeight: 23 }, composerFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }, composerActions: { flexDirection: "row", gap: 8 }, iconButton: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" }, uploadButton: { borderWidth: 1, borderStyle: "dashed", borderRadius: 15, paddingHorizontal: 14, paddingVertical: 14, flexDirection: "row", alignItems: "center", gap: 10, marginTop: 12 }, uploadText: { fontWeight: "700", fontSize: 13 }, referenceCard: { flexDirection: "row", alignItems: "center", gap: 12, borderWidth: 1, borderRadius: 15, padding: 8, marginTop: 12 }, referenceImage: { width: 48, height: 48, borderRadius: 10 }, referenceTitle: { fontWeight: "800", fontSize: 13, marginBottom: 2 }, settingsCard: { borderWidth: 1, borderRadius: 18, marginTop: 12, padding: 16 }, settingsHeader: { flexDirection: "row", justifyContent: "space-between" }, settingsTitle: { fontSize: 15, fontWeight: "800", marginBottom: 3 }, settingLabel: { fontSize: 10, fontWeight: "800", letterSpacing: 1.2, marginTop: 18, marginBottom: 10 }, ratioRow: { flexDirection: "row", gap: 7, flexWrap: "wrap" }, ratioButton: { borderWidth: 1, paddingHorizontal: 11, paddingVertical: 9, borderRadius: 10 }, settingLine: { flexDirection: "row", justifyContent: "space-between", paddingTop: 15, marginTop: 15, borderTopWidth: 1, borderTopColor: "rgba(128,128,128,0.15)" }, generateButton: { borderRadius: 17, minHeight: 56, marginTop: 18, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 10 }, generateText: { color: "#FFFFFF", fontWeight: "800", fontSize: 15 }, generateArrow: { color: "#FFFFFF", fontSize: 21, marginLeft: 8 }, disclaimer: { textAlign: "center", fontSize: 11, marginTop: 10 }, resultCard: { borderWidth: 1, borderRadius: 22, overflow: "hidden", marginTop: 24, height: 280 }, resultImage: { width: "100%", height: "100%" }, resultOverlay: { position: "absolute", left: 0, right: 0, bottom: 0, padding: 18, backgroundColor: "rgba(0,0,0,0.55)" }, resultBadge: { color: "#A78BFA", fontSize: 10, fontWeight: "800", letterSpacing: 1.2 }, resultTitle: { color: "#FFFFFF", fontSize: 15, fontWeight: "700", marginTop: 5 }, resultClose: { position: "absolute", right: 14, top: 14, width: 30, height: 30, borderRadius: 15, backgroundColor: "rgba(0,0,0,0.4)", alignItems: "center", justifyContent: "center" }, modalBackdrop: { flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.55)" }, sheet: { borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: 22, paddingBottom: 32 }, sheetHandle: { alignSelf: "center", width: 42, height: 4, borderRadius: 2, backgroundColor: "#687076", marginBottom: 19 }, sheetTitle: { fontSize: 22, fontWeight: "800" }, sheetOption: { flexDirection: "row", alignItems: "center", gap: 13, borderWidth: 1, borderRadius: 16, padding: 16, marginBottom: 10 }, sheetOptionText: { flex: 1, fontSize: 15, fontWeight: "700" }, cancelButton: { alignItems: "center", padding: 15, marginTop: 2 },
});
