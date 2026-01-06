
import { Task } from "./models/task";

//Task Repository interface
export interface TaskRepository {
    //Load Task into Data Store
    createTask(task : Task): Promise<Task>;
    //Get all of a users tasks via their UUID
    getUsersTasks(id : string) : Promise<Array<Task> | null>;
    //Get Task Via ID
    getTaskByID(id : string) : Promise<Task | null>;
    //Delete a Task Via ID
    deleteTaskByID(id : string) : Promise<boolean>;
    //Update Task Via ID
    updateTaskByID(updatedTask : Task) : Promise<boolean>;
}


