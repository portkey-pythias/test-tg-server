const signture = require("../utils/signture");
const qs = require("querystring");
const request = require("request");

const consumerKey = "LTlQWkhBRFZ3Yl9RN1ZmTFZBM0Y6MTpjaQ";
const consumerSecret = "irUTnbcYmPXQkt5b6XQ7NxwYZCbcOJe3MLB75xVVMOUzRovhmX";

// 获取请求令牌
function getRequestToken(ctx) {
  // 构建请求参数
  const params = {
    client_id: consumerKey,
    code_challenge: "challenge",
    code_challenge_method: "plain",
    scope: "users.read",
    redirect_uri: "https://test-tg-app.vercel.app/oauth/callback/X",
    state: "state",
  };

  // 生成签名
  // const signature = signture.generateSignature(params, consumerSecret);

  // 构建请求 URL
  const url = "https://twitter.com/i/oauth2/authorize?" + qs.stringify(params);

  console.log("url: ", url);

  // 发送请求
  // const response = await new Promise((resolve, reject) => {
  //   request.post(url, (error, res) => {
  //     if (error) {
  //       reject(error);
  //     }
  //     resolve(res);
  //   });
  // });

  // console.log("response: ", response);

  // if (response.status !== 200) {
  //   console.log("response: ", JSON.stringify(response.status));
  //   throw Error("请求失败");
  // }

  // const data = await response.json();

  return url;
}

module.exports = {
  getRequestToken,
};
