// const selectMenu = (container, cityData) => {
//   container.selectAll('option')
//     .data(cityData)
//     .join('option')
//       .attr('value', d => d.name)
//       .html(d => d.name)
// }


// // const input = document.getElementById('cityInput');
// // const ul = document.getElementById("cityList");
// // const li = ul.getElementsByTagName('li');

// const hideDropdownList = (li) => {
//   for (const liEl of li) {
//     liEl.style.display = "none";
//   }
// }

// // hideDropdownList()

// // for (const liEl of li) {
// //   liEl.addEventListener('click', e => {
// //     input.value = e.target.innerHTML
// //     hideDropdownList()
// //   })
// // }

// // input.addEventListener('keyup', e => searchMatches(e))

// function searchMatches(li, input) {
//   let filter = input.value.toUpperCase();
//   // If input is empty, hide options
//   if (filter.length === 0) {
//     hideDropdownList(li)
//   } else {
//     // Loop through all list items, and hide those who don't match the search query
//     for (let i = 0; i < li.length; i++) {
//       const a = li[i];
//       const txtValue = a.textContent || a.innerText;
//       if (txtValue.toUpperCase().indexOf(filter) > -1) {
//         li[i].style.display = "";
//       } else {
//         li[i].style.display = "none";
//       }
//     }
//   }
// }

const getCitiesMenu = (cityData, cityInput, cityList, selectedCity, numParticles, graph) => {
  const listCities = cityList.selectAll('li')
    .data(cityData)
    .join('li')
    .html(d => d.name)
    .classed('city-option', true)
    .style('display', 'none')
    .on('click', function(e) {
      selectedCity = e.target.innerHTML
      cityInput.property('value', selectedCity)
      listCities.style('display', 'none')

      numParticles = cityData.filter(city => city.name === selectedCity)[0].aqi
      const aqiValue = document.querySelector('.aqi-value')
      aqiValue.innerHTML = numParticles
      graph(selectedCity)
    })

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




export { getCitiesMenu }