

import createApp from "./index";
import { MockTaskRepository } from "./mockTaskRepository";
import { MockUserRepository } from "./mockUserRepository";
import { MockTokenStore } from "./tokenStore";

const PORT = process.env.PORT || 5000;

const tokenRepository = new MockTokenStore();
const userRepository = new MockUserRepository();
const taskRepository = new MockTaskRepository();
const app = createApp(userRepository,tokenRepository,taskRepository)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
