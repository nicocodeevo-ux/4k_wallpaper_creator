
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export type AspectRatio = '16:9' | '9:16';

export async function generateAbstractWallpaper(prompt: string, aspectRatio: AspectRatio): Promise<string> {
  const deviceType = aspectRatio === '16:9' ? 'desktop' : 'mobile phone';
  const fullPrompt = `4K abstract ${deviceType} wallpaper, ${prompt}. High-resolution, cinematic quality, vibrant colors, intricate details, ${aspectRatio === '9:16' ? 'vertical composition' : 'wide composition'}.`;

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: fullPrompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: aspectRatio,
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return base64ImageBytes;
    } else {
      throw new Error("No image was generated. The response may have been blocked.");
    }
  } catch (error: any) {
    console.error("Error generating wallpaper:", error);
    
    let message = "Failed to generate wallpaper. Please check the prompt or try again later.";

    // Check for specific API errors
    if (error.message) {
      if (error.message.includes("429") || error.message.includes("RESOURCE_EXHAUSTED")) {
        message = "Daily generation quota exceeded. Please try again later or check your API plan.";
      } else if (error.message.includes("SAFETY") || error.message.includes("blocked")) {
        message = "The prompt triggered safety filters. Please try a different description.";
      } else {
        // Attempt to clean up JSON error messages if they appear in the string
        try {
          const jsonStart = error.message.indexOf('{');
          if (jsonStart !== -1) {
             const jsonStr = error.message.substring(jsonStart);
             const parsed = JSON.parse(jsonStr);
             if (parsed.error && parsed.error.message) {
               message = parsed.error.message;
             }
          } else {
             // Fallback to the message itself if it's short enough, otherwise generic
             if (error.message.length < 200) message = error.message;
          }
        } catch (e) {
          // If parsing fails, just use the generic message or the original if readable
          if (error.message.length < 200) message = error.message;
        }
      }
    }
    
    throw new Error(message);
  }
}
