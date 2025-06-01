const margin = { top: 50, right: 20, bottom: 120, left: 60 };
const width = 900 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// ✅ Include full set of return periods
const timePeriods = ["3MO", "YTD", "1YR", "3YR", "5YR", "10YR"];
const color = d3.scaleOrdinal().domain(timePeriods).range(d3.schemeSet2);
const tooltip = d3.select("#tooltip");

let fullData;

d3.csv("task1_mutualfunds_cleaned.csv").then(data => {
  data.forEach(d => {
    timePeriods.forEach(tp => d[tp] = +d[tp]);
  });

  fullData = data.filter(d => !isNaN(d["5YR"])); // baseline filter
  updateChart("10", "5YR");
});

const fundSelect = document.getElementById("fundCount");
const sortSelect = document.getElementById("sortPeriod");

fundSelect.addEventListener("change", () => updateChart(fundSelect.value, sortSelect.value));
sortSelect.addEventListener("change", () => updateChart(fundSelect.value, sortSelect.value));

function updateChart(countOption, sortKey = "5YR") {
  d3.select("svg").remove();

  const numFunds = parseInt(countOption);
  const chartWidth = numFunds > 20 ? 1800 : width;

  const svg = d3.select("#chart")
    .append("svg")
    .attr("width", chartWidth + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  let data = [...fullData];
  data.sort((a, b) => b[sortKey] - a[sortKey]);
  data = data.slice(0, numFunds);

  const x0 = d3.scaleBand()
    .domain(data.map(d => d.Name))
    .range([0, chartWidth])
    .padding(0.2);

  const x1 = d3.scaleBand()
    .domain(timePeriods)
    .range([0, x0.bandwidth()])
    .padding(0.05);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d3.max(timePeriods, tp => d[tp]))])
    .nice()
    .range([height, 0]);

  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x0))
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end")
    .style("font-size", "10px");

  svg.append("g").call(d3.axisLeft(y));

  svg.selectAll("g.layer")
    .data(data)
    .join("g")
    .attr("transform", d => `translate(${x0(d.Name)},0)`)
    .selectAll("rect")
    .data(d => timePeriods.map(tp => ({ key: tp, value: d[tp], name: d.Name })))
    .join("rect")
    .attr("x", d => x1(d.key))
    .attr("y", d => y(d.value))
    .attr("width", x1.bandwidth())
    .attr("height", d => height - y(d.value))
    .attr("fill", d => color(d.key))
    .on("mouseover", (event, d) => {
      tooltip.style("visibility", "visible")
        .html(`<strong>${d.name}</strong><br>${d.key} Return: ${d.value}%`);
    })
    .on("mousemove", event => {
      tooltip.style("top", (event.pageY - 40) + "px")
        .style("left", (event.pageX + 10) + "px");
    })
    .on("mouseout", () => {
      tooltip.style("visibility", "hidden");
    });

  const legend = svg.selectAll(".legend")
    .data(timePeriods)
    .enter()
    .append("g")
    .attr("transform", (d, i) => `translate(${i * 100}, -30)`);

  legend.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 12)
    .attr("height", 12)
    .attr("fill", d => color(d));

  legend.append("text")
    .attr("x", 20)
    .attr("y", 10)
    .text(d => d)
    .attr("font-size", "12px");
}
