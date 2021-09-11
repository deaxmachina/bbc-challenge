
import { getCityData } from "./modules/dataPrep.js"
import { canvas, initParticles, animateParticles } from "./modules/aqiParticles.js"
import { cigsViz } from "./modules/cigsViz.js"
//import { selectMenu } from "./modules/selectMenu.js"

// DOM selectors 
const sigsContainer = d3.select("#cigarette")
const cityInput = d3.select('#cityInput')
const cityList = d3.select('#cityList')
const aqiValue = d3.select('.aqi-value')

// Initialise data 
let rawData;
let cityData; 
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
// const citiesDropdown = document.getElementById('cities-select')
// citiesDropdown.addEventListener('change', e => {
//   selectedCity = e.target.value;
//   numParticles = cityData.filter(city => city.name === selectedCity)[0].aqi
//   const aqiValue = document.querySelector('.aqi-value')
//   aqiValue.innerHTML = numParticles
//   graph(selectedCity)
// })

const getCitiesMenu = (cityData, cityInput) => {
  const listCities = cityList.selectAll('li')
    .data(cityData)
    .join('li')
    .html(d => d.name)
    .classed('city-option', true)
    .style('display', 'none') // Don't display list of cities unless searched
    .on('click', function(e) {
      selectedCity = e.target.innerHTML
      cityInput.property('value', selectedCity) // Search field input updates to city
      listCities.style('display', 'none') // Hide list of cities again
      numParticles = cityData.filter(city => city.name === selectedCity)[0].aqi // Update num particles for particle graph
      // aqiValue.html(numParticles)
      graph(selectedCity) // Run the graph with the selected city
    })

  // Search functionality - display only cities that contain keyboard input in search field
  cityInput.on('keyup', function() {
    let filter = this.value.toUpperCase(); // Current input
    // If input is empty, hide options
    if (filter.length === 0) {
      listCities.style('display', 'none')
    } else {
      // Loop through all list items, and hide those who don't match the search query
      for (let i = 0; i < listCities.nodes().length; i++) {
        const city = listCities.nodes()[i];
        const txtValue = city.textContent || city.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          listCities.nodes()[i].style.display = "";
        } else {
          listCities.nodes()[i].style.display = "none";
        }
      }
    }
  })
}


async function graph(selectedCity) {
  // 1. Load in the raw data and extract useful data in array format
  rawData = await d3.json('english.json')
  cityData = getCityData(rawData)

  // 2. Initialise the menu of cities (list) behind the search functionality
  // const selectMenuContainer = d3.select('#cities-select')
  // selectMenuContainer.call(selectMenu, cityData)
  getCitiesMenu(cityData, cityInput)

  // 3. Call the cigarettes viz
  sigsContainer.call(cigsViz, selectedCity, cityData, numCigs, sigsDims)

  // 4. Initialise the particles for the PM2.5 particle graph
  initParticles(numParticles)
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

