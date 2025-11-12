import { createTestApp , createUser } from "./testutils";
import request from "supertest";


describe("POST /createTask", ()=>{
  it("shouldn't be success with no login", async () => {
    const app = createTestApp();
    const res = await request(app).post("/createTask").send();
    expect(res.status).toBe(401);
  });
  it("create task should be successful", async () => {
    const app = createTestApp();
    const token = await createUser(app,"Bob","password");
    console.log(token);
    const res = await request(app).post("/createTask").set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("this is a cool task");
    //Userid same ?
  });
})
