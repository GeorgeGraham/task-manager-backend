
import { Task } from "./models/task";
import { TaskRepository } from "./taskRepository";
import { Client, Pool, QueryResult } from "pg";

export class PostgresTaskRepository implements TaskRepository {

    pool : Pool;
    constructor(pool : Pool){
        this.pool = pool
    }

    async createTask(task : Task): Promise<Task>{
        console.log("Running Create Task With Query");
        console.log(task.list_order);
        let queryResult = await this.pool.query<Task>(
            `INSERT INTO tasks (id, title, complete, author_id, list_order)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [task.id, task.title, task.complete,task.author_id,task.list_order]
        );
        
        if(!queryResult.rows[0]){
            throw new Error('Task Not Inserted');
        }

        return queryResult.rows[0];
    }
    async getTaskByID(id: string): Promise<Task | null> {

        let queryResult = await this.pool.query<Task>(
            `SELECT * from tasks WHERE id=$1;`,
            [id]
        );

        if(!queryResult.rows[0]){
            return null;
        }
        return queryResult.rows[0];
    }
    async getUsersTasks(userId : string): Promise<Array<Task> | null> {
        let queryResult = await this.pool.query<Task>(
            `SELECT * from tasks WHERE author_id=$1;`,
            [userId]
        );
        if(queryResult.rows.length <=0){
            return null;
        }
        return queryResult.rows;
    }
    async deleteTaskByID(id : string) : Promise<boolean>{
        let queryResult = await this.pool.query<Task>(
            `DELETE FROM tasks WHERE id=$1;`,[id]
        )
        if(queryResult.rowCount!=null && queryResult.rowCount > 0){
            return true;
        }else{
            return false;
        }
    }

    async updateTaskByID(updatedTask : Task) : Promise<boolean>{
        let queryResult = await this.pool.query<Task>(
            `UPDATE tasks SET title=$1, complete=$2 WHERE id=$3;`,[updatedTask.title,updatedTask.complete,updatedTask.id]
        )
        if(queryResult.rowCount!=null && queryResult.rowCount > 0){
            return true;
        }else{
            return false;
        }
        
    }
}