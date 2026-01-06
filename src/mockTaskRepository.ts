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
    async getTaskByID(id: string): Promise<Task | null> {
        for(let i =0; i<this.tasks.length;i++){
            if(id == this.tasks[i].id){
                return this.tasks[i];
            }
        }
        return null;
    }
    async getUsersTasks(userId : string): Promise<Array<Task> | null> {
        const tasks = [];
        for(let i =0; i<this.tasks.length;i++){
            if(userId == this.tasks[i].userId){
                tasks.push(this.tasks[i]);
            }
        }
        return tasks;
    }
    async deleteTaskByID(id : string) : Promise<boolean>{
        for(let i=0; i<this.tasks.length;i++){
            if(id == this.tasks[i].id){
                this.tasks.splice(i,1);
                return true;
            }
        }
        return false;
    }

    async updateTaskByID(updatedTask : Task) : Promise<boolean>{
        for(let i=0; i<this.tasks.length;i++){
            if(updatedTask.id == this.tasks[i].id){
                this.tasks[i] = updatedTask;
                return true;
            }
        }
        return false;
    }
}