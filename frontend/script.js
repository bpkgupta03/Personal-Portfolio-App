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
  showLoader();
  var formData = new FormData(document.getElementById("myForm"));
  const url = "http://localhost:8000/submit/";
  fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log(response)
      if (response.status !== 200) {
        throw new Error("Failed to submit form");
      }
      return response.json();
    })
    .then((data) => {
      hideLoader();
      // Display success message using Toastify
      Toastify({
        text: data.message,
        duration:3000,
        close: true,
        gravity: "toastify-bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
      clearForm();
    })
    .catch((error) => {
      hideLoader();
      Toastify({
        text: error.message,
        duration:3000,
        close: true,
        gravity: "toastify-bottom", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true,
        style: {
          background: "red",
        },
      }).showToast();
    });
}

function showLoader(){
  document.getElementById("loader").style.display="block";
  document.getElementById("submitText").style.display = "none";
}
function hideLoader(){
  document.getElementById("loader").style.display="none";
  document.getElementById("submitText").style.display = "block";
}
function clearForm(){
  document.getElementById("myForm").reset();
}
function explodeAbout(){
  document.getElementById("about_more").style.display="block";
  document.getElementById("read_more").style.display="none";
}
// scroll line move beneath navbar
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  const line = document.getElementById('line');
  
  // Calculate the scroll percentage
  const scrollPercent = (document.documentElement.scrollTop || document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100;
 
  // Calculate the width of the line based on the scroll percentage
  const lineWidth = scrollPercent + '%';
  
  // Update the width of the line
  line.style.width = lineWidth;
});
