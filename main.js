// Fetch function -------------------------------------------->
// async function fetchData() {
//   const url = "https://restcountries.com/v3.1/all";

//   try {
//     const response = await fetch(url);
//     console.log("response :>> ", response);
//     // const results = await response.json();
//     // console.log("results :>> ", results);
//   } catch (error) {
//     console.log("error :>> ", error);
//   }
// }
// fetchData();

const fetchData = () => {
  const url = "https://restcountries.com/v3.1/all";
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((results) => {
      createTableData(results);
    })
    .catch((error) => {
      console.log(error);
    });
};

fetchData();

const tableBody = document.getElementById("tableBody");

// Creating table filled dynamically with data from API ------>
function createTableData(results) {
  tableBody.innerText = "";

  for (let i = 0; i < results.length; i++) {
    const row = document.createElement("tr");

    let flag = document.createElement("img");
    flag.src = results[i].flags.png;
    flag.className = "animation";

    let names = document.createElement("td");
    names.innerText = results[i].name.common;
    names.className = "animation";

    let capital = document.createElement("td");
    capital.innerText = results[i].capital;
    capital.className = "animation";

    let population = document.createElement("td");
    population.innerText = results[i].population;
    population.className = "animation";

    row.appendChild(flag);
    row.appendChild(names);
    row.appendChild(capital);
    row.appendChild(population);

    tableBody.appendChild(row);
  }
}

// createTableData(results);

// Dropdown/ Event listener------------------------------------------------------------

const dropdownSelect = document.getElementById("countriesDropDown");
// The optionSelect() function is called when the user selects an option from the dropdown menu.
dropdownSelect.addEventListener("change", optionSelect);

function optionSelect() {
  const region = this.value;
  // this.value mean when someone is selecting this value or this dropdown option
  const filteredCountries = [];
  // An empty array called filteredCounties is created to hold the countries that match the selected region.
  if (region === "All") {
    createTableData(results);
    // creates table with results
  } else {
    for (let i = 0; i < results.length; i++) {
      if (results[i].region === region) {
        filteredCountries.push(results[i]);
        // OR loops through and takes just the data that matches the option selected
      }
    }

    createTableData(filteredCountries);
  }
}
