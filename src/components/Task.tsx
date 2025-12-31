import { useState } from "react";

interface TaskProps{
    id: number;
    title: string;
    done: boolean;
    delete(taskId : number) : void;
    update(taskId : number) : void;
}

function Task(props : TaskProps) {
    const [done, setDone] = useState(props.done);
    const [editing,setEditing] = useState(false);
    const handleDelete = () => props.delete(props.id);
    const handleUpdate = () => props.update(props.id);
    const handleFocus = ()=>{
        setEditing(true);
    }
    return (
        <div className="bg-gray-400 h-20 flex items-center justify-between p-2 rounded-md">
            <div className="h-full flex items-center">
                <button onClick={() => setDone(!done)} className={`rounded-full h-10 w-10 ${
                    done ? "bg-green-500" : "bg-blue-500"
                }`}></button>
                
                <input onFocus={handleFocus}  onInput={handleUpdate} defaultValue={props.title} className="font-bold text-2xl  hover:cursor-pointer"></input>
            </div>
            <div className="flex flex-col h-full">
                <button onClick={handleDelete} className="h-full p-2 bg-red-500">x</button>
            </div>
        </div>
    )
}

export default Task
