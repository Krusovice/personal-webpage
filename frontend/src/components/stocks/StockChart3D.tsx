// StockChart3D.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line, Text } from "@react-three/drei";
import styling from "./../../styles/stocks/StocksStyling.module.css";
import type { StockData, PlotSettings } from "../../types/stocks";

type StockDataProps = {
  stockData: StockData[];
  plotSettings: PlotSettings; 
}

// Normalized values to be plotted
function formatStockData(stockData, plotSettings) {
  let stockGraphs = [];
  let formattedStockData = {};
  let tickerList = [];
  
  stockData.forEach((obj) => {
    if (!(obj.ticker in formattedStockData)) {
      formattedStockData[obj.ticker] = {
        dates: [],
        values: [],
      };
      tickerList.push(obj.ticker);
    }

    formattedStockData[obj.ticker].dates.push(new Date(obj.date).getTime());
    formattedStockData[obj.ticker].values.push(obj.closing_price);
  });

  if (plotSettings.relativeValues) {
    Object.entries(formattedStockData).forEach(([ticker, data]) => {
      data.values = data.values.map((v) => v / data.values[0]);
    });
  }

  formattedStockData["xMin"] = Math.min(...stockData.map((obj) => new Date(obj.date).getTime()));
  formattedStockData["xMax"] = Math.max(...stockData.map((obj) => new Date(obj.date).getTime()));
  let zValues = [];

  Object.entries(formattedStockData).forEach(([key, data]) => {
    if (tickerList.includes(key)) {
      zValues.push(...data.values);
    }
  });

  formattedStockData["zMin"] = Math.min(...zValues);
  formattedStockData["zMax"] = Math.max(...zValues);

  formattedStockData["xRange"] = formattedStockData.xMax - formattedStockData.xMin || 1;
  formattedStockData["zRange"] = formattedStockData.zMax - formattedStockData.zMin || 1;

return formattedStockData;
}

function createStockGraphs(formattedStockData) {
  const stockGraphs = [];
  const metaKeys = ["xMin", "xMax", "zMin", "zMax", "xRange", "zRange"];

  Object.entries(formattedStockData).forEach(([ticker, data]) => {
    if (metaKeys.includes(ticker)) {
      return;
    }

    const { dates, values } = data;
    const xValues = dates.map((date) => (date - formattedStockData.xMin)/formattedStockData.xRange);
    const yValues = values.map(() => 0);
    const zValues = values.map((value) => (value - formattedStockData.zMin)/formattedStockData.zRange);
    
    const points = xValues.map((x, i) => [x, yValues[i], zValues[i]]);
    stockGraphs.push(<Line key={ticker} points={points} dashed={false} />);
  });

  return stockGraphs;
}


// Z-axis, containing values
function zAxis(formattedStockData, numberOfTicks) {
  const tickValuesObject = [];
  const zInc = formattedStockData.zRange/numberOfTicks;
  
  // Normalizing graph loc values, so theyre always between 0 and 1.
  const zMin_loc = 0;
  const zMax_loc = 1;
  const zInc_loc = (zMax_loc-zMin_loc)/numberOfTicks;

  // Line
  const linePoint_0 = [0,0,zMin_loc];
  const linePoint_1 = [0,0,zMax_loc];
  const line = <Line key="zAxis" points={[linePoint_0,linePoint_1]} dashed={false} />;

  // Labels
  for (let i = 0; i <= numberOfTicks; i++) {
    let tickValue_loc = zMin_loc + i*zInc_loc;
    let tickValue = formattedStockData.zMin + i*zInc;

    let linePoint_0 = [zMin_loc,0,tickValue_loc];
    let linePoint_1 = [zMax_loc,0,tickValue_loc];
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
function xAxis(formattedStockData, numberOfTicks) {
  const tickValuesObject = [];

  const xInc = formattedStockData.xRange/numberOfTicks;

  // Normalizing graph loc values, so theyre always between 0 and 1.
  const xMin_loc = 0;
  const xMax_loc = 1;
  const xInc_loc = (xMax_loc-xMin_loc)/numberOfTicks;

  // Line
  const linePoint_0 = [xMin_loc,0,0];
  const linePoint_1 = [xMax_loc,0,0];
  const line = <Line key="xAxis" points={[linePoint_0,linePoint_1]} dashed={false} />;

  // Labels
  for (let i = 0; i <= numberOfTicks; i++) {
    let value = i/numberOfTicks;

    let date_item = new Date(formattedStockData.xMin + value*xInc);
    let year = date_item.getFullYear();
    let month = String(date_item.getMonth() + 1).padStart(2, "0");
    let day = String(date_item.getDate()).padStart(2, "0");
    let formatted_date = `${year}-${month}-${day}`; // "2025-12-08"

    let linePoint_0 = [value,0,xMin_loc];
    let linePoint_1 = [value,0,xMax_loc];
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



export default function StockChart3D({ stockData, plotSettings }: StockDataProps) {
  const formattedStockData = formatStockData(stockData, plotSettings);

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

        {xAxis(formattedStockData, 5)}
        {zAxis(formattedStockData, 5)}
        {createStockGraphs(formattedStockData)}


      </Canvas>
    </div>
  );
}
