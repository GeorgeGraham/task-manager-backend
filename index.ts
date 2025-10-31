import express, { NextFunction, Request, Response } from "express";
import { MockUserRepository } from "./mockUserRepository";
import { authenticateUser, registerUser , generateAccessToken , authenticateToken } from "./authService";
import { User } from "./user";
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UserRepository } from "./userRepository";



//To allow for dependency injection
function createApp(userRepo : UserRepository ){
  //Load Environment Variables
  dotenv.config();

  //Secret for JWT
  const secret = process.env.SECRET;

  const app = express();
  app.use(express.json());

  // Test route
  app.get("/",authenticateToken, (req , res) => {
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
    const {username, password} = req.body;
    let authenticated =  await authenticateUser(username,password,userRepo);
    console.log(authenticated);
    if(authenticated){
      try{
        let token = generateAccessToken(username)
        console.log(token);
        res.json({"token": token});
      }catch(error){
        console.log("some error",error);
      }
    }
    res.status(401).send();
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
  return app;
}




export default createApp;