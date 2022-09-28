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

    const api_url = 'https://restcountries.com/v3.1/name/'+data.country+'?fields=name,capital,region,population,flags,region';
    const image = document.querySelector(".detail__image");
    const name = document.querySelector(".detail__name");
    const nativeName = document.querySelector("[data-native]");


    const apiData = await loadCountries(api_url);
    console.log(apiData);
    image.style.backgroundImage = "url("+ apiData[0].flags.svg +")";
    name.innerText = apiData[0].name.common;
    nativeName.innerHTML = apiData[0].name.nativeName.common;
   
}
