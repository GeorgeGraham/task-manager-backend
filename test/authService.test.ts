import { registerUser , authenticateUser } from "../src/authService";
import { MockUserRepository } from "../src/mockUserRepository";
import { User } from "../src/models/user";
import { createUser } from "./testutils";

//Move out user , to somewhere
//createUser => Userinterface , method

describe("registerUser", () => {
  test("should register a new user", async () => {
    const repo = new MockUserRepository();
    const newUser: User = createUser();

    const result = await registerUser(newUser.username,newUser.password, repo);

    const found = await repo.getUserByUsername("Bob");

    expect(found.username).toEqual(newUser.username);
    expect(found.password).toEqual(newUser.password);
    
    });
});

describe("authenticateUser", ()=>{
  test("should authenticate a user", async() =>{
    const repo = new MockUserRepository();

    const newUser : User  = createUser();

    await registerUser(newUser.username,newUser.password , repo);

    const result = await authenticateUser(newUser.username,newUser.password,repo);
    expect(result).toBe(true);
  })
})