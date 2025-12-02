// StockChart3D.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";

// Simple data type: just a label for the date and a close value
type SimplePricePoint = {
  date: string;
  close: number;
};

// Small mock dataset with 5 points
const mockData: SimplePricePoint[] = [
  { date: "Day 1", close: 100 },
  { date: "Day 2", close: 105 },
  { date: "Day 3", close: 102 },
  { date: "Day 4", close: 110 },
  { date: "Day 5", close: 108 },
];

export default function StockChart3D() {
  // Convert mockData into 3D points for the Line
  const points = mockData.map((point, index) => {
    // x = time (we just use the index 0,1,2,...)
    const x = index;

    // y = 0 so everything lies flat on the x-z "floor"
    const y = 0;

    // z = price, scaled down a bit so it fits nicely in the view
    const z = point.close / 20; // try changing this divider to see the effect

    return [x, y, z] as [number, number, number];
  });

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Canvas camera={{ position: [2, 4, 8], fov: 50 }}>
        {/* some basic light so we can see things */}
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        {/* mouse control: rotate, pan, zoom */}
        <OrbitControls />

        {/* our flat 3D line on the x-z plane */}
        <Line
          points={points}
          linewidth={2}  // you can remove this line if it causes issues
          dashed={false}
        />
      </Canvas>
    </div>
  );
}
