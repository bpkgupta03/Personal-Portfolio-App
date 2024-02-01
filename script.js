
var tabLinks = document.getElementsByClassName('tab-links')
var tabContents = document.getElementsByClassName('tab-contents')
console.log(tabLinks,tabContents);

function openTab(tabName){
    console.log(tabName);
    for(tablink of tabLinks)
        tablink.classList.remove('active-link')

    for(tabContent of tabContents)
        tabContent.classList.remove('active-tab')

    event.currentTarget.classList.add('active-link')
    document.getElementById(tabName).classList.add('active-tab')
}

var sidemenu = document.getElementById('sideMenu');
function closeMenu(){
    sidemenu.style.right = "-175px";
}
function openMenu(){
    sidemenu.style.right = "0";
}

function showExp(expId){
    var currentExp = document.getElementById(expId);
    var allExp = document.querySelectorAll('.experience-highlights');

    allExp.forEach(function (exp) {
        if (exp !== currentExp) {
            exp.classList.remove('show');
        }
    });
    currentExp.classList.toggle('show');
}