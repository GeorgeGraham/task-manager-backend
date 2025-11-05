
import request from "supertest";
import app from "../index";
import { createTestApp } from "./testutils";
describe("POST /logout", ()=>{
  it("logout , shouldn't be able to access hidden route", async () => {
    //Initial Setup
    const app = createTestApp();
    
    await request(app)
      .post("/register")
      .send({ username: "Bob", password: "password123" });

    const loginRes = await request(app)
      .post("/login")
      .send({ username: "Bob", password: "password123" });
    
    //Capture the token
    const token = loginRes.body.token;
    expect(token).toBeDefined();

    await request(app).post("/logout").set('Authorization', `Bearer ${token}`);
    
    const protectedRes = await request(app)
                .get("/")
                // SET THE AUTHORIZATION HEADER
                .set('Authorization', `Bearer ${token}`);
    
    expect(protectedRes.statusCode).toBe(403);
  });
})
