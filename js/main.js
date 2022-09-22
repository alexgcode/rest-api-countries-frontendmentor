/* its the same that sync await
fetch('https://restcountries.com/v3.1/alpha?codes=ger,usa,br,is,afg,alb,alg,ax')
    .then(response => response.json() )
    .then(json => console.log(json));
*/
const grid = document.querySelector(".countries-grid");
let searchValue = 'alpha?codes=ger,usa,br,is,afg,alb,alg,ax&&';

function createDataGrid(data, grid) {
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


        //card.innerHTML = country.name.common;

        grid.appendChild(card);
        card.appendChild(cardImage);
        card.appendChild(cardText);
            cardText.appendChild(cardName);
            cardText.appendChild(cardPop);
            cardText.appendChild(cardReg);
            cardText.appendChild(cardCap);
        

        console.log(country.name.common);
    });
}

//console.log(grid);
const api_url = 'https://restcountries.com/v3.1/alpha?codes=ger,usa,br,is,afg,alb,alg,ax&&fields=name,capital,region,population,flags';
async function getHomeCountries() {
    const response = await fetch (api_url);
    const data =  await response.json();
    createDataGrid(data, grid);
}

getHomeCountries();

function removeChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
     }
}


/* ----------------- filter to api ---------------*/
const searchInput = document.querySelector(".search-bar__text");
searchInput.addEventListener('keyup', e => {
    console.log(searchInput.value);
    let api_search;
    if(searchInput.value != '') {
        api_search = `https://restcountries.com/v3.1/name/${searchInput.value}?fields=name,capital,region,population,flags`;
    }else {
        api_search = 'https://restcountries.com/v3.1/all';
    }

    if (e.key === 'Enter' || e.keyCode === 13) {
        console.log(api_search);
        
        fetch(api_search)
        .then((response) => data = response.json())
        .then((data) => {
            removeChildren(grid);
            console.log(data);
            createDataGrid(data,grid);
        });
        /*
        async function result() {
            await new Promise((resolve, reject) => {
                removeChildren(grid);
                resolve();
            })
            
            fetch(api_search)
                .then((response) => data = response.json())
                .then((data) => {
                    console.log(data);
                    createDataGrid(data,grid);
                });
        }
        result();
        */        
    }
});

