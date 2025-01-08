let deck = [];
let hand = [];

function loadDeck() {
    const deckList = document.getElementById('deck-list').value;
    deck = parseDeckList(deckList);
    shuffleDeck();
    hand = [];
    updateHandDisplay();
    alert('Deck loaded with ' + deck.length + ' cards.');
}

function parseDeckList(deckList) {
    const cards = [];
    const lines = deckList.split('\n');
    lines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine) {
            const match = trimmedLine.match(/^(\d+)x\s*(.+)$/);
            if (match) {
                const count = parseInt(match[1]);
                const cardName = match[2];
                for (let i = 0; i < count; i++) {
                    cards.push(cardName);
                }
            } else {
                cards.push(trimmedLine);
            }
        }
    });
    return cards;
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

function uploadDeckFile(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const deckList = e.target.result;
            document.getElementById('deck-list').value = deckList;
        };
        reader.readAsText(file);
    }
}
