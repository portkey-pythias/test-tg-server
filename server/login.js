const signture = require("../utils/signture");
const qs = require("querystring");
const request = require("request");

const consumerKey = "LTlQWkhBRFZ3Yl9RN1ZmTFZBM0Y6MTpjaQ";
const consumerSecret = "irUTnbcYmPXQkt5b6XQ7NxwYZCbcOJe3MLB75xVVMOUzRovhmX";

// 获取请求令牌
async function getRequestToken(ctx) {
  // 构建请求参数
  const params = {
    client_id: consumerKey,
    client_secret: consumerSecret,
    scope: "user:read",
    redirect_uri: "https://test-tg-app.vercel.app/oauth/callback/X",
  };

  // 生成签名
  const signature = signture.generateSignature(params, consumerSecret);

  // 构建请求 URL
  const url =
    "https://api.twitter.com/oauth/request_token?" +
    qs.stringify(params) +
    "&oauth_signature=" +
    encodeURIComponent(signature);

  console.log("url: ", url);

  // 发送请求
  const response = await new Promise((resolve, reject) => {
    request.post(url, (error, res) => {
      if (error) {
        reject(error);
      }
      resolve(res);
    });
  });

  console.log("response: ", response);

  // if (response.status !== 200) {
  //   console.log("response: ", JSON.stringify(response.status));
  //   throw Error("请求失败");
  // }

  // const data = await response.json();

  return response;
}

module.exports = {
  getRequestToken,
};
