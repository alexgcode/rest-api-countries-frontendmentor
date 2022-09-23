/* its the same that sync await
fetch('https://restcountries.com/v3.1/alpha?codes=ger,usa,br,is,afg,alb,alg,ax')
    .then(response => response.json() )
    .then(json => console.log(json));
*/
const grid = document.querySelector(".countries-grid");
const searchValue = 'alpha?codes=ger,usa,br,is,afg,alb,alg,ax&&';
const api_url = 'https://restcountries.com/v3.1/all'; //alpha?codes=ger,usa,br,is,afg,alb,alg,ax&&fields=name,capital,region,population,flags';
let countriesList = [];

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

        let cardText = document.createElement("div");
        cardText.className = 'country-card__text';

        let cardName = document.createElement("h3");
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
        card.appendChild(cardImage);
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
});

async function loadCountries() {
    const response = await fetch(api_url);
    return await response.json();
}


/* ----------------- filter to api ---------------*/
const searchInput = document.querySelector(".search-bar__text");
searchInput.addEventListener('keyup', e => {
    const c = countriesList.filter(country => country.name.common.toUpperCase().includes(searchInput.value.toUpperCase()));
    console.log(c);
    createDataGrid(c,grid);
});

