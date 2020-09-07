import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);

  const ENDPOINT = "localhost:5000";

  // useEffect is used for lifecycle functions
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");

      // turn off the one instance
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  // for changes everytime a user sends a message
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...setMessages, message]);
    });
  }, [messages]);

  return (
    <div>
      <div></div>
      Chat
    </div>
  );
};

export default Chat;
