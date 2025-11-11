import { UserRepository } from "./userRepository";
import { User } from "./models/user";
import jwt , { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { TokenStore } from "./tokenStore";

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
  user?: UserPayload
}

//Interface for JWT
interface UserPayload extends JwtPayload {
  username: string;
}

async function validRefreshToken(tokenRepo : TokenStore, username : string) : Promise<boolean|undefined>{
  const valid = await tokenRepo.getTokenData(username);
  return valid?.valid;
}

//Middleware to Authenticate JWT token and pass onto route once authenticated
export function authenticateToken(tokenRepo : TokenStore){
  return async (req : AuthRequest, res : Response, next : NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    
    if (token == null) return res.sendStatus(401)
    console.log("Hello");
    try{
      const decoded = jwt.verify(token, process.env.SECRET as string) as UserPayload;
      const validRefresh = await validRefreshToken(tokenRepo, decoded.username);
      if(!validRefresh){
        return res.status(403).send();
      }
      req.user = decoded;
      next();
    }catch{
      console.log("ERror?");
      return res.status(403).send();
    }
    
    
  }
}
