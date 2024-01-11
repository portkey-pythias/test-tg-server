const Router = require("koa-router");
const telegramLogin = require("../../service/telegram/login");
const telegramMiniAppLogin = require("../../service/telegram/miniAppLogin");

const telegramRoute = new Router();

telegramRoute.get("/auth/callback", async (ctx) => {
  const query = ctx.request.query;
  const params = ctx.params;
  telegramLogin.authCallback(params, query, ctx);
});

telegramRoute.get("/getAccessToken", async (ctx, next) => {
  const query = ctx.request.query;
  const params = ctx.params;
  telegramMiniAppLogin.getAccessToken(params, query, ctx);
});

telegramRoute.post("/auth/token", async (ctx, next) => {
  const query = ctx.request.query;
  const params = ctx.params;
  telegramMiniAppLogin.authToken(params, query, ctx);
});

module.exports = telegramRoute;
