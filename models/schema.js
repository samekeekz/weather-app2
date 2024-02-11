const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: String,
        password: String,
        weatherData: [
            {
                city: String,
                latitude: Number,
                longitude: Number,
                weather: Object,
                timestamp: Date,
            },
        ],
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        collection: "users",
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
