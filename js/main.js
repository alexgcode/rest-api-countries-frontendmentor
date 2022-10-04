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
const searchInput = document.querySelector(".search-bar__text");
searchInput.addEventListener('keyup', e => {
    const c = countriesList.filter(country => {
        return country.name.common.toUpperCase().includes(searchInput.value.toUpperCase()) 
                && country.region.toUpperCase().includes(dropdownFilter.value.toUpperCase());
    });
    //console.log(c);
    createDataGrid(c,grid);
});


/*--------- dropdown filter --------------*/
const dropdownFilter = document.querySelector(".search-bar__filter");
dropdownFilter.addEventListener('change', e => {
    const c = countriesList.filter(country => {
        return country.region.toUpperCase().includes(dropdownFilter.value.toUpperCase()) 
                    && (country.name.common.toUpperCase().includes(searchInput.value.toUpperCase()));
    });
    createDataGrid(c,grid);
    console.log(dropdownFilter.value);
});


/*-----darkmode in localstorage----*/
const darkmodeCheck = document.querySelector("#darkmodeCheck");

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
        searchText.style.backgroundImage = "url('./../images/icons8-search-dark.png')";
        moonDark.style.display = 'block';
        moonLight.style.display = 'none';
    }else {
        darkmodeCheck.checked = false;
        let root = document.querySelector(":root");
        root.style.setProperty('--element-bg','white');
        root.style.setProperty('--body-bg','hsl(0, 0%, 98%)');
        root.style.setProperty('--text-color','hsl(200, 15%, 8%)');
        searchText.style.backgroundImage = "url('./../images/icons8-search_light.png')";
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
        searchText.style.backgroundImage = "url('./../images/icons8-search_light.png')";
        moonDark.style.display = 'none';
        moonLight.style.display = 'block';
    }else {
        localStorage.setItem("darkmode", "true");
        let root = document.querySelector(":root");
        root.style.setProperty('--element-bg','hsl(209, 23%, 22%)');
        root.style.setProperty('--body-bg','hsl(207, 26%, 17%)');
        root.style.setProperty('--text-color','white');
        searchText.style.backgroundImage = "url('./../images/icons8-search-dark.png')";
        moonDark.style.display = 'block';
        moonLight.style.display = 'none';
    }
}