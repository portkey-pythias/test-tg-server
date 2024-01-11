function getBaseUrl() {
  const env = process.env.NODE_ENV;

  console.log("env: ", process.env.NODE_ENV);
  if (env === "prod") {
    return "https://test-tg-server.vercel.app";
  }

  return "http://localhost:8888/";
}

module.exports = getBaseUrl;
