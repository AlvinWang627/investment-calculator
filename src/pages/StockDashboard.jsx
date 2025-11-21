import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RefreshCw, TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";
import {
  fetchFearGreedIndex,
  fetchStockPrice,
  fetchExchangeRates,
  getAAIISentiment,
  updateAAIISentiment,
  interpretFearGreed,
  formatCurrency,
  formatPercent
} from "../util/stockData";

export default function StockDashboard() {
  // State for Fear & Greed Index
  const [fearGreed, setFearGreed] = useState({
    value: null,
    rating: 'Loading...',
    timestamp: null,
    loading: true
  });

  // State for stock prices
  const [stocks, setStocks] = useState([]);
  const [stockSymbol, setStockSymbol] = useState('');
  const [watchlist, setWatchlist] = useState(['AAPL', 'GOOGL', 'MSFT', 'TSLA']);
  const [apiKey, setApiKey] = useState('');
  const [stocksLoading, setStocksLoading] = useState(false);

  // State for exchange rates
  const [exchangeRates, setExchangeRates] = useState({
    base: 'USD',
    rates: {},
    date: null,
    loading: true
  });

  // State for AAII sentiment
  const [aaii, setAaii] = useState({
    bullish: null,
    neutral: null,
    bearish: null,
    lastUpdate: null
  });
  const [aaiiBullish, setAaiiBullish] = useState('');
  const [aaiiNeutral, setAaiiNeutral] = useState('');
  const [aaiiBearish, setAaiiBearish] = useState('');

  // Load initial data
  useEffect(() => {
    loadFearGreedIndex();
    loadExchangeRates();
    loadAAIISentiment();

    // Load saved API key from localStorage
    const savedApiKey = localStorage.getItem('alpha_vantage_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }

    // Load saved watchlist
    const savedWatchlist = localStorage.getItem('stock_watchlist');
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  const loadFearGreedIndex = async () => {
    setFearGreed(prev => ({ ...prev, loading: true }));
    const data = await fetchFearGreedIndex();
    setFearGreed({
      value: data.value,
      rating: data.rating,
      timestamp: data.timestamp,
      loading: false,
      error: data.error
    });
  };

  const loadExchangeRates = async () => {
    setExchangeRates(prev => ({ ...prev, loading: true }));
    const data = await fetchExchangeRates('USD', ['EUR', 'GBP', 'JPY', 'TWD', 'CNY']);
    setExchangeRates({
      base: data.base,
      rates: data.rates,
      date: data.date,
      loading: false,
      error: !data.success ? data.error : null
    });
  };

  const loadAAIISentiment = () => {
    const data = getAAIISentiment();
    setAaii(data);
  };

  const handleSaveApiKey = () => {
    localStorage.setItem('alpha_vantage_api_key', apiKey);
    alert('API Key saved successfully!');
  };

  const handleAddToWatchlist = () => {
    if (stockSymbol && !watchlist.includes(stockSymbol.toUpperCase())) {
      const newWatchlist = [...watchlist, stockSymbol.toUpperCase()];
      setWatchlist(newWatchlist);
      localStorage.setItem('stock_watchlist', JSON.stringify(newWatchlist));
      setStockSymbol('');
    }
  };

  const handleRemoveFromWatchlist = (symbol) => {
    const newWatchlist = watchlist.filter(s => s !== symbol);
    setWatchlist(newWatchlist);
    localStorage.setItem('stock_watchlist', JSON.stringify(newWatchlist));
    setStocks(stocks.filter(s => s.symbol !== symbol));
  };

  const handleRefreshStocks = async () => {
    if (!apiKey) {
      alert('Please enter an Alpha Vantage API key first. Get your free key at https://www.alphavantage.co/support/#api-key');
      return;
    }

    setStocksLoading(true);
    const results = [];

    // Fetch one stock at a time with delay (API rate limit)
    for (let i = 0; i < watchlist.length; i++) {
      const symbol = watchlist[i];
      const data = await fetchStockPrice(symbol, apiKey);
      results.push(data);

      // Update UI progressively
      setStocks([...results]);

      // Wait between requests (Alpha Vantage free tier: 5 requests/minute)
      if (i < watchlist.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 12000));
      }
    }

    setStocksLoading(false);
  };

  const handleUpdateAAII = () => {
    if (!aaiiBullish || !aaiiNeutral || !aaiiBearish) {
      alert('Please enter all three AAII sentiment values');
      return;
    }

    const total = parseFloat(aaiiBullish) + parseFloat(aaiiNeutral) + parseFloat(aaiiBearish);
    if (Math.abs(total - 100) > 0.1) {
      alert('AAII sentiment values must sum to 100%');
      return;
    }

    const data = updateAAIISentiment(aaiiBullish, aaiiNeutral, aaiiBearish);
    setAaii(data);
    alert('AAII sentiment updated successfully!');
  };

  const fgInterpretation = interpretFearGreed(fearGreed.value);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          股票投資儀表板
        </h1>
        <p className="text-gray-600">Stock Investment Dashboard - 市場情緒與關鍵指標追蹤</p>
      </div>

      {/* Fear & Greed Index */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              CNN 貪婪恐懼指數
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={loadFearGreedIndex}
              disabled={fearGreed.loading}
            >
              <RefreshCw className={`h-4 w-4 ${fearGreed.loading ? 'animate-spin' : ''}`} />
            </Button>
          </CardTitle>
          <CardDescription>Market Sentiment Indicator (0 = Extreme Fear, 100 = Extreme Greed)</CardDescription>
        </CardHeader>
        <CardContent>
          {fearGreed.error ? (
            <Alert variant="destructive">
              <AlertDescription>{fearGreed.error}</AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold mb-2" style={{ color: fgInterpretation.color }}>
                    {fearGreed.value !== null ? fearGreed.value : '--'}
                  </div>
                  <div className="text-2xl font-semibold mb-1" style={{ color: fgInterpretation.color }}>
                    {fgInterpretation.label}
                  </div>
                  <div className="text-sm text-gray-500">{fearGreed.rating}</div>
                </div>
              </div>

              {/* Visual gauge */}
              <div className="relative h-8 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full overflow-hidden">
                {fearGreed.value !== null && (
                  <div
                    className="absolute top-0 h-full w-1 bg-black"
                    style={{ left: `${fearGreed.value}%` }}
                  />
                )}
              </div>

              <div className="flex justify-between text-xs text-gray-500">
                <span>極度恐懼 (0)</span>
                <span>中性 (50)</span>
                <span>極度貪婪 (100)</span>
              </div>

              {fearGreed.timestamp && (
                <div className="text-sm text-gray-500 text-center">
                  Last updated: {new Date(fearGreed.timestamp).toLocaleString()}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stock Prices */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            股票價格追蹤
          </CardTitle>
          <CardDescription>Real-time stock prices from your watchlist</CardDescription>
        </CardHeader>
        <CardContent>
          {/* API Key Input */}
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <Label htmlFor="apiKey" className="mb-2 block">
              Alpha Vantage API Key (免費申請: <a href="https://www.alphavantage.co/support/#api-key" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Get Free Key</a>)
            </Label>
            <div className="flex gap-2">
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Alpha Vantage API key"
                className="flex-1"
              />
              <Button onClick={handleSaveApiKey} variant="outline">Save</Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Free tier: 25 requests/day, 5 requests/minute. Your API key is stored locally.
            </p>
          </div>

          {/* Watchlist Management */}
          <div className="mb-4">
            <Label htmlFor="stockSymbol" className="mb-2 block">Add Stock to Watchlist</Label>
            <div className="flex gap-2">
              <Input
                id="stockSymbol"
                value={stockSymbol}
                onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
                placeholder="e.g., AAPL, TSLA"
                className="flex-1"
              />
              <Button onClick={handleAddToWatchlist}>Add</Button>
              <Button onClick={handleRefreshStocks} disabled={stocksLoading || !apiKey}>
                <RefreshCw className={`h-4 w-4 mr-2 ${stocksLoading ? 'animate-spin' : ''}`} />
                Refresh All
              </Button>
            </div>
          </div>

          {/* Watchlist */}
          <div className="space-y-2">
            {watchlist.map((symbol) => {
              const stockData = stocks.find(s => s.symbol === symbol);

              return (
                <div key={symbol} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-semibold">{symbol}</div>
                    {stockData && !stockData.error ? (
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold">{formatCurrency(stockData.price)}</span>
                          <span className={`flex items-center gap-1 ${stockData.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {stockData.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                            {formatPercent(stockData.changePercent)}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Open: {formatCurrency(stockData.open)} | High: {formatCurrency(stockData.high)} | Low: {formatCurrency(stockData.low)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Updated: {stockData.timestamp}
                        </div>
                      </div>
                    ) : stockData?.error ? (
                      <div className="text-sm text-red-500">{stockData.error}</div>
                    ) : (
                      <div className="text-sm text-gray-500">Click "Refresh All" to load data</div>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFromWatchlist(symbol)}
                  >
                    Remove
                  </Button>
                </div>
              );
            })}
          </div>

          {stocksLoading && (
            <Alert className="mt-4">
              <AlertDescription>
                Loading stock data... This may take a while due to API rate limits (12 seconds between requests).
                {stocks.length > 0 && ` Progress: ${stocks.length}/${watchlist.length}`}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Exchange Rates */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              匯率 (Exchange Rates)
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={loadExchangeRates}
              disabled={exchangeRates.loading}
            >
              <RefreshCw className={`h-4 w-4 ${exchangeRates.loading ? 'animate-spin' : ''}`} />
            </Button>
          </CardTitle>
          <CardDescription>Current exchange rates (Base: USD)</CardDescription>
        </CardHeader>
        <CardContent>
          {exchangeRates.error ? (
            <Alert variant="destructive">
              <AlertDescription>{exchangeRates.error}</AlertDescription>
            </Alert>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(exchangeRates.rates).map(([currency, rate]) => (
                <div key={currency} className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">USD → {currency}</div>
                  <div className="text-2xl font-bold">{rate.toFixed(4)}</div>
                </div>
              ))}
            </div>
          )}
          {exchangeRates.date && (
            <div className="text-sm text-gray-500 mt-4 text-center">
              Updated: {exchangeRates.date}
            </div>
          )}
        </CardContent>
      </Card>

      {/* AAII Sentiment Survey */}
      <Card>
        <CardHeader>
          <CardTitle>AAII 投資者情緒調查</CardTitle>
          <CardDescription>
            American Association of Individual Investors Sentiment Survey (
            <a href="https://www.aaii.com/sentimentsurvey" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              Get latest data
            </a>
            )
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Manual input form */}
          <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-gray-700 mb-3">
              AAII data requires manual update. Visit <a href="https://www.aaii.com/sentimentsurvey" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">AAII.com</a> for the latest weekly survey results.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-3">
              <div>
                <Label htmlFor="aaiiBullish">Bullish %</Label>
                <Input
                  id="aaiiBullish"
                  type="number"
                  step="0.1"
                  value={aaiiBullish}
                  onChange={(e) => setAaiiBullish(e.target.value)}
                  placeholder="e.g., 35.5"
                />
              </div>
              <div>
                <Label htmlFor="aaiiNeutral">Neutral %</Label>
                <Input
                  id="aaiiNeutral"
                  type="number"
                  step="0.1"
                  value={aaiiNeutral}
                  onChange={(e) => setAaiiNeutral(e.target.value)}
                  placeholder="e.g., 30.0"
                />
              </div>
              <div>
                <Label htmlFor="aaiiBearish">Bearish %</Label>
                <Input
                  id="aaiiBearish"
                  type="number"
                  step="0.1"
                  value={aaiiBearish}
                  onChange={(e) => setAaiiBearish(e.target.value)}
                  placeholder="e.g., 34.5"
                />
              </div>
            </div>
            <Button onClick={handleUpdateAAII}>Update AAII Data</Button>
          </div>

          {/* Display current AAII data */}
          {aaii.bullish !== null ? (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Bullish (看多)</div>
                  <div className="text-3xl font-bold text-green-600">{aaii.bullish.toFixed(1)}%</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Neutral (中性)</div>
                  <div className="text-3xl font-bold text-gray-600">{aaii.neutral.toFixed(1)}%</div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="text-sm text-gray-500 mb-1">Bearish (看空)</div>
                  <div className="text-3xl font-bold text-red-600">{aaii.bearish.toFixed(1)}%</div>
                </div>
              </div>

              {/* Visual representation */}
              <div className="h-8 flex rounded-full overflow-hidden">
                <div
                  className="bg-green-500 flex items-center justify-center text-white text-sm font-semibold"
                  style={{ width: `${aaii.bullish}%` }}
                >
                  {aaii.bullish > 15 && `${aaii.bullish.toFixed(0)}%`}
                </div>
                <div
                  className="bg-gray-400 flex items-center justify-center text-white text-sm font-semibold"
                  style={{ width: `${aaii.neutral}%` }}
                >
                  {aaii.neutral > 15 && `${aaii.neutral.toFixed(0)}%`}
                </div>
                <div
                  className="bg-red-500 flex items-center justify-center text-white text-sm font-semibold"
                  style={{ width: `${aaii.bearish}%` }}
                >
                  {aaii.bearish > 15 && `${aaii.bearish.toFixed(0)}%`}
                </div>
              </div>

              {aaii.lastUpdate && (
                <div className="text-sm text-gray-500 text-center">
                  Last updated: {new Date(aaii.lastUpdate).toLocaleString()}
                </div>
              )}
            </div>
          ) : (
            <Alert>
              <AlertDescription>No AAII data available. Please enter the latest survey results above.</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Info Alert */}
      <Alert className="mt-6">
        <AlertDescription>
          <strong>Note:</strong> This dashboard uses free APIs with rate limits. Fear & Greed Index and Exchange Rates update automatically.
          Stock prices require an Alpha Vantage API key (free, 25 requests/day). AAII data requires manual input from their weekly survey.
        </AlertDescription>
      </Alert>
    </div>
  );
}
