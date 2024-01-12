const loginX = require("./X");
const loginTwitch = require("./Twitch");

function getAuthUrl(params, query, ctx) {
  switch (params.type) {
    case "X":
      return loginX.getAuth(params, query, ctx);
    case "Twitch":
      return loginTwitch.getAuth(params, query, ctx);
  }
}

function getAccessToken(params, query, ctx) {
  switch (params.type) {
    case "X":
      return loginX.authToken(params, query, ctx);
    case "Twitch":
      return loginTwitch.authToken(params, query, ctx);
  }
}

module.exports = {
  getAuthUrl,
  getAccessToken,
};
