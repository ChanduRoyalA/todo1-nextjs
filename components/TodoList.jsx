"use client"

import { useEffect, useState } from "react"

import TodoCardItem from "./TodoCardItem"
const TodoList = ({ details }) => {
    const [AllTasks, setAllTasks] = useState([]);
    // const [update, setupdate] = useState("")
    const [error, seterror] = useState("")
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
    useEffect(() => {
        getTasks();
    }, []);
    return (
        <div className=" w-72 md:w-96 px-2 py-1">
            {
                AllTasks ? (
                    <>

                        {
                            AllTasks.map((i) => {
                                return <TodoCardItem key={i.id} data={i} getTasks={getTasks} />
                            })
                        }
                    </>
                ) : (
                    <>
                        <h1>No Task available</h1>
                        <p>Create one To view Here</p>
                    </>
                )
            }

        </div >

    )
}

export default TodoList
