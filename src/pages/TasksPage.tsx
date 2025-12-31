import { useState , useEffect } from 'react'
import Task from '../components/Task'
import type { TaskInterface } from "../types";

var nextId = 3;
function TasksPage() {
  
  const [tasks,setTasks] = useState<TaskInterface[]>([])
  //Adding Tasks or not
  const [adding, setAdding] = useState(false);
  useEffect(() => {
    console.log("Component mounted!");
    //Setup the tasks
    setTasks([
      { id: 1, title: "Test task 1", done: false },
      { id: 2, title: "Test task 2", done: true },
    ])
  }, []);

  //User Adding a Task , Creation UI shown
  const toggleAddingTask  = ()=>{
    setAdding(!adding);
  }

  //Update Task
  const updateTask = ()=>{
    //Run API to update task
    console.log("Updating Task through backend to match changes");
  }

  //Save Button
  const saveTask = ()=>{
    //Run API to Add task
    //Comes back +

    //Mock implementation
    let task = document.getElementById("taskInput") as HTMLInputElement | null
    if(task!=null){
      let taskName = task.value;
      setTasks([...tasks, { id: nextId, title: taskName, done: false }])
      nextId+=1;
    }
  }

  //Cancel Button

  //Delete Task from Tasks List
  const deleteTask = (taskId : number) =>{
    //Run API to Delete task
    //Comes back success
    console.log(taskId);
    for(var i=0; i<tasks.length;i++){
      if(tasks[i].id == taskId){
        let newTasks = [...tasks];
        newTasks.splice(i,1);
        setTasks(newTasks);
      }
    }
  }
 


  return (
    <div className="">
        
        <nav className="bg-red-500 h-14 p-2 flex justify-between">
            <span className="font-bold text-2xl">Task Manager</span>
            {/*Button Styling , to reuse*/}
        </nav>
        <div className="p-2">
          <h1 className="font-bold text-4xl">Tasks To Do</h1>
          
          <div className="flex flex-col gap-2 p-5">
            <div className="flex items-center gap-2">
              <button onClick={toggleAddingTask} className="bg-red-300 hover:bg-red-700 hover:cursor-pointer text-2xl p-1 h-full rounded-md">Add Task</button>
              { adding ? (
                <div>
                  <input id="taskInput" autoFocus
                      className="border rounded px-2 py-1 flex-1"
                      placeholder="Task title">
                  </input>
                  <button className="bg-green-400 rounded-sm ml-4 p-1" onClick={saveTask}>Save</button>
                </div>
                ) : <></> }
            </div>
            {
              tasks.map(task => <Task update={updateTask} delete={deleteTask} key={task.id} id={task.id} title={task.title} done={task.done} />)
            }
          </div>
        </div>
    </div>
  )
}

export default TasksPage
