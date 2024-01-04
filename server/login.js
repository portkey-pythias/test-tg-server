const signture = require("../utils/signture");
const qs = require("querystring");
const request = require("request");

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
    redirect_uri: "https://test-tg-app.vercel.app/oauth/callback/X",
    // redirect_uri: "http://192.168.11.139:3000/oauth/callback/X",
    state: "state",
    response_type: "code",
  };

  return `${authorize}?${qs.stringify(params)}`;
}

// 访问令牌
async function authToken({ code }) {
  const params = {
    grant_type: "authorization_code",
    client_id: consumerKey,
    redirect_uri: "https://test-tg-app.vercel.app/",
    code_verifier: "challenge",
    code,
  };

  const options = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  };
  console.log("options: ", options);
  request.post(auth, options, (error, response) => {
    console.log("error: ", error);
    console.log("response: ", response);
  });
}

module.exports = {
  getAuth,
  authToken,
};
