const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users.js')

const PORT = process.env.PORT || 5000;

const router = require("./router");

// SETUP FOR SERVER AND SOCKETIO CONNECTION
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Code for connects and disconnects
io.on("connection", (socket) => {
  console.log("we have a new connection.");

  socket.on("join", ({ name, room }, callback) => {
    console.log(name, room);


  });

  socket.on("disconnect", () => {
    console.log("User has left.");
  });
});

// SETUP FOR MIDDLEWARE
app.use(router);

server.listen(PORT, () => console.log(`Listeing on port ${PORT}`));
