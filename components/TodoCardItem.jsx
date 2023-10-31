
import { MdDelete } from 'react-icons/md'
import { GrEdit, GrCompliance } from 'react-icons/gr'
import { useState } from 'react'

const TodoCardItem = (props) => {
    const { data, getTasks } = props
    const { TaskName, TaskDeadLine, _id, TaskDescription } = data

    const [IsEdit, setIsEdit] = useState(false)
    const [newTaskName, setnewTaskName] = useState(TaskName)
    const [newTaskDesc, setnewTaskDesc] = useState(TaskDescription)
    const [newTaskDeadLine, setnewTaskDeadLine] = useState(TaskDeadLine)

    const handleSave = async () => {
        setIsEdit((prev) => !prev)
        const res = await fetch("/api/userTask", {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                id: _id,
                TaskName: newTaskName,
                TaskDescription: newTaskDesc,
                TaskDeadLine: newTaskDeadLine,
            })

        })
        const data = await res.json()
        if (data.update === "Updated") {
            getTasks()
        }
    }

    const handleDoneAndDelete = async () => {
        const res = await fetch("/api/userTask", {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                id: _id,
            })

        })
        const data = await res.json()
        if (data.status === "Deleted") {
            getTasks()
        }

    }

    return (
        <div className="border-2 px-2 py-1 text-start border-black rounded my-2">
            <div className="flex justify-between place-content-center">
                {IsEdit ? (<input className='inputTaskEdit' placeholder='Task Name' value={newTaskName} onChange={(e) => setnewTaskName(e.target.value)} />) : (<h1 className="font-bold text-lg">{TaskName}</h1>)}
                <div className="flex justify-end gap-2 items-center">
                    <button onClick={handleDoneAndDelete}><MdDelete className="text-base" /></button>
                    {!IsEdit && <button onClick={() => { setIsEdit((prev) => !prev) }}><GrEdit className="text-base" /></button>}
                    <button onClick={handleDoneAndDelete}><GrCompliance className='text-base' /></button>
                </div>
            </div>
            {IsEdit ? (<input className='inputTaskEdit' placeholder="Task Description" value={newTaskDesc} onChange={(e) => setnewTaskDesc(e.target.value)} />) : (<p className="text-xs">{TaskDescription}</p>)}
            <div className='flex flex-row justify-between items-center'>
                {IsEdit ? (<input type='date' className='inputTaskEdit' value={newTaskDeadLine} onChange={(e) => setnewTaskDeadLine(e.target.value)} />) : (<p className="text-xs">{TaskDeadLine}</p>)}
                {IsEdit && <button className='bg-green-400 px-2 text-xs text-white font-bold rounded py-1' onClick={handleSave}>Save</button>}
            </div>
        </div>
    )
}

export default TodoCardItem
