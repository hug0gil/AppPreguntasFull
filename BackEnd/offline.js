const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors');
const asks = require('./ask.json'); // Cargamos el archivo JSON directamente

app.use(cors()); // Habilita CORS para que Angular pueda acceder

// Ruta para obtener todas las preguntas
app.get("/preguntas", (req, res) => {
  res.json(asks);
});

// Ruta para obtener preguntas por categoría
app.get("/preguntas/:categoria", (req, res) => {
  const { categoria } = req.params; // Obtenemos la categoría desde la ruta

  // Filtra las preguntas por categoría
  const preguntasFiltradas = asks.filter(pregunta => pregunta.categoria.toLowerCase() === categoria.toLowerCase());

  // Si no se encuentran preguntas para la categoría, responde con un error 404
  if (preguntasFiltradas.length === 0) {
    return res.status(404).send("No se encontraron preguntas para esta categoría.");
  }

  // Devuelve las preguntas filtradas
  res.json(preguntasFiltradas);
});

// Ruta raíz
app.get("/", (req, res) => {
  res.send("¡Hola, mundo desde Express!");
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});