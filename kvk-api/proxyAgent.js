const http = require("http");
const https = require("https");
const HttpProxyAgent = require("http-proxy-agent");
const HttpsProxyAgent = require("https-proxy-agent");

const httpProxy = process.env.HTTP_PROXY;
const httpsProxy = process.env.HTTPS_PROXY;
var httpAgent = new http.Agent({});
var httpsAgent = new https.Agent({});

if (httpProxy) {
  httpAgent = new HttpProxyAgent(httpProxy);
  console.log("Using HTTP proxy server %j", httpProxy);
}
if (httpsProxy) {
  httpsAgent = new HttpsProxyAgent(httpsProxy);
  console.log("Using HTTPS proxy server %j", httpsProxy);
}

module.exports = function (_parsedURL) {
  if (_parsedURL.protocol == "http:") {
    console.log("Using HTTP");
    return httpAgent;
  } else {
    console.log("Using HTTPS");
    return httpsAgent;
  }
};
