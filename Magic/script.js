let deck = [];
let hand = [];

function loadDeck() {
    const deckList = document.getElementById('deck-list').value;
    deck = deckList.split('\n').map(card => card.trim()).filter(card => card !== '');
    shuffleDeck();
    hand = [];
    updateHandDisplay();
    alert('Deck loaded with ' + deck.length + ' cards.');
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function drawCard() {
    if (deck.length === 0) {
        alert('No more cards in the deck.');
        return;
    }
    const drawnCard = deck.pop();
    hand.push(drawnCard);
    updateHandDisplay();
}

function updateHandDisplay() {
    const handDiv = document.getElementById('hand');
    handDiv.innerHTML = '<h3>Hand</h3>';
    handDiv.innerHTML += hand.map(card => `<p>${card}</p>`).join('');
}
