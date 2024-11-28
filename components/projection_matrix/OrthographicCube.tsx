import { Vector3 } from "three";
import * as THREE from "three";

interface OrthographicCubeProps {
  position: number[];
  x_idx: number;
  y_idx: number;
  color: string;
}
export default function OrthographicCube({
  position,
  x_idx,
  y_idx,
  color,
}: OrthographicCubeProps) {
  const positionProjected = new THREE.Vector3(
    position[x_idx],
    position[y_idx],
    0
  );
  return (
    <mesh position={positionProjected}>
      <planeGeometry args={[2, 2]} /> {/* Width and Height of the square */}
      <meshBasicMaterial color={color} />
    </mesh>
  );
}
