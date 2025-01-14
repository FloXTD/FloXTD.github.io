document.addEventListener("DOMContentLoaded", () => {
    const priceIncreaseElement = document.getElementById('price-increase');
    const priceDecreaseElement = document.getElementById('price-decrease');

    // Function to fetch market updates from Scryfall API
    const fetchMarketUpdates = async () => {
        try {
            const response = await fetch('https://api.scryfall.com/cards/search?q=order:usd');
            const data = await response.json();
            
            // Assuming the data has cards sorted by price change, get the first and last card
            const biggestIncrease = data.data[0]; // Example data structure
            const biggestDecrease = data.data[data.data.length - 1]; // Example data structure

            priceIncreaseElement.textContent = `${biggestIncrease.name} has increased by ${biggestIncrease.usd_change_percentage}% this week.`;
            priceDecreaseElement.textContent = `${biggestDecrease.name} has decreased by ${biggestDecrease.usd_change_percentage}% this week.`;
        } catch (error) {
            priceIncreaseElement.textContent = 'Error fetching data.';
            priceDecreaseElement.textContent = 'Error fetching data.';
        }
    };

    // Fetch market updates on page load
    fetchMarketUpdates();
});
