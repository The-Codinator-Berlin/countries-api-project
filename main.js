import { getCountriesData } from "./getCountriesData.js";

// Fetch function -----------------------------------------------------
getCountriesData(createTableData);

// Creating table with data ------------------------------------------

const tableBody = document.getElementById("tableBody");

function createTableData(countries) {
  tableBody.innerText = "";

  for (let i = 0; i < countries.length; i++) {
    const row = document.createElement("tr");

    let flag = document.createElement("img");
    flag.src = countries[i].flags.png;

    let names = document.createElement("td");
    names.innerText = countries[i].name.common;

    let capital = document.createElement("td");
    capital.innerText = countries[i].capital;

    let population = document.createElement("td");
    population.innerText = countries[i].population;

    row.appendChild(flag);
    row.appendChild(names);
    row.appendChild(capital);
    row.appendChild(population);

    tableBody.appendChild(row);
  }
}

// Dropdown/ Event listener------------------------------------------------------------

const dropdownSelect = document.getElementById("countriesDropDown");
// The optionSelect() function is called when the user selects an option from the dropdown menu.
dropdownSelect.addEventListener("change", optionSelect);

function optionSelect() {
  const region = this.value;
  // this.value mean when someone is selecting this value or this dropdown option
  const filteredCountries = [];
  // An empty array called filteredData is created to hold the countries that match the selected region.
  if (region === "All") {
    createTableData(allData);
    // creates table with all data 
  } else {
    for (let i = 0; i < allData.length; i++) {
      if (allData[i].region === region) {
        filteredCountries.push(allData[i]);
        // OR loops through and takes just the data that matches the option selected
      }
    }

    createTableData(filteredCountries);
  }
}
