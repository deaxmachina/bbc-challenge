
import { testGraph } from "./modules/test.js"
import { getCityData } from "./modules/dataPrep.js"
import { canvas, initParticles, animateParticles } from "./modules/aqiParticles.js"
import { cigsViz } from "./modules/cigsViz.js"
import { selectMenu } from "./modules/selectMenu.js"

let rawData;
let cityData; 
// Initialise data 
let selectedCity = ''
let numParticles = 0
let numCigs

// Dimensions for the cigs in graph - need for responsiveness
let sigsDims = {}
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
// Set canvas size based on current display dims
if (window.innerWidth < 600) {
  sigsDims = { ...sigsDimsSmall }
} else {
  sigsDims = { ...sigsDimsLarge }
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

const sigsContainer = d3.select("#cigarette");


async function graph(selectedCity) {
  // 1. Load in the raw data and extract useful data in array format
  rawData = await d3.json('english.json')
  cityData = getCityData(rawData)

  // 2. Add options for each city from the data 
  const selectMenuContainer = d3.select('#cities-select')
  selectMenuContainer.call(selectMenu, cityData)

  const cityInput = d3.select('#cityInput')
  cityInput.selectAll('li')
    .data(cityData)
    .join('li')
    .html(d => d.name)

  // 3. Call the graphs on the container with the data
  //svg.call(testGraph, cityData)
  sigsContainer.call(cigsViz, selectedCity, cityData, numCigs, sigsDims)

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
    sigsDims = { ...sigsDimsSmall }
    sigsContainer.call(cigsViz, selectedCity, cityData, numCigs, sigsDims)
  } else {
    canvas.width = 400
    sigsDims = { ...sigsDimsLarge }
    sigsContainer.call(cigsViz, selectedCity, cityData, numCigs, sigsDims)
  }
})
