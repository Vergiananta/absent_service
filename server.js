const express = require("express");
const cors = require("cors");
const http = require("http");
const router = require("./src/routes");
// const subscriber = require("./src/worker");
const app = express();
const appMiddleware = require("./src/middleware/app-middleware");

app.use(cors());
app.use(appMiddleware);
app.use(router);
const server = http.createServer(app);
server.on("error", function (e) {
  // logEvent.emit("APP-ERROR", {
  //   logTitle: "APP FAILED",
  //   logMessage: e,
  // });
});

module.exports = server;
