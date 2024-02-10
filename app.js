require("dotenv").config();
const express = require("express");
const axios = require("axios");
const connectToDatabase = require("./connectDB");

const { send_button, send_message, send_template } = require("./wa_func");
const app = express();
app.use(express.json());

const token = process.env.TOKEN;
console.log("Started");
app.post("/webhook", async (req, res) => {
  try {
    const data = req.body;

    console.log(data);

    async function insertDocuments() {
      try {
        const database = await connectToDatabase();
        const user_collection = database.collection("users");

        const query = { _id: data.id };
        const existingDocument = await user_collection.findOne(query);

        if (!existingDocument) {
          const result = await user_collection.insertOne({
            _id: data.id,
            username: data.username,
            phone_number: data.phone_number,
          });
          console.log("Document inserted:", result.insertedId);
        } else {
          console.log(
            `Document with _id ${data.id} already exists:`,
            existingDocument
          );
        }
      } catch (error) {
        console.error("Error inserting documents:", error);
      }
    }

    insertDocuments(data);

    let response_msg = "";

    if (data.msg.toLowerCase() == "hello babe") {
      const buttons = [
        { id: "button_1", title: "Get Started" },
        { id: "button_2", title: "Learn More" },
        { id: "button_3", title: "Contact Us" },
      ];
      send_button(buttons, data);
    } else if (data.type == "interactive") {
      if (data.btn_id == "button_1") {
        send_template(
          "firstt_message",
          "https://telegra.ph/file/2894988ef8b29096c7aeb.jpg",
          data
        );
      } else if (data.btn_id == "button_2") {
        send_message("You finally clicked on Button 2 😂", data);
      } else if (data.btn_id == "button_3") {
        send_message("You finally clicked on Button 3 😂", data);
      }
    } else {
      response_msg = "Fuck yoouu";
    }

    res.json({
      message: response_msg,
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Assuming you listen to a port
const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
