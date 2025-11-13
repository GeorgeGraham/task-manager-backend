import { createTestApp , createUser } from "./testutils";
import request from "supertest";


describe("GET /getUserTasks", ()=>{
  it("should be more than one task returned correctly", async () => {
    const app = createTestApp();
    const token = await createUser(app,"Bob","123");
    await request(app).post("/createTask").send().set('Authorization', `Bearer ${token}`);
    await request(app).post("/createTask").send().set('Authorization', `Bearer ${token}`);
    const response = await request(app).get("/getUserTasks").set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(1);
  });
});