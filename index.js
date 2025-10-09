import express from "express";
import { MockUserRepository } from "./mockUserRepository";
import registerUser from "./authService";

const app = express();
app.use(express.json());

const userRepo = new MockUserRepository();


// Test route
app.get("/", (req, res) => {
  res.send("Task Manager API is running...");
});

app.post("/register", async (req, res) => {
  const { name, password } = req.body;
  const newUser = new User(name, password);
  registerUser(newUser, userRepo).then(() => {
    res.status(201).json({ message: "User registered successfully" });
  }).catch((err) => {
    res.status(400).json({ error: err.message });
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

