
import { User } from "./user";

export class MockUserRepository {
    private users: any[] = [];
    
    getUserByUsername(username: string): Promise<User> {
        const user = this.users.find(u => u.name === username);
        return Promise.resolve(user);
    }

    createUser(user: any): Promise<User> {
        this.users.push(user);
        return Promise.resolve(user);
    }

}