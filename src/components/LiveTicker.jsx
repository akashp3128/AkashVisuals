import { useState, useEffect, useRef } from 'react';
import './LiveTicker.css';

const LiveTicker = () => {
  const [prices, setPrices] = useState({
    BTC: { price: 0, change: 0 },
    ETH: { price: 0, change: 0 },
    GME: { price: 0, change: 0 },
    SPY: { price: 0, change: 0 },
    TSLA: { price: 0, change: 0 },
    DOW: { price: 0, change: 0 },
  });
  const [loading, setLoading] = useState(true);
  const retryCount = useRef(0);

  useEffect(() => {
    const fetchAllPrices = async () => {
      const newPrices = { ...prices };
      let hasData = false;

      // Try Binance API for crypto (has CORS support)
      try {
        const [btcRes, ethRes] = await Promise.all([
          fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT'),
          fetch('https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT'),
        ]);

        if (btcRes.ok) {
          const btcData = await btcRes.json();
          newPrices.BTC = {
            price: parseFloat(btcData.lastPrice),
            change: parseFloat(btcData.priceChangePercent),
          };
          hasData = true;
        }

        if (ethRes.ok) {
          const ethData = await ethRes.json();
          newPrices.ETH = {
            price: parseFloat(ethData.lastPrice),
            change: parseFloat(ethData.priceChangePercent),
          };
          hasData = true;
        }
      } catch (err) {
        console.error('Binance fetch error:', err);
      }

      // Try Twelve Data API for stocks (free tier with CORS)
      const stockSymbols = ['TSLA', 'SPY', 'GME'];

      for (const symbol of stockSymbols) {
        try {
          // Use public quote endpoint
          const res = await fetch(
            `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=demo`
          );

          if (res.ok) {
            const data = await res.json();
            if (data.close && data.previous_close) {
              const price = parseFloat(data.close);
              const prevClose = parseFloat(data.previous_close);
              const change = ((price - prevClose) / prevClose) * 100;
              newPrices[symbol] = { price, change };
              hasData = true;
            }
          }
        } catch (err) {
          console.error(`Stock fetch error for ${symbol}:`, err);
        }
      }

      // For DOW, use a calculated approximation or skip
      // Most free APIs don't support indices well
      if (newPrices.SPY.price > 0) {
        // Rough DOW estimate based on SPY (not accurate but gives market direction)
        newPrices.DOW = {
          price: Math.round(newPrices.SPY.price * 75), // Rough ratio
          change: newPrices.SPY.change,
        };
      }

      // If no data and first few tries, use fallback static data
      if (!hasData && retryCount.current < 3) {
        retryCount.current++;
        // Fallback to approximate market data
        newPrices.BTC = { price: 82450, change: 1.2 };
        newPrices.ETH = { price: 3180, change: 0.8 };
        newPrices.GME = { price: 24.50, change: -0.5 };
        newPrices.SPY = { price: 563, change: 0.3 };
        newPrices.TSLA = { price: 178, change: 1.5 };
        newPrices.DOW = { price: 42150, change: 0.2 };
      }

      setPrices(newPrices);
      setLoading(false);
    };

    fetchAllPrices();
    // Refresh every 60 seconds (less aggressive to avoid rate limits)
    const interval = setInterval(fetchAllPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price, symbol) => {
    if (price === 0) return '---';
    if (['BTC', 'ETH', 'DOW', 'SPY'].includes(symbol)) {
      return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatChange = (change) => {
    if (change === 0) return '0.00%';
    const prefix = change > 0 ? '+' : '';
    return `${prefix}${change.toFixed(2)}%`;
  };

  const tickerOrder = ['GME', 'SPY', 'BTC', 'ETH', 'TSLA', 'DOW'];

  // Triple the items for seamless loop
  const tickerItems = [...tickerOrder, ...tickerOrder, ...tickerOrder];

  return (
    <div className="live-ticker">
      <div className="ticker-track">
        {tickerItems.map((symbol, index) => (
          <div key={`${symbol}-${index}`} className="ticker-item">
            <span className="ticker-symbol">{symbol}</span>
            <span className="ticker-price">
              {loading ? '...' : `$${formatPrice(prices[symbol]?.price, symbol)}`}
            </span>
            <span
              className={`ticker-change ${
                prices[symbol]?.change > 0 ? 'positive' : prices[symbol]?.change < 0 ? 'negative' : ''
              }`}
            >
              {loading ? '' : formatChange(prices[symbol]?.change)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveTicker;
