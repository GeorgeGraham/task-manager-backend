import { User } from "./models/user";


//User Repository interface
export interface UserRepository {
    getUserByUsername(username: string): Promise<User | null>;
    createUser(user: any): Promise<User>;
}


