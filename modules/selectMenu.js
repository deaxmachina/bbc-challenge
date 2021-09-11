const selectMenu = (container, cityData) => {
  container.selectAll('option')
    .data(cityData)
    .join('option')
      .attr('value', d => d.name)
      .html(d => d.name)
}


const input = document.getElementById('myInput');
const ul = document.getElementById("myUL");
const li = ul.getElementsByTagName('li');

const hideDropdownList = () => {
  for (const liEl of li) {
    liEl.style.display = "none";
  }
}

hideDropdownList()

for (const liEl of li) {
  liEl.addEventListener('click', e => {
    input.value = e.target.innerHTML
    hideDropdownList()
  })
}

input.addEventListener('keyup', e => myFunction(e))
function myFunction(e) {
  let filter = input.value.toUpperCase();
  
  // If input is empty, hide options
  if (filter.length === 0) {
    hideDropdownList()
  } else {
    // Loop through all list items, and hide those who don't match the search query
    for (let i = 0; i < li.length; i++) {
      const a = li[i].getElementsByTagName("a")[0];
      const txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }
}



export { selectMenu }