import { getCountriesData } from "./getCountriesData.js";

// Fetch function -----------------------------------------------------
getCountriesData(createCards);

//This function creates a card for each country with the img, name of country and a button and also calls the filterByInput function//
function createCards(allCountries) {
  const countries = filterByInput(allCountries);

  for (let i = 0; i < countries.length; i++) {
    let container = document.getElementById("container");

    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.setAttribute("style", "width: 18rem;");

    let img = document.createElement("img");
    img.classList.add("card-img-top");
    img.setAttribute("src", countries[i].flags.png);
    img.setAttribute("alt", countries[i].flags.alt);

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let imgTitle = document.createElement("h5");
    imgTitle.classList.add("card-title");
    imgTitle.innerText = countries[i].name.common;

    let btn = document.createElement("button");
    btn.classList.add("btn");
    btn.classList.add("btn-primary");
    btn.innerText = "Click for more information";

    container.appendChild(cardDiv);
    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBody);
    cardBody.appendChild(imgTitle);
    cardBody.appendChild(btn);
  }
}

function filterByInput(countries) {
  const input = document.querySelector('input[type="search"]');

  input.onsearch = () => {
    console.log(`The term searched for was ${input.value}`);
  };
  const searchInput = "United";
  const filteredCountries = countries.filter(function (country) {
    return country.name.common.includes(searchInput);
  });
  return filteredCountries;
}

// Search Bar--------------------------------------------------

// 1. filter country names with a static name like united

// 2. countries.filter(function(country) {
//   return country.name.common.includes(searchTerm);
// });

// get search term from user to be what filter is

// listn to text input inside search box (innerhtml) and print hey it changed every time I change whats inside

// 3. event that filters as soon as you start typing
