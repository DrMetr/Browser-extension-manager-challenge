const container = document.querySelector(".extensions_list");
const themeButton = document.querySelector(".theme_button");
const allButton = document.querySelector(".all_btn");
const activeButton = document.querySelector(".active_btn");
const inactiveButton = document.querySelector(".inactive_btn");

const sortButtons = [allButton, activeButton, inactiveButton];

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

    if (item.isActive == true) {
      html += `<div class="extension cell box shown ext_active is-flex is-flex-direction-column">`;
    } else {
      html += `<div class="extension cell box shown ext_inactive is-flex is-flex-direction-column">`;
    }

    html += `<div class="info is-flex is-flex-direction-row mb-6">
      <img src="${item.logo}" class="is-pulled-left mr-4">
      <div class="description is-pulled-right">
        <h2>${item.name}</h2>
        <p class="has-text-grey-light">${item.description}</p>
      </div>
    </div>

    <div class="buttons is-flex is-justify-content-space-between">
      <button class="remove_button">
        Remove
      </button>
    `;

    if (item.isActive == true) {
      html +=  `<button class="switch active">
                        <div class="switch_button on is-pulled-right"></div>
                      </button>
                  </div>
                </div>`;
    } else {
      html += `<button class="switch inactive">
                        <div class="switch_button off is-pulled-left"></div>
                      </button>
                  </div>
                </div>`;
    }
  })

  container.innerHTML = html;

  document.querySelectorAll(".switch").forEach(swch => {
    swch.addEventListener("click", (event) => {
      event.preventDefault();
      if (swch.classList.contains("active")){
        swch.classList.replace("active", "inactive");
        swch.firstElementChild.classList.replace("is-pulled-right", "is-pulled-left");
        swch.firstElementChild.classList.replace("on", "off");
        let pardiv = swch.closest(".ext_active");
        pardiv.classList.replace("ext_active", "ext_inactive");
      } else {
        swch.classList.replace("inactive", "active");
        swch.firstElementChild.classList.replace("is-pulled-left", "is-pulled-right");
        swch.firstElementChild.classList.replace("off", "on");
        let pardiv = swch.closest(".ext_inactive");
        pardiv.classList.replace("ext_inactive", "ext_active");
      }
    })
  })

  document.querySelectorAll(".remove_button").forEach(btn => btn.addEventListener("click", event => {
    event.preventDefault();
    btn.closest(".extension").classList.add("removed");
  }))
}

sortButtons.forEach(btn => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    sortButtons.forEach(item => item.classList.add("inactive_sort"));
    btn.classList.replace("inactive_sort", "active_sort");

    if(btn == activeButton){
      document.querySelectorAll(".ext_inactive")
        .forEach(item => item.classList.replace("shown", "none"));
        document.querySelectorAll(".ext_active")
        .forEach(item => item.classList.replace("none", "shown"));
    } else if (btn == inactiveButton) {
      document.querySelectorAll(".ext_inactive")
        .forEach(item => item.classList.replace("none", "shown"));
        document.querySelectorAll(".ext_active")
        .forEach(item => item.classList.replace("shown", "none"));
    } else {
      document.querySelectorAll(".none")
        .forEach(item => item.classList.replace("none", "shown"));
    }
})})

themeButton.addEventListener("click", event => {
  event.preventDefault();

  let theme = document.documentElement.getAttribute("data-theme");
  document.documentElement.setAttribute("data-theme",
    theme === "dark" ? "light":"dark"
  );

  let icon = document.querySelector("#theme_icon").getAttribute("src");
  document.querySelector("#theme_icon").setAttribute("src",
    icon === "assets/images/icon-sun.svg" ? "assets/images/icon-moon.svg":"assets/images/icon-sun.svg"
  );

  let mask = document.querySelector(".logo_title_masker");
  if (theme == "dark"){
    mask = "visible";
  } else {
    mask = "invisible";
  }
})