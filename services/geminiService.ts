import { GoogleGenAI, Type } from "@google/genai";

export const analyzeRisk = async (scenario: string) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

  if (!apiKey) {
    console.error("DEBUG: API Key is empty. Checked import.meta.env.VITE_GEMINI_API_KEY");
    return {
      riskScore: 0,
      findings: ["API Key missing. Setup .env.local to use AI features."],
      remediation: ["Configure VITE_GEMINI_API_KEY"]
    };
  }

  console.log("DEBUG: API Key found (starts with):", apiKey.substring(0, 4) + "...");


  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          parts: [
            { text: `Analyze the following Operating Room scenario for Health and Safety QMS compliance: ${scenario}` }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskScore: { type: Type.NUMBER, description: "A score from 0-100 indicating risk level." },
            findings: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of critical safety findings."
            },
            remediation: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Actionable steps to resolve the identified issues."
            }
          },
          required: ["riskScore", "findings", "remediation"]
        }
      }
    });

    const responseAny = response as any;

    const text = typeof responseAny.text === 'function'
      ? responseAny.text()
      : response.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    return JSON.parse(text);
  } catch (e) {
    console.error("AI Analysis Failed:", e);
    return {
      riskScore: 0,
      findings: ["AI Service Connection Failed", String(e)],
      remediation: ["Check API Key", "Check Internet Connection"]
    };
  }
};
