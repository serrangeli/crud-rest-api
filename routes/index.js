const express = require("express");
const itemRouter = require("./item.routes");

const rootRouter = express.Router();
rootRouter.use("/items", itemRouter);

module.exports = rootRouter;
