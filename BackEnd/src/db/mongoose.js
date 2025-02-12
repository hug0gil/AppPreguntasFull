const mongoose = require("mongoose");
const { CONNECTIONURL } = require("../config/config");

async function connectDB() {
  try {
    await mongoose.connect(CONNECTIONURL)
    console.log("🟢 Conectado a MongoDB");
  } catch (error) {
    console.error("🔴 Error conectando a MongoDB:", error);
  }
}

connectDB();