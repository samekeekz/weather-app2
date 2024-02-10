const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const { connectDB } = require("./config/db");
const app = express();
const User = require("./models/schema");

require("dotenv").config();

app.use(express.static("public"));
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
            redirectUrl: "/weather.html?username=" + user.name
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// app.get("/weather", async (req, res) => {

// });














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

