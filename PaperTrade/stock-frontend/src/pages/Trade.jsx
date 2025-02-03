import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

function Trade() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [stocks, setStocks] = useState([]);
  const [stockDetails, setStockDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all stock symbols on component mount
  useEffect(() => {
    const fetchStockSymbols = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5500/api/stocks");
        const symbols = await response.json();
        setStocks(symbols);
      } catch (err) {
        setError("Failed to fetch stock symbols");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStockSymbols();
  }, []);

  // Fetch stock details when a stock is selected
  useEffect(() => {
    if (selectedStock) {
      const fetchStockDetails = async () => {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:5500/api/stocks/${selectedStock}`);
          const details = await response.json();
          setStockDetails(details);
        } catch (err) {
          setError("Failed to fetch stock details");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchStockDetails();
    }
  }, [selectedStock]);

  // Filter stocks based on search query
  const filteredStocks = stocks
    .filter(stock => stock.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 10);

    const handleBuy = async () => {
      if (selectedStock && quantity > 0) {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch('http://localhost:5500/api/trade/buy', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            },
            body: JSON.stringify({
              stock_symbol: selectedStock, // Changed from symbol to stock_symbol
              quantity: quantity,
              price: stockDetails.priceInfo.lastPrice,
            }),
          });
    
          if (response.ok) {
            const data = await response.json();
            alert('Stock bought successfully!');
          } else {
            const data = await response.json();
            setError(data.message || 'Error buying stock');
          }
        } catch (err) {
          setError('Error connecting to server');
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };
    

  const handleSell = async () => {
    if (selectedStock && quantity > 0) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:5500/api/trade/sell', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('authToken')}`,
          },
          body: JSON.stringify({
            stock_symbol: selectedStock,
            quantity: quantity,
            price: stockDetails.priceInfo.lastPrice,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          alert('Stock sold successfully!');
        } else {
          const data = await response.json();
          setError(data.message || 'Error selling stock');
        }
      } catch (err) {
        setError('Error connecting to server');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Trade</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search stocks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="divide-y">
              {loading ? (
                <p className="p-4 text-center text-gray-500">Loading...</p>
              ) : error ? (
                <p className="p-4 text-center text-red-500">{error}</p>
              ) : filteredStocks.length > 0 ? (
                filteredStocks.map(stock => (
                  <div
                    key={stock}
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedStock === stock ? 'bg-indigo-50' : ''}`}
                    onClick={() => setSelectedStock(stock)}
                  >
                    <h3 className="text-lg font-medium text-gray-900">{stock}</h3>
                  </div>
                ))
              ) : (
                <p className="p-4 text-center text-gray-500">No stocks found</p>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Place Order</h2>
            {selectedStock && stockDetails ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Selected Stock</p>
                  <p className="text-lg font-medium">{selectedStock}</p>
                  <p className="text-sm text-gray-500">Current Price: ₹{stockDetails.priceInfo.lastPrice}</p>
                  <p className="text-sm text-gray-500">Available: {stockDetails.availableQuantity} shares</p>
                </div>
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value || 1)))}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleBuy}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Buy
                  </button>
                  <button
                    onClick={handleSell}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Sell
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center">Select a stock to trade</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trade;
