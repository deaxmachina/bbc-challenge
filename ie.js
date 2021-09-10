const svg = d3.select("#graph-wrapper").append("svg")
  .attr("width", 400)
  .attr("height", 400)


svg.append("rect")
  .attr("width", 200)
  .attr("height", 200)
  .attr("fill", 'blue')

