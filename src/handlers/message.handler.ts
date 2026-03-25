import { Message } from 'whatsapp-web.js';
import { getIAResponse } from '../services/ia.service';
import { limiter, randomDelay } from '../services/limiter.service';

export const handleMessage = async (msg: Message) => {
    // 1. Filtro de seguridad: Evitar grupos y mensajes vacíos
    if (msg.from.includes('@g.us')) return;
    
    const text = msg.body.trim();
    if (!text) return;

    await limiter.schedule(async () => {
        const chat = await msg.getChat();
        
        try {
            await chat.sendSeen(); // Marca como leído
            await randomDelay();   // Espera aleatoria (2-5s)
            await chat.sendStateTyping(); // Muestra "Escribiendo..."

            const aiResponse = await getIAResponse(text);

            const emojis = [" ⚪", " 🏆", " ✨", " 👑", " 🛡️"];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

            await msg.reply(`${aiResponse}${randomEmoji}`);

        } catch (error) {
            console.error("Error en el flujo del mensaje:", error);
            await msg.reply("El VAR está revisando una incidencia técnica. ¡Hala Madrid! ⚪");
        } finally {
            await chat.clearState();
        }
    });
};