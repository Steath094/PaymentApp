import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { ApiError } from "./utils/ApiError";
export const authMiddleware =  (req:Request,res: Response,next: NextFunction) =>{
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        res.status(403).json(new ApiError(403,"Unauthorized request: Token Required"));
        return
    }
    const token = authHeader.split(' ')[1];
    try {

       
        
        const decoded = jwt.verify(token,`${process.env.JWT_SECRET}`);

        req.userId = (decoded as JwtPayload).id ;
        next();
    } catch (err) {
        res.status(403).json(new ApiError(403,"Unauthorized Reequest"));
        return
    }
}