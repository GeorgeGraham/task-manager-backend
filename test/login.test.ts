

import request from "supertest";
import app from "../index";
import { MockUserRepository } from "../mockUserRepository";
import createApp from "../index";

//Isolating Test Data?

describe("POST /login",()=>{
    it("should login correctly with correct details", async ()=>{
        //Initial Setup , Create Mock User Repos / express app
        const userRepo  = new MockUserRepository(); 
        const app = createApp(userRepo);
    
        //Setup : Register a user
        await request(app).post("/register").send({ username: "Bob", password: "password123" });
        
        //Login and get JWT
        const loginRes = await request(app).post("/login").send({ username: "Bob", password: "password123" })
        
        //Ensure login was successful
        expect(loginRes.statusCode).toBe(200);

        
        //Capture the token
        const token = loginRes.body.token;
        expect(token).toBeDefined();

        //Use the token to access a protected route
        const protectedRes = await request(app)
            .get("/")
            // SET THE AUTHORIZATION HEADER
            .set('Authorization', `Bearer ${token}`);

        expect(protectedRes.statusCode).toBe(200); // Expect a successful status code
        expect(protectedRes.text).toEqual("Task Manager API is running..."); // Or whatever the protected route returns*/
    })
})