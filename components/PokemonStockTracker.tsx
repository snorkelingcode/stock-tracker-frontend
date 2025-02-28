// components/PokemonStockTracker.tsx
import React, { useState, useEffect } from 'react';
import { HeadingSection } from './HeadingSection';
import { ProductCard } from './ProductCard';

interface Product {
  name: string;
  price: number;
  url: string;
  store: string;
  type: string;
  image?: string;
}

interface StatusData {
  last_update: string | null;
  products_count: number;
  is_scraping: boolean;
  retailers: string[];
}

export const PokemonStockTracker: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState<StatusData>({
    last_update: null,
    products_count: 0,
    is_scraping: false,
    retailers: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Configuration for the scraper
  const retailerOptions = [
    "Pokemon Center", 
    "Target", 
    "Walmart", 
    "Best Buy", 
    "GameStop"
  ];

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch status from the API
  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/status');
      if (!response.ok) {
        throw new Error(`Failed to fetch status: ${response.statusText}`);
      }
      const data = await response.json();
      setStatus(data);
    } catch (err) {
      console.error('Error fetching status:', err);
    }
  };

  // Start the scraper
  const triggerScrape = async () => {
    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.NEXT_PUBLIC_API_KEY || 'your-default-api-key'
        },
        body: JSON.stringify({
          retailers: retailerOptions,
          thresholds: {
            "booster pack": 4.99,
            "booster box": 149.99,
            "elite trainer box": 49.99,
            "tin": 29.99,
            "special collection": 24.99,
            "premium collection": 39.99,
            "blister pack": 12.99,
            "bundle": 39.99
          },
          check_interval: 1800
        })
      });

      if (!response.ok) {
        throw new Error('Failed to start scraper');
      }

      setStatus(prev => ({ ...prev, is_scraping: true }));
      
      // Poll for updates
      const pollInterval = setInterval(async () => {
        await fetchStatus();
        const statusResponse = await fetch('/api/status');
        const statusData = await statusResponse.json();
        
        if (!statusData.is_scraping) {
          clearInterval(pollInterval);
          fetchProducts();
        }
      }, 5000);
    } catch (err) {
      console.error('Error triggering scrape:', err);
      setError('Failed to start scraper. Please try again later.');
    }
  };

  // Load initial data on component mount
  useEffect(() => {
    fetchProducts();
    fetchStatus();
  }, []);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return 'Never';
    return new Date(dateStr).toLocaleString();
  };

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-12 min-h-screen bg-zinc-100 max-w-7xl mx-auto">
      <HeadingSection />
      
      <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Pokemon TCG Stock Status</h2>
            <p className="text-sm text-gray-500">
              Last updated: {formatDate(status.last_update)}
            </p>
          </div>
          
          <button
            onClick={triggerScrape}
            disabled={status.is_scraping}
            className={`mt-3 sm:mt-0 px-4 py-2 rounded-lg font-medium ${
              status.is_scraping 
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {status.is_scraping ? 'Scanning...' : 'Scan for Stock'}
          </button>
        </div>
        
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        
        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-700">
            Products Found: <span className="font-semibold">{products.length}</span>
          </p>
          <p className="text-sm text-gray-700">
            Retailers: <span className="font-semibold">{status.retailers.join(', ') || 'None'}</span>
          </p>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-6">Available Products</h2>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              productLine={product.type || 'Pokemon TCG'}
              product={product.name}
              source={`${product.store} - $${product.price.toFixed(2)}`}
              productUrl={product.url}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white p-8 rounded-xl shadow text-center">
          <p className="text-gray-600">No products currently available at retail price.</p>
          <p className="text-gray-500 text-sm mt-2">Click "Scan for Stock" to check for new items.</p>
        </div>
      )}
    </main>
  );
};

export default PokemonStockTracker;