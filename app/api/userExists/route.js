import ConnectDB from "@/libs/db";
import User from "@/model/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email } = await req.json();
  await ConnectDB();
  const userDetails = (await User.find({ email }))[0];
  if (userDetails === undefined) {
    return NextResponse.json({ result: "New User" }, { status: 200 });
  }
  return NextResponse.json({ userDetails }, { status: 201 });
}
