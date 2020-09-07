const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

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
    // destructures the functions inside the addUser(), found in users.js
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    // admin message on login
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
    });

    // sends a message to all other users excluding the specific user that just joined
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name}, has joined!` });

    // join users of the room with socket
    socket.join(user.room);

    // if there are no errors, this callback can be called so nothing happens
    callback();
  });

  socket.on("disconnect", () => {
    console.log("User has left.");
  });
});

// SETUP FOR MIDDLEWARE
app.use(router);

server.listen(PORT, () => console.log(`Listeing on port ${PORT}`));
