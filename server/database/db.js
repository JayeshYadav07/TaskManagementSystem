const mongoose = require("mongoose");

require("dotenv").config();

const DBconnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error while connecting with the database ", error.message);
    }
};

module.exports = DBconnection;
