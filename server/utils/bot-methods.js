const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();

const { BOT_TOKEN } = process.env;

const BOT_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

const postFetch = async ({ url, body }) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

const createInvoiceLink = async ({ body }) => {
  const data = await postFetch({
    url: `${BOT_API_URL}/createInvoiceLink`,
    body,
  });
  return data;
};

const sendMessage = async ({ body }) => {
  const data = await postFetch({
    url: `${BOT_API_URL}/sendMessage`,
    body,
  });
  return data;
};

module.exports = {
  createInvoiceLink,
  sendMessage,
};
