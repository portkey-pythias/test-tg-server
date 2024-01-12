const qs = require("querystring");
const axios = require("axios");

const clientId = "wXuTLL6w1jORBtp06aB08Q";
const clientSecret = "Q3drp07m2zRlmw9_LhMY7h8xOVfBng";

const authorize = "https://www.reddit.com/api/v1/authorize";
const auth = "https://www.reddit.com/api/v1/access_token";
// 获取请求令牌
function getAuth(params, query, ctx) {
  const json = {
    client_id: clientId,
    redirect_uri: `https://test-tg-server.vercel.app/login/getAccessToken/${params.type}`,
    response_type: "code",
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

    console.log("Twitch login : ", response.data);

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
