import express from "express";
import { MockUserRepository } from "./mockUserRepository";
import { authenticateUser, registerUser } from "./authService";
import { User } from "./user";

const app = express();
app.use(express.json());

const userRepo = new MockUserRepository();

// Test route
app.get("/", (req , res) => {
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

app.post("/login", async (req, res)=>{
  const {name, password} = req.body;
  let result =  await authenticateUser(name,password,userRepo);
  const crypto = require("crypto");
  const sessionId = crypto.randomBytes(32).toString("base64url");
  //Store Hash
  const sessionHash = crypto.createHash('sha256').update(sessionId).digest('hex');
  res.cookie('sessionId',sessionHash, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    maxAge: 24*60*60*1000
  })
  res.status(200).send("User Logged In Successfully");
})

app.post("/logout",(req,res)=>{
  res.cookie('sessionId',"", {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    expires: new Date(0),
  })
  res.status(200).end();1
})

export default app;