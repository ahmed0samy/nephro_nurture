import { Post } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  // const { slug } = params;
  console.log(params);
  console.log(request);
};
