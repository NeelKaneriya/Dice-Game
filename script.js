let scores, currentScore, activePlayer, playing, hasRolled;  
const winningScore = 10;

//  DOM na elements
const player1El = document.getElementById('player1');
const player2El = document.getElementById('player2');
const score1El = document.getElementById('score1');
const score2El = document.getElementById('score2');
const current1El = document.getElementById('current1');
const current2El = document.getElementById('current2');
const diceEl = document.getElementById('dice');
const btnNew = document.getElementById('newGame');
const btnRoll = document.getElementById('rollDice');
const btnHold = document.getElementById('hold');

const init = () => {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    hasRolled = false;  

    score1El.textContent = 0;
    score2El.textContent = 0;
    current1El.textContent = 0;
    current2El.textContent = 0;
    diceEl.textContent = 1;

    player1El.classList.remove('winner');
    player2El.classList.remove('winner');
    player1El.classList.add('active');
    player2El.classList.remove('active');
// winner nu Message
    const existingMessage = document.querySelector('.win-message');
    if (existingMessage) {
        existingMessage.remove();
    }
};

const switchPlayer = () => {
    document.getElementById(`current${activePlayer + 1}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    hasRolled = false;  
    player1El.classList.toggle('active');
    player2El.classList.toggle('active');
};

btnRoll.addEventListener('click', () => {
    if (playing) {
        btnRoll.disabled = true;
        diceEl.classList.add('rolling');

        setTimeout(() => {//dice no code
            const dice = Math.floor(Math.random() * 6) + 1;
            diceEl.textContent = dice;

            if (dice !== 1) {
                currentScore += dice;
                document.getElementById(`current${activePlayer + 1}`).textContent = currentScore;
                hasRolled = true;  
            } else {
                switchPlayer();
            }

            diceEl.classList.remove('rolling');
            btnRoll.disabled = false;
        }, 500);
    }
});
// complasaries aak var dice roll kare vo padse
btnHold.addEventListener('click', () => {
    if (playing) {
        if (!hasRolled) {
            alert(`You must roll the dice at least once before holding!`);
            return;
        }
// current score and player nu active scores
        scores[activePlayer] += currentScore;
        document.getElementById(`score${activePlayer + 1}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= winningScore) {
            playing = false;
            document.getElementById(`player${activePlayer + 1}`).classList.add('winner');
            const winMessage = document.createElement('div');
            winMessage.classList.add('win-message');
            winMessage.textContent = `Congratulations! Player ${activePlayer + 1} wins with ${scores[activePlayer]} points!`;
            document.querySelector('.container').appendChild(winMessage);
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);
    
init();
