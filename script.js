/**
 * Lógica do Simulador de Compras da Lanchonete DevBurguer
 * Desenvolvido para o Desafio 1 - Trilhas 3ª Edição
 */

function simularCompra() {
    // 1. Definição estrita dos preços internos (IDÊNTICOS aos preços exibidos no HTML)
    const PRECO_BURGER = 32.00;
    const PRECO_BATATA = 14.00;
    const PRECO_REFRI = 6.00;

    // 2. Coleta de dados usando prompt() e conversão explícita com Number()
    let qtdBurger = Number(prompt("Quantos 'Stack Burgers' (R$ 32,00) você deseja adiconar ao carrinho?"));
    let qtdBatata = Number(prompt("Quantas 'Batatas .zip' (R$ 14,00) você deseja?"));
    let qtdRefri = Number(prompt("Quantos 'Refris Co-Pilot' (R$ 6,00) você deseja?"));

    // Tratamento e higienização das entradas (Evita bugs se o usuário digitar letras ou valores negativos)
    if (isNaN(qtdBurger) || qtdBurger < 0) qtdBurger = 0;
    if (isNaN(qtdBatata) || qtdBatata < 0) qtdBatata = 0;
    if (isNaN(qtdRefri) || qtdRefri < 0) qtdRefri = 0;

    // 3. Verificação de carrinho vazio (Regra do Desafio)
    if (qtdBurger === 0 && qtdBatata === 0 && qtdRefri === 0) {
        alert("Nenhum produto foi selecionado. A simulação foi encerrada.");
        return;
    }

    // 4. Cálculos matemáticos de valores individuais
    let subtotalBurger = qtdBurger * PRECO_BURGER;
    let subtotalBatata = qtdBatata * PRECO_BATATA;
    let subtotalRefri = qtdRefri * PRECO_REFRI;

    // Cálculo do montante total
    let totalCompra = subtotalBurger + subtotalBatata + subtotalRefri;

    // 5. Estruturação profissional e exibição do Recibo via alert()
    let cupomFiscal = "===================================\n";
    cupomFiscal += "         🍟 DEVBURGUER RECIBO 🍟     \n";
    cupomFiscal += "===================================\n\n";

    if (qtdBurger > 0) {
        cupomFiscal += `• Stack Burger: ${qtdBurger}x | R$ ${subtotalBurger.toFixed(2)}\n`;
    }
    if (qtdBatata > 0) {
        cupomFiscal += `• Batata .zip: ${qtdBatata}x | R$ ${subtotalBatata.toFixed(2)}\n`;
    }
    if (qtdRefri > 0) {
        cupomFiscal += `• Refri Co-Pilot: ${qtdRefri}x | R$ ${subtotalRefri.toFixed(2)}\n`;
    }

    cupomFiscal += "\n-----------------------------------\n";
    cupomFiscal += `TOTAL DA COMPRA: R$ ${totalCompra.toFixed(2)}\n`;
    cupomFiscal += "===================================\n";
    cupomFiscal += "Obrigado por usar nosso simulador dev!";

    alert(cupomFiscal);
}
