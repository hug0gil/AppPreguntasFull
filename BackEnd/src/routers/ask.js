const express = require("express");
const Ask = require('../models/askModel'); // Importar el modelo de pregunta
const router = express.Router(); // Usar router en vez de app


router.get("/categorias", async (req, res) => {
  try {
    const preguntas = await Ask.findAllQuestions(); // Obtener todas las preguntas

    if (preguntas.length === 0) {
      return res.status(404).send("No se encontraron preguntas.");
    }

    res.json(preguntas);
  } catch (error) {
    console.error("Error al obtener preguntas:", error.message);
    res.status(500).send("Error al obtener preguntas desde la base de datos.");
  }
});

  

// Ruta para obtener preguntas de una categoría específica
router.get("/categorias/:categoria", async (req, res) => {
  const categoria = req.params.categoria.toLowerCase(); // Normalizar a minúsculas

  try {
    const preguntas = await Ask.findQuestionsByCategory(categoria); // Obtener preguntas por categoría

    if (preguntas.length === 0) {
      return res.status(404).send("No se encontraron preguntas para esta categoría.");
    }

    res.json(preguntas);
  } catch (error) {
    console.error("Error al obtener preguntas por categoría:", error.message);
    res.status(500).send("Error al obtener preguntas desde la base de datos.");
  }
});

// Ruta para obtener un número específico de preguntas de una categoría
router.get("/categorias/:categoria/:nPreguntas", async (req, res) => {
  const categoria = req.params.categoria.toLowerCase();
  const nPreguntas = parseInt(req.params.nPreguntas);

  if (isNaN(nPreguntas) || nPreguntas <= 0) {
    return res.status(400).send("El número de preguntas debe ser un número válido mayor a 0.");
  }

  try {
    const preguntas = await Ask.findQuestionsByCategoryLimit(categoria, nPreguntas); // Obtener preguntas limitadas

    if (preguntas.length === 0) {
      return res.status(404).send("No se encontraron preguntas para esta categoría.");
    }

    res.json(preguntas);
  } catch (error) {
    console.error("Error al obtener preguntas por categoría:", error.message);
    res.status(500).send("Error al obtener preguntas desde la base de datos.");
  }
});

module.exports = router; // Exportar el router