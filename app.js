const form = document.querySelector('.search');
const searchInput = document.getElementById('input');

window.onload = function(){
    searchInput.focus();
}

window.addEventListener("DOMContentLoaded",searchCountry)

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    searchInputValue = searchInput.value;
    console.log(searchInputValue);
    form.reset();
    searchCountry(searchInputValue)
});

async function searchCountry(countryName){

    let url = `https://restcountries.com/v3.1/name/${countryName}`;

    let response = await fetch(url);

    let data = await response.json();

    console.log(data[0].flag);
}


