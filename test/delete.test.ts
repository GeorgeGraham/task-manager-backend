import { createTestApp , createUser } from "./testutils";
import request from "supertest";


describe("POST /delete", ()=>{
  it("should delete the task correctly when logged in", async () => {
    const app = createTestApp();
    const token = await createUser(app,"Bob","123");
    await request(app).post("/createTask").send().set('Authorization', `Bearer ${token}`);
    await request(app).post("/createTask").send().set('Authorization', `Bearer ${token}`);
    const tasks = await request(app).get("/getUserTasks").set('Authorization', `Bearer ${token}`);
    const taskToDelete = tasks.body[0].id;
    const response = await request(app).post("/deleteTask").set('Authorization', `Bearer ${token}`).send({id : taskToDelete})
    expect(response.status).toBe(201);
    const tasks2 = await request(app).get("/getUserTasks").set('Authorization', `Bearer ${token}`);
    expect(tasks2.body.length).toBeLessThanOrEqual(1);
  });
});