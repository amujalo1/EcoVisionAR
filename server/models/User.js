const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const QuestSchema = new mongoose.Schema({
  activity: { type: String, required: true }, // e.g. "walking", "running"
  minutesRequired: { type: Number, required: true }, // e.g. 30 min
  progress: { type: Number, default: 0 }, // Current progress in minutes
  completed: { type: Boolean, default: false },
  points: { type: Number, required: true }, // Points awarded by the quest
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

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  experience: {
    type: Number,
    default: 0,
  },
  totalCO2: {
    type: Number,
    default: 6.9,
  },
  dailyActivity: {
    walking: { type: Number, default: 0 },
    running: { type: Number, default: 0 },
    biking: { type: Number, default: 0 },
    transport: { type: Number, default: 0 },
    totalCO2: { type: Number, default: 6.9 },
  },
  dailyQuests: [QuestSchema],
  streak: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

// Hashing password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to check password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema); // Use userSchema here
