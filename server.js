const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const workoutRoutes = require("./routes/workoutRoutes");

const app = express();

const corsOptions = {
  origin: [process.env.ORIGIN,process.env.CORSURL],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};

/**
 * Middlewares
 */
app.use(cors(corsOptions)); // Middleware to enable CORS
app.use(express.json());
app.use("/uploads", express.static("uploads"));



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/workout", workoutRoutes);

console.log("MONGO_URI:", process.env.MONGO_URI);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
