const barDims = {
  height: 30,
  margin: 5,
}
const yOffsetFromTop = 100
const sigsMultiplier = 18
const cigsFill = '#fca311'
const lightColour = '#e5e5e5'
const pmCirclesFill = lightColour
const cityNameFill = pmCirclesFill
const darkColour = '#222'

// To add a legend for the circles on the graph 
// Code adapted from here: https://www.d3-graph-gallery.com/graph/bubble_legend.html
const pmCirclesLegend = (container, scale) => {
  //const valuesToShow = [50, 150, 350]
  const valuesToShow = [350, 150, 50]
  const xCircle = 50
  const xLabel = 60
  const yCircle = 60

  container
    .selectAll(".legend")
    .data(valuesToShow)
    .classed('legend', true)
    .join("circle")
      .attr("cx", xCircle)
      .attr("cy", d => yCircle - scale(d))
      .attr("r", d => scale(d))
      .style("fill", lightColour)
      .attr("stroke", darkColour)

  container
    .selectAll(".legend")
    .data(valuesToShow)
    .join("line")
      .attr('x1', d => xCircle + scale(d))
      .attr('x2', (d, i) => xLabel + i*50 + 20)
      .attr('y1', d => yCircle - scale(d))
      .attr('y2', d => yCircle - scale(d))
      .attr('stroke', lightColour)
      .style('stroke-dasharray', '1 1')

  container
    .selectAll(".legend")
    .data(valuesToShow)
    .join("text")
    .attr('x', (d, i) => xLabel + i*50 +20)
      .attr('y', d => yCircle - scale(d))
      .text(d => `${d} PM2.5`)
      .style("font-size", '8px')
      .attr('alignment-baseline', 'middle')
      .style('fill', lightColour)
}

// Draw the Summary Graph - bar chart for the cigs vals and circles for PM2.5
const summaryGraph = (container, data) => {
  const pmCircleRadiusScale = d3.scaleSqrt()
    .domain(d3.extent(data, d => d.aqi))
    .range([1, 14])

  container.call(pmCirclesLegend,pmCircleRadiusScale)

  container.append('text')
    .text('number of cigarettes')
    .attr('fill', lightColour)
    .attr('font-size', '0.8em')
    .attr('dy', '0.35em')
    .attr('y', yOffsetFromTop)

  // Container for each city 
  const cityG = container.selectAll('g')
    .data(data)
    .join('g')
    .attr('transform', (d, i) => `translate(${0}, ${(barDims.height + barDims.margin) * i + yOffsetFromTop + 20})`)

  // Rects for bars corresponding to the num cigarettes
  const rect = cityG.append('rect')
    .attr('width', d => d.cigg*sigsMultiplier)
    .attr('height', barDims.height)
    .attr('fill', cigsFill)

  // Circles for the aqi value i.e. PM2.5 
  const pmGraph = cityG.append('circle')
    .attr('r', d => pmCircleRadiusScale(d.aqi))
    .attr('fill', pmCirclesFill)
    .attr('cx', d => d.cigg*sigsMultiplier - pmCircleRadiusScale(d.aqi) - 3)
    .attr('cy', barDims.height/2)
    .attr('stroke', darkColour)
    .style('stroke-dasharray', '2 1')

  // City name next to each bar
  const cityName = cityG.append('text')
    .text(d => d.name)
    .attr('x', d => d.cigg*sigsMultiplier + 5)
    .attr('y', barDims.height/2)
    .attr('dy', '0.35em')
    .style('fill', cityNameFill)

  // Label the num of cigs on the bars themselves
  const cityLabelCigs = cityG.append('text')
    .text(d => d.cigg)
    .attr('x', 5)
    .attr('y', barDims.height/2)
    .attr('dy', '0.35em')
    .style('fill', darkColour)
    .style('font-weight', 'bold')

}

export { summaryGraph }