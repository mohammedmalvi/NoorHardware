import { GoogleGenAI, Modality, Type } from "@google/genai";
import { GeminiModel } from "../types";

// Fix for "process is not defined" error in TypeScript for browser environments
declare const process: {
  env: {
    API_KEY?: string;
    [key: string]: string | undefined;
  };
};

// Helper to get client securely
const getAiClient = () => {
  // Safe access ensuring process is defined before accessing env
  const apiKey =
    typeof process !== "undefined" && process.env ? process.env.API_KEY : "";
  if (!apiKey) {
    console.warn("API_KEY is missing. AI features may not work.");
  }
  return new GoogleGenAI({ apiKey: apiKey || "" });
};

// --- Text & Chat ---

export const generateText = async (
  prompt: string,
  model: string = GeminiModel.FLASH,
  systemInstruction?: string,
  useThinking: boolean = false
) => {
  const ai = getAiClient();
  const config: any = {};
  if (systemInstruction) config.systemInstruction = systemInstruction;

  // Thinking mode config
  if (useThinking && model === GeminiModel.PRO) {
    config.thinkingConfig = { thinkingBudget: 32768 };
    // Do not set maxOutputTokens when using thinking budget
  } else if (model === GeminiModel.FLASH_LITE) {
    // Fast responses
  }

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config,
  });
  return response.text || "No response generated.";
};

export const chatWithGrounding = async (
  history: any[],
  message: string,
  useMaps: boolean = false
) => {
  const ai = getAiClient();
  const tools = useMaps ? [{ googleMaps: {} }] : [{ googleSearch: {} }];

  // Use 'any' type for config to avoid strict type errors with toolConfig
  const config: any = {
    tools,
    systemInstruction: "You are a helpful assistant for Noor Hardware.",
  };

  if (useMaps) {
    // Passing current location is best practice. Mocking for demo.
    // In real app use navigator.geolocation
    config.toolConfig = {
      retrievalConfig: {
        latLng: {
          latitude: 40.7128, // NYC default
          longitude: -74.006,
        },
      },
    };
  }

  const chat = ai.chats.create({
    model: GeminiModel.FLASH,
    config,
    history,
  });

  const response = await chat.sendMessage({ message });
  return {
    text: response.text,
    groundingMetadata: response.candidates?.[0]?.groundingMetadata,
  };
};

// --- Vision & Analysis ---

export const analyzeImage = async (base64Image: string, prompt: string) => {
  const ai = getAiClient();
  const response = await ai.models.generateContent({
    model: GeminiModel.PRO,
    contents: {
      parts: [
        { inlineData: { mimeType: "image/jpeg", data: base64Image } },
        { text: prompt },
      ],
    },
  });
  return response.text || "Could not analyze image.";
};

// --- Image Generation & Editing ---

export const generateImage = async (
  prompt: string,
  aspectRatio: string = "1:1",
  imageSize: string = "1K"
) => {
  const ai = getAiClient();
  const response = await ai.models.generateContent({
    model: GeminiModel.PRO_IMAGE,
    contents: { parts: [{ text: prompt }] },
    config: {
      imageConfig: { aspectRatio, imageSize },
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

export const editImage = async (
  base64Image: string,
  prompt: string,
  mimeType: string
) => {
  const ai = getAiClient();
  const response = await ai.models.generateContent({
    model: GeminiModel.FLASH_IMAGE,
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType } },
        { text: prompt },
      ],
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

// --- Video Generation (Veo) ---

export const generateVideo = async (
  prompt: string,
  aspectRatio: "16:9" | "9:16" = "16:9",
  imageBase64?: string
) => {
  // Ensure API Key is selected for Veo
  // Safely access window.aistudio
  const aistudio =
    typeof window !== "undefined" ? (window as any).aistudio : undefined;

  if (aistudio?.openSelectKey) {
    const hasKey = await aistudio.hasSelectedApiKey();
    if (!hasKey) {
      await aistudio.openSelectKey();
    }
  }

  // Re-instantiate to ensure key is picked up
  const ai = getAiClient();

  let operation;
  const config = {
    numberOfVideos: 1,
    resolution: "720p",
    aspectRatio,
  };

  if (imageBase64) {
    // Image-to-Video
    operation = await ai.models.generateVideos({
      model: GeminiModel.VEO_FAST,
      prompt,
      image: {
        imageBytes: imageBase64,
        mimeType: "image/png", // Assuming PNG for simplicity in this demo flow
      },
      config,
    });
  } else {
    // Text-to-Video
    operation = await ai.models.generateVideos({
      model: GeminiModel.VEO_FAST,
      prompt,
      config,
    });
  }

  // Poll for completion
  while (!operation.done) {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation });
  }

  const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (videoUri) {
    const key =
      typeof process !== "undefined" && process.env ? process.env.API_KEY : "";
    return `${videoUri}&key=${key}`;
  }
  return null;
};

// --- Audio & TTS ---

export const generateSpeech = async (text: string) => {
  const ai = getAiClient();
  const response = await ai.models.generateContent({
    model: GeminiModel.TTS,
    contents: { parts: [{ text }] },
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } },
      },
    },
  });

  const base64 =
    response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  return base64;
};

export const transcribeAudio = async (
  audioBase64: string,
  mimeType: string = "audio/wav"
) => {
  const ai = getAiClient();
  const response = await ai.models.generateContent({
    model: GeminiModel.FLASH,
    contents: {
      parts: [
        { inlineData: { data: audioBase64, mimeType } },
        { text: "Transcribe this audio exactly as spoken." },
      ],
    },
  });
  return response.text || "";
};
