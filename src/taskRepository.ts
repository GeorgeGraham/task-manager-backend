
import { Task } from "./models/task";

//Task Repository interface
export interface TaskRepository {
    createTask(task : Task): Promise<any>;
}


