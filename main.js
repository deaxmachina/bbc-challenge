
import { testGraph } from "./modules/test.js"
import { getCityData } from "./modules/dataPrep.js"
import { canvas, initParticles, animateParticles } from "./modules/canvasParticles.js"

let rawData;
let cityData; 
let selectedCity = 'Lucknow'
let numParticles = 100


const svg = d3.select("#graph-wrapper").append("svg")
  .attr("width", 200)
  .attr("height", 200)


// When a city is selected, update the selectedCity and nums for aqi and 
// and draw the graph with updated values
const citiesDropdown = document.getElementById('cities-select')
citiesDropdown.addEventListener('change', e => {
  selectedCity = e.target.value;
  numParticles = cityData.filter(city => city.name === selectedCity)[0].aqi
  graph(selectedCity)
})

const cigGraph = (container) => {
  const imagePath = './ciggrette_icon.png';
  container.selectAll('img')
    .data([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    .join('img')
      .attr('src', imagePath)
      //.style('position', 'absolute')
      .style('margin-left', (d, i) => `${2}px`)
      //.style('top', (d, i) =>  i<=5 ? `${350}px` : '420px')
      .style('transform', (d, i) => `rotate(${20*Math.random()-10}deg)`)
      .style('transform', (d, i) => `rotate(60deg)`)
      .style('height', '80px')
      .style('width', '30px')
      .style('opacity', (d, i) => i<5 ? 1 : 0.1)
}



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
  const domElement = d3.select("#cigarette");
  domElement.call(cigGraph)

  // 4. Draw particles 
  initParticles(numParticles)
  //animateParticles() -- make sure this happens after graph and it is not ever called again
}

graph(selectedCity)
animateParticles()


window.addEventListener('resize', e => {
  if (window.innerWidth < 600) {
    canvas.width = 300
  } else {
    canvas.width = 400
  }
})

