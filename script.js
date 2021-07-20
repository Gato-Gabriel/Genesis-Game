let order = [];  // Ordem escolhida pelo jogo
let clickedOrder = [];  // Ordem que o jogador faz
let score = -1;  // Começa no -1 pois, se começasse no 0, o jogador teria 1 ponto mesmo sem ter acertado qualquer rodada.

// 0 = verde; 1 = vermelho; 2 = amarelo; 3 = azul;
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');
const green = document.querySelector('.green');
const red = document.querySelector('.red');

let shuffleOrder = () => {   // Cria a ordem aleatória de cores
    let colorOrder = Math.floor(Math.random() * 4);  // Sorteando uma cor...
    order[order.length] = colorOrder;  // ...e adicionando-a ao array
    clickedOrder = [];  // Zera a ordem clicada pelo jogador toda vez que uma nova cor é sorteada

    for(let i in order){
        let elementColor = createColorElement(order[i]);   // Cor de cada iteração do array
        lightColor(elementColor, Number(i) + 1 )
    }
}

let lightColor = (element, num) => {   // Acende determinada cor
    num *= 500;
    setTimeout( ()=> {
        element.classList.add('selected');
    }, num-250);  // Faz com que ela brilhe por um curto período
    setTimeout( ()=> {
        element.classList.remove('selected');
    },num+10);  // E então apague
}

let checkOrder = () => {   // Checa se a ordem clicada foi a correta (comparando os arrays)
    for(let i in clickedOrder){
        if(clickedOrder[i] != order[i]){
            gameOver();
            return;
        }
    }
    if(clickedOrder.length == order.length){
        //alert(`Pontuação: ${score}\nVocê acertou! Próximo nível vindo aí.`);
        nextLevel();
    }
}

let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

let createColorElement = (color) => {   // Função que retorna a cor
    switch(color){
        case 0:
            return green;
        case 1:
            return red;
        case 2:
            return yellow;
        case 3:
            return blue;
    }
}

let nextLevel = () => {   // Avança ao próximo nível do jogo
    score++;
    shuffleOrder();
}

let gameOver = () => {   // Função para encerrar o jogo, caso o jogador erre.
    let divCover = document.createElement('div');   // Cria a div que deixa todo o fundo opaco...
    divCover.classList.add('cover');   // Adiciona sua estilização...
    document.body.append(divCover);  // E a adiciona no body, sobre os elementos.

    let divGameOver = document.createElement('div');   // Cria o aviso de 'GameOver'
    divGameOver.classList.add('gameOverScreen');   // Adiciona sua estilização
    let main = document.querySelector('main');
    document.body.insertBefore(divGameOver, main);   // Insere o aviso no body, antes do main
    
    if(green.classList.contains('selected')) green.classList.remove('selected');
    if(red.classList.contains('selected')) red.classList.remove('selected');
    if(yellow.classList.contains('selected')) yellow.classList.remove('selected');
    if(blue.classList.contains('selected')) blue.classList.remove('selected');

    divGameOver.innerHTML = `<p>Game Over!<br> Your Score: ${score}</p><button onclick="playGame(true)">Play Again</button>`;

}

let playGame = (hasPlayed = false) => {   // Inicia um novo jogo. hasPlayed = indica se o jogador já jogou, para caso sim, retirar as divs de Game Over.
    if(!hasPlayed) alert('Bem vindo ao Genesis! Iniciando novo jogo.');
    score = -1;
    order = [];
    clickedOrder = [];
    if(hasPlayed){
        let divCover = document.querySelector('.cover');
        let divGameOver = document.querySelector('.gameOverScreen');
        divCover.remove();
        divGameOver.remove();
    }

    nextLevel();
}

green.addEventListener('click', click(0));
red.addEventListener('click', click(1));
yellow.addEventListener('click', click(2));
blue.addEventListener('click', click(3));

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame(false);  // Chamada pela primeira vez para iniciar o jogo.