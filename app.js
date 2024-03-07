require("dotenv").config();
const express = require("express");
const axios = require("axios");
const connectToDatabase = require("./connectDB");
const { insertUser } = require("./dbModel");
const { send_button, send_message, send_template } = require("./wa_func");
const app = express();
app.use(express.json());

const token = process.env.TOKEN;
console.log("Started");
// Updated code to send button message if user sends "Hi" and handle classname input
app.post("/webhook", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    await insertUser(data);

    let response_msg = "";

    if (data.type === "text" && data.msg.toLowerCase() === "hi") {
      const button = [
        { id: "btn_1", title: "Submit" },
        { id: "btn_2", title: "Cancel" },
      ];
      send_button("Please select an option:", button, data);
    } else if (data.type === "interactive" && data.btn_id === "btn_1") {
      if (send_message("Provide a name for the class", data)) {
        send_message(`You said ${data.msg}`, data);
      }
    } else {
      response_msg = "Error: Invalid request";
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
