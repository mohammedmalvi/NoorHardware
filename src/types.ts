export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  name: string;
  email: string;
  address: string;
}

export enum GeminiModel {
  FLASH = "gemini-2.5-flash",
  FLASH_LITE = "gemini-flash-lite-latest",
  PRO = "gemini-3-pro-preview",
  FLASH_IMAGE = "gemini-2.5-flash-image",
  PRO_IMAGE = "gemini-3-pro-image-preview",
  VEO_FAST = "veo-3.1-fast-generate-preview",
  VEO_GEN = "veo-3.1-generate-preview",
  TTS = "gemini-2.5-flash-preview-tts",
  LIVE = "gemini-2.5-flash-native-audio-preview-09-2025",
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  isThinking?: boolean;
  groundingSources?: Array<{ uri: string; title: string }>;
}
