import React, { useState } from "react";
import { Alert, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { SafeImage } from "@/components/safe-image";
import { useColors } from "@/hooks/use-colors";
import { useAppState, type Creation } from "@/lib/app-state";

export async function downloadImage(uri: string) {
  if (Platform.OS === "web") {
    Alert.alert("Download ready", "On web, long-press or right-click the image to save it.");
    return;
  }
  const MediaLibrary = await import("expo-media-library");
  const permission = await MediaLibrary.requestPermissionsAsync();
  if (permission.status !== "granted") {
    Alert.alert("Photos access needed", "Allow photo access to save creations to your gallery.");
    return;
  }
  await MediaLibrary.saveToLibraryAsync(uri);
  Alert.alert("Saved to gallery", "Your creation is now available in the device gallery.");
}

export async function shareImage(uri: string) {
  const Sharing = await import("expo-sharing");
  const available = await Sharing.isAvailableAsync();
  if (!available) {
    Alert.alert("Sharing unavailable", "Sharing is not available on this device right now.");
    return;
  }
  await Sharing.shareAsync(uri, { dialogTitle: "Share your AI creation", mimeType: "image/jpeg" });
}

export function CreationGrid({ items }: { items: Creation[] }) {
  const colors = useColors();
  const { toggleSaved, deleteCreation } = useAppState();
  const [selected, setSelected] = useState<Creation | null>(null);
  return <>
    <View style={styles.grid}>{items.map((item) => <TouchableOpacity key={item.id} onPress={() => setSelected(item)} style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}><SafeImage source={{ uri: item.uri }} style={styles.image} /><View style={styles.cardMeta}><Text numberOfLines={1} style={[styles.prompt, { color: colors.foreground }]}>{item.prompt}</Text><Text style={{ color: colors.muted, fontSize: 11 }}>{item.createdAt} · {item.ratio}</Text></View>{item.saved && <View style={styles.savedBadge}><IconSymbol name="bookmark.fill" size={13} color="#FFFFFF" /></View>}</TouchableOpacity>)}</View>
    <Modal visible={Boolean(selected)} transparent animationType="fade" onRequestClose={() => setSelected(null)}><View style={styles.viewerBackdrop}>{selected && <View style={[styles.viewer, { backgroundColor: colors.surface }]}><SafeImage source={{ uri: selected.uri }} style={styles.viewerImage} /><TouchableOpacity onPress={() => setSelected(null)} style={styles.viewerClose}><IconSymbol name="xmark" size={19} color="#FFFFFF" /></TouchableOpacity><View style={styles.viewerMeta}><Text style={{ color: colors.primary, fontWeight: "800", fontSize: 10, letterSpacing: 1.2 }}>CREATION DETAILS</Text><Text style={[styles.viewerPrompt, { color: colors.foreground }]}>{selected.prompt}</Text><Text style={{ color: colors.muted, fontSize: 12 }}>{selected.provider} · {selected.mode} · {selected.ratio}</Text><View style={styles.actions}><Action icon="arrow.down.to.line" label="Download" onPress={() => downloadImage(selected.uri)} colors={colors} /><Action icon="square.and.arrow.up" label="Share" onPress={() => shareImage(selected.uri)} colors={colors} /><Action icon="bookmark.fill" label={selected.saved ? "Unsave" : "Save"} onPress={() => toggleSaved(selected.id)} colors={colors} /><Action icon="trash" label="Delete" onPress={() => { deleteCreation(selected.id); setSelected(null); }} colors={colors} /></View></View></View>}</View></Modal>
  </>;
}

function Action({ icon, label, onPress, colors }: { icon: any; label: string; onPress: () => void; colors: any }) {
  return <TouchableOpacity onPress={onPress} style={styles.action}><View style={[styles.actionIcon, { backgroundColor: colors.background }]}><IconSymbol name={icon} size={18} color={colors.primary} /></View><Text style={{ color: colors.muted, fontSize: 10, marginTop: 5 }}>{label}</Text></TouchableOpacity>;
}

const styles = StyleSheet.create({ grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 12 }, card: { width: "48%", borderRadius: 17, borderWidth: 1, overflow: "hidden", marginBottom: 1 }, image: { width: "100%", aspectRatio: 0.86 }, cardMeta: { padding: 10 }, prompt: { fontWeight: "700", fontSize: 12, marginBottom: 5 }, savedBadge: { position: "absolute", top: 9, right: 9, width: 26, height: 26, borderRadius: 13, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(139,92,246,0.9)" }, viewerBackdrop: { flex: 1, backgroundColor: "rgba(3,4,8,0.86)", justifyContent: "center", padding: 16 }, viewer: { borderRadius: 23, overflow: "hidden" }, viewerImage: { width: "100%", aspectRatio: 0.85 }, viewerClose: { position: "absolute", top: 15, right: 15, backgroundColor: "rgba(0,0,0,0.5)", width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center" }, viewerMeta: { padding: 18 }, viewerPrompt: { fontSize: 17, fontWeight: "800", lineHeight: 23, marginTop: 8, marginBottom: 6 }, actions: { flexDirection: "row", justifyContent: "space-between", marginTop: 18 }, action: { alignItems: "center" }, actionIcon: { width: 39, height: 39, borderRadius: 20, alignItems: "center", justifyContent: "center" },
});
