import { NextFunction } from "express";
import { AppError } from "../errors/AppError.js";

const asyncHandler = (fn:any) => { async (req:Request,res: Response,next:NextFunction)=>{
    try {
        await fn(req,res,next);
    } catch (error : AppError) {
        res.status(error.code || 500).json({
            sucess: false,
            message: error.message
        });
    }
} } 

export default asyncHandler; 