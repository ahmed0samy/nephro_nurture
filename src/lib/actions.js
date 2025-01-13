"use server";
import User from "./models";
import {
  calcAgeDependentFactors,
  calcWeightDependentFactors,
  getTime,
} from "./scientificCalculations";
import { connectToDb } from "./utils";

export async function getUserData({ userID }) {
  await connectToDb();

  try {
    const user = await User.findOne({ userID });
    console.log("user data got successfully");
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
    console.log(data);
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
      flowRate: data.flowRate,
    };
  }

  const data = modifyData(Object.fromEntries(formData));
  await connectToDb();

  const user = await User.exists({ userID: data.userID });
  if (user) {
    console.log("user will be updated.");
    return await updateUserData(data);
  } else {
    console.log("user will be saved.");
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
  flowRate,
}) {
  await connectToDb();
  const getTimingData = getTime({
    lastCalculatedCycle: Date.now(),
    solutionVolume: solutionVolume,
    solutionTime: solTime,
    flowRate,
  });
  const user = new User({
    userID,
    name,
    age,
    gender,
    // workTime,
    solTime,
    exchangesTime: getTimingData.allDayCycles,
    solutionVolume,
    weight,
    nuExchanges: getTimingData.allDayCyclesCount,
    lastCalculatedCycle: getTimingData.lastCalculatedCycle,
    flowRate,
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
  solutionVolume,
  weight,
  flowRate,
}) {
  console.log("update function is called");
  // await connectToDb();
  const userJSON = await getUserData({ userID });
  const user = JSON.parse(userJSON);
  console.log("user data exists", user);

  const getTimingData = getTime({
    solutionVolume: solutionVolume || user.solutionVolume,
    lastCalculatedCycle: user.lastCalculatedCycle || Date.now(),
    solutionTime: solTime || user.solTime,
    flowRate: flowRate || user.flowRate,
  });

  console.log(getTimingData);

  const data = {
    userID,
    name: name || user.name,
    age: age || user.age,
    weight: weight || user.weight,
    gender: gender || user.gender,
    // worktime: workTime || user.worktime,
    nuExchanges: getTimingData.allDayCyclesCount,
    solTime: solTime || user.solTime,
    exchangesTime: getTimingData.allDayCycles,
    lastCalculatedCycle: getTimingData.lastCalculatedCycle,
    solutionVolume: solutionVolume || user.solutionVolume,
    flowRate: flowRate || user.flowRate,
  };
  await User.findOneAndUpdate({ userID }, data);
  console.log("User Updated Successfully!!");
}


