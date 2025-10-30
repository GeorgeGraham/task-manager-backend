

import request from "supertest";
import app from "../index";

describe("POST /register", ()=>{
  it("should be success with new user", async () => {
    const res = await request(app)
      .post("/register")
      .send({ username: "Bob", password: "password123" });
      
    expect(res.statusCode).toBe(201);
  });
})
