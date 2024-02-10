const { MongoClient } = require("mongodb");

const uri = process.env.URI;
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");
    const database = client.db("boostam");
    return database;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
//inserting Users
async function insertUser(data) {
  try {
    const database = await connectToDatabase();
    const user_collection = database.collection("users");
    const notif_subscriber = database.collection("notification_subscriber");

    const query = { _id: data.id };
    const existingUser = await user_collection.findOne(query);
    const existingSubscriber = await user_collection.findOne(query);

    if (!existingUser) {
      const result = await user_collection.insertOne({
        _id: data.id,
        username: data.username,
        phone_number: data.phone_number,
        auth_status: false,
      });
      console.log("User Added:", result.insertedId);
    } else {
      console.log(`User with _id ${data.id} already exists:`, existingUser);
    }

    if (!existingSubscriber) {
      const result = await notif_subscriber.insertOne({
        _id: data.id,
        username: data.username,
        phone_number: data.phone_number,
      });
      console.log("User Subscribed:", result.insertedId);
    }
  } catch (error) {
    console.error("Error inserting documents:", error);
  }
}

module.exports = {
  connectToDatabase,
  insertUser,
};
