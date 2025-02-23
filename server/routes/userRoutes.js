const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// 📌 Registracija korisnika
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Provjera da li korisnik već postoji
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Korisničko ime već postoji" });
    }

    // Kreiranje novog korisnika
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: "Korisnik registrovan!", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Prijava korisnika
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Neispravno korisničko ime ili lozinka" });
    }

    // Provjera lozinke
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Neispravno korisničko ime ili lozinka" });
    }

    res.json({ message: "Prijava uspješna!", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Dohvati korisnika po ID-ju
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("friends");
    if (!user) {
      return res.status(404).json({ message: "Korisnik nije pronađen" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/username/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).populate(
      "friends"
    );

    if (!user) {
      return res.status(404).json({ message: "Korisnik nije pronađen" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Dodaj prijatelja
router.post("/:id/addFriend", async (req, res) => {
  try {
    const { friendId } = req.body;
    const user = await User.findById(req.params.id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "Korisnik nije pronađen" });
    }

    if (user.friends.includes(friendId)) {
      return res.status(400).json({ message: "Već ste prijatelji" });
    }

    user.friends.push(friendId);
    await user.save();

    res.json({ message: "Prijatelj dodat", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put("/:id/dailyActivity", async (req, res) => {
  try {
    const state = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "Korisnik nije pronađen" });
    }

    // Ažuriramo aktivnosti i experience
    user.dailyActivity = {
      ...user.dailyActivity,
      ...state,
    };

    if (state.experience !== undefined) {
      user.experience = state.experience;
    }

    const co2Factors = {
      walking: -0.1,
      running: -0.15,
      biking: -0.1,
      transport: -0.05,
    };

    // Izračunaj total CO2 na temelju svih aktivnosti
    let totalCO2 = 6.9; // Početna vrijednost
    for (const [activity, minutes] of Object.entries(user.dailyActivity)) {
      if (co2Factors[activity] && typeof minutes === "number") {
        totalCO2 += minutes * co2Factors[activity];
      }
    }

    // Ažuriramo ukupni CO2 na oba mjesta
    user.totalCO2 = totalCO2;
    user.dailyActivity.totalCO2 = totalCO2;

    await user.save();

    res.json({
      message: "Aktivnost uspješno ažurirana",
      user: user,
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: err.message });
  }
});
// 📌 Ažuriraj korisničke podatke (experience, streak, points)
router.patch("/:id/updateStats", async (req, res) => {
  const { experience, streak, points } = req.body; // The fields to be updated

  try {
    // Find the user by ID
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Korisnik nije pronađen" });
    }

    // Update the fields if provided
    if (experience !== undefined) {
      user.experience += experience; // Increase the experience
    }
    if (streak !== undefined) {
      user.streak += streak; // Increase the streak
    }
    if (points !== undefined) {
      user.points += points; // Increase the points
    }

    // Save the updated user data
    await user.save();

    res.json({
      message: "Korisnički podaci ažurirani",
      user: {
        points: user.points,
        experience: user.experience,
        streak: user.streak,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
