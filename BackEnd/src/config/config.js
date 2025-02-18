// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

const { PORT, CONNECTIONURL } = process.env;  // Accede a las variables de entorno

const config = {
  PORT,
  CONNECTIONURL
};

module.exports = config;
