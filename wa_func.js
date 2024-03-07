require("dotenv").config();
const axios = require("axios");
const { url } = require("inspector");
const token = process.env.TOKEN;
const base_url = "https://graph.facebook.com/v18.0/206459855891807/messages";
const send_button = (message, btn_list, data) => {
  console.log(btn_list);
  let datax = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: "2349159899405",
    type: "interactive",
    interactive: {
      type: "button",
      body: {
        text: message,
      },
      action: {
        buttons: btn_list.map((btn) => ({
          type: "reply",
          reply: {
            id: btn.id,
            title: btn.title,
          },
        })),
      },
    },
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: base_url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Cookie: "ps_l=0; ps_n=0",
    },
    data: datax,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

const send_message = (message, data) => {
  let datax = JSON.stringify({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: data.to,
    context: {
      message_id: data.wam_id,
    },
    type: "text",
    text: {
      preview_url: false,
      body: message,
    },
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://graph.facebook.com/v18.0/206459855891807/messages",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Cookie: "ps_l=0; ps_n=0",
    },
    data: datax,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  return true;
};

const send_template = (template_name, media_url, data) => {
  let datax = JSON.stringify({
    messaging_product: "whatsapp",
    type: "template",
    to: data.to,
    template: {
      name: template_name,
      language: {
        code: "en_US",
      },
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "image",
              image: {
                link: media_url,
              },
            },
          ],
        },
      ],
    },
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: base_url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Cookie: "ps_l=0; ps_n=0",
    },
    data: datax,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

const mark_read = (data) => {
  let datax = JSON.stringify({
    messaging_product: "whatsapp",
    status: "read",
    message_id: data.wam_id,
  });

  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: "",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Cookie: "ps_l=0; ps_n=0",
    },
    data: datax,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {
  send_button,
  send_message,
  mark_read,
  send_template,
};
