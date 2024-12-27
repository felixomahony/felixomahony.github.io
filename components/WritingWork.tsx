import Card from "./Card";
import Article from "./Article";
import { useState, useEffect } from "react";
// get articles.json

export default function ResearchWork({
  setShowOverlay,
}: {
  setShowOverlay: (showOverlay: boolean) => void;
}) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch(
      "https://github.com/felixomahony/felixomahony.github.io/blob/main/public/articles.json"
    )
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

  return (
    <Card title={"Writing"} setShowOverlay={setShowOverlay}>
      <div className="mt-2" />
      {data.length > 0 ? (
        data.map((article: any) => (
          <Article title={article.title} date={""} link={article.link}>
            {article.description}
          </Article>
        ))
      ) : (
        <p>No articles found.</p>
      )}
    </Card>
  );
}
