const selectMenu = (container, cityData) => {
  container.selectAll('option')
    .data(cityData)
    .join('option')
      .attr('value', d => d.name)
      .html(d => d.name)
}


// const input = document.getElementById('cityInput');
// const ul = document.getElementById("cityList");
// const li = ul.getElementsByTagName('li');

const hideDropdownList = (li) => {
  for (const liEl of li) {
    liEl.style.display = "none";
  }
}

// hideDropdownList()

// for (const liEl of li) {
//   liEl.addEventListener('click', e => {
//     input.value = e.target.innerHTML
//     hideDropdownList()
//   })
// }

// input.addEventListener('keyup', e => searchMatches(e))

function searchMatches(li, input) {
  let filter = input.value.toUpperCase();
  // If input is empty, hide options
  if (filter.length === 0) {
    hideDropdownList(li)
  } else {
    // Loop through all list items, and hide those who don't match the search query
    for (let i = 0; i < li.length; i++) {
      const a = li[i];
      const txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }
}



export { selectMenu, hideDropdownList, searchMatches }