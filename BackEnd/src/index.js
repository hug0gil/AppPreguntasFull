const express = require("express");
const cors = require("cors");
const { PORT } = require("./config/config");
const { connectToMongoDB } = require("./db/mongoose"); // Conectar a la DB
const askRouter = require("./routers/ask"); // Importar el router

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

async function startServer() {
  await connectToMongoDB(); // Esperamos a que se realice la conexión antes de consultar en la BDD
  
  app.use("/", askRouter); // Registrar rutas después de la conexión
  
  app.get("/", (req, res) => {
    res.send("🚀 ¡Servidor funcionando correctamente!");
  });

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}

startServer(); // Llamamos a la función para iniciar el servidor
