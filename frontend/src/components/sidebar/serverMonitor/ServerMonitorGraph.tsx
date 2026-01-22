import { useLayoutEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import  { useState, useEffect } from "react";

export type Point3 = [number, number, number];

// Function to make sure that the graph fits its container
function FitOrthoToUnitSquare() {
  const { camera, size } = useThree();
  const center = new THREE.Vector3(0.5, 0, 0.5);

  useLayoutEffect(() => {
    const cam = camera as THREE.OrthographicCamera;

    // World-space size you want visible:
    const worldW = 1; // x: 0..1
    const worldH = 1; // z: 0..1 (mapped to screen vertical via up vector)

    // Padding in pixels
    const padPx = 10;

    const usableW = Math.max(1, size.width - 2 * padPx);
    const usableH = Math.max(1, size.height - 2 * padPx);

    // Choose zoom so BOTH dimensions fit (take the limiting one)
    const zoomX = usableW / worldW;
    const zoomY = usableH / worldH;
    cam.zoom = Math.min(zoomX, zoomY);

    // Ensure a stable "2D" orientation looking down onto XZ
    cam.position.set(0.5, -5, 0.5);
    cam.up.set(0, 0, 1);        // makes +Z go "up" on screen (flip sign if you prefer)
    cam.lookAt(center);

    cam.updateProjectionMatrix();
  }, [camera, size.width, size.height]);

  return null;
}

// Websocket connection, to update graph points
const ws = new WebSocket("ws://localhost:8010/ws/metrics");

export default function ServerMonitorGraph() {
  const [monitorData, setMonitorData] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8010/ws/metrics");

    ws.onmessage = (e) => {
      setMonitorData(e.data);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error", err);
    };

    return () => {
      ws.close();
    };
  }, []);

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


/*
  function monitorData(monitorData, cpuData, ramData) {
    cpuData.push(monitorData.cpu);
    cpuData = cpuData.slice(0,3600);
    ramData.push(monitorData.ram);
    ramData = ramData.slice(0,3600);
    return();
  }
*/
  return(
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 8,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          fontSize: 14,
          fontWeight: 600,
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        Server monitor (CPU / RAM)
      </div>

      <Canvas 
        orthographic
        camera={{
          near: 0.1, far: 1000
        }}
      >
      <FitOrthoToUnitSquare />
      {xAxis()}
      {zAxis()}

      {/* Title overlay */}
      </Canvas>
    </div>
    )
}