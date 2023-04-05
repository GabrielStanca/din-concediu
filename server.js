require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const cors = require('cors');
const http = require('http');
const { Server } = require("socket.io")


// Import Routes
const authRoute = require("./routes/auth")
const usersRoute = require("./routes/users")
const forgotRoute = require("./routes/forgot")
const chatsRoute = require("./routes/chats")

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
app.use("/api/chats", chatsRoute);

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

const server = http.createServer(app);

const io = new Server(server,{
    cors: {
        origin: "http://localhost:5002",
        methods: ["GET", "POST"],
    }
})

io.on("connection",(socket)=>{
    console.log(`User Connected: ${socket.id}`)

    socket.on("join_room",(data)=>{
        socket.join(data)
        console.log(`User with id: ${socket.id} joined room: ${data}`)
    })

    socket.on("send_message",(data)=>{
        socket.to(data.room).emit("receive_message",data)
    })

    socket.on("disconnect",()=>{
        console.log(`User Disconnected: ${socket.id}`)
    })
})

server.listen(5000,()=>{
    console.log("Chat connected")
})