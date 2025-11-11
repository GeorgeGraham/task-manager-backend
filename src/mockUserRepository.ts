
import { User } from "./models/user";
import { UserRepository } from "./userRepository";

export class MockUserRepository implements UserRepository {
    private users: any[] = [];
    
    getUserByUsername(username: string): Promise<User> {
        const user = this.users.find(u => u.username === username);
        return Promise.resolve(user);
    }

    createUser(user: any): Promise<User> {
        this.users.push(user);
        return Promise.resolve(user);
    }

}