const accessTokenMap = new Map();

function getAccessToken(params, query, ctx) {
  const { userId } = query;
  const accessToken = (Math.random() * 100000000).toFixed();

  accessTokenMap.set(userId, accessToken);

  ctx.body = {
    userId,
    accessToken,
  };
}

function authToken(params, query, ctx) {
  const { userId } = query;
  const accessToken = accessTokenMap.get(userId);

  const loginStatus =
    accessToken === query.accessToken ? "login success" : "login fail";

  ctx.body = {
    userId,
    loginStatus,
  };
}

module.exports = {
  getAccessToken,
  authToken,
};
