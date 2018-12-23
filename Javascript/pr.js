const data = [
  {width:200, height:100; fill:"purple"};
];

const svg = d3.select("svg");
svg.select("rect")
  .data()
  .attr("width",function(d){return d.width})
  .attr("height",function(d){return d.height})
  .attr("fill",function(d){return d.fill});
