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
import cors from 'cors';
import cookieparser from 'cookie-parser';
import { Task } from "./models/task";



//To allow for dependency injection
function createApp(userRepo : UserRepository, tokenRepos : TokenStore , taskRepository  : TaskRepository){
  //Load Environment Variables
  dotenv.config();

  //Secret for JWT
  const secret = process.env.SECRET;

  const app = express();
  app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
  }));
  app.use(express.json());
  app.use(cookieparser());

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

    try{

      const user = await userRepo.getUserByUsername(username);
      let authenticated =  await authenticateUser(username,password,userRepo);

      if(authenticated && user !=null){

          //Generate JWT Token
          let token = generateAccessToken(user.id)

          //Add Refresh Token
          tokenRepos.addToken(user.id,new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));

          //send back jwt , as cookie httponly
          res.cookie('token',token,{
            httpOnly : true,
            secure : false,
            maxAge: 1000 * 60 * 30,
            //CSRF , samesite ?
          })

          //Logged In Successfully
          res.send('Logged in Success');
      }

      res.status(401).send();

    }catch(error : unknown){

      if(error instanceof Error){
        res.status(500).json({ error: error.message });
      }
      
    }
  })

  app.post("/logout", authenticateToken(tokenRepos) ,(req : AuthRequest,res)=>{
    if(req.user!=null){
      //Get User Details From JWT
      let userId = req.user.userId;
      //Invalidate Refresh Token
      tokenRepos.removeToken(userId);
      console.log("Removing Refresh Token");
      res.status(200).end();
    }else{
      //Change
      res.status(401);
    }
    
  })

  app.post("/createTask",authenticateToken(tokenRepos), async (req : AuthRequest, res)=>{
    if(req.user!=null){
      const {taskTitle , list_order} = req.body;
      //Get User Details From JWT
      let userId = req.user.userId
      try{
        const createdTask = await createTask(taskTitle,userId,list_order,taskRepository)
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

  app.post("/deleteTask",authenticateToken(tokenRepos),async (req: AuthRequest , res)=>{
    if(req.user!=null){
      let userId = req.user.userId;
      const idToDelete = req.body.id;
      console.log("ID To Delete");
      console.log(idToDelete);
      try{
        let deleted = await taskRepository.deleteTaskByID(idToDelete);
        res.status(201).send();
      }catch (err){
        console.log("Error occured",err);
      }
    }
  })

  app.post("/updateTask",authenticateToken(tokenRepos),async (req: AuthRequest , res)=>{
    if(req.user!=null){

      let updatedTask = req.body.updatedTask;
      let task = await taskRepository.getTaskByID(updatedTask.id);
      let userId = req.user.userId;

      if(task !=null ){

        if(task.author_id == userId){
          
          taskRepository.updateTaskByID(updatedTask);
          res.status(201).send();
        }
      }
    }
    
  })

  app.get("/me",authenticateToken(tokenRepos),async (req: AuthRequest, res)=>{
    console.log("Running Route");
    if(req.user!=null){
      res.send(req.user);
    }
  })
  
  return app;
}




export default createApp;