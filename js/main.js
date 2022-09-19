fetch('https://restcountries.com/v3.1/alpha?codes=ger,usa,br,is,afg,alb,alg,ax')
    .then(response => response.json() )
    .then(json => console.log(json));