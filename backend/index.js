import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";

dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log(`mongodb connected`);
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/api/auth", authRoutes);
/**
 * global error handling
 */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const msg = err.message || "Internal server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    msg,
  });
});

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "hello world" });
// });

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
