
import { User } from "./models/user";
import { UserRepository } from "./userRepository";
import { Client, Pool, QueryResult } from "pg";

export class PostgresUserRepository implements UserRepository {
    pool : Pool;

    constructor(pool : Pool){
        this.pool = pool
    }

    async getUserByUsername(username: string): Promise<User | null> {

        let queryResult = await this.pool.query<User>("SELECT * FROM users WHERE username = '" + username + "'");

        if(!queryResult.rows[0]){
            return null;
        }
        
        return Promise.resolve(queryResult.rows[0]);
    }

    async createUser(user: any): Promise<User> {
        
        
        let queryResult = await this.pool.query<User>(
            `INSERT INTO users (id, username, password)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [user.id, user.username, user.password]
        );

        if(!queryResult.rows[0]){
            throw new Error('User Not Inserted');
        }

        return Promise.resolve(queryResult.rows[0]);
        
        
        
    }

}