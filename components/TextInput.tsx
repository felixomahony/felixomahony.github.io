import React, { useState } from "react";

import word_dict from "../planets/word_dict.json";

interface TextInputProps {
  guessSubmitted?: (arg0: string) => void;
}

export default function TextInput({ guessSubmitted }: TextInputProps) {
  const [text, setText] = useState("");
  const [possibleWords, setPossibleWords] = useState<string[]>([]);

  const updateWord = (word: string) => {
    setText(word);
    setPossibleWords([]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    if (event.target.value === "") {
      setPossibleWords([]);
      return;
    }

    let possibleWords_: string[] = [];
    for (const word of Object.keys(word_dict)) {
      if (word.startsWith(event.target.value)) {
        possibleWords_.push(word);
      }
    }
    setPossibleWords(possibleWords_);
  };

  const submitGuess = (word: string) => {
    guessSubmitted && guessSubmitted(word);
    setText("");
    setPossibleWords([]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      submitGuess(text);
    }
  };

  return (
    <div className="flex flex-col justify-end  rounded-3xl overflow-hidden mb-4">
      <div className="flex flex-col mb-[-4rem]">
        {possibleWords.slice(0, 5).map((word, index) => (
          <button
            className="bg-slate-50 inline-block text-black p-2 text-xl border-b border-slate-200 text-left pl-4"
            key={index}
            onClick={() => submitGuess(word)}
          >
            {word}
          </button>
        ))}
        <div className="h-16 bg-slate-50"></div>
      </div>
      <div className="w-full pt-0">
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder=" ..."
          className="p-4 pl-6 shadow-lg text-black w-full text-2xl font-bold"
        />
      </div>
    </div>
  );
}
