import { Request,Response } from "express-serve-static-core"

export const signup = async (req:Request,res:Response)=>{
  res.json({
    data:"you are signed up!"
  })
}
export const login = async (req:Request,res:Response)=>{
  res.json({
    data:"you are logged In "
  })
}
export const logout = async (req:Request,res:Response)=>{
  res.json({
    data:"you are signed up!"
  })
}