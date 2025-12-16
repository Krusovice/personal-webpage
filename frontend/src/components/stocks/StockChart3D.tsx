// StockChart3D.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line, Text } from "@react-three/drei";
import styling from "./../../styles/stocks/StocksStyling.module.css";
import type { FormattedStockData, Point3 } from "./types";

type StockDataProps = {
  formattedStockData: FormattedStockData;
}

function createStockGraphs(
  formattedStockData: FormattedStockData
  ) {
  const stockGraphs: React.ReactElement[] = [];

  Object.entries(formattedStockData.tickerData).forEach(([ticker, data]) => {
    const { dates, values, color } = data;
    const xValues = dates.map((date) => (date - formattedStockData.xMin)/formattedStockData.xRange);
    const yValues = values.map(() => 0);
    const zValues = values.map((value) => (value - formattedStockData.zMin)/formattedStockData.zRange);
    
    const points: Point3[] = xValues.map((x, i) => [x, yValues[i], zValues[i]]);
    stockGraphs.push(<Line key={ticker} points={points} dashed={false} color={color} />);
  });

  return stockGraphs;
}

// Z-axis, containing values
function zAxis(
  formattedStockData: FormattedStockData,
  numberOfTicks: number
  ) {
  const tickValuesObject = [];
  const zInc = formattedStockData.zRange/numberOfTicks;
  
  // Normalizing graph loc values, so theyre always between 0 and 1.
  const zMin_loc = 0;
  const zMax_loc = 1;
  const zInc_loc = (zMax_loc-zMin_loc)/numberOfTicks;

  // Line
  const linePoint_0: Point3 = [0,0,zMin_loc];
  const linePoint_1: Point3 = [0,0,zMax_loc];
  const line = <Line key="zAxis" points={[linePoint_0,linePoint_1]} dashed={false} />;

  // Labels
  for (let i = 0; i <= numberOfTicks; i++) {
    let tickValue_loc = zMin_loc + i*zInc_loc;
    let tickValue = formattedStockData.zMin + i*zInc;

    let linePoint_0: Point3 = [zMin_loc,0,tickValue_loc];
    let linePoint_1: Point3 = [zMax_loc,0,tickValue_loc];
    tickValuesObject.push(
      <Line key={"zAxis_grid_"+i} points={[linePoint_0,linePoint_1]} dashed={false} />
    );
    tickValuesObject.push(
      <Text key={"zLabel_"+i} position={[-0.06,0,tickValue_loc]} fontSize={0.05} rotation={[Math.PI / 2, 0, 0]}>
        {Number(tickValue.toFixed(2))}
      </Text>
    );   
  };

  return [line, ...tickValuesObject];
}

// X-axis, containing dates
function xAxis(
  formattedStockData: FormattedStockData,
  numberOfTicks: number,
  ) {
  const tickValuesObject = [];

  const xInc = formattedStockData.xRange/numberOfTicks;

  // Normalizing graph loc values, so theyre always between 0 and 1.
  const xMin_loc = 0;
  const xMax_loc = 1;

  // Line
  const linePoint_0: Point3 = [xMin_loc,0,0];
  const linePoint_1: Point3 = [xMax_loc,0,0];
  const line = <Line key="xAxis" points={[linePoint_0,linePoint_1]} dashed={false} />;

  // Labels
  for (let i = 0; i <= numberOfTicks; i++) {
    let value = i/numberOfTicks;

    let date_item = new Date(formattedStockData.xMin + i*xInc);
    let year = date_item.getFullYear();
    let month = String(date_item.getMonth() + 1).padStart(2, "0");
    let day = String(date_item.getDate()).padStart(2, "0");
    let formatted_date = `${year}-${month}-${day}`;

    let linePoint_0: Point3  = [value,0,xMin_loc];
    let linePoint_1: Point3  = [value,0,xMax_loc];
    tickValuesObject.push(
      <Line key={"xAxis_grid_"+i} points={[linePoint_0,linePoint_1]} dashed={false} />
    );

    tickValuesObject.push(
      <Text key={"xLabel_"+i} position={[value,0,-0.1]} fontSize={0.05} rotation={[Math.PI / 2, 0, Math.PI / 5]}>
        {formatted_date}
      </Text>
    );
  }

  return [line, ...tickValuesObject];
}

export default function StockChart3D({ formattedStockData }: StockDataProps) {
  
  const hasValidRange =
    Number.isFinite(formattedStockData.xMin) &&
    Number.isFinite(formattedStockData.xMax) &&
    Number.isFinite(formattedStockData.zMin) &&
    Number.isFinite(formattedStockData.zMax) &&
    formattedStockData.xMin < formattedStockData.xMax &&
    formattedStockData.zMin < formattedStockData.zMax;

  return (
    <div className={styling.plotArea}>
      <Canvas 
        camera={{
          position: [0.5,-3,0.5],
          fov: 30,
          up: [0, 0, 1]
        }}
      >

        <OrbitControls target={[0.5,0.5,0.5]}/>
        {hasValidRange && (
          <>
            {xAxis(formattedStockData, 6)}
            {zAxis(formattedStockData, 5)}
            {createStockGraphs(formattedStockData)}
          </>
        )}

      </Canvas>
    </div>
  );
}
