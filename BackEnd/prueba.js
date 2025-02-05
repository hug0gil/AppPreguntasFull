const { MongoClient } = require("mongodb");

const connectionURL =
  "mongodb+srv://admin:a1234@servidor.yiu2atd.mongodb.net/NodeJS?retryWrites=true&w=majority";

(async () => {
  try {
    const client = await MongoClient.connect(connectionURL);
    console.log("Conexión exitosa a MongoDB");
    client.close();
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error.message);
  }
})();
