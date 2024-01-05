const Router = require("koa-router");
const login = require("./login");

const router = new Router();

const accessTokenMap = new Map();

router.get("/login/X", (ctx, next) => {
  try {
    const url = login.getAuth(ctx);
    ctx.redirect(url);
  } catch (e) {
    console.log("error: ", e.toString());
  }
});

router.get("/oauth/callback/X", async (ctx, next) => {
  const queryParameters = ctx.request.query;
  console.log("/oauth/callback/X 参数 :", queryParameters);

  login.authToken(queryParameters);
});

router.get("/tg/getAccessToken", async (ctx, next) => {
  console.log("/tg/getAccessToken : ", ctx.request.query);
  const queryParameters = ctx.request.query;
  ctx.response.set("content-type", "application/json");

  const accessToken = (Math.random() * 100000000).toFixed();

  accessTokenMap.set(queryParameters.userId, accessToken);

  const json = {
    accessToken,
    userId: queryParameters.userId,
  };

  ctx.body = JSON.stringify(json);
  ctx.status = 200;
});

router.post("/tg/auth/token", async (ctx, next) => {
  const queryParameters = ctx.request.query;
  ctx.response.set("content-type", "application/json");

  const accessToken = accessTokenMap.get(queryParameters.userId);

  const loginStatus =
    accessToken === queryParameters.accessToken
      ? "login success"
      : "login fail";

  const json = {
    userId: queryParameters.userId,
    loginStatus,
  };

  ctx.body = JSON.stringify(json);
  ctx.status = 200;
});



module.exports = router;


