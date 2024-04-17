const express = require("express");
const http = require("http");
const https = require("https");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Define proxy routes for /api/orders and /api/v1/orders
app.use(
  "/api/orders",
  createProxyMiddleware({
    target: "http://54.90.253.254:8888",
    changeOrigin: true,
    pathRewrite: {
      "^/api/orders": "/api/orders",
    },
  })
);

app.use(
  "/api/v1/orders",
  createProxyMiddleware({
    target: "http://54.90.253.254:3003",
    changeOrigin: true,
    pathRewrite: {
      "^/api/v1/orders": "/api/v1/orders",
    },
  })
);

// Define proxy route for /api/v1/statistics
app.use(
  "/api/v1/statistics",
  createProxyMiddleware({
    target: "http://54.90.253.254:3003",
    changeOrigin: true,
    pathRewrite: {
      "^/api/v1/statistics": "/api/v1/statistics",
    },
  })
);

// Create an HTTP server
const httpServer = https.createServer(app);

// Start the HTTP server
const httpPort = 443;
httpServer.listen(httpPort, () => {
  console.log(`HTTP Server is listening on port ${httpPort}`);
});

// If you want HTTPS as well
const privateKey = ""; // Add your private key file path
const certificate = ""; // Add your certificate file path

if (privateKey && certificate) {
  const credentials = { key: privateKey, cert: certificate };
  const httpsServer = https.createServer(credentials, app);

  // Start the HTTPS server
  const httpsPort = 443;
  httpsServer.listen(httpsPort, () => {
    console.log(`HTTPS Server is listening on port ${httpsPort}`);
  });
}
