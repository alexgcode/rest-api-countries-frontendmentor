/* its the same that sync await
fetch('https://restcountries.com/v3.1/alpha?codes=ger,usa,br,is,afg,alb,alg,ax')
    .then(response => response.json() )
    .then(json => console.log(json));
*/
const grid = document.querySelector(".countries-grid");
const searchValue = 'alpha?codes=ger,usa,br,is,afg,alb,alg,ax&&';
const api_url = 'https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,region'; //alpha?codes=ger,usa,br,is,afg,alb,alg,ax&&fields=name,capital,region,population,flags';
const moonDark = document.querySelector(".moon-dark");
const moonLight = document.querySelector(".moon-light");
const searchText = document.querySelector(".search-bar__text");
const searchInput = document.querySelector(".search-bar__text");
const dropdownFilter = document.querySelector(".default_option");
const darkmodeCheck = document.querySelector("#darkmodeCheck");
let filterValue = '';
let countriesList = [];
let displayedCountries = [];

function removeAllChildNodes(parent) {
    console.log(parent.firstChild);
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function createDataGrid(data, grid) {
    grid.innerHTML = '';
    data.forEach(country => {
        let card = document.createElement("div");
        card.className = 'country-card';

        let cardImage = document.createElement("div");
        cardImage.className = 'country-card__image';
        cardImage.style.backgroundImage = "url("+ country.flags.svg +")";

        let cardLink = document.createElement("a");
        cardLink.href = 'detail.html?country='+encodeURIComponent(country.name.common);
        cardLink.appendChild(cardImage);

        let cardText = document.createElement("div");
        cardText.className = 'country-card__text';

        let cardName = document.createElement("a");
        cardName.href = 'detail.html?country='+encodeURIComponent(country.name.common);
        cardName.className = 'country-card__name';
        cardName.innerText = country.name.common;

        let cardPop = document.createElement("p");
        cardPop.className = 'country-card__attribute';
        cardPop.innerHTML = '<span class="country-card__category">Population: </span>' +  country.population;

        let cardReg = document.createElement("p");
        cardReg.className = 'country-card__attribute';
        cardReg.innerHTML = '<span class="country-card__category">Region: </span>' +  country.region;

        let cardCap = document.createElement("p");
        cardCap.className = 'country-card__attribute';
        cardCap.innerHTML = '<span class="country-card__category">Capital: </span>' +  country.capital;
        
        grid.appendChild(card);
        //card.appendChild(cardImage);
        card.appendChild(cardLink);
        card.appendChild(cardText);
            cardText.appendChild(cardName);
            cardText.appendChild(cardPop);
            cardText.appendChild(cardReg);
            cardText.appendChild(cardCap);
        
    });
}


//load grid
window.addEventListener('DOMContentLoaded', async () => {
    grid.innerHTML = "<h1 style='color:white; grid-row: 1; grid-column: 3;'>Loading...</h1>";
    countriesList = await loadCountries();
    createDataGrid(countriesList, grid);
    const body = document.querySelector(".body");
    body.style.height = '100%';
    dropdownFilter.value = "";
});

async function loadCountries() {
    const response = await fetch(api_url);
    return await response.json();
}


/* ----------------- search filter to api ---------------*/

searchInput.addEventListener('keyup', e => {
    console.log(filterValue);
    const c = countriesList.filter(country => {
        return country.name.common.toUpperCase().includes(searchInput.value.toUpperCase()) 
                && country.region.toUpperCase().includes(filterValue.toUpperCase());
    });
    //console.log(c);
    createDataGrid(c,grid);
});


/*--------- dropdown filter --------------*/

//console.log(dropdownFilter);

observer = new MutationObserver(function(mutationsList, observer) {
    mutationsList.forEach(function(mutation) {
        for(const node of mutation.addedNodes) {
            //console.log(node);
            if (!node.tagName) continue;
            if(node.classList.contains('option')){

                if(node.classList.contains('all')) {
                    filterValue = '';
                }else {
                    filterValue = node.childNodes[1].innerText;
                }
                
                //console.log(node.childNodes[1].innerText);
                const c = countriesList.filter(country => {
                    return country.region.toUpperCase().includes(filterValue.toUpperCase()) 
                                && (country.name.common.toUpperCase().includes(searchInput.value.toUpperCase()));
                });
                createDataGrid(c,grid);
            }
        }
    });
});
observer.observe(dropdownFilter, { attributes: false, childList: true, subtree: true });

/*
dropdownFilter.addEventListener('change', e => {

    const c = countriesList.filter(country => {
        return country.region.toUpperCase().includes(dropdownFilter.value.toUpperCase()) 
                    && (country.name.common.toUpperCase().includes(searchInput.value.toUpperCase()));
    });
    createDataGrid(c,grid);
   
    console.log("hola");
});
*/  

/*-----darkmode in localstorage----*/


/*---default value---*/
if(localStorage.getItem("darkmode") === null) {
    localStorage.setItem("darkmode", "false");
}

/*--update darkmode---*/
function checkDarkmodeStatus() {
    if(localStorage.getItem("darkmode") === "true"){
        darkmodeCheck.checked = true;
        let root = document.querySelector(":root");
        root.style.setProperty('--element-bg','hsl(209, 23%, 22%)');
        root.style.setProperty('--body-bg','hsl(207, 26%, 17%)');
        root.style.setProperty('--text-color','white');
        searchText.style.backgroundImage = "url('./../images/icons_search_dark.png')";
        moonDark.style.display = 'block';
        moonLight.style.display = 'none';
    }else {
        darkmodeCheck.checked = false;
        let root = document.querySelector(":root");
        root.style.setProperty('--element-bg','white');
        root.style.setProperty('--body-bg','hsl(0, 0%, 98%)');
        root.style.setProperty('--text-color','hsl(200, 15%, 8%)');
        searchText.style.backgroundImage = "url('./../images/icons_search_light.png')";
        moonDark.style.display = 'none';
        moonLight.style.display = 'block';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    checkDarkmodeStatus();
});

//checkDarkmodeStatus();

function updateDarkmode(){
    if(localStorage.getItem("darkmode") === "true"){
        localStorage.setItem("darkmode", "false");
        let root = document.querySelector(":root");
        root.style.setProperty('--element-bg','white');
        root.style.setProperty('--body-bg','hsl(0, 0%, 98%)');
        root.style.setProperty('--text-color','hsl(200, 15%, 8%)');
        searchText.style.backgroundImage = "url('./../images/icons_search_light.png')";
        moonDark.style.display = 'none';
        moonLight.style.display = 'block';
    }else {
        localStorage.setItem("darkmode", "true");
        let root = document.querySelector(":root");
        root.style.setProperty('--element-bg','hsl(209, 23%, 22%)');
        root.style.setProperty('--body-bg','hsl(207, 26%, 17%)');
        root.style.setProperty('--text-color','white');
        searchText.style.backgroundImage = "url('./../images/icons_search_dark.png')";
        moonDark.style.display = 'block';
        moonLight.style.display = 'none';
    }
}


//dropdown 
$(".default_option").click(function(){
    $(this).parent().toggleClass("active");
  })
  
  $(".select_ul li").click(function(){
    var currentele = $(this).html();
    $(".default_option li").html(currentele);
    $(this).parents(".select_wrap").removeClass("active");
  })