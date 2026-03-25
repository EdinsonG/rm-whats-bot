import { client } from './client';
import { startHealthCheck } from './server';

const startBot = async () => {
    try {
        console.log('--- Iniciando MerengueBot (Cloud Edition) ---');
        
        // 1. Iniciar servidor HTTP para evitar que Render se duerma
        startHealthCheck();
        
        // 2. Iniciar conexión de WhatsApp
        await client.initialize();
        
    } catch (error) {
        console.error('Error crítico al inicializar:', error);
        process.exit(1);
    }
};

startBot();