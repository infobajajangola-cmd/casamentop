import { GoogleGenAI } from "@google/genai";
import { Guest } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateGuestMessage = async (guest: Guest, type: 'invite' | 'thank_you' | 'reminder'): Promise<string> => {
  try {
    if (!apiKey) {
        return "API Key is missing. Please check environment configuration.";
    }

    const prompt = `
      You are a professional wedding concierge. Write a personalized ${type} message for a guest named ${guest.name}.
      
      Context:
      - Guest Category: ${guest.category}
      - Max Companions allowed: ${guest.maxCompanions}
      - Current RSVP Status: ${guest.status}
      
      Tone: Elegant, warm, and sophisticated.
      Length: Short and concise (under 50 words), suitable for WhatsApp or Email.
      Output: Just the message text, no quotations.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate message.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating message. Please try again later.";
  }
};

export const analyzeGuestList = async (guests: Guest[]): Promise<string> => {
    try {
        if (!apiKey) return "API Key missing.";

        const summary = guests.map(g => `- ${g.name} (${g.category}): ${g.status}`).join('\n');
        
        const prompt = `
            Analyze this wedding guest list and provide 3 brief, strategic insights for the wedding planner regarding seating arrangements or catering adjustments based on the mix of categories and confirmation status.

            List:
            ${summary}
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text || "No insights available.";
    } catch (error) {
        console.error(error);
        return "Failed to analyze list.";
    }
}