import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type GenerationMode = "Text to Image" | "Image to Image" | "Edit" | "Reference";
export type AspectRatio = "1:1" | "16:9" | "9:16" | "4:5" | "3:4";

export type Creation = {
  id: string;
  uri: string;
  prompt: string;
  mode: GenerationMode;
  ratio: AspectRatio;
  createdAt: string;
  provider: string;
  saved: boolean;
};

export type Profile = {
  name: string;
  username: string;
  email: string;
  bio: string;
  theme: "dark" | "light" | "system";
};

const STORAGE_KEY = "ai-image-studio-state-v1";
const seedCreations: Creation[] = [
  { id: "seed-1", uri: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&q=85", prompt: "A quiet alpine cabin under a galaxy of stars", mode: "Text to Image", ratio: "16:9", createdAt: "Just now", provider: "Studio engine", saved: true },
  { id: "seed-2", uri: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=900&q=85", prompt: "Editorial portrait with a warm copper light", mode: "Text to Image", ratio: "4:5", createdAt: "Yesterday", provider: "Studio engine", saved: false },
  { id: "seed-3", uri: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=900&q=85", prompt: "Dreamlike ocean cliffs in mist", mode: "Reference", ratio: "3:4", createdAt: "2 days ago", provider: "Studio engine", saved: true },
  { id: "seed-4", uri: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=900&q=85", prompt: "A modern desert home at golden hour", mode: "Text to Image", ratio: "1:1", createdAt: "3 days ago", provider: "Studio engine", saved: false },
];

const defaultProfile: Profile = { name: "Alex Morgan", username: "alexmorgan", email: "alex@example.com", bio: "Visual thinker exploring new worlds.", theme: "dark" };

type AppState = {
  creations: Creation[];
  profile: Profile;
  isHydrated: boolean;
  addCreation: (creation: Creation) => void;
  toggleSaved: (id: string) => void;
  deleteCreation: (id: string) => void;
  updateProfile: (profile: Profile) => void;
};

const AppStateContext = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [creations, setCreations] = useState<Creation[]>(seedCreations);
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [isHydrated, setHydrated] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          setCreations(parsed.creations ?? seedCreations);
          setProfile(parsed.profile ?? defaultProfile);
        } catch {
          // Keep the safe local defaults if persisted data is malformed.
        }
      }
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (isHydrated) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ creations, profile }));
  }, [creations, profile, isHydrated]);

  const value = useMemo<AppState>(() => ({
    creations,
    profile,
    isHydrated,
    addCreation: (creation) => setCreations((current) => [creation, ...current]),
    toggleSaved: (id) => setCreations((current) => current.map((item) => item.id === id ? { ...item, saved: !item.saved } : item)),
    deleteCreation: (id) => setCreations((current) => current.filter((item) => item.id !== id)),
    updateProfile: (nextProfile) => setProfile(nextProfile),
  }), [creations, profile, isHydrated]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) throw new Error("useAppState must be used within AppStateProvider");
  return context;
}
