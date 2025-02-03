// controllers/portfolioController.js
const { Portfolio } = require("../models/portfolio");
const Transaction = require("../models/transaction");

const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.find({ user_id: req.userId });
    res.json(portfolio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch portfolio", success: false });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user_id: req.userId }).sort({ timestamp: -1 });
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch transactions", success: false });
  }
};

module.exports = { getPortfolio, getTransactions };






// const { UserModel } = require("../models/user");
// const { Portfolio } = require("../models/portfolio");
// const Transaction = require("../models/transaction");

// const getPortfolio = async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.userId);
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//         success: false,
//       });
//     }

//     const portfolio = await Portfolio.find({ user_id: user._id });
//     if (!portfolio || portfolio.length === 0) {
//       return res.status(404).json({
//         message: "No portfolio found for this user",
//         success: false,
//       });
//     }

//     res.json({
//       message: "Portfolio fetched successfully",
//       data: portfolio,
//       success: true,
//     });
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({
//       message: "Server error, please try again later",
//       success: false,
//     });
//   }
// };

// const getTransactions = async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.userId);
//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//         success: false,
//       });
//     }

//     const transactions = await Transaction.find({ user_id: user._id }).sort({
//       timestamp: -1,
//     });
//     if (!transactions || transactions.length === 0) {
//       return res.status(404).json({
//         message: "No transactions found for this user",
//         success: false,
//       });
//     }

//     res.json({
//       message: "Transactions fetched successfully",
//       data: transactions,
//       success: true,
//     });
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({
//       message: "Server error, please try again later",
//       success: false,
//     });
//   }
// };

// module.exports = { getPortfolio, getTransactions };
