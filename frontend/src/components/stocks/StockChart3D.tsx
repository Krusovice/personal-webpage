// StockChart3D.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line, Text } from "@react-three/drei";

// Simple data type: just a label for the date and a close value
type SimplePricePoint = {
  date: string;
  close: number;
};

// Mock data
const mockData: SimplePricePoint[] = [
  { date: "2025-12-03", close: 100 },
  { date: "2025-12-04", close: 105 },
  { date: "2025-12-07", close: 102 },
  { date: "2025-12-08", close: 110 },
  { date: "2025-12-12", close: 108 },
];

// Functions
// Graph plot values are normalized between 0 and 1.

// Normalized values to be plotted
function buildPointsFromData(data) {
  const points = [];
  const xValues = [];
  const zValues = [];

  if (!data.length) {
    return points;
  }

  // collect raw x (time) and z (close) values
  data.forEach((point) => {
    xValues.push(new Date(point.date).getTime());
    zValues.push(point.close);
  });

  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const zMin = Math.min(...zValues);
  const zMax = Math.max(...zValues);

  const xRange = xMax - xMin || 1;
  const zRange = zMax - zMin || 1;

  data.forEach((point) => {
    const xValue = new Date(point.date).getTime();
    const xNorm = (xValue - xMin) / xRange;
    const y = 0;
    const zValue = point.close;
    const zNorm = (zValue - zMin) / zRange;

    points.push([xNorm, y, zNorm]);
  });

  return points;
}


// Z-axis, containing values
function zAxis(data, numberOfTicks) {
  const tickValuesObject = [];
  const zValues = [];

  data.forEach((point) => {
    zValues.push(point.close);
  });

  const zMin = Math.min(...zValues);
  const zMax = Math.max(...zValues);
  const zInc = (zMax-zMin)/numberOfTicks;
  
  // Normalizing graph loc values, so theyre always between 0 and 1.
  // For proper text sizing.
  const zMin_loc = 0;
  const zMax_loc = 1;
  const zInc_loc = (zMax_loc-zMin_loc)/numberOfTicks;

  // Line
  const linePoint_0 = [0,0,zMin_loc];
  const linePoint_1 = [0,0,zMax_loc];
  const line = <Line points={[linePoint_0,linePoint_1]} dashed={false} />;

  // Labels
  for (let i = 0; i < numberOfTicks; i++) {
    let tickValue_loc = zMin_loc + i*zInc_loc;
    let tickValue = zMin + i*zInc;

    tickValuesObject.push(
      <Text position={[0,0,tickValue_loc]} fontSize={0.05} rotation={[-Math.PI / 2, 0, 0]}>
        {tickValue}
      </Text>
    );
  };

  return [line, ...tickValuesObject];
}

// X-axis, containing dates
function xAxis(data, numberOfTicks) {
  const tickValues = [];
  const tickValuesObject = [];
  const x = [];
  const xText = [];

  data.forEach((point) => {
    x.push( Date(point.date).getTime() );
    xText.push( point.date );



  });



  const zMin = Math.min(...z);
  const zMax = Math.max(...z);
  const zInc = (zMax-zMin)/numberOfTicks;

  // Line
  const linePoint_0 = [0,0,zMin];
  const linePoint_1 = [0,0,zMax];
  const line = <Line points={[linePoint_0,linePoint_1]} dashed={false} />;
  
  // Labels
  for (let i = 0; i < numberOfTicks; i++) {
    let value = zMin + i*zInc;
    tickValues.push(value);
  }
  tickValues.forEach((value) => {
    tickValuesObject.push(
      <Text position={[0,0,value]} fontSize={0.1} rotation={[-Math.PI / 2, 0, 0]}>
        {value}
      </Text>
    );
  });

  return (
    [line,
    tickValuesObject]
  )


}



export default function StockChart3D() {
  // Convert mockData into 3D points for the Line
  const points = buildPointsFromData(mockData);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Canvas camera={{ position: [0.5,2,0.5], fov: 50 }}>

        {/* mouse control: rotate, pan, zoom */}
        <OrbitControls target={[0.5,0.5,0.5]}/>

        {zAxis(mockData, 10)}

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
