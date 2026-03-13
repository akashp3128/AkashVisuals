// Vercel Serverless Function to proxy Yahoo Finance API
// Deploy to Vercel for free, then update STOCK_API_URL in LiveTicker.jsx

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { symbols } = req.query;

  if (!symbols) {
    return res.status(400).json({ error: 'symbols parameter required' });
  }

  const results = {};
  const symbolList = symbols.split(',');

  for (const symbol of symbolList) {
    try {
      const response = await fetch(
        `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`,
        { headers: { 'User-Agent': 'Mozilla/5.0' } }
      );

      if (response.ok) {
        const data = await response.json();
        if (data?.chart?.result?.[0]) {
          const meta = data.chart.result[0].meta;
          results[symbol] = {
            price: meta.regularMarketPrice,
            previousClose: meta.chartPreviousClose || meta.previousClose,
          };
        }
      }
    } catch (err) {
      console.error(`Error fetching ${symbol}:`, err);
    }
  }

  return res.status(200).json(results);
}
