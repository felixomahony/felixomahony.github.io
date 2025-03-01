"use client"; // Add this directive at the top
import { Yeseva_One, Calistoga } from "next/font/google";

interface ArticleProps {
  children: React.ReactNode;
  title: string;
  date: string;
  link: string;
  venue?: string;
}

export default function Article({
  children,
  title,
  date,
  link,
  venue,
}: ArticleProps) {
  return (
    <div className="flex flex-col h-full border-t ">
      <div className="flex flex-row justify-between items-center">
        <h1 className={`font-bold mt-2 text-teal-950`}>{title}</h1>
        <h1 className={`italic mt-2 text-teal-950`}>{date}</h1>
      </div>
      <h1 className={`italic text-teal-950`}>{venue}</h1>
      <p className="text-black mb-1">{children}</p>
      <a
        href={link}
        target="_blank"
        className="flex items-center text-blue-600 hover:underline font-semibold mb-2"
      >
        ➔ More
      </a>
    </div>
  );
}
