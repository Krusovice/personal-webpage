
export default function StocksDocs() {
  return(
    <>
      <h2>The Stocks App Documentation</h2>
      <p>The stocks app is a tool for evaluating and comparing stock prices and stock price increments.</p>

      <p>Stocks can be selected to view their price or relative change. Multiple stocks can be selected, 
        so their relative changes can easily be compared.</p>

      <p>Only a selection of stocks and indexes are available for analyzing.</p>

      <h3>Daily Batch Data Fetching</h3>
      <p>The stocks data is fetched daily from yahoo finance, using an Airflow dag.</p>

      <h3>Data Processing</h3>
      <p>When a stock is added to be stock view list, an SQL query is sent to the backend, fetching all data for the selected stocks.
        With all data fetched to the browser, modifying viewing options can be done without requesting additional information from the backend, 
        keeping updating speed and providing a more fluent user experience.</p>
      

      <h3>Graph Rendering</h3>
      <p>The graph is rendered using three.js. As the rendering would have been significantly easier using a framework like D3,
        I thought it would be more fun learning three.js. 
        That is the reason, and therefore, the graph can be rotated in a 3D space without it really adds anything to the user.</p>
      <p>Rendering it in three.js, does mean that no premade graph features has been applied.
        Thus, functions for creating axes and labels are, evaluting their positions and values have been created and applied with javascript.</p>
    </>
  )
}