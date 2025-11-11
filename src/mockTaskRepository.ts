import { TaskRepository } from "./taskRepository";
import { Task } from "./models/task";
import { User } from "./models/user";


export class MockTaskRepository implements TaskRepository {
    private tasks: any[] = [];
    //Creates a Task in the repos , returning created Task object
    async createTask(task : Task): Promise<Task>{
        this.tasks.push(task);
        return task;
    }
}