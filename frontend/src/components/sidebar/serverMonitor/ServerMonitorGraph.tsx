import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line, Text } from "@react-three/drei";
import * as THREE from "three";

export type Point3 = [number, number, number];

export default function ServerMonitorGraph() {
  const center = new THREE.Vector3(0.5, 0, 0.5);

  function xAxis() {
    const linePoint_0: Point3 = [0,0,0];
    const linePoint_1: Point3 = [1,0,0];
    const line = <Line key="xAxis" points={[linePoint_0,linePoint_1]} dashed={false} />;
    return line
  }

  function zAxis() {
    const linePoint_0: Point3 = [0,0,0];
    const linePoint_1: Point3 = [0,0,1];
    const line = <Line key="zAxis" points={[linePoint_0,linePoint_1]} dashed={false} />;
    return line
  }



  return(
    <Canvas 
      orthographic
      camera={{
        position: [0.5,-5,0.5],
        zoom: 200,
        near: 0.1,
        far: 1000,
        up: [0, 0, -1],
      }}
      onCreated={({ camera }) => {
        camera.lookAt(center);
        camera.updateProjectionMatrix();
      }}
    >
      {xAxis()}
      {zAxis()}
    </Canvas>
    )
}