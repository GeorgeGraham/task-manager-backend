import { createTestApp , createUser, TestUserSession } from "./testutils";
import request from "supertest";
import { Task } from "../src/models/task";

describe("POST /update", ()=>{
  it("should update the task", async () => {
    //Arrange
    const app = createTestApp();
    const userSession = new TestUserSession(app,"Bob","123");
    await userSession.Login();

    await userSession.formPost("/createTask").send({taskTitle: "this is a cool task 1", list_order : 1})
    await userSession.formPost("/createTask").send({taskTitle: "this is a cool task 2", list_order : 2})
    const tasks = await userSession.formGet("/getUserTasks");
    const taskToUpdate = tasks.body[1].id;
    let updatedTask = tasks.body[1] as Task;
    updatedTask.title = "some new title";
    const response = await userSession.formPost("/updateTask").send({updatedTask : updatedTask})
    expect(response.status).toBe(201);
    const tasks2 = await userSession.formGet("/getUserTasks");
    expect(tasks2.body[1].title).toBe("some new title");
  });
});
