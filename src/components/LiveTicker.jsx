import { useState, useEffect } from 'react';
import './LiveTicker.css';

const LiveTicker = () => {
  const [prices, setPrices] = useState({
    BTC: { price: 0, change: 0 },
    ETH: { price: 0, change: 0 },
    SOL: { price: 0, change: 0 },
    XRP: { price: 0, change: 0 },
    DOGE: { price: 0, change: 0 },
    ADA: { price: 0, change: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPrices = async () => {
      const newPrices = { ...prices };

      // Fetch crypto from CoinGecko (public API with CORS support)
      try {
        const cryptoRes = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,ripple,dogecoin,cardano&vs_currencies=usd&include_24hr_change=true',
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
          if (data.solana) {
            newPrices.SOL = {
              price: data.solana.usd,
              change: data.solana.usd_24h_change || 0,
            };
          }
          if (data.ripple) {
            newPrices.XRP = {
              price: data.ripple.usd,
              change: data.ripple.usd_24h_change || 0,
            };
          }
          if (data.dogecoin) {
            newPrices.DOGE = {
              price: data.dogecoin.usd,
              change: data.dogecoin.usd_24h_change || 0,
            };
          }
          if (data.cardano) {
            newPrices.ADA = {
              price: data.cardano.usd,
              change: data.cardano.usd_24h_change || 0,
            };
          }
        }
      } catch (err) {
        console.error('CoinGecko fetch error:', err);
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
    // Format based on price magnitude
    if (price >= 1000) {
      return price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    } else if (price >= 1) {
      return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else {
      return price.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 });
    }
  };

  const formatChange = (change) => {
    if (change === 0) return '0.00%';
    const prefix = change > 0 ? '+' : '';
    return `${prefix}${change.toFixed(2)}%`;
  };

  const tickerOrder = ['BTC', 'ETH', 'SOL', 'XRP', 'DOGE', 'ADA'];

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
