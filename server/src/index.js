require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require("http");
const { Server } = require("socket.io");
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/views');

const app = express();
app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

const server = http.createServer(app);
const io = new Server(server, { 
    cors: {
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"] 
    }
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log("MongoDB Connected"))
    .catch(err => console.error("DB Connection Error:", err));

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
    socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message", data);
        console.log(`User with ID: ${socket.id} sent message: '${data.content}'`);
    });
    socket.on("disconnect", () => {
        console.log(`User Disconnected: ${socket.id}`);
    });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

