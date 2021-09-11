const testGraph = (container, data) => {
  container.append("circle")
    .attr("r", 40)
    .attr("fill", 'white')

  container.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("r", 30)
    .attr("cx", (d, i) => i*60)
    .attr("cy", 100)
}

export { testGraph }