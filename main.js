//SECTION - Fetch function -------------------------------------------->
async function fetchData() {
  const url = "https://restcountries.com/v3.1/all";

  try {
    const response = await fetch(url);
    // console.log("response :>> ", response);
    const results = await response.json();
    // console.log("results :>> ", results);
    // Called createTableData straight at the start so that when my page loads it has all the results syraight away
    createTableData(results);
    // I also want my event to be usable straight away
    dropDownEvent(results);
  } catch (error) {
    console.log("error :>> ", error);
  }
}
fetchData();
// ------------------------------------>
//SECTION - Second type of fetch here:
//#region
// const fetchData = () => {
//   const url = "https://restcountries.com/v3.1/all";
//   fetch(url)
//     .then((response) => {
//       return response.json();
//     })
//     .then((json) => {
//       console.log("json :>> ", json);
//       let results = json;
//       createCards(results);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// fetchData();
//#endregion
// ------------------------------------>

// Creating table filled dynamically with data from API ------>
function createTableData(results) {
  // Getting the tbody element
  const tableBody = document.getElementById("tableBody");
  // Clearing the tabe at the start ensures there are no duplicate rows of data
  tableBody.innerText = "";
  // Looping through the results and creating a row
  for (let i = 0; i < results.length; i++) {
    const row = document.createElement("tr");
    // Then we are creating an image element
    let flag = document.createElement("img");
    // Then filling the elementit with the image from the API
    flag.src = results[i].flags.png;
    // Then adding animation class to animate in CSS
    flag.className = "animation";

    // Now we are creating a table cell
    let names = document.createElement("td");
    // Setting the innerText to the common country name from the API data object
    names.innerText = results[i].name.common;
    // And again animation class added to add animation in CSS
    names.className = "animation";

    // Creating a table cell again
    let capital = document.createElement("td");
    // Seeting the innerText to the country capital name
    capital.innerText = results[i].capital;
    // And again animation class added to add animation in CSS
    capital.className = "animation";

    // Creating another table cell
    let population = document.createElement("td");
    // Setting the innerText to the population number obtained from the API
    population.innerText = results[i].population;
    // And again animation class added to add animation in CSS
    population.className = "animation";

    // This is where everything gets appended to the DOM (Document Object Model)
    tableBody.appendChild(row);
    row.appendChild(flag);
    row.appendChild(names);
    row.appendChild(capital);
    row.appendChild(population);
  }
}

//SECTION Dropdown/ Event listener & filter function----------------------------------------------------------------------------->

const dropdownSelect = document.getElementById("countriesDropDown");
// The optionSelect() function is called when the user selects an option from the dropdown menu.
function dropDownEvent(results) {
  dropdownSelect.addEventListener("change", function (event) {
    // Passing the results array to the optionSelect function call
    optionSelect(results);
  });
}

// Filter------------------------->
function optionSelect(results) {
  // An empty array called filteredCounties is created to hold the countries that match the selected region.
  const filteredCountries = [];

  if (dropdownSelect.value === "Choose an area of the world") {
    createTableData(results);
    // creates table with results
  } else {
    for (let i = 0; i < results.length; i++) {
      if (results[i].region === dropdownSelect.value) {
        filteredCountries.push(results[i]);
        // OR loops through and takes just the data that matches the option selected
      }
    }

    createTableData(filteredCountries);
  }
}
// ---------------------------------------------------------------------------------->
