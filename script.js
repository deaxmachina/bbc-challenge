

d3.json('english.json').then(data => {
  console.log(data)

  const cityData = []
  const numCities = new Array(32); // create an empty array with length 32
  for(let i = 1; i <= numCities.length; i++) {
    console.log("number", i)
    const city = {
      name: data[`compare-tabs_1_city_${i}_name`],
      aqiFull: data[`compare-tabs_1_city_${i}_aqi`],
      aqi: +data[`compare-tabs_1_city_${i}_aqi`].split(' ')[0],
      cigg: +data[`compare-tabs_1_city_${i}_cigg`]
    }
    cityData.push(city)
  }

  console.log(cityData)
})

const svg = d3.select("#graph-wrapper").append("svg")
  .attr("width", 400)
  .attr("height", 400)


svg.append("rect")
  .attr("width", 200)
  .attr("height", 200)
  .attr("fill", 'hotpink')

