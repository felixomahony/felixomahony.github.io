import InputSlider from "react-input-slider";

interface CameraFeatureSliderProps {
  feat: number;
  setFeat: React.Dispatch<React.SetStateAction<number>>;
  title: string;
  mn: number;
  mx: number;
}

export default function CameraFeatureSlider({
  feat,
  setFeat,
  title,
  mn,
  mx,
}: CameraFeatureSliderProps) {
  return (
    <div className="flex flex-row mb-2">
      <div className="ml-2 mr-2 text-black w-[3rem] flex justify-end">
        {title}
      </div>
      <div className="flex mt-2">
        <InputSlider
          axis="x"
          x={feat}
          xmin={mn}
          xmax={mx}
          onChange={({ x }) => setFeat(x)}
          styles={{
            track: {
              backgroundColor: "#aaa",
              height: 3,
              borderRadius: "0%",
            },
            active: {
              backgroundColor: "#000",
              borderRadius: "0%",
            },
            thumb: {
              width: 15,
              height: 15,
              backgroundColor: "#000",
              boxShadow: undefined,
            },
          }}
        />
      </div>
      <div className="flex ml-2 mr-2 text-black w-[3rem]">{feat}</div>
    </div>
  );
}
