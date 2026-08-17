import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { CreationGrid } from "@/components/creation-grid";
import { useColors } from "@/hooks/use-colors";
import { useAppState } from "@/lib/app-state";

export default function CreationsScreen() {
  const colors = useColors();
  const { creations } = useAppState();
  return <ScreenContainer className="px-5"><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}><View style={styles.header}><View><Text style={[styles.kicker, { color: colors.primary }]}>YOUR WORKSPACE</Text><Text style={[styles.title, { color: colors.foreground }]}>My creations</Text><Text style={{ color: colors.muted, marginTop: 5 }}>Every idea, kept in one place.</Text></View><View style={[styles.count, { backgroundColor: colors.surface, borderColor: colors.border }]}><Text style={[styles.countNumber, { color: colors.foreground }]}>{creations.length}</Text><Text style={{ color: colors.muted, fontSize: 10 }}>images</Text></View></View><CreationGrid items={creations} /></ScrollView></ScreenContainer>;
}
const styles = StyleSheet.create({ header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", paddingTop: 12, paddingBottom: 22 }, kicker: { fontSize: 10, fontWeight: "800", letterSpacing: 1.4 }, title: { fontSize: 28, fontWeight: "800", marginTop: 4 }, count: { borderWidth: 1, borderRadius: 14, alignItems: "center", paddingHorizontal: 12, paddingVertical: 8 }, countNumber: { fontWeight: "800", fontSize: 17 }, });
