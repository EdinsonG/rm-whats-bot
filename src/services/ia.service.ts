import Groq from "groq-sdk";
import dotenv from 'dotenv';
import { SYSTEM_PROMPT } from '../config/constants';

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export const getIAResponse = async (userMessage: string): Promise<string> => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: userMessage },
            ],
            model: process.env.MODEL_NAME || "llama-3.3-70b-versatile",
            temperature: 0.6,
            max_tokens: 512, // Ahorramos tokens para mantenernos en el tier gratuito
        });

        return chatCompletion.choices[0]?.message?.content || "¡Hala Madrid! Hubo un error en el campo.";
    } catch (error: any) {
        // Manejo de Rate Limit (Error 429)
        if (error.status === 429) {
            return "¡Demasiada presión en el área! Espera un momento antes de preguntar de nuevo.";
        }
        console.error("Error en Groq Service:", error);
        return "El VAR está revisando la jugada... intenta en un minuto.";
    }
};