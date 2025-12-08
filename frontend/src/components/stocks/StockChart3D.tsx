// StockChart3D.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line, Text } from "@react-three/drei";
import styling from "./../../styles/stocks/StocksStyling.module.css"
import type { StockData } from "../../types/stocks";

type StockDataProps = {
  stockData: StockData[];
}

// Normalized values to be plotted
function buildPointsFromData(stockData) {
  const points = [];
  const xValues = [];
  const zValues = [];

  if (!stockData.length) {
    return points;
  }

  // collect raw x (time) and z (close) values
  stockData.forEach((point) => {
    xValues.push(new Date(point.date).getTime());
    zValues.push(point.closing_price);
  });

  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const zMin = Math.min(...zValues);
  const zMax = Math.max(...zValues);

  const xRange = xMax - xMin || 1;
  const zRange = zMax - zMin || 1;

  stockData.forEach((point) => {
    const xValue = new Date(point.date).getTime();
    const xNorm = (xValue - xMin) / xRange;
    const y = 0;
    const zValue = point.closing_price;
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

    let linePoint_0 = [zMin_loc,0,tickValue_loc];
    let linePoint_1 = [zMax_loc,0,tickValue_loc];
    tickValuesObject.push(
      <Line points={[linePoint_0,linePoint_1]} dashed={false} />
    );
    tickValuesObject.push(
      <Text position={[-0.06,0,tickValue_loc]} fontSize={0.05} rotation={[Math.PI / 2, 0, 0]}>
        {tickValue}
      </Text>
    );   
  };

  return [line, ...tickValuesObject];
}


// X-axis, containing dates
function xAxis(data, numberOfTicks) {
  const tickValuesObject = [];
  const x = [];
  const xText = [];

  data.forEach((point) => {
    x.push( new Date(point.date).getTime() );
    xText.push( point.date );
  });

  const xMin = Math.min(...x);
  const xMax = Math.max(...x);
  const xInc = (xMax-xMin)/numberOfTicks;

  // Normalizing graph loc values, so theyre always between 0 and 1.
  const xMin_loc = 0;
  const xMax_loc = 1;
  const xInc_loc = (xMax_loc-xMin_loc)/numberOfTicks;

  // Line
  const linePoint_0 = [xMin_loc,0,0];
  const linePoint_1 = [xMax_loc,0,0];
  const line = <Line points={[linePoint_0,linePoint_1]} dashed={false} />;

  // Labels
  for (let i = 0; i < numberOfTicks; i++) {
    let value = i/numberOfTicks;
    let index = Math.round(value * (x.length - 1));

    let linePoint_0 = [value,0,xMin_loc];
    let linePoint_1 = [value,0,xMax_loc];
    tickValuesObject.push(
      <Line points={[linePoint_0,linePoint_1]} dashed={false} />
    );

    tickValuesObject.push(
      <Text position={[value,0,-0.1]} fontSize={0.05} rotation={[Math.PI / 2, 0, Math.PI / 5]}>
        {xText[index]}
      </Text>
    );
  }

  return [line, ...tickValuesObject];
}



export default function StockChart3D({ stockData }: StockDataProps) {
  // Convert mockData into 3D points for the Line
  const points = buildPointsFromData(stockData);

  return (
    <div className={styling.plotArea}>
      <Canvas camera={{
        position: [0.5,-3,0.5],
        fov: 30,
        up: [0, 0, 1]
      }}>

        <OrbitControls target={[0.5,0.5,0.5]}/>

        {xAxis(stockData, 5)}
        {zAxis(stockData, 10)}

        { points.length > 0 && (
          <Line
            points={points}
            linewidth={2}
            dashed={false}
          />
        )}
      </Canvas>
    </div>
  );
}
