import { useState } from "react";
import type { TaskInterface } from "../types";

interface TaskProps{
    task : TaskInterface;
    delete(task : TaskInterface) : void;
    update(task : TaskInterface) : void;
}

function Task(props : TaskProps) {
    const [done, setDone] = useState(props.task.complete);
    const [editing,setEditing] = useState(false);
    
    const handleDelete = () => props.delete(props.task);

    const toggleTaskStatus = ()=>{
        const newDone = !done;
        setDone(newDone);
        console.log(done);
        props.update({...props.task, complete: newDone});
    }

    const handleUpdate = (e: React.FocusEvent<HTMLInputElement>) => {
        //Pass new object, to avoid changing this object for now
        props.update({ ...props.task, title: e.target.value});
    }
    
    const handleFocus = ()=>{
        setEditing(true);
    }

    return (
        <div className="bg-gray-200 h-20 flex items-center justify-between rounded-md">
            <div className="h-full flex items-center p-2">
                <button onClick={toggleTaskStatus} className={`rounded-full h-10 w-10 ${
                    done ? "bg-green-500" : "bg-blue-500"
                }`}>{done ? "✓" : ""}</button>
                
                <input id='taskTitle' onFocus={handleFocus}  onBlur={handleUpdate} defaultValue={props.task.title} className="font-bold text-2xl  hover:cursor-pointer"></input>
            </div>
            <div className="flex flex-col h-full">
                <button onClick={handleDelete} className="h-full p-4 bg-red-300 rounded-r-md font-bold text-2xl">x</button>
            </div>
        </div>
    )
}

export default Task
