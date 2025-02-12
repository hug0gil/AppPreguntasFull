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

// Método estático para encontrar todas las preguntas
askSchema.statics.findAllQuestions = async function() {
  return await this.find();
};

// Método estático para encontrar preguntas por categoría
askSchema.statics.findQuestionsByCategory = async function(categoria) {
  return await this.find({ categoria: categoria.toLowerCase() });
};

// Método estático para encontrar preguntas de una categoría y limitar la cantidad
askSchema.statics.findQuestionsByCategoryLimit = async function(categoria, nPreguntas) {
  return await this.find({ categoria: categoria.toLowerCase() }).limit(nPreguntas);
};

// Pre-hook para manipular la pregunta antes de guardarla (si es necesario)
askSchema.pre('save', async function(next) {
  const pregunta = this;
  // Aquí puedes agregar lógica adicional si fuera necesario
  
  next();
});

// Modelo de la pregunta (ask)
const Ask = mongoose.model('Ask', askSchema, 'Preguntas');

module.exports = Ask;
