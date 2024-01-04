const Router = require("koa-router");
const login = require("./login");

const router = new Router();

router.get("/login/X", (ctx, next) => {
  try {
    const url = login.getAuth(ctx);
    // 保存请求令牌
    // ctx.state.requestToken = requestToken;
    // 重定向到授权 URL
    ctx.redirect(url);
    // ctx.status = 200;
    // ctx.body = response;
  } catch (e) {
    console.log("error: ", e.toString());
  }
});

router.get("/oauth/callback/X", async (ctx, next) => {
  const queryParameters = ctx.request.query;
  console.log("/oauth/callback/X 参数 :", queryParameters);

  login.authToken(queryParameters);
});

module.exports = router;


