"use client"; // Add this directive at the top

import { useState } from "react";

interface SquareProps {
  clickable?: boolean;
  onclick?: () => void;
  clicked?: boolean;
  linearApprox?: number;
}

export default function Square({
  clickable = true,
  onclick,
  clicked = false,
  linearApprox = 0.0,
}: SquareProps) {
  const handleClick = () => {
    if (!clickable) return;
    onclick && onclick();
  };

  const numberToInteger = (num: number) => {
    switch (true) {
      case num < 0.2:
        return "bg-blue-200";
      case num < 0.3:
        return "bg-blue-300";
      case num < 0.4:
        return "bg-blue-400";
      case num < 0.5:
        return "bg-blue-500";
      case num < 0.6:
        return "bg-blue-600";
      case num < 0.7:
        return "bg-blue-700";
      case num < 0.8:
        return "bg-blue-800";
      default:
        return "bg-blue-800";
    }
  };

  const colorName = numberToInteger(linearApprox);
  const className = `h-8 w-8 border ${
    clickable ? (clicked ? "bg-teal-700" : "") : colorName
  } ${clickable ? "border-teal-800" : "border-blue-800"} `;

  return <div className={className} onClick={handleClick}></div>;
}
