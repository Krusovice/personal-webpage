import { renderToggleButtons } from './stockprices_toggle_buttons.js';

document.addEventListener("DOMContentLoaded", function () {
    // URL of your Django REST API endpoint (change if necessary)
    const apiUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:8000/stockmarket/api/stock_prices/' 
    : 'https://jkirstein.dk/stockmarket/api/stock_prices/';
    
    // Fetch the data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Process the data into a format that D3 can use
            const formattedData = data.map(d => ({
                date: d.date,
                ticker: cleanString(d.ticker),
                value: parseFloat(d.closing_price)
            }))

            // Grouping for each ticker
            const tickerGroups = d3.group(formattedData, d => d.ticker);

            tickerGroups.forEach((values, ticker) => {
                values.sort((a, b) => new Date(a.date) - new Date(b.date));

                const firstValue = values[0].value;

                values.forEach(d => {
                    d.value = d.value / firstValue;
                });
            });

            // Plotting
            plotGraph(tickerGroups);
        })
        .catch(error => {
            console.error('Error fetching stock prices:', error);
        });
});

const tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background", "white")
    .style("border", "1px solid black")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style("font-size", "12px");

function cleanString(string) {
    return string.replace(/[^a-zA-Z0-9_-]/g, "");
}

function plotGraph(tickerGroups) {
    const container = document.getElementById("chart-container");
    const width = container.clientWidth;
    const height = 500;
    const margin = { top: 60, right: 10, bottom: 60, left: 170 };

    const svg = d3.select("#chart-container").append("svg")
        .attr("width", width)
        .attr("height", height);

    const allData = Array.from(tickerGroups.values()).flat();
    const tickers = Array.from(tickerGroups.keys());

    const x = d3.scaleTime()
        .domain(d3.extent(allData, d => new Date(d.date)))
        .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
        .domain([
            d3.min(allData, d => d.value) - 0,
            d3.max(allData, d => d.value) + 0
        ])
        .range([height - margin.bottom, margin.top]);

    // Axes
    const xTicks = 10;
    const yTicks = 8;

    const xAxis = d3.axisBottom(x).ticks(xTicks).tickFormat(d3.timeFormat("%m-%d"));
    const yAxis = d3.axisLeft(y).ticks(yTicks);

    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-30)")
        .style("text-anchor", "end");

    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(yAxis);

    const xGrid = d3.axisBottom(x)
    .ticks(xTicks)
    .tickSize(-height + margin.top + margin.bottom)
    .tickFormat("");               // Hide labels

    svg.append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(xGrid)
        .lower();  // moves it to back of SVG stack

    const yGrid = d3.axisLeft(y)
    .ticks(yTicks)                      // Match your yAxis
    .tickSize(-width + margin.left + margin.right)
    .tickFormat("");

    svg.append("g")
        .attr("class", "grid")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(yGrid)
        .lower();  // moves it to back of SVG stack

    svg.selectAll(".grid line")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 1)
    .attr("shape-rendering", "crispEdges");

    svg.selectAll(".grid path")
        .attr("stroke-width", 0);

    // Labels
    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height)
        .text("Date");

    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", `translate(${-margin.left + 100}, ${height / 2}) rotate(-90)`)
        .text("Relative since Jan 1st");

    // title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", margin.top - 30)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Stock Prices by Ticker");


    const line = d3.line()
        .x(d => x(new Date(d.date)))
        .y(d => y(d.value));

    const color = d3.scaleOrdinal(d3.schemeCategory10);


    renderToggleButtons(tickerGroups);

    // Graphs
    tickerGroups.forEach((data, ticker) => {
    svg.append("path")
        .datum(data)
        .attr("class", `line line-${ticker}`)
        .attr("fill", "none")
        .attr("stroke", color(ticker))
        .attr("stroke-width", 2)
        .attr("d", line);
    });

    // Hovering effect
    tickerGroups.forEach((data, ticker) => {
    svg.selectAll(`.dot-${ticker}`)
        .data(data)
        .enter()
        .append("circle")
        .attr("class", `dot dot-${ticker}`)
        .attr("cx", d => x(new Date(d.date)))
        .attr("cy", d => y(d.value))
        .attr("r", 3)
        .attr("fill", "transparent")
        .attr("stroke", "transparent")
        .on("mouseover", function (event, d) {
            d3.select(this).attr("stroke", "black").attr("stroke-width", 3);
            tooltip.style("visibility", "visible")
                .text(`${d.ticker}, ${d.date}: ${d.value.toFixed(3)}`);
        })
        .on("mousemove", function (event) {
            tooltip
                .style("top", `${event.pageY - 10}px`)
                .style("left", `${event.pageX + 10}px`);
        })
        .on("mouseout", function () {
            d3.select(this).attr("stroke", "none");
            tooltip.style("visibility", "hidden");
        });
    });
}
