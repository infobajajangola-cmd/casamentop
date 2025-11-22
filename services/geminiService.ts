import { GoogleGenAI } from "@google/genai";
import { Guest, GuestRSVP } from "../types";

const apiKey = import.meta.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateGuestMessage = async (guest: Guest, rsvp?: GuestRSVP, type: 'invite' | 'thank_you' | 'reminder' = 'invite'): Promise<string> => {
  try {
    if (!apiKey) {
        return "API Key is missing. Please check environment configuration.";
    }

    const prompt = `
      You are a professional wedding concierge. Write a personalized ${type} message for a guest named ${guest.name}.
      
      Context:
      - Guest Category: ${guest.category || 'Guest'}
      - Max Adults allowed: ${guest.maxAdults}
      - Max Children allowed: ${guest.maxChildren}
      - Current RSVP Status: ${rsvp?.status || 'PENDING'}
      - Confirmed Adults: ${rsvp?.adults || 0}
      - Confirmed Children: ${rsvp?.children || 0}
      
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

        const summary = guests.map(g => `- ${g.name} (${g.category || 'Guest'}): Max ${g.maxAdults} adults, ${g.maxChildren} children`).join('\n');
        
        const prompt = `
            Analyze this wedding guest list and provide 3 brief, strategic insights for the wedding planner regarding seating arrangements or catering adjustments based on the mix of categories and guest capacity.

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