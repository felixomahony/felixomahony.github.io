import Card from "./Card";

export default function ResearchWork({
  setShowOverlay,
}: {
  setShowOverlay: (showOverlay: boolean) => void;
}) {
  return (
    <Card title={"Research Work"} setShowOverlay={setShowOverlay}>
      <p className="text-slate-950">
        See my research work on my Google Scholar page.
      </p>
      <a
        href="https://scholar.google.com/citations?user=pGRdscoAAAAJ"
        className="flex items-center text-slate-800 underline"
      >
        Google Scholar
      </a>
    </Card>
  );
}
