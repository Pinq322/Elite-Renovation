import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are "RenovateAI", an expert construction and interior design consultant for EliteRenovations. 
Your goal is to assist potential clients with questions about apartment renovation, "euro repair" standards, materials, estimated timelines, and general design advice.

Company Key Selling Points:
- Fixed pricing and strict deadlines.
- Premium materials only.
- 5-year warranty on all works.
- Specializing in modern, urban apartments.

Guidelines:
- Keep answers concise, professional, and helpful.
- If asked about specific prices, give a range but emphasize that a site visit is needed for an accurate quote.
- Always encourage the user to book a free estimate using the website form.
- Be polite and use a tone that is knowledgeable yet accessible.
- Do not make up fake specific projects, stick to general industry knowledge and company values.
`;

let ai: GoogleGenAI | null = null;

export const initializeGemini = () => {
  if (!ai && process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
};

export const sendMessageToGemini = async (message: string, history: { role: string; parts: { text: string }[] }[] = []): Promise<string> => {
  if (!ai) {
    initializeGemini();
    if (!ai) {
      return "I'm sorry, I'm currently offline. Please contact our team directly via the form below.";
    }
  }

  try {
    // Use the correct Chats API
    const chat = ai.chats.create({
      model: "gemini-2.5-flash-latest",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: h.parts
      }))
    });

    const result = await chat.sendMessage({ message: message });
    return result.text || "I'm sorry, I didn't catch that.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I'm having trouble processing your request right now. Please try again later or contact our support.";
  }
};