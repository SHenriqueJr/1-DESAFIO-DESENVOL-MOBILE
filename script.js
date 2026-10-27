// 1. BANCO DE DADOS DOS PRODUTOS (Personalizável para o futuro)
// Para adicionar um novo item, basta adicionar um novo objeto {} aqui dentro!
const PRODUTOS_CADASTRADOS = [
    {
        id: 1,
        nome: "Stack Burger",
        preco: 32.00,
        descricao: "Blend bovino de 150g, tomate, alface e muito queijo cheddar derretido com o molho especial da casa.",
        imagem: "assets/burguer.png",
        badge: "Mais Vendido"
    },
    {
        id: 2,
        nome: "Batata|Git Smash médio",
        preco: 28.00,
        descricao: "Porção de batatas fritas super crocantes com tempero especial.",
        imagem: "assets/batata.jpeg",
        badge: ""
    },
    {
        id: 3,
        nome: "Dev Bacon",
        preco: 35.00,
        descricao: "Fatias generosas de bacon premium e molho barbecue.",
        imagem: "assets/bacon.jpeg",
        badge: "Novo"
    },
    {
        id: 4,
        nome: "Refri Co-Pilot",
        preco: 6.00,
        descricao: "Lata de refrigerante trincando de gelada para acompanhar seu combo.",
        imagem: "assets/refri-coca.jpeg",
        badge: ""
    }
];

// Estado da memória (Carrinho Vazio)
let carrinho = [];

// 2. FUNÇÃO QUE INJETA OS PRODUTOS NA TELA (Manipulação do DOM)
function renderizarCardapio() {
    const gridProdutos = document.getElementById('products-grid');
    /* Se o elemento não existir na página atual (como na tela de confirmação), para a execução aqui*/
    if (!gridProdutos) return; 

    gridProdutos.innerHTML = ''; // Limpa o grid

    PRODUTOS_CADASTRADOS.forEach(produto => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        
        // Se o produto tiver badge (Ex: Mais Vendido), adiciona a tag na tela
        const badgeHTML = produto.badge ? `<div class="product-badge">${produto.badge}</div>` : '';

        card.innerHTML = `
            ${badgeHTML}
            <img src="${produto.imagem}" alt="${produto.nome}" class="product-img">
            <h3>${produto.nome}</h3>
            <p class="product-desc">${produto.descricao}</p>
            <div class="product-control">
                <span class="product-price">R$ ${produto.preco.toFixed(2)}</span>
                <button class="btn-add" onclick="adicionarAoCarrinho('${produto.nome}', ${produto.preco})">+ Adicionar</button>
            </div>
        `;
        gridProdutos.appendChild(card);
    });
}

// 3. LOGICA DO CARRINHO DE COMPRAS
function adicionarAoCarrinho(nomeItem, precoItem) {
    const itemExistente = carrinho.find(item => item.nome === nomeItem);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({ nome: nomeItem, preco: precoItem, quantidade: 1 });
    }
    atualizarInterfaceCarrinho();
}

function removerDoCarrinho(nomeItem) {
    const itemIndex = carrinho.findIndex(item => item.nome === nomeItem);

    if (itemIndex > -1) {
        carrinho[itemIndex].quantidade -= 1;
        if (carrinho[itemIndex].quantidade === 0) {
            carrinho.splice(itemIndex, 1);
        }
    }
    atualizarInterfaceCarrinho();
}

function atualizarInterfaceCarrinho() {
    const containerItens = document.getElementById('cart-items');
    const elementoTotal = document.getElementById('cart-total');
    
    containerItens.innerHTML = '';

    if (carrinho.length === 0) {
        containerItens.innerHTML = '<p class="empty-message">Seu carrinho está vazio...</p>';
        elementoTotal.innerText = 'R$ 0,00';
        return;
    }

    let valorTotalAcumulado = 0;

    carrinho.forEach(item => {
        const subtotalItem = item.preco * item.quantidade;
        valorTotalAcumulado += subtotalItem;

        const divItem = document.createElement('div');
        divItem.classList.add('cart-item');
        divItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.nome}</h4>
                <span>${item.quantidade}x - R$ ${item.preco.toFixed(2)}</span>
            </div>
            <button class="btn-remove" onclick="removerDoCarrinho('${item.nome}')">Remover</button>
        `;
        containerItens.appendChild(divItem);
    });

    elementoTotal.innerText = `R$ ${valorTotalAcumulado.toFixed(2)}`;
}
function finalizarPedido() {
    // Verifica se o carrinho está vazio antes de avançar
    if (carrinho.length === 0) {
        alert("O seu carrinho está vazio! Adicione itens antes de fechar o pedido.");
        return;
    }
    // Redireciona o usuário diretamente para a nova página de sucesso
    window.location.href = "confirmacao.html";
}
/*Altera o tema visual do site entre Claro e Escuro*/
function alternarTema() {
    // Liga/Desliga a classe 'dark-mode' na tag <body> mostrado na aula 7
    document.body.classList.toggle('dark-mode');
    
    // Boa prática extra: Salva a escolha do usuário na memória do navegador (LocalStorage)
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('tema-preferido', 'dark');
    } else {
        localStorage.setItem('tema-preferido', 'light');
    }
}

// Verifica se o usuário já tinha escolhido o tema escuro antes ao carregar a página SDE TIRAR DAQUI ACOMPANHA a Function alternarTema
if (localStorage.getItem('tema-preferido') === 'dark') {
    document.body.classList.add('dark-mode');
}

// Inicializa o cardápio na tela assim que o script carrega
renderizarCardapio();
