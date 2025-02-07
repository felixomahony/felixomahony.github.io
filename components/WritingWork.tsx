import Card from "./Card";
import Article from "./Article";
import { useState, useEffect } from "react";
// get articles.json
import articlesData from "../public/articles.json";

export default function WritingWork({
  setShowOverlay,
}: {
  setShowOverlay: (showOverlay: boolean) => void;
}) {
  const articles = Array.isArray(articlesData.articles)
    ? articlesData.articles
    : [];

  return (
    <Card title={"Writing"} setShowOverlay={setShowOverlay}>
      <div className="mt-2" />
      {articles.map((article: any) => (
        <Article
          key={article.link}
          title={article.title}
          date={""}
          link={article.link}
          venue={article.venue}
        >
          {article.description}
        </Article>
      ))}
    </Card>
  );
}
