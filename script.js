const container = document.querySelector(".extensions_list");
const allButton = document.querySelector(".all_btn");
const activeButton = document.querySelector(".active_btn");
const inactiveButton = document.querySelector(".inactive_btn");

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
   <div class="extension box is-flex is-flex-direction-column grey_background">
    <div class="info is-flex is-flex-direction-row mb-6">
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
      } else {
        swch.classList.replace("inactive", "active");
        swch.firstElementChild.classList.replace("is-pulled-left", "is-pulled-right");
        swch.firstElementChild.classList.replace("off", "on");
      }
    })
  })
}

allButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (allButton.classList.contains("inactive")){
    allButton.classList.replace("inactive", "active");
  }
})
