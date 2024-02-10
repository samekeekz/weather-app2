const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const path = require("path");
const { connectDB } = require("./config/db");
const app = express();
const User = require("./models/schema");

require("dotenv").config();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "public", "pages"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectDB();


app.get("/", (req, res) => {
    res.redirect("/authorization.html");
});


app.post("/register", async (req, res) => {
    const { name, email, password, city, weatherData } = req.body;

    try {
        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
            city,
            weatherData
        });

        res.status(201).json({ message: "Registration successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ success: false, error: "Username not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ success: false, error: "Username or password does not match" });
        }

        res.status(200).json({
            success: true,
            username: user.name,
            redirectUrl: "/weatherPage?username=" + user.name
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});
// Function to fetch weather data
const fetchWeatherData = async (search) => {

    // const { latitude, longitude } = await getCoordinates(search);

    const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;

    // const weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${process.env.OPENWEATHER_API_KEY}&units=metric`


    try {
        const weatherResponse = await fetch(weatherEndpoint);

        if (!weatherResponse) {
            throw new Error('Weather data not found');
        }

        const weatherData = await weatherResponse.json();

        console.log(weatherData);

        const cityName = weatherData.name;
        const country = weatherData.sys.country;
        const temperature = weatherData.main.temp;
        const humidity = weatherData.main.humidity;
        const pressure = weatherData.main.pressure;
        const windSpeed = weatherData.wind.speed;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const longitude = weatherData.coord.lon;
        const latitude = weatherData.coord.lat;
        return {
            city: cityName,
            country,
            temperature,
            humidity,
            pressure,
            wind_speed: windSpeed,
            description,
            icon,
            longitude,
            latitude,
        };
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw new Error('Weather data not found');
    }
};


// Route for rendering weatherPage with weather data
app.get("/weather", async (req, res) => {
    const { search } = req.query;

    try {
        // Fetch weather data
        const weatherData = await fetchWeatherData(search);
        console.log(1);
        console.log(weatherData);
        res.status(200).json({
            city: weatherData.city,
            country: weatherData.country,
            temperature: weatherData.temperature,
            humidity: weatherData.humidity,
            pressure: weatherData.pressure,
            wind_speed: weatherData.wind_speed,
            description: weatherData.description,
            icon: weatherData.icon,
            latitude: weatherData.latitude,
            longitude: weatherData.longitude,
        });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server error" });
    }
});

app.get("/wikipedia", async (req, res) => {
    const { city } = req.query;

    try {
        const wikipediaData = await fetchWikipediaData(city);
        // const firstThreeSentences = getFirstThreeSentences(wikipediaData);
        console.log(wikipediaData);

        res.render("wikipedia/index", { wikipediaData });
    } catch (error) {
        res.render("wikipedia/index", { success: false, error: "Server error", data: "Server error" });
    }
})


app.get("/weatherPage", async (req, res) => {
    res.render("weather/index", {
        city: "",
        country: "",
        temperature: "",
        humidity: "",
        pressure: "",
        wind_speed: "",
        description: "",
        icon: "",
    });
})

async function getCoordinates(cityName) {
    try {
        const encodedCityName = encodeURIComponent(cityName);

        // Fetch coordinates from the OpenCageData API
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodedCityName}&key=${process.env.GEO_API_KEY}`);
        const data = await response.json();

        // Extract latitude and longitude from the response data
        const latitude = parseFloat(data.results[0].geometry.lat).toFixed(2);
        const longitude = parseFloat(data.results[0].geometry.lng).toFixed(2);

        return { latitude, longitude };
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw new Error('Failed to fetch coordinates');
    }
}


// app.get("/coordinates", async (req, res) => {
//     try {
//         const { city } = req.query;
//         const response = await getCoordinates(city);
//         res.status(200).json(response);

//     } catch (error) {
//         res.status(500).json({ success: false, error: "Server error" });
//     }
// });


app.post('/users/:username/weather', async (req, res) => {
    const { username } = req.params;
    const { city, latitude, longitude, weather, timestamp } = req.body;

    try {
        const user = await User.findOne({ name: username });

        user.weatherData.push({ city, latitude, longitude, weather, timestamp });
        await user.save();

        res.status(200).json({ message: 'Weather data saved successfully' });
    } catch (error) {
        console.error('Error saving weather data to user:', error);
        res.status(500).json({ error: 'Server error' });
    }
});







// Functions for fetching weather data and Wikipedia data
async function fetchWikipediaData(cityName) {
    const wikipediaEndpoint = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&redirects=true&titles=${cityName}&origin=*`;

    try {
        const wikipediaResponse = await fetch(wikipediaEndpoint);

        if (!wikipediaResponse.ok) {
            throw new Error('error');
        }

        const wikipediaData = await wikipediaResponse.json();

        const pages = wikipediaData.query.pages;
        const firstPageId = Object.keys(pages)[0];
        const extract = pages[firstPageId].extract;

        const plainText = extract.replace(/<[^>]+>/g, '').trim();

        return plainText;
    } catch (error) {
        console.error('error', error);
        throw error;
    }
}

function getFirstThreeSentences(text) {
    const sentences = text.match(/[^.!?]+[.!?]+/g);
    const firstThreeSentences = sentences.slice(0, 3);
    const result = firstThreeSentences.join(' ');

    return result;
}




const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

