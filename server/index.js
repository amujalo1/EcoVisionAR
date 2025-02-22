require("dotenv").config({ path: ".env" });

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const app = express();

// In your server.js/index.js
const cors = require("cors");

// Add this before your routes
app.use(
  cors({
    //origin: "http://localhost:5173", // Postavi frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Dozvoljene metode
    allowedHeaders: ["Content-Type", "Authorization"], // Dozvoljena zaglavlja
    credentials: true, // Omogućava slanje cookies/tokena
  })
);

app.use(express.json()); // Omogućava parsiranje JSON zahtjeva

// Omogućavanje preflight zahtjeva za sve rute
app.options("*", cors());

// Provjera da li je MONGO_URI definisan
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI nije definisan u .env datoteci!");
  process.exit(1);
}

// Konekcija s MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Timeout povećan na 30 sekundi
  })
  .then(() => console.log("✅ Povezano s MongoDB"))
  .catch((err) => {
    console.error("❌ Greška pri povezivanju s MongoDB:", err);
    process.exit(1);
  });

// Povezivanje ruta
app.use("/api/users", userRoutes);

// Test ruta
app.get("/", (req, res) => {
  res.send("🚀 Eko aplikacija API radi!");
});

// Pokretanje servera
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server pokrenut na portu ${PORT}`));
