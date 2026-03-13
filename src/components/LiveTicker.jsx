import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const fetchAllPrices = async () => {
      const newPrices = { ...prices };

      // Fetch crypto from CoinGecko (public API with CORS)
      try {
        const cryptoRes = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true',
          { headers: { 'Accept': 'application/json' } }
        );

        if (cryptoRes.ok) {
          const data = await cryptoRes.json();
          if (data.bitcoin) {
            newPrices.BTC = {
              price: data.bitcoin.usd,
              change: data.bitcoin.usd_24h_change || 0,
            };
          }
          if (data.ethereum) {
            newPrices.ETH = {
              price: data.ethereum.usd,
              change: data.ethereum.usd_24h_change || 0,
            };
          }
        }
      } catch (err) {
        console.error('CoinGecko fetch error:', err);
      }

      // Fetch stocks using Yahoo Finance via allorigins proxy
      const stockSymbols = [
        { symbol: 'SPY', key: 'SPY' },
        { symbol: 'TSLA', key: 'TSLA' },
        { symbol: 'GME', key: 'GME' },
        { symbol: '^DJI', key: 'DOW' },
      ];

      for (const { symbol, key } of stockSymbols) {
        try {
          const yahooUrl = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`;
          const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(yahooUrl)}`;

          const res = await fetch(proxyUrl);
          if (res.ok) {
            const data = await res.json();
            if (data.chart?.result?.[0]) {
              const meta = data.chart.result[0].meta;
              const currentPrice = meta.regularMarketPrice;
              const prevClose = meta.chartPreviousClose || meta.previousClose;
              const change = prevClose ? ((currentPrice - prevClose) / prevClose) * 100 : 0;

              newPrices[key] = {
                price: currentPrice,
                change: change,
              };
            }
          }
        } catch (err) {
          console.error(`Stock fetch error for ${symbol}:`, err);
        }
      }

      setPrices(newPrices);
      setLoading(false);
    };

    fetchAllPrices();
    // Refresh every 30 seconds
    const interval = setInterval(fetchAllPrices, 30000);
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
