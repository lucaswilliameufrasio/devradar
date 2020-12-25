require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");

const routes = require("./routes");
const { setupWebsocket } = require("./websocket");
const env = require("./config/env");

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect(env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.use(cors());
app.use(express.json());

app.use(routes);

server.listen(7777);
