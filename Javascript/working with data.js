const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];

d3.select("body").selectAll("h2")
  .data(dataset)
  .enter()
  .append("h2")
  .text((d) => (d + " USD"))
  /* => is a shorthand of 
  .text(function(h2) { return h2 + " USD"; })
  .append("div")
  .text(function(maru_and_hana) { return maru_and_hana + " USD"; })
  */
  .style("color", (d) => {if (d < 20) {return "red" } else {return "green"}
  /////////////////////////////
  d3.select("body").selectAll("div")
  .data(dataset)
  .enter()
  .append("div")
  .attr("class", "bar") // Call the css style
  .style("height", (d)=>d) // set the height 

  ///////////////////////////// 
  const w = 500;
  const h = 100;
  
  const svg = d3.select("body")
                // Add your code below this line
   .append("svg")     
   
   .attr("width",w)  
   .attr("height",h)       
  /////////////////////////////
  const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];
    
  const w = 500;
  const h = 100;
  
  const svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h)
                // Add your code below this line
                .append("rect")
                .attr("width",25)
                .attr("height",100)
                .attr("x",0)
                .attr("y",0)   
 /////////////////////////////        
 const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];
    
 const w = 500;
 const h = 100;
 
 const svg = d3.select("body")
               .append("svg")
               .attr("width", w)
               .attr("height", h);
 
 svg.selectAll("rect")
    // Add your code below this line
    .data(dataset)
    .enter()
    .append("rect")
    
    
    // Add your code above this line
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 25)
    .attr("height", 100);
///////////////////////////////////////////////////////
const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];
    
const w = 500;
const h = 100;

const svg = d3.select("body")
              .append("svg")
              .attr("width", w)
              .attr("height", h);

svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", (d, i) => i * 30)
   .attr("y", 0)
   .attr("width", 25)
   .attr("height", (d, i) => {
     // Add your code below this line
     return d * 3
     
     
     // Add your code above this line
   });
///////////////////////////////////////////////////////
<style>
  .bar:hover {
    fill: brown;
  }
</style>
<body>
  <script>
    const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];
    
    const w = 500;
    const h = 100;
    
    const svg = d3.select("body")
                  .append("svg")
                  .attr("width", w)
                  .attr("height", h);
    
    svg.selectAll("rect")
       .data(dataset)
       .enter()
       .append("rect")
       .attr("x", (d, i) => i * 30)
       .attr("y", (d, i) => h - 3 * d)
       .attr("width", 25)
       .attr("height", (d, i) => d * 3)
       .attr("fill", "navy")
       .attr("class", "bar")
       // Add your code below this line
       .append("svg:title").text((d) => d);
       
       
       // Add your code above this line
    
    svg.selectAll("text")
       .data(dataset)
       .enter()
       .append("text")
       .text((d) => d)
       .attr("x", (d, i) => i * 30)
       .attr("y", (d, i) => h - (d * 3 + 3))   
    
  </script>
</body>
////////////////////////////////////////
<script>
const dataset = [
              [ 34,     78 ],
              [ 109,   280 ],
              [ 310,   120 ],
              [ 79,   411 ],
              [ 420,   220 ],
              [ 233,   145 ],
              [ 333,   96 ],
              [ 222,    333 ],
              [ 78,    320 ],
              [ 21,   123 ]
            ];

const w = 500;
const h = 500;
const padding = 60;

const xScale = d3.scaleLinear()
                 .domain([0, d3.max(dataset, (d) => d[0])])
                 .range([padding, w - padding]);

const yScale = d3.scaleLinear()
                 .domain([0, d3.max(dataset, (d) => d[1])])
                 .range([h - padding, padding]);

const svg = d3.select("body")
              .append("svg")
              .attr("width", w)
              .attr("height", h);

svg.selectAll("circle")
   .data(dataset)
   .enter()
   .append("circle")
   // Add your code below this line
   
   
   
   // Add your code above this line
   
svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text((d) =>  (d[0] + ", "
+ d[1]))
   // Add your code below this line
   
   
   
   // Add your code above this line
</script>

  });
  
  
  
