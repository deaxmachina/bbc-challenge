const imagePath = './ciggrette_icon.png'; // the cigarette image

// this only needs to be drawn once? 
const cigsViz = (container, selectedCity, cityData, numCigs, sigsDims) => {
  // We want to always display all 12 cigs so if there is no city selected 
  // set the num of cigs to 0 and display all of them with v low opacity
  if (selectedCity) {
    numCigs = cityData.filter(city => city.name === selectedCity)[0].cigg
  } else {
    numCigs = 0
  }

  // Create a row of 12 cigarettes and make opaque as many as for selected city
  container.selectAll('img')
    .data(new Array(12)) // 12 is the max num cigs in data; todo: extract from data programmatically
    .join('img')
      .attr('src', imagePath)
      //.style('position', 'absolute')
      .style('margin-left', (d, i) => `${sigsDims.distance}px`)
      .style('margin-top', '20px')
      //.style('transform', (d, i) => `rotate(${20*Math.random()-10}deg)`)
      .style('transform', (d, i) => `rotate(${sigsDims.rotate}deg)`)
      .style('height', `${sigsDims.height}px`)
      .style('width', `${sigsDims.width}px`)
      .style('opacity', (d, i) => i< numCigs ? 1 : 0.1)
}

// Dimensions for the cigs in graph - need for responsiveness
const sigsDimsSmall = {
  width: 30,
  height: 70,
  rotate: 40,
  distance: -10
}
const sigsDimsLarge = {
  width: 30,
  height: 80,
  rotate: 60,
  distance: 0
}

export { cigsViz, sigsDimsSmall, sigsDimsLarge }