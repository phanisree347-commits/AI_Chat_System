import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const generateWithGemini = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                error: "Prompt is required",
            });
        }

        if (!genAI) {
            return res.status(500).json({
                success: false,
                error: "Gemini is not configured (missing GEMINI_API_KEY)",
            });
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-3-flash-preview",
        });
        const modifiedPrompt = `
                            Give a SHORT, CLEAR, and EASY-TO-READ explanation.

                            Rules:
                            - Use very simple language
                            - Keep answer concise
                            - Avoid long paragraphs
                            - Use bullet points if helpful
                            - Focus only on key ideas

                            Question:
                            ${prompt}
                            `;

        const result = await model.generateContent(modifiedPrompt);
        const response = result.response.text();

        // TODO: When this endpoint is protected and tied to a user, increment:
        // - totalMessages (user sent a message)
        // - aiInteractions (AI responded)

        res.json({
            success: true,
            data: response,
        });
    } catch (error) {
        console.error("Gemini Error:", error);

        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};