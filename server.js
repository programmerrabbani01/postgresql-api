import express from "express";
import colors from "colors";
import dotenv from "dotenv";
// import pool from "./config/db.js";
import studentRouter from "./routes/studentRoute.js";

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

app.use("/api/v1/students", studentRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// connect postgresql server

// pool.connect((err, client, release) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   client.query("SELECT NOW()", (err, result) => {
//     release();
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log("Connected to PostgreSQL database".bgGreen.bold);
//   });
// });

// app listeners
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.bgWhite.red.bold);
});
