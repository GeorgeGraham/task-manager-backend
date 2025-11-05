

import createApp from "./index";
import { MockUserRepository } from "./mockUserRepository";
import { MockTokenStore } from "./tokenStore";

const PORT = process.env.PORT || 5000;

const tokenRepository = new MockTokenStore();
const userRepository = new MockUserRepository();
const app = createApp(userRepository,tokenRepository)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
