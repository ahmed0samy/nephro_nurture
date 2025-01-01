"use server";
import User from "./models";
import {
  calcAgeDependentFactors,
  calcWeightDependentFactors,
} from "./scientificCalculations";
import { connectToDb } from "./utils";

export async function getUserData({ userID }) {
  await connectToDb();
  try {
    const user = await User.findOne({ userID });
    return JSON.stringify(user);
  } catch (error) {
    console.error("######################## Error getting user data:", error);
  }
}
export async function handleUserFormData(previousState, formData) {
  function modifyData(data) {
    const solutionVolume = calcWeightDependentFactors(
      parseInt(data.weight)
    ).solutionVolume;
    const solTime = calcAgeDependentFactors(parseInt(data.age)).solTime;
    console.log(data)
    return {
      userID: data.userID,
      name: data.name,
      age: parseInt(data.age),
      weight: parseInt(data.weight),
      gender: parseInt(data.gender),
      // workTime: data.workTime,
      solTime: solTime,
      // nuExchanges: parseInt(data.nuExchanges),
      // exchangesTime: data.exchangesTime,
      solutionVolume: solutionVolume,
    };
  }

  const data = modifyData(Object.fromEntries(formData));
  console.log();
  await connectToDb();

  const user = await User.exists({ userID: data.userID });
  if (user) {
    console.log("user will be Updated.");
    return await updateUserData(data);
  } else {
    return await saveNewUserData(data);
  }
}

export async function saveNewUserData({
  userID,
  name,
  age,
  gender,
  // workTime,
  solTime,
  // exchangesTime,
  solutionVolume,
  weight,
  // nuExchanges,
}) {
  await connectToDb();
  const user = new User({
    userID,
    name,
    age,
    gender,
    // workTime,
    solTime,
    // exchangesTime,
    solutionVolume,
    weight,
    // nuExchanges,
  });
  console.log(user);
  try {
    await user.save();
  } catch (error) {
    console.error(
      "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ Error saving user data:",
      error
    );
  }
  console.log("User Added Successfully!!");
}

export async function updateUserData({
  userID,
  name,
  age,
  gender,
  // workTime,
  solTime,
  // exchangesTime,
  solutionVolume,
  weight,
  // nuExchanges,
}) {
  await connectToDb();
  const user = await User.findOne({ userID });
  return {
    userID,
    name: name || user.name,
    age: age || user.age,
    weight: weight || user.weight,
    gender: gender || user.gender,
    // worktime: workTime || user.worktime,
    // nuExchanges: nuExchanges || user.nuExchanges,
    solTime: solTime || user.solTime,
    // exchangesTime: exchangesTime || user.excha ngesTime,
    solutionVolume: solutionVolume || user.solutionVolume,
  };
}
