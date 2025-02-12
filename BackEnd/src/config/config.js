process.loadEnvFile()

const config = {
  PORT, CONNECTIONURL
} = process.env;

module.exports = config;
