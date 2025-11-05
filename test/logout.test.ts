
import request from "supertest";
import app from "../index";
import createApp from "../index";
import { MockUserRepository } from "../mockUserRepository";

describe("POST /logout", ()=>{
  it("logout , shouldn't be able to access hidden route", async () => {
    //Initial Setup
    const userRepo  = new MockUserRepository(); 
    const app = createApp(userRepo);
    
    await request(app)
      .post("/register")
      .send({ username: "Bob", password: "password123" });

    const loginRes = await request(app)
      .post("/login")
      .send({ username: "Bob", password: "password123" });
    
    //Capture the token
    const token = loginRes.body.token;
    expect(token).toBeDefined();

    await request(app).post("/logout");

    const protectedRes = await request(app)
                .get("/")
                // SET THE AUTHORIZATION HEADER
                .set('Authorization', `Bearer ${token}`);
    
    expect(protectedRes.statusCode).toBe(403);
  });
})
