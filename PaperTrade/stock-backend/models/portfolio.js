const mongoose = require("mongoose")

const PortfolioSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  stock_symbol: String,
  quantity: Number,
  average_price: Number,
});

const Portfolio = mongoose.model("Portfolio", PortfolioSchema);

module.exports = { Portfolio };
