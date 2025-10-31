

import request from "supertest";
import app from "../index";
import createApp from "../index";
import { MockUserRepository } from "../mockUserRepository";

describe("POST /register", ()=>{
  it("should be success with new user", async () => {
    const res = await request(createApp(new MockUserRepository()))
      .post("/register")
      .send({ username: "Bob", password: "password123" });
      
    expect(res.statusCode).toBe(201);
  });
})
