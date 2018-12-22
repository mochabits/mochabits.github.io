const canvas = d3.select(".canvas");
const svg = canvas.append ('svg');
svg.attr('height', 600);
svg.attr('weight', 600);
// append shapes to svg container
svg.append('rect');
svg.append('circle');
svg.append('line');
