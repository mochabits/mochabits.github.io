const data = [
  {width:200, height:100; fill:"purple"}
]

const svg = d3.select("svg");
svg.select("rect")
  .attr("width",200)
  .attr("height",100)
  .attr("fill","pink")
