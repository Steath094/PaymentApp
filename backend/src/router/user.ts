import express, { Request, Response } from "express";
import { Account, User } from "../db/model";
import z from 'zod'
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { authMiddleware } from "../middleware";
import { jwtSecret } from "../config";
export const userRouter = express.Router();

userRouter.post('/signup',async (req: Request, res: Response) => {
    try {
    const requiredBody = z.object({
        userName: z
        .string()
        .min(3,"Username Should Be atleast 3 characters Long")
        .max(15,"Username Should Be atMax 15 characters Long"),
        password: z
        .string()
        .min(8, "Password should be at least 8 characters long")
        .regex(/[a-z]/, "Password must include at least one lowercase letter")
        .regex(/[A-Z]/, "Password must include at least one uppercase letter")
        .regex(/[0-9]/, "Password must include at least one number")
        .regex(/[^a-zA-Z0-9]/, "Password must include at least one special character"),
        firstName: z
        .string()
        .max(50,"First Name should be atMax 50 characters long"),
        lastName: z
        .string()
        .max(50,"Last Name should be atMax 50 characters long"),
    })
    
    const parsedData = requiredBody.safeParse(req.body);
    console.log(parsedData.error);
    
    if (!parsedData.success) {
        res.status(400).json(new ApiError(400,"Invalid Input Format"));
        return;
    }
  const { userName, password, firstName, lastName } = parsedData.data;
  const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.create({
      userName,
      password: hashedPassword,
      firstName,
      lastName,
    });

    if (!user) {
      res.status(409).json(new ApiError(409,"User Already Exists"));
      return 
    }
    const userId = user._id;
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
    const token =jwt.sign({userId},`${process.env.JWT_SECRET}`);
     res.status(200).json(new ApiResponse(200,
        {
            userId: user._id,
            jwt: token
        },"User Successfully Created"));
    return
  } catch (error) {
    console.error('Error While Registering User:', error);
     res.status(500).json(new ApiError(500,"Error While Registering User",error as any));
    return
  }
})

userRouter.post('/signin',async (req: Request,res: Response) =>{
    try {
        if (!req.userId) {
            res.status(401).json(new ApiError(401, "Unauthorized"));
            return
        }
        const requiredBody = z.object({
            userName: z.string()
            .min(3,"User Should be atleast 3 character long")
            .max(15,"User should be atMax 15 character long"),
            password: z.string()
            .min(8,"Password should be atleast 8 character long")
            .regex(/[a-z]/, "Password must include at least one lowercase letter")
            .regex(/[A-Z]/, "Password must include at least one uppercase letter")
            .regex(/[0-9]/, "Password must include at least one number")
            .regex(/[^a-zA-Z0-9]/, "Password must include at least one special character")
        })
        const parsedData = requiredBody.safeParse(req.body);
        if (!parsedData.success) {
            res.status(400).json(new ApiError(400,"Invalid Input Format"));
            return;
        }
        const {userName, password} = parsedData.data;
        const user = await User.findOne({
            userName
        })
        if (!user) {
            res.status(400).json(new ApiError(400,"User Doesn't Exists"));
            return;
        }
        
        const validPassword = await bcrypt.compare(password,user.password)
        if (!validPassword) {
            res.status(401).json(new ApiError(401,"Invalid Password"))
            return
        }
        const token = jwt.sign({id: user._id},`${process.env.JWT_SECRET}`)
        res.status(200).json(new ApiResponse(200,token,"User Logged In successfully"))
    } catch (error) {
        console.log("Login Route Error: ", error);
        res.status(500).json(new ApiError(500,"Error While User Login"))
    }
})


userRouter.put('/',authMiddleware,async(req: Request, res: Response)=>{
    try {
        const requiredBody = z.object({
        password: z
        .string()
        .min(8, "Password should be at least 8 characters long")
        .regex(/[a-z]/, "Password must include at least one lowercase letter")
        .regex(/[A-Z]/, "Password must include at least one uppercase letter")
        .regex(/[0-9]/, "Password must include at least one number")
        .regex(/[^a-zA-Z0-9]/, "Password must include at least one special character"),
        firstName: z
        .string()
        .max(50,"First Name should be atMax 50 characters long"),
        lastName: z
        .string()
        .max(50,"Last Name should be atMax 50 characters long"),
    })
    const parsedData = requiredBody.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json(new ApiError(400,"Invalid Input Format"));
        return;
    }
    const {firstName,lastName,password} = parsedData.data;
    const hashedPassword = await bcrypt.hash(password,10);
    const user = await User.findOneAndUpdate({
        _id: req.userId
    },{
        $set:{
            firstName,
            lastName,
            password: hashedPassword
        }
    },{new: true})
    if (!user) {
        res.status(411).json(new ApiError(411,"Something went wrong"))
        return
    }
    res.status(200).json(new ApiResponse(200,user,"User Updated Suceessfully"))
    } catch (error) {
        console.log("Update Profile Route Error: ", error);
        res.status(500).json(new ApiError(500,"Error While Updating User's Profile"))
    }
})

userRouter.get('/bulk',async(req:Request,res:Response)=>{
    try {
        const name =req.query.filter || "";
        const users = await User.find({
            $or:[
                {firstName: {'$regex' : name, '$options' : 'i'}},
                {lastName: {'$regex' : name, '$options' : 'i'}}
            ]
        }).select('_id userName firstName lastName')
        if (users.length==0) {
            res.status(200).json(new ApiResponse(200,[],"No Users Found"))
            return
        }
        res.status(200).json(new ApiResponse(200,users,"Users Fetcched Successfully"))
        return
    } catch (error) {
        console.log("Get users via Filter Error: ", error);
        res.status(500).json(new ApiError(500,"Error While finding users profile"))
    }
})
