// Fetch import ------------------------------------------>
import { getCountriesData } from "./getCountriesData.js";

const results = getCountriesData;
// console.log("results", results);

const tableBody = document.getElementById("tableBody");

// Creating table filled dynamically with data from API ------>
function createTableData(results) {
  tableBody.innerText = "";

  for (let i = 0; i < results.length; i++) {
    const row = document.createElement("tr");

    let flag = document.createElement("img");
    flag.src = results[i].flags.png;

    let names = document.createElement("td");
    names.innerText = results[i].name.common;

    let capital = document.createElement("td");
    capital.innerText = results[i].capital;

    let population = document.createElement("td");
    population.innerText = results[i].population;

    row.appendChild(flag);
    row.appendChild(names);
    row.appendChild(capital);
    row.appendChild(population);

    tableBody.appendChild(row);
  }
}

createTableData(results);

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
