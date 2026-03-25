import { handleMessage } from './handlers/message.handler';

// Simulamos la estructura que espera whatsapp-web.js
const mockMessage = (body: string) => ({
    body,
    from: 'user-test-123@c.us',
    // Simulamos los métodos que el handler llama
    getChat: async () => ({
        sendSeen: async () => console.log('LOG: [Visto]'),
        sendStateTyping: async () => console.log('LOG: [Escribiendo...]'),
        clearState: async () => console.log('LOG: [Estado Limpio]'),
    }),
    reply: async (response: string) => {
        console.log('\n--- RESPUESTA DEL BOT ---');
        console.log(response);
        console.log('-------------------------\n');
    }
} as any);

async function runTest() {
    console.log("--- Iniciando Test Local (Sin WhatsApp) ---");
    
    // Test 1
    console.log("Enviando: 'Hola ¿Quién eres?'");
    await handleMessage(mockMessage("Hola ¿Quién eres?"));

    // Test 2
    console.log("Enviando: '¿Cuántas Champions tienes?'");
    await handleMessage(mockMessage("¿Cuántas Champions tienes?"));

    // Test 3
    console.log("Enviando: '¿Quien es tu jugador mas importante?'");
    await handleMessage(mockMessage("¿Quien es tu jugador mas importante?"));

    // Test 4
    console.log("Enviando: '¿Cuales son las estadisticas de goles y asistencias de Vini Jr este ano?'");
    await handleMessage(mockMessage("¿Cuales son las estadisticas de goles y asistencias de Vini Jr este ano"));
}

runTest();