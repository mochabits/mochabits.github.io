/* 
 * All D3 visuals run in a frame with the following elements/variables:
 * 
 * SVG element: 
 * - <svg xmlns="http://www.w3.org/2000/svg" class="chart" id="chart" >
 * 
 * pbi object:
 * - 'dsv'    : function that retrieves the data via the provided callback: pbi.dsv(callback)
                e.g. pbi.dsv(function(data) { //Process data function });
 * - 'height' : height of the sandbox frame
 * - 'width'  : width of the sandbox frame
 * - 'colors' : color array with 8 colors; changable via options
 * 
 * Code is based on: http://bl.ocks.org/tjdecke/5558084
 */

var margin = { top: 2, right: 2, bottom: 2, left: 2 },
    width = pbi.width - margin.left - margin.right,   
    height = pbi.height - margin.top - margin.bottom, 
    xGridSize = Math.floor(width / 5),
    yGridSize = Math.floor(height / 10),
    //yPlaceHolder = 4,
    //legendElementWidth = xGridSize*3,
    buckets = 9,
    colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]; // alternatively colorbrewer.YlGnBu[9]

var x = d3.scale.linear().range([0, width]),
    y = d3.scale.linear().range([0, height]);

// Canvas
var svg = d3.select("#chart") // default SVG ID
    .attr("width", pbi.width )   
    .attr("height", pbi.height )
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

pbi.dsv(function(data) {
    var factors = [];
    var dates = [];
	// build arrays for x and y axes
    for (var i = 0; i < data.length; i++) {
        if (factors.indexOf(data[i].factor) === -1) {
            factors.push(data[i].factor);
          
        }
        if (dates.indexOf(data[i].date) === -1) {
            dates.push(data[i].date);
        }
    }
  /*
 	// X Axis
	var dateLabels = 
        svg.selectAll(".dateLabel")
        //.data(days)
  		.data(data, function(d){return d.date;})
        .enter()
      	.append("text")
        .text(function (d) { return d.date; })
        .attr("x", function (d, i) { return (i+1) * xGridSize; })
        .attr("y", 0) 		
        .style("text-anchor", "middle")
        .attr("transform", "translate(-6," + xGridSize / 1.5 + ")");

	// Y axis
    var factorLabels = svg.selectAll(".factorLabel")
        .data(data, function(d){return d.factor;})
        .enter().append("text")
        .text(function (d) { return d.factor; })
        .attr("x", 0)
        .attr("y", function (d, i) { return (i) * yGridSize + margin.top + yPlaceHolder; })
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + yGridSize / 1.5 + ")");
*/	
  	// Heatmap
    var colorScale = d3.scale.quantile()
    .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
    .range(colors);

    var cards = svg.selectAll(".Value")
        .data(data, function(d) {return d.date+':'+d.factor;});
    
  	// Calculate the domains based on the data:
    x.domain(d3.extent(data, function(d) { return dates.indexOf(d.date); }));
    y.domain(d3.extent(data, function(d) { return factors.indexOf(d.factor); }));

    cards.append("title");
    cards.enter().append("rect")
    //cards.append("rect")
        .attr("x", function(d,i) { 
            return x(dates.indexOf(d.date)); 
        })
        .attr("y", function(d,i) { 
            return y(factors.indexOf(d.factor)); 
         })
        //.attr("rx", 4)
        //.attr("ry", 4)
        .attr("width", xGridSize)
        .attr("height",yGridSize)
        .style("fill", colors[0]);
    cards.transition().duration(1000)
         .style("fill", function(d) { return colorScale(d.value); });
    cards.select("title").text(function(d) { return d.value; });
    cards.exit().remove();   
    });
   