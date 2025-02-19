const express = require('express');
const cors = require("cors");
const config = require("./config/config"); // Importar la configuración
const { PORT } = require("./config/config");
const askRouter = require("./routers/ask"); // Importar el router de Preguntas
const userRouter = require("./routers/user") // Importar el router de Usuarios
require("./db/mongoose");  // Asegúrate de que mongoose.js esté siendo importado

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const port = config.PORT || 3000

app.use('/', askRouter);  // Rutas de preguntas
app.use('/', userRouter);  // Rutas de usuarios

app.get('/', (req, res) => {
    res.send('🚀 ¡Servidor funcionando correctamente!');
});
  
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});