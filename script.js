const numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];

let flippedcards = [];
let matchedcards = [];
let canflip = true;

function createcard(number) {
    const card = document.createElement('div'); // Creates a new div element.
    card.classList.add('card'); // Adds the class 'card' to the new div element.
    card.dataset.number = number; // Sets a custom data attribute 'number' with the provided number.
    card.textContent = '?'; // Sets the initial text content of the card to '?'.
    card.addEventListener('click', flipcard); // Adds an event listener that calls the flipcard function when the card is clicked.
    return card; // Returns the created card element.
}

function flipcard() {
    if (!canflip || flippedcards.length >= 2 || this.classList.contains('flipped') || matchedcards.includes(this)) return;
    // If the game cannot flip a card, or there are already 2 flipped cards, or this card is already flipped, or this card is already matched, return early.

    this.classList.add('flipped'); // Adds the 'flipped' class to the card to visually show it has been flipped.
    this.textContent = this.dataset.number; // Sets the text content of the card to its number.
    flippedcards.push(this); // Adds the current card to the array of flipped cards.

    if (flippedcards.length == 2) checkmatch(); // If there are 2 flipped cards, check for a match.
}

function checkmatch() {
    canflip = false;
    setTimeout(() => {
        const [card1, card2] = flippedcards;
        if (card1.dataset.number === card2.dataset.number) {
            matchedcards.push(card1, card2);
            if (matchedcards.length === numbers.length) {
                alert('Congratulations! You won!');
            }
        }
        else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '?'
            card2.textContent = '?'
        }
        flippedcards = [];
        canflip = true;
    }, 1000);
}

function initgame() {
    const board = document.querySelector('.board'); // Selects the game board element from the DOM.

    // Assuming `numbers` is an array of numbers to be used for the cards.
    numbers.sort(() => Math.random() - 0.5); // Shuffles the array of numbers.

    numbers.forEach(number => {
        const card = createcard(number); // Creates a card element for each number.
        board.appendChild(card); // Appends the card to the game board.
    });
}


initgame();