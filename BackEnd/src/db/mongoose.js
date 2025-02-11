const mongoose = require("mongoose");


// Función para conectar a MongoDB
const connectToMongoDB = async () => {
  try {
    // Conexión a MongoDB usando mongoose
    await mongoose.connect(connectionURL)
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error.message);
  }
};
// Llamamos a la función para conectar
connectToMongoDB();
