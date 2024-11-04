const { server } = require("./config/server");
const connectDB = require("./config/database");
const chatSocket = require("./sockets/chatSocket");
const { io } = require("./config/server");

connectDB();

chatSocket(io);

server.listen(8080, () => {
  console.log("Servidor Socket.io escutando na porta 8080");
});
