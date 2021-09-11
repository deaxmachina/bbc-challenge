
import { testGraph } from "./modules/test.js"
import { getCityData } from "./modules/dataPrep.js"
import { canvas, initParticles, animateParticles } from "./modules/aqiParticles.js"
import { cigsViz } from "./modules/cigsViz.js"

let rawData;
let cityData; 
// Initialise data 
let selectedCity = ''
let numParticles = 0
let numCigs

// Dimensions for the cigs in graph - need for responsiveness
const sigsDims = {
  width: 30,
  height: 80,
  rotate: 60,
  distance: 0
}


// When a city is selected, update the selectedCity and nums for aqi and 
// and draw the graph with updated values
const citiesDropdown = document.getElementById('cities-select')
citiesDropdown.addEventListener('change', e => {
  selectedCity = e.target.value;
  numParticles = cityData.filter(city => city.name === selectedCity)[0].aqi
  const aqiValue = document.querySelector('.aqi-value')
  aqiValue.innerHTML = numParticles
  graph(selectedCity)
})

const domElement = d3.select("#cigarette");


async function graph(selectedCity) {
  // 1. Load in the raw data and extract useful data in array format
  rawData = await d3.json('english.json')
  cityData = getCityData(rawData)

  // 2. Add options for each city from the data 
  d3.select('#cities-select').selectAll('option')
    .data(cityData)
    .join('option')
      .attr('value', d => d.name)
      .html(d => d.name)

  // 3. Call the graphs on the container with the data
  //svg.call(testGraph, cityData)
  domElement.call(cigsViz, selectedCity, cityData, numCigs, sigsDims)

  // 4. Draw particles 
  initParticles(numParticles)
  //animateParticles() -- make sure this happens after graph and it is not ever called again
}

graph(selectedCity)
animateParticles()

// On resize, change the canvas width and cigarette dims to fit to smaller screens
window.addEventListener('resize', e => {
  if (window.innerWidth < 600) {
    canvas.width = 280
    sigsDims.height = 70
    sigsDims.rotate = 40
    sigsDims.distance = -10
    domElement.call(cigsViz, selectedCity, cityData, numCigs, sigsDims)
  } else {
    canvas.width = 400
    sigsDims.height = 80
    sigsDims.rotate = 60
    sigsDims.distance = 0
    domElement.call(cigsViz, selectedCity, cityData, numCigs, sigsDims)
  }
})
