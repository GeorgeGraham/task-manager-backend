

import { MockUserRepository } from "./mockUserRepository";
import { User } from "./user";

export async function registerUser(newUser : User, repo : MockUserRepository): Promise<User> {
  //Check if user already exists in mock database
  const existing = await repo.getUserByUsername(newUser.name);
  if(existing){
    throw new Error("User already exists");
  }
  return await repo.createUser(newUser);
}

export async function authenticateUser(username: string, password: string,  repo : MockUserRepository): Promise<boolean> {
  //Check if user already exists in database
  const existing = await repo.getUserByUsername(username);
  if(!existing){
    throw new Error("User does not exist");
  }
  return password == existing.password;
  
}

export async function logoutUser(): Promise<void> {
  // No state to clear yet
}