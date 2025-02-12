const mongoose = require("mongoose");
const { CONNECTIONURL } = require("../config/config");

let connection = null; // Variable para almacenar la conexión

async function connectToMongoDB() {
  try {
    if (!connection) {
      await mongoose.connect(CONNECTIONURL);
      connection = mongoose.connection; // Asigna la conexión
      console.log("✅ Conectado a MongoDB");
    }
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error.message);
    process.exit(1);
  }
}

function getConnection() {
  return connection;
}

module.exports = { connectToMongoDB, getConnection };
