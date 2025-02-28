"use client";

import * as React from "react";
import { HeadingSection } from "./HeadingSection";
import { ProductCard } from "./ProductCard";

export const StockFinderPage: React.FC = () => {
  return (
    <main className="px-20 py-16 min-h-screen bg-zinc-300 max-md:p-10 max-sm:p-5">
      <HeadingSection />
      <section className="flex gap-5 justify-between max-md:flex-col max-md:items-center">
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
      </section>
    </main>
  );
};

export default StockFinderPage;