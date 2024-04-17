const https = require("https");
const http = require("http");
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Define your proxy routes
/*const proxyOptions = {
  changeOrigin: true,
};

// Proxy configurations
const proxies = [
  { path: "/api/orders", target: "http://54.90.253.254:8888" },
  { path: "/api/v1/orders", target: "http://54.90.253.254:3003" },
  { path: "/api/v1/statistics", target: "http://54.90.253.254:3003" },
];*/

app.post("/", (req, res) => {
  res.send("done");
});

app.get("/", (req, res) => {
  res.send("get done");
});

// Create proxy middleware for each route
// proxies.forEach(({ path, target }) => {
//   app.use(path, createProxyMiddleware({ ...proxyOptions, target }));
// });

// Create HTTPS server using the default certificate on port 443
const httpsServer = https.createServer(app);
// const httpsServer = http.createServer(app);

// Listen on port 443 for HTTPS traffic
const PORT = process.env.PORT || 443;
httpsServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
