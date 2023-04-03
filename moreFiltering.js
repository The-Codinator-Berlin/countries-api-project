// const cards = document.getElementById("cardContainer");

// for (let i = 0; i < data.length; i++) {
//   let card = document.createElement("div");

//   let flag = document.createElement("img");
//   flag.src = data[i].flags.png;

//   let x = document.getElementById("cardButton");
//   let buttons = document.createElement("BUTTON", "More");

//   let h5 = document.getElementById("h-5");
//   let header = document.createElement("h5");
//   header.innerText = data[i].name.common;

//   cardContainer.appendChild(div);
//   cardContainer.appendChild(img);
//   cardContainer.appendChild(BUTTON, "More");
//   cardContainer.appendChild(h5);
// }


for (let i = 0; i < data.length; i++) {
    let container = document.getElementById("container");

    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.setAttribute("style", "width: 18rem;");

    container.appendChild(cardDiv)
}