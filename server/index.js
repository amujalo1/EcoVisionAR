require("dotenv").config({ path: ".env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "*",
    // methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json());

// MongoDB connection
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI nije definisan u .env datoteci!");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
  })
  .then(() => console.log("✅ Povezano s MongoDB"))
  .catch((err) => {
    console.error("❌ Greška pri povezivanju s MongoDB:", err);
    process.exit(1);
  });

// Routes
app.use("/api/users", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("🚀 Eko aplikacija API radi!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server pokrenut na portu ${PORT}`));
