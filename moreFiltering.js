// Fetch function -------------------------------------------->

async function fetchData() {
  const url = "https://restcountries.com/v3.1/all";

  try {
    const response = await fetch(url);
    // console.log("response :>> ", response);
    const results = await response.json();
    // console.log("results :>> ", results);
    createCards(results);
  } catch (error) {
    console.log("error :>> ", error);
  }
}
fetchData();

// Second type of fetch here:
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
function filterByText(results) {
  const searchInputElement = document.querySelector(".searchB");
  const textInput = searchInputElement.value;
  // console.log("textInput :>> ", textInput);
  const filteredTextInput = results.filter((countries) => {
    if (countries.name.common.toLowerCase() === textInput) {
      return true;
    } else {
      return false;
    }
  });

  //TODO -
  //a) //create a variable that is gonna store the result of apling the function filter to the array of results.
  //B) inside the callback of the filter function (lookup the syntax), in the return, you express a condition that when it is true, it will store that element inside the array
  //B.1) CONSOLE LOG THE VARIABLE YOU ARE USING!
  //C) call the create table function with the variable that contains the filtered results

  // console.log("filteredTextInput", filteredTextInput);
  // const filteredTextInput = results.filter((textinput) => {
  //   return
  // });
}

//Build a search by input filter :
//1st add an event to the search  input
//in the callback of the addEventListener function, insert a console.log that you have to see every time you press a key. If not, investigate why./
//DONE

//2) insert a console.log that every time you type, shows the value of the text typed in the console.//DONE

//3) create a function (e.g. filterByText) that receives as parameter the array of results.
// this functions needs to know the value of the text typed (find the element input, and use the .value property)
// using .filter(), loop over the results array, and using the value of the input as criteria , create an array with the countries its name matches the text.
// call the createCards() with the array of filtered countries

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
  addEvents(results);
  addSearchEvent(results);
  // closeEvent(); //NOTE we move this function call to populateModal() function, because we need to create the button first, before adding the event to close it
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

// send the data from createCards, to addEvents , which is where we open the modal.  From there call populateModal, sending the single country (rememberm the single country will correspond to the id number ...which is the index of country)

// do the fetch in the same file. And make it so that is the first function that you call in your file...and actually the only one you call in the global scope .
// the domino should be something like :1 fetch, inside fetch function call create cards, inside create cards, call add events and maybe cre.....
