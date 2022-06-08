const form = document.querySelector('.search');
const searchInput = document.getElementById('input');
const countryContainer = document.querySelector('.country-container');
const bordersContainer = document.querySelector('.borders-container')

window.onload = function(){
    searchInput.focus();
}

form.addEventListener("submit", (e)=>{
    bordersContainer.innerHTML = ``;
    countryContainer. innerHTML = ``;
    e.preventDefault();
    searchInputValue = searchInput.value;
    console.log(searchInputValue);
    form.reset();
    searchCountry(searchInputValue);
});

async function searchCountry(countryName){

    try {
        let url = `https://restcountries.com/v3.1/name/${countryName}`;

        let response = await fetch(url);
    
        let data = await response.json();

        countryContainer.innerHTML = `        
        <div class="country-card">
            <div class="card-header">
                <img src=${data[0].flags.png} alt="">
                <h1>${data[0].name.common} - [${data[0].cca2}]</h1>
            </div>
            <div class="card-body">
                <p><i class="fa-solid fa-landmark-flag"></i>${data[0].capital[0]}</p>
                <p><i class="fa-solid fa-earth-americas"></i>${data[0].region}</p>
                <p><i class="fa-solid fa-people-group"></i>${(data[0].population / 1000000).toFixed(1)} Million</p>
                <p><i class="fa-solid fa-language"></i>${Object.values(data[0].languages)}</p>
                <p><i class="fa-solid fa-coins"></i>${Object.values(Object.values(data[0].currencies)[0])}</p>
                <p><i class="fa-solid fa-clock"></i>${data[0].timezones[0]}</p>
            </div>
        </div>`

        data[0].borders.forEach((border) => {
            countryBorders(border);
        })

    } catch{
        alert("Please enter a valid input")
    }
}


async function countryBorders(border){

    let url = `https://restcountries.com/v3.1/alpha/${border}`;

    let response = await fetch(url);

    let data = await response.json();

    const html = `
    <div class="country-card">
        <div class="card-header">
            <img src=${data[0].flags.png} alt="">
            <h1>${data[0].name.common} - [${data[0].cca2}]</h1>
        </div>
        <div class="card-body">
            <p><i class="fa-solid fa-landmark-flag"></i>${data[0].capital[0]}</p>
            <p><i class="fa-solid fa-earth-americas"></i>${data[0].region}</p>
            <p><i class="fa-solid fa-people-group"></i>${(data[0].population / 1000000).toFixed(1)} Million</p>
            <p><i class="fa-solid fa-language"></i>${Object.values(data[0].languages)}</p>
            <p><i class="fa-solid fa-coins"></i>${Object.values(Object.values(data[0].currencies)[0])}</p>
            <p><i class="fa-solid fa-clock"></i>${data[0].timezones[0]}</p>
        </div>
    </div>`

    bordersContainer.insertAdjacentHTML("beforeend", html);
}

