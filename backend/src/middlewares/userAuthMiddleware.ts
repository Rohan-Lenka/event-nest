import "dotenv/config"
import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { USER_JWT_SECRET } from "../config"

function userAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization
    try {
        const decoded = jwt.verify(token as string, USER_JWT_SECRET as string)
        if (decoded) {
            // @ts-ignore
            req.userId = decoded.id
            next()
        }
    } catch (err) {
        res.status(401).json({
            message: "unauthorized user"
        })
    }
}
export default userAuthMiddleware