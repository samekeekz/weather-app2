const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const { connectDB } = require("./config/db");
const app = express();
const User = require("./models/schema");

require("dotenv").config();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

connectDB();


app.get("/", (req, res) => {
    res.redirect(__dirname + "/authorization.html");
});













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