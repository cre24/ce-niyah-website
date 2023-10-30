// Orginal Code: https://github.com/kriscfoster/d3-barchart/blob/master/index.js 

const data = [
    {year: '2021', title: 'US Weekly',circulation: 1137808, number: 0},
    {year: '2020',title: 'US Weekly',circulation: 744102, number: 0},
    {year: '2019',title: 'US Weekly',circulation: 693557, number: 0},
    {year: '2021',title: "Men's Journal",circulation: 728414, number: 2},
    {year: '2020',title: "Men's Journal",circulation: 436270, number: 2},  
    {year: '2019', title: "Men's Journal",circulation: 265527, number: 2},
    {year: '2021',title: "Star Magazine",circulation: 562264, number: 4},
    {year: '2020',title: "Star Magazine",circulation: 489394,number: 4},
    {year: '2019',title: "Star Magazine",circulation: 422527, number: 4},
    {year: '2021',title: "Better Homes and Gardens",circulation: 472112, number: 6},
    {year: '2020',title: "Better Homes and Gardens",circulation: 396034, number: 6},
    {year: '2019',title: "Better Homes and Gardens",circulation: 263380, number: 6},
    {year: '2021',title: "Golf Digest",circulation: 394104, number: 8},
    {year: '2020',title: "Golf Digest",circulation: 86699, number: 8},
    {year: '2019',title: "Golf Digest",circulation: 18886, number: 8},
]
  
var width = 900;
var height = 500;
var margin = { top: 50, bottom: 50, left: 50, right: 50 };

var svg = d3.select('#d3-container')
  .append('svg')
  .attr('width', width - margin.left - margin.right)
  .attr('height', height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

const x = d3.scaleBand()
  .domain(d3.range(data.length))
  .range([margin.left, width - margin.right])
  .padding(0.1)

const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.circulation)])
  .range([height - margin.bottom, margin.top])

  const color = d3.scaleSequential()
  .domain(d3.extent(data, d => d.number))
  .interpolator(d3.interpolateViridis);

svg
  .append("g")
  // .attr("fill", 'royalblue')
  .selectAll("rect")
  .data(data.sort((a, b) => d3.descending(a.year, b.title)))
  .join("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", d => y(d.circulation))
    .attr('title', (d) => d.circulation)
    .attr("class", "rect")
    .attr("height", d => y(0) - y(d.circulation))
    .attr("width", x.bandwidth())
    .style("fill", function(d) {return color(d.number)} )
  .style("opacity", 1)
  .on("click", function(e,d) {return console.log(d.title);})


function yAxis(g) {
  g.attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y).ticks(null, data.format))
    .attr("font-size", '10px')
}

function xAxis(g) {
  g.attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x).tickFormat(i => data[i].year))
    .attr("font-size", '10px')
}

svg.append("text")
  .attr("class", "xlabel")
  .attr("text-anchor", "end")
  .attr("x", width)
  .attr("y", height - 6)
  .text("Years");

svg.append("text")
  .attr("class", "ylabel")
  .attr("text-anchor", "end")
  .attr("y", -30)
  .attr("dy", ".75em")
  .attr("transform", "rotate(-90)")
  .text("Amount in circulation ($)");

svg.append("g").call(xAxis);
svg.append("g").call(yAxis);

svg.node();