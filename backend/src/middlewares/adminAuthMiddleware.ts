import "dotenv/config"
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { ADMIN_JWT_SECRET } from "../config"

function adminAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization
    try {
        const decoded = jwt.verify(token as string, ADMIN_JWT_SECRET as string)  
        if(decoded) {
            // @ts-ignore
            req.adminId = decoded.id
            next()
        } 
    } catch(err) {
        res.status(401).json({
            message: "unauthorized admmin" 
        })
    }
}
export default adminAuthMiddleware