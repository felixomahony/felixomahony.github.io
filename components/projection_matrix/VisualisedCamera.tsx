import { Vector3 } from "three";
import * as THREE from "three";
import { getCameraPoints } from "../../scripts/rotation";

const cameraPoints: number[][] = getCameraPoints([
  [0.889, -0.168, 0.426, 3.55],
  [0.458, 0.356, -0.814, -6.11],
  [-0.015, 0.919, 0.394, 3.1],
  [0.0, 0.0, 0.0, 1.0],
]);

interface VisualisedCameraProps {
  cameraPosition: number[];
  x_idx: number;
  y_idx: number;
}
export default function VisualisedCamera({
  cameraPosition,
  x_idx,
  y_idx,
}: VisualisedCameraProps) {
  const cameraFace = [
    new THREE.Vector3(cameraPoints[1][x_idx], cameraPoints[1][y_idx], 0),
    new THREE.Vector3(cameraPoints[2][x_idx], cameraPoints[2][y_idx], 0),
    new THREE.Vector3(cameraPoints[2][x_idx], cameraPoints[2][y_idx], 0),
    new THREE.Vector3(cameraPoints[3][x_idx], cameraPoints[3][y_idx], 0),
    new THREE.Vector3(cameraPoints[3][x_idx], cameraPoints[3][y_idx], 0),
    new THREE.Vector3(cameraPoints[4][x_idx], cameraPoints[4][y_idx], 0),
    new THREE.Vector3(cameraPoints[4][x_idx], cameraPoints[4][y_idx], 0),
    new THREE.Vector3(cameraPoints[1][x_idx], cameraPoints[1][y_idx], 0),
  ];

  const rightFace = [
    new THREE.Vector3(cameraPoints[0][x_idx], cameraPoints[0][y_idx], 0),
    new THREE.Vector3(cameraPoints[1][x_idx], cameraPoints[1][y_idx], 0),
    new THREE.Vector3(cameraPoints[0][x_idx], cameraPoints[0][y_idx], 0),
    new THREE.Vector3(cameraPoints[2][x_idx], cameraPoints[2][y_idx], 0),
    new THREE.Vector3(cameraPoints[0][x_idx], cameraPoints[0][y_idx], 0),
    new THREE.Vector3(cameraPoints[3][x_idx], cameraPoints[3][y_idx], 0),
    new THREE.Vector3(cameraPoints[0][x_idx], cameraPoints[0][y_idx], 0),
    new THREE.Vector3(cameraPoints[4][x_idx], cameraPoints[4][y_idx], 0),
  ];

  const leftFace = [
    new THREE.Vector3(cameraPoints[0][x_idx], cameraPoints[0][y_idx], 0),
    new THREE.Vector3(cameraPoints[3][x_idx], cameraPoints[3][y_idx], 0),
    new THREE.Vector3(cameraPoints[4][x_idx], cameraPoints[4][y_idx], 0),
    new THREE.Vector3(cameraPoints[3][x_idx], cameraPoints[3][y_idx], 0),
    new THREE.Vector3(cameraPoints[0][x_idx], cameraPoints[0][y_idx], 0),
  ];

  const lineGeometryCameraFace = new THREE.BufferGeometry().setFromPoints(
    cameraFace
  );
  const lineGeometryRightFace = new THREE.BufferGeometry().setFromPoints(
    rightFace
  );
  const lineGeometryLeftFace = new THREE.BufferGeometry().setFromPoints(
    leftFace
  );

  return (
    <group>
      <lineSegments>
        <primitive object={lineGeometryCameraFace} attach="geometry" />
        <lineBasicMaterial color="black" />
      </lineSegments>
      {/* {/* <lineSegments>
        <primitive object={lineGeometryLeftFace} attach="geometry" />
        <lineBasicMaterial color="black" />
      </lineSegments> */}
      <lineSegments>
        <primitive object={lineGeometryRightFace} attach="geometry" />
        <lineBasicMaterial color="black" />
      </lineSegments>
    </group>
  );
}
