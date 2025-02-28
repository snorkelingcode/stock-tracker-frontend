"use client";

import * as React from "react";
import { HeadingSection } from "./HeadingSection";
import { ProductCard } from "./ProductCard";
import { useEffect, useState } from "react";

interface Product {
  name: string;
  price: number;
  url: string;
  store: string;
  type: string;
  image?: string;
}

export const StockFinderPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/api/stock');
        
        if (!response.ok) {
          throw new Error(`Error fetching products: ${response.status}`);
        }
        
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
    
    // Set up polling every 5 minutes
    const intervalId = setInterval(fetchProducts, 5 * 60 * 1000);
    
    // Clean up on unmount
    return () => clearInterval(intervalId);
  }, []);

  // Display placeholder cards when loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-300">
        <div className="container mx-auto px-4 sm:px-6 py-16 max-w-7xl">
          <HeadingSection />
          <p className="text-center mb-8 text-xl">Loading available products...</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 animate-pulse">
            {[1, 2, 3].map((index) => (
              <div 
                key={index} 
                className="h-[295px] w-full md:max-w-[340px] bg-neutral-500 rounded-xl"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Display error message
  if (error) {
    return (
      <div className="min-h-screen bg-zinc-300">
        <div className="container mx-auto px-4 sm:px-6 py-16 max-w-7xl">
          <HeadingSection />
          <div className="mt-10 p-6 bg-red-100 text-red-700 rounded-lg text-center">
            <p>{error}</p>
            <button 
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Display empty state
  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-300">
        <div className="container mx-auto px-4 sm:px-6 py-16 max-w-7xl">
          <HeadingSection />
          <div className="mt-10 p-6 bg-neutral-400 rounded-lg text-center">
            <p className="text-xl">No products currently in stock.</p>
            <p className="mt-2">Check back later for updates.</p>
          </div>
        </div>
      </div>
    );
  }

  // Display products
  return (
    <div className="min-h-screen bg-zinc-300">
      <div className="container mx-auto px-4 sm:px-6 py-16 max-w-7xl">
        <HeadingSection />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              productLine={product.type}
              product={product.name}
              source={`${product.store} - $${product.price.toFixed(2)}`}
              productUrl={product.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockFinderPage;