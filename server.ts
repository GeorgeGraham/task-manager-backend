

import createApp from "./index";
import { MockUserRepository } from "./mockUserRepository";

const PORT = process.env.PORT || 5000;

const userRepository = new MockUserRepository();
const app = createApp(userRepository)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
