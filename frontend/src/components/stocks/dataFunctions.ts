export function formatStockData(
  stockDataList: StockData[],
  plotSettings: PlotSettings
  ): FormattedStockData {
  const formattedStockData: FormattedStockData = {
    xMin: 0,
    xMax: 0,
    zMin: 0,
    zMax: 0,
    xRange: 0,
    zRange: 0,
    tickerData: {},
    fromDate: new Date(),
  };

  // Filtering the dates
  const today = new Date();
  let fromDate = new Date(today);

  if (plotSettings.timespan === "currentYear") {
    fromDate = new Date(today.getFullYear(), 0, 1);
  } else if (plotSettings.timespan === "lastYear") {
    fromDate.setDate(fromDate.getDate() - 365);
  } else if (plotSettings.timespan === "lastMonth") {
    fromDate.setDate(fromDate.getDate() - 30);
  } 

  formattedStockData.fromDate = fromDate;

  // Formatting stock data
  stockDataList.forEach((obj: StockData) => {
    // Checking if stockData key exists, otherwise create it
    if (!formattedStockData.tickerData[obj.ticker]) {
      formattedStockData.tickerData[obj.ticker] = { dates: [], values: [] };
    }

    // Storing the object date and closing price to the correct ticker key
    if (new Date(obj.date).getTime() >= fromDate.getTime()) {
      formattedStockData.tickerData[obj.ticker].dates.push(new Date(obj.date).getTime());
      formattedStockData.tickerData[obj.ticker].values.push(obj.closing_price);
    }
  });

  // Toggle Relative values
  if (plotSettings.relativeValues) {
    Object.entries(formattedStockData.tickerData).forEach(([_ticker, data]) => {
      data.values = data.values.map((v) => v / data.values[0]);
    });
  }

  // Finding min and max dates and values among all tickerData
  let xValues: number[] = [];
  let zValues: number[] = [];
  Object.entries(formattedStockData.tickerData).forEach(([_key, data]) => {
    xValues.push(...data.dates);
    zValues.push(...data.values);
  });

  formattedStockData.xMin = Math.min(...xValues);
  formattedStockData.xMax = Math.max(...xValues);
  formattedStockData.zMin = Math.min(...zValues);
  formattedStockData.zMax = Math.max(...zValues);

  formattedStockData.xRange = formattedStockData.xMax - formattedStockData.xMin || 1;
  formattedStockData.zRange = formattedStockData.zMax - formattedStockData.zMin || 1;

return formattedStockData;
}