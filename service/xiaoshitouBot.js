const TelegramBot = require("node-telegram-bot-api");
const token = "6317366127:AAHPEvgl5k-qfH3uFJ_aQ7slcqDt-vBtZZE";
// const token = '6914488686:AAG1Fz4mDr2-xIW49x3aob-1BuXRTLRmJCE';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {
  polling: true,
  // request: {
  //   proxy: "http://127.0.0.1:7890",
  // },
});

bot.onText(/^\/start$/, (msg, match) => {
  const chatId = msg.chat.id;

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, "Welcome everyone to AELF", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Repeater",
            callback_data: "openTGApp",
          },
        ],
        [
          {
            text: "test TG SDK",
            web_app: {
              url: "https://test-tg-app.vercel.app?isTgApp=true",
            },
          },
          {
            text: "Beangotown",
            web_app: {
              url: "https://www.beangotown.com/login",
            },
          },
        ],
        [
          {
            text: "Awaken",
            url: "https://www.awaken.finance/trading",
          },
        ],
      ],
    },
  });
});

bot.onText(/\/question/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "2+3=?", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "4",
            callback_data: "A",
          },
          {
            text: "5",
            callback_data: "B",
          },
        ],
        [
          {
            text: "6",
            callback_data: "C",
          },
          {
            text: "7",
            callback_data: "D",
          },
        ],
      ],
    },
  });
});

bot.on("callback_query", (callbackQuery) => {
  console.log("callbackQuery: ", callbackQuery);
  bot
    .answerCallbackQuery(callbackQuery.id)
    .then(() =>
      bot.sendMessage(callbackQuery.message.chat.id, "your click!!!!")
    );
});

bot.onText(/^\/hello$/, (msg) => {
  const chat = msg.chat;

  console.log("chat: ", chat);

  bot.sendMessage(
    chat.id,
    `hello ${chat.last_name} ${chat.first_name}, welcome to xiaoshitou bot`
  );
});

// bot.on("message", (msg) => {
//   const chatId = msg.chat.id;
//   // bot.sendMessage(chatId, "hello xiaoshitou");
//   // console.log("msg:", msg);
// });

bot.on("polling_error", (error) => {
  console.log("error", error);
});
