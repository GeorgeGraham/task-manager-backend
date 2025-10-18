

import request from "supertest";
import app from "./index";

//Isolating Test Data?

describe("POST /login",()=>{
    it("should login correctly with correct details", async ()=>{
        await request(app).post("/register").send({ username: "Bob", password: "password123" });
        const res = await request(app).post("/login").send({ username: "Bob", password: "password123" })
        expect(res.statusCode).toBe(200);
        expect(res.headers['set-cookie']).toBeDefined();
    })
})