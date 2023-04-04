require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const cors = require('cors');

// Import Routes
const authRoute = require("./routes/auth")
const usersRoute = require("./routes/users")
const forgotRoute = require("./routes/forgot")

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5002",
    credentials: true
}));

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/forgot", forgotRoute);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to DB");

        app.listen(process.env.PORT, () => {
            console.log(`The Server is Running on PORT: ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
