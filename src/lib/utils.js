const mongoose = require("mongoose");

const uri =
  "mongodb+srv://ahmed:ahmed@cluster0.qrye7.mongodb.net/Nephro_Nurture?retryWrites=true&w=majority";
export async function connectToDb() {
  await mongoose
    .connect(uri)
    .then(() => console.log("MongoDB connection successful!"))
    .catch((err) => console.error("MongoDB connection error:", err));
  return 'done'
}
