import { getUserData } from "@/lib/actions";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async () => {

  try {
    await connectToDb();
    const response = await getUserData({userID: '123'});
    const data = JSON.parse(response);
    return NextResponse.json({solutionTime: data.solTime});
  } catch (err) {
    // console.log(err);
    throw new Error("Failed to fetch post!");
  }
};
