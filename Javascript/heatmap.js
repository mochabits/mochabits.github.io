

// chart settings
var margin = { top: 50, right: 0, bottom: 100, left: 75 },
width = 700 - margin.left - margin.right,
height = 600 - margin.top - margin.bottom,
gridSize = Math.floor(width / 20),
legendElementWidth = gridSize*2,
buckets = 9,
colors = ["#ffffd9","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]; // alternatively colorbrewer.YlGnBu[9]

var svg = d3.select("#chart").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data.csv", function(data) {
    //console.log(data);
    var factors = [];
    var dates = [];

    for (var i = 0; i < data.length; i++) {
        if (factors.indexOf(data[i].Factors) === -1) {
            factors.push(data[i].Factors)
        }
        if (dates.indexOf(data[i].Date) === -1) {
            dates.push(data[i].Date);
        }
    }
    //console.log(dates);   
    // x axis Dates
    var dateLabels = svg.selectAll(".DateLabel")
        .data(data, function(d){ return d.Date;})
        .enter()
        .append("text")
        .text(function(d) {return d.Date;})
        .attr("x", function(d, i) { return i * gridSize; })
        .attr("y", 0)
        .style("text-anchor", "middle")
        .attr("transform", "translate(" + gridSize / 2 + ", -6)")
        .attr("class", function(d, i) { return ((i >= 7 && i <= 16) ? "timeLabel mono axis axis-worktime" : "timeLabel mono axis"); });
    
    // y axis Factors
    var factorLabels = svg.selectAll(".factorLabel")
    .data(data, function(d){ return d.Factors;})
    .enter().append("text")
    .text(function (d) { return d.Factors; })
    .attr("x", 0)
    .attr("y", function (d, i) { return i * gridSize; })
    .style("text-anchor", "end")
    .attr("transform", "translate(-6," + gridSize / 1.5 + ")")
    .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel mono axis axis-workweek" : "dayLabel mono axis"); });

    var colorScale = d3.scale.quantile()
    .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
    .range(colors);

    // the heatmap 
    var cards = svg.selectAll(".Value")
        .data(data, function(d) {return d.Date+':'+d.Factors;});

    cards.append("title");
    cards.enter().append("rect")
    //cards.append("rect")
        .attr("x", function(d,i) { 
            return (dates.indexOf(d.Date) * gridSize); 
        })
        .attr("y", function(d,i) { 
            return (factors.indexOf(d.Factors)*gridSize); 
         })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("class", "hour bordered")
        .attr("width", gridSize)
        .attr("height", gridSize)
        .style("fill", colors[0]);

    cards.transition().duration(1000)
         .style("fill", function(d) { return colorScale(d.Value); });
    cards.select("title").text(function(d) { return d.Value; });
    cards.exit().remove();   
    });
