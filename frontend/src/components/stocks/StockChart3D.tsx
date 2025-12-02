// StockChart3D.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line, Grid } from "@react-three/drei";

// Simple data type: just a label for the date and a close value
type SimplePricePoint = {
  date: string;
  close: number;
};

// Mock data
const mockData: SimplePricePoint[] = [
  { date: "Day 1", close: 100 },
  { date: "Day 2", close: 105 },
  { date: "Day 3", close: 102 },
  { date: "Day 4", close: 110 },
  { date: "Day 5", close: 108 },
];

// Functions
// Data array to be plotted
function buildPointsFromData(data) {
  const points = [];

  data.forEach((point, index) => {
    const x = index;
    const y = 0;
    const z = point.close;

    points.push([x, y, z]);
  });

  return points;
}

// Center coordinate for orbiting
function centerOrbit(data) {
  const x = [];
  const z = [];

  data.forEach((point, index) => {
    x.push(index);
    z.push(point.close);
  });

  const xMin = Math.min(...x);
  const xMax = Math.max(...x);
  const zMin = Math.min(...z);
  const zMax = Math.max(...z);

  const xCenter = (xMin + xMax) / 2;
  const zCenter = (zMin + zMax) / 2;

  return [xCenter, 0, zCenter];
}

// X-axis, containing dates
// Z-axis, containing values



export default function StockChart3D() {
  // Convert mockData into 3D points for the Line
  const points = buildPointsFromData(mockData);
  const orbitCoord = centerOrbit(mockData);
  const cameraPosition = [...orbitCoord];
  cameraPosition[1] += 10;


  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Canvas camera={{ position: cameraPosition, fov: 50 }}>
        {/* some basic light so we can see things */}
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        {/* mouse control: rotate, pan, zoom */}
        <OrbitControls target={orbitCoord}/>

        {/* 🔹 Grid on the x-z plane */}
        <Grid
          args={[10, 10]}   // [size, divisions]
          position={orbitCoord}
          infiniteGrid={false}
        />

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
