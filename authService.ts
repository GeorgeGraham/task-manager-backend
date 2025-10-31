import { UserRepository } from "./userRepository";
import { User } from "./user";
import jwt , { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export async function registerUser(username : string , password : string , repo : UserRepository): Promise<User> {
  //Check if user already exists in mock database
  const existing = await repo.getUserByUsername(username);
  if(existing){
    throw new Error("User already exists");
  }
  return await repo.createUser(new User(username , password));
}

export async function authenticateUser(username: string, password: string,  repo : UserRepository): Promise<boolean> {
  //Check if user already exists in database
  const existing = await repo.getUserByUsername(username);
  if(!existing){
    throw new Error("User does not exist");
  }
  return password == existing.password;
  
}

export async function logoutUser(): Promise<void> {
  // No state to clear yet
}

//Generates JWT Token , with username in payload based on environment variable
export function generateAccessToken(username : string){
  if (!process.env.SECRET) throw new Error("SECRET not defined");
  const token = jwt.sign({"username" : username}, process.env.SECRET, {expiresIn: '1800s'});
  return token;
}

//Interface for data to pass to our authenticateToken method extending normal express Request definition
export interface AuthRequest extends Request {
  user?: string | JwtPayload
}

//Middleware to Authenticate JWT token and pass onto route once authenticated
export function authenticateToken(req : AuthRequest, res : Response, next : NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}