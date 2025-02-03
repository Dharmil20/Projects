// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { NseIndia } = require("stock-nse-india");
const mongoose = require("mongoose");
const authRouter = require("./routes/authRouter");
const tradeRouter = require("./routes/tradeRouter");
const portfolioRouter = require("./routes/portfolioRouter"); // Import the portfolio router

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

const nseIndia = new NseIndia();

/**
 * GET /api/stocks - Fetch all stock symbols
 */
app.get("/api/stocks", async (req, res) => {
  try {
    const symbols = await nseIndia.getAllStockSymbols();
    res.json(symbols);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stock symbols" });
  }
});

/**
 * GET /api/stocks/:symbol - Fetch stock details
 */
app.get("/api/stocks/:symbol", async (req, res) => {
  try {
    const stockDetails = await nseIndia.getEquityDetails(req.params.symbol);
    res.json(stockDetails);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stock details" });
  }
});

// Use the authentication, trading, and portfolio routes
app.use("/api/auth", authRouter);
app.use("/api/trade", tradeRouter);
app.use("/api/info", portfolioRouter); // Use the portfolio router

async function main() {
  mongoose
    .connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
  app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

main();