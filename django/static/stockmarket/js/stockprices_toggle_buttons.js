export function renderToggleButtons(tickerGroups) {
    const color = d3.scaleOrdinal(d3.schemeCategory10);  // Use same color scale as in the main plot

    const controls = d3.select("#toggle-buttons-container");

    tickerGroups.forEach((_, ticker, index) => {
        const button = controls.append("button")
            .text(ticker)
            .style("width", "110px")
            .style("margin-right", "10px")
            .style("margin-bottom", "2px")
            .style("display", "flex")
            .style("flex-direction", "column")
            .style("align-items", "center")
            .style("padding", "4px 8px")
            .style("border", "1px solid #ccc");

        // Add colored line below the text
        button.append("div")
            .style("width", "100%")
            .style("height", "4px")
            .style("margin-top", "4px")
            .style("background-color", color(ticker));
        
        // Toggle functionality
        button.on("click", function () {
            const path = d3.select(`.line-${ticker}`);
            const isHidden = path.style("display") === "none";
            path.style("display", isHidden ? null : "none");
        });
    });
}