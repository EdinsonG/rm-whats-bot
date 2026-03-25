import { getIAResponse } from './services/ia.service';

const testQueries = [
    "Hola ¿Como estas?",
    "Quien eres?",
    "Cuentame sobre el palmares del real madrid",
    "Quienes son nuestros 3 maximos goleadores historicos?",
    "¿Qué opinas del fichaje de Lionel Messi que dicen en los periódicos?",
    "¿Cuales es nuestor proximo partido?"
];

async function runHistoricalTest() {
    console.log("--- ⚪ INICIANDO TEST DE AUTORIDAD MADRIDISTA ⚪ ---\n");

    for (const query of testQueries) {
        console.log(`👤 Usuario: ${query}`);
        try {
            const response = await getIAResponse(query);
            console.log(`🤖 MerengueBot: ${response}`);
            console.log("--------------------------------------------------\n");
        } catch (error) {
            console.log("❌ Error en el test de campo.");
        }
    }
}

runHistoricalTest();