// Extract all data for cities in a list of objects - one for each city
const getCityData = (rawData) => {
  const cityData = []
  const numCities = 32 // todo: get this number programmatically from data
  const numCitiesArr = new Array(numCities)
  for (let i = 1; i <= numCitiesArr.length; i++) {
    const city = {
      name: rawData[`compare-tabs_1_city_${i}_name`],
      aqiFull: rawData[`compare-tabs_1_city_${i}_aqi`],
      aqi: +rawData[`compare-tabs_1_city_${i}_aqi`].split(' ')[0],
      cigg: +rawData[`compare-tabs_1_city_${i}_cigg`]
    }
    cityData.push(city)
  }
  return cityData
}

export { getCityData }
