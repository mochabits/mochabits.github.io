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
var pbi = {width:500,height:270};
var margin = { top: 20, right: 60, bottom: 60, left: 30 },
    width = pbi.width - margin.left - margin.right,   
    height = pbi.height - margin.top - margin.bottom, 
    xGridSize = Math.floor(width / 4.2),
    yGridSize = Math.floor(height / 3.3),
    buckets = 9,
    colors = ["#2166ac","#4393c3","#92c5de","#d1e5f0","#f7f7f7","#fddbc7","#f4a582","#d6604d","#b2182b"]; // alternatively colorbrewer.YlGnBu[9]

var x = d3.scale.linear().range([0, width]),
    y = d3.scale.linear().range([0, height]);

// Canvas
var svg = d3.select("#chart") // default SVG ID
    .attr("width", pbi.width )   
    .attr("height", pbi.height )
    //.append("g")
    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
   
d3.csv("data.csv", function(data) {
//pbi.dsv(function(data) {
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
    factors.sort();
    dates.sort();
    console.log(factors);
    console.log(dates);
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
  	// Color scale
    var colorScale = d3.scale
    .quantile()
    .domain([d3.min(data, function (d) { return  parseInt(d.value); }), 
            //buckets - 1, 
            d3.max(data, function (d) { return parseInt(d.value); })])
    .range(colors);
    console.log("min and max value");
    console.log(d3.extent(data, function (d) { return parseInt(d.value); }));

    var cards = svg.selectAll(".Value")
        .data(data, function(d) {return d.date+':'+d.factor;});
    
  	// Calculate the domains based on the data:
    x.domain(d3.extent(data, function(d) { return dates.indexOf(d.date); }));
    y.domain(d3.extent(data, function(d) { return factors.indexOf(d.factor); }));
    console.log("x input domain");
    console.log(d3.extent(data, function(d) { return dates.indexOf(d.date); }));
    console.log("yinput domain");
    console.log(d3.extent(data, function(d) { return factors.indexOf(d.factor); }));

    // Heatmap
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
    
    // insert value for each card
    cards.enter().append("text")
     .attr("x", function(d,i) { 
        return x(dates.indexOf(d.date)); 
    })
    .attr("y", function(d,i) { 
        return y(factors.indexOf(d.factor)); 
     })
    .attr("dy", ".35em")
    .text(function(d) { return d.value; });          
    });
   