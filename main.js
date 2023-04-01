// console.log(data);

// const myFetch = () => {
//   fetch("https://restcountries.com/v3.1/all")
//     .then((response) => response.json())
//     .then((result) => console.log(result))
//     .catch((err) => console.log(err));

const body = document.getElementById("tableBody");

for (let i = 0; i < data.length; i++) {
  const row = document.createElement("tr");
  tableBody.appendChild(row);

  let flag = document.createElement("img");
  flag.src = data[i].flags.png;

  let names = document.createElement("td");
  names.innerText = data[i].name.common;

  let capital = document.createElement("td");
  capital.innerText = data[i].capital;

  let population = document.createElement("td");
  population.innerText = data[i].population;

  tableBody.appendChild(flag);
  tableBody.appendChild(names);
  tableBody.appendChild(capital);
  tableBody.appendChild(population);
}

// const myFetch = () => {
//   fetch("https://restcountries.com/v3.1/all")
//     .then((response) => response.json())
//     .then((result) => console.log(result))
//     .catch((err) => console.log(err));
// };
// console.log(data);
// const tbody = document.getElementById("tableBody");

// for (let i = 0; i < data.length; i++) {

//   // for every item I create a row
//   const tableRow = document.createElement("tr");
//   // Then I append it to the html
//   tbody.appendChild(row);
//   const countryName = document.createElement("td");
//   countryName.innerHTML = data[i].name.official;
//   const cap = document.createElement("td");
//   cap.innerHTML = data[i].capital;
//   const pop = document.createElement("td");
//   pop.innerHTML = data[i].population;
//   const flagg = document.createElement("td");
//   flagg.innerHTML = data[i].flags.png;

//   row.append(countryName, cap, pop, flagg);
// }

// let i =onsole.log(data[0].name.official);

// fetch("https://restcountries.com/v3.1/all")
//   .then((data) => {
//     return data.json();
//   })
//   .then((objectData) => {});
// console.log(objectData[0].name.official);

// for (let i = 0; i < data.length; i++) {
//   const tContents = document.getElementById("tableBody");
//   const name = document.createElement("tr");
//   name.innerText = data[i].name.official;
//   const capital = document.createElement("tr");
//   capital.innerText = data[i].capital;

//   tContents.appendChild(name);
// //   tContents.appendChild(capital);
// }
// (values.name.official);

// fetch("https://restcountries.com/v3.1/all")
//   .then((data) => {
//     return data.json();
//   })
//   .then((objectData) => {
//     // console.log(objectData[0].name.official);
//     let tableData = "";
//     objectData.map((values) => {
//       tableData += ` <tr>
//         <td>${values.name.official}</td>
//         <td>${values.capital}</td>
//         <td>${values.population}</td>
//         <td>${values.flags.png}</td>`;
//     });
//     document.getElementById("tableBody").innerHTML = tableData;
//   });

// document.getElementById("tableBody").
//     innerHTML = tableData;
// })
