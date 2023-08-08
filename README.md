# AlgoTrader

AlgoTrader is a platform that implements an algorithmic trading strategy based on moving average crossovers. The project aims to generate trading signals using the crossover of two moving averages – the 50-day moving average and the 200-day moving average.

## Trading Strategy

The trading strategy employed by AlgoTrader is based on the concept of moving average crossovers. In this strategy:

- A "Buy" signal is generated when the 50-day moving average crosses over the 200-day moving average.
- A "Sell" signal is generated when the 50-day moving average crosses under the 200-day moving average.

This approach aims to capture potential trends and reversals in the market, helping traders make informed trading decisions.

## Technologies Used

AlgoTrader project involves the following technologies:

- **Python**: The backend of the project is implemented using Python. It includes a simple web server that serves the user interface and handles API requests.

- **HTML/CSS/JavaScript**: The user interface is built using HTML for structure, CSS for styling, and JavaScript for interactivity. The frontend allows users to input trading pairs, fetch data from the Alpha Vantage API, and display trading signals.

- **Alpha Vantage API**: The project integrates with the Alpha Vantage API to fetch historical price data for trading pairs. The API provides the necessary data to calculate moving averages and generate trading signals.

## Getting Started

1. Clone the repository: `git clone https://github.com/yourusername/AlgoTrader.git`
2. Set up environment variables:
   - Set `ALPHAVANTAGE_API_KEY` environment variable with your Alpha Vantage API key.
3. Install dependencies: `pip install flask`
4. Run the server: `python server.py`

Access the platform by opening your web browser and navigating to `http://localhost:8000`.

## Disclaimer

AlgoTrader is provided for educational and informational purposes only. Trading in financial markets involves significant risk, and past performance is not indicative of future results. The use of algorithmic trading strategies should be approached with caution and thorough understanding.

## Contributing

Contributions to AlgoTrader are welcome! Feel free to open issues for bug reports or feature requests. Pull requests are also appreciated.


