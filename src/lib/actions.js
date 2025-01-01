import { User } from "./models";
import { connectToDb } from "./utils";

export function calcNuExchanges() {
  return 0;
}
export async function getUserData({userID}) {
  connectToDb();
  const user = await User.findOne({ userID });
  try {
    user.findOne({ userID });
  }catch (error) {
    console.error("######################## Error getting user data:", error);
  }
}
export async function saveNewUserData({
  userID,
  name,
  age,
  gender,
  workTime,
  solTime,
  exchangesTiming,
  solutionVolume,
  weight,
  nuExchanges,
}) {
  connectToDb();
  const user = new User({
    userID,
    name,
    age,
    gender,
    workTime,
    solTime,
    exchangesTiming,
    solutionVolume,
    weight,
    nuExchanges,
  });
  try {
    await user.save();
  } catch (error) {
    console.error("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ Error saving user data:", error);
  }
}

export async function updateUserData({
  userID,
  name,
  age,
  gender,
  workTime,
  solTime,
  exchangesTiming,
  solutionVolume,
  weight,
  nuExchanges,
}) {
  connectToDb();
  const user = await User.findOne({ userID });
  return {
    userID,
    name: name || user.name,
    age: age || user.age,
    weight: weight || user.weight,
    gender: gender || user.gender,
    worktime: workTime || user.worktime,
    nuExchanges: nuExchanges || user.nuExchanges,
    solTime: solTime || user.solTime,
    exchangesTiming: exchangesTiming || user.exchangesTiming,
    solutionVolume: solutionVolume || user.solutionVolume,
  };
}
