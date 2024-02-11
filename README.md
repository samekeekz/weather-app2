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

The server will be running at http://localhost:3000

### API keys and admin username and password is in .env file

## External APIs

The `/weather` endpoint utilizes the following external APIs to gather weather and Wikipedia data.

### OpenWeatherMap API

The OpenWeatherMap API is used to retrieve current weather data for the specified city.

- **Endpoint:** `https://api.openweathermap.org/data/2.5/weather`
- **API Key:** Replace `APPID=YOUR_OPENWEATHERMAP_API_KEY` in the endpoint with your actual API key.
- **Documentation:** [OpenWeatherMap API Documentation](https://openweathermap.org/api)

### Wikipedia API

The Wikipedia API is used to fetch introductory information about the specified city.

- **Endpoint:** `/wikipedia`
- **Parameter:** `search`
- **Example:** `http://localhost:3000/wikipedia?city=amsterdam`
- **Documentation:** [Wikipedia API Documentation](https://www.mediawiki.org/wiki/API:Main_page)

### Unsplash API

- **Endpoint:** `/photo`
- **Parameter:** `city`
- **Example:** `http://localhost:3000/photo?city=amsterdam`
- **Documentation:** [Unsplash API Documentation](https://unsplash.com/documentation)
