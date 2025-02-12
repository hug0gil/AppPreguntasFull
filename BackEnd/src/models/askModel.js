const mongoose = require('mongoose');

// Definimos el esquema de la pregunta
const askSchema = new mongoose.Schema({
  pregunta: {
    type: String,
    required: true,
    trim: true
  },
  respuestas: [{
    type: String,
    required: true
  }],
  respuestaCorrecta: {
    type: String,
    required: true,
    trim: true
  },
  categoria: {
    type: String,
    required: true,
    trim: true
  }
});

// Método estático para encontrar preguntas por categoría
askSchema.statics.findByCategory = async function(categoria) {
  const preguntas = await this.find({ categoria });

  if (!preguntas || preguntas.length === 0) {
    throw new Error('No questions found for this category');
  }

  return preguntas;
};

// Método estático para verificar si una respuesta es correcta
askSchema.statics.verifyAnswer = async function(preguntaId, respuesta) {
  const pregunta = await this.findById(preguntaId);

  if (!pregunta) {
    throw new Error('Pregunta no encontrada');
  }

  const isCorrect = pregunta.respuestaCorrecta.toLowerCase() === respuesta.toLowerCase();
  return isCorrect;
};

// Pre-hook para manipular la pregunta antes de guardarla (si es necesario)
askSchema.pre('save', async function(next) {
  const pregunta = this;
  // Puedes añadir lógica aquí antes de guardar (por ejemplo, validaciones adicionales)
  
  next();
});

// Modelo de la pregunta (ask)
const Ask = mongoose.model('Ask', askSchema);

module.exports = Ask;
