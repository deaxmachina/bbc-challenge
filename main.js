
import { getCityData } from "./modules/dataPrep.js"
import { canvas, initParticles, animateParticles } from "./modules/aqiParticles.js"
import { cigsViz, sigsDimsSmall, sigsDimsLarge } from "./modules/cigsViz.js"
import { summaryGraph } from "./modules/summaryGraph.js"

/// DOM manipulation and selectors ///
// Programmatically create element that we don't want to leave in HTML as html will display mvp
// 1. City Search Box
const cityMenu = d3.select("#city-menu")
const cityMenuInstructions = cityMenu.append('p')
  .attr('class', 'city-menu-instructions')
  .text('Search for and click on your city to find out how many cigarettes you have effectively smoked because of last week\'s pollution.')
const cityInput = cityMenu.append('input')
  .attr('type', 'text')
  .attr('class', 'city-input')
  .attr('id', 'city-input')
  .attr('placeholder', "search for a city")
const cityList = cityMenu.append('ul')
  .attr('class', 'city-list')
  .attr('id', 'city-list')
  .style('display', 'none') // Need for Edge, Chrome on Windows 

// 2. Particles for PM2.5 Viz
const numParticlesDisplay = d3.select('#num-particles')
const numParticlesContainer = d3.select('#num-particles-container')
  .style('width', "80px")
  .style('height', "80px")
  .style('padding', '15px')
numParticlesContainer.append('small').html('PM2.5') // the 'PM2.5' just under num particles displayed

// 3. Cigs Viz
const sigsContainer = d3.select("#cigs-container")

// 3. Summary Graph for all cities
const summaryGraphContainer = d3.select('#summary-graph-container')
  .append('svg')
  .attr('width', 320).attr('height', 1250)

// Finally, remove content for IE/no JS which is in the html initially
d3.selectAll('.ie-content').remove()

// Initialise data and data variables
let rawData // all the raw data 
let cityData // just data for cities
let selectedCity = '' // selected city to be passed onto graphs
let numParticles = 0 // num PM2.5 particles for selected city
let numCigs // num cigs for selected city

// Initalise colour scale for the particles 
const pmColourScale = d3.scaleSequential(d3.interpolateBrBG)

// Dimensions for the cigs in graph - need for responsiveness
let sigsDims = {}

// Set canvas size based on current display dims
if (window.innerWidth < 600) {
  sigsDims = { ...sigsDimsSmall }
} else {
  sigsDims = { ...sigsDimsLarge }
}

// Dynamically fill the cities menu with cities and add event searches and pass city data to graph
const getCitiesMenu = (cityData, cityInput) => {
  const cityListLi = cityList.selectAll('li')
    .data(cityData)
    .join('li')
    .html(d => d.name)
    .classed('city-option', true)
    .style('display', 'none') // Don't display list of cities unless searched
    .on('click', function(e) {
      selectedCity = e.target.innerHTML
      cityInput.property('value', selectedCity) // Search field input updates to city
      cityListLi.style('display', 'none') // Hide list of cities again
      numParticles = cityData.filter(city => city.name === selectedCity)[0].aqi // Update num particles for particle graph
      graph(selectedCity) // Run the graph with the selected city
    })

  // Search functionality - display only cities that contain keyboard input in search field
  cityInput.on('keyup', function() {
    let filter = this.value.toUpperCase(); // Current input
    // If input is empty, hide options
    if (filter.length === 0) {
      cityListLi.style('display', 'none')
    } else {
      // Loop through all list items, and hide those who don't match the search query
      for (let i = 0; i < cityListLi.nodes().length; i++) {
        const city = cityListLi.nodes()[i];
        const txtValue = city.textContent || city.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          cityList.style('display', "")
          cityListLi.nodes()[i].style.display = "";
        } else {
          cityListLi.nodes()[i].style.display = "none";
        }
      }
    }
  })
}

/// Main graph function - load data and pass it into menu, graphs ///
async function graph(selectedCity) {
  // 1. Load in the raw data and extract useful data in array format
  rawData = await d3.json('./data/english.json')
  cityData = getCityData(rawData)

  // 2. Initialise the menu of cities (list) behind the search functionality
  getCitiesMenu(cityData, cityInput)

  // 3. Initialise the particles for the PM2.5 particle graph
  // change colour based on num particles 
  pmColourScale.domain(d3.extent(cityData, d => d.aqi).reverse())
  initParticles(numParticles, pmColourScale(numParticles)) 
  numParticlesDisplay.html(numParticles) // Upadte displayed particles

  // 4. Call the cigarettes viz
  sigsContainer.call(cigsViz, selectedCity, cityData, numCigs, sigsDims)

  // 5. Call the summary graph
  summaryGraphContainer.call(summaryGraph, cityData.sort((a, b) => b.cigg - a.cigg))
}

// Run the graph + animate the particles
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
