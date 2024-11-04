const UserService = require("../services/userService");
const MessageController = require("../controllers/messageController");

const chatSocket = (io) => {
  let activeUsers = new Set();

  io.on("connection", (socket) => {
    console.log("Novo cliente conectado");

    MessageController.getMessageHistory(socket);

    socket.on("join", (username) => {
      if (activeUsers.has(username)) {
        socket.emit("username taken", {
          message: "Nome de usuário já está em uso. Por favor, escolha outro.",
        });
      } else {
        activeUsers.add(username);
        socket.username = username;
        io.emit("user joined", {
          username,
          activeUsers: Array.from(activeUsers),
        });
      }
    });

    socket.on("chat message", (msg) => {
      MessageController.handleMessage(msg, socket, io);
    });

    socket.on("disconnect", () => {
      if (socket.username) {
        activeUsers.delete(socket.username);
        io.emit("user left", {
          username: socket.username,
          activeUsers: Array.from(activeUsers),
        });
      }
    });
  });
};

module.exports = chatSocket;
