const url = "https://restcountries.com/v3.1/all";

const fetchData = () => {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((countriesResult) => {
      const allData = countriesResult;
      creteTableData(allData);
    })
    .catch((error) => {
      console.log(error);
    });
};

fetchData();

const body = document.getElementById("tableBody");

function creteTableData(allData) {
  for (let i = 0; i < allData.length; i++) {
    const row = document.createElement("tr");

    let flag = document.createElement("img");
    flag.src = allData[i].flags.png;

    let names = document.createElement("td");
    names.innerText = allData[i].name.common;

    let capital = document.createElement("td");
    capital.innerText = allData[i].capital;

    let population = document.createElement("td");
    population.innerText = allData[i].population;

    tableBody.appendChild(row);
    tableBody.appendChild(flag);
    tableBody.appendChild(names);
    tableBody.appendChild(capital);
    tableBody.appendChild(population);
  }
};