const express = require("express");
const bodyParser = require("body-parser");

const user = require("./routes/user");
const InitiateMongoServer = require("./db");

require("dotenv").config();

const app = express();

// DB_CONNECTION
InitiateMongoServer();

// PORT
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(bodyParser.json())

// Routes
app.get("/", (req, res) => {
    res.json({ message: "API Working" });
});

// Routes Middleware
app.use('/user', user)


app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
});