import React, { useState, useEffect } from "react";

const PCA = require("pca-js");

interface WordDict {
  [key: string]: number[];
}

interface PlanetDiagramProps {
  guesses: WordDict;
  correctAnswer: string;
  correctAnswerValues: number[];
}

export default function TextInput({
  guesses,
  correctAnswer,
  correctAnswerValues,
}: PlanetDiagramProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [wordLocs, setWordLocs] = useState<number[][]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setZoomLevel((prevZoomLevel) => {
        let newZoomLevel = prevZoomLevel;
        if (window.scrollY > 0) {
          newZoomLevel = prevZoomLevel + 0.01;
        } else {
          newZoomLevel = prevZoomLevel - 0.01;
        }
        return newZoomLevel;
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const calculateWordLocs = () => {
    if (Object.keys(guesses).length > 0) {
      var wordValues: number[][] = Object.values(guesses);
      wordValues.push(correctAnswerValues);
      var vectors = PCA.getEigenVectors(wordValues);
      const firstData = PCA.computeAdjustedData(
        wordValues,
        vectors[0]
      ).adjustedData;
      const secondData = PCA.computeAdjustedData(
        wordValues,
        vectors[1]
      ).adjustedData;

      const newWordLocs: number[][] = [];
      const correctData = [
        firstData[0][firstData[0].length - 1],
        secondData[0][secondData[0].length - 1],
      ];
      for (let i = 0; i < firstData[0].length - 1; i++) {
        newWordLocs.push([
          firstData[0][i] - correctData[0],
          secondData[0][i] - correctData[1],
        ]);
      }
      setWordLocs(newWordLocs);
    }
  };

  useEffect(() => {
    calculateWordLocs();
  }, [guesses]);

  return (
    <div className="h-screen w-screen relative">
      <div className="absolute bg-[url('/moon_bg.png')] bg-cover bg-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full top-" />
      {Object.keys(guesses).map((guess, index) =>
        index < wordLocs.length ? (
          <div
            key={index}
            className="absolute p-2 rounded-lg bg-white text-black"
            style={{
              backgroundColor:
                guess == correctAnswer
                  ? "rgba(50, 255, 80, 1.0)"
                  : "rgba(255, 255, 255, 0.8)",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) translate(${
                wordLocs[index][0] * 2 * zoomLevel
              }rem, ${wordLocs[index][1] * 2 * zoomLevel}rem)`,
            }}
          >
            {guess}
          </div>
        ) : null
      )}
    </div>
  );
}
