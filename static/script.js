const apiKey = 'API'; // Replace with your actual Alpha Vantage API key

function populateTradingPairList(tradingPairs) {
    const pairList = document.getElementById('pairList');
    pairList.innerHTML = '';

    tradingPairs.forEach(pair => {
        const option = document.createElement('option');
        option.value = pair;
        pairList.appendChild(option);
    });
}

function fetchTradingPairs(tradingPair) {
    const apiUrl = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${tradingPair}&apikey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const tradingPairs = data.bestMatches.map(match => match['1. symbol']);
            populateTradingPairList(tradingPairs);
        })
        .catch(error => console.error('Error occurred:', error));
}

function calculateRiskReward(entryPrice) {
    const stopLoss = entryPrice - (3 * 0.01 * entryPrice); // 3% risk
    const takeProfit = entryPrice + (1 * 0.01 * entryPrice); // 1% reward
    return { stopLoss, takeProfit };
}

function getTradingData() {
    const tradingPair = document.getElementById('tradingPair').value.toUpperCase();
    const signalsContainer = document.getElementById('signalsContainer');

    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${tradingPair}&apikey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const timeSeries = data['Time Series (Daily)'];
            const dates = Object.keys(timeSeries).sort((a, b) => new Date(b) - new Date(a));

            if (dates.length >= 2) {
                const latestDate = dates[0];
                const previousDate = dates[1];
                const latestClose = parseFloat(timeSeries[latestDate]['4. close']);
                const previousClose = parseFloat(timeSeries[previousDate]['4. close']);

                const signal = getSignal(latestClose, previousClose);
                const entryPrice = latestClose;
                const { stopLoss, takeProfit } = calculateRiskReward(entryPrice);

                const signalElement = document.createElement('div');
                signalElement.classList.add(signal === 'BUY' ? 'buy-signal' : 'sell-signal');

                const signalText = document.createElement('p');
                signalText.textContent = `${tradingPair}: ${signal}`;
                signalText.classList.add('signal-text');

                const entryInfo = document.createElement('p');
                entryInfo.textContent = `Entry Price: ${entryPrice.toFixed(2)}, Stop Loss: ${stopLoss.toFixed(2)}, Take Profit: ${takeProfit.toFixed(2)}`;
                entryInfo.classList.add('entry-info');

                signalElement.appendChild(signalText);
                signalElement.appendChild(entryInfo);

                // Remove previous signals if any
                while (signalsContainer.firstChild) {
                    signalsContainer.removeChild(signalsContainer.firstChild);
                }

                signalsContainer.appendChild(signalElement);
            }
        })
        .catch(error => console.error('Error occurred:', error));
}

function getSignal(latestClose, previousClose) {
    return latestClose > previousClose ? 'BUY' : 'SELL';
}

document.getElementById('tradingPair').addEventListener('input', function () {
    const tradingPair = this.value.toUpperCase();
    if (tradingPair.length >= 1) {
        fetchTradingPairs(tradingPair);
    }
});
