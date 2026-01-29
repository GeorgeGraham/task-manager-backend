import { MockTaskRepository } from "../src/mockTaskRepository";
import { createTask } from "../src/taskService";



describe("createTask", () => {
  test("should create a new task correctly", async () => {
    const repo = new MockTaskRepository();
    const result = await createTask("A Task","abc",1,repo);
    expect(result.title).toEqual("A Task");
    expect(result.author_id).toEqual("abc");
    });
});