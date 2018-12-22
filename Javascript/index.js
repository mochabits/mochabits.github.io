const canvas = d3.select(".canvas");
const svg = canvas.append ('svg')
            .attr('height', 600)
            .attr('weight', 600);
// append shapes to svg container
const grouping =svg.append('g')
                   .attr('transform','translate(0,100)');



grouping.append('rect')
   .attr('width', 200)
   .attr('height',100)
   .attr('fill', 'blue')
   .attr('x',20)
   .attr('y',20);

grouping.append('circle')
  .attr('cx',300)
   .attr('cy',70)
   .attr('r',150)
   .attr('fill','pink')
   .attr('stroke','red')
   .attr('stroke-width',2);

grouping.append('line')
   .attr('x1',100)
   .attr('x2',200)
   .attr('y1',300)
   .attr('y2',400)
   .attr('stroke','orange');

svg.append('text')
  .attr('x',175)
  .attr('y',200)
  .attr('fill',"grey")
  .text("hello, ninjas");
