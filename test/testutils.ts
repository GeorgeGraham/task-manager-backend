import { MockUserRepository } from "../src/mockUserRepository";
import { MockTokenStore } from "../src/mockTokenStore";
import createApp from "../src/index";
import { MockTaskRepository } from "../src/mockTaskRepository";
import request, { SuperTest } from "supertest";
import { Express } from "express";
import { User } from "../src/models/user";
import Test from "supertest/lib/test";
import supertest from "supertest";

//Create an App with Mock Dependencies
export function createTestApp(){
    const userRepo  = new MockUserRepository();
    const tokenRepo = new MockTokenStore();
    const taskRepo = new MockTaskRepository();
    const app = createApp(userRepo,tokenRepo,taskRepo);
    return app;
}

//Return User with Default Data
export function createUser() : User{
    //Return New User
    return new User("1","Bob","123");
}

export class TestUserSession{
    #cookie : string = "";
    #username;
    #password;
    #app : Express;
    /*
     
     */
    constructor(app : Express, username : string , password : string) {
        this.#app = app;
        this.#username = username;
        this.#password = password;
    }
    
    async Login(){
        this.#cookie = await this.createUserWithApp(this.#app,this.#username,this.#password)
    }

    checkLogin(){
        if(this.#cookie==""){
            throw new Error("Login Not Run On TestUserSession");
        }
    }

    formGet(requestPath : string) : Test{
        this.checkLogin();
        return request(this.#app).get(requestPath).set('Cookie', this.#cookie);
    }
    formPost(requestPath : string) : Test{
        this.checkLogin();
        return request(this.#app).post(requestPath).set('Cookie', this.#cookie);
    }
    async createUserWithApp(app : Express,username : string, password : string) : Promise<string>{
        //Throw rather than not create ? 
        //Register a new user in the app with username and password
        await request(app).post("/register").send({ username: username, password: password });   
        //Login
        const loginRes = await request(app).post("/login").send({ username: username, password: password })
        //Capture the Cookie

        let cookie = loginRes.headers["set-cookie"];
        //console.log(cookie);
        if(!cookie){ throw new Error("No Cookie Returned from Login")};

        return cookie;
    }
    
}