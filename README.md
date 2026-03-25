# MerengueBot ⚪🏆

**MerengueBot** es un asistente inteligente de WhatsApp dedicado exclusivamente al **Real Madrid C.F.** Está potenciado por la infraestructura de **Groq** utilizando el modelo **Llama 3.3 70B**, lo que garantiza respuestas ultrarrápidas con toda la mística y la historia del club.

## 🚀 Inicio Rápido

Sigue estos pasos para poner a rodar el bot en tu entorno local:

1. **Instala las dependencias:**
   ```bash
   npm install
   ```

2. **Configura el entorno:**
   Crea un archivo `.env` en la raíz del proyecto. Puedes usar el archivo `.env.example` como referencia para añadir tus API Keys y configuraciones.

3. **Ejecuta el bot:**
   ```bash
   npm run dev
   ```
   *Una vez ejecutado, escanea el código **QR** que aparecerá en tu terminal desde la aplicación de WhatsApp.*

## 🛠️ Comandos Útiles

| Comando | Descripción |
| :--- | :--- |
| `npm run test:local` | Prueba la lógica de la IA directamente en la terminal (sin conexión a WhatsApp). |
| `npm run build` | Compila el código a JavaScript optimizado en la carpeta `/dist`. |
| `npm start` | Ejecuta la versión de producción ya compilada. |

## 🛡️ Características Principales

* **Sistema Antiban:** Implementa *Rate Limiting* y simulación de escritura humana para proteger la cuenta.
* **Mística Pura:** Prompt optimizado con la narrativa oficial del club, desde su fundación en **1902** hasta la actualidad.
* **Cloud Ready:** Incluye un sistema de *Health Check* integrado, ideal para despliegues 24/7.

> *"Historia que tú hiciste, historia por hacer..."* 💜