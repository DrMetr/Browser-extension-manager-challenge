const container = document.querySelector(".extensions_list");
let extensions = [];

fetch("data.json")
  .then((res) => {
    if (!res.ok) {
      throw new Error(`Network response was not ok: ${res.statusText}`);
    }
    return res.json();
  }) 
  .then((data) => {
    extensions = data;
    placeStuff(data);
  })
  .catch((err) => {
    container.innerHTML = `Error fetching data: ${err.message}`;
  });

function placeStuff(data){
  let html = '';
  data.forEach(item => {
    html += `
    <div class="extension is-flex-direction-row grey_background">
    <img src="${item.logo}">
    <div class="description is-pulled-right">
    <h2>${item.name}</h2>
    <p>${item.description}</p>
    </div>
    <button class="remove_button is-pulled-left">Remove</button>
    `;
    if (item.isActive == true) {
      html += `<button class="switch active is-pulled-right"><div class="switch_button is-pulled-right"></div></button></div>`;
    } else {
      html += `<button class="switch inactive is-pulled-right"><div class="switch_button is-pulled-left"></div></button></div>`;
    }
  })

  container.innerHTML = html;

  document.querySelectorAll(".switch").forEach(swch => {
    swch.addEventListener("click", (event) => {
      event.preventDefault();
      if (swch.classList.contains("active")){
        swch.classList.replace("active", "inactive");
        swch.firstElementChild.classList.replace("is-pulled-right", "is-pulled-left");
      } else {
        swch.classList.replace("inactive", "active");
        swch.firstElementChild.classList.replace("is-pulled-left", "is-pulled-right");
      }
    })
  })
}

