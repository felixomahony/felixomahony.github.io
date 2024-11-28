"use client"; // Add this directive at the top
import { Yeseva_One, Calistoga } from "next/font/google";

interface ArticleProps {
  image: string;
  bodytext: string;
  title: string;
  date: string;
  link: string;
}

export default function Article({
  image,
  bodytext,
  title,
  date,
  link,
}: ArticleProps) {
  return (
    <div className="flex flex-col h-full border-t ">
      <h1 className={`font-bold mt-2 text-teal-950`}>{title}</h1>
      <h1 className={`italic mb-2 text-teal-950`}>{date}</h1>
      <img src={image} alt="profile" className="mb-2 max-h-48 object-contain" />
      <p className="text-black mb-2">{bodytext}</p>
      <a
        href={link}
        target="_blank"
        className="flex items-center text-blue-600 hover:underline font-semibold mb-4"
      >
        ➔ Read Article
      </a>
    </div>
  );
}
