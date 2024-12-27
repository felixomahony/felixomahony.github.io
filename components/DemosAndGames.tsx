import Card from "./Card";
import Article from "./Article";

export default function ResearchWork({
  setShowOverlay,
}: {
  setShowOverlay: (showOverlay: boolean) => void;
}) {
  return (
    <Card title={"Demos & Games"} setShowOverlay={setShowOverlay}>
      <div className="mt-2" />
      <Article
        title="Camera Matrix"
        date="October 2024"
        link="https://felixomahony.github.io/camera-matrix"
      >
        A visualisation of how the camera matrix works in computer vision.
        Introduces the concept of the camera matrix and how it can be broken
        down into intrinsic and extrinsic components.
      </Article>
    </Card>
  );
}
