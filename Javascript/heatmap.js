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
 * Remember to comment / uncomment var pbi and pbi.dsv(function(data) { 
 */

//var pbi = {width:500,height:270};
var margin = { top: 20, right: 70, bottom: 60, left: 30 },
    width = pbi.width - margin.left - margin.right,   
    height = pbi.height - margin.top - margin.bottom, 
    xGridSize = Math.floor(width / 4.2),
    yGridSize = Math.floor(height / 3.3),
    colors = ["#336699", "#ffffcc", "#b33c00"]; // min, middle, max values

var x = d3.scale.linear().range([0, width]),
    y = d3.scale.linear().range([0, height]);

// Text Color object. It has to be placed before the callback function is called
var textColor = {
        hex_to_rgb: function(hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);         	
            return result ? { 
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16) 
            } : null;
        },
        hex_inverse_bw: function(hex) {
            var rgb = textColor.hex_to_rgb(hex);
            var luminance = (0.2126*rgb["r"] + 0.7152*rgb["g"] + 0.0722*rgb["b"]);
            return (luminance < 140) ? "#ffffff": "#000000";
        }
    };

// Canvas
var svg = d3.select("#chart") // default SVG ID
    .attr("width", pbi.width )   
    .attr("height", pbi.height )
   
//d3.csv("data.csv", function(data) {
pbi.dsv(function(data) {

    // build arrays for x and y axes
    var factors = []; // y axis
    var dates = []; // x axis

    for (var i = 0; i < data.length; i++) {
        if (factors.indexOf(data[i].factor) === -1) {
            factors.push(data[i].factor);
          
        }
        if (dates.indexOf(data[i].date) === -1) {
            dates.push(data[i].date);
        }
    }
  
    factors.sort();
    dates.sort(function(a,b) {
      return new Date(a) - new Date(b);
    });
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
    .linear()
    .domain([d3.min(data, function (d) { return  parseInt(d.value); }), 
            0, 
            d3.max(data, function (d) { return parseInt(d.value); })])
    .range(colors)
    .interpolate(d3.interpolateHcl);
 
    console.log("min and max value");
    console.log(d3.extent(data, function (d) { return parseInt(d.value); }));

    var cards = svg.selectAll(".Value")
        .data(data, function(d) {return d.date+':'+d.factor;});
    
  	// Calculate the domains based on the data:
    x.domain(d3.extent(data, function(d) { return dates.indexOf(d.date); }));
    y.domain(d3.extent(data, function(d) { return factors.indexOf(d.factor); }));
 
    // Heatmap
    cards.append("title");
    cards.enter().append("rect")
        .attr("x", function(d,i) { 
            return x(dates.indexOf(d.date)); 
        })
        .attr("y", function(d,i) { 
            return y(factors.indexOf(d.factor)); 
         })
        .attr("width", xGridSize)
        .attr("height",yGridSize)
        .style("fill", colors[1]);
 
    cards.transition().duration(1000)
         .style("fill", function(d) { return colorScale(d.value); });
    cards.select("title").text(function(d) { 
        return d.value; 
    });
    cards.exit().remove();   
    
    // insert value for each card
    cards.enter().append("text")
     .attr("x", function(d,i) { 
        return x(dates.indexOf(d.date))+xGridSize/2 - 13; 
    })
    .attr("y", function(d,i) { 
        return y(factors.indexOf(d.factor))+yGridSize/2; 
     })
    .attr("dominant-baseline","middle")
    .attr("class","valueLabel")
    .style("fill",function(d) { 
  					return textColor.hex_inverse_bw(colorScale(d.value)); 
    	})	
  	
  	.text(function(d) { return d.value;  });
});