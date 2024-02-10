

window.fetchData = async () => {
    const search = document.getElementById('search').value;
    const url = `http://localhost:3000/weather?search=${search}`;
    try {
        const response = await fetch(url);
        const weatherData = await response.json();
        updateWeatherInfo(weatherData);
    }
    catch (error) {
        console.log(error);
    }
    return false;
}


function updateWeatherInfo(weatherData) {
    document.querySelector('.weather-container').style.display = 'block';
    // Update city name
    document.querySelector('.city').textContent = `${weatherData.city}, ${weatherData.country}`;

    // Update temperature
    document.getElementById('temperature').textContent = `${weatherData.temperature.toFixed(0)} °C`;

    document.querySelector('.weather-icon').setAttribute('src', `https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`);

    // Update wind speed
    document.getElementById('wind').textContent = `${weatherData.wind_speed} m/s`;

    // Update description
    document.getElementById('description').textContent = weatherData.description;

    // Update humidity
    document.getElementById('humidity').textContent = `${weatherData.humidity}%`;

    // Update pressure
    document.getElementById('pressure').textContent = `${weatherData.pressure} hPa`;
}
