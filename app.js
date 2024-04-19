const { default: axios } = require("axios");
const express = require("express");

const morgan = require("morgan");

const app = express();
const PORT = 3000;
const API_ORDER_CREATE = "http://54.90.253.254:3003/api/v1/orders";

app.use(morgan("dev"));
app.use(express.json());

app.post("/api/v1/orders", async (req, res) => {
  try {
    const response = await axios.post(API_ORDER_CREATE, req.body);
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
