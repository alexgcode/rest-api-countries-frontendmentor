async function loadCountries(api_url) {
    const response = await fetch(api_url);
    return await response.json();
}

window.onload = async function () {
    let url = document.location.href;
    let params = url.split('?')[1].split('&');
    let data = {}, tmp;
    
    for (var i = 0, l = params.length; i < l; i++) {
         tmp = params[i].split('=');
         data[tmp[0]] = tmp[1];
    }

    const api_url = 'https://restcountries.com/v3.1/name/'+data.country
        +'?fields=name,capital,region,population,flags,region,borders,subregion,tld,currencies,languages';
    const image = document.querySelector(".detail__image");
    const name = document.querySelector(".detail__name");
    const nativeName = document.querySelector("[data-native]");
    const population = document.querySelector("[data-pop]");
    const region = document.querySelector("[data-region]");
    const subRegion = document.querySelector("[data-subRegion]");
    const capital = document.querySelector("[data-capital]");
    const tld = document.querySelector("[data-tld]");
    const currencies = document.querySelector("[data-currencies]");
    const languages = document.querySelector("[data-languages]");


    const apiData = await loadCountries(api_url);
    //console.log(apiData);
    image.style.backgroundImage = "url("+ apiData[0].flags.svg +")";
    name.innerText = apiData[0].name.common;

    let nativeLanguageString = Object.keys(apiData[0].name.nativeName)[0];
    let nativeLanguageObject = apiData[0].name.nativeName;
    nativeName.innerHTML = nativeLanguageObject[nativeLanguageString].common;

    population.innerHTML = apiData[0].population;
    region.innerHTML = apiData[0].region;
    subRegion.innerHTML = apiData[0].subregion;
    capital.innerHTML = apiData[0].capital;
    tld.innerHTML = apiData[0].tld[0];

    let currenciesData = new Array();
    let currenciesString = '';
    currenciesData = Object.values(apiData[0].currencies);
    currenciesData.forEach(element => {
        currenciesString = `${element.name}, ${currenciesString}`;
        console.log(currenciesString) ;
    });
    currencies.innerHTML = currenciesString.slice(0,-2);

    let languagesData = new Array();
    let languagesString = '';
    languagesData = Object.values(apiData[0].languages);
    languagesData.forEach(element => {
        languagesString = `${element}, ${languagesString}`;
        console.log(languagesString) ;
    });
    languages.innerHTML = languagesString.slice(0,-2);
}
