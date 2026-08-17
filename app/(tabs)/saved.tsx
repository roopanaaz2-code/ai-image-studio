import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { CreationGrid } from "@/components/creation-grid";
import { useColors } from "@/hooks/use-colors";
import { useAppState } from "@/lib/app-state";

export default function SavedScreen() {
  const colors = useColors();
  const { creations } = useAppState();
  const saved = creations.filter((item) => item.saved);
  return <ScreenContainer className="px-5"><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}><View style={styles.header}><View><Text style={[styles.kicker, { color: colors.primary }]}>YOUR COLLECTION</Text><Text style={[styles.title, { color: colors.foreground }]}>Saved</Text><Text style={{ color: colors.muted, marginTop: 5 }}>The ideas worth coming back to.</Text></View></View>{saved.length ? <CreationGrid items={saved} /> : <View style={[styles.empty, { backgroundColor: colors.surface, borderColor: colors.border }]}><Text style={{ fontSize: 32 }}>✦</Text><Text style={[styles.emptyTitle, { color: colors.foreground }]}>Nothing saved yet</Text><Text style={[styles.emptyCopy, { color: colors.muted }]}>Tap the bookmark on any creation to keep it close.</Text></View>}</ScrollView></ScreenContainer>;
}
const styles = StyleSheet.create({ header: { paddingTop: 12, paddingBottom: 22 }, kicker: { fontSize: 10, fontWeight: "800", letterSpacing: 1.4 }, title: { fontSize: 28, fontWeight: "800", marginTop: 4 }, empty: { alignItems: "center", borderWidth: 1, borderRadius: 20, padding: 34, marginTop: 20 }, emptyTitle: { fontSize: 18, fontWeight: "800", marginTop: 13 }, emptyCopy: { fontSize: 13, textAlign: "center", lineHeight: 19, marginTop: 7, maxWidth: 240 }, });
