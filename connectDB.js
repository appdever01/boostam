const { MongoClient } = require("mongodb");

const uri = process.env.URI;
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    // Use the connected client to access a database
    const database = client.db("adtasker");
    return database;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = connectToDatabase;
