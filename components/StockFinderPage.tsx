"use client";

import * as React from "react";
import { HeadingSection } from "./HeadingSection";
import { ProductCard } from "./ProductCard";

export const StockFinderPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-300">
      <div className="container mx-auto px-4 sm:px-6 py-16 max-w-7xl">
        <HeadingSection />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
          <ProductCard
            productLine="Product Line"
            product="Product"
            source="Source"
          />
          <ProductCard
            productLine="Product Line"
            product="Product"
            source="Source"
          />
          <ProductCard
            productLine="Product Line"
            product="Product"
            source="Source"
          />
        </div>
      </div>
    </div>
  );
};

export default StockFinderPage;