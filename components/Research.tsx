"use client"; // Add this directive at the top
import { Yeseva_One, Calistoga } from "next/font/google";
import Article from "./Article";

const calistoga = Calistoga({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Research() {
  return (
    <div className="p-16 flex flex-col h-full overflow-y-scroll">
      <h1
        className={`text-2xl font-bold mb-4 text-teal-950 ${calistoga.className}`}
      >
        Recent Projects & Work
      </h1>
      <Article
        image="/relight.gif"
        title="Joint Training for NeRF Style Transfer"
        bodytext="This project was undertaken for a final project as part of a Neural Rendering course at Princeton University.
        The project aimed to perform style transfer between two different NeRF scenes by jointly training two decoders to produce different outputs from the same latent code."
        date="June 2023"
        link="https://github.com/felixomahony/nerf-pytorch"
      />
    </div>
  );
}
