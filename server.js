// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const authRoutes = require("./routes/authRoutes");
// const workoutRoutes = require("./routes/workoutRoutes");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use("/uploads", express.static("uploads"));

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/workout", workoutRoutes);

// // MongoDB Connection
// mongoose
//   // .connect(process.env.MONGO_URI)
//   .connect("mongodb+srv://vishalchoudhary98760_db_user:vishal676570@cluster0.hfbm3lw.mongodb.net/?appName=Cluster0")
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => console.log("❌ MongoDB Error:", err));

// // Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


const express = require("express");
const mongoose = require("mongoose");

const app = express();

require("dotenv").config();

const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const testRoutes = require("./routes/testRoutes");

/* Test Routes for cloudinary */
app.use("/api/test", testRoutes);

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* =======================
   Routes
======================= */
app.use("/api/auth", authRoutes);
app.use("/api/workout", workoutRoutes);

/* =======================
   MongoDB Connection Cache
======================= */
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log("🟢 MongoDB already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
};

connectDB();

/* =======================
   EXPORT APP (IMPORTANT)
======================= */
module.exports = app;