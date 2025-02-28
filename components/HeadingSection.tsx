import * as React from "react";

export const HeadingSection: React.FC = () => {
  return (
    <header className="mb-40 max-md:mb-20 max-sm:mb-10">
      <h1 className="text-6xl text-stone-900 max-md:text-5xl max-sm:text-4xl">
        Find everything in stock.
      </h1>
      <h2 className="text-6xl text-stone-900 max-md:text-5xl max-sm:text-4xl">
        In one place.
      </h2>
    </header>
  );
};
