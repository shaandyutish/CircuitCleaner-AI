
import { GoogleGenAI } from "@google/genai";
import { EnhancementMode } from "../types";

export const enhancePCBLayout = async (
  base64Image: string,
  mode: EnhancementMode
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || '' });
  
  // Strip the prefix if it exists (e.g., "data:image/png;base64,")
  const cleanBase64 = base64Image.split(',')[1] || base64Image;

  const prompts = {
    [EnhancementMode.CLEAN_TRACES]: "Enhance this PCB layout. Focus on making the traces sharp, uniform in width, and perfectly smooth. Remove any grain or photographic noise. The output should look like a clean digital export from an EDA tool.",
    [EnhancementMode.VECTORIZE]: "Convert this PCB layout image into a high-contrast black and white schematic. Ensure all copper pads are crisp and traces are continuous. Remove all background textures.",
    [EnhancementMode.NOISE_REDUCTION]: "Deeply clean this image of a physical PCB. Remove shadows, glare, and dust. Sharpen the edges of the components and copper layers while maintaining the original color palette.",
    [EnhancementMode.COLOR_CORRECTION]: "Standardize the colors of this PCB layout. Use a professional 'Green Solder Mask' aesthetic with gold-plated pads and white silkscreen. Clean up the geometry.",
    [EnhancementMode.NEGATIVE]: "Invert the colors of this PCB layout image. Produce a clean negative mask where copper traces are represented in the opposite tonal value. Ensure the resulting image is sharp and structurally accurate to the original circuit design."
  };

  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: {
      parts: [
        {
          inlineData: {
            data: cleanBase64,
            mimeType: 'image/png',
          },
        },
        {
          text: prompts[mode],
        },
      ],
    },
  });

  let enhancedImageUrl = '';
  if (response.candidates && response.candidates[0].content.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        enhancedImageUrl = `data:image/png;base64,${part.inlineData.data}`;
        break;
      }
    }
  }

  if (!enhancedImageUrl) {
    throw new Error("Failed to generate an enhanced image. The model might have returned text instead.");
  }

  return enhancedImageUrl;
};
