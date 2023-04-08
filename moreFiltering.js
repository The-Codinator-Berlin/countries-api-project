const url = "https://restcountries.com/v3.1/all";

const fetchData = () => {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((countriesResult) => {
      const allData = countriesResult;
      createCards(allData);
    })
    .catch((error) => {
      console.log(error);
    });
};

fetchData();

//This function creates a card for each country with the img, name of country and a button//
function createCards(allData) {
  for (let i = 0; i < allData.length; i++) {
    let container = document.getElementById("container");

    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.setAttribute("style", "width: 18rem;");

    let img = document.createElement("img");
    img.classList.add("card-img-top");
    img.setAttribute("src", allData[i].flags.png);
    img.setAttribute("alt", allData[i].flags.alt);

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

