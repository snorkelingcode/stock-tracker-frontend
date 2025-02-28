import * as React from "react";
import { ListingButton } from "./ListingButton";

interface ProductCardProps {
  productLine: string;
  product: string;
  source: string;
  url?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  productLine,
  product,
  source,
  url,
}) => {
  const handleClick = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <article className="relative rounded-xl shadow-2xl bg-neutral-400 h-[295px] w-full md:max-w-[340px] max-sm:h-[250px] cursor-pointer" onClick={handleClick}>
      <div className="px-6 md:px-10 py-8 max-sm:p-5">
        <p className="mb-1.5 text-xl text-stone-900 max-sm:text-lg">
          {productLine}
        </p>
        <p className="mb-1.5 text-xl text-stone-900 max-sm:text-lg line-clamp-2">
          {product}
        </p>
        <p className="mb-1.5 text-xl text-stone-900 max-sm:text-lg">
          {source}
        </p>
      </div>
      <ListingButton text="View Listing" />
    </article>
  );
};

export default ProductCard;