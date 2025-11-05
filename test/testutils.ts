import { MockUserRepository } from "../mockUserRepository";
import { MockTokenStore } from "../tokenStore";
import createApp from "../index";
export function createTestApp(){
    const userRepo  = new MockUserRepository();
    const tokenRepo = new MockTokenStore();
    const app = createApp(userRepo,tokenRepo);
    return app;
}