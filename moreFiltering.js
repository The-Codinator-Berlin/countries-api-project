// Fetch function -----------------------------------------------------

const url = "https://restcountries.com/v3.1/all";

let allData = [];

const fetchData = () => {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((countriesResult) => {
      allData = countriesResult;
      createCards(allData);
      // console.log(allData);
    })
    .catch((error) => {
      console.log(error);
    });
};

fetchData();

//This function creates a card for each country with the img, name of country and a button//
function createCards(data) {
  for (let i = 0; i < data.length; i++) {
    let container = document.getElementById("container");

    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.setAttribute("style", "width: 18rem;");

    let img = document.createElement("img");
    img.classList.add("card-img-top");
    img.setAttribute("src", data[i].flags.png);
    img.setAttribute("alt", data[i].flags.alt);

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let imgTitle = document.createElement("h5");
    imgTitle.classList.add("card-title");
    imgTitle.innerText = allData[i].name.common;

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

// Checkboxes ------------------------------------------------------------
