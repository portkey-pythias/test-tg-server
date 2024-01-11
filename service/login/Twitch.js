const qs = require("querystring");
const axios = require("axios");
const getBaseUrl = require("../../utils/getBaseUrl");

const clientId = "hbjvbov3ngiisv2qzc1rj8a17x5i65";

const authorize = "https://id.twitch.tv/oauth2/authorize";
const auth = "https://id.twitch.tv/oauth2/toke";
// 获取请求令牌
function getAuth(params, query, ctx) {
  const json = {
    client_id: clientId,
    response_type: "token",
    // scope: ,
    redirect_uri: `${getBaseUrl()}/login/getAccessToken/${params.type}`,
    state: "state",

    auth_prompt: false,
  };

  return `${authorize}?${qs.stringify(json)}`;
}

// 访问令牌
async function authToken(params, query, ctx) {
  const json = {
    client_id: clientId,
    grant_type: "code",
    redirect_uri: `${getBaseUrl()}/login/getAccessToken/${params.type}`,
    code: query.code,
    client_secret,
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

    const { access_token } = response;

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
