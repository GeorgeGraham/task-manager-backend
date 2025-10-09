


import { registerUser } from "./authService";
import { MockUserRepository } from "./mockUserRepository";
import { User } from "./user";

describe("registerUser", () => {
  test("should register a new user", async () => {
    const repo = new MockUserRepository();
    const newUser: User = { name: "Bob", password: "password123" };
    const result = await registerUser(newUser, repo);
    expect(result).toEqual(newUser);
    const found = await repo.getUserByUsername("Bob");
    expect(found).toEqual(newUser);
    });
});
