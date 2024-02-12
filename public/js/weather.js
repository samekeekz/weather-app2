let map;


window.fetchData = async () => {
    const search = document.getElementById('search').value;
    const url = `http://localhost:3000/weather?search=${search}`;
    try {
        const response = await fetch(url);
        const weatherData = await response.json();
        updateWeatherInfo(weatherData);
        updateUserData(weatherData)
    }
    catch (error) {
        console.log(error);
    }
    return false;
}


async function updateWeatherInfo(weatherData) {

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

    document.getElementById("link").style.display = "flex";

    await displayMap(weatherData.latitude, weatherData.longitude, weatherData.city);
}


document.getElementById("link").addEventListener("click", function () {
    const city = document.getElementById('search').value;
    window.location.href = `/wikipedia?city=${city}`;
});


async function updateUserData(weatherData) {
    try {
        const response = await fetch(`/user/updateData`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(weatherData),
        });
        const responseData = await response.json();
        console.log(responseData);
    } catch (error) {
        console.error("Error saving weather data to user:", error);
    }
}


async function displayMap(latitude, longitude, city) {
    if (!map) {
        // Initialize the map
        map = L.map('map').setView([latitude, longitude], 10); // Initial coordinates and zoom level

        // Add the base tile layer (OpenStreetMap)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Samat Belentbay'
        }).addTo(map);
    }

    map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            layer.remove();
        }
    });
    L.marker([latitude, longitude]).addTo(map).bindPopup(`<b>${city}</b>`).openPopup();

}
