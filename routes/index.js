const express = require("express");

const transactionsRouter = require("./transactions.router");

function routerAPI(app) {
  const router = express.Router();
  app.use("/api/v1", router);

  router.use("/transactions", transactionsRouter);
}

module.exports = routerAPI;
