import express from "express";
import { MockUserRepository } from "./mockUserRepository";

const app = express();
app.use(express.json());

const userRepo = new MockUserRepository();


// Test route
app.get("/", (req, res) => {
  res.send("Task Manager API is running...");
});

app.post("/register", async (req, res) => {
  const { name, password } = req.body;

  //Check if user already exists in mock database
  const existing = await userRepo.getUserByName(name);
  if(existing){
    return res.status(400).json({ message: "User already exists"})
  }

  const newUser = new User(name, password);
  await userRepo.createUser(newUser);
  res.status(201).json({ message: "User registered successfully" });
  
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

