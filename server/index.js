const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { createInvoiceLink, sendMessage } = require("./utils/bot-methods");
const { welcomeMessage } = require("./const/messages");

dotenv.config();

const { PORT, PAYMENT_TOKEN, CLIENT_APP_URL } = process.env;
const app = express();

app.use(express.json());
app.use(cors({ origin: CLIENT_APP_URL, optionsSuccessStatus: 200 }));

app.post("/invoice-link", async (req, res) => {
  try {
    const reqBody = req.body;

    const body = {
      title: reqBody.title,
      description: reqBody.description,
      payload: reqBody.payload || "data",
      provider_token: PAYMENT_TOKEN,
      currency: "USD",
      prices: [
        {
          label: "Total Amount",
          /** `amount` needs to be multiplied by 100, refer: https://core.telegram.org/bots/api#labeledprice */
          amount: reqBody.amount * 100,
        },
      ],
    };

    const data = await createInvoiceLink({ body });

    console.log({ data });

    return res.json({ success: !!data.result, url: data.result });
  } catch (err) {
    console.error(err);
    return res.json({ success: false });
  }
});

app.post("/", async (req, res) => {
  try {
    console.log("webhook event", req.body);
    const { message } = req.body;

    if (message) {
      const { chat } = message;
      const body = {
        chat_id: chat.id,
        text: welcomeMessage,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "BUY NOW",
                web_app: {
                  url: CLIENT_APP_URL,
                },
              },
            ],
          ],
        },
      };

      const response = await sendMessage({ body });
      console.log({ response });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error(err);
    return res.json({ success: false });
  }
});

app.listen(PORT || 5000, () => {
  console.log("listening");
});

module.exports = app;
