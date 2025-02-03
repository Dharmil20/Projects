const express = require("express");
const { buyStock, sellStock } = require("../controllers/tradeController");
const tradeValidation = require("../middlewares/tradeValidation"); // Use the new validation
const tradeRouter = express.Router();

tradeRouter.post("/buy", tradeValidation, buyStock); // Apply trade validation
tradeRouter.post("/sell", tradeValidation, sellStock); // Apply trade validation

module.exports = tradeRouter;
