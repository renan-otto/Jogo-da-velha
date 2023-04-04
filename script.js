const celElemensts = document.querySelectorAll('[date-cel]');
const game = document.querySelector('[date-game]');
const mensagemTelaElement = document.querySelector('[date-mensagemTela]');
const mensagem = document.querySelector('[date-mensagem]')
const vitoriaBotao = document.querySelector(
    "[date-vitoriaBotao]");

let isCircleTurn;

const combinacaoVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 0],
];

const startGame = () => {
    isCircleTurn = false;
    for (const cel of celElemensts){
        cel.classList.remove('o');
        cel.classList.remove('x');
        cel.addEventListener('click', handleClick, { once: true});
        cel.addEventListener('click', handleClick, { once: true });
    }
    
    setGamehoverClass();
    mensagem.classList.remove('mensagemFinal');
}

const endGame = (isdraw) => {
    if (isdraw){
        mensagemTelaElement.innerText = 'Empate!'
    } else {
        mensagemTelaElement.innerText = isCircleTurn ? 'Bolinha Venceu!' : 'X venceu!';
    }

    mensagem.classList.add('mensagemFinal');
};

const checarVitoria = (currentPlayer) => {
    return combinacaoVitoria.some(combination => {
        return combination.every((index) => {
            return celElemensts[index].classList.contains(currentPlayer);
        });
    });
};

const checarempate = () => {
    return [...celElemensts].every((cel) => {
        return cel.classList.contains('x') || cel.classList.contains('o')
    });
};

const placeMark = (cel, cllassToAdd) => {
    cel.classList.add(cllassToAdd);
};

const setGamehoverClass = () => {
    game.classList.remove("o");
    game.classList.remove("x");

    if (isCircleTurn) {
        game.classList.add("o");
    } else {
        game.classList.add("x");
    }
};

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;
    setGamehoverClass();
};

const handleClick = (e) =>{
    // colocar a marca (X ou O)
    const cel = e.target;
    const cllassToAdd = isCircleTurn ? "o" : "x";

    placeMark(cel, cllassToAdd);

    // verificar por vitoria
    const vitoria = checarVitoria(cllassToAdd);

    // verificar por empate
    const isdraw = checarempate();

    if (vitoria) {
        endGame(false);
    } else if (isdraw){
        endGame(true);
    } else {
        // mudar simbolo
        swapTurns();
    }   
};

startGame();

vitoriaBotao.addEventListener('click', startGame);
