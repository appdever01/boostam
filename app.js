require("dotenv").config();
const express = require("express");
const axios = require("axios");
const connectToDatabase = require("./connectDB");
const { insertUser } = require("./component");
const { send_button, send_message, send_template } = require("./wa_func");
const app = express();
app.use(express.json());

const token = process.env.TOKEN;
console.log("Started");
app.post("/webhook", async (req, res) => {
  try {
    const data = req.body;

    console.log(data);

    await insertUser(data);

    let response_msg = "";

    send_template(
      "firstt_message",
      "https://telegra.ph/file/2894988ef8b29096c7aeb.jpg",
      data
    );

    // send_button(buttons, data);

    if (data.msg.toLowerCase() == "hello babe") {
    } else if (data.type == "interactive") {
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
