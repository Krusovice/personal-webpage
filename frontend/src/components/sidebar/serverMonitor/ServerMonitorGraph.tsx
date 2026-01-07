import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line, Text } from "@react-three/drei";

export type Point3 = [number, number, number];

export default function ServerMonitorGraph() {

  function xAxis() {
    const linePoint_0: Point3 = [-1,0,0];
    const linePoint_1: Point3 = [1,0,0];
    const line = <Line key="xAxis" points={[linePoint_0,linePoint_1]} dashed={false} />;
    return line
  }

  function yAxis() {
    const linePoint_0: Point3 = [0,0,0];
    const linePoint_1: Point3 = [-1,0,1];
    const line = <Line key="yAxis" points={[linePoint_0,linePoint_1]} dashed={false} />;
    return line
  }



  return(
    <Canvas 
      camera={{
        position: [0.5,-1,0],
        fov: 10,
        up: [0, 0, 1]
      }}
    >
      {xAxis()}
      {yAxis()}
    </Canvas>
    )
}