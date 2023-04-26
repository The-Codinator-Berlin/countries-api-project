// Fetch function -------------------------------------------->

async function fetchData() {
  const url = "https://restcountries.com/v3.1/all";

  try {
    const response = await fetch(url);
    // console.log("response :>> ", response);
    const results = await response.json();
    // console.log("results :>> ", results);
    createCards(results);
    addEvents(results);
    addSearchEvent(results);
  } catch (error) {
    console.log("error :>> ", error);
  }
}
fetchData();

//NOTE -  Second type of fetch here:
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

// SearchBar Event Listener ----------------------------------------------------------------->
function addSearchEvent(results) {
  const inputElement = document.querySelector(".searchB");
  inputElement.addEventListener("input", (e) => {
    // console.log("printing input value", inputElement.value);
    filterByText(results);
  });
}
//NOTE - Version 1
// SearchBar filtering
function filterByText(results) {
  const searchInputElement = document.querySelector(".searchB");
  const textInput = searchInputElement.value;
  const filteredCountriesByInput = results.filter((countries) => {
    const countriesToLowerCase = countries.name.common.toLowerCase();
    if (countriesToLowerCase.includes(textInput.toLowerCase())) {
      return true;
    } else {
      console.log("No matching countries, sorry!");
    }
  });
  createCards(filteredCountriesByInput);
  console.log("filteredCountriesByInput :>> ", filteredCountriesByInput);
}

// // NOTE - Version 2
//#region
// // // Function filterByText with results as a parameter
// function filterByText(results) {
//   // Search input being selected
//   const searchInputElement = document.querySelector(".searchB");
//   // Saving the value of whatever value is being inserted into the searchbar
//   const textInput = searchInputElement.value;
//   // Function using filter() method looping over the wholse array of countries and storing the singular countries that have been filtered in the variable filteredCountriesByInput
//   const filteredCountriesByInput = results.filter((singleResult) => {
//     // This function will return a single result (single country) which has the common name, transfromed into lower case that matches the textInput typed in the search input, also transforming it to lower case. This means that when they are both toLowerCase that they will match and not throw any errors. It also means it doesn't matter if the user types upper or lower case and the result will be the same.
//     return singleResult.name.common
//       .toLowerCase()
//       .includes(textInput.toLowerCase());
//   });
//   // createCards is then called, passing filteredCountriesByInput so that the filtered results create the cards according the the search input.
//   createCards(filteredCountriesByInput);
//   console.log("filteredCountriesByInput :>> ", filteredCountriesByInput);
// } //
//#endregion

function createCards(results) {
  // console.log("results :>> ", results);
  //NOTE - Moved contained variable and emptying container line to the top as h5 would not be able to be created otherwise.
  let container = document.getElementById("container");
  container.innerText = "";
  if (results.length === 0) {
    let noCountryMessage = document.createElement("h5");
    noCountryMessage.innerText =
      "Sorry! There are no matching results for your search :(";

    container.appendChild(noCountryMessage);
  } else {
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
      modalButton.setAttribute("id", i);
      modalButton.classList.add("btn");
      modalButton.classList.add("btn-primary");
      modalButton.classList.add("openModal");
      modalButton.dataset.indexNumber;
      modalButton.innerText = "Click for more information";

      // !-- Link now instead of normal button-->
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
  }
  //NOTE - I moved the addEvents(results); & addSearchEvent(results); directly into the fetch function so that they have access to the results stright away, fixing the issue with searchBar not repolulation all results when input cleared.

  //NOTE we move closeEvent();/ this function call to populateModal() function, because we need to create the button first, before adding the event to close it.
}
//TODO - Dropdown filtering
// Regions dropdown event/ filtering ------------------------------------------------------------>
// function addRegionEvent(results) {
//   const regionsSelect = document.querySelectorAll(".dropDownSelections");
//   regionsSelect.forEach((selection) => {
//     selection.addEventListener("change", () => {});
//     addRegionEvent(results);
//   });
// }

// Checkbox filtering ---------------------->
// function addToCheckboxes() {
//   const allBoxes = document.querySelectorAll('input[type="checkbox"]#checkbox');
//   allBoxes.forEach((checkbox) => console.log(element));
// }

// Open modal ------------------------------>
function addEvents(results) {
  // Select all the buttons that open the modal
  const openModal = document.querySelectorAll(".openModal");
  // select the html element that contains the modal , which is initally hidden
  const modal = document.getElementById("modal");
  // Create a loop to iterate over the array openModal, and assign an event to each  button
  for (let i = 0; i < openModal.length; i++) {
    openModal[i].addEventListener("click", function (e) {
      // populateModal(results[e.target.id]);
      modal.classList.remove("visually-hidden");
      // console.log("you clicked :>> ", results[e.target.id]);

      // ClickedCountry is representing a single country which is passed into populateModal to be able to bulid the modal with info from the API.
      const clickedCountry = results[e.target.id];
      populateModal(clickedCountry);
    });
  }
}

// Modal close event---------------------------------------->
function closeEvent() {
  const closeButton = document.getElementById("closeModal");
  closeButton.addEventListener("click", closeModal);
}

function closeModal() {
  const closeButton = document.querySelector(".myModal");
  closeButton.classList.add("visually-hidden");
}

// Populating modal once the button is clicked with info for just that country that relates to the index of that country
function populateModal(clickedCountry) {
  console.log("clickedCountry :>> ", clickedCountry);
  const modalContent = document.querySelector(".myModal-content");

  modalContent.innerText = ""; // this line sets all the content inside myModal-content to an empty string, removing everything inside
  let modalDiv = document.createElement("div");
  modalDiv.classList.add("modalDiv");

  let modalImgDiv = document.createElement("div");
  modalImgDiv.classList.add("modalImgDiv");

  let modalImg = document.createElement("img");
  modalImg.classList.add("modalIMG");
  modalImg.setAttribute("src", clickedCountry.coatOfArms.png);
  modalImg.setAttribute("alt", clickedCountry.coatOfArms.alt);
  modalImg.setAttribute("style", "width:30em");

  let headingFour = document.createElement("h4");
  headingFour.classList.add("modalTitle");
  headingFour.innerText = "Coat of Arms";

  const closeModalButton = document.createElement("button");

  // NOTE .classList.add admits only one class at a time (space between class names implies more than one class)

  closeModalButton.setAttribute("class", "btn btn-secondary");
  closeModalButton.setAttribute("id", "closeModal");
  closeModalButton.innerText = "close";

  modalContent.appendChild(modalDiv);
  modalContent.appendChild(modalImgDiv);
  modalDiv.appendChild(headingFour);
  modalContent.appendChild(modalImg);
  modalContent.appendChild(closeModalButton);
  closeEvent();
}
