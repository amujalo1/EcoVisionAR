const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const QuestSchema = new mongoose.Schema({
  activity: { type: String, required: true }, // npr. "walking", "running"
  minutesRequired: { type: Number, required: true }, // npr. 30 min
  progress: { type: Number, default: 0 }, // Trenutni napredak u minutama
  completed: { type: Boolean, default: false },
  points: { type: Number, required: true }, // Koliko bodova daje quest
});
const dailyActivitySchema = new mongoose.Schema({
  walking: {
    type: Number,
    default: 0,
    set: (v) => Math.round(v * 100) / 100,
  },
  running: {
    type: Number,
    default: 0,
    set: (v) => Math.round(v * 100) / 100,
  },
  biking: {
    type: Number,
    default: 0,
    set: (v) => Math.round(v * 100) / 100,
  },
  transport: {
    type: Number,
    default: 0,
    set: (v) => Math.round(v * 100) / 100,
  },
  totalCO2: {
    type: Number,
    default: 6.9,
    set: (v) => Math.round(v * 100) / 100,
  },
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Biće hashiran
  points: { type: Number, default: 0 },
  experience: { type: Number, default: 0 },
  level: { type: Number, default: 1 },

  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Lista prijatelja (reference)

  dailyActivity: dailyActivitySchema,

  quests: [QuestSchema], // Lista questova
});

// Hashiranje lozinke prije spremanja korisnika
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Metoda za provjeru lozinke
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
