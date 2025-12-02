
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import { useMemo } from "react";


export default function StockChart3D({ data }: Props) {
  const points = useMemo(() => {
    if (!data.length) return [];

    const tMin = data[0].t;
    const tMax = data[data.length - 1].t;
    const pMin = Math.min(...data.map(d => d.close));
    const pMax = Math.max(...data.map(d => d.close));
    const vMax = Math.max(...data.map(d => d.volume ?? 0), 1);

    return data.map(d => {
      // normalize to [-1, 1] in each dimension
      const x = ((d.t - tMin) / (tMax - tMin || 1)) * 2 - 1;
      const y = ((d.close - pMin) / (pMax - pMin || 1)) * 2 - 1;
      const z = ((d.volume ?? 0) / vMax) * 2 - 1;
      return [x, y, z] as [number, number, number];
    });
  }, [data]);

  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
      <ambientLight />
      <pointLight position={[5, 5, 5]} />
      <OrbitControls />

      {/* center the chart a bit */}
      <group>
        {points.length > 1 && (
          <Line
            points={points}
            linewidth={2}  // needs WebGL2 / Line2 material, drei handles it
            dashed={false}
          />
        )}
      </group>
    </Canvas>
  );
}
