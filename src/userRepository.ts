


//User Repository interface
export interface UserRepository {
    getUserByUsername(username: string): Promise<any>;
    createUser(user: any): Promise<any>;
}


