"use client"; // Add this directive at the top
import Square from "./Square";
import { Yeseva_One, Calistoga } from "next/font/google";

import { useState, useEffect } from "react";

// load weights.json and examples.json
import weights from "../model/weights.json";
import examples from "../model/examples.json";
import { randomInt } from "crypto";

const yeseva_one = Yeseva_One({
  subsets: ["latin"],
  weight: ["400"],
});

const calistoga = Calistoga({
  subsets: ["latin"],
  weight: ["400"],
});

const isClickable = (key: number) => {
  return !(key % 12 >= 4 && key % 12 < 8 && key / 12 >= 4 && key / 12 < 8);
};
const clickableMask = Array(144)
  .fill(0)
  .map((_, i) => isClickable(i));

export default function LinearMNIST() {
  // create an array of 122 elements, each of which is false
  const [clicked, setClicked] = useState(Array(144).fill(false));
  const [linearApprox, setLinearApprox] = useState(Array(16).fill(false));

  // function to handle the click event
  const keyClicked = (key: number) => {
    // create a new array with the same elements as clicked
    const newClicked = [...clicked];
    // toggle the value of the element at index key
    newClicked[key] = !newClicked[key];
    // set the state to the new array
    setClicked(newClicked);
    approxLinear(newClicked);
  };

  const approxLinear = (newclicked: boolean[]) => {
    // only copy values if they are true in the clickableMask
    const clickedValues: boolean[] = newclicked.filter(
      (_, i) => clickableMask[i]
    );
    const newLinearApprox = Array(144).fill(0);
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const ref_weight = weights[i * 4 + j];
        let sum = 0;
        for (let k = 0; k < 128; k++) {
          sum += ref_weight[k] * (clickedValues[k] ? 1 : -1);
        }
        newLinearApprox[(i + 4) * 12 + (j + 4)] = sum * 0.5 + 0.5;
      }
    }
    setLinearApprox(newLinearApprox);
  };

  const newExample = () => {
    const newIdx = Math.floor(Math.random() * examples.length);
    setClicked(examples[newIdx]);
    approxLinear(examples[newIdx]);
  };

  const clearSquares = () => {
    setClicked(Array(144).fill(false));
    setLinearApprox(Array(144).fill(0));
  };

  useEffect(() => {
    newExample();
  }, []);

  return (
    <div className="p-16 flex flex-col h-full">
      <h1
        className={`text-2xl font-bold mb-4 text-teal-950 ${calistoga.className}`}
      >
        Linear MNIST
      </h1>
      <p className="text-black">
        Click to draw the outer region of a digit in the{" "}
        <span className="bg-teal-100">green squares</span>. The{" "}
        <span className="bg-blue-100">blue squares</span> show a least squares
        approximation of the inner region of the digit, fit on the MNIST
        Dataset.
      </p>
      {/* A grid of 12 x 12 squares each one is a component of class Square */}
      <div className="grid grid-cols-12 w-96 h-96 mt-4 mb-4">
        {[...Array(12)].map((_, i) =>
          [...Array(12)].map((_, j) => (
            <Square
              linearApprox={linearApprox[i * 12 + j]}
              key={i * 12 + j}
              clickable={i >= 8 || i < 4 || j < 4 || j >= 8}
              onclick={() => keyClicked(i * 12 + j)}
              clicked={clicked[i * 12 + j]}
            />
          ))
        )}
      </div>
      <button
        className="flex items-center text-teal-950 underline"
        onClick={newExample}
      >
        New Random Example
      </button>
      <button
        className="flex items-center text-teal-950 underline"
        onClick={clearSquares}
      >
        Clear Squares
      </button>
      {/* <a href="#" className="flex items-center text-teal-950 underline">
        ➔ Find Out More
      </a> */}
    </div>
  );
}
