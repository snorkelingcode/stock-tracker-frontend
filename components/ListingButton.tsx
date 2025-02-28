"use client";

import * as React from "react";

interface ListingButtonProps {
  text: string;
}

export const ListingButton: React.FC<ListingButtonProps> = ({ text }) => {
  return (
    <button
      className="absolute left-2/4 text-2xl italic font-light bg-indigo-400 rounded-3xl -translate-x-2/4 bottom-[9px] h-[66px] text-stone-900 w-[257px] max-sm:text-xl max-sm:h-[50px] max-sm:w-[200px]"
      aria-label={text}
    >
      {text}
    </button>
  );
};
