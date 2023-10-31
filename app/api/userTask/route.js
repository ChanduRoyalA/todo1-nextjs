import ConnectDB from "@/libs/db";
import TodoList from "@/model/TodoList";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { userId, TaskName, TaskDescription, TaskDeadLine, type } =
      await req.json();
    await ConnectDB();
    if (type === "create") {
      const createTask = await TodoList({
        userId: userId,
        TaskName: TaskName,
        TaskDescription: TaskDescription,
        TaskDeadLine: TaskDeadLine,
      });
      const newTask = await createTask.save();
      if (newTask) {
        return NextResponse.json({ result: "Task Created" }, { status: 200 });
      } else {
        return NextResponse.json(
          { result: "Task Not Created" },
          { status: 401 }
        );
      }
    } else if (type === "get") {
      const getTasks = await TodoList.find({ userId });
      if (getTasks) {
        return NextResponse.json(getTasks, { status: 200 });
      } else {
        return NextResponse.json(
          { result: "No Tasks Available" },
          { status: 201 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
}

export async function PUT(req) {
  try {
    const { id, TaskName, TaskDescription, TaskDeadLine } = await req.json();
    await ConnectDB();
    const details = await TodoList.find({ _id: id });
    if (details) {
      const res = await TodoList.updateOne(
        { _id: id },
        { $set: { TaskName, TaskDeadLine, TaskDescription } }
      );
      if (res) {
        return NextResponse.json({ res, update: "Updated" });
      }
    } else {
      return NextResponse.json({ update: "Failed" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function DELETE(req) {
  try {
    const { id} = await req.json();
    await ConnectDB();
    const status = await TodoList.findOneAndDelete({ _id: id });
      return NextResponse.json({status:"Deleted"}, { status: 200 });

  } catch (error) {
    return NextResponse.json(error);
  }
}
