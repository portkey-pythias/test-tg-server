const qs = require("querystring");
const axios = require("axios");

const clientId = "75ii8jex2ds14b3xp4xj1h52m15or0";
const clientSecret = "cfitv8xr306hmc2jvgoesejpi9760s";

const authorize = "https://id.twitch.tv/oauth2/authorize";
const auth = "https://id.twitch.tv/oauth2/token";
// 获取请求令牌
function getAuth(params, query, ctx) {
  const json = {
    client_id: clientId,
    redirect_uri: `https://test-tg-server.vercel.app/login/getAccessToken/${params.type}`,
    response_type: "code",
    scope: encodeURIComponent("channel:read:polls"),
    state: "state",
  };

  return `${authorize}?${qs.stringify(json)}`;
}

// 访问令牌
async function authToken(params, query, ctx) {
  const json = {
    client_id: clientId,
    grant_type: "authorization_code",
    redirect_uri: `https://test-tg-server.vercel.app/login/getAccessToken/${params.type}`,
    code: query.code,
    client_secret: clientSecret,
  };

  try {
    const response = await axios({
      method: "post",
      url: auth,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: json,
      paramsSerializer: (params) => qs.stringify(params),
    });

    console.log("Twitch login :", response.data);

    const { access_token } = response.data;

    return {
      accessToken: access_token,
    };
  } catch (e) {
    console.log("e: ", e);
  }
}

module.exports = {
  getAuth,
  authToken,
};
