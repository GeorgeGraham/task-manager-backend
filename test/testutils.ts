import { MockUserRepository } from "../src/mockUserRepository";
import { MockTokenStore } from "../src/mockTokenStore";
import createApp from "../src/index";
import { MockTaskRepository } from "../src/mockTaskRepository";
import request from "supertest";
import { Express } from "express";
import { User } from "../src/models/user";
export function createTestApp(){
    const userRepo  = new MockUserRepository();
    const tokenRepo = new MockTokenStore();
    const taskRepo = new MockTaskRepository();
    const app = createApp(userRepo,tokenRepo,taskRepo);
    return app;
}


export function createUser() : User{
    //Register a new user in the app with username and password
    return new User("1","Bob","123");
}

export async function createUserWithApp(app : Express,username : string, password : string) : Promise<string>{
    //Register a new user in the app with username and password
    await request(app).post("/register").send({ username: username, password: password });   
    //Login
    const loginRes = await request(app).post("/login").send({ username: username, password: password })
    //Capture the JWT
    const token = loginRes.body.token;
    return token;
}

