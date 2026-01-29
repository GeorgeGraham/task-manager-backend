

import request from "supertest";
import app from "../src/index";
import { createTestApp } from "./testutils";
import { MockUserRepository } from "../src/mockUserRepository";

describe("POST /register", ()=>{
  it("should be success with new user", async () => {
    const app = createTestApp();
    const res = await request(app)
      .post("/register")
      .send({ username: "Bob", password: "password123" }); 
    expect(res.statusCode).toBe(201);
  });
})
