
import { randomUUID } from 'crypto';
import { Task } from './models/task';
import { TaskRepository } from './taskRepository';


export async function createTask(title : string,userId : string,list_order :number, repository : TaskRepository) : Promise<Task>{
  //Generate a UUID For the task
  const id = randomUUID();
  //Create the Task Object
  const task = new Task(id,title,userId,false,list_order);
  //Save using repository
  try{
    const createdTask = await repository.createTask(task);
    return createdTask;
  }catch(err){
    throw new Error('Failed to create task: ' + (err as Error).message);
  }
}
