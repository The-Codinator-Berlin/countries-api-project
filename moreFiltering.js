import { getCountriesData } from "./getCountriesData.js";

const results = getCountriesData;

// console.log(results);

const inputElement = document.querySelector(".searchBox input");

// Event Listener ----------------------------------------------------------------->
inputElement.addEventListener("input", function (event) {
  let inputValues = event.target.value.toLowerCase();
  let filteredResults = [];
  if (inputValues) {
    filteredResults = results.filter((country) => {
      const name = country.name.common.toLowerCase();
      return name.startsWith(inputValues);
    });
  }
  createCards(filteredResults);
});


//This function creates a card for each country with the img, name of country and a button
function createCards(countries) {
  let container = document.getElementById("container");
  container.innerText = "";
  for (let i = 0; i < countries.length; i++) {
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

// Checkbox filtering ------------------------------------------------------------>
const checkedInputs = document.querySelectorAll("#boxFiltering input");

// Add event listener to each checkbox
checkedInputs.forEach((checkedinput) => {
  checkedinput.addEventListener("change", function () {
    // Get an array of checked checkboxes
    const checkedCheckboxes = Array.from(checkedInputs).filter(
      (checkedinput) => checkedinput.checked
    );

    // Get an array of values of the checked checkboxes
    const checkedValues = checkedCheckboxes.map(
      (checkedinput) => checkedinput.value
    );

    // Filter the results based on the checked values
    let filteredResults = [];
    if (checkedValues.length > 0) {
      filteredResults = results.filter((country) => {
        const name = country.name.common.toLowerCase();
        return checkedValues.includes(name.charAt(0));
      });
    } else {
      filteredResults = results;
    }

    createCards(filteredResults);
  });
});
