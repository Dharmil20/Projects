const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user_id: mongoose.Schema.Types.ObjectId,
  stock_symbol: String,
  quantity: Number,
  price: Number,
  type: String,
});

module.exports = mongoose.model('Transaction', TransactionSchema);
