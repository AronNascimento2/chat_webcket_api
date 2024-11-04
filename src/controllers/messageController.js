const MessageService = require("../services/messageService");

const getMessageHistory = async (socket) => {
  try {
    const messages = await MessageService.getAllMessages();
    socket.emit("message history", messages);
  } catch (err) {
    console.error("Erro ao buscar o histórico de mensagens:", err);
  }
};

const handleMessage = async (msg, socket, io) => {
  try {
    const messageData = { username: socket.username, message: msg.message };
    await MessageService.saveMessage(messageData);
    io.emit("chat message", messageData);
  } catch (err) {
    console.error("Erro ao salvar a mensagem:", err);
  }
};

module.exports = {
  getMessageHistory,
  handleMessage,
};
