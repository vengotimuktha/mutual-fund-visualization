const width = 960;
const height = 600;

const svg = d3.select("#chart-container")
  .append("svg")
  .attr("viewBox", `0 0 ${width} ${height}`)
  .style("width", "100%")
  .style("height", "auto");

const tooltip = d3.select("#tooltip");
let originalGroup; // For reset
let originalTransform = "translate(0,0) scale(1,1)";

// Load and format data
d3.csv("task3_mutualfunds_cleaned.csv").then(data => {
  const totalAssets = d3.sum(data, d => +d["Total Assets"]);

  const color = d3.scaleSequential()
    .domain([0, d3.max(data, d => +d["Total Assets"])])
    .interpolator(d3.interpolateBlues);

  const hierarchyData = {
    name: "All Categories",
    children: data.map(d => ({
      name: d.Category,
      value: +d["Total Assets"],
      count: +d["Fund Count"],
      fill: color(+d["Total Assets"]),
      share: ((+d["Total Assets"]) / totalAssets * 100).toFixed(2)
    }))
  };

  const root = d3.hierarchy(hierarchyData).sum(d => d.value);

  d3.treemap().size([width, height]).padding(2)(root);

  const group = svg.append("g").attr("class", "treemap-group");
  originalGroup = group;

  const nodes = group.selectAll("g")
    .data(root.leaves())
    .enter()
    .append("g")
    .attr("transform", d => `translate(${d.x0},${d.y0})`)
    .on("click", zoomToNode)
    .on("mouseover", (event, d) => {
      tooltip.style("visibility", "visible")
        .html(`
          <strong>${d.data.name}</strong><br>
          Total Assets: $${d3.format(",")(d.data.value)}<br>
          Fund Count: ${d.data.count}<br>
          Share: ${d.data.share}%
        `);
    })
    .on("mousemove", event => {
      tooltip.style("top", `${event.pageY - 40}px`)
        .style("left", `${event.pageX + 10}px`);
    })
    .on("mouseout", () => tooltip.style("visibility", "hidden"));

  // nodes.append("rect")
    // .attr("width", d => d.x1 - d.x0)
    // .attr("height", d => d.y1 - d.y0)
    // .attr("fill", d => d.data.fill)
    // .attr("stroke", "#fff");

    nodes.append("text")
    .attr("x", 6)
    .attr("y", 16)
    .text(d => d.data.name)
    .style("font-size", "13px")
    .style("font-weight", "bold")
    .style("fill", d => {
      // Adjust text color based on block brightness
      const c = d3.color(d.data.fill);
      const brightness = c.r * 0.299 + c.g * 0.587 + c.b * 0.114;
      return brightness < 140 ? "#fff" : "#000";
    })
    .style("opacity", d => (d.x1 - d.x0 > 60 && d.y1 - d.y0 > 20) ? 1 : 0.9);
  
  // Legend
  const legendSvg = d3.select("#legend").append("svg")
    .attr("width", 220)
    .attr("height", 20);

  const defs = legendSvg.append("defs");
  const gradient = defs.append("linearGradient")
    .attr("id", "legendGradient");

  gradient.selectAll("stop")
    .data(d3.range(0, 1.01, 0.1))
    .enter()
    .append("stop")
    .attr("offset", d => `${d * 100}%`)
    .attr("stop-color", d => color(d * color.domain()[1]));

  legendSvg.append("rect")
    .attr("x", 0)
    .attr("width", 200)
    .attr("height", 10)
    .style("fill", "url(#legendGradient)");

  legendSvg.append("text")
    .attr("x", 0)
    .attr("y", 18)
    .attr("font-size", "10px")
    .text("$0");

  legendSvg.append("text")
    .attr("x", 200)
    .attr("y", 18)
    .attr("font-size", "10px")
    .attr("text-anchor", "end")
    .text("$" + d3.format(".2s")(color.domain()[1]));
});

// Zoom to selected block
function zoomToNode(event, d) {
  const scaleX = width / (d.x1 - d.x0);
  const scaleY = height / (d.y1 - d.y0);
  const scale = Math.min(scaleX, scaleY);

  const translateX = -d.x0 * scale;
  const translateY = -d.y0 * scale;

  svg.select(".treemap-group")
    .transition()
    .duration(500)
    .attr("transform", `translate(${translateX},${translateY}) scale(${scale})`);
}

// Reset
function resetZoom() {
  svg.select(".treemap-group")
    .transition()
    .duration(500)
    .attr("transform", originalTransform);
}


