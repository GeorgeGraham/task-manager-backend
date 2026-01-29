

import request from "supertest";
import { createTestApp } from "./testutils";
//Isolating Test Data?

describe("POST /login",()=>{
    it("should login correctly with correct details", async ()=>{
        //Arrange
        const app = createTestApp();
        await request(app).post("/register").send({ username: "Bob", password: "password123" });
        

        //Act
        const loginRes = await request(app).post("/login").send({ username: "Bob", password: "password123" })
        
        //Assert
        expect(loginRes.statusCode).toBe(200);
        let cookie = loginRes.headers["set-cookie"];
        expect(cookie).toBeDefined();
        //Use the cookie to access a protected route
        if(cookie!=null){
            const protectedRes = await request(app).get("/getUserTasks").set('Cookie', cookie);
            expect(protectedRes.statusCode).toBe(200);
            expect(protectedRes.text).toEqual("[]");
        }
    })
})