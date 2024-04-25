import { request, Request, Response } from "express";
import validator from "./validator";
import userModel from "./model"
import mongoose from "mongoose";


export const createUser = async(req: Request, res: Response)=>{
    const validateRes = validator.validateNewCustomerPayload(req.body)
    console.log
    if(validateRes.error)return res.status(400).json({message: validateRes.error.message})
    const user = await userModel.create({...req.body})
    return res.status(201).json(user)
}

export const deleteUser = async(req: Request, res: Response)=>{
    const {id} = req.params
    if(!id)return res.status(400).json({message: "id is required"})
    if(!mongoose.Types.ObjectId.isValid(id))return res.status(400).json({message: "invalid ID"})
    const user = await userModel.findById(id)
    if(!user)return res.status(404).json({message: "user not found"})
    await user.deleteOne()
    return res.status(200).json({message: "successful"})
}

export const getUsers = async(req: Request, res: Response)=>{
    const users = await userModel.find({})
    return res.status(200).json(users)
}