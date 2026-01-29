import { createTestApp , TestUserSession } from "./testutils";
import request from "supertest";


describe("POST /delete", ()=>{
  it("should delete the task correctly when logged in", async () => {
    //Arrange
    const app = createTestApp();
    const userSession = new TestUserSession(app,"Bob","123");
    await userSession.Login();
    let test = await userSession.formPost("/createTask").send({taskTitle: "task1", list_order : 1})
    const tasks = await userSession.formGet("/getUserTasks").send();
    console.log(tasks.body);
    //const taskToDelete = tasks.body[0];
    //console.log(tasks);
    
    //Act
    //const response = await userSession.formPost("/deleteTask").send({id: taskToDelete})
    
    //Assert
    //expect(response.status).toBe(201);
    //const tasks2 = await request(app).get("/getUserTasks").set('Cookie', `cookie`);
    //expect(tasks2.body.length).toBeLessThanOrEqual(1);
  });
});