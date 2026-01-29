import { createTestApp , TestUserSession } from "./testutils";
import request from "supertest";


describe("POST /createTask", ()=>{
  it("shouldn't be success with no login", async () => {
    const app = createTestApp();
    const res = await request(app).post("/createTask").send();
    expect(res.status).toBe(401);
  });
  it("create task should be successful", async () => {
    const app = createTestApp();
    const userSession = new TestUserSession(app,"Bob","123");
    await userSession.Login();
    const res = await userSession.formPost("/createTask").send({taskTitle: "this is a cool task", list_order : 1})
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("this is a cool task");
  });
})
