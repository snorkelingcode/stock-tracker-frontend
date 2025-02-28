"use client";

import * as React from "react";

interface ListingButtonProps {
  text: string;
}

export const ListingButton: React.FC<ListingButtonProps> = ({ text }) => {
  return (
    <button
      className="absolute left-1/2 -translate-x-1/2 bottom-[9px] text-xl md:text-2xl italic font-light bg-indigo-400 hover:bg-indigo-500 transition-colors rounded-3xl h-[50px] md:h-[66px] text-stone-900 w-[200px] md:w-[257px]"
      aria-label={text}
      onClick={(e) => {
        // Prevent the click from bubbling up to the parent card
        e.stopPropagation();
      }}
    >
      {text}
    </button>
  );
};

export default ListingButton;