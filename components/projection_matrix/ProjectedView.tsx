import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { projectPoints } from "../../scripts/rotation";
import { useState, useEffect } from "react";
import Quadrelateral from "./three_js/Quadrelateral";
import camera_extrinsics from "./camera_extrinsics.json";
import CameraFeatureSlider from "./CameraFeatureSlider";

const cubeVerts = [
  [1, 1, 1, 1, -1, -1, -1],
  [1, -1, -1, 1, 1, -1, -1],
  [1, 1, -1, -1, 1, 1, -1],
  [1, 1, 1, 1, 1, 1, 1],
];

export default function ProjectedView() {
  const [cameraExtrinsics, setCameraExtrinsics] =
    useState<number[][]>(camera_extrinsics);

  const [focalX, setFocalX] = useState(1920);
  const [focalY, setFocalY] = useState(1920);
  const [s, setS] = useState(0);
  const [cx, setCx] = useState(960);
  const [cy, setCy] = useState(720);

  const [cameraIntrinsics, setCameraIntrinsics] = useState<number[][]>([
    [1920, 0, 960],
    [0, 1920, 720],
    [0, 0, 1],
  ]);
  const [projectedCubeVerts, setProjectedCubeVerts] = useState<number[][]>(
    projectPoints(cubeVerts, cameraExtrinsics, cameraIntrinsics)
  );

  useEffect(() => {
    setProjectedCubeVerts(
      projectPoints(cubeVerts, cameraExtrinsics, cameraIntrinsics)
    );
  }, [cameraIntrinsics]);

  useEffect(() => {
    setCameraIntrinsics([
      [focalX, s, cx],
      [0, focalY, cy],
      [0, 0, 1],
    ]);
  }, [focalX, focalY, s, cx, cy]);

  return (
    <div className="flex flex-row">
      <div className="flex flex-col h-[18rem] mr-2">
        <CameraFeatureSlider
          feat={focalX}
          setFeat={setFocalX}
          title={"fx"}
          mn={500}
          mx={4000}
        />
        <CameraFeatureSlider
          feat={focalY}
          setFeat={setFocalY}
          title={"fy"}
          mn={500}
          mx={4000}
        />
        <CameraFeatureSlider
          feat={s}
          setFeat={setS}
          title={"s"}
          mn={-1920}
          mx={1920}
        />
        <CameraFeatureSlider
          feat={cx}
          setFeat={setCx}
          title={"cx"}
          mn={0}
          mx={1920}
        />
        <CameraFeatureSlider
          feat={cy}
          setFeat={setCy}
          title={"cy"}
          mn={0}
          mx={1440}
        />
      </div>
      <div className="w-[24rem] h-[18rem] mr-2 border border-solid border-black">
        <Canvas>
          <OrthographicCamera
            makeDefault
            position={[0, 0, 5]}
            zoom={1}
            left={0}
            right={1920}
            top={1440}
            bottom={0}
            near={0.1}
            far={1000}
          />
          <Quadrelateral
            projectedVerts={projectedCubeVerts}
            idxes={[0, 1, 2, 3]}
            color={"#042f2e"}
          />
          <Quadrelateral
            projectedVerts={projectedCubeVerts}
            idxes={[1, 2, 6, 5]}
            color={"#115e59"}
          />
          <Quadrelateral
            projectedVerts={projectedCubeVerts}
            idxes={[0, 1, 5, 4]}
            color={"#0d9488"}
          />
        </Canvas>
      </div>
    </div>
  );
}
