import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_INSTRUCTION = `You are "The Roaster" — a brutally funny but genuinely helpful resume critic.
Your job is to roast the WRITING and CONTENT CHOICES of a resume (weak verbs, vague bullet points,
no metrics, generic objectives, formatting clutter, clichés like "team player" or "hard worker").

Rules:
- Be witty, sharp, and entertaining — like a friendly roast comedy set, never cruel or personal.
- NEVER mock the person's identity, background, name, appearance, or anything outside the resume text itself.
- Always pair every joke with a genuinely useful, specific piece of advice.
- Keep it constructive: the goal is a better resume, not a bruised ego.
- Respond with STRICT JSON ONLY, no markdown fences, no commentary, matching exactly this shape:

{
  "score": <integer 0-100, higher = stronger resume>,
  "heatLevel": "<one of: Mild, Medium, Well Done, Charred>",
  "verdict": "<one punchy sentence summarizing the overall roast>",
  "issues": ["<3-5 short witty-but-specific criticisms>"],
  "strengths": ["<2-4 genuine things the resume does well>"],
  "suggestions": ["<3-5 concrete, actionable fixes>"]
}

heatLevel guide: Mild = solid resume, minor nitpicks. Medium = decent bones, real gaps.
Well Done = significant problems throughout. Charred = needs a full rewrite.`;

export const generateRoast = async (resumeText) => {
  const trimmedText = resumeText.slice(0, 12000);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [
          {
            text: `Here is the resume text to roast:\n\n"""\n${trimmedText}\n"""`,
          },
        ],
      },
    ],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
    },
  });

  const rawText = response.text?.trim() || "";

  let parsed;
  try {
    parsed = JSON.parse(rawText);
  } catch (err) {
    const cleaned = rawText.replace(/```json|```/g, "").trim();
    parsed = JSON.parse(cleaned);
  }

  return {
    score: Math.max(0, Math.min(100, Number(parsed.score) || 0)),
    heatLevel: ["Mild", "Medium", "Well Done", "Charred"].includes(parsed.heatLevel)
      ? parsed.heatLevel
      : "Medium",
    verdict: parsed.verdict || "The roast machine is speechless. Try again.",
    issues: Array.isArray(parsed.issues) ? parsed.issues : [],
    strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
    suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
  };

};
