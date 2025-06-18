import express, { Request, Response } from "express"
import { Account } from "../db/model";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import mongoose from "mongoose";

export const accountRouter = express.Router();

accountRouter.get('/balance',async(req: Request,res:Response)=>{
    try {
        const balance = await Account.findOne({
            userId: req.userId
        }).populate("userId", "firstName lastName");
        
        res.status(200).json(new ApiResponse(200,balance,"User's Balance Fetched Succesfully"))
        return
    } catch (error) {
        console.log("Error While Fetching Balance Error: ",error);
        res.status(500).json(new ApiError(500,"Error While Fetching Balance"))
    }
})

accountRouter.post('/transfer',async(req:Request,res:Response)=>{
    try {
        const { to, amount } = req.body
        if (!mongoose.isValidObjectId(to)) {
            res.status(404).json(new ApiError(404,"Invalid Recipient's Id"))
            return
        }
        const session = await mongoose.startSession();
        session.startTransaction();
        const fromAccount = await Account.findOne({
            userId: req.userId
        }).session(session);
        if (!fromAccount ||fromAccount!.balance<amount) {
            await session.abortTransaction();
            res.status(400).json(new ApiError(400,"Insufficient Balance"))
            return
        }
        const toAccount = await Account.findOne({
            userId: to
        }).session(session);
        
        if (!toAccount) {
            await session.abortTransaction();
            res.status(400).json(new ApiError(400,"Invalid Account"))
            return
        }
        await Account.updateOne({userId: req.userId},{$inc: {balance: -amount}}).session(session);
        await Account.updateOne({userId: to},{$inc: {balance: amount}}).session(session);
        
        await session.commitTransaction();
        res.status(200).json(new ApiResponse(200,null,"Transfer Successfull"))
        return
    } catch (error) {
        console.log("Error While Transfering Ammount Error: ",error);
        res.status(500).json(new ApiError(500,"Error While Transfering Ammount",error as any))
    }
})