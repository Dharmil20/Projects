const { z } = require("zod");
const jwt = require("jsonwebtoken");

const tradeValidation = (req, res, next) => {
  // Step 1: Validate JWT token
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token and set the userId in the request object
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Ensure userId is set
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }

  // Step 2: Validate the request body using Zod
  const tradeBody = z.object({
    stock_symbol: z.string().min(1, "Stock symbol is required"),
    quantity: z
      .number()
      .positive("Quantity must be a positive number")
      .int("Quantity must be an integer"),
    price: z
      .number()
      .positive("Price must be a positive number")
      .min(0.01, "Price must be at least 0.01"),
  });

  const parsedDataWithSuccess = tradeBody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    return res.status(400).json({
      message: "Incorrect format",
      error: parsedDataWithSuccess.error.errors, // Send only the error messages
    });
  }

  // If both validations pass, proceed to the next middleware or route handler
  next();
};

module.exports = tradeValidation;