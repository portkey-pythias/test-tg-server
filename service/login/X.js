const qs = require("querystring");
const axios = require("axios");

const consumerKey = "LTlQWkhBRFZ3Yl9RN1ZmTFZBM0Y6MTpjaQ";
const consumerSecret = "irUTnbcYmPXQkt5b6XQ7NxwYZCbcOJe3MLB75xVVMOUzRovhmX";

const authorize = "https://twitter.com/i/oauth2/authorize";
const auth = "https://api.twitter.com/2/oauth2/token";

// 获取请求令牌
function getAuth(params, query, ctx) {
  const json = {
    client_id: consumerKey,
    code_challenge: "challenge",
    code_challenge_method: "plain",
    scope: "users.read",
    redirect_uri: `https://test-tg-server.vercel.app/login/getAccessToken/${params.type}`,
    state: "state",
    response_type: "code",
    auth_prompt: false,
  };

  return `${authorize}?${qs.stringify(json)}`;
}

// 访问令牌
async function authToken(params, query, ctx) {
  const json = {
    grant_type: "authorization_code",
    client_id: consumerKey,
    redirect_uri: `https://test-tg-server.vercel.app/login/getAccessToken/${params.type}`,
    code_verifier: "challenge",
    code: query.code,
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

    console.log("X login : ", response.data);

    const { access_token, token_type } = response.data;

    return {
      accessToken: access_token,
      loginType: params.type,
      tokenType: token_type,
      refreshToken: "",
      status: "success",
    };
  } catch (e) {
    console.log("e: ", e);
  }
}

module.exports = {
  getAuth,
  authToken,
};
