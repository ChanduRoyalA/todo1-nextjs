"use client";

import { useState, useEffect } from "react";
import TodoList from "./TodoList";



const UserInfo = ({ details }) => {
  const [isTask, setisTask] = useState(false)
  const [Taskname, setTaskname] = useState("")
  const [TaskDesc, setTaskDesc] = useState("")
  const [error, seterror] = useState("")
  const [TaskDeadLine, setTaskDeadLine] = useState("")
  const [AllTasks, setAllTasks] = useState([]);
  const handleCreateTask = async () => {
    if (!TaskDeadLine || !TaskDesc || !Taskname) {
      seterror("Required All Details to Create Task")
      return;
    }
    const res = await fetch("/api/userTask", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        userId: details._id,
        TaskName: Taskname,
        TaskDescription: TaskDesc,
        TaskDeadLine: TaskDeadLine,
        type: "create"
      })
    })
    if (res.status === 200) {
      console.log("Created")
      setTaskDeadLine("")
      setTaskDesc("")
      setTaskname("")
      setisTask(false)
      getTasks()
    }
    else {
      console.log("Not Created")
    }

  }
  const getTasks = async () => {
    const res = await fetch("/api/userTask", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        userId: details._id,
        type: "get"
      })
    })
    const data = await res.json()

    if (res.status === 200) {
      setAllTasks(data)
    }

  }
  return (
    <div className="grid grid-flow-col grid-row-3 place-items-center h-3/4">
      <div className="grid place-items-start">
        <div className="hidden md:flex md:flex-col px-7 border-2 group rounded-lg w-fit py-5 hover:bg-green-600">
          <h1 className=" text-green-300 group-hover:text-orange-200">Welcome</h1>
          <h1 className="userDetailsCardh1">
            Name:
            <span className="userDetailsCard">
              {details.name}
            </span>
          </h1>
          <h1 className="userDetailsCardh1">
            Email:
            <span className="userDetailsCard">
              {details.email}
            </span>
          </h1>
        </div>
        {
          isTask ?
            (<>
              <div className="mt-3 h-fit flex flex-col gap-1 px-2">
                <input className="w-56 input" placeholder="Task Name" onChange={(e) => { setTaskname(e.target.value) }} value={Taskname} />
                <textarea className="w-56 input" placeholder="Task Description" onChange={(e) => { setTaskDesc(e.target.value) }} value={TaskDesc}></textarea>
                <p>Dead Line</p>
                <input className="input" type="date" onChange={(e) => { setTaskDeadLine(e.target.value) }} value={TaskDeadLine} />
                {
                  error && (<p className="bg-red-500 text-sm text-white font-bold w-fit px-2 py-1 rounded">{error}</p>)
                }
                <div className="flex justify-between">
                  <button className=" bg-green-500 px-2 py-1 rounded text-white font-bold" onClick={handleCreateTask}>Create</button>
                  <button className="text-white bg-red-500 px-2 py-1 font-bold rounded"
                    onClick={() => { setisTask(prevIsTask => !prevIsTask); seterror("") }}
                  >Cancle</button>
                </div>
              </div>
            </>) :
            (<><div>
              <button className="text-white bg-green-500 px-2 py-1 font-bold rounded mt-3"
                onClick={() => { setisTask(prevIsTask => !prevIsTask) }}
              >Create Task</button>

            </div></>)
        }
      </div>
      {/* <div className="col-span-2 text-center">
        <h1>No Task available</h1>
        <p>Create one To view Here</p>
      </div> */}
      <div className="col-span-2 text-center">
        <TodoList details={details} />
        {/* <div className=" w-72 md:w-96 px-2 py-1">
          {
            alltaskLen ? (
              <>
                {
                  AllTasks.map((i) => {
                    return <TodoCardItem key={i.id} data={i} getTasks={getTasks} />
                  })
                }
              </>
            ) : (
              <div>
                <h1>No Task available</h1>
                <p>Create one To view Here</p>
              </div>
            )
          }

        </div > */}
      </div>
    </div >
  );
};

export default UserInfo;
