const apiKey = 'd72f4f68320e1400c771000bae1c3a99';

// function to fetch weather data
async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

// function to display weather data
async function displayWeatherData() {
    const cityInput = document.getElementById('city');
    const city = cityInput.value;

    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    const weatherData = await getWeatherData(city);
    console.log(weatherData);

    // display weather data in table
    const table = document.getElementById('weather-table');
    const rows = table.rows;

    for (let i = 1; i < rows.length; i++) {
        const date = weatherData.list[i - 1].dt_txt;
        const temp = weatherData.list[i - 1].main.temp;
        const humidity = weatherData.list[i - 1].main.humidity;
        const aqi = weatherData.list[i - 1].main.pressure;
        const whe = weatherData.list[i - 1].weather[0].description;
        const winsp = weatherData.list[i - 1].wind.speed;
        const sel = weatherData.list[i - 1].main.sea_level;
        const cou = weatherData.city.country;
        const lat = weatherData.city.coord.lat;
        const longi = weatherData.city.coord.lon;

        rows[i].cells[0].textContent = date;
        rows[i].cells[1].textContent = temp;
        rows[i].cells[2].textContent = humidity;
        rows[i].cells[3].textContent = aqi;
        rows[i].cells[4].textContent = whe;
        rows[i].cells[5].textContent = winsp;
        rows[i].cells[6].textContent = sel;
        rows[i].cells[7].textContent = cou;
        rows[i].cells[8].textContent = `Lat :${lat}, Long:${longi}`;
    }
    const weatherCondition = weatherData.list[0].weather[0].main;

    // Get the body element
    const body_colour = document.getElementById('bod');

    // Add the appropriate color class based on the weather condition
    if (weatherCondition === 'Rain' || weatherCondition === 'Drizzle') {
        body_colour.classList.add('bg-primary');
    } else if (weatherCondition === 'Clouds' || weatherCondition === 'Mist' || weatherCondition === 'Fog') {
        body_colour.classList.add('bg-secondary');
    } else if (weatherCondition === 'Clear') {
        body_colour.classList.add('bg-success');
    } else if (weatherCondition === 'Snow') {
        body_colour.classList.add('bg-light');
    } else {
        body_colour.classList.add('bg-info');
    }

}




// attach event listener to form submit button
const form = document.querySelector('form');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    displayWeatherData();
});