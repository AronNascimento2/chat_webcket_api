const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_PUBLIC_URL);
    console.log("Conectado ao MongoDB");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err);
  }
};

module.exports = connectDB;
