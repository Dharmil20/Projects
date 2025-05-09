const express = require("express");
const { buyStock, sellStock } = require("../controllers/tradeController");
const tradeValidation = require("../middlewares/tradeValidation");
const tradeRouter = express.Router();

tradeRouter.post("/buy", tradeValidation, buyStock);
tradeRouter.post("/sell", tradeValidation, sellStock);

module.exports = tradeRouter;
