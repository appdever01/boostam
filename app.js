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
app.post("/webhook", async (req, res) => {
  try {
    const data = req.body;

    console.log(data);

    await insertUser(data);

    let response_msg = "";

    // send_template(
    //   "firstt_message",
    //   "https://telegra.ph/file/2894988ef8b29096c7aeb.jpg",
    //   data
    // );

    const button = [
      { id: "btn_1", title: "Submit" },
      { id: "btn_2", title: "Cancel" },
    ];
    send_button("Button testinng ", button, data);

    if (data.type == "interactive" && data.btn_id == "btn_1") {
      if (send_message("Provide a name for the class", data)) {
        if (data.type == "text") {
          send_message(`You said ${data.msg}`, data);
        }
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
