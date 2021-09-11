
import { testGraph } from "./modules/test.js"
import { getCityData } from "./modules/dataPrep.js"
import { initParticles, animateParticles } from "./modules/canvasParticles.js"


const svg = d3.select("#graph-wrapper").append("svg")
  .attr("width", 200)
  .attr("height", 200)


// Control the number of particles 
//let numParticles = 200
// const particlesDropdown = document.getElementById('particles')
// particlesDropdown.addEventListener('change', e => {
//   numParticles = +e.target.value
//   graph(numParticles)
// })

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



async function graph() {
  // 1. Load in the raw data
  const rawData = await d3.json('english.json')
  console.log(rawData)
  const cityData = getCityData(rawData)
  console.log(cityData)

  // 2. Call the graphs on the container with the data
  //svg.call(testGraph, cityData)
  const domElement = d3.select("#cigarette");
  domElement.call(cigGraph)

  // 3. Draw particles 
  initParticles()
  //console.log('particlesArray', particlesArray)
  animateParticles()
}

graph()


// window.addEventListener('resize', e => {
//   if (window.innerWidth < 600) {
//     canvas.width = 300
//   } else {
//     canvas.width = 400
//   }
//   console.log('resized the window')
// })

