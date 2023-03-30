require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Import Routes
const authRoute = require("./routes/auth")

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get("/api", (req, res) => {
    res.send("It works");
});

app.post("/name", (req, res) => {
    if (req.body.name) {
        return res.json({ name: req.body.name });
    } else {
        return res.status(400).json({ error: "No name provided" });
    }
})

app.use("/api/auth", authRoute);


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
