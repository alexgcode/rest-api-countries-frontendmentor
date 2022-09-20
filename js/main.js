/* its the same that sync await
fetch('https://restcountries.com/v3.1/alpha?codes=ger,usa,br,is,afg,alb,alg,ax')
    .then(response => response.json() )
    .then(json => console.log(json));
*/
const grid = document.querySelector(".countries-grid");
//console.log(grid);
const api_url = 'https://restcountries.com/v3.1/alpha?codes=ger,usa,br,is,afg,alb,alg,ax&&fields=name,capital,currencies,flags';
async function getHomeCountries() {
    const response = await fetch (api_url);
    const data =  await response.json();
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

        let cardStat = document.createElement("p");
        cardStat.innerHTML = '<span class="country-card__category">Capital: </span>' +  country.capital;


        //card.innerHTML = country.name.common;

        grid.appendChild(card);
        card.appendChild(cardImage);
        card.appendChild(cardText);
            cardText.appendChild(cardName);
            cardText.appendChild(cardStat);
        

        console.log(country.name.common);
    });
}

getHomeCountries();