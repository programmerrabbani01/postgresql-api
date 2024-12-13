import express from "express";
import colors from "colors";
import dotenv from "dotenv";

// dotenv configuration
dotenv.config();

// environment variables

const PORT = process.env.PORT || 4040;

// initialize express

const app = express();

// middleware to parse JSON requests

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes

// app listeners
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgWhite.red.bold);
});
