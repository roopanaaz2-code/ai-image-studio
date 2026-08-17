import type { AspectRatio, GenerationMode } from "@/lib/app-state";

export type ProviderId = "openai" | "gemini" | "provider-3";

export type GenerationSettings = {
  aspectRatio: AspectRatio;
  size: "standard" | "high";
  quality: "standard" | "high";
  count: number;
  style?: string;
  model?: string;
};

export type GenerateImageRequest = {
  mode: GenerationMode;
  prompt: string;
  referenceAssetId?: string;
  settings: GenerationSettings;
};

export type GenerationResult = {
  id: string;
  imageUrl: string;
  provider: ProviderId;
  model: string;
  createdAt: string;
};

/**
 * Server-side implementation boundary. Provider keys, routing rules, rate limits,
 * plan checks, and private storage belong behind this contract and must never be
 * bundled into the mobile client.
 */
export interface ImageProviderAdapter {
  readonly id: ProviderId;
  isAvailable(): Promise<boolean>;
  generate(request: GenerateImageRequest): Promise<GenerationResult>;
}

export type UsagePolicy = {
  dailyLimit?: number;
  monthlyLimit?: number;
  credits?: number;
  subscriptionPlan?: string;
  enabledProviders: ProviderId[];
};
