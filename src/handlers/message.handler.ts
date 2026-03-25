import { Message } from 'whatsapp-web.js';
import { getIAResponse } from '../services/ia.service';
import { limiter, randomDelay } from '../services/limiter.service';

export const handleMessage = async (msg: Message) => {
    // 1. Filtro de seguridad: Evitar grupos y mensajes vacíos
    if (msg.from.includes('@g.us')) return;
    
    const text = msg.body.trim();
    if (!text) return;

    // 2. Control de flujo mediante el Limitador
    await limiter.schedule(async () => {
        const chat = await msg.getChat();
        
        try {
            // --- UX: Simulación de comportamiento humano ---
            await chat.sendSeen(); // Marca como leído
            await randomDelay();   // Espera aleatoria (2-5s)
            await chat.sendStateTyping(); // Muestra "Escribiendo..."

            // --- Core: Consulta a la IA (Groq) ---
            const aiResponse = await getIAResponse(text);

            // --- UI: Personalización estética de marca ---
            const emojis = [" ⚪", " 🏆", " ✨", " 👑", " 🛡️"];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

            // --- Respuesta Final Unificada ---
            await msg.reply(`${aiResponse}${randomEmoji}`);

        } catch (error) {
            console.error("Error en el flujo del mensaje:", error);
            // Respuesta elegante ante caídas de API
            await msg.reply("El VAR está revisando una incidencia técnica. ¡Hala Madrid! ⚪");
        } finally {
            // CRÍTICO: Detener el estado de escritura siempre
            await chat.clearState();
        }
    });
};