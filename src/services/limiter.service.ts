import Bottleneck from "bottleneck";

// Configuración del limitador
export const limiter = new Bottleneck({
  // Solo procesa un mensaje a la vez
  maxConcurrent: 1,
  // Espera al menos 2 a 5 segundos entre respuestas
  minTime: 2000 
});

/**
 * Función para añadir un pequeño delay aleatorio extra 
 * para romper patrones robóticos.
 */
export const randomDelay = () => new Promise(res => setTimeout(res, Math.random() * 3000));