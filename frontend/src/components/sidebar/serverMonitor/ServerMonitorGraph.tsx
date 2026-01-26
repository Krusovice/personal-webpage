import { useLayoutEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import * as THREE from "three";
import  { useState, useEffect } from "react";

export type Point3 = [number, number, number];

type Metric = {
  cpu: number;
  ram: number;
};

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
    const padPx = 15;

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


export default function ServerMonitorGraph() {
  const [monitorData, setMonitorData] = useState<Metric[]>([]);

  useEffect(() => {
    const protocol = location.protocol === "https:" ? "wss" : "ws";
    const ws = new WebSocket(`${protocol}://${location.host}/ws/metrics`);

    ws.onopen = () => console.log("WebSocket connected");
    ws.onmessage = (e) => {
      const parsed = JSON.parse(e.data);
      setMonitorData(prev =>
        Array.isArray(parsed)
          ? parsed
          : [...prev.slice(-3599), parsed]
      );
    };
    ws.onerror = (err) => console.error("WebSocket error:", err);
    ws.onclose = (e) => console.log("WebSocket closed:", e.code, e.reason);

    return () => ws.close();
  }, []);

  function graph() {
    const data = monitorData.map((i, idx) => ({
      index: idx,
      cpu: i.cpu,
      ram: i.ram
    }));

    const pointsCpu = data.map((value, i) =>
      new THREE.Vector3(i / 3600, 0, value.cpu / 100)
    );

    const pointsRam = data.map((value, i) =>
      new THREE.Vector3(i / 3600, 0, value.ram / 100)
    );

    console.log(pointsCpu);
    if (pointsCpu.length < 2) return null;

    return (
      <>
        <Line
          points={pointsCpu}
          color="red"
          lineWidth={2}
        />
        <Line
          points={pointsRam}
          color="blue"
          lineWidth={2}
          transparent
          opacity={0.5}
        />
      </>
    );
  }

  function xAxis() {
    const linePoint_0: Point3 = [0,0,0];
    const linePoint_1: Point3 = [1,0,0];

    return(
      <>
        <Line
          key="xAxis"
          points={[linePoint_0, linePoint_1]}
          dashed={false}
        />

        <Text
          key="xLabel_1h"
          position={[1, 0, -0.05]}
          fontSize={0.10}
          rotation={[Math.PI / 2, 0, Math.PI / 5]}
        >
          1h
        </Text>

        <Text
          key="xLabel_now"
          position={[0, 0, -0.05]}
          fontSize={0.10}
          rotation={[Math.PI / 2, 0, Math.PI / 5]}
        >
          Now
        </Text>

      </>
    );
  }

  function zAxis() {
    const linePoint_0: Point3 = [0,0,0];
    const linePoint_1: Point3 = [0,0,1];

    return (
      <>
        <Line 
          key="zAxis"
          points={[linePoint_0,linePoint_1]}
          dashed={false}
        />

        <Text
          key="zLabel_100"
          position={[-0.2, 0, 1]}
          fontSize={0.10}
          rotation={[Math.PI / 2, 0, 0]}
        >
          100 %
        </Text>

        <Text
          key="zLabel_0"
          position={[-0.2, 0, 0]}
          fontSize={0.10}
          rotation={[Math.PI / 2, 0, 0]}
        >
          0 %
        </Text>

        <Text
          key="zLabel_50"
          position={[-0.2, 0, .5]}
          fontSize={0.10}
          rotation={[Math.PI / 2, 0, 0]}
        >
          50 %
        </Text>
      </>
    );


  }


  return(
    <div style={{ position: "relative", width: "100%", height: "100%"}}>
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
        style={{
          height: "100%",
          width: "100%",
        }}
        orthographic
        camera={{
          near: 0.1, far: 1000
        }}
      >
      <FitOrthoToUnitSquare />
      {xAxis()}
      {zAxis()}
      {graph()}

      {/* Title overlay */}
      </Canvas>
    </div>
    )
}