import * as React from "react";
import { ListingButton } from "./ListingButton";

interface ProductCardProps {
  productLine: string;
  product: string;
  source: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  productLine,
  product,
  source,
}) => {
  return (
    <article className="relative rounded-xl shadow-2xl bg-neutral-400 h-[295px] w-[340px] max-md:w-full max-md:max-w-[340px] max-sm:h-[250px] transform transition-all">
      <div className="px-10 py-8 max-sm:p-5">
        <p className="mb-1.5 text-xl text-stone-900 max-sm:text-lg">
          {productLine}
        </p>
        <p className="mb-1.5 text-xl text-stone-900 max-sm:text-lg">
          {product}
        </p>
        <p className="mb-1.5 text-xl text-stone-900 max-sm:text-lg">{source}</p>
      </div>
      <ListingButton text="Listing" />
    </article>
  );
};