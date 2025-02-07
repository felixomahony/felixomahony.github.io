import Card from "./Card";
import Article from "./Article";
import researchData from "../public/research.json";

export default function ResearchWork({
  setShowOverlay,
}: {
  setShowOverlay: (showOverlay: boolean) => void;
}) {
  const articles = Array.isArray(researchData.articles)
    ? researchData.articles
    : [];

  return (
    <Card title={"Research Work"} setShowOverlay={setShowOverlay}>
      <p className="text-slate-950">
        A full list of publications can be found on my Google Scholar page.
      </p>
      <a
        href="https://scholar.google.com/citations?user=pGRdscoAAAAJ"
        className="flex items-center text-slate-800 underline"
      >
        Google Scholar
      </a>
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
