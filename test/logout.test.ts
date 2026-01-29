
import request from "supertest";
import { createTestApp, TestUserSession } from "./testutils";
describe("POST /logout", ()=>{
  it("logout , shouldn't be able to access hidden route", async () => {
    //Arrange
    const app = createTestApp();
    const userSession = new TestUserSession(app,"Bob","123");
    await userSession.Login();
    await userSession.formPost("/logout").send();
    const protectedRes = await userSession.formGet("/getUserTasks").send();
    expect(protectedRes.statusCode).toBe(403);
  });
})
