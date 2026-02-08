
let btn = document.querySelector('.bot'); 
let input = document.querySelector('#findLocation'); 

btn.addEventListener('click', async function(event) {
    event.preventDefault();
    const country = input.value; 
    if (country) {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=3239d9b144dd46e2acf151944260802&q=${country}&days=3`); 
            if (!response.ok) {
                throw new Error('Weather data not found');
            }
            const data = await response.json();
            displayCurrentWeather(data.current, data.location);
            displayForecast(data.forecast.forecastday);
    } else {
        alert('Please enter a country or location');
    }
});

function displayCurrentWeather(currentWeather, location) {
    if (!currentWeather || !location) {
        console.error('Invalid current weather or location data');
        return;
    }

    const date = new Date(location.localtime);
    const today = date.toLocaleDateString('en-UK', { weekday: 'long' });
    const today1 = date.toLocaleDateString('en-UK', { day: 'numeric', month: 'long' });

    const cartona = `
        <div class="card card-color  p-0">
            <header class="d-flex justify-content-between my-1 p-2">
                <span id="day">${today}</span>
                <span id="numday">${today1}</span>
            </header>
            <div class="card1 w-100 p-4">
                <h5 id="country" class="ms-2">${location.name}</h5>
                <h1 id="temp" class="ms-2">${currentWeather.temp_c}<sup>o</sup>C</h1>
                <img class="icon ms-0 d-block" src="https:${currentWeather.condition.icon}" alt="">
                <span id="temp1" class="my-4 ms-2">${currentWeather.condition.text}</span>
                <div class="d-inline-block mt-3">
                    <span class="mx-1"><img src="./icon-umberella.png" class="mx-1" alt="">${currentWeather.humidity}%</span>
                    <span class="mx-1"><img src="./icon-wind.png" class="mx-1" alt="">${currentWeather.wind_kph} km/h</span>
                    <span class="mx-1"><img src="./icon-compass.png" class="mx-1" alt="">${currentWeather.wind_dir}</span>
                </div>
            </div>
        </div>`;

    document.getElementById('main').innerHTML = cartona;
}

function displayForecast(forecastData) {
    const forecastContainer = document.getElementById('main1'); 
    forecastContainer.innerHTML = ''; 

    displayCurrentWeather(forecastData.current,forecastData.location);

    
    for (let i = 1; i <= 2; i++) {
        const forecast = forecastData.forecastday[i]; 
        if (forecast && forecast.day) {
            const date = new Date(forecast.date);
            const dayOfWeek = date.toLocaleDateString('en-UK', { weekday: 'long' });
            const dayOfMonth = date.toLocaleDateString('en-UK', { day: 'numeric', month: 'long' });

            let locationName = forecastData.location ? forecastData.location.name : ''; 

            const forecastHtml = `
                <div class="card4  p-0 text-center w-50 my-auto">
                    <header class="d-flex justify-content-center my-1 p-2 card5 ">
                        <span id="day">${dayOfWeek}</span>
                    </header>
                    <div class="card1 w-100 p-4 text-center">
                     <div class="mx-auto"> <img class="icon" src="https:${forecast.day.condition.icon}" alt=""></div>
                        <h3 id="temp" class="ms-2">${forecast.day.avgtemp_c}<sup>o</sup>C</h3>
                        <span id="temp1" class="my-4 ms-2">${forecast.day.condition.text}</span>
                    </div>
                </div>`;

            forecastContainer.innerHTML += forecastHtml;
        }
    }
}
