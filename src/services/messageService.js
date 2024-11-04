const Message = require("../models/messageModel");

const getAllMessages = () => {
  return Message.find();
};

const saveMessage = (messageData) => {
  const message = new Message(messageData);
  return message.save();
};

module.exports = {
  getAllMessages,
  saveMessage,
};
