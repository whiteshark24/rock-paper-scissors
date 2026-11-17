let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};


updateScoreElement();

/*
if (!score) {
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    }
}
    */

let isIntervalPlaying = false;
let intervalId;

function autoPlay() {
    if (!isIntervalPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isIntervalPlaying = true;
    } else {
        clearInterval(intervalId);
        isIntervalPlaying = false;
    }
}

document.querySelector('.js-auto-play-button')
    .addEventListener('click', () => {
        autoPlay();
    });

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-paper-button').
addEventListener('click', () => {
    playGame('paper');
});

document.querySelector('.js-scissor-button').
addEventListener('click', () => {
    playGame('scissor');
});

document.querySelector('.js-reset-button').addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
})

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors');
    }
});

function playGame(playerMove) {

    const computerMove = pickComputerMove();

    let result = '';

    const normalizedPlayerMove = playerMove.toLowerCase();
    const normalizedComputerMove = computerMove.toLowerCase();

    if (normalizedComputerMove === 'rock') {
        result = normalizedPlayerMove === 'paper' ? 'You win.' : playerMove === 'scissors' ? 'You lose.' : 'Tie.';
    } else if (normalizedComputerMove === 'paper') {
        result = normalizedPlayerMove === 'scissors' ? 'You win.' : playerMove === 'rock' ? 'You lose.' : 'Tie.';
    } else if (normalizedComputerMove === 'scissors') {
        result = normalizedPlayerMove === 'rock' ? 'You win.' : playerMove === 'paper' ? 'You lose.' : 'Tie.';
    }

    if (result === 'You win.') {
        score.wins += 1;
    } else if (result === 'You lose.') {
        score.losses += 1;
    } else if (result === 'Tie.') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    const playerMoveImage = playerMove === 'scissor' ? 'scissors' : playerMove;

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `You
    <img class="move-icon" src="./icon/${playerMoveImage}-emoji.png">
    <img class="move-icon" src="./icon/${normalizedComputerMove}-emoji.png"> Computer`;
}

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML = `wins: ${score.wins}, losses: ${score.losses}, ties: ${score.ties}`;
}

function pickComputerMove() {

    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'Rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'Paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
        computerMove = 'Scissors';
    }
    return computerMove;

}