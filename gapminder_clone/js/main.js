/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/

// d3.json("data/data.json").then(function(data){
// 	console.log(data);
// })

// define the canvas
const margin = {top:50, left: 80, bottom:100, right:20};
const canvasWidth = 600;
const canvasHeight = 400;
const graphWidth = canvasWidth - margin.left - margin.right;
const graphHeight = canvasHeight - margin.top - margin.bottom;
const intervalTime = 100;
var interval;
var cleanedCountryData;
var time = 0;
var main = d3.select("#chart-area")
    .append("svg")
        .attr("width", canvasWidth)
        .attr("height", canvasHeight)
    .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")"); // main graphic area
console.log("tooltip is called")

// tooltip

var tip = d3.tip().attr('class', 'd3-tip')
    .html((d)=> {
        var text = "<strong>Country:</strong> <span style='color:red'>" + d.country + "</span><br>";
        text += "<strong>Continent:</strong> <span style='color:red;text-transform:capitalize'>" + d.continent + "</span><br>";
        text += "<strong>Life Expectancy:</strong> <span style='color:red'>" + d3.format(".2f")(d.life_exp) + "</span><br>";
        text += "<strong>GDP Per Capita:</strong> <span style='color:red'>" + d3.format("$,.0f")(d.income) + "</span><br>";
        text += "<strong>Population:</strong> <span style='color:red'>" + d3.format(",.0f")(d.population) + "</span><br>";
        return text;
    });
main.call(tip);

// X Label
main.append("text")
    .attr("x", graphWidth / 2)
    .attr("y", graphHeight + 50) // outside of graph area
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("GDP Per Capita ($)");

// Y Label
var yLabel =
main.append("text")
    .attr("transform", "rotate(-90)") // x becomes y; y becomes x
    .attr("x",-(graphHeight/2)) // label's x value is now from graphHeight
    .attr("y",-60) // label's y value is now from x
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Life Expectancy (Age)");

    var timeLabel = 
main.append("text")
    .attr("y", graphHeight -10)
    .attr("x", graphWidth - 40)
    .attr("font-size", "40px")
    .attr("opacity", "0.4")
    .attr("text-anchor", "middle")
    .text("1800");
// Scales
// x-> GDP
var x = d3.scaleLog()
        .domain([142,150000])
        .range([0,graphWidth])
        ;
 // y-> life exp   
var y = d3.scaleLinear()
        .domain([0,90])
        .range([graphHeight,0]); 

// area -> population
var circleArea = d3.scaleLinear()
                .domain([2000, 1400000000])
                .range([25*Math.PI, 1500*Math.PI])

                ;

// Axis
var xAxis = d3.axisBottom(x)
                .tickValues([400, 4000, 40000])
                .tickFormat(d3.format("$"));
var xAxisGroup =  main.append("g")
    .attr("class","x-axis")
    .attr("transform","translate(0,"+graphHeight+")") 
    .call(xAxis);
                    
var yAxis = d3.axisLeft(y)
            .tickFormat(d => {return +d});
var yAxisGroup = main.append("g")
    .attr("class","y-axis")
    .call(yAxis)
    ;    
var continentL = ["europe", "asia", "africa", "americas"]

var continentColor = d3.scaleOrdinal(d3.schemeCategory10);
    
    // build a legend group
var legend = main.append("g")
                    .attr("class","legend-group")
                    .attr("transform", "translate(" + (graphWidth -10) + ", " + (graphHeight - 130) + ")");
    
// building a row legend group
continentL.forEach((continent, i) => {
    
    var legendRow = legend.append("g")
                            .attr("class", "continent"+continent)
                            .attr("transform", "translate(0," + (i*20) + ")");
    
    
    legendRow.append("rect")
                    .attr("width",10)
                    .attr("height",10)
                    .attr("class","contColor")
                    .attr("fill",continentColor(continent));
    
    legendRow.append("text")
                    .attr("x",-10)
                    .attr("y",10)
                    .attr("class","contName")
                    .attr("text-anchor","end")
                    .style("text-transform","capitalize")
                    .text(continent);                   
});


// Read data
d3.json("data/data.json").then( data => {
    // clean the data: remove null income and life exp
    
    cleanedCountryData = data.map ( d => { 
        //console.log(d);
        return d["countries"].filter(
            country => {
                var dataExists = (country.income && country.life_exp);
                return dataExists;
            }).map(country => {
                country.income = +country.income;
                //console.log(country.income);
                country.life_exp = +country.life_exp;
                //console.log(country.life_exp);
                country.population = +country.population;
                //console.log(country.population);
                return country;
            });
        });
    //console.log(cleanedCountryData);

  

    // run update function for the first time
    update(cleanedCountryData[0]);

}).catch(error =>{
    console.log(error);
});
         
$("#play-button")
    .on("click", function(){
        var button = $(this);
        
        console.log(button.text());
        //button.text("pause")
        if (button.text() == "Play"){
            button.text("Pause");
            interval = setInterval(step, intervalTime);            
        }
        else {
            button.text("Play");
            clearInterval(interval);
        }
    })

    $("#reset-button")
    .on("click", function(){
        var button = $(this);
        
        console.log(button.text());
        //button.text("pause")
        
        time =0;
        update(cleanedCountryData[time]);           
       
    });

    $("#continent-select")
    .on("change", function(){
        var selectedCon = $(this);
        
        console.log(selectedCon.val());
        //button.text("pause")
        update(cleanedCountryData[time]);           
       
    })
    $("#date-slider").slider({
        max: 2014,
        min:1800,
        step:1,
        slide: function(event, ui) {
            time =ui.value - 1800;
            update(cleanedCountryData[time]);
        }
    })


function step() {
    time = (time < 214) ? time + 1 : 0;
    // call update function
    update(cleanedCountryData[time]);

}

function update(data) {
   // transition time
   var t = d3.transition().duration(intervalTime);
   
   // continent dropdown
   var continent = $("#continent-select").val();
    console.log(continent);
   var data = data.filter(function(d){
       if (continent == "all") { return true; }
       else {
           return d.continent == continent;
       }
   })
   //console.log(data);

    //console.log("selected continent: " + continentSelect);
   // join new data with old elements
    var circles = main.selectAll("circle")
                 .data(data, data=>{
                     //console.log(data.continent);
                     return data.country;
                 })
                 ;
    // exit the ones not using anymore
    circles.exit()    
        .attr("class","exit")
        .remove();
    
    // new element
    circles.enter()
        .append("circle")
        .attr("class","enter")
        .attr("fill",d=>{return continentColor(d.continent);})
        //tooltip added before the merge
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide)

        // use merge() to include updated items
        .merge(circles)
        .transition(t) 
        .attr("cx", d=>{return x(d.income);})
        .attr("cy", d=> {return y(d.life_exp);})
        .attr("r",d=> {return Math.sqrt(circleArea(d.population)/Math.PI);})  
        
        ;
      // Update the time label
      timeLabel.text(+(time + 1800));
      // update year slider label
      $("#year")[0].innerHTML= +(time+1800);
      $("#date-slider").slider("value", +(time+1800));
}