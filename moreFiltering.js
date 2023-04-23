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
      createCards(results);
    })
    .catch((error) => {
      console.log(error);
    });
};

fetchData();

const inputElement = document.querySelector(".searchBox input");

// Event Listener ----------------------------------------------------------------->
inputElement.addEventListener("input", filterCountries);

function filterCountries(event) {
  let inputValues = event.target.value.toLowerCase();
  console.log("inputValues :>> ", inputValues === "");
  if (inputValues === "") {
    inputValues = "empty";
  }
  let filteredResults = [];
  if (inputValues) {
    filteredResults = results.filter((country) => {
      const name = country.name.common.toLowerCase();
      console.log("inputValues :>> ", inputValues);
      return name.includes(inputValues) || inputValues == "empty";
    });
  }
  createCards(filteredResults);
}
function createCards(results) {
  let container = document.getElementById("container");
  container.innerText = "";
  for (let i = 0; i < results.length; i++) {
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.setAttribute("style", "width: 18rem;");

    let img = document.createElement("img");
    img.classList.add("card-img-top");
    img.setAttribute("src", results[i].flags.png);
    img.setAttribute("alt", results[i].flags.alt);

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let imgTitle = document.createElement("h5");
    imgTitle.classList.add("card-title");
    imgTitle.innerText = results[i].name.common;

    let modalButton = document.createElement("button");
    modalButton.setAttribute("id", results[i].name.common);
    modalButton.classList.add("btn");
    modalButton.classList.add("btn-primary");
    modalButton.dataset.indexNumber;
    modalButton.innerText = "Click for more information";

    //// Link now instead of normal button
    let a = document.createElement("a");
    a.setAttribute("id", results[i].name.common);
    a.classList.add("btn");
    a.classList.add("btn-light");
    a.innerText = "Go to country page";
    a.setAttribute("href", "openWindow.html"); // search for a way to dinamically create an html address that includes the name of the country
    a.setAttribute("target", "_blank");

    container.appendChild(cardDiv);
    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBody);
    cardBody.appendChild(imgTitle);
    cardBody.appendChild(modalButton);
    cardBody.appendChild(a);
  }
  addEvents();
  closeEvent();
}

// Checkbox filtering ------------------------------------------------------------>

const checkboxes = document.querySelectorAll("#boxFiltering input");

const regionsSelect = document.getElementById("regions");

// Function to filter results based on the selected region and checked checkboxes
function filterResults() {
  // Get the selected region value
  const selectedRegion = regionsSelect.value;

  // Get an array of checked checkboxes
  const checkedCheckboxes = Array.from(checkboxes).filter(
    (checkbox) => checkbox.checked
  );

  // Get an array of values of the checked checkboxes
  const checkedValues = checkedCheckboxes.map((checkbox) => checkbox.value);

  // Filter the results based on the selected region and checked values
  // Get the country name in lowercase
  // If "all" is selected, match all regions
  // If "All Regions" is selected, match all regions
  // Otherwise, match the selected region
  // If no checkbox is selected, match all countries
  // Otherwise, match countries starting with selected letters
  // Return true if both conditions are met
  // Pass the filtered results to a function to create elements
  let filteredResults = results.filter((country) => {
    const name = country.name.common.toLowerCase();
    const isRegionMatch =
      selectedRegion === "all" ||
      selectedRegion === "All Regions" ||
      country.region === selectedRegion;
    const isCheckboxMatch =
      checkedValues.length === 0 || checkedValues.includes(name.charAt(0));

    return isRegionMatch && isCheckboxMatch;
  });

  createCards(filteredResults);
}

// Event listener for "regions"
regionsSelect.addEventListener("change", filterResults);

// Add event listener to each checkbox
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", filterResults);
});

// Open modal ------------------------------>
function addEvents(results) {
  const allAnchorTags = document.querySelectorAll(".btn");
  console.log("allAnchorTags :>> ", allAnchorTags.length);

  const modal = document.getElementById("modal");
  for (let i = 0; i < allAnchorTags.length; i++) {
    // console.log("allAnchorTags.length :>> ", allAnchorTags[i]);
    allAnchorTags[i].addEventListener("click", function (e) {
      console.log("hi");
      console.log("event :>> ", e.target.id);
      modal.classList.remove("visually-hidden");
    });
  }
}

function populateModal() {}

// Modal close event---------------------------------------->
function closeEvent() {
  const closeButton = document.getElementById("closeModal");
  closeButton.addEventListener("click", closeModal);
  closeModal();
}

function closeModal() {
  const closeButton = document.querySelector(".myModal");
  closeButton.classList.add("visually-hidden");
  // console.log("close :>> ", close);
}

// Assing to each button and id with the index number of that country

// creaate a "populate modal" function, that takes as a parameter the country (results[i])

// send the data from createCards, to addEvents , which is where we open the modal.  From there call populateModal, sending the single country (rememberm the single country will correspond to the id number ...which is the index of country)

// do the fetch in the same file. And make it so that is the first function that you call in your file...and actually the only one you call in the global scope .
// the domino should be something like :1 fetch, inside fetch function call create cards, inside create cards, call add events and maybe cre.....
