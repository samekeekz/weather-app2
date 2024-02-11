# Weather App

This project is a simple weather application that allows users to retrieve and store weather data for different cities. It provides an API for registering users, adding weather data for specific users, and retrieving weather data for users.

## Installation

To install and run this application, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/samekeekz/weather-app
```

2. Go to the folder (server):

```bash
cd project_folder
```

2. Install dependencies:

```bash
npm i
```

## Running the Application

After installation, start the server using one of the following commands:

```bash
npm run dev
```

## External APIs

The `/weather` endpoint utilizes the following external APIs to gather weather and Wikipedia data.

### OpenWeatherMap API

The OpenWeatherMap API is used to retrieve current weather data for the specified city.

- **Endpoint:** `https://api.openweathermap.org/data/2.5/weather`
- **API Key:** Replace `APPID=YOUR_OPENWEATHERMAP_API_KEY` in the endpoint with your actual API key.
- **Documentation:** [OpenWeatherMap API Documentation](https://openweathermap.org/api)

### OpenCage Geocoding API

The OpenCage Geocoding API is used to obtain geographical coordinates (latitude and longitude) for the specified city.

- **Endpoint:** `https://api.opencagedata.com/geocode/v1/json`
- **API Key:** Replace `key=YOUR_OPENCAGE_API_KEY` in the endpoint with your actual API key.
- **Documentation:** [OpenCage Geocoding API Documentation](https://opencagedata.com/api)

### Wikipedia API

The Wikipedia API is used to fetch introductory information about the specified city.

- **Endpoint:** `https://en.wikipedia.org/w/api.php`
- **Documentation:** [Wikipedia API Documentation](https://www.mediawiki.org/wiki/API:Main_page)
