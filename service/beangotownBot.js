const TelegramBot = require("node-telegram-bot-api");
const token = "6914488686:AAG1Fz4mDr2-xIW49x3aob-1BuXRTLRmJCE";

const bot = new TelegramBot(token, {
  polling: true,
  request: {
    proxy: "http://127.0.0.1:7890",
  },
});

// inline
bot.onText(/^\/start_inline$/, (msg, match) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "start by inline", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "open Beangotown",
            web_app: {
              url: "https://www.beangotown.com",
            },
          },
        ],
      ],
    },
  });
});

// keybord
bot.onText(/\/start_keybord/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "start by keybord", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "open Beangotown",
            web_app: {
              url: "https://www.beangotown.com",
            },
          },
        ],
      ],
    },
  });
});

// say hello
bot.onText(/^\/hello$/, (msg) => {
  const chat = msg.chat;
  bot.sendMessage(
    chat.id,
    `hello ${chat.last_name}.${chat.first_name}, welcome to Beangotown`
  );
});

bot.on("polling_error", (error) => {
  console.log("error", error);
});
