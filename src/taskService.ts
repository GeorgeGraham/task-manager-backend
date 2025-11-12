
import { randomUUID } from 'crypto';
import { Task } from './models/task';
import { TaskRepository } from './taskRepository';

export function createTask(title : string,userId : string, repository : TaskRepository){
  //Generate a UUID For the task
  const id = randomUUID();
  //Create the Task Object
  const task = new Task(id,title,userId);
  //Save using repository
  repository.createTask(task);
}