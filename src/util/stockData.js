// Stock Dashboard Data Fetching Utilities

/**
 * Fetch CNN Fear & Greed Index
 * Uses unofficial CNN endpoint
 */
export async function fetchFearGreedIndex() {
  try {
    const response = await fetch('https://production.dataviz.cnn.io/index/fearandgreed/graphdata');
    if (!response.ok) throw new Error('Failed to fetch Fear & Greed Index');

    const data = await response.json();

    // Extract current value
    const currentValue = data.fear_and_greed?.score || null;
    const currentRating = data.fear_and_greed?.rating || 'N/A';
    const lastUpdate = data.fear_and_greed?.timestamp || new Date().toISOString();

    return {
      value: currentValue,
      rating: currentRating,
      timestamp: lastUpdate,
      history: data.fear_and_greed_historical?.data || []
    };
  } catch (error) {
    console.error('Error fetching Fear & Greed Index:', error);
    return {
      value: null,
      rating: 'Error',
      timestamp: new Date().toISOString(),
      error: error.message
    };
  }
}

/**
 * Fetch stock prices using Alpha Vantage API
 * Note: Requires API key (free tier: 25 requests/day)
 * Alternative: Can use Yahoo Finance unofficial API
 */
export async function fetchStockPrice(symbol, apiKey = null) {
  // If no API key, use demo data
  if (!apiKey) {
    console.warn('No Alpha Vantage API key provided, using demo mode');
    return {
      symbol: symbol,
      price: null,
      change: null,
      changePercent: null,
      timestamp: new Date().toISOString(),
      error: 'API key required for real data'
    };
  }

  try {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error('Failed to fetch stock price');

    const data = await response.json();
    const quote = data['Global Quote'];

    if (!quote || Object.keys(quote).length === 0) {
      throw new Error('Invalid symbol or API limit reached');
    }

    return {
      symbol: symbol,
      price: parseFloat(quote['05. price']),
      change: parseFloat(quote['09. change']),
      changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
      volume: parseInt(quote['06. volume']),
      timestamp: quote['07. latest trading day'],
      high: parseFloat(quote['03. high']),
      low: parseFloat(quote['04. low']),
      open: parseFloat(quote['02. open']),
      previousClose: parseFloat(quote['08. previous close'])
    };
  } catch (error) {
    console.error(`Error fetching stock price for ${symbol}:`, error);
    return {
      symbol: symbol,
      price: null,
      change: null,
      changePercent: null,
      timestamp: new Date().toISOString(),
      error: error.message
    };
  }
}

/**
 * Fetch multiple stock prices
 */
export async function fetchMultipleStocks(symbols, apiKey) {
  const results = [];

  // Alpha Vantage free tier has rate limits, so we add delays
  for (const symbol of symbols) {
    const result = await fetchStockPrice(symbol, apiKey);
    results.push(result);

    // Wait 12 seconds between requests (free tier limit: 5 requests/minute)
    if (symbols.indexOf(symbol) < symbols.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 12000));
    }
  }

  return results;
}

/**
 * Fetch exchange rates using Frankfurter API (free, no API key required)
 * Base currency: USD
 */
export async function fetchExchangeRates(baseCurrency = 'USD', targetCurrencies = ['EUR', 'GBP', 'JPY', 'TWD', 'CNY']) {
  try {
    const currencyString = targetCurrencies.join(',');
    const url = `https://api.frankfurter.dev/v1/latest?base=${baseCurrency}&symbols=${currencyString}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch exchange rates');

    const data = await response.json();

    return {
      base: data.base,
      date: data.date,
      rates: data.rates,
      success: true
    };
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return {
      base: baseCurrency,
      date: new Date().toISOString(),
      rates: {},
      success: false,
      error: error.message
    };
  }
}

/**
 * Get AAII Sentiment Index (mock data - requires manual update)
 * Real data would need to be scraped from AAII website or updated manually
 */
export function getAAIISentiment() {
  // This should be updated manually or via web scraping
  // For now, returning placeholder structure
  const storedData = localStorage.getItem('aaii_sentiment');

  if (storedData) {
    return JSON.parse(storedData);
  }

  return {
    bullish: null,
    neutral: null,
    bearish: null,
    lastUpdate: null,
    error: 'AAII data requires manual update - visit AAII.com for latest data'
  };
}

/**
 * Update AAII Sentiment Index (manual entry)
 */
export function updateAAIISentiment(bullish, neutral, bearish) {
  const data = {
    bullish: parseFloat(bullish),
    neutral: parseFloat(neutral),
    bearish: parseFloat(bearish),
    lastUpdate: new Date().toISOString()
  };

  localStorage.setItem('aaii_sentiment', JSON.stringify(data));
  return data;
}

/**
 * Helper function to determine market sentiment based on Fear & Greed Index
 */
export function interpretFearGreed(value) {
  if (value === null || value === undefined) return { color: 'gray', label: 'N/A' };

  if (value <= 25) return { color: 'red', label: '極度恐懼', severity: 'extreme-fear' };
  if (value <= 45) return { color: 'orange', label: '恐懼', severity: 'fear' };
  if (value <= 55) return { color: 'yellow', label: '中性', severity: 'neutral' };
  if (value <= 75) return { color: 'lightgreen', label: '貪婪', severity: 'greed' };
  return { color: 'green', label: '極度貪婪', severity: 'extreme-greed' };
}

/**
 * Format currency
 */
export function formatCurrency(value, currency = 'USD') {
  if (value === null || value === undefined) return 'N/A';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

/**
 * Format percentage
 */
export function formatPercent(value, decimals = 2) {
  if (value === null || value === undefined) return 'N/A';

  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals)}%`;
}
