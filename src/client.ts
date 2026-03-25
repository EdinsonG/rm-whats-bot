import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import { handleMessage } from './handlers/message.handler';

export const client = new Client({
    authStrategy: new LocalAuth(), // Mantiene la sesión iniciada
    puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('Escanea el código QR de arriba para iniciar sesión.');
});

client.on('ready', () => {
    console.log('¡El bot del Real Madrid está listo para la acción!');
});

client.on('message', handleMessage);