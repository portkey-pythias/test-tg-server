const qs = require("querystring");
const axios = require("axios");

const consumerKey = "LTlQWkhBRFZ3Yl9RN1ZmTFZBM0Y6MTpjaQ";
const consumerSecret = "irUTnbcYmPXQkt5b6XQ7NxwYZCbcOJe3MLB75xVVMOUzRovhmX";

const authorize = "https://twitter.com/i/oauth2/authorize";
const auth = "https://api.twitter.com/2/oauth2/token";

// 获取请求令牌
function getAuth(ctx) {
  const params = {
    client_id: consumerKey,
    code_challenge: "challenge",
    code_challenge_method: "plain",
    scope: "users.read",
    redirect_uri: "https://test-tg-server.vercel.app/oauth/callback/X",
    // redirect_uri: "192.168.11.149:6666/oauth/callback/X",
    state: "state",
    response_type: "code",
  };

  console.log("请求登录");

  return `${authorize}?${qs.stringify(params)}`;
}

// 访问令牌
async function authToken({ code }) {
  const params = {
    grant_type: "authorization_code",
    client_id: consumerKey,
    redirect_uri: "https://test-tg-app.vercel.app/login",
    code_verifier: "challenge",
    code,
  };

  const res = await axios({
    method: "post",
    url: auth,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: params,
    paramsSerializer: (params) => qs.stringify(params),
  });

  console.log("authToken reponse: ", res);
}

module.exports = {
  getAuth,
  authToken,
};
