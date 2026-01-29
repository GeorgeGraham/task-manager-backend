
import { Pool } from "pg";
import createApp from "./index";
import { MockTaskRepository } from "./mockTaskRepository";
import { MockUserRepository } from "./mockUserRepository";
import { MockTokenStore } from "./mockTokenStore";
import { PostgresTaskRepository } from "./postgresTaskRepository";
import { PostgresUserRepository } from "./postgresUserRepository";
const PORT = process.env.PORT || 5000;

const tokenRepository = new MockTokenStore();

const pool = new Pool({
    user: 'postgres',
    password: '123',
    host: 'localhost',
    port: 5432,
    database: 'test',
})
const userRepository = new PostgresUserRepository(pool);
const taskRepository = new PostgresTaskRepository(pool);
const app = createApp(userRepository,tokenRepository,taskRepository)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
