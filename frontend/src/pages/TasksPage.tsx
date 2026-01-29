import { useState , useEffect , useRef } from 'react'
import Task from '../components/Task'
import type { TaskInterface } from "../types";
import axios from 'axios';
import { useNavigate } from 'react-router';
import Button from '../components/Button';
function TasksPage() {
  const navigate = useNavigate();
  const [tasks,setTasks] = useState<TaskInterface[]>([])
  //Adding Tasks or not
  const [adding, setAdding] = useState(false);
  const largestRef = useRef(0);
  useEffect(() => {
    //Load Tasks from this user
    axios.get('http://localhost:5000/getUserTasks',{withCredentials : true}).then(
      function(response){
        console.log("User Existing Tasks");
        console.log(response);
        const sortedTasks = response.data.sort((a : TaskInterface,b : TaskInterface)=> a.list_order - b.list_order)
        largestRef.current = sortedTasks[sortedTasks.length-1].list_order;
        setTasks(sortedTasks)
      }
    ).catch(
      function(error){
        
      }
    ).finally(
      function(){

      }
    )


  }, []);

  //User Adding a Task , Creation UI shown
  const toggleAddingTask  = ()=>{
    setAdding(!adding);
  }

  //Update Task
  const updateTask = (updatedTask : TaskInterface)=>{
    //Run API to update task
    //const task = tasks.find(task => task.id === id);
    axios.post('http://localhost:5000/updateTask',{updatedTask : updatedTask},{withCredentials : true}).then(
      function(response){
        
      }
    ).catch(
      function(error){

      }
    ).finally(function(){

    })
  }

  //Save Button
  const saveTask = ()=>{

    //Get Task Title from document
    let title = (document.getElementById("taskInput") as HTMLInputElement).value;


    let list_order = largestRef.current+1;
    console.log("Sending with");
    console.log(list_order);
    //Run API to Add task
    axios.post('http://localhost:5000/createTask',{taskTitle:title , list_order: list_order },{withCredentials : true})
    .then(function(response){
      //handle success
      console.log(response);
      //Should return created task ? 
      setTasks([...tasks, response.data])
      largestRef.current+=1;
    }).catch(function(error){
      //handle error
      console.log(error);
    }).finally(function(){
      //always executed
      console.log("Something?");
    })
    console.log("Updating Task through backend to match changes");
    
  }

  //Cancel Button

  //Delete Task from Tasks List
  const deleteTask = (task : TaskInterface) =>{
    //Run API to Delete task
    axios.post('http://localhost:5000/deleteTask',{id : task.id},{withCredentials : true})
    .then(function(response){
      //Comes back success , Update UI
      for(var i=0; i<tasks.length;i++){
        if(tasks[i].id == task.id){
          let newTasks = [...tasks];
          newTasks.splice(i,1);
          setTasks(newTasks);
        }
      }
    }).catch(function(error){

    }).finally(function(){

    })

  }
 
  const logout = ()=>{
    axios.post('http://localhost:5000/logout',{},{withCredentials : true}).then(
      function(response){
        console.log("Successful Logout!");
        console.log(response);
        navigate('/login')
      }
    ).catch(
      function(error){
        console.log("Logout Failed");
        console.log(error);
      }
    ).finally(
      function(){
        
      }
    )
  }

  return (
    <div className="">
        
        <nav className="bg-red-500 h-14 p-2 flex justify-between">
            <span className="font-bold text-2xl">Task Manager</span>
            {/*Button Styling , to reuse*/}
            <Button className="bg-gray-200 hover:bg-gray-400"  onClick={logout}>Logout</Button>
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
              tasks.map(task => <Task update={updateTask} delete={deleteTask} key={task.id} task={task} />)
            }
          </div>
        </div>
    </div>
  )
}

export default TasksPage
