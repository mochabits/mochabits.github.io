// select svg container
const svg = d3.select("svg");

d3.json("menu.json").then(data => {
  const min = d3.min(data,d => d.orders);
  const max = d3.max(data,d => d.orders);
  const extent = d3.extent(data, d => d.orders);
const y = d3.scaleLinear()
            .domain([0,extent(0)])
            .range([0,500]);


const x = d3.scaleBand()
          .domain(data.map(item => item.name) )
          .range([0,500])
          .paddingInner(0.2)
          .paddingOuter(0.5);

// testing if it works
// console.log(y(400));
// console.log(y(0));
// console.log(y(800));

  // join the data to rects
  const rects = svg.selectAll("rect")
                   .data(data)
        rects.attr("width", x.bandwidth)
             .attr("height",d => y(d.orders) )
             .attr("fill","orange")
             .attr("x", d => x(d.name));
  // append the rest of rects
  rects.enter()
       .append("rect")
       .attr("width", x.bandwidth)
      .attr("height",d => y(d.orders) )
      .attr("fill","orange")
      .attr("x", d => x(d.name));

})
