const { UserModel } = require("../models/user");
const { Portfolio } = require("../models/portfolio");
const Transaction = require("../models/transaction");

const buyStock = async (req, res) => {
    try {
      const { stock_symbol, quantity, price } = req.body;
  
      // Validate request body
      if (!stock_symbol || !quantity || !price) {
        return res.status(400).json({
          message: 'Missing required fields: stock_symbol, quantity, price',
          success: false,
        });
      }
  
      const user = await UserModel.findById(req.userId);
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
          success: false,
        });
      }
  
      const totalCost = quantity * price;
      if (user.balance < totalCost) {
        return res.status(400).json({
          message: 'Insufficient funds',
          success: false,
        });
      }
  
      user.balance -= totalCost;
      await user.save();
  
      let portfolio = await Portfolio.findOne({ user_id: user._id, stock_symbol });
      if (portfolio) {
        portfolio.average_price = (portfolio.average_price * portfolio.quantity + totalCost) / (portfolio.quantity + quantity);
        portfolio.quantity += quantity;
      } else {
        portfolio = new Portfolio({
          user_id: user._id,
          stock_symbol,
          quantity,
          average_price: price,
        });
      }
      await portfolio.save();
  
      await new Transaction({
        user_id: user._id,
        stock_symbol,
        quantity,
        price,
        type: 'buy',
      }).save();
  
      res.json({
        message: 'Stock purchased successfully',
        balance: user.balance,
        success: true,
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: 'Server error, please try again later',
        success: false,
      });
    }
  };
  
const sellStock = async (req, res) => {
  try {
    const { stock_symbol, quantity, price } = req.body;
    const user = await UserModel.findById(req.userId);

    const portfolio = await Portfolio.findOne({
      user_id: user._id,
      stock_symbol,
    });
    if (!portfolio || portfolio.quantity < quantity) {
      return res.status(400).json({
        message: "Not enough shares to sell",
        success: false,
      });
    }

    portfolio.quantity -= quantity;
    if (portfolio.quantity === 0) {
      await portfolio.remove();
    } else {
      await portfolio.save();
    }

    user.balance += quantity * price;
    await user.save();

    await new Transaction({
      user_id: user._id,
      stock_symbol,
      quantity,
      price,
      type: "sell",
    }).save();

    res.json({
      message: "Stock sold successfully",
      balance: user.balance,
      success: true,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Server error, please try again later",
      success: false,
    });
  }
};

module.exports = { buyStock, sellStock };
