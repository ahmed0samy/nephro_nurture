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
    // nuExchanges: Number,
    solTime: String,
    // exchangesTime: String,
    solutionVolume: Number, // in ml
  },
  { timestamps: true }
);
const User = mongoose.models?.Users || mongoose.model("Users", userSchema);

export default User;
