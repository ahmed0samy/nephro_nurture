import { getUserData, updateUserData } from "@/lib/actions";
import { getNearCycles, getPumping, getSucktion, mainPumping, mainSucktion } from "@/lib/scientificCalculations";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDb();
  } catch (err) {
    console.log(
      "error while connecting with database, error from day_infor/route.jsx",
      err
    );
  }
  try {
    await updateUserData({ userID: "123" });
  } catch (err) {
    console.log(
      "error while updating data, error from day_infor/route.jsx",
      err
    );
  }
  try {
    const response = await getUserData({ userID: "123" });
    if (response){
      const now = Date.now()
      const responseData = JSON.parse(response);
      const sucktionTime = responseData.solutionVolume / responseData.flowRate; // 0.2 hours
      const cycleTime = responseData.solutionVolume / responseData.flowRate + +responseData.solTime;
        let exchanges = responseData.exchangesTime;
        let nearCycles = getNearCycles({ exchanges, cycleTime, sucktionTime, timeNow: now });
        let nextCycle = nearCycles.nextCycleStart;
        let currentCycle = nearCycles.currentCycleStart;
        const remainingTillSucktion = nearCycles.remainingTillnextSucktion
        const data = {
        exchanges: responseData.exchanges,
        nextCycle,
        currentCycle,
        remainingTillSucktion,
        now,
        isPumping: getPumping(),
        isSucking: getSucktion(),
      }

      return NextResponse.json(data);
    } else {
      console.log('error while getting data, at day_info/route.jsx')
      return NextResponse.error('something went wrong!');
    }
  } catch (err) {
    // console.log(err);
    throw new Error(`Failed to fetch, at day_info/route.jsx ! ${err}`);
  }
};