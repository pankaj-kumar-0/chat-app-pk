const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const port = process.env.PORT;

app.use(cors());

const server = http.createServer(app);

const users = [{}];

const io = new Server(server, {
  cors: {
    origin: "https://chat-app-pk.netlify.app",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log(`new connection ${socket.id}`);

  socket.on("user_join", (data) => {
    users[socket.id] = data.name;
    // console.log(`${data.name} has joined`);

    socket.emit("welcome_msg", {
      msg: `${users[socket.id]} welcome to the chat.`,
    });

    socket.broadcast.emit("another_user_join", {
      msg: `${users[socket.id]} has joined the chat.`,
    });
  });

  socket.on("sending_text", (data) => {
    io.emit("sending_text_responce", {
      user_id: data.user_id,
      send_msg: data.send_msg,
      time: data.time,
      name: users[data.user_id],
    });
    // console.log(data);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("user_leave", {
      msg: `${users[socket.id]} has left the chat.`,
    });
    socket.disconnect();
  });
});

app.get("/", (req, res) => {
  res.send("hello this is server ");
});

server.listen(port, () => {
  console.log(`The Server is running...`);
});
