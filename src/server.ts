import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

export const startHealthCheck = () => {
    app.get('/health', (req, res) => {
        res.status(200).json({ 
            status: 'ok', 
            uptime: process.uptime(),
            message: 'MerengueBot está en el campo' 
        });
    });

    app.listen(PORT, () => {
        console.log(`Servidor de monitoreo corriendo en el puerto ${PORT}`);
    });
};