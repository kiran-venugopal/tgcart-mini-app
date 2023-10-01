const express = require("express");
const dotenv = require("dotenv");
const fetch = require("node-fetch");
const cors = require("cors");

dotenv.config();

const { PORT, BOT_TOKEN, PAYMENT_TOKEN, CLIENT_APP_URL } = process.env;
const app = express();

const BOT_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

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
    const response = await fetch(`${BOT_API_URL}/createInvoiceLink`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log({ data });
    return res.json({ success: !!data.result, url: data.result });
  } catch (err) {
    console.error(err);
    return res.json({ success: false });
  }
});

app.listen(PORT || 5000, () => {
  console.log("listening");
});

module.exports = app;
