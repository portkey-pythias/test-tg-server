const crypto = require("crypto");

function generateSignature(params, secret) {
  // 将请求参数按字典顺序排序
  const sortedParams = Object.keys(params).sort();

  // 将请求参数的键和值连接起来
  const paramStr = sortedParams.reduce((acc, param) => {
    return acc + param + "=" + params[param] + "&";
  }, "");

  // 将请求方法、请求 URL 和请求参数字符串连接起来
  const baseStr = params.method + "&" + params.url + "&" + paramStr;

  // 使用 HMAC-SHA1 算法进行签名
  const hash = crypto.createHmac("sha1", secret);
  hash.update(baseStr);
  const signature = hash.digest("base64");

  return signature;
}

module.exports = {
  generateSignature,
};
