import { createTestApp , createUser , TestUserSession } from "./testutils";
import request from "supertest";


describe("GET /getUserTasks", ()=>{
  it("should be more than one task returned correctly", async () => {
    const app = createTestApp();
    const userSession = new TestUserSession(app,"Bob","123");
    await userSession.Login();
    await userSession.formPost("/createTask").send({taskTitle: "task1", list_order : 1})
    await userSession.formPost("/createTask").send({taskTitle: "task2", list_order : 2})
    const response = await userSession.formGet("/getUserTasks").send();
    //console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(1);
  });
  it("should work properly no tasks", async () => {
    const app = createTestApp();
    const userSession = new TestUserSession(app,"Bob","123");
    await userSession.Login();
    const response = await userSession.formGet("/getUserTasks").send();
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });
});