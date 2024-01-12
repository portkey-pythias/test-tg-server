const qs = require("querystring");
const axios = require("axios");

const clientId = "1195261563658051634";
const clientSecret =
  "71bd7c5d496222bfcb3137547bf78030ef00b7e9b442f987a773d0ac32daa9d7";

const authorize = "https://discord.com/oauth2/authorize";
const auth = "https://discord.com/api/v10/oauth2/token";
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
