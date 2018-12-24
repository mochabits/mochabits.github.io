// select svg container
const svg = d3.select("svg");
d3.json("menu.json").then(data => {

const y = d3.scaleLinear()
            .domain([0,1000])
            .range([0,500]);

const x = d3.scaleBand()
          .domain(data.map(item => item.name) )
          .range([0,500])

// testing if it works
// console.log(y(400));
// console.log(y(0));
// console.log(y(800));

  // join the data to rects
  const rects = svg.selectAll("rect")
                   .data(data)
        rects.attr("width", 50)
             .attr("height",d => y(d.orders) )
             .attr("fill","orange")
             .attr("x", (d,i) => i*70);
  // append the rest of rects
  rects.enter()
       .append("rect")
       .attr("width", 50)
      .attr("height",d => y(d.orders) )
      .attr("fill","orange")
      .attr("x", (d,i) => i*70);

})
