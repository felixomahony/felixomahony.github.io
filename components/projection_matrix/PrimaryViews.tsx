import { OrthographicCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import VisualisedCamera from "./VisualisedCamera";
import OrthographicCube from "./OrthographicCube";

interface ProjectedCubeProps {
  side: string;
}

const ProjectedCube: React.FC<ProjectedCubeProps> = ({ side }) => {
  return (
    <mesh position={side == "top" ? [2, 0, 0] : [2, -1, 0]}>
      <planeGeometry args={[2, 2]} /> {/* Width and Height of the square */}
      <meshBasicMaterial color="skyblue" />
    </mesh>
  );
};

export default function PrimaryViews() {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col mr-2">
        <div className="w-[16rem] h-[12rem] border border-solid border-black">
          <Canvas>
            <OrthographicCamera
              makeDefault
              position={[0, 0, 5]}
              zoom={1}
              left={-8}
              right={8}
              top={6}
              bottom={-6}
              near={0.1}
              far={1000}
            />
            <OrthographicCube
              position={[0, 0, 0]}
              x_idx={0}
              y_idx={1}
              color={"slategray"}
            />
            <VisualisedCamera cameraPosition={[0, 0, 0]} x_idx={1} y_idx={0} />
          </Canvas>
        </div>
        <p className="text-black">
          <i>Top View</i>
        </p>
      </div>

      <div className="flex flex-col ml-2">
        <div className="w-[16rem] h-[12rem] border border-solid border-black">
          <Canvas>
            <OrthographicCamera
              makeDefault
              position={[0, 0, 5]}
              zoom={1}
              left={-8}
              right={8}
              top={6}
              bottom={-6}
              near={0.1}
              far={1000}
            />
            <OrthographicCube
              position={[0, 0, 0]}
              x_idx={0}
              y_idx={2}
              color={"slategray"}
            />
            <VisualisedCamera cameraPosition={[0, 0, 0]} x_idx={1} y_idx={2} />
          </Canvas>
        </div>
        <p className="text-black">
          <i>Side View</i>
        </p>
      </div>
    </div>
  );
}
