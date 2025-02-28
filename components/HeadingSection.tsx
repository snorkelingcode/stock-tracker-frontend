import * as React from "react";

export const HeadingSection: React.FC = () => {
  return (
    <header className="mb-10 md:mb-20">
      <h1 className="text-4xl md:text-5xl lg:text-6xl text-stone-900 font-normal">
        Find everything in stock.
      </h1>
      <h2 className="text-4xl md:text-5xl lg:text-6xl text-stone-900 font-normal">
        In one place.
      </h2>
    </header>
  );
};

export default HeadingSection;