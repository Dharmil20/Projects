// const express = require("express");
// const {getPortfolio, getTransactions} = require("../controllers/portfolioController")
// const portfolioRouter = express.Router();

// portfolioRouter.get("/portfolio", getPortfolio);
// portfolioRouter.get("/transactions", getTransactions);

// module.exports = portfolioRouter;

// routes/portfolioRouter.js
const express = require("express");
const { getPortfolio, getTransactions } = require("../controllers/portfolioController");
const authenticate = require("../middlewares/authenticate"); // Ensure you have this middleware for authentication
const portfolioRouter = express.Router();

portfolioRouter.get("/portfolio", authenticate, getPortfolio);
portfolioRouter.get("/transactions", authenticate, getTransactions);

module.exports = portfolioRouter;
