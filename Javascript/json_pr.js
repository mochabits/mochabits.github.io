// select svg container
const svg = d3.select("svg");
d3.json("planets.json").then(data => {
  const cirs = svg.selectAll("circle")
  .data(data);
  // add attr to the circle already exist
  cirs.attr("cy", 200)
      .attr("cx", d=>d.distance)
      .attr("r", d=>d.radius)
      .attr("fill", d=>d.fill);
  // enter data and new circles
  cirs.enter()
      .append('circle')
      .attr("cy", 200)
      .attr("cx", d=>d.distance)
      .attr("r", d=>d.radius)
      .attr("fill", d=>d.fill);
})
