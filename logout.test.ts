


import request from "supertest";
import app from "./index";

describe("POST /logout",()=>{
    it("should remove the cookie when logging out", async ()=>{
        await request(app).post("/register").send({ username: "Bob", password: "password123" });
        const res1 = await request(app).post("/login").send({ username: "Bob", password: "password123" })
        expect(res1.headers['set-cookie']).toBeDefined();
        const res2 =  await request(app).post("/logout");
        const cookie = res2.headers['set-cookie']?.[0];
        expect(cookie).toMatch(/Expires=Thu, 01 Jan 1970 00:00:00 GMT/);
    })
})