import express, { NextFunction, Request, Response } from "express";
import { MockUserRepository } from "./mockUserRepository";
import { authenticateUser, registerUser , generateAccessToken , authenticateToken } from "./authService";
import { User } from "./models/user";
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserRepository } from "./userRepository";
import { TokenStore } from "./tokenStore";
import { AuthRequest } from "./authService";
import { TaskRepository } from "./taskRepository";
import { createTask } from "./taskService";
//To allow for dependency injection
function createApp(userRepo : UserRepository, tokenRepos : TokenStore , taskRepository  : TaskRepository){
  //Load Environment Variables
  dotenv.config();

  //Secret for JWT
  const secret = process.env.SECRET;

  const app = express();
  app.use(express.json());

  // Test route
  app.get("/",authenticateToken(tokenRepos), (req , res) => {
    res.send("Task Manager API is running...");
  });


  app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    registerUser(username , password, userRepo).then(() => {
      res.status(201).json({ message: "User registered successfully" });
    }).catch((err) => {
      res.status(400).json({ error: err.message });
    });
  });

  app.post("/login", async (req, res)=>{
    //Fetch Data from Request Body
    const {username, password} = req.body;
    const user = await userRepo.getUserByUsername(username);
    let authenticated =  await authenticateUser(username,password,userRepo);
    if(authenticated && user !=null){
      try{
        let token = generateAccessToken(user.id)
        //Add Refresh Token
        tokenRepos.addToken(user.id,new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));
        res.json({"token": token});
      }catch(error){
        console.log("some error",error);
      }
    }
    res.status(401).send();
  })

  app.post("/logout", authenticateToken(tokenRepos) ,(req : AuthRequest,res)=>{
    if(req.user!=null){
      //Get User Details From JWT
      let username = req.user.username;
      //Invalidate Refresh Token
      tokenRepos.removeToken(username);
      res.status(403).end();
    }else{
      //Change
      res.status(200);
    }
    
  })

  app.post("/createTask",authenticateToken(tokenRepos), async (req : AuthRequest, res)=>{
    if(req.user!=null){
      //Get User Details From JWT
      let userId = req.user.userId
      try{
        const createdTask = await createTask("this is a cool task",userId,taskRepository)
        res.status(201).json(createdTask);
      }catch (err){
        res.status(500).json({ error: (err as Error).message });
      }
    }
    
  })

  app.get("/getUserTasks",authenticateToken(tokenRepos),async (req : AuthRequest,res)=>{
    if(req.user!=null){
      let userId = req.user.userId;
      const tasks = await taskRepository.getUsersTasks(userId);
      res.status(200).json(tasks);
    }
  })

  return app;
}




export default createApp;