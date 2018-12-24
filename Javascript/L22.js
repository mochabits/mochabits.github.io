// select svg container
const svg = d3.select("svg");
d3.json("menu.json").then(data => {
  // join the data to rects
  const rects = svg.selectAll("rect")
                   .data(data)
        rects.attr("width", 50)
             .attr("height",d => d.orders)
             .attr("fill","orange")
             .attr("x", (d,i) => i*70);
  // append the rest of rects
  rects.enter()
       .append("rect")
       .attr("width", 50)
      .attr("height",d => d.orders)
      .attr("fill","orange")
      .attr("x", (d,i) => i*70);

})
