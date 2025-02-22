require("dotenv").config({ path: ".env" }); // ⬅️ Ispravan put do .env

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // ⬅️ Dodano uvoz CORS paketa
const userRoutes = require("./routes/userRoutes");

const app = express();

// ⬅️ Omogućava CORS za sve izvore, možeš ograničiti na specifične domene
app.use(
  cors({
    origin: "http://localhost:5173", // Dodaj tvoju frontend domenu ovde, npr. React aplikaciju
    methods: ["GET", "POST", "PUT", "DELETE"], // Dopuštanje HTTP metoda
    allowedHeaders: ["Content-Type", "Authorization"], // Dopuštanje specifičnih zaglavlja
  })
);

app.use(express.json()); // ⬅️ Omogućava parsiranje JSON zahtjeva

// 📌 Provjera da li je MONGO_URI definisan
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI nije definisan u .env datoteci!");
  process.exit(1); // ⬅️ Zaustavi aplikaciju ako nema konekcije
}

// 🔗 Konekcija s MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    serverSelectionTimeoutMS: 30000, // ⬅️ Povećan timeout na 30 sekundi
  })
  .then(() => console.log("✅ Povezano s MongoDB"))
  .catch((err) => {
    console.error("❌ Greška pri povezivanju s MongoDB:", err);
    process.exit(1); // ⬅️ Zaustavi aplikaciju ako konekcija ne uspije
  });

// 📌 Povezivanje ruta
app.use("/api/users", userRoutes);

// ✅ Test ruta
app.get("/", (req, res) => {
  res.send("🚀 Eko aplikacija API radi!");
});

// 🌍 Pokretanje servera
const PORT = process.env.PORT || 5555;
app.listen(PORT, () => console.log(`🚀 Server pokrenut na portu ${PORT}`));
