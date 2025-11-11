import { MockUserRepository } from "../src/mockUserRepository";
import { MockTokenStore } from "../src/tokenStore";
import createApp from "../src/index";
export function createTestApp(){
    const userRepo  = new MockUserRepository();
    const tokenRepo = new MockTokenStore();
    const app = createApp(userRepo,tokenRepo);
    return app;
}