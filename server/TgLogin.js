const Router = require("koa-router");
const router = new Router();

router.get("/auth/callback", async (ctx) => {
  try {
    const queryParameters = ctx.request.query;
    const { id, auth_date, hash, first_name, username, last_name } =
      queryParameters;
    const botToken = "6317366127:AAHPEvgl5k-qfH3uFJ_aQ7slcqDt-vBtZZE";
    const userIdentifier =
      "generate_user_identifier_based_on_user_id_and_state"; // 生成用户标识

    const isValid = validateTelegramCallback(
      id,
      auth_date,
      hash,
      first_name,
      username,
      last_name,
      botToken
    );

    if (isValid) {
      const authToken = generateAuthToken(userIdentifier);
      ctx.redirect(
        `https://test-tg-app.vercel.app/callback?token=${authToken}`
      );
    }
  } catch (e) {
    // 验证失败，处理错误逻辑
    ctx.status = 200;
    ctx.body = { message: "login error", data: ctx.request.query };
  }
});

// 验证回调参数的函数
function validateTelegramCallback(
  id,
  auth_date,
  hash,
  first_name,
  username,
  last_name,
  botToken
) {
  return true;
}

// 生成用户令牌的函数
function generateAuthToken(userIdentifier) {
  // 在这里实现生成用户令牌的逻辑，可以使用 JWT 等机制
  return userIdentifier;
}

module.exports = router;
