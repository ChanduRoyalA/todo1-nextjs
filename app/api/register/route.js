import ConnectDB from "@/libs/db";
import User from "@/model/User";
import { Db } from "mongodb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    await ConnectDB();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    const CreateUser = await newUser.save();
    return NextResponse.json({ CreateUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
