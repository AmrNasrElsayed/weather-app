let btn = document.querySelector('.bot');
let input = document.querySelector('#findLocation');

btn.addEventListener('click', async function (event) {
  event.preventDefault();

  const country = input.value.trim();

  if (!country) {
    alert('Please enter a country or location');
    return;
  }

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=3239d9b144dd46e2acf151944260802&q=${country}&days=3`
    );

    if (!response.ok) {
      throw new Error('Weather data not found');
    }

    const data = await response.json();

    // عرض الطقس الحالي
    displayCurrentWeather(data.current, data.location);

    // عرض التوقعات
    displayForecast(data);

  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
});


/* ================= CURRENT WEATHER ================= */

function displayCurrentWeather(currentWeather, location) {
  if (!currentWeather || !location) {
    console.error('Invalid current weather or location data');
    return;
  }

  const date = new Date(location.localtime);
  const today = date.toLocaleDateString('en-UK', { weekday: 'long' });
  const todayDate = date.toLocaleDateString('en-UK', {
    day: 'numeric',
    month: 'long',
  });

  const cartona = `
    <div class="card card-color p-0">
      <header class="d-flex justify-content-between my-1 p-2">
        <span>${today}</span>
        <span>${todayDate}</span>
      </header>

      <div class="card1 w-100 p-4">
        <h5 class="ms-2">${location.name}</h5>

        <h1 class="ms-2">
          ${currentWeather.temp_c}<sup>o</sup>C
        </h1>

        <img class="icon d-block" src="https:${currentWeather.condition.icon}" alt="">

        <span class="my-4 ms-2 d-block">
          ${currentWeather.condition.text}
        </span>

        <div class="d-inline-block mt-3">
          <span class="mx-1">
            <img src="./icon-umberella.png" class="mx-1" alt="">
            ${currentWeather.humidity}%
          </span>

          <span class="mx-1">
            <img src="./icon-wind.png" class="mx-1" alt="">
            ${currentWeather.wind_kph} km/h
          </span>

          <span class="mx-1">
            <img src="./icon-compass.png" class="mx-1" alt="">
            ${currentWeather.wind_dir}
          </span>
        </div>
      </div>
    </div>
  `;

  document.getElementById('main').innerHTML = cartona;
}


/* ================= FORECAST ================= */

function displayForecast(data) {
  const forecastContainer = document.getElementById('main1');
  forecastContainer.innerHTML = '';

  const days = data.forecast.forecastday;

  for (let i = 1; i <= 2; i++) {
    const forecast = days[i];

    if (!forecast || !forecast.day) continue;

    const date = new Date(forecast.date);
    const dayName = date.toLocaleDateString('en-UK', { weekday: 'long' });

    const forecastHtml = `
      <div class="card4 p-0 text-center w-50 my-auto">
        <header class="d-flex justify-content-center my-1 p-2 card5">
          <span>${dayName}</span>
        </header>

        <div class="card1 w-100 p-4 text-center">
          <div class="mx-auto">
            <img class="icon" src="https:${forecast.day.condition.icon}" alt="">
          </div>

          <h3>
            ${forecast.day.avgtemp_c}<sup>o</sup>C
          </h3>

          <span class="d-block">
            ${forecast.day.condition.text}
          </span>
        </div>
      </div>
    `;

    forecastContainer.innerHTML += forecastHtml;
  }
}
