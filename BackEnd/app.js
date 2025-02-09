const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

let conecction; // Variable para almacenar la conexión a la base de datos
const { MongoClient } = require("mongodb"); // Importa MongoClient de forma directa
const databaseName = "NodeJS";
const connectionURL =
  "mongodb+srv://admin:a1234@servidor.yiu2atd.mongodb.net/" +
  databaseName +
  "?retryWrites=true&w=majority";

app.use(cors()); // Habilita CORS para que Angular o cualquier cliente puedan acceder


// Función para conectar a MongoDB
const connectToMongoDB = async () => {
  try {
    const client = await MongoClient.connect(connectionURL); // Conexión asíncrona
    console.log("Conexión exitosa a MongoDB");
    conecction = client.db(databaseName);

    // Inicia el servidor una vez conectado a MongoDB
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error.message);
  }
};

// Llamada a la función para conectar a MongoDB
connectToMongoDB();

app.get("/categorias", async (req, res) => {
  try {
    const preguntas = await conecction.collection("Preguntas").find().toArray();
    res.json(preguntas);
  } catch (error) {
    console.error("Error al obtener preguntas:", error.message);
    res.status(500).send("Error al obtener preguntas desde la base de datos.");
  }
});

// Endpoint categoría concreta

app.get("/categorias/:categoria", async (req, res) => {
  const categoria = req.params.categoria.toLowerCase(); // Normalizar a minúsculas
  try {
    const preguntas = await conecction
      .collection("Preguntas")
      .find({ categoria }) // Filtra por categoría
      .toArray();
    if (preguntas.length === 0) {
      return res
        .status(404)
        .send("No se encontraron preguntas para esta categoría.");
    }
    res.json(preguntas);
  } catch (error) {
    console.error("Error al obtener preguntas por categoría:", error.message);
    res.status(500).send("Error al obtener preguntas desde la base de datos.");
  }
});

app.get("/categorias/:categoria/:nPreguntas", async (req, res) => {
  // Obtenemos categoría y número de preguntas desde la ruta
  const  categoria = req.params.categoria.toLowerCase();
  const  nPreguntas = req.params.nPreguntas;

  const limite = parseInt(nPreguntas);
  if (isNaN(limite) || limite <= 0) {
    return res
      .status(400)
      .send("El número de preguntas debe ser un número válido mayor a 0.");
  }

  try {
    // Filtramos por categoría y limitamos por el número de preguntas
    const preguntas = await conecction
      .collection("Preguntas")
      .find({ categoria }) // Filtrar por categoría
      .limit(limite) // Limitar al número especificado
      .toArray();

    if (preguntas.length === 0) {
      return res
        .status(404)
        .send("No se encontraron preguntas para esta categoría.");
    }

    res.json(preguntas);
  } catch (error) {
    console.error("Error al obtener preguntas por categoría:", error.message);
    res.status(500).send("Error al obtener preguntas desde la base de datos.");
  }
});

app.get("/", (req, res) => {
  res.send("¡Hola, mundo desde Express!");
});
