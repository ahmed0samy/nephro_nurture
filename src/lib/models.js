import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    age: Number,
    weight: Number,
    gender: Boolean,
    worktime: String,
    nuExchanges: Number,
    solTime: String,
    exchangesTiming: String,
    solutionVolume: Number, // in ml
  },
  { timestamps: true }
);

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
