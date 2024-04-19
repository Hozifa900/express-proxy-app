const { default: axios } = require("axios");
const express = require("express");

const morgan = require("morgan");

const app = express();
const PORT = 3000;
const API_ORDER = "http://54.90.253.254:3003/api/v1";
const API_PAYMENT = "http://54.90.253.254:8888/api/orders";

app.use(morgan("dev"));
app.use(express.json());

app.post("/api/v1/orders", async (req, res) => {
  try {
    const response = await axios.post(`${API_ORDER}/orders`, req.body);
    data = await response.data;
    res.json(data);
  } catch (e) {
    console.log(e);
    res.json(e);
  }
});

app.post("/api/v1/statistics", async (req, res) => {
  try {
    const response = await axios.post(`${API_ORDER}/statistics`, req.body);
    data = await response.data;
    res.json(data);
  } catch (e) {
    console.log(e);
    res.json(e);
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    const response = await axios.post(`${API_PAYMENT}`, req.body);
    data = await response.data;
    res.json(data);
  } catch (e) {
    console.log(e);
    res.json(e);
  }
});

app.post("/api/orders/:orderID/capture", async (req, res) => {
  try {
    const orderID = req.params.orderID;
    const response = await axios.post(
      `${API_PAYMENT}/${orderID}/capture`,
      req.body
    );
    data = await response.data;
    res.json(data);
  } catch (e) {
    console.log(e);
    res.json(e);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
