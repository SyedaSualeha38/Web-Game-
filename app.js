const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F6', '#33FFF6', '#F6FF33', '#5733FF'];
let gameGrid = [];
let flippedCards = [];
let matchedPairs = 0;

function setupGame() {
    const grid = document.getElementById('gameGrid');
    grid.innerHTML = '';
    gameGrid = [...colors, ...colors].sort(() => 0.5 - Math.random());

    gameGrid.forEach((color) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.color = color;
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped') && !this.classList.contains('matched')) {
        this.style.backgroundColor = this.dataset.color;
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function checkMatch() {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.color === secondCard.dataset.color) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;
    } else {
        firstCard.style.backgroundColor = '#fff';
        secondCard.style.backgroundColor = '#fff';
    }

    flippedCards = [];

    if (matchedPairs === colors.length) {
        setTimeout(() => alert('You win!'), 300);
    }
}

document.getElementById('restartButton').addEventListener('click', () => {
    matchedPairs = 0;
    flippedCards = [];
    setupGame();
});

// Initialize the game
setupGame();
