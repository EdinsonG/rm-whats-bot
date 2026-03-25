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
            // Bajamos a 0.3 para asegurar que los datos de realmadrid.com sean precisos
            // y no "alucine" con fechas o nombres de leyendas.
            temperature: 0.3, 
            max_tokens: 512, 
            // Añadimos top_p para mejorar la coherencia institucional
            top_p: 1,
        });

        // Limpiamos la respuesta de posibles espacios en blanco extras
        const response = chatCompletion.choices[0]?.message?.content?.trim();

        return response || "¡Hala Madrid! Nuestra historia es tan grande que me he quedado sin palabras.";

    } catch (error: any) {
        // Manejo de Rate Limit (Error 429) - Muy común en el tier gratuito
        if (error.status === 429) {
            return "¡Demasiada presión en el área! Espera un momento mientras recuperamos el aliento para seguir ganando. ⚪";
        }

        console.error("Error en Groq Service:", error.message);
        
        // Mensaje de error con personalidad "madridista"
        return "El VAR está revisando una jugada histórica... Intenta preguntarme de nuevo en un minuto. ¡Hala Madrid!";
    }
};