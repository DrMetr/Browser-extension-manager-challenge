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
      html += `<div class="extension box shown ext_active is-flex is-flex-direction-column grey_background">`;
    } else {
      html += `<div class="extension box shown ext_inactive is-flex is-flex-direction-column grey_background">`;
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
    sortButtons.forEach(item => item.classList.add("inactive"));
    btn.classList.replace("inactive", "active");

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
  if(document.querySelector("body").classList.contains("dark")){
    document.querySelector("body").classList.replace("dark", "light")
    document.querySelector(".logo_title_masker").style.display = "none";
    document.querySelectorAll(".on").forEach(item => item.style.border = "1px solid var(--Red)");
    document.querySelectorAll(".active").forEach(item => item.style.backgroundColor = "var(--Red)");
    document.querySelectorAll(".off").forEach(item => item.style.border = "1px solid var(--Neutral200)");
    document.querySelectorAll(".inactive").forEach(item => item.style.backgroundColor = "var(--Neutral200)");
  } else if (document.querySelector("body").classList.contains("light")) {
    document.querySelector("body").classList.replace("light", "dark");
    document.querySelector(".logo_title_masker").style.display = "inline";
    document.querySelectorAll(".on").forEach(item => item.style.border = "1px solid var(--Pink)");
    document.querySelectorAll(".active").forEach(item => item.style.backgroundColor = "var(--Pink)");
  }
})