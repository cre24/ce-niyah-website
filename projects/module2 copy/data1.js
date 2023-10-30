// Code from Lecture

// set the dimensions and margins of the graph
var margin = {top: 50, right: 50, bottom: 50, left: 50},
        width = 800 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
const mysvg = d3.select('#chart')
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

	
//Read the data
d3.csv("data4.csv", function(d){
  return {
	title: d["Title"],
    year: +d['Year'],
    circulation: +d['Circulation'],
    number: +d['Number']
  };
}).then( function(data) {
	console.log(data);
	
	// Add X axis
    var x = d3.scaleLinear()
    .domain([2018.5, 2022])
    .range([ 0, width]);

    var y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.circulation)])
    .range([ height, 0]);
	
	//Store your axes so you can zoom in on them
	
	mysvg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));
	
	mysvg.append("g")
    .call(d3.axisLeft(y));

    var tooltip = d3.select("#chart")
        .append("div")
    .style("position", "fixed")
    .style("visibility", "hidden")
    .style("background-color", "pink")
	
	// Add color scale
    const color = d3.scaleSequential()
    .domain(d3.extent(data, d => d.number))
    .interpolator(d3.interpolateViridis);

    mysvg.append("text")
        .attr("class", "xlabel")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", height - 6)
        .text("Years");

    mysvg.append("text")
    .attr("class", "ylabel")
    .attr("text-anchor", "end")
    .attr("y", 10)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Amount in circulation ($)");
	
	// Add dots
	const graph = mysvg.append('g')
    .selectAll("dot")
    .data(data)
    .join("circle")
        .attr("r", 15)
		.attr("cx", function (d) { return x(d.year); } )
        .attr("cy", function (d) { return y(d.circulation); } )
		.style("fill", function(d) {return color(d.number)} )
		.style("opacity", .5)
    // .on("click", function(e,d) {return console.log(d.title);})
    .on("mouseover", function(e,d) {return tooltip.style("visibility", "visible")
                                                    .html("Publication: " + d.title);})
    .on("mousemove", function() {return tooltip.style("top", d3.select(this)
                                                                .attr("cy")+"px")
                                                .style("left", d3.select(this)
                                                                    .attr("cx")+"px")})
    .on("mouseout", function() {return tooltip.style("visibility", "hidden");})

    
})