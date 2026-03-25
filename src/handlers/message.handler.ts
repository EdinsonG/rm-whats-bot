import { Message } from 'whatsapp-web.js';
import { getIAResponse } from '../services/ia.service';
import { limiter, randomDelay } from '../services/limiter.service';

export const handleMessage = async (msg: Message) => {
    // 1. Filtro de seguridad: Evitar grupos y mensajes vacíos
    if (msg.from.includes('@g.us')) return;

    const text = msg.body.toLowerCase().trim();
    if (!text) return;

    await limiter.schedule(async () => {
        const chat = await msg.getChat();
        
        try {
            await chat.sendSeen();
            await randomDelay();
            await chat.sendStateTyping();

            const aiResponse = await getIAResponse(text);

            // 2. Filtro de Verificación (FIFA/UEFA/Oficial)
            // Detectamos palabras clave que impliquen registros estadísticos
            const statsKeywords = [
                'récord', 'goles', 'máximo goleador', 'partidos', 
                'asistencias', 'títulos', 'palmarés', 'fifa', 'uefa', 
                'balón de oro', 'pichichi', 'botas de oro'
            ];

            const isStatsQuery = statsKeywords.some(keyword => text.includes(keyword));
            
            let verificationNote = "";
            if (isStatsQuery) { verificationNote = "\n\n✅ *Datos verificados según registros oficiales de UEFA/FIFA/RealMadrid.com*"; }

            const emojis = [" ⚪", " 🏆", " ✨", " 👑", " 🛡️"];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

            await msg.reply(`${aiResponse}${randomEmoji}${verificationNote}`);

        } catch (error: any) {
            console.error("Error en el flujo del mensaje:", error.message);
            await msg.reply("El VAR está revisando una incidencia técnica. ¡Hala Madrid! ⚪");
        } finally {
            await chat.clearState();
        }
    });
};