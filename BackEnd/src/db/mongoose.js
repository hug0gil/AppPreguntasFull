const mongoose = require("mongoose");
const { CONNECTIONURL } = require("../config/config");

try {
    mongoose.connect(CONNECTIONURL)
    console.log("🟢 Conectado a MongoDB");
  } catch (error) {
    console.error("🔴 Error conectando a MongoDB:", error);
  }

