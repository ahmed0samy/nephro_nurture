// 'use server';
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    userID: String,
    name: String,
    age: Number,
    weight: Number,
    gender: Number,
    // worktime: String,
    nuExchanges: Number,
    solTime: String,
    exchangesTime: [Number],
    solutionVolume: Number, // in ml
    lastCalculatedCycle: Number,
    flowRate: Number, // in ml/hour
  },
  { timestamps: true }
);
const User = mongoose.models?.Users || mongoose.model("Users", userSchema);

export default User;
