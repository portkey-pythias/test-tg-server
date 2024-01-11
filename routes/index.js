const Router = require("koa-router");
const loginRoute = require("./login/route");
const telegramRoute = require("./telegram/router");

const router = new Router();

router.get("/", (ctx) => {
  ctx.redirect("https://test-tg-app.vercel.app/");
});

router.use("/login", loginRoute.routes(), router.allowedMethods());
router.use("/tg", telegramRoute.routes(), router.allowedMethods());

module.exports = router;
