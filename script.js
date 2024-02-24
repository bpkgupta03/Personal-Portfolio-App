// For header text
cores = "Software Engineer | Frontend/UI Developer | Backend Developer | Full Stack Developer"
const movingText = document.querySelector('.moving_text');
const items = cores.split('|').map(item => item.trim())

let currentIndex = 0;

function updateText(){
  movingText.textContent = items[currentIndex];

  currentIndex  = (currentIndex+1)%items.length;
}

setInterval(updateText,1800);

var tabLinks = document.getElementsByClassName("tab-links");
var tabContents = document.getElementsByClassName("tab-contents");
console.log(tabLinks, tabContents);

function openTab(tabName) {
  console.log(tabName);
  for (tablink of tabLinks) tablink.classList.remove("active-link");

  for (tabContent of tabContents) tabContent.classList.remove("active-tab");

  event.currentTarget.classList.add("active-link");
  document.getElementById(tabName).classList.add("active-tab");
}

var sidemenu = document.getElementById("sideMenu");
function closeMenu() {
  sidemenu.style.right = "-175px";
}
function openMenu() {
  sidemenu.style.right = "0";
}

function showExp(expId) {
  var currentExp = document.getElementById(expId);
  var allExp = document.querySelectorAll(".experience-highlights");

  allExp.forEach(function (exp) {
    if (exp !== currentExp) {
      exp.classList.remove("show");
    }
  });
  currentExp.classList.toggle("show");
}

function submitForm(event) {
  event.preventDefault();
  var formData = new FormData(document.getElementById("myForm"));
  const url = "http://localhost:8000/submit/";
  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      return response.json();
    })
    .then((data) => {
      // Display success message using Toastify
      Toastify({
        text: data.message,
        duration:5000,
        close: true,
        gravity: "toastify-top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
    })
    .catch((error) => {
      alert("An error occurred while submitting the form");
    });
}
