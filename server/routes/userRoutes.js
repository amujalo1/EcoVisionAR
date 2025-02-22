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

// 📌 Ažuriraj dnevne aktivnosti i izračunaj totalCO2
router.put("/:id/dailyActivity", async (req, res) => {
  try {
    const state = req.body;
    const user = await User.findById(req.params.id);

    console.log(state);
    if (!user) {
      return res.status(404).json({ message: "Korisnik nije pronađen" });
    }
    // Provjera je li aktivnost validna
    // const validActivities = ["walking", "running", "biking", "transport"];
    // if (!state.dailyActivity.includes(activity)) {
    //   return res.status(400).json({ message: "Neispravna aktivnost" });
    // }

    // Provjera je li broj minuta validan
    // if (typeof minutes !== "number" || minutes <= 0) {
    //   return res.status(400).json({ message: "Neispravan broj minuta" });
    // }

    // Ažuriraj aktivnost
    user.dailyActivity = { ...state };

    // Definiraj faktor CO2 za svaku aktivnost (kg CO2 po minuti)
    const co2Factors = {
      walking: -0.1, // Negativni faktor jer smanjuje CO2
      running: -0.15,
      biking: -0.1, // Negativni faktor jer smanjuje CO2
      transport: -0.05,
    };

    // Početni totalCO2 je 0
    let totalCO2 = 6.9;

    // Izračunaj ukupnu emisiju CO2 na temelju svih aktivnosti
    for (const [act, minutes] of Object.entries(user.dailyActivity)) {
      if (co2Factors[act]) {
        totalCO2 += minutes * co2Factors[act]; // Računanje emisije za svaku aktivnost
      }
    }

    // Ažuriraj totalCO2 u korisničkom objektu
    user.totalCO2 = totalCO2;
    user.dailyActivity.totalCO2 = totalCO2; // Ažuriraj i unutar dailyActivity

    // Spremi promjene
    await user.save();

    res.json({
      message: "Aktivnost ažurirana i totalCO2 ažuriran",
      dailyActivity: user.dailyActivity,
      totalCO2: user.totalCO2,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
