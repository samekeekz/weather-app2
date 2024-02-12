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

### Used dependencies
- ejs
- express
- express-session
- mongodb
- mongoose
- nodemon
- path
- bcrypt
- cors
- bodyParser

## Short summary of the project

1. First user should register/login to the site.
<img width="1440" alt="image" src="https://github.com/samekeekz/weather-app2/assets/123794172/989c431d-c66f-43b9-bf2f-de1d659c69e1">

2. Then it redirects to main page.
<img width="1440" alt="image" src="https://github.com/samekeekz/weather-app2/assets/123794172/feb1efbf-ebe6-418f-9e0f-981ddc5f2939">

3. After that user can search data about city.
<img width="940" alt="image" src="https://github.com/samekeekz/weather-app2/assets/123794172/be725e26-d7b6-4675-8258-e680d139cec5">

4. Also there is additional info with picture of city on another page.
<img width="1284" alt="image" src="https://github.com/samekeekz/weather-app2/assets/123794172/3a885444-673b-40f0-beb3-f93780a0100b">

5. Then user can see history of his/her own requests.
<img width="1402" alt="image" src="https://github.com/samekeekz/weather-app2/assets/123794172/ae480967-b2de-4040-8eeb-583a94c12b6e">

6. The admin page looks like this:
<img width="1440" alt="image" src="https://github.com/samekeekz/weather-app2/assets/123794172/5d69b9b7-09e9-4c89-b980-98bcc26e0ea8">

To get in admin page write:
login: Samat
password: Qwerty1

7. Finally when user clicks button "Exit" it redirects to register/login page.
