const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const env = require("dotenv");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/User.route");
const connectDB = require("./config/db");

env.config({ path: "./config/.env" });

// DB_CONNECTION
connectDB();

// PORT
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));

// Routes
app.get("/", (req, res) => {
    res.json({ message: "API Working" });
});

// Routes Middleware
app.use('/user/', userRoute)


app.listen(PORT, (req, res) => {
    console.log(`Server Started at PORT ${PORT}`);
});