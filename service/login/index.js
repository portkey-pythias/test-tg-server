const loginX = require("./X");
const loginTwitch = require("./Twitch");
const loginDiscord = require("./discord");

function getAuthUrl(params, query, ctx) {
  switch (params.type) {
    case "x":
      return loginX.getAuth(params, query, ctx);
    case "twitch":
      return loginTwitch.getAuth(params, query, ctx);
    case "discord":
      return loginDiscord.getAuth(params, query, ctx);
    default:
      return "https://test-tg-app.vercel.app/thirdLogin";
  }
}

function getAccessToken(params, query, ctx) {
  switch (params.type) {
    case "x":
      return loginX.authToken(params, query, ctx);
    case "twitch":
      return loginTwitch.authToken(params, query, ctx);
    case "discord":
      return loginDiscord.authToken(params, query, ctx);
  }
}

module.exports = {
  getAuthUrl,
  getAccessToken,
};
