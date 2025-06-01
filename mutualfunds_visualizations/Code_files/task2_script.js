const margin = { top: 40, right: 30, bottom: 60, left: 80 };
const width = 900 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const svg = d3.select("#scatter")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const tooltip = d3.select("#tooltip");
const returnSelect = document.getElementById("returnType");

let fullData;

// ✅ Updated: Load the full dataset with all return periods
d3.csv("task2_mutualfunds_cleaned.csv").then(data => {
  data.forEach(d => {
    d["Expense ratio"] = +d["Expense ratio"];
    d["3MO"] = +d["3MO"];
    d["YTD"] = +d["YTD"];
    d["1YR"] = +d["1YR"];
    d["3YR"] = +d["3YR"];
    d["5YR"] = +d["5YR"];
    d["10YR"] = +d["10YR"];
  });

  fullData = data;

  // Initial render
  updateChart("5YR");

  // Dropdown event listener
  returnSelect.addEventListener("change", () => {
    updateChart(returnSelect.value);
  });
});

function updateChart(returnKey) {
  svg.selectAll("*").remove(); // Clear previous chart

  // ✅ Filter only valid rows (non-zero, non-NaN)
  const filtered = fullData.filter(d => !isNaN(d[returnKey]) && d[returnKey] !== 0);

  const x = d3.scaleLinear()
    .domain([0, d3.max(filtered, d => d["Expense ratio"])])
    .range([0, width])
    .nice();

  const y = d3.scaleLinear()
    .domain([
      d3.min(filtered, d => d[returnKey]),
      d3.max(filtered, d => d[returnKey])
    ])
    .range([height, 0])
    .nice();

  const color = d3.scaleSequential()
    .domain([
      d3.min(filtered, d => d[returnKey]),
      d3.max(filtered, d => d[returnKey])
    ])
    .interpolator(d3.interpolateViridis);

  // X Axis
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .append("text")
    .attr("x", width / 2)
    .attr("y", 40)
    .attr("fill", "#000")
    .attr("text-anchor", "middle")
    .text("Expense Ratio");

  // Y Axis
  svg.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -50)
    .attr("fill", "#000")
    .attr("text-anchor", "middle")
    .text(`${returnKey} Return (%)`);

  // Dots
  svg.selectAll("circle")
    .data(filtered)
    .join("circle")
    .attr("cx", d => x(d["Expense ratio"]))
    .attr("cy", d => y(d[returnKey]))
    .attr("r", 5)
    .attr("fill", d => color(d[returnKey]))
    .on("mouseover", (event, d) => {
      tooltip.style("visibility", "visible")
        .html(`<strong>${d.Name}</strong><br>Expense Ratio: ${d["Expense ratio"]}%<br>${returnKey} Return: ${d[returnKey]}%`);
    })
    .on("mousemove", event => {
      tooltip.style("top", (event.pageY - 30) + "px")
        .style("left", (event.pageX + 10) + "px");
    })
    .on("mouseout", () => {
      tooltip.style("visibility", "hidden");
    });
}
