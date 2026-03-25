# 1. Usar una imagen de Node.js ligera pero con soporte para Puppeteer
FROM node:20-slim

# 2. Instalar dependencias necesarias para que Chrome (Puppeteer) corra en Linux
RUN apt-get update && apt-get install -y \
    gpg conf \
    chromium \
    fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# 3. Directorio de trabajo
WORKDIR /app

# 4. Copiar archivos de dependencias
COPY package*.json ./

# 5. Instalar dependencias (incluyendo las de desarrollo para compilar)
RUN npm install

# 6. Copiar el resto del código
COPY . .

# 7. Compilar TypeScript a JavaScript
RUN npm run build

# 8. Variables de entorno para Puppeteer (Optimización para Docker)
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# 9. Exponer el puerto del servidor Express
EXPOSE 3000

# 10. Comando para arrancar el bot
CMD ["npm", "start"]