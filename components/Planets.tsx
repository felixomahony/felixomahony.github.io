import TextInput from "../components/TextInput";
import PlanetDiagram from "../components/PlanetDiagram";

import word_dict from "../planets/word_dict.json";

interface WordDict {
  [key: string]: number[];
}

const typedWordDict: WordDict = word_dict;

import React, { useState, useEffect } from "react";

export default function Planets() {
  const [guesses, setGuesses] = useState<WordDict>({});
  const [correctAnswer, setCorrectAnswer] = useState<string>("");

  const chooseRandomWord = () => {
    const length: number = Object.keys(word_dict).length;
    const randomIndex: number = Math.floor(Math.random() * length);
    return Object.keys(word_dict)[randomIndex];
  };

  const logDistance = (guess: string) => {
    let dot_product: number = 0;
    let magnitude_a: number = 0;
    let magnitude_b: number = 0;
    for (let i = 0; i < typedWordDict[correctAnswer].length; i++) {
      dot_product += typedWordDict[correctAnswer][i] * typedWordDict[guess][i];
      magnitude_a += typedWordDict[correctAnswer][i] ** 2;
      magnitude_b += typedWordDict[guess][i] ** 2;
    }
    const distance =
      dot_product / (Math.sqrt(magnitude_a) * Math.sqrt(magnitude_b));
  };

  const guessSubmitted = (guess: string) => {
    const guess_values: number[] = typedWordDict[guess];
    setGuesses((prevGuesses) => {
      return { ...prevGuesses, [guess]: guess_values };
    });
    logDistance(guess);
  };

  useEffect(() => {
    const randomWord = chooseRandomWord();
    console.log(randomWord);
    setCorrectAnswer(randomWord);
    const randomGuess1 = chooseRandomWord();
    const randomGuess2 = chooseRandomWord();
    const randomGuess3 = chooseRandomWord();
    setGuesses({
      [randomGuess1]: typedWordDict[randomGuess1],
      [randomGuess2]: typedWordDict[randomGuess2],
      [randomGuess3]: typedWordDict[randomGuess3],
    });
  }, []);

  return (
    <div className="bg-[url('/game_bg.png')]  bg-cover bg-center w-screen h-screen relative">
      <div className="absolute top-0">
        <PlanetDiagram
          guesses={guesses}
          correctAnswer={correctAnswer}
          correctAnswerValues={typedWordDict[correctAnswer]}
        />
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <TextInput guessSubmitted={guessSubmitted} />
      </div>
    </div>
  );
}
