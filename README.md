# TGCart Mini App

An e-commerce Telegram mini app with payment gateway, which can be launched from a Telegram bot 

## [🥉 3rd prize winner of Telegram's mini app contest](https://contest.com/mini-apps/entry4446)



## Installation


### Server

/server folder of this repo contains code for listening to webhook events (which you need to set using [setWebhooks](https://core.telegram.org/bots/webapps#launching-mini-apps-from-the-menu-button)) and payment invoice generation API (`/invoice-link` route in /server/index.js)


#### 1. go inside /server folder and create .env file using the .env.sample template file

```
BOT_TOKEN=1341437044:AAEnJflnTJCaUWCkLv0oxip4pFNISMVpneX

PAYMENT_TOKEN=9744372395:TEST:6daf8f15f74fdb831521

CLIENT_APP_URL=https://tgcart-server.vercel.app
```

BOT_TOKEN - the unique token that is given [when your bot is created](https://core.telegram.org/bots/features#botfather), you can also get it from [botfather](https://t.me/botfather)

PAYMENT_TOKEN - the unique token that is given after configuring your [bot payment gateway](https://core.telegram.org/bots/payments)

CLIENT_APP_URL - a url value where you going to deploy the client side of this repo (/client folder)


#### 2. Installing dependencies

run `npm install` inside the /server folder, this will install all the necessary packages


#### 3. Starting the application

run `npm run start` inside the /server folder, this will start the server in port 5000 ( you can also configure this by adding PORT variable in .env file)


### Client

/client folder of this repo contains a [react app](https://react.dev/) which will render the e-commerce mini app, it also uses the [Telegram web app API](https://core.telegram.org/bots/webapps#initializing-mini-apps) library (which brings the core APIs to interact with the Telegram bot and app) in client/index.html which will load the Telegram.WebApp module in window object 
```
 <script src="https://telegram.org/js/telegram-web-app.js"></script>
```

#### 1. go inside /client folder and create .env file using the .env.sample template file

```
VITE_APP_BACKEND_URL=https://tgcart.vercel.app

VITE_APP_NAME=TGCart
```

VITE_APP_BACKEND_URL - url where your server is running (/server folder of this same repo) 

VITE_APP_NAME - name of your telegram mini app


#### 2. Installing dependencies

run `npm install` inside the /client folder, this will install all the necessary packages like react, tailwind, vite, etc


#### 3. Starting the application (dev mode)

run `npm run dev` inside the /client folder, this will start the dev server which is configured using vite js


## Live demo

live demo of this app can be found at https://t.me/tgcart_miniapp_bot, you can launch the mini app either by clicking the [Menu button](https://core.telegram.org/bots/webapps#launching-mini-apps-from-the-menu-button) or by sending any message to this bot like in this video



https://github.com/user-attachments/assets/1701c187-7865-4e70-a479-c225837c798e




client side is served from - https://tgcart.vercel.app

server side is server from - https://tgcart-server.vercel.app












