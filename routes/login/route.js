const Router = require("koa-router");
const loginService = require("../../service/login/index");
const qs = require("querystring");

const loginRoute = new Router();

loginRoute.get("/", (ctx) => {
  ctx.body = {
    status: 404,
    msg: "请输入正确地址",
  };

  ctx.state = 200;
});

loginRoute.get("/getCode/:type", (ctx) => {
  const query = ctx.request.query;
  const params = ctx.params;
  const authUrl = loginService.getAuthUrl(params, query, ctx);

  ctx.redirect(authUrl);
});

loginRoute.get("/getAccessToken/:type", async (ctx) => {
  const query = ctx.request.query;
  const params = ctx.params;
  const response = await loginService.getAccessToken(params, query, ctx);
  ctx.redirect(
    `https://test-tg-app.vercel.app/login?${qs.stringify(response)}`
  );
});

module.exports = loginRoute;
