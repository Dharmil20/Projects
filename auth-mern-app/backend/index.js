const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

// Importing routes
const { authRouter } = require("./routes/authRouter")

app.use(express.json());
app.use(cors());

// Using Routes
app.use("/api/v1/auth", authRouter);

async function main(){
    mongoose.connect(process.env.MONGO)
    app.listen(process.env.PORT)
}


main();